(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderAtrakcje() {
		const atrakcjeData = [
			{ bilet: 'Muzea Watykańskie', cena2025: '23 EUR', cena2026: '25 EUR', kierunek: 'Włochy', firma: 'Vatican Museums', kontakt: 'Booking Office', www: 'www.museivaticani.va', uwagi: 'Rezerwacja obowiązkowa' },
			{ bilet: 'Piramidy Giza', cena2025: '12 USD', cena2026: '15 USD', kierunek: 'Egipt', firma: 'Ministry of Tourism Egypt', kontakt: 'Tourism Office Cairo', www: 'www.egypt.travel', uwagi: 'Przewodnik lokalny obowiązkowy' },
		];

		const atrakcjeTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Bilet / wstęp</th>
							<th>cena 2025</th>
							<th>cena 2026</th>
							<th>Kierunek</th>
							<th>FIRMA</th>
							<th>Kontakt</th>
							<th>www</th>
							<th>UWAGI</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${atrakcjeData.map(a => `
							<tr>
								<td><strong>${escapeHtml(a.bilet)}</strong></td>
								<td>${escapeHtml(a.cena2025)}</td>
								<td>${escapeHtml(a.cena2026)}</td>

								<td>${escapeHtml(a.kierunek)}</td>
								<td>${escapeHtml(a.firma)}</td>
								<td>${escapeHtml(a.kontakt)}</td>
								<td><a href="${escapeHtml(a.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(a.www)}</a></td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(a.uwagi)}</td>
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
					title: 'Atrakcje',
					subtitle: 'Bilety wstępu i atrakcje turystyczne',
					actions: [button({ label: 'Dodaj atrakcję', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Atrakcje',
					subtitle: `Łącznie: ${atrakcjeData.length} atrakcji`,
				body: atrakcjeTable,
				action: button({ label: 'Dodaj rok', icon: 'fa-solid fa-plus', variant: 'outline', attrs: { style: 'font-size:0.85rem' } })
				})}
			</div>
		`;
	}

	window.AtrakcjeView = { renderAtrakcje };
})();
