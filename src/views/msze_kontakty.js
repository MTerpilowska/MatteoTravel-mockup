(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderMszeKontakty() {
		const mszeData = [
			{ sanktuarium: 'Bazylika św. Piotra', kosciol: 'Watykan', cena: 'Bezpłatnie', lokalizacja: 'Watykan, Rzym', kontakt: 'Biuro Pielgrzymek', email: 'pilgrim@vatican.va', www: 'www.vatican.va', adres: 'Piazza San Pietro, Città del Vaticano' },
			{ sanktuarium: 'Grota Narodzenia', kosciol: 'Betlejem', cena: 'Bezpłatnie', lokalizacja: 'Betlejem, Palestyna', kontakt: 'Kustosz Ziemi Świętej', email: 'info@custodia.org', www: 'www.custodia.org', adres: 'Manger Square, Bethlehem' },
		];

		const mszeTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>SANKTUARIUM, KOŚCIÓŁ</th>
							<th>Cena</th>
							<th>Lokalizacja</th>
							<th>Kontakt</th>
							<th>Adres e-mail</th>
							<th>WWW</th>
							<th>Adres</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${mszeData.map(m => `
							<tr>
								<td><strong>${escapeHtml(m.sanktuarium)}</strong><br><span style="color:var(--text-muted);font-size:0.85rem">${escapeHtml(m.kosciol)}</span></td>
								<td>${escapeHtml(m.cena)}</td>
								<td>${escapeHtml(m.lokalizacja)}</td>
								<td>${escapeHtml(m.kontakt)}</td>
								<td>${escapeHtml(m.email)}</td>
								<td><a href="${escapeHtml(m.www)}" target="_blank" style="color:var(--primary-color);font-size:0.8rem">${escapeHtml(m.www)}</a></td>
								<td style="font-size:0.85rem">${escapeHtml(m.adres)}</td>
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
					title: 'Msze święte',
					subtitle: 'Sanktuaria i kościoły — organizacja mszy świętych',
					actions: [button({ label: 'Dodaj miejsce', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Msze święte',
					subtitle: `Łącznie: ${mszeData.length} miejsc`,
					body: mszeTable
				})}
			</div>
		`;
	}

	window.MszeKontaktyView = { renderMszeKontakty };
})();
