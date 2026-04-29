(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderAutokary() {
		const autokaryData = [
			{ kontakt: 'Jan Nowicki', firma: 'Transport Deluxe', cena2025: '8200 zł', cena2026: '8500 zł', telefon: '+48 601 111 222', email: 'biuro@transport-deluxe.pl', pesel: '75030312345', adres: 'ul. Kolejowa 12, Warszawa', wojewodztwo: 'Mazowieckie', www: 'www.transport-deluxe.pl', autokart: 'Mercedes Travego' },
			{ kontakt: 'Piotr Wiśniewski', firma: 'Bus Travel Pro', cena2025: '7500 zł', cena2026: '7800 zł', telefon: '+48 602 222 333', email: 'kontakt@bustravelpro.pl', pesel: '80040423456', adres: 'ul. Transportowa 5, Kraków', wojewodztwo: 'Małopolskie', www: 'www.bustravelpro.pl', autokart: 'Setra S515HD' },
		];

		const autokaryTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Kontakt</th>
							<th>Firma</th>
							<th>cena 2025</th>
							<th>cena 2026</th>
							<th>Telefon</th>
							<th>Adres e-mail</th>
							<th>Pesel</th>
							<th>Adres</th>
							<th>WOJEWÓDZTWO</th>
							<th>www</th>
							<th>AUTOKART:</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${autokaryData.map(a => `
							<tr>
								<td><strong>${escapeHtml(a.kontakt)}</strong></td>
								<td>${escapeHtml(a.firma)}</td>
								<td>${escapeHtml(a.cena2025)}</td>
								<td>${escapeHtml(a.cena2026)}</td>

								<td>${escapeHtml(a.telefon)}</td>
								<td>${escapeHtml(a.email)}</td>
								<td><code style="font-size:0.8rem">${escapeHtml(a.pesel)}</code></td>
								<td style="font-size:0.85rem">${escapeHtml(a.adres)}</td>
								<td>${escapeHtml(a.wojewodztwo)}</td>
								<td><a href="${escapeHtml(a.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(a.www)}</a></td>
								<td>${escapeHtml(a.autokart)}</td>
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
					title: 'Autokary',
					subtitle: 'Przewoźnicy i flota autokarowa',
					actions: [button({ label: 'Dodaj autokara', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Autokary',
					subtitle: `Łącznie: ${autokaryData.length} autokarów`,
				body: autokaryTable,
				action: button({ label: 'Dodaj rok', icon: 'fa-solid fa-plus', variant: 'outline', attrs: { style: 'font-size:0.85rem' } })
				})}
			</div>
		`;
	}

	window.AutokaryView = { renderAutokary };
})();
