(function () {
	const { PLACEHOLDER_STEPS, PLACEHOLDER_DISCUSSION_POINTS, getRoleLabel, getPageLabel } = window.AppConfig;
	const { button, dashboardHeader, panel, statusBadge, escapeHtml } = window.SharedUI;

	function createPlaceholderPage(pageKey, roleKey) {
		const pageName = getPageLabel(pageKey);
		const roleName = getRoleLabel(roleKey);
		const stepsMarkup = PLACEHOLDER_STEPS.map((step, index) => `
			<div class="feedback-demo-step">
				<span>${index + 1}</span>
				<div>
					<strong>${escapeHtml(step.title)}</strong>
					<p>${escapeHtml(step.description)}</p>
				</div>
			</div>
		`).join('');
		const pointsMarkup = PLACEHOLDER_DISCUSSION_POINTS.map((point) => `<li>${escapeHtml(point)}</li>`).join('');

		return [
			dashboardHeader({
				title: pageName,
				subtitle: `Makieta procesu dla roli ${roleName}. Widok jest gotowy do zbierania i omawiania uwag.`,
				actions: [
					button({ label: 'Widok klienta', icon: 'fa-solid fa-eye', variant: 'outline' }),
					button({ label: 'Akcja glowna', icon: 'fa-solid fa-list-check' })
				]
			}).replace('dashboard-header"', 'dashboard-header feedback-page-header"'),
			`<div class="feedback-demo-grid">${[
				panel({
					title: 'Scenariusz akceptacyjny',
					headerExtras: statusBadge(roleName, 'info'),
					className: 'feedback-demo-hero',
					bodyClassName: 'feedback-demo-hero-body',
					body: stepsMarkup
				}),
				panel({
					title: 'Formularz / detal rekordu',
					action: '<button class="panel-action">Historia zmian</button>',
					bodyClassName: 'feedback-form-grid',
					body: `
						<label class="feedback-field"><span>Nazwa procesu</span><input type="text" value="${escapeHtml(pageName)}" readonly></label>
						<label class="feedback-field"><span>Wlasciciel biznesowy</span><input type="text" value="Matteo Travel" readonly></label>
						<label class="feedback-field full"><span>Opis dzialania</span><textarea rows="4" readonly>To miejsce pokazuje, gdzie klient bedzie najczesciej zostawiac doprecyzowania dotyczace przebiegu procesu, walidacji formularza albo kolejnosci akcji.</textarea></label>
						<div class="feedback-field-card"><strong>Punkty do uzgodnienia</strong><ul>${pointsMarkup}</ul></div>
						<div class="feedback-field-card accent"><strong>Dlaczego ten widok jest skalowalny</strong><p>Karty, panele i logika feedbacku sa skladane z jednego systemu UI oraz wspolnych modulow aplikacji.</p></div>
					`
				})
			].join('')}</div>`
		].join('');
	}

	window.PlaceholderViews = {
		createPlaceholderPage
	};
})();
