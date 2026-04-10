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
					${button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-user-plus', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('dodaj-uczestnika-modal').classList.add('show')" } })}
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
			</div>`,
		`<div id="dodaj-uczestnika-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
			<div class="demo-modal" style="max-width:600px">
				<div class="demo-modal-header">
					<h3 style="margin:0;font-size:1.1rem;font-weight:600">Nowa rezerwacja — MT-2026-WL-01</h3>
					<button class="demo-modal-close" data-no-demo="true" onclick="document.getElementById('dodaj-uczestnika-modal').classList.remove('show')">×</button>
				</div>
				<div class="demo-modal-body">
					<div class="form-mockup">
						<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.75rem">Uczestnik</div>
						<label class="form-field" style="margin-bottom:1rem">
							<input type="text" list="uczestnicy-list" value="Kowalski Jan" placeholder="Zacznij pisać, aby wyszukać..." style="width:100%" />
							<datalist id="uczestnicy-list">
								<option value="Kowalski Jan">PESEL: 75010***** · tel. 600 000 000</option>
								<option value="Wiśniewski Adam">PESEL: 75010***** · 101 DBL</option>
								<option value="Wiśniewska Maria">PESEL: 78032***** · 101 DBL</option>
								<option value="Nowak Barbara">PESEL: 82071***** · 203 SGL+</option>
								<option value="Zielińska Anna">PESEL: 91120***** · 204 DBL</option>
								<option value="Zieliński Marek">PESEL: 88093***** · 204 DBL</option>
								<option value="Malczewski Tomasz">PESEL: 95060*****</option>
								<option value="Malczewska Ewa">PESEL: 97110*****</option>
								<option value="Hendzel ks. Henryk">Parafia MB Różańcowej, Rzeszów</option>
								<option value="Gierula ks. Maciej">Parafia, Kraków</option>
								<option value="Nowak ks. Marek">Parafia Narodzenia Pańskiego, Wrocław</option>
							</datalist>
						</label>
						<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem">Szczegóły rezerwacji</div>
						<div class="form-row-2">
							<label class="form-field"><span>Typ pokoju</span>
								<select><option>DBL — pokój dwuosobowy</option><option>SGL — pokój jednoosobowy (+890 zł)</option><option>SGL+ — pokój z dopłatą (+1 200 zł)</option><option>TPL — pokój trzyosobowy</option></select>
							</label>
							<label class="form-field"><span>Współlokator (DBL)</span><input type="text" placeholder="Imię i nazwisko lub — " /></label>
						</div>
						<div class="form-row-2">
							<label class="form-field"><span>Nr lotu (wylot)</span>
								<select><option>LO4KL2 (25.04, WAW→TLV)</option><option>LO4KL3 (02.05, TLV→WAW)</option><option>Brak — autokar / inny</option></select>
							</label>
							<label class="form-field"><span>Nr lotu (powrót)</span>
								<select><option>LO4KL3 (02.05, TLV→WAW)</option><option>LO4KL2 (25.04, WAW→TLV)</option><option>Brak</option></select>
							</label>
						</div>
						<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:1rem 0 0.75rem">Płatność</div>
						<div class="form-row-2">
							<label class="form-field"><span>Cena / wyjątek</span>
								<select><option>Cena standardowa: 4 990 zł</option><option>Gratis (biuro)</option><option>Gratis (kontrahent)</option><option>Cena indywidualna</option></select>
							</label>
							<label class="form-field"><span>Płatnik (jeśli inny)</span><input type="text" placeholder="Jak uczestnik — lub wpisz dane" /></label>
						</div>
						<div class="form-row-2">
							<label class="form-field"><span>Wpłata zaliczki (zł)</span><input type="number" placeholder="np. 500" /></label>
							<label class="form-field"><span>Numer umowy</span><input type="text" placeholder="Zostanie nadany automatycznie" /></label>
						</div>
					</div>
				</div>
				<div class="demo-modal-footer">
					<button class="btn btn-outline" data-no-demo="true" onclick="document.getElementById('dodaj-uczestnika-modal').classList.remove('show')">Anuluj</button>
					${button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-check' })}
				</div>
			</div>
		</div>`
		].join('');
	}

	window.RezerwacjeView = { renderRezerwacje };
})();
