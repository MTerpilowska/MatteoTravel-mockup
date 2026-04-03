(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	function renderRezerwacje() {
		const participants = [
			{ lp: 1, name: 'Wiśniewski Adam', pesel: '75010***** (Ppkt 37)', room: '101 DBL', flight: 'LO4KL2', paid: 4990, total: 4990, balance: 0, contract: 'Podpisana', docs: 'OK', status: 'Kompletny', statusTone: 'success' },
			{ lp: 2, name: 'Wiśniewska Maria (żona)', pesel: '78032***** (Ppkt 38)', room: '101 DBL', flight: 'LO4KL2', paid: 4990, total: 4990, balance: 0, contract: 'Podpisana', docs: 'OK', status: 'Kompletny', statusTone: 'success' },
			{ lp: 3, name: 'ks. Jan Kowalczyk (Gratis)', pesel: '69045***** (Ppkt 30)', room: '105 SGL', flight: 'LO4KL2', paid: 0, total: 0, balance: 0, contract: 'Podpisana', docs: 'OK', status: 'Gratis', statusTone: 'purple' },
			{ lp: 4, name: 'Nowak Barbara', pesel: '82071***** (Ppkt 55)', room: '203 SGL+', flight: 'LO4KL2', paid: 3500, total: 5880, balance: -2380, contract: 'Podpisana', docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
			{ lp: 5, name: 'Zielińska Anna', pesel: '91120***** (Ppkt 34)', room: '204 DBL', flight: 'LO4KL2', paid: 2000, total: 4990, balance: -2990, contract: 'Wysłana', docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
			{ lp: 6, name: 'Zieliński Marek', pesel: '88093***** (Ppkt 38)', room: '204 DBL', flight: 'LO4KL2', paid: 4990, total: 4990, balance: 0, contract: 'Podpisana', docs: 'Weryfikacja', status: 'Dokumenty', statusTone: 'info' },
			{ lp: 7, name: 'Malczewski Tomasz', pesel: '95060***** (Ppkt 30)', room: '301 DBL', flight: 'LO4KL3', paid: 0, total: 4990, balance: -4990, contract: 'Brak', docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger' },
			{ lp: 8, name: 'Malczewska Ewa', pesel: '97110***** (Ppkt 28)', room: '301 DBL', flight: 'LO4KL3', paid: 0, total: 4990, balance: -4990, contract: 'Brak', docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger' },
		];

		const rows = participants.map(p => `
			<tr class="${p.balance < 0 ? '' : ''}">
				<td style="text-align:center;font-weight:600;color:var(--text-muted)">${p.lp}</td>
				<td>
					<strong>${escapeHtml(p.name)}</strong><br>
					<small style="color:var(--text-muted);font-family:monospace">${escapeHtml(p.pesel)}</small>
				</td>
				<td><span class="room-pill">${escapeHtml(p.room)}</span></td>
				<td><code style="font-size:0.8rem">${escapeHtml(p.flight)}</code></td>
				<td style="text-align:right;font-weight:600">${p.total > 0 ? p.total.toLocaleString('pl-PL') + ' zł' : '<span style="color:var(--text-muted)">Gratis</span>'}</td>
				<td style="text-align:right;color:var(--success-color);font-weight:600">${p.paid > 0 ? p.paid.toLocaleString('pl-PL') + ' zł' : '—'}</td>
				<td style="text-align:right;font-weight:700;color:${p.balance < 0 ? 'var(--danger-color)' : 'var(--success-color)'}">
					${p.balance < 0 ? p.balance.toLocaleString('pl-PL') + ' zł' : (p.total > 0 ? '<i class="fa-solid fa-check"></i>' : '—')}
				</td>
				<td>${statusBadge(p.contract === 'Podpisana' ? 'Podpisana ✓' : p.contract, p.contract === 'Podpisana' ? 'success' : p.contract === 'Wysłana' ? 'info' : 'neutral')}</td>
				<td>${p.docs === 'OK' ? '<span style="color:var(--success-color)"><i class="fa-solid fa-check-circle"></i> OK</span>' : `<span style="color:var(--warning-color)"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(p.docs)}</span>`}</td>
				<td>${statusBadge(p.status, p.statusTone)}</td>
				<td>
					<div style="display:flex;gap:0.3rem">
						${button({ label: 'Edytuj', variant: 'outline' })}
					</div>
				</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Rezerwacje uczestników',
				subtitle: 'Widok rezerwacji dla grupy: MT-2026-WL-01 · Ziemia Święta · 25.04–02.05.2026',
				actions: [
					button({ label: 'Lista do biletowania', icon: 'fa-solid fa-list', variant: 'outline' }),
					button({ label: 'Export Excel', icon: 'fa-solid fa-download', variant: 'outline' }),
					button({ label: 'Dodaj uczestnika', icon: 'fa-solid fa-user-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Zapisani', value: '42 / 50', icon: 'fa-solid fa-users', iconTone: 'blue' })}
				${statCard({ title: 'W pełni opłaceni', value: '28', icon: 'fa-solid fa-circle-check', iconTone: 'green', trend: '<i class="fa-solid fa-clock"></i> 14 z zaległościami', trendTone: 'negative' })}
				${statCard({ title: 'Brak dokumentów', value: '10', icon: 'fa-solid fa-passport', iconTone: 'orange', trend: 'Termin: 05.04.2026', trendTone: 'negative' })}
				${statCard({ title: 'Brak umowy', value: '4', icon: 'fa-solid fa-file-contract', iconTone: 'purple' })}
			</div>`,
			panel({
				title: 'Lista uczestników — MT-2026-WL-01',
				action: `<div style="display:flex;gap:0.5rem;align-items:center">
					<select class="inline-select"><option>Wszyscy uczestnicy</option><option>Nieopłaceni</option><option>Brak dokumentów</option><option>Brak umowy</option></select>
					${button({ label: 'Wyślij przypomnienie SMS', icon: 'fa-solid fa-comment-sms', variant: 'outline' })}
				</div>`,
				body: `<div class="table-container">
					<table>
						<thead>
							<tr>
								<th style="text-align:center">Lp</th>
								<th>Uczestnik / PESEL</th>
								<th>Pokój</th>
								<th>Nr lotu</th>
								<th style="text-align:right">Wartość</th>
								<th style="text-align:right">Wpłacono</th>
								<th style="text-align:right">Saldo</th>
								<th>Umowa</th>
								<th>Dokumenty</th>
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>${rows}</tbody>
					</table>
				</div>`,
				bodyStyle: 'padding: 0'
			}),
			`<div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
				${panel({ title: 'Formularz szybkiego zapisu uczestnika', body: `
					<div class="form-mockup">
						<div class="form-row-2">
							<label class="form-field"><span>Imię i nazwisko</span><input type="text" placeholder="np. Jan Kowalski" /></label>
							<label class="form-field"><span>PESEL</span><input type="text" placeholder="00000000000" /></label>
						</div>
						<div class="form-row-2">
							<label class="form-field"><span>Telefon</span><input type="text" placeholder="600 000 000" /></label>
							<label class="form-field"><span>E-mail</span><input type="email" placeholder="jan.kowalski@poczta.pl" /></label>
						</div>
						<div class="form-row-2">
							<label class="form-field"><span>Typ pokoju</span>
								<select><option>DBL — pokój dwuosobowy</option><option>SGL — pokój jednoosobowy (+890 zł)</option><option>TPL — pokój trzyosobowy</option></select>
							</label>
							<label class="form-field"><span>Nr lotu</span>
								<select><option>LO4KL2 (25.04, WAW→TLV)</option><option>LO4KL3 (02.05, TLV→WAW)</option></select>
							</label>
						</div>
						<div class="form-row-2">
							<label class="form-field"><span>Wyjątek cenowy</span>
								<select><option>Cena standardowa: 4 990 zł</option><option>Gratis (biuro)</option><option>Gratis (kontrahent)</option><option>Cena indywidualna</option></select>
							</label>
							<label class="form-field"><span>Płatnik</span><input type="text" placeholder="Jak uczestnik — lub wpisz dane" /></label>
						</div>
						<div class="form-actions" style="margin-top:1rem;display:flex;gap:0.5rem">
							${button({ label: 'Anuluj', variant: 'outline' })}
							${button({ label: 'Zapisz uczestnika', icon: 'fa-solid fa-check' })}
						</div>
					</div>
				` })}
				${panel({ title: 'Rooming list — podgląd', body: `
					<div class="room-list">
						<div class="room-row"><span class="room-badge">101 DBL</span><span>Wiśniewski Adam + Wiśniewska Maria</span></div>
						<div class="room-row"><span class="room-badge">105 SGL</span><span>ks. Jan Kowalczyk <em style="color:var(--text-muted)">(gratis)</em></span></div>
						<div class="room-row warning"><span class="room-badge warn">203 SGL+</span><span>Nowak Barbara <em style="color:var(--danger-color)">(dopłata czeka)</em></span></div>
						<div class="room-row"><span class="room-badge">204 DBL</span><span>Zielińska Anna + Zieliński Marek</span></div>
						<div class="room-row warning"><span class="room-badge warn">301 DBL</span><span>Malczewski Tomasz + Malczewska Ewa <em style="color:var(--danger-color)">(brak wpłaty)</em></span></div>
						<div class="room-row empty"><span class="room-badge empty">302 DBL</span><span style="color:var(--text-muted)">— wolne miejsce —</span></div>
						<div class="room-row empty"><span class="room-badge empty">303 DBL</span><span style="color:var(--text-muted)">— wolne miejsce —</span></div>
					</div>
				` })}
			</div>`
		].join('');
	}

	window.RezerwacjeView = { renderRezerwacje };
})();
