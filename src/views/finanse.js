(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== UMOWY I DOKUMENTY ===== */
	function renderUmowy() {
		const contracts = [
			{ id: 'U/2026/041', name: 'Wiśniewski Adam + Maria', group: 'MT-2026-WL-01', value: '9 980 zł', signed: '10.03.2026', method: 'Online ✓', docs: 'Komplet', status: 'Aktywna', statusTone: 'success' },
			{ id: 'U/2026/042', name: 'Nowak Barbara', group: 'MT-2026-WL-01', value: '5 880 zł', signed: '12.03.2026', method: 'Skan', docs: 'Brak paszportu', status: 'Braki', statusTone: 'warning' },
			{ id: 'U/2026/043', name: 'Zielińska Anna', group: 'MT-2026-WL-01', value: '4 990 zł', signed: '—', method: 'Wysłana (e-mail)', docs: 'Brak paszportu', status: 'Oczekuje', statusTone: 'info' },
			{ id: 'U/2026/050', name: 'Malczewski Tomasz + Ewa', group: 'MT-2026-WL-01', value: '9 980 zł', signed: '—', method: 'Nie wysłana', docs: 'Brak', status: 'Nie wydana', statusTone: 'neutral' },
			{ id: 'U/2026/020', name: 'Liceum Pijarów — wyjazd', group: 'MT-2026-ES-02', value: '64 000 zł', signed: '05.02.2026', method: 'Papierowa', docs: 'Komplet', status: 'Aktywna', statusTone: 'success' },
			{ id: 'U/2026/018', name: 'ZHP Hufiec Gdańsk', group: 'MT-2026-IT-03', value: '144 000 zł', signed: '26.01.2026', method: 'Online ✓', docs: 'Komplet', status: 'Aktywna', statusTone: 'success' },
		];

		const rows = contracts.map(c => `
			<tr>
				<td><strong>${escapeHtml(c.id)}</strong></td>
				<td>${escapeHtml(c.name)}</td>
				<td><code style="font-size:0.8rem">${escapeHtml(c.group)}</code></td>
				<td style="text-align:right;font-weight:600">${escapeHtml(c.value)}</td>
				<td>${escapeHtml(c.signed)}</td>
				<td><span class="type-pill">${escapeHtml(c.method)}</span></td>
				<td>${c.docs === 'Komplet' ? '<span style="color:var(--success-color)"><i class="fa-solid fa-check-circle"></i> Komplet</span>' : `<span style="color:var(--warning-color)"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(c.docs)}</span>`}</td>
				<td>${statusBadge(c.status, c.statusTone)}</td>
				<td>
					<div style="display:flex;gap:0.3rem">
						${button({ label: 'PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' })}
						${button({ label: 'Edytuj', variant: 'outline' })}
					</div>
				</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Umowy i Dokumenty',
				subtitle: 'Zarządzanie umowami uczestników, zbieranie dokumentów i skanów',
				actions: [
					button({ label: 'Wyślij link do podpisu', icon: 'fa-solid fa-link', variant: 'outline' }),
					button({ label: 'Nowa umowa', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Wszystkich umów', value: '156', icon: 'fa-solid fa-file-contract', iconTone: 'blue' })}
				${statCard({ title: 'Podpisanych', value: '138', icon: 'fa-solid fa-signature', iconTone: 'green', trend: '<i class="fa-solid fa-check"></i> 88% kompletnych', trendTone: 'positive' })}
				${statCard({ title: 'Oczekuje podpisu', value: '12', icon: 'fa-solid fa-hourglass-half', iconTone: 'orange' })}
				${statCard({ title: 'Brak dokumentów', value: '18', icon: 'fa-solid fa-passport', iconTone: 'purple' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:2fr 1fr">
				${panel({
					title: 'Lista umów',
					action: `<div style="display:flex;gap:0.5rem">
						<select class="inline-select"><option>Wszystkie statusy</option><option>Aktywna</option><option>Oczekuje</option><option>Braki</option></select>
					</div>`,
					body: `<div class="table-container">
						<table>
							<thead><tr><th>Nr umowy</th><th>Uczestnik</th><th>Impreza</th><th style="text-align:right">Wartość</th><th>Podpisana</th><th>Ścieżka</th><th>Dokumenty</th><th>Status</th><th></th></tr></thead>
							<tbody>${rows}</tbody>
						</table>
					</div>`
				})}
				<div style="display:flex;flex-direction:column;gap:1.25rem">
					${panel({ title: 'Ścieżki podpisu', body: `
						<div class="doc-path-list">
							<div class="doc-path-item active">
								<div class="doc-path-icon online"><i class="fa-solid fa-globe"></i></div>
								<div><strong>Online — link do podpisu</strong><p>Uczestnik otrzymuje e-mail z linkiem i akceptuje warunki online. Najszybsza ścieżka.</p></div>
							</div>
							<div class="doc-path-item">
								<div class="doc-path-icon scan"><i class="fa-solid fa-file-image"></i></div>
								<div><strong>Skan podpisanego dokumentu</strong><p>Uczestnik drukuje, podpisuje i dostarcza skan mailem lub osobiście.</p></div>
							</div>
							<div class="doc-path-item">
								<div class="doc-path-icon paper"><i class="fa-solid fa-print"></i></div>
								<div><strong>Papierowa w biurze</strong><p>Podpisanie przy wizycie w biurze, oryginał archiwizowany.</p></div>
							</div>
						</div>
					` })}
					${panel({ title: 'Wymagane dokumenty', body: `
						<div class="req-doc-list">
							<div class="req-doc"><i class="fa-solid fa-passport" style="color:var(--primary-color)"></i><div><strong>Skan paszportu</strong><small>Wymagany min. 30 dni przed wyjazdem</small></div><span class="req-count warn">10 brak</span></div>
							<div class="req-doc"><i class="fa-solid fa-file-signature" style="color:var(--success-color)"></i><div><strong>Podpisana umowa</strong><small>Obowiązkowa przed pierwszą wpłatą</small></div><span class="req-count ok">138 ok</span></div>
							<div class="req-doc"><i class="fa-solid fa-shield-halved" style="color:var(--warning-color)"></i><div><strong>Polisa ubezpieczeniowa</strong><small>Generowana automatycznie po opłaceniu</small></div><span class="req-count ok">130 ok</span></div>
							<div class="req-doc"><i class="fa-solid fa-id-card" style="color:var(--text-muted)"></i><div><strong>ESTA / Wiza (jeśli wymagana)</strong><small>Tylko wybrane kierunki</small></div><span class="req-count warn">3 brak</span></div>
						</div>
					` })}
				</div>
			</div>`
		].join('');
	}

	/* ===== PŁATNOŚCI ===== */
	function renderPlatnosci() {
		const payments = [
			{ date: '27.03.2026', participant: 'Wiśniewski Adam', group: 'MT-2026-WL-01', desc: 'II rata', currency: 'PLN', amount: 2500, status: 'Zaksięgowana', statusTone: 'success', assigned: 'Auto' },
			{ date: '26.03.2026', participant: 'Nowak Barbara', group: 'MT-2026-WL-01', desc: 'I rata', currency: 'PLN', amount: 2000, status: 'Zaksięgowana', statusTone: 'success', assigned: 'Auto' },
			{ date: '25.03.2026', participant: '???', group: '???', desc: 'Tytuł: "ZIEMIA 2026 PIEKNA"', currency: 'PLN', amount: 1500, status: 'Do weryfikacji', statusTone: 'warning', assigned: 'Ręcznie' },
			{ date: '24.03.2026', participant: 'ZHP Hufiec Gdańsk', group: 'MT-2026-IT-03', desc: 'II rata (50%)', currency: 'PLN', amount: 72000, status: 'Zaksięgowana', statusTone: 'success', assigned: 'Auto' },
			{ date: '22.03.2026', participant: 'Zielińska Anna', group: 'MT-2026-WL-01', desc: 'I rata', currency: 'PLN', amount: 2000, status: 'Zaksięgowana', statusTone: 'success', assigned: 'Auto' },
			{ date: '20.03.2026', participant: 'Hotel Casa La Salle [WYCH]', group: 'MT-2026-IT-03', desc: 'Zaliczka 30%', currency: 'EUR', amount: 3500, status: 'Wysłana', statusTone: 'info', assigned: 'Ręcznie' },
		];

		const upcoming = [
			{ deadline: '01.04.2026', who: 'Depozyt LOT TK — MT-2026-WL-01', amount: '8 400 USD', urgency: 'danger', days: 5 },
			{ deadline: '05.04.2026', who: '10 uczestników — brak paszportu', amount: '—', urgency: 'warning', days: 9 },
			{ deadline: '10.04.2026', who: '7 uczestników — II rata (zaległa)', amount: '16 730 zł', urgency: 'warning', days: 14 },
			{ deadline: '15.04.2026', who: 'Hotel Rzym — dopłata końcowa', amount: '9 200 EUR', urgency: 'info', days: 19 },
		];

		const payRows = payments.map(p => `
			<tr>
				<td>${escapeHtml(p.date)}</td>
				<td>${escapeHtml(p.participant)}</td>
				<td><code style="font-size:0.8rem">${escapeHtml(p.group)}</code></td>
				<td>${escapeHtml(p.desc)}</td>
				<td style="text-align:right;font-weight:700;color:${p.currency === 'EUR' || p.currency === 'USD' ? 'var(--info-color)' : 'var(--secondary-color)'}">
					${p.amount.toLocaleString('pl-PL')} ${escapeHtml(p.currency)}
				</td>
				<td><span class="type-pill">${escapeHtml(p.assigned)}</span></td>
				<td>${statusBadge(p.status, p.statusTone)}</td>
				<td>${button({ label: 'Podgląd', variant: 'outline' })}</td>
			</tr>
		`).join('');

		const upcomingRows = upcoming.map(u => `
			<div class="alert-item ${u.urgency}">
				<div class="alert-days ${u.urgency}">${u.days}d</div>
				<div style="flex:1">
					<strong style="font-size:0.875rem">${escapeHtml(u.who)}</strong>
					<div style="font-size:0.8rem;color:var(--text-muted)">Termin: ${escapeHtml(u.deadline)}</div>
				</div>
				<span style="font-weight:700;font-size:0.875rem">${escapeHtml(u.amount)}</span>
			</div>
		`).join('');

		return [
			dashboardHeader({
				title: 'Płatności',
				subtitle: 'Rejestr wpłat i wypłat, wielowalutowe rozliczenia, monitoring terminów',
				actions: [
					button({ label: 'Import wyciągu bankowego', icon: 'fa-solid fa-upload', variant: 'outline' }),
					button({ label: 'Rejestruj wpłatę', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Wpłynęło (marzec)', value: '186 450 PLN', icon: 'fa-solid fa-arrow-down-to-line', iconTone: 'green', trend: '<i class="fa-solid fa-arrow-trend-up"></i> +22% vs. luty', trendTone: 'positive' })}
				${statCard({ title: 'Oczekiwane (kwiecień)', value: '248 900 PLN', icon: 'fa-solid fa-clock-rotate-left', iconTone: 'blue' })}
				${statCard({ title: 'Do weryfikacji', value: '3', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange', trend: 'Wymagają ręcznego przypisania', trendTone: 'negative' })}
				${statCard({ title: 'Kursy walut (NBP)', value: '4,24 PLN/EUR', icon: 'fa-solid fa-coins', iconTone: 'purple', trend: '4,09 PLN/USD · kurs z 27.03.2026', trendTone: 'neutral' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:2fr 1fr">
				${panel({
					title: 'Historia płatności',
					action: `<div style="display:flex;gap:0.5rem">
						<select class="inline-select"><option>Wszystkie</option><option>Przychodzące</option><option>Wychodzące</option><option>Do weryfikacji</option></select>
					</div>`,
					body: `<div class="table-container">
						<table>
							<thead><tr><th>Data</th><th>Uczestnik / Podmiot</th><th>Impreza</th><th>Opis</th><th style="text-align:right">Kwota</th><th>Przypisanie</th><th>Status</th><th></th></tr></thead>
							<tbody>${payRows}</tbody>
						</table>
					</div>`
				})}
				${panel({ title: '⏰ Nadchodzące terminy', body: `<div class="alert-list">${upcomingRows}</div>` })}
			</div>`
		].join('');
	}

	/* ===== KSIĘGOWOŚĆ ===== */
	function renderKsiegowosc() {
		return [
			dashboardHeader({
				title: 'Księgowość',
				subtitle: 'Rozliczenia TFG/TFP, faktury, VAT marża, eksport do systemu zewnętrznego',
				actions: [
					button({ label: 'Eksport do Subiekta', icon: 'fa-solid fa-arrow-up-from-bracket', variant: 'outline' }),
					button({ label: 'Nowa faktura', icon: 'fa-solid fa-receipt' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'TFG do odprowadzenia', value: '2 418 PLN', icon: 'fa-solid fa-landmark', iconTone: 'blue', trend: 'Termin: 10.04.2026', trendTone: 'negative' })}
				${statCard({ title: 'TFP (naliczone)', value: '47 uczestn.', icon: 'fa-solid fa-users', iconTone: 'purple' })}
				${statCard({ title: 'Faktury VAT wydane', value: '28', icon: 'fa-solid fa-file-invoice', iconTone: 'green', trend: '<i class="fa-solid fa-check"></i> Wszystkie wysłane', trendTone: 'positive' })}
				${statCard({ title: 'Pro-forma oczekujące', value: '14', icon: 'fa-solid fa-hourglass', iconTone: 'orange', trend: 'Zamienią się po wpłacie', trendTone: 'neutral' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
				${panel({ title: 'Rozliczenie TFG / TFP — Kwiecień 2026', body: `
					<div class="info-table">
						<div class="info-row"><span>Liczba umów obj. TFG</span><strong>142 umowy</strong></div>
						<div class="info-row"><span>Wartość umów obj. TFG</span><strong>604 580 PLN</strong></div>
						<div class="info-row"><span>Stawka TFG</span><strong>0,4%</strong></div>
						<div class="info-row"><span>Naliczone TFG</span><strong>2 418,32 PLN</strong></div>
						<div class="info-row"><span>Korekty rezygnacji</span><strong>-3 umowy (anulowane)</strong></div>
						<div class="info-row"><span>TFG po korekcie</span><strong>2 321,80 PLN</strong></div>
						<div class="info-row"><span>Liczba uczestników TFP</span><strong>47 osób</strong></div>
					</div>
					<div style="margin-top:1rem;display:flex;gap:0.5rem">
						${button({ label: 'Generuj raport TFG', icon: 'fa-solid fa-download', variant: 'outline' })}
					</div>
				` })}
				${panel({ title: 'VAT Marża — Q1 2026', body: `
					<div class="info-table">
						<div class="info-row"><span>Przychody z usług</span><strong>842 400 PLN</strong></div>
						<div class="info-row"><span>Koszty w UE</span><strong>310 200 PLN</strong></div>
						<div class="info-row"><span>Koszty poza UE</span><strong>198 600 PLN</strong></div>
						<div class="info-row"><span>Marża brutto UE</span><strong>179 400 PLN</strong></div>
						<div class="info-row"><span>VAT od marży UE (23%)</span><strong>41 262 PLN</strong></div>
						<div class="info-row"><span>Marża brutto poza UE</span><strong>154 200 PLN</strong></div>
						<div class="info-row"><span>VAT od marży poza UE (0%)</span><strong>0 PLN</strong></div>
					</div>
					<div style="margin-top:1rem">
						${button({ label: 'Pobierz JPK', icon: 'fa-solid fa-file-export', variant: 'outline' })}
					</div>
				` })}
			</div>`,
			panel({ title: 'Rejestr faktur — Marzec 2026', action: `<select class="inline-select"><option>Wszystkie</option><option>Pro-forma</option><option>VAT</option><option>Kosztowe</option></select>`, body: `
				<div class="table-container">
					<table>
						<thead><tr><th>Nr faktury</th><th>Kontrahent</th><th>Impreza</th><th>Typ</th><th style="text-align:right">Netto</th><th style="text-align:right">VAT</th><th style="text-align:right">Brutto</th><th>Status</th><th></th></tr></thead>
						<tbody>
							<tr><td>FV/2026/038</td><td>ZHP Hufiec Gdańsk</td><td>MT-2026-IT-03</td><td><span class="type-pill">VAT</span></td><td style="text-align:right">144 000 zł</td><td style="text-align:right">—</td><td style="text-align:right;font-weight:700">144 000 zł</td><td>${statusBadge('Wysłana', 'success')}</td><td>${button({ label: 'PDF', variant: 'outline' })}</td></tr>
							<tr><td>PF/2026/039</td><td>Nowak Barbara</td><td>MT-2026-WL-01</td><td><span class="type-pill">Pro-forma</span></td><td style="text-align:right">5 880 zł</td><td style="text-align:right">—</td><td style="text-align:right;font-weight:700">5 880 zł</td><td>${statusBadge('Oczekuje wpłaty', 'warning')}</td><td>${button({ label: 'PDF', variant: 'outline' })}</td></tr>
							<tr><td>FK/2026/040</td><td>Hotel Casa La Salle, Rzym</td><td>MT-2026-IT-03</td><td><span class="type-pill warning">Kosztowa</span></td><td style="text-align:right">3 500 EUR</td><td style="text-align:right">—</td><td style="text-align:right;font-weight:700">3 500 EUR</td><td>${statusBadge('Zaksięgowana', 'success')}</td><td>${button({ label: 'PDF', variant: 'outline' })}</td></tr>
						</tbody>
					</table>
				</div>
			` })
		].join('');
	}

	window.UmowyView = { renderUmowy };
	window.PlatnosciView = { renderPlatnosci };
	window.KsiegowoscView = { renderKsiegowosc };
})();
