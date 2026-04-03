const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DB_PATH = path.join(ROOT, 'data', 'feedback-db.json');

const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon'
};

function buildCorsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

function readDatabase() {
	return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDatabase(database) {
	fs.writeFileSync(DB_PATH, JSON.stringify(database, null, 2));
}

function sendJson(response, statusCode, payload) {
	response.writeHead(statusCode, {
		'Content-Type': 'application/json; charset=utf-8',
		...buildCorsHeaders()
	});
	response.end(JSON.stringify(payload));
}

function parseBody(request) {
	return new Promise((resolve, reject) => {
		let body = '';
		request.on('data', (chunk) => {
			body += chunk;
			if (body.length > 10 * 1024 * 1024) {
				reject(new Error('Payload too large'));
			}
		});
		request.on('end', () => {
			if (!body) {
				resolve({});
				return;
			}
			try {
				resolve(JSON.parse(body));
			} catch (error) {
				reject(error);
			}
		});
		request.on('error', reject);
	});
}

function getViewLabel(roleKey, pageKey) {
	return `${pageKey} / ${roleKey}`;
}

function serveStatic(requestPath, response) {
	const resolvedPath = requestPath === '/' ? path.join(ROOT, 'index.html') : path.join(ROOT, requestPath);
	const safePath = path.normalize(resolvedPath);
	if (!safePath.startsWith(ROOT)) {
		sendJson(response, 403, { message: 'Forbidden' });
		return;
	}

	fs.readFile(safePath, (error, data) => {
		if (error) {
			if (requestPath !== '/' && path.extname(safePath) === '') {
				serveStatic('/index.html', response);
				return;
			}
			sendJson(response, 404, { message: 'Not found' });
			return;
		}

		const ext = path.extname(safePath).toLowerCase();
		response.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
		response.end(data);
	});
}

function validateRequiredFields(payload, fields) {
	const missing = fields.filter((field) => !payload[field]);
	return missing;
}

const server = http.createServer(async (request, response) => {
	const url = new URL(request.url, `http://${request.headers.host}`);
	const pathname = url.pathname;

	if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
		response.writeHead(204, buildCorsHeaders());
		response.end();
		return;
	}

	if (pathname === '/api/feedback' && request.method === 'GET') {
		const database = readDatabase();
		const roleKey = url.searchParams.get('roleKey');
		const pageKey = url.searchParams.get('pageKey');
		let items = database.feedbackItems || [];

		if (roleKey && pageKey) {
			items = items.filter((item) => item.roleKey === roleKey && item.pageKey === pageKey);
		}

		sendJson(response, 200, { items });
		return;
	}

	if (pathname === '/api/feedback' && request.method === 'POST') {
		try {
			const payload = await parseBody(request);
			const missing = validateRequiredFields(payload, ['author', 'roleKey', 'pageKey', 'title', 'description']);
			if (missing.length) {
				sendJson(response, 400, { message: `Missing fields: ${missing.join(', ')}` });
				return;
			}

			const database = readDatabase();
			const now = new Date().toISOString();
			const item = {
				id: randomUUID(),
				contextKey: `${payload.roleKey}:${payload.pageKey}`,
				pageKey: payload.pageKey,
				roleKey: payload.roleKey,
				viewLabel: payload.viewLabel || getViewLabel(payload.roleKey, payload.pageKey),
				title: payload.title,
				description: payload.description,
				category: payload.category || 'workflow',
				priority: payload.priority || 'medium',
				status: 'open',
				author: payload.author,
				createdAt: now,
				updatedAt: now,
				x: Number(payload.x || 0.5),
				y: Number(payload.y || 0.5),
				screenshot: payload.screenshot || '',
				thread: [
					{
						id: randomUUID(),
						author: payload.author,
						role: 'Użytkownik',
						text: payload.description,
						createdAt: now,
						kind: 'comment'
					}
				]
			};

			database.feedbackItems.unshift(item);
			writeDatabase(database);
			sendJson(response, 201, { item });
		} catch (error) {
			sendJson(response, 400, { message: 'Invalid request payload' });
		}
		return;
	}

	if (pathname.startsWith('/api/feedback/') && pathname.endsWith('/reply') && request.method === 'POST') {
		try {
			const feedbackId = pathname.split('/')[3];
			const payload = await parseBody(request);
			const missing = validateRequiredFields(payload, ['author', 'text']);
			if (missing.length) {
				sendJson(response, 400, { message: `Missing fields: ${missing.join(', ')}` });
				return;
			}

			const database = readDatabase();
			const item = database.feedbackItems.find((feedbackItem) => feedbackItem.id === feedbackId);
			if (!item) {
				sendJson(response, 404, { message: 'Feedback not found' });
				return;
			}

			const entry = {
				id: randomUUID(),
				author: payload.author,
				role: payload.role || 'Użytkownik',
				text: payload.text,
				createdAt: new Date().toISOString(),
				kind: 'comment'
			};

			item.thread.push(entry);
			item.updatedAt = entry.createdAt;
			writeDatabase(database);
			sendJson(response, 200, { item });
		} catch (error) {
			sendJson(response, 400, { message: 'Invalid request payload' });
		}
		return;
	}

	if (pathname.startsWith('/api/feedback/') && pathname.endsWith('/status') && request.method === 'PATCH') {
		try {
			const feedbackId = pathname.split('/')[3];
			const payload = await parseBody(request);
			const missing = validateRequiredFields(payload, ['author', 'status']);
			if (missing.length) {
				sendJson(response, 400, { message: `Missing fields: ${missing.join(', ')}` });
				return;
			}

			const database = readDatabase();
			const item = database.feedbackItems.find((feedbackItem) => feedbackItem.id === feedbackId);
			if (!item) {
				sendJson(response, 404, { message: 'Feedback not found' });
				return;
			}

			item.status = payload.status;
			item.updatedAt = new Date().toISOString();
			item.thread.push({
				id: randomUUID(),
				author: payload.author,
				role: 'Workflow',
				text: `Status został zmieniony na: ${payload.status}`,
				createdAt: item.updatedAt,
				kind: 'system'
			});

			writeDatabase(database);
			sendJson(response, 200, { item });
		} catch (error) {
			sendJson(response, 400, { message: 'Invalid request payload' });
		}
		return;
	}

	serveStatic(pathname, response);
});

server.listen(PORT, () => {
	console.log(`Matteo app running at http://localhost:${PORT}`);
});
