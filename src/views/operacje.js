(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== BILETY LOTNICZE ===== */
	function renderBilety() {
		const flights = [
			{ group: 'MT-2026-WL-01', name: 'Ziemia Święta', pnr: 'LO4KL2 / LO4KL3', airline: 'LOT Polish Airlines', route: 'WAW→TLV→WAW', date: '25.04 / 02.05.2026', seats: 42, booked: 42, deposit: '8 400 USD', depositDeadline: '01.04.2026', cancelDeadline: '10.04.2026', status: 'Potwierdzony', statusTone: 'success', urgent: true },
			{ group: 'MT-2026-IT-03', name: 'Włochy', pnr: 'W6 9812 / W6 9813', airline: 'Wizz Air', route: 'KRK→FCO→KRK', date: '12.04 / 19.04.2026', seats: 45, booked: 45, deposit: 'Opłacony ✓', depositDeadline: '—', cancelDeadline: 'Bezkosztowo do 01.04', status: 'Wykupiony', statusTone: 'success', urgent: false },
			{ group: 'MT-2026-ES-02', name: 'Santiago', pnr: 'VY 1234', airline: 'Vueling', route: 'WAW→MAD→SCQ', date: '05.05.2026', seats: 30, booked: 20, deposit: '2 100 EUR', depositDeadline: '15.04.2026', cancelDeadline: '25.04.2026', status: 'Opcja — zbieranie', statusTone: 'info', urgent: false },
			{ group: 'MT-2026-PT-01', name: 'Fatima', pnr: 'TP 1822', airline: 'TAP Air Portugal', route: 'WAW→LIS→WAW', date: '18.05.2026', seats: 35, booked: 18, deposit: 'Do potwierdzenia', depositDeadline: '20.04.2026', cancelDeadline: '30.04.2026', status: 'Wstępna rezerwacja', statusTone: 'warning', urgent: false },
		];

		const rows = flights.map(f => `
			<tr class="${f.urgent ? 'row-urgent' : ''}">
				<td>
					${f.urgent ? '<span class="urgent-dot"></span>' : ''}
					<code style="font-size:0.82rem">${escapeHtml(f.pnr)}</code><br>
					<small>${escapeHtml(f.airline)}</small>
				</td>
				<td><strong>${escapeHtml(f.route)}</strong><br><small>${escapeHtml(f.date)}</small></td>
				<td><code style="font-size:0.8rem">${escapeHtml(f.group)}</code><br><small>${escapeHtml(f.name)}</small></td>
				<td style="text-align:center;font-weight:700">${f.booked}<span style="color:var(--text-muted);font-weight:400">/${f.seats}</span></td>
				<td>
					<span style="font-weight:600;color:${f.urgent ? 'var(--danger-color)' : 'inherit'}">${escapeHtml(f.deposit)}</span>
					${f.depositDeadline !== '—' ? `<br><small style="color:${f.urgent ? 'var(--danger-color)' : 'var(--text-muted)'}">do: ${escapeHtml(f.depositDeadline)}</small>` : ''}
				</td>
				<td><small>${escapeHtml(f.cancelDeadline)}</small></td>
				<td>${statusBadge(f.status, f.statusTone)}</td>
				<td>
					<div style="display:flex;gap:0.3rem">
						${button({ label: 'Szczegóły', variant: 'outline' })}
						${button({ label: 'Lista', variant: 'outline' })}
					</div>
				</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Bilety Lotnicze',
				subtitle: 'Rejestr rezerwacji lotniczych, depozyty, redukcje miejsc i terminy anulacji',
				actions: [
					button({ label: 'Lista do biletowania', icon: 'fa-solid fa-users', variant: 'outline' }),
					button({ label: 'Nowa rezerwacja', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Aktywne PNR', value: '8', icon: 'fa-solid fa-plane', iconTone: 'blue' })}
				${statCard({ title: 'Miejsc wykupionych', value: '157', icon: 'fa-solid fa-chair', iconTone: 'green' })}
				${statCard({ title: 'Terminów w tym tygodniu', value: '2', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange', trend: 'Depozyt LOT: 01.04.2026', trendTone: 'negative' })}
				${statCard({ title: 'Depozyty do wpłaty', value: '10 500 USD', icon: 'fa-solid fa-money-bill-transfer', iconTone: 'purple' })}
			</div>`,
			panel({
				title: 'Rezerwacje lotnicze',
				body: `
					<div class="alert-banner danger" style="margin-bottom:1rem">
						<i class="fa-solid fa-bell"></i>
						<strong>PILNE:</strong> Depozyt LOT (LO4KL2/LO4KL3) — 8 400 USD płatny do <strong>01.04.2026</strong> (5 dni). Skontaktuj się z działem lotniczym.
					</div>
					<div class="table-container">
						<table>
							<thead><tr><th>PNR / Linia</th><th>Trasa / Data</th><th>Impreza</th><th style="text-align:center">Miejsca</th><th>Depozyt</th><th>Deadline anulacji</th><th>Status</th><th></th></tr></thead>
							<tbody>${rows}</tbody>
						</table>
					</div>`
			})
		].join('');
	}

	/* ===== BOOKING / HOTELE ===== */
	function renderHotele() {
		const hotels = [
			{ group: 'MT-2026-WL-01', hotel: 'Dan Jerusalem Hotel', city: 'Jerozolima', nights: 3, rooms: 25, type: 'DBL/SGL', price: '180 USD/pokój/noc', deposit: '5 400 USD', depositDate: '05.04.2026', options: 'Do 15.04.2026', confirm: 'Potwierdzone', status: 'OK', statusTone: 'success' },
			{ group: 'MT-2026-WL-01', hotel: 'Bethlehem Star Hotel', city: 'Betlejem', nights: 2, rooms: 25, type: 'DBL/SGL', price: '120 USD/pokój/noc', deposit: '3 000 USD', depositDate: '05.04.2026', options: 'Do 15.04.2026', confirm: 'Potwierdzone', status: 'OK', statusTone: 'success' },
			{ group: 'MT-2026-IT-03', hotel: 'Casa La Salle', city: 'Rzym', nights: 6, rooms: 23, type: 'DBL/TRIP', price: '95 EUR/pokój/noc', deposit: '3 500 EUR (wpłacony)', depositDate: '—', options: 'Bezkosztowo do 5.04', confirm: 'Potwierdzone ✓', status: 'Wpłacono dep.', statusTone: 'success' },
			{ group: 'MT-2026-ES-02', hotel: 'Hotel Compostela', city: 'Santiago de Compostela', nights: 4, rooms: 15, type: 'DBL', price: '110 EUR/pokój/noc', deposit: '2 200 EUR', depositDate: '20.04.2026', options: 'Do 01.05.2026', confirm: 'Opcja (20 rooms)', status: 'Opcja wstępna', statusTone: 'warning' },
		];

		const rows = hotels.map(h => `
			<tr>
				<td><strong>${escapeHtml(h.hotel)}</strong><br><small><i class="fa-solid fa-location-dot"></i> ${escapeHtml(h.city)}</small></td>
				<td><code style="font-size:0.8rem">${escapeHtml(h.group)}</code></td>
				<td style="text-align:center">${h.nights} nocy</td>
				<td style="text-align:center">${h.rooms} pok.</td>
				<td><small>${escapeHtml(h.type)}</small><br><strong>${escapeHtml(h.price)}</strong></td>
				<td>${escapeHtml(h.deposit)}<br><small>${escapeHtml(h.depositDate)}</small></td>
				<td><small>${escapeHtml(h.options)}</small></td>
				<td>${statusBadge(h.status, h.statusTone)}</td>
				<td>
					<div style="display:flex;gap:0.3rem">
						${button({ label: 'Szczegóły', variant: 'outline' })}
					</div>
				</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Booking / Hotele',
				subtitle: 'Zarządzanie rezerwacjami hotelowymi, rooming list, płatności do kontrahentów',
				actions: [
					button({ label: 'Rooming list', icon: 'fa-solid fa-bed', variant: 'outline' }),
					button({ label: 'Dodaj hotel', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Aktywne hotele', value: '14', icon: 'fa-solid fa-hotel', iconTone: 'blue' })}
				${statCard({ title: 'Pokoje zarezerwowane', value: '186', icon: 'fa-solid fa-bed', iconTone: 'green' })}
				${statCard({ title: 'Opcje wygasają', value: '3', icon: 'fa-solid fa-clock', iconTone: 'orange', trend: 'Najbliższa: 05.04.2026', trendTone: 'negative' })}
				${statCard({ title: 'Do zapłaty hotelom', value: '15 600 USD + 2 200 EUR', icon: 'fa-solid fa-money-bill', iconTone: 'purple' })}
			</div>`,
			panel({
				title: 'Hotele i rezerwacje',
				body: `<div class="table-container">
					<table>
						<thead><tr><th>Hotel / Miasto</th><th>Impreza</th><th>Noce</th><th>Pokoje</th><th>Typ / Cena</th><th>Depozyt</th><th>Czas opcji</th><th>Status</th><th></th></tr></thead>
						<tbody>${rows}</tbody>
					</table>
				</div>`
			}),
			`<div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
				${panel({ title: 'Uwagi specjalne — grupy', body: `
					<div class="notes-list">
						<div class="note-item"><span class="note-group">WL-01</span><p>3 uczestników — dieta halal (Dan Jerusalem). 1 uczestnik — alergia na gluten (wszystkie hotele).</p></div>
						<div class="note-item"><span class="note-group">IT-03</span><p>Wczesne śniadanie (6:30) przed wyjazdem do Watykanu — dzień 3. Lunch box na dzień 5.</p></div>
						<div class="note-item"><span class="note-group">ES-02</span><p>Sprawdzić dostępność pokoi od 04.05. Centrum miasta wymagane przez org.</p></div>
					</div>
				` })}
				${panel({ title: 'Atrakcje i wstępy grupowe', body: `
					<div class="table-container">
						<table style="font-size:0.82rem">
							<thead><tr><th>Atrakcja</th><th>Data</th><th>Impreza</th><th>Osoby</th><th>Status</th></tr></thead>
							<tbody>
								<tr><td>Muzea Watykańskie + Kaplica Sykstyńska</td><td>14.04.2026</td><td>IT-03</td><td>45</td><td>${statusBadge('Potwierdzone', 'success')}</td></tr>
								<tr><td>Wejście na Masadę (kabel car)</td><td>27.04.2026</td><td>WL-01</td><td>42</td><td>${statusBadge('Rezerwacja', 'info')}</td></tr>
								<tr><td>Jad Waszem — zwiedzanie</td><td>28.04.2026</td><td>WL-01</td><td>42</td><td>${statusBadge('Do potwierdzenia', 'warning')}</td></tr>
							</tbody>
						</table>
					</div>
				` })}
			</div>`
		].join('');
	}

	/* ===== MSZE ŚWIĘTE ===== */
	function renderMsze() {
		const masses = [
			{ date: '25.04.2026 18:00', group: 'MT-2026-WL-01', place: 'Bazylika Grobu Pańskiego', city: 'Jerozolima', celebrant: 'ks. Jan Wiśniewski', celebreta: '✓ Dostarczona', persons: 42, reserved: 'Tak', confirm: 'Potwierdzona', status: 'Gotowe', statusTone: 'success' },
			{ date: '26.04.2026 07:00', group: 'MT-2026-WL-01', place: 'Betlejem — Grota Narodzenia', city: 'Betlejem', celebrant: 'ks. Jan Wiśniewski', celebreta: '✓ Dostarczona', persons: 42, reserved: 'Tak', confirm: 'Potwierdzona', status: 'Gotowe', statusTone: 'success' },
			{ date: '27.04.2026 08:30', group: 'MT-2026-WL-01', place: 'Nazaret — Bazylika Zwiastowania', city: 'Nazaret', celebrant: 'ks. Jan Wiśniewski', celebreta: '✓', persons: 42, reserved: 'W toku', confirm: 'Oczekuje', status: 'Potwierdzenie', statusTone: 'warning' },
			{ date: '12.04.2026 19:00', group: 'MT-2026-IT-03', place: 'Bazylika Św. Piotra, Watykan', city: 'Rzym', celebrant: 'ks. Paweł Nowicki', celebreta: '✓', persons: 45, reserved: 'Tak', confirm: 'Potwierdzona ✓', status: 'Gotowe', statusTone: 'success' },
			{ date: '14.04.2026 07:00', group: 'MT-2026-IT-03', place: 'Kościół Gesu, Rzym', city: 'Rzym', celebrant: 'ks. Paweł Nowicki', celebreta: '✓', persons: 45, reserved: 'Tak', confirm: 'Potwierdzona', status: 'Gotowe', statusTone: 'success' },
			{ date: '15.04.2026 10:00', group: 'MT-2026-IT-03', place: 'Asyż — Bazylika Św. Franciszka', city: 'Asyż', celebrant: 'ks. Paweł Nowicki', celebreta: '— brak', persons: 45, reserved: 'Nie', confirm: 'Do rezerwacji', status: 'Brak celebrety', statusTone: 'danger' },
		];

		const rows = masses.map(m => `
			<tr>
				<td><strong>${escapeHtml(m.date)}</strong></td>
				<td><code style="font-size:0.8rem">${escapeHtml(m.group)}</code></td>
				<td>
					<strong>${escapeHtml(m.place)}</strong><br>
					<small><i class="fa-solid fa-location-dot"></i> ${escapeHtml(m.city)}</small>
				</td>
				<td>${escapeHtml(m.celebrant)}<br><small style="color:${m.celebreta.includes('brak') ? 'var(--danger-color)' : 'var(--success-color)'}">${escapeHtml(m.celebreta)}</small></td>
				<td style="text-align:center">${m.persons}</td>
				<td>${m.reserved === 'Tak' ? '<span style="color:var(--success-color)"><i class="fa-solid fa-check-circle"></i></span>' : `<span style="color:var(--warning-color)">${escapeHtml(m.reserved)}</span>`}</td>
				<td>${statusBadge(m.status, m.statusTone)}</td>
				<td>
					${button({ label: 'Edytuj', variant: 'outline' })}
				</td>
			</tr>
		`).join('');

		return [
			dashboardHeader({
				title: 'Msze Święte',
				subtitle: 'Rezerwacje liturgii dla grup pielgrzymkowych — kościoły, basiliki, celebreta, potwierdzenia',
				actions: [
					button({ label: 'Formularz rezerwacji liturgii', icon: 'fa-solid fa-file-pen', variant: 'outline' }),
					button({ label: 'Dodaj mszę', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Zaplanowanych mszy', value: '24', icon: 'fa-solid fa-church', iconTone: 'blue' })}
				${statCard({ title: 'Potwierdzone', value: '19', icon: 'fa-solid fa-check-circle', iconTone: 'green' })}
				${statCard({ title: 'Brak celebrety', value: '2', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange', trend: 'Wymagają działania', trendTone: 'negative' })}
				${statCard({ title: 'Do potwierdzenia', value: '3', icon: 'fa-solid fa-hourglass-half', iconTone: 'purple' })}
			</div>`,
			panel({
				title: 'Lista mszy świętych',
				action: `<select class="inline-select"><option>Wszystkie imprezy</option><option>MT-2026-WL-01</option><option>MT-2026-IT-03</option></select>`,
				body: `<div class="table-container">
					<table>
						<thead><tr><th>Data i godzina</th><th>Impreza</th><th>Miejsce</th><th>Celebrans / Celebreta</th><th style="text-align:center">Osoby</th><th>Rezerwacja</th><th>Status</th><th></th></tr></thead>
						<tbody>${rows}</tbody>
					</table>
				</div>`
			})
		].join('');
	}

	window.BiletyView = { renderBilety };
	window.HoteleView = { renderHotele };
	window.MszeView = { renderMsze };
})();
