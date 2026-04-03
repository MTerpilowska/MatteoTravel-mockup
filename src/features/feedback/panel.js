(function () {
	const { STATUS_META, STATUS_ACTIONS, PRIORITY_META, CATEGORY_META, FEEDBACK_SUMMARY } = window.AppConfig;
	const { escapeHtml, button } = window.SharedUI;

	function formatSummary(items) {
		return FEEDBACK_SUMMARY.map((card) => {
			const count = items.filter((item) => item.status === card.key).length;
			return `<div class="feedback-summary-card ${card.cardClassName}"><span>${escapeHtml(card.label)}</span><strong>${count}</strong><small>${escapeHtml(card.caption)}</small></div>`;
		}).join('');
	}

	function emptyListMarkup() {
		return `<div class="feedback-empty-state"><i class="fa-regular fa-comments"></i><strong>Brak uwag dla tego widoku</strong><p>To jest dobry moment, zeby dodac pierwsza uwage do aktualnego formularza lub wybranego widoku.</p></div>`;
	}

	function truncate(value, limit = 110) {
		const text = String(value || '');
		return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
	}

	function listMarkup(items, selectedId, formatRelativeTime) {
		if (!items.length) {
			return emptyListMarkup();
		}

		return items.map((item, index) => {
			const status = STATUS_META[item.status];
			return `<button class="feedback-list-item ${item.id === selectedId ? 'active' : ''}" type="button" data-feedback-id="${item.id}"><span class="feedback-list-pin ${status.className}">${index + 1}</span><div class="feedback-list-copy"><div class="feedback-list-head"><strong>${escapeHtml(item.title)}</strong><span class="feedback-status-pill ${status.className}">${status.label}</span></div><p>${escapeHtml(truncate(item.description))}</p><div class="feedback-list-meta"><span>${escapeHtml(CATEGORY_META[item.category] || item.category)}</span><span>Priorytet: ${escapeHtml(PRIORITY_META[item.priority] || item.priority)}</span><span>${escapeHtml(formatRelativeTime(item.updatedAt))}</span></div></div></button>`;
		}).join('');
	}

	function historyMarkup(items, formatRelativeTime) {
		if (!items.length) {
			return `<div class="feedback-empty-inline">Brak zakonczonych uwag.</div>`;
		}

		return `<div class="feedback-history-list">${items.map((item) => `<div class="feedback-history-item"><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(truncate(item.description, 90))}</p></div><span>${escapeHtml(formatRelativeTime(item.updatedAt))}</span></div>`).join('')}</div>`;
	}

	function screenshotMarkup(screenshot, altText, placeholderText) {
		if (screenshot) {
			return `<img src="${screenshot}" alt="${escapeHtml(altText)}">`;
		}
		return `<div class="feedback-shot-placeholder"><i class="fa-regular fa-image"></i><span>${escapeHtml(placeholderText)}</span></div>`;
	}

	function draftMarkup(contextLabel, draft) {
		return `<div class="feedback-thread-card draft feedback-draft-card"><div class="feedback-draft-head"><div><span class="feedback-kicker">Nowa uwaga</span><h3>Opisz zaznaczony punkt</h3><p>Widok: ${escapeHtml(contextLabel)}</p></div><button class="feedback-close" type="button" data-action="cancel-draft" aria-label="Zamknij formularz nowej uwagi"><i class="fa-solid fa-xmark"></i></button></div><p class="feedback-draft-copy">Punkt zostal zaznaczony. Teraz opisz, co nalezy zmienic, doprecyzowac albo potwierdzic.</p><div class="feedback-screenshot">${screenshotMarkup(draft?.screenshot, 'Podglad ekranu dla nowej uwagi', 'Zrzut ekranu zapisze sie po dodaniu uwagi.')}</div><form class="feedback-form" id="feedbackDraftForm"><label><span>Tytul uwagi</span><input name="title" type="text" placeholder="Np. Dodac wlasciciela procesu przy tej karcie" required></label><label><span>Opis / kontekst biznesowy</span><textarea name="description" rows="4" placeholder="Opisz, czego dotyczy uwaga i jak powinien dzialac widok." required></textarea></label><div class="feedback-form-row"><label><span>Kategoria</span><select name="category"><option value="ux">UX / Czytelnosc</option><option value="data">Dane / Logika</option><option value="workflow" selected>Proces</option><option value="copy">Tresc / Nazewnictwo</option></select></label><label><span>Priorytet</span><select name="priority"><option value="low">Niski</option><option value="medium" selected>Sredni</option><option value="high">Wysoki</option></select></label></div><div class="feedback-form-actions">${button({ label: 'Anuluj', variant: 'outline', attrs: { 'data-action': 'cancel-draft' } })}${button({ label: 'Zapisz uwage', attrs: { type: 'submit' } })}</div></form></div>`;
	}

	function emptyThreadMarkup() {
		return `<div class="feedback-empty-thread"><i class="fa-regular fa-hand-pointer"></i><strong>Wybierz uwage albo dodaj nowa</strong><p>Lista po lewej pokazuje wszystkie uwagi dla aktualnie wybranego widoku.</p></div>`;
	}

	function threadMarkup(item, formatDateTime) {
		if (!item) {
			return emptyThreadMarkup();
		}

		const status = STATUS_META[item.status];
		const actions = STATUS_ACTIONS.map((action) => button({ label: action.label, variant: action.variant, attrs: { 'data-action': 'set-status', 'data-status': action.key } })).join('');
		const thread = item.thread.map((entry) => `<div class="feedback-message ${entry.role === 'Delivery' ? 'delivery' : 'client'}"><div class="feedback-message-meta"><strong>${escapeHtml(entry.author)}</strong><span>${escapeHtml(entry.role)} • ${escapeHtml(formatDateTime(entry.createdAt))}</span></div><p>${escapeHtml(entry.text)}</p></div>`).join('');
		return `<div class="feedback-thread-card"><div class="feedback-thread-top"><div><div class="feedback-thread-title-row"><h3>${escapeHtml(item.title)}</h3><span class="feedback-status-pill ${status.className}">${status.label}</span></div><p>${escapeHtml(item.description)}</p></div><div class="feedback-thread-actions">${actions}</div></div><div class="feedback-thread-meta"><span>${escapeHtml(CATEGORY_META[item.category] || item.category)}</span><span>Priorytet: ${escapeHtml(PRIORITY_META[item.priority] || item.priority)}</span><span>Zgloszono: ${escapeHtml(formatDateTime(item.createdAt))}</span></div><div class="feedback-screenshot">${screenshotMarkup(item.screenshot, `Zrzut ekranu dla uwagi ${item.title}`, 'Brak zapisanego podgladu ekranu dla tej uwagi.')}</div><div class="feedback-conversation"><div class="feedback-section-head"><h3>Watek komunikacji</h3><span>${item.thread.length} wpisow</span></div><div class="feedback-message-list">${thread}</div></div><form class="feedback-reply-form" id="feedbackReplyForm"><label><span>Odpowiedz / doprecyzowanie</span><textarea name="reply" rows="3" placeholder="Napisz odpowiedz do tej uwagi." required></textarea></label><div class="feedback-form-actions">${button({ label: 'Pokaz punkt na ekranie', variant: 'outline', attrs: { 'data-action': 'focus-marker' } })}${button({ label: 'Dodaj odpowiedz', attrs: { type: 'submit' } })}</div></form></div>`;
	}

	window.FeedbackPanel = {
		formatSummary,
		listMarkup,
		historyMarkup,
		draftMarkup,
		threadMarkup,
		emptyThreadMarkup
	};
})();
