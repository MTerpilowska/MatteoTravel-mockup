(function () {
	const { button, dashboardHeader, panel, escapeHtml } = window.SharedUI;

	function renderPlatnosciKontakty() {
		const platnosciData = [
			{ data: '15.12.2024', zaco: 'Zaliczka grupa MT-2026-WL-03', suma: '50 000 zł', sposob: 'Przelew', wyjasnienie: 'Wpłaty uczestników', gotowka: 'Nie', dlaPilota: '—', ile: '—', jakKiedy: '—' },
			{ data: '20.12.2024', zaco: 'Hotel Paradise - rezerwacja', suma: '15 000 zł', sposob: 'Karta', wyjasnienie: 'Przedpłata hotelu Egipt', gotowka: 'Nie', dlaPilota: '—', ile: '—', jakKiedy: '—' },
		];

		const platnosciTable = `
			<div class="data-table-wrapper">
				<table class="data-table">
					<thead>
						<tr>
							<th>DATA</th>
							<th>ZA CO</th>
							<th>SUMA</th>
							<th>SPOSÓB</th>
							<th>WYJAŚNIENIE</th>
							<th>GOTÓWKA TECZKA</th>
							<th>DLA PILOTA</th>
							<th>ILE</th>
							<th>JAK PRZEKAZANE I KIEDY?</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						${platnosciData.map(p => `
							<tr>
								<td><strong>${escapeHtml(p.data)}</strong></td>
								<td>${escapeHtml(p.zaco)}</td>
								<td style="font-weight:600">${escapeHtml(p.suma)}</td>
								<td>${escapeHtml(p.sposob)}</td>
								<td style="font-size:0.85rem">${escapeHtml(p.wyjasnienie)}</td>
								<td>${escapeHtml(p.gotowka)}</td>
								<td>${escapeHtml(p.dlaPilota)}</td>
								<td>${escapeHtml(p.ile)}</td>
								<td style="font-size:0.85rem">${escapeHtml(p.jakKiedy)}</td>
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
					title: 'Płatności',
					subtitle: 'Rejestr płatności i rozliczeń',
					actions: [button({ label: 'Dodaj płatność', icon: 'fa-solid fa-plus', variant: 'primary' })]
				})}

				${panel({
					title: 'Płatności',
					subtitle: `Łącznie: ${platnosciData.length} płatności`,
					body: platnosciTable
				})}
			</div>
		`;
	}

	window.PlatnosciKontaktyView = { renderPlatnosciKontakty };
})();
