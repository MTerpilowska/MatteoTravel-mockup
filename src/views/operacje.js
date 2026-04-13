(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	/* ===== BILETY LOTNICZE ===== */
	function renderBilety() {
		const flights = [
			{
				group: 'MT-2026-WL-01', name: 'Ziemia Święta', pnr: 'LO4KL2 / LO4KL3', airline: 'LOT Polish Airlines',
				route: 'WAW→TLV→WAW', date: '25.04 / 02.05.2026', seats: 42, booked: 42,
				deposit: '8 400 USD', depositDeadline: '01.04.2026', cancelDeadline: '10.04.2026',
				status: 'Potwierdzony', statusTone: 'success', urgent: true,
				contractNo: 'LOT-2026-MT-041', bsp: 'BSP Poland — rozliczenie po biletowaniu',
				flightClass: 'Y (ekonomiczna)', seatBlock: 'Rządy 10–22 (blok grupowy), miejsca w schemacie 3+3',
				pricePerPerson: '420 USD', totalPrice: '17 640 USD',
				ticketDeadline: '20.04.2026', optionUntil: '—',
				contactPerson: 'Marek Anioł', contactPhone: '+48 22 577 12 34', contactEmail: 'm.aniol@lot.com',
				cancelPolicy: 'Do 10.04.2026 — bezkosztowo. 10–17.04.2026 — 50% wartości biletów. Po 17.04.2026 — 100% bezzwrotne.',
				notes: 'Wymagany blok siedzeń wspólnie. Pasażerowie z dokumentami pielgrzymkowymi — odprawa indywidualna. Potwierdzić opcję jedzenia koszernego.',
				passengers: [
					{ name: 'Jan Kowalski', passport: 'AK4521378', passportExp: '15.03.2030', seat: '10A', ticketNo: '080-4521378901', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Maria Nowak', passport: 'BE7832145', passportExp: '22.07.2028', seat: '10B', ticketNo: '080-4521378902', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Piotr Wiśniewski', passport: 'CD1239874', passportExp: '01.11.2031', seat: '10C', ticketNo: '080-4521378903', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Anna Zielińska', passport: 'DE8801234', passportExp: '08.09.2027', seat: '11A', ticketNo: '080-4521378904', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Tomasz Lewandowski', passport: 'EF3347712', passportExp: '30.04.2029', seat: '11B', ticketNo: '080-4521378905', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Katarzyna Wójcik', passport: '—', passportExp: '—', seat: '11C', ticketNo: '—', status: 'Brak dokumentów', statusTone: 'danger' },
				],
				history: [
					{ date: '10.01.2026', event: 'Złożono zapytanie o 50 miejsc', user: 'A. Kowalski' },
					{ date: '18.01.2026', event: 'LOT potwierdził 42 miejsca (blok grupowy)', user: 'A. Kowalski' },
					{ date: '25.02.2026', event: 'Wpłacono depozyt 8 400 USD', user: 'J. Nowak' },
				]
			},
			{
				group: 'MT-2026-IT-03', name: 'Włochy', pnr: 'W6 9812 / W6 9813', airline: 'Wizz Air',
				route: 'KRK→FCO→KRK', date: '12.04 / 19.04.2026', seats: 45, booked: 45,
				deposit: 'Opłacony ✓', depositDeadline: '—', cancelDeadline: 'Bezkosztowo do 01.04',
				status: 'Wykupiony', statusTone: 'success', urgent: false,
				contractNo: 'WZ-2026-MT-018', bsp: 'Karta płatnicza — płatność bezpośrednia',
				flightClass: 'W (basic)', seatBlock: 'Miejsca przypisane indywidualnie (automatycznie)',
				pricePerPerson: '189 EUR', totalPrice: '8 505 EUR',
				ticketDeadline: 'Wykupione ✓', optionUntil: 'Brak opcji — bilety wykupione',
				contactPerson: 'Infolinia grupowa Wizz Air', contactPhone: '+48 22 351 01 01', contactEmail: 'groups@wizzair.com',
				cancelPolicy: 'Przed 01.04.2026 — częściowy zwrot (opł. serwisowa bezzwrotna). Po 01.04.2026 — 100% bezzwrotne.',
				notes: 'Bagaże dodatkowe (10 kg) dokupione dla 5 uczestników. Potwierdzić numery siedzeń na 48h przed lotem.',
				passengers: [
					{ name: 'Aleksandra Kamińska', passport: 'GH6612309', passportExp: '12.06.2029', seat: '14D', ticketNo: 'WZ-981214D', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Marcin Kowalczyk', passport: 'IJ9924401', passportExp: '03.02.2030', seat: '14E', ticketNo: 'WZ-981214E', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Zofia Malinowska', passport: 'KL1100223', passportExp: '25.10.2027', seat: '15A', ticketNo: 'WZ-981215A', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Robert Szymański', passport: 'MN4456891', passportExp: '17.08.2031', seat: '15B', ticketNo: 'WZ-981215B', status: 'Zbiletowany', statusTone: 'success' },
					{ name: 'Dorota Wojciechowska', passport: 'OP7789012', passportExp: '20.01.2028', seat: '15C', ticketNo: 'WZ-981215C', status: 'Zbiletowany', statusTone: 'success' },
				],
				history: [
					{ date: '05.11.2025', event: 'Zakup 45 biletów (booking grupowy online)', user: 'M. Wiśniewska' },
					{ date: '10.11.2025', event: 'Przypisano miejsca — blok automatyczny', user: 'M. Wiśniewska' },
					{ date: '20.01.2026', event: 'Dokupiono bagaże 5 os. (10 kg)', user: 'J. Nowak' },
				]
			},
			{
				group: 'MT-2026-ES-02', name: 'Santiago', pnr: 'VY 1234', airline: 'Vueling',
				route: 'WAW→MAD→SCQ', date: '05.05.2026', seats: 30, booked: 20,
				deposit: '2 100 EUR', depositDeadline: '15.04.2026', cancelDeadline: '25.04.2026',
				status: 'Opcja — zbieranie', statusTone: 'info', urgent: false,
				contractNo: 'VY-2026-MT-007', bsp: 'BSP Poland',
				flightClass: 'Y (ekonomiczna)', seatBlock: 'Blok — miejsca do przypisania po potwierdzeniu min. 25 os.',
				pricePerPerson: '370 EUR', totalPrice: '7 400 EUR (20 os.) / 11 100 EUR (30 os.)',
				ticketDeadline: '28.04.2026', optionUntil: '30.04.2026',
				contactPerson: 'Carlos Mena', contactPhone: '+34 931 52 61 00', contactEmail: 'c.mena@vueling.com',
				cancelPolicy: 'Do 25.04.2026 — bezkosztowo. 25.04–02.05.2026 — 30% kwoty. Po 02.05.2026 — 100% bezzwrotne.',
				notes: 'Minimum 25 osób wymagane do potwierdzenia bloku grupowego. Aktualnie 20/30 — zbieranie trwa do 25.04.',
				passengers: [
					{ name: 'Ewa Dąbrowska', passport: 'QR2234567', passportExp: '14.05.2030', seat: '—', ticketNo: '—', status: 'Do biletowania', statusTone: 'warning' },
					{ name: 'Mikołaj Wróbel', passport: 'ST5567123', passportExp: '28.11.2028', seat: '—', ticketNo: '—', status: 'Do biletowania', statusTone: 'warning' },
					{ name: 'Beata Kwiatkowska', passport: '—', passportExp: '—', seat: '—', ticketNo: '—', status: 'Brak dokumentów', statusTone: 'danger' },
					{ name: 'Adam Piotrowski', passport: 'UV8890345', passportExp: '07.03.2027', seat: '—', ticketNo: '—', status: 'Do biletowania', statusTone: 'warning' },
				],
				history: [
					{ date: '20.02.2026', event: 'Złożono opcję na 30 miejsc', user: 'A. Kowalski' },
					{ date: '01.03.2026', event: 'Vueling potwierdził opcję — deadline 30.04', user: 'M. Wiśniewska' },
				]
			},
			{
				group: 'MT-2026-PT-01', name: 'Fatima', pnr: 'TP 1822', airline: 'TAP Air Portugal',
				route: 'WAW→LIS→WAW', date: '18.05.2026', seats: 35, booked: 18,
				deposit: 'Do potwierdzenia', depositDeadline: '20.04.2026', cancelDeadline: '30.04.2026',
				status: 'Wstępna rezerwacja', statusTone: 'warning', urgent: false,
				contractNo: 'TP-2026-MT-003', bsp: 'BSP Poland',
				flightClass: 'Y / W (mieszana, zależnie od daty zakupu)', seatBlock: 'Miejsca nieprzypisane — po zaksięgowaniu depozytu',
				pricePerPerson: '480 EUR', totalPrice: '8 640 EUR (18 os.) / 16 800 EUR (35 os.)',
				ticketDeadline: '08.05.2026', optionUntil: '20.04.2026',
				contactPerson: 'Ana Silva', contactPhone: '+351 21 841 71 23', contactEmail: 'a.silva@tap.pt',
				cancelPolicy: 'Do 30.04.2026 — bezkosztowo. 30.04–10.05.2026 — 40% wartości. Po 10.05.2026 — 100% bezzwrotne.',
				notes: 'Minimum 25 osób wymagane do potwierdzenia. Opóźnienie zbierania uczestników — skontaktować się z opiekunem grupy.',
				passengers: [
					{ name: 'Joanna Grabowska', passport: 'WX1123456', passportExp: '09.07.2029', seat: '—', ticketNo: '—', status: 'Do biletowania', statusTone: 'warning' },
					{ name: 'Krzysztof Nowakowski', passport: '—', passportExp: '—', seat: '—', ticketNo: '—', status: 'Brak dokumentów', statusTone: 'danger' },
					{ name: 'Magdalena Pawlak', passport: 'YZ4456789', passportExp: '21.12.2030', seat: '—', ticketNo: '—', status: 'Do biletowania', statusTone: 'warning' },
				],
				history: [
					{ date: '15.03.2026', event: 'Złożono wstępne zapytanie na 35 miejsc', user: 'A. Kowalski' },
					{ date: '28.03.2026', event: 'TAP potwierdził rezerwację wstępną', user: 'A. Kowalski' },
				]
			},
		];

		const rows = flights.map((f, idx) => `
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
						${button({ label: 'Szczegóły', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: `document.getElementById('szczegoly-lotu-${idx}-modal').classList.add('show')` } })}
						${button({ label: 'Lista do biletowania', icon: 'fa-solid fa-list-check', variant: 'outline', attrs: { 'data-no-demo': 'true', onclick: `document.getElementById('lista-biletowania-${idx}-modal').classList.add('show')` } })}
					</div>
				</td>
			</tr>
		`).join('');

		const modals = flights.map((f, idx) => {
			return `
			<div id="szczegoly-lotu-${idx}-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
				<div class="demo-modal" style="max-width:680px;width:95%">
					<div class="demo-modal-header">
						<h2><i class="fa-solid fa-ticket" style="margin-right:0.5rem;color:var(--primary-color)"></i>Szczeg\u00f3\u0142y biletu \u2014 ${escapeHtml(f.pnr)}</h2>
						<button class="demo-modal-close" data-no-demo="true" onclick="this.closest('.demo-modal-overlay').classList.remove('show')"><i class="fa-solid fa-xmark"></i></button>
					</div>
					<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">
						<div class="form-mockup">
							<div class="form-row-2">
								<div class="form-field"><span>Nr PNR</span><p style="margin:0.3rem 0 0;font-size:0.92rem;font-weight:700;font-family:monospace;color:var(--text-default)">${escapeHtml(f.pnr)}</p></div>
								<div class="form-field"><span>Typ biletu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">Grupowy</p></div>
							</div>
							<div class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.airline)}</p></div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>
							<div class="form-row-2">
								<div class="form-field"><span>Trasa (tam)</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.route)}</p></div>
								<div class="form-field"><span>Data lotu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.date)}</p></div>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczeg\u00f3\u0142y rezerwacji</div>
							<div class="form-row-2">
								<div class="form-field"><span>Liczba miejsc</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.booked)} / ${escapeHtml(f.seats)}</p></div>
								<div class="form-field"><span>Deadline ticketingu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.ticketDeadline)}</p></div>
							</div>
							<div class="form-row-2">
								<div class="form-field"><span>Impreza</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.group)} ${escapeHtml(f.name)}</p></div>
								<div class="form-field"><span>Status PNR</span><p style="margin:0.3rem 0 0">${statusBadge(f.status, f.statusTone)}</p></div>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Ceny i kontrakt</div>
							<div class="form-row-2">
								<div class="form-field"><span>Cena za osob\u0119</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.pricePerPerson)}</p></div>
								<div class="form-field"><span>Kwota \u0142\u0105cznie</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.totalPrice)}</p></div>
							</div>
							<div class="form-row-2">
								<div class="form-field"><span>Nr kontraktu</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.contractNo)}</p></div>
								<div class="form-field"><span>BSP / rozliczenie</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.bsp)}</p></div>
							</div>
							<div class="form-row-2">
								<div class="form-field"><span>Klasa</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.flightClass)}</p></div>
								<div class="form-field"><span>Blok siedze\u0144</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.seatBlock)}</p></div>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Kontakt do linii lotniczej</div>
							<div class="form-row-2">
								<div class="form-field"><span>Opiekun</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.contactPerson)}</p></div>
								<div class="form-field"><span>Telefon</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.contactPhone)}</p></div>
							</div>
							<div class="form-field" style="margin-bottom:0.75rem"><span>Email</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.contactEmail)}</p></div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Warunki i uwagi</div>
							<div class="form-field" style="margin-bottom:0.75rem"><span>Warunki anulacji</span><p style="margin:0.3rem 0 0;font-size:0.875rem;color:var(--text-default)">${escapeHtml(f.cancelPolicy) || '<em style=\'color:var(--text-muted)\'>—</em>'}</p></div>
							<div class="form-field" style="margin-bottom:0.75rem"><span>Opcja wa\u017cna do</span><p style="margin:0.3rem 0 0;font-size:0.92rem;color:var(--text-default)">${escapeHtml(f.optionUntil)}</p></div>
							<div class="form-field"><span>Uwagi operacyjne</span><p style="margin:0.3rem 0 0;font-size:0.875rem;color:var(--text-default)">${escapeHtml(f.notes) || '<em style=\'color:var(--text-muted)\'>Brak uwag.</em>'}</p></div>
						</div>
					</div>
					<div class="demo-modal-footer">
						<button class="btn btn-outline" data-no-demo="true" onclick="this.closest('.demo-modal-overlay').classList.remove('show')">Zamknij</button>
						${button({ label: 'Edytuj rezerwacj\u0119', icon: 'fa-solid fa-pen', variant: 'primary', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('edytuj-pnr-modal').classList.add('show')" } })}
					</div>
				</div>
			</div>
			<div id="lista-biletowania-${idx}-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
				<div class="demo-modal" style="max-width:760px;width:95%">
					<div class="demo-modal-header">
						<h2><i class="fa-solid fa-list-check" style="margin-right:0.5rem;color:var(--primary-color)"></i>Lista biletowania &mdash; ${escapeHtml(f.pnr)}</h2>
						<button class="demo-modal-close" data-no-demo="true" onclick="this.closest('.demo-modal-overlay').classList.remove('show')"><i class="fa-solid fa-xmark"></i></button>
					</div>
					<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto;padding:0">
						<div style="padding:0.75rem 1.25rem;background:var(--bg-secondary);border-bottom:1px solid var(--border-color);display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap">
							<span style="font-size:0.82rem"><i class="fa-solid fa-route" style="margin-right:0.3rem;color:var(--text-muted)"></i>${escapeHtml(f.route)}</span>
							<span style="font-size:0.82rem"><i class="fa-regular fa-calendar" style="margin-right:0.3rem;color:var(--text-muted)"></i>${escapeHtml(f.date)}</span>
							<span style="font-size:0.82rem"><i class="fa-solid fa-users" style="margin-right:0.3rem;color:var(--text-muted)"></i>${f.booked} / ${f.seats} miejsc</span>
							<span style="font-size:0.82rem;font-weight:600;color:var(--text-muted)">Deadline: ${escapeHtml(f.ticketDeadline)}</span>
						</div>
						<table style="width:100%;border-collapse:collapse;font-size:0.85rem">
							<thead>
								<tr style="background:var(--bg-secondary)">
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">#</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Imi\u0119 i nazwisko</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Nr paszportu</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Wa\u017cno\u015b\u0107</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Miejsce</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Nr biletu</th>
									<th style="padding:0.55rem 1rem;text-align:left;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);border-bottom:1px solid var(--border-color)">Status</th>
								</tr>
							</thead>
							<tbody>
								${f.passengers.map((p, pi) => `
								<tr style="border-bottom:1px solid var(--border-color)">
									<td style="padding:0.6rem 1rem;color:var(--text-muted);font-size:0.8rem">${pi + 1}</td>
									<td style="padding:0.6rem 1rem;font-weight:600">${escapeHtml(p.name)}</td>
									<td style="padding:0.6rem 1rem;font-family:monospace;font-size:0.83rem">${escapeHtml(p.passport)}</td>
									<td style="padding:0.6rem 1rem;font-size:0.83rem">${escapeHtml(p.passportExp)}</td>
									<td style="padding:0.6rem 1rem;font-size:0.83rem">${escapeHtml(p.seat)}</td>
									<td style="padding:0.6rem 1rem;font-family:monospace;font-size:0.8rem;color:var(--text-muted)">${escapeHtml(p.ticketNo)}</td>
									<td style="padding:0.6rem 1rem">${statusBadge(p.status, p.statusTone)}</td>
								</tr>`).join('')}
							</tbody>
						</table>
					</div>
					<div class="demo-modal-footer">
						<button class="btn btn-outline" data-no-demo="true" onclick="this.closest('.demo-modal-overlay').classList.remove('show')">Zamknij</button>
						${button({ label: 'Eksportuj PDF', icon: 'fa-solid fa-file-arrow-down', variant: 'outline' })}
					</div>
				</div>
			</div>`;
		}).join('');

		return [
			dashboardHeader({
				title: 'Bilety Lotnicze',
				subtitle: 'Rejestr rezerwacji lotniczych, depozyty, redukcje miejsc i terminy anulacji',
				actions: [
					button({ label: 'Nowa rezerwacja', icon: 'fa-solid fa-plus', attrs: { 'data-no-demo': 'true', onclick: "document.getElementById('nowy-pnr-modal').classList.add('show')" } })
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
			}),
			modals,

			/* ==== NOWY PNR modal ==== */
			`<div id="nowy-pnr-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
				<div class="demo-modal" style="max-width:680px;width:95%">
					<div class="demo-modal-header">
						<h2><i class="fa-solid fa-plane-departure" style="margin-right:0.5rem;color:var(--primary-color)"></i>Nowy PNR — rezerwacja lotów</h2>
						<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById('nowy-pnr-modal').classList.remove('show')"><i class="fa-solid fa-xmark"></i></button>
					</div>
					<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">
						<div class="form-mockup">
							<div class="form-row-2">
								<label class="form-field"><span>Nr PNR</span><input type="text" placeholder="np. LO4KL2" style="font-family:monospace;text-transform:uppercase" /></label>
								<label class="form-field"><span>Typ biletu</span><select><option>Grupowy</option><option>Indywidualny</option><option>Czarterowy</option></select></label>
							</div>
							<label class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span><select><option>LOT Polish Airlines</option><option>Ryanair</option><option>Wizz Air</option><option>EasyJet</option><option>Turkish Airlines</option><option>Inny</option></select></label>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>
							<div class="form-row-2">
								<label class="form-field"><span>Trasa (tam)</span><input type="text" placeholder="np. KRK \u2192 TLV" /></label>
								<label class="form-field"><span>Trasa (powrót)</span><input type="text" placeholder="np. TLV \u2192 KRK" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Data lotu (tam)</span><input type="date" /></label>
								<label class="form-field"><span>Data powrotu</span><input type="date" /></label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczegóły rezerwacji</div>
							<div class="form-row-2">
								<label class="form-field"><span>Liczba miejsc</span><input type="number" min="1" placeholder="np. 44" /></label>
								<label class="form-field"><span>Deadline ticketingu</span><input type="date" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Impreza</span><input type="text" placeholder="np. MT-2026-WL-01" /></label>
								<label class="form-field"><span>Status PNR</span><select><option>Opcja</option><option>Aktywny</option><option>Potwierdzony</option><option>Anulowany</option></select></label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Faktura</div>
							<div class="form-row-2">
								<label class="form-field"><span>Nr faktury</span><input type="text" placeholder="np. f.\u202f0238/01/26/F" /></label>
								<label class="form-field"><span>Kwota faktury (zł)</span><input type="number" min="0" step="0.01" placeholder="np. 84406.00" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Data opłacenia</span><input type="date" /></label>
								<label class="form-field"><span>Status faktury</span><select><option>Oczekuje</option><option>Opłacona</option><option>Anulowana</option></select></label>
							</div>
							<label class="form-field"><span>Uwagi</span><textarea rows="2" placeholder="Opcjonalne uwagi…"></textarea></label>
						</div>
					</div>
					<div class="demo-modal-footer">
						<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById('nowy-pnr-modal').classList.remove('show')">Anuluj</button>
						${button({ label: 'Dodaj', icon: 'fa-solid fa-check' })}
					</div>
				</div>
			</div>`,

			/* ==== EDYTUJ PNR modal ==== */
			`<div id="edytuj-pnr-modal" class="demo-modal-overlay" onclick="if(event.target===this)this.classList.remove('show')">
				<div class="demo-modal" style="max-width:680px;width:95%">
					<div class="demo-modal-header">
						<h2><i class="fa-solid fa-pen" style="margin-right:0.5rem;color:var(--primary-color)"></i>Edytuj rekord</h2>
						<button class="demo-modal-close" type="button" data-no-demo="true" onclick="document.getElementById('edytuj-pnr-modal').classList.remove('show')"><i class="fa-solid fa-xmark"></i></button>
					</div>
					<div class="demo-modal-body" style="max-height:72vh;overflow-y:auto">
						<div class="form-mockup">
							<div class="form-row-2">
								<label class="form-field"><span>Nr PNR</span><input type="text" placeholder="np. LO4KL2" style="font-family:monospace;text-transform:uppercase" /></label>
								<label class="form-field"><span>Typ biletu</span><select><option>Grupowy</option><option>Indywidualny</option><option>Czarterowy</option></select></label>
							</div>
							<label class="form-field" style="margin-bottom:0.75rem"><span>Linia lotnicza</span><select><option selected>LOT Polish Airlines</option><option>Ryanair</option><option>Wizz Air</option><option>EasyJet</option><option>Turkish Airlines</option><option>Inny</option></select></label>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Trasa</div>
							<div class="form-row-2">
								<label class="form-field"><span>Trasa (tam)</span><input type="text" placeholder="np. KRK \u2192 TLV" /></label>
								<label class="form-field"><span>Trasa (powrót)</span><input type="text" placeholder="np. TLV \u2192 KRK" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Data lotu (tam)</span><input type="date" /></label>
								<label class="form-field"><span>Data powrotu</span><input type="date" /></label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Szczegóły rezerwacji</div>
							<div class="form-row-2">
								<label class="form-field"><span>Liczba miejsc</span><input type="number" min="1" placeholder="np. 44" /></label>
								<label class="form-field"><span>Deadline ticketingu</span><input type="date" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Impreza</span><input type="text" placeholder="np. MT-2026-WL-01" /></label>
								<label class="form-field"><span>Status PNR</span><select><option>Opcja</option><option>Aktywny</option><option>Potwierdzony</option><option>Anulowany</option></select></label>
							</div>
							<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-color)">Faktura</div>
							<div class="form-row-2">
								<label class="form-field"><span>Nr faktury</span><input type="text" placeholder="np. f.\u202f0238/01/26/F" /></label>
								<label class="form-field"><span>Kwota faktury (zł)</span><input type="number" min="0" step="0.01" placeholder="np. 84406.00" /></label>
							</div>
							<div class="form-row-2">
								<label class="form-field"><span>Data opłacenia</span><input type="date" /></label>
								<label class="form-field"><span>Status faktury</span><select><option>Oczekuje</option><option>Opłacona</option><option>Anulowana</option></select></label>
							</div>
							<label class="form-field"><span>Uwagi</span><textarea rows="2" placeholder="Opcjonalne uwagi…"></textarea></label>
						</div>
					</div>
					<div class="demo-modal-footer">
						<button class="btn btn-outline" type="button" data-no-demo="true" onclick="document.getElementById('edytuj-pnr-modal').classList.remove('show')">Anuluj</button>
						${button({ label: 'Zapisz zmiany', icon: 'fa-solid fa-check' })}
					</div>
				</div>
			</div>`

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
