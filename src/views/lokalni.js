(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderLokalni() {
		const lokalniData = [
			{ kontakt: 'Maria Rossi', jezyk: 'Włoski', cena2025: '150 EUR', cena2026: '160 EUR', kierunek: 'Włochy', miasta: 'Rzym, Watykan', telefon: '+39 345 123 456', email: 'maria.rossi@example.it', www: 'www.przewodnik-rzym.it', uwagi: 'Licencja nr 12345' },
			{ kontakt: 'David Cohen', jezyk: 'Hebrajski, Angielski', cena2025: '200 USD', cena2026: '220 USD', kierunek: 'Izrael', miasta: 'Jerozolima, Tel Awiw', telefon: '+972 50 123 4567', email: 'david.cohen@example.il', www: 'www.holylandguide.co.il', uwagi: 'Specjalista od pielgrzymek' },
		];

		const lokalniTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>Kontakt</th>
							<th>Język</th>
							<th>cena 2025</th>
							<th>cena 2026</th>
							<th>Kierunek</th>
							<th>Miasta</th>
							<th>Telefon</th>
							<th>Adres e-mail</th>
							<th>www</th>
							<th>UWAGI</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${lokalniData.map(l => `
							<tr>
								<td><strong>${escapeHtml(l.kontakt)}</strong></td>
								<td>${escapeHtml(l.jezyk)}</td>
								<td>${escapeHtml(l.cena2025)}</td>
							<td>${escapeHtml(l.cena2026)}</td>
							<td>${escapeHtml(l.kierunek)}</td>
								<td>${escapeHtml(l.miasta)}</td>
								<td>${escapeHtml(l.telefon)}</td>
								<td>${escapeHtml(l.email)}</td>
								<td><a href="${escapeHtml(l.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(l.www)}</a></td>
								<td style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(l.uwagi)}</td>
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
					title: 'Przewodnicy lokalni',
					subtitle: 'Baza przewodników lokalnych na różnych kierunkach',
					actions: [button({ label: 'Dodaj przewodnika', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Przewodnicy lokalni',
					subtitle: `Łącznie: ${lokalniData.length} przewodników`,
					body: lokalniTable,
					action: button({ label: 'Dodaj rok', icon: 'fa-solid fa-plus', variant: 'outline', attrs: { style: 'font-size:0.85rem' } })
				})}
			</div>
		`;
	}

	window.LokalniView = { renderLokalni };
})();
