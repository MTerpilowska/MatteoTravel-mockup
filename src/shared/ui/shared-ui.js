(function () {
	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function buildClassName(parts) {
		return parts.filter(Boolean).join(' ');
	}

	function serializeAttributes(attrs = {}) {
		if (typeof attrs === 'string') {
			return attrs.trim();
		}
		return Object.entries(attrs)
			.filter(([, value]) => value !== false && value !== null && value !== undefined)
			.map(([key, value]) => (value === true ? key : `${key}="${escapeHtml(value)}"`))
			.join(' ');
	}

	function button({ label, icon = '', variant = 'primary', type = 'button', className = '', attrs = {}, style = '', disabled = false }) {
		const classes = buildClassName(['btn', `btn-${variant}`, className]);
		const attrString = serializeAttributes({ type, style, disabled, ...attrs });
		const iconMarkup = icon ? `<i class="${escapeHtml(icon)}"></i>` : '';
		return `<button class="${classes}" ${attrString}>${iconMarkup}${escapeHtml(label)}</button>`;
	}

	function statusBadge(label, tone = 'neutral', className = '') {
		return `<span class="${buildClassName(['status-badge', tone, className])}">${escapeHtml(label)}</span>`;
	}

	function dashboardHeader({ title, subtitle = '', actions = [] }) {
		return `<div class="dashboard-header"><div class="dashboard-title"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle)}</p></div>${actions.length ? `<div class="dashboard-actions">${actions.join('')}</div>` : ''}</div>`;
	}

	function panel({ title, body, action = '', headerExtras = '', className = '', style = '', bodyClassName = '', bodyStyle = '' }) {
		const headerRight = action || headerExtras;
		return `<div class="${buildClassName(['panel', className])}"${style ? ` style="${escapeHtml(style)}"` : ''}><div class="panel-header"><h2>${escapeHtml(title)}</h2>${headerRight}</div><div class="${buildClassName(['panel-body', bodyClassName])}"${bodyStyle ? ` style="${escapeHtml(bodyStyle)}"` : ''}>${body}</div></div>`;
	}

	function statCard({ title, value, icon, iconTone = 'blue', valueClass = '', trend = '', trendTone = 'neutral', cardStyle = '', stacked = false, iconStyle = '' }) {
		const trendMarkup = trend ? `<div class="stat-trend ${escapeHtml(trendTone)}">${trend}</div>` : '';
		const iconMarkup = `<div class="stat-icon ${escapeHtml(iconTone)}"${iconStyle ? ` style="${escapeHtml(iconStyle)}"` : ''}><i class="${escapeHtml(icon)}"></i></div>`;
		if (stacked) {
			return `<div class="stat-card"${cardStyle ? ` style="${escapeHtml(cardStyle)}"` : ''}>${iconMarkup}<div class="stat-info"><h3>${escapeHtml(title)}</h3></div><div class="${buildClassName(['stat-value', valueClass])}">${value}</div>${trendMarkup}</div>`;
		}
		return `<div class="stat-card"${cardStyle ? ` style="${escapeHtml(cardStyle)}"` : ''}><div><div class="stat-info"><h3>${escapeHtml(title)}</h3></div><div class="${buildClassName(['stat-value', valueClass])}">${value}</div>${trendMarkup}</div>${iconMarkup}</div>`;
	}

	window.SharedUI = {
		escapeHtml,
		button,
		statusBadge,
		dashboardHeader,
		panel,
		statCard
	};
})();