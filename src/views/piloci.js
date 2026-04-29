(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderPiloci() {
		const pilociData = [
			{ kontakt: 'Jan Kowalski', cena2025: '3200 zł', cena2026: '3500 zł', kierunek: 'Ziemia Święta', telefon: '+48 601 234 567', email: 'jan.kowalski@example.com', pesel: '80010112345', paszport: 'ABC123456', uwagi: 'Doświadczony pilot' },
			{ kontakt: 'Anna Nowak', cena2025: '3000 zł', cena2026: '3200 zł', kierunek: 'Włochy', telefon: '+48 602 345 678', email: 'anna.nowak@example.com', pesel: '85020223456', paszport: 'DEF234567', uwagi: 'Specjalizacja: grupy młodzieżowe' },
		];

		const pilociTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Kontakt</th>
							<th>cena 2025</th>
							<th>cena 2026</th>
							<th>Kierunek</th>
							<th>Telefon</th>
							<th>E-mail</th>
							<th>Pesel</th>
							<th>Paszport</th>
							<th>UWAGI</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${pilociData.map(p => `
							<tr>
								<td><strong>${escapeHtml(p.kontakt)}</strong></td>
								<td>${escapeHtml(p.cena2025)}</td>
								<td>${escapeHtml(p.cena2026)}</td>

								<td>${escapeHtml(p.kierunek)}</td>
								<td>${escapeHtml(p.telefon)}</td>
								<td>${escapeHtml(p.email)}</td>
								<td><code style="font-size:0.8rem">${escapeHtml(p.pesel)}</code></td>
								<td><code style="font-size:0.8rem">${escapeHtml(p.paszport)}</code></td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(p.uwagi)}</td>
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
					title: 'Piloci',
					subtitle: 'Lista pilotów współpracujących z biurem',
					actions: [button({ label: 'Dodaj pilota', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Baza pilotów',
					subtitle: `Łącznie: ${pilociData.length} pilotów`,
					body: pilociTable
				})}
			</div>
		`;
	}

	window.PilociView = { renderPiloci };
})();
