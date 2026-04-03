(function () {
	const { API_BASE } = window.AppConfig;

	async function request(path, options = {}) {
		let response;
		try {
			response = await fetch(`${API_BASE}${path}`, {
				headers: {
					'Content-Type': 'application/json',
					...(options.headers || {})
				},
				...options
			});
		} catch (error) {
			throw new Error('Brak polaczenia z serwerem. Otworz aplikacje przez http://localhost:3000 i sprawdz, czy node server.js nadal dziala.');
		}

		if (!response.ok) {
			const payload = await response.json().catch(() => ({}));
			throw new Error(payload.message || 'Nie udalo sie wykonac operacji na uwagach.');
		}

		return response.json();
	}

	function fetchFeedback(roleKey, pageKey) {
		const params = new URLSearchParams({ roleKey, pageKey });
		return request(`/feedback?${params.toString()}`);
	}

	function createFeedback(payload) {
		return request('/feedback', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	function addReply(feedbackId, payload) {
		return request(`/feedback/${feedbackId}/reply`, {
			method: 'POST',
			body: JSON.stringify(payload)
		});
	}

	function updateStatus(feedbackId, payload) {
		return request(`/feedback/${feedbackId}/status`, {
			method: 'PATCH',
			body: JSON.stringify(payload)
		});
	}

	window.FeedbackApi = {
		fetchFeedback,
		createFeedback,
		addReply,
		updateStatus
	};
})();
