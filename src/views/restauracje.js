(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderRestauracje() {
		const restauracjeData = [
			{ nazwa: 'Trattoria da Mario', cena: '25 EUR/os', telefon: '+39 06 9876543', email: 'info@damario.it', adres: 'Via della Pace 8, Roma', uwagi: 'Menu grupowe dostępne' },
			{ nazwa: 'Al Sahaba Restaurant', cena: '18 USD/os', telefon: '+20 2 12345678', email: 'booking@alsahaba.eg', adres: 'Pyramids Road 120, Giza', uwagi: 'Kuchnia egipska, widok na piramidy' },
		];

		const restauracjeTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>NAZWA</th>
							<th>CENA</th>
							<th>TELEFON</th>
							<th>EMAIL</th>
							<th>ADRES</th>
							<th>UWAGI</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${restauracjeData.map(r => `
							<tr>
								<td><strong>${escapeHtml(r.nazwa)}</strong></td>
								<td>${escapeHtml(r.cena)}</td>
								<td>${escapeHtml(r.telefon)}</td>
								<td>${escapeHtml(r.email)}</td>
								<td style="font-size:0.85rem">${escapeHtml(r.adres)}</td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(r.uwagi)}</td>
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
					title: 'Restauracje',
					subtitle: 'Restauracje i punkty gastronomiczne',
					actions: [button({ label: 'Dodaj restaurację', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Restauracje',
					subtitle: `Łącznie: ${restauracjeData.length} restauracji`,
					body: restauracjeTable
				})}
			</div>
		`;
	}

	window.RestauracjeView = { renderRestauracje };
})();
