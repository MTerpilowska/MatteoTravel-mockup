(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderKontrahenci() {
		const kontrahenciData = [
			{ kontrahent: 'FlyAway Tours', lokalizacja: 'Polska', kontakt: 'Marek Zieliński', telefon: '+48 22 123 45 67', email: 'biuro@flyaway.pl', www: 'www.flyaway.pl', adres: 'ul. Lotnicza 15, 00-001 Warszawa', uwagi: 'Partner w biletach lotniczych' },
			{ kontrahent: 'Mediterranean Services', lokalizacja: 'Włochy', kontakt: 'Luigi Bianchi', telefon: '+39 06 1234567', email: 'info@medservices.it', www: 'www.medservices.it', adres: 'Via Roma 50, Milano', uwagi: 'Usługi na miejscu' },
		];

		const kontrahenciTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Kontrahent</th>
							<th>Lokalizacja</th>
							<th>Kontakt</th>
							<th>Telefon</th>
							<th>Adres e-mail</th>
							<th>WWW</th>
							<th>Adres</th>
							<th>UWAGI</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${kontrahenciData.map(k => `
							<tr>
								<td><strong>${escapeHtml(k.kontrahent)}</strong></td>
								<td>${escapeHtml(k.lokalizacja)}</td>
								<td>${escapeHtml(k.kontakt)}</td>
								<td>${escapeHtml(k.telefon)}</td>
								<td>${escapeHtml(k.email)}</td>
								<td><a href="${escapeHtml(k.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(k.www)}</a></td>
								<td style="font-size:0.85rem">${escapeHtml(k.adres)}</td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(k.uwagi)}</td>
								<td style="white-space:nowrap">
									${button({ label: 'Edytuj', variant: 'outline', attrs: { style: 'font-size:0.75rem; padding: 0.25rem 0.5rem;' } })}
								</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
			</div>
		`;

		return `
			<div>
				${dashboardHeader({
					title: 'Kontrahenci',
					subtitle: 'Partnerzy biznesowi i dostawcy usług',
					actions: [button({ label: 'Dodaj kontrahenta', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Kontrahenci',
					subtitle: `Łącznie: ${kontrahenciData.length} kontrahentów`,
					body: kontrahenciTable
				})}
			</div>
		`;
	}

	window.KontrahenciView = { renderKontrahenci };
})();
