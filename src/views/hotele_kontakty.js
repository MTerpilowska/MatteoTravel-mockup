(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderHoteleKontakty() {
		const hoteleData = [
			{ hotel: 'Hotel Paradise', cena2025: '110 EUR/noc', cena2026: '120 EUR/noc', kierunek: 'Egipt', miasto: 'Hurghada', kontakt: 'Ahmed Hassan', email: 'reservation@paradise.eg', www: 'www.paradisehotel.eg', adres: 'Beach Road 45, Hurghada', uwagi: '4* all inclusive' },
			{ hotel: 'Grand Hotel Roma', cena2025: '90 EUR/noc', cena2026: '95 EUR/noc', kierunek: 'Włochy', miasto: 'Rzym', kontakt: 'Giuseppe Verdi', email: 'info@grandroma.it', www: 'www.grandhotelroma.it', adres: 'Via del Corso 123, Roma', uwagi: '3* śniadania' },
		];

		const hoteleTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Hotel</th>
							<th>cena 2025</th>
							<th>cena 2026</th>
							<th>Kierunek</th>
							<th>Miasto</th>
							<th>Kontakt</th>
							<th>Adres e-mail</th>
							<th>WWW</th>
							<th>Adres</th>
							<th>Uwagi</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${hoteleData.map(h => `
							<tr>
								<td><strong>${escapeHtml(h.hotel)}</strong></td>
							<td>${escapeHtml(h.cena2025)}</td>
							<td>${escapeHtml(h.cena2026)}</td>

								<td>${escapeHtml(h.kierunek)}</td>
								<td>${escapeHtml(h.miasto)}</td>
								<td>${escapeHtml(h.kontakt)}</td>
								<td>${escapeHtml(h.email)}</td>
								<td><a href="${escapeHtml(h.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(h.www)}</a></td>
								<td style="font-size:0.85rem">${escapeHtml(h.adres)}</td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(h.uwagi)}</td>
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
					title: 'Hotele',
					subtitle: 'Baza hoteli i obiektów noclegowych',
					actions: [button({ label: 'Dodaj hotel', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Hotele',
					subtitle: `Łącznie: ${hoteleData.length} hoteli`,
				body: hoteleTable,
				action: button({ label: 'Dodaj rok', icon: 'fa-solid fa-plus', variant: 'outline', attrs: { style: 'font-size:0.85rem' } })
				})}
			</div>
		`;
	}

	window.HoteleKontaktyView = { renderHoteleKontakty };
})();
