(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge } = window.SharedUI;

	function renderStatsGrid(items, className = 'stats-grid') {
		return `<div class="${className}">${items.join('')}</div>`;
	}

	const dashboards = {
		admin: [
			dashboardHeader({
				title: 'Dashboard Główny',
				subtitle: 'Przegląd operacyjny i finansowy całej firmy',
				actions: [
					button({ label: 'Raport dzienny', icon: 'fa-solid fa-download', variant: 'outline' }),
					button({ label: 'Nowa akcja', icon: 'fa-solid fa-plus' })
				]
			}),
			renderStatsGrid([
				statCard({ title: 'Aktywne grupy', value: '24', icon: 'fa-solid fa-people-group', iconTone: 'blue', trend: '<i class="fa-solid fa-arrow-trend-up"></i> +3 w tym tyg.', trendTone: 'positive' }),
				statCard({ title: 'Nowe zapytania (7 dni)', value: '18', icon: 'fa-solid fa-paper-plane', iconTone: 'green', trend: '<i class="fa-solid fa-arrow-trend-up"></i> +12% r/r', trendTone: 'positive' }),
				statCard({ title: 'Do zapłaty', value: '45 200 PLN', valueClass: 'text-danger', icon: 'fa-solid fa-money-bill-transfer', iconTone: 'orange', trend: '<i class="fa-solid fa-clock"></i> 5 terminów na dziś', trendTone: 'negative' }),
				statCard({ title: 'Spodziewane wpłaty', value: '128 500 PLN', icon: 'fa-solid fa-piggy-bank', iconTone: 'purple', trend: '<i class="fa-solid fa-minus"></i> stabilnie', trendTone: 'neutral' })
			]),
			`<div class="dashboard-grid">${[
				panel({
					title: 'Najbliższe wyjazdy',
					action: '<button class="panel-action">Zobacz wszystkie</button>',
					body: '<div class="table-container"><table><thead><tr><th>Impreza</th><th>Kierunek</th><th>Termin</th><th>Uczestnicy</th><th>Status</th></tr></thead><tbody><tr><td><strong>Włochy z ks. Janem</strong></td><td>Włochy</td><td>12.04 - 19.04</td><td>45/45</td><td>' + statusBadge('Gotowe', 'success') + '</td></tr><tr><td><strong>Ziemia Święta</strong></td><td>Izrael</td><td>25.04 - 02.05</td><td>42/50</td><td>' + statusBadge('Braki 3 pass.', 'warning') + '</td></tr><tr><td><strong>Santiago</strong></td><td>Hiszpania</td><td>05.05 - 12.05</td><td>20/30</td><td>' + statusBadge('W trakcie', 'info') + '</td></tr></tbody></table></div>'
				}),
				panel({
					title: 'Alerty i decyzje',
					bodyStyle: 'padding-top:0',
					body: '<div class="list-group"><div class="list-item" style="padding-top:1rem"><div class="list-item-icon" style="background: var(--danger-light); color: var(--danger-color)"><i class="fa-solid fa-plane-triangle"></i></div><div class="list-item-content"><div class="list-item-title"><span>Termin redukcji biletów TK</span><span class="text-danger" style="font-size:0.75rem">DZIŚ</span></div><div class="list-item-desc">Grupa ZS-2026-05. Pozostało 8 miejsc do redukcji bezkosztowej.</div></div></div><div class="list-item"><div class="list-item-icon" style="background: var(--warning-light); color: var(--warning-color)"><i class="fa-solid fa-building-columns"></i></div><div class="list-item-content"><div class="list-item-title"><span>Zaliczka Hotel Rzym</span><span class="text-warning" style="font-size:0.75rem">JUTRO</span></div><div class="list-item-desc">Kwota 3 500 EUR. Hotel Casa La Salle.</div></div></div></div>'
				})
			].join('')}</div>`
		].join(''),
		ofertowanie: [
			dashboardHeader({
				title: 'Dział Ofertowania',
				subtitle: 'Zarządzanie zapytaniami, kalkulacje i tworzenie ofert',
				actions: [button({ label: 'Nowe zapytanie / oferta', icon: 'fa-solid fa-plus' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Nowe zapytania', value: '5', icon: 'fa-solid fa-envelope-open-text', iconTone: 'orange' }),
				statCard({ title: 'Oferty w opracowaniu', value: '8', icon: 'fa-solid fa-laptop-file', iconTone: 'blue' }),
				statCard({ title: 'Wysłane', value: '12', icon: 'fa-solid fa-paper-plane', iconTone: 'purple' }),
				statCard({ title: 'Zaakceptowane', value: '4', valueClass: 'text-success', icon: 'fa-solid fa-handshake', iconTone: 'green' })
			]),
			panel({
				title: 'Bieżące zapytania i oferty',
				body: '<div class="table-container"><table><thead><tr><th>Data</th><th>Organizator</th><th>Kierunek</th><th>Szac. grupa</th><th>Status</th><th>Akcje</th></tr></thead><tbody><tr><td>Dzisiaj</td><td><strong>Parafia św. Józefa</strong></td><td>Grecja</td><td>40-45 os.</td><td>' + statusBadge('NOWE', 'warning') + '</td><td>' + button({ label: 'Otwórz', variant: 'outline' }) + '</td></tr><tr><td>Wczoraj</td><td><strong>Liceum Pijarów</strong></td><td>Rzym</td><td>50 os.</td><td>' + statusBadge('W opracowaniu', 'info') + '</td><td>' + button({ label: 'Kalkulator', variant: 'outline' }) + '</td></tr></tbody></table></div>'
			})
		].join(''),

		bok: [
			dashboardHeader({
				title: 'Biuro Obsługi Uczestnika',
				subtitle: 'Obsługa uczestników, dokumenty, płatności, komunikacja',
				actions: [button({ label: 'Nowy uczestnik', icon: 'fa-solid fa-user-plus' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Aktywni uczestnicy', value: '284', icon: 'fa-solid fa-users', iconTone: 'blue' }),
				statCard({ title: 'Brak dokumentów', value: '10', icon: 'fa-solid fa-file-circle-exclamation', iconTone: 'orange', trend: 'Wymaga kontaktu', trendTone: 'negative' }),
				statCard({ title: 'Zaległe płatności', value: '7', icon: 'fa-solid fa-money-bill-transfer', iconTone: 'red' }),
				statCard({ title: 'SMS wysłanych dziś', value: '12', icon: 'fa-solid fa-comment-sms', iconTone: 'green' })
			]),
			'<div class="dashboard-grid">' + [
				panel({ title: 'Do pilnego kontaktu', body: '<div class="list-group"><div class="list-item"><div class="list-item-icon" style="background:var(--danger-light);color:var(--danger-color)"><i class="fa-solid fa-id-card"></i></div><div class="list-item-content"><div class="list-item-title"><span>Nowak Barbara</span><span class="text-danger" style="font-size:0.75rem">Brak paszportu</span></div><div class="list-item-desc">WL-01 · Wylot 01.04 · dzisiaj termin dosłania</div></div></div><div class="list-item"><div class="list-item-icon" style="background:var(--warning-light);color:var(--warning-color)"><i class="fa-solid fa-coins"></i></div><div class="list-item-content"><div class="list-item-title"><span>Malczewski Tomasz</span><span class="text-warning" style="font-size:0.75rem">Zaległa rata</span></div><div class="list-item-desc">WL-01 · Należność: 1 500 PLN od 15.03</div></div></div><div class="list-item"><div class="list-item-icon" style="background:var(--danger-light);color:var(--danger-color)"><i class="fa-solid fa-file-signature"></i></div><div class="list-item-content"><div class="list-item-title"><span>Kowalczyk Jadwiga</span><span class="text-danger" style="font-size:0.75rem">Brak umowy</span></div><div class="list-item-desc">IT-03 · Umowa niepodpisana</div></div></div></div>' }),
				panel({ title: 'Dzisiejsze zadania', body: '<div class="list-group"><div class="list-item"><div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-color)"><i class="fa-solid fa-envelope"></i></div><div class="list-item-content"><div class="list-item-title">Wyślij potwierdzenia WL-01</div><div class="list-item-desc">42 uczestników · maile z programem</div></div></div><div class="list-item"><div class="list-item-icon" style="background:var(--success-light);color:var(--success-color)"><i class="fa-solid fa-check"></i></div><div class="list-item-content"><div class="list-item-title">Weryfikacja paszportów WL-01</div><div class="list-item-desc">10 niekompletnych · deadline jutro</div></div></div></div>' })
			].join('') + '</div>'
		].join(''),

		booking: [
			dashboardHeader({
				title: 'Dział Booking / Hotele',
				subtitle: 'Zarządzanie rezerwacjami hotelowymi, opcjami i potwierdzeniami',
				actions: [button({ label: 'Nowa rezerwacja hotelowa', icon: 'fa-solid fa-plus' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Aktywne opcje', value: '6', icon: 'fa-solid fa-bed', iconTone: 'blue' }),
				statCard({ title: 'Wygasają w 7 dni', value: '2', icon: 'fa-solid fa-clock', iconTone: 'orange', trend: 'Wymaga decyzji', trendTone: 'negative' }),
				statCard({ title: 'Potwierdzone', value: '9', icon: 'fa-solid fa-check-circle', iconTone: 'green' }),
				statCard({ title: 'Oczekujące zlecenia', value: '3', icon: 'fa-solid fa-hourglass-half', iconTone: 'purple' })
			]),
			panel({ title: 'Aktywne rezerwacje i opcje hotelowe', body: '<div class="table-container"><table><thead><tr><th>Hotel</th><th>Kierunek</th><th>Impreza</th><th>Noce</th><th>Pokoje</th><th>Opcja do</th><th>Status</th></tr></thead><tbody><tr><td><strong>Dan Panorama</strong></td><td>Tel Aviv</td><td>WL-01</td><td>4</td><td>21×DBL</td><td>31.03</td><td>' + statusBadge('Potwierdzona', 'success') + '</td></tr><tr><td><strong>Caesar Hotel</strong></td><td>Jerozolima</td><td>WL-01</td><td>2</td><td>21×DBL</td><td>01.04</td><td>' + statusBadge('Potwierdzona', 'success') + '</td></tr><tr><td><strong>Casa La Salle</strong></td><td>Rzym</td><td>IT-03</td><td>5</td><td>22×DBL</td><td>05.04</td><td>' + statusBadge('Opcja — PILNE', 'warning') + '</td></tr><tr><td><strong>Hotel Compo Real</strong></td><td>Santiago</td><td>ES-02</td><td>2</td><td>18×DBL</td><td>15.04</td><td>' + statusBadge('Zapytanie wysłane', 'info') + '</td></tr></tbody></table></div>' })
		].join(''),

		bilety: [
			dashboardHeader({
				title: 'Dział Biletów Lotniczych',
				subtitle: 'Zarządzanie PNR, terminami ticketingów i depozytami biletowymi',
				actions: [button({ label: 'Nowy PNR', icon: 'fa-solid fa-plane' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Aktywnych PNR', value: '8', icon: 'fa-solid fa-plane-departure', iconTone: 'blue' }),
				statCard({ title: 'Deadline ≤ 7 dni', value: '3', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange', trend: 'Pilne!', trendTone: 'negative' }),
				statCard({ title: 'Wystawione bilety', value: '42', icon: 'fa-solid fa-ticket', iconTone: 'green' }),
				statCard({ title: 'Suma depozytów', value: '18 400 PLN', icon: 'fa-solid fa-coins', iconTone: 'purple' })
			]),
			panel({ title: 'Bieżące PNR i terminy ticketingu', body: '<div class="alert-banner" style="margin-bottom:1rem"><i class="fa-solid fa-triangle-exclamation"></i> <strong>UWAGA:</strong> PNR LO4KL2 — termin wystawienia biletów jutro (07.04). Potwierdzenie depozyt potrzebne do 12:00!</div><div class="table-container"><table><thead><tr><th>PNR</th><th>Linia</th><th>Trasa</th><th>Data lotu</th><th>Impreza</th><th>Pax</th><th>Deadline</th><th>Status</th></tr></thead><tbody><tr><td><code>LO4KL2</code></td><td>LOT</td><td>KRK→TLV→KRK</td><td>01.04</td><td>WL-01</td><td>42</td><td class="text-danger"><strong>07.04</strong></td><td>' + statusBadge('Depozyt opłacony', 'success') + '</td></tr><tr><td><code>W64KXA</code></td><td>Wizz Air</td><td>KRK→FCO→KRK</td><td>20.04</td><td>IT-03</td><td>44</td><td class="text-warning">15.04</td><td>' + statusBadge('Opcja — nie wystawione', 'warning') + '</td></tr><tr><td><code>IB3MK8</code></td><td>Iberia</td><td>KRK→MAD→SCQ</td><td>05.05</td><td>ES-02</td><td>36</td><td>30.04</td><td>' + statusBadge('W przygotowaniu', 'info') + '</td></tr></tbody></table></div>' })
		].join(''),

		ksiegowosc: [
			dashboardHeader({
				title: 'Dział Księgowości',
				subtitle: 'TFG/TFP, VAT marża, faktury i rozrachunki z kontrahentami',
				actions: [button({ label: 'Eksport JPK', icon: 'fa-solid fa-file-export', variant: 'outline' }), button({ label: 'Nowa faktura', icon: 'fa-solid fa-plus' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Przychód miesiąc', value: '195 400 PLN', icon: 'fa-solid fa-sack-dollar', iconTone: 'green', trend: '+22% vs. marzec 2025', trendTone: 'positive' }),
				statCard({ title: 'Faktury do wystawienia', value: '8', icon: 'fa-solid fa-file-invoice', iconTone: 'orange' }),
				statCard({ title: 'TFG/TFP — kwiecień', value: '3 420 PLN', icon: 'fa-solid fa-shield-halved', iconTone: 'blue' }),
				statCard({ title: 'Zaległe należności', value: '12 300 PLN', icon: 'fa-solid fa-circle-exclamation', iconTone: 'red', trend: '3 uczestników', trendTone: 'negative' })
			]),
			panel({ title: 'Do rozliczenia — kwiecień 2026', body: '<div class="table-container"><table><thead><tr><th>Impreza</th><th>Pax</th><th>Brutto UAB</th><th>Koszty</th><th>Marża</th><th>TFG</th><th>VAT marża</th><th>Status</th></tr></thead><tbody><tr><td><strong>WL-01 Ziemia Święta</strong></td><td>42</td><td>378 000</td><td>308 000</td><td>70 000</td><td>2 100</td><td>5 691</td><td>' + statusBadge('Zatwierdzone', 'success') + '</td></tr><tr><td><strong>IT-03 Rzym</strong></td><td>44</td><td>396 000</td><td>318 000</td><td>78 000</td><td>2 200</td><td>6 342</td><td>' + statusBadge('W opracowaniu', 'info') + '</td></tr></tbody></table></div>' })
		].join(''),

		marketing: [
			dashboardHeader({
				title: 'Sprzedaż i Marketing',
				subtitle: 'Leady, kampanie, social media i konwersja ofert',
				actions: [button({ label: 'Nowa kampania', icon: 'fa-solid fa-bullhorn' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Aktywne leady', value: '21', icon: 'fa-solid fa-user-plus', iconTone: 'blue' }),
				statCard({ title: 'Conversion rate', value: '38%', icon: 'fa-solid fa-percent', iconTone: 'green', trend: '+5 pp vs. 2025', trendTone: 'positive' }),
				statCard({ title: 'Zaplanowane posty', value: '4', icon: 'fa-brands fa-facebook', iconTone: 'blue' }),
				statCard({ title: 'Obserwujący FB', value: '8 420', icon: 'fa-solid fa-heart', iconTone: 'purple', trend: '+124 w marcu', trendTone: 'positive' })
			]),
			panel({ title: 'Leady — nowe i w toku', body: '<div class="table-container"><table><thead><tr><th>Lead</th><th>Kontakt</th><th>Zainteresowanie</th><th>Źródło</th><th>Etap</th></tr></thead><tbody><tr><td><code>LD-0391</code></td><td><strong>ks. Paweł Dąbrowski</strong></td><td>Ziemia Święta 2027</td><td>Strona WWW</td><td>' + statusBadge('Nowy', 'blue') + '</td></tr><tr><td><code>LD-0390</code></td><td><strong>ks. Tomasz Mazur</strong></td><td>Rzym + Asyż 2026</td><td>Polecenie</td><td>' + statusBadge('Kontakt nawiązany', 'purple') + '</td></tr><tr><td><code>LD-0389</code></td><td><strong>S. Maria Łukasiewicz</strong></td><td>Fatima + Lourdes</td><td>Targi</td><td>' + statusBadge('Oferta wysłana', 'orange') + '</td></tr></tbody></table></div>' })
		].join(''),

		pilot: [
			dashboardHeader({
				title: 'Panel Pilota',
				subtitle: 'Twoje najbliższe imprezy, dokumenty i kontakty do uczestników',
				actions: [button({ label: 'Pobierz teczki', icon: 'fa-solid fa-download', variant: 'outline' })]
			}),
			renderStatsGrid([
				statCard({ title: 'Najbliższy wyjazd', value: '01.04.2026', icon: 'fa-solid fa-plane-departure', iconTone: 'blue' }),
				statCard({ title: 'Uczestnicy', value: '42 os.', icon: 'fa-solid fa-users', iconTone: 'green' }),
				statCard({ title: 'Teczka gotowa', value: '✓ TAK', icon: 'fa-solid fa-folder-open', iconTone: 'green' }),
				statCard({ title: 'Kontakt awaryjny', value: '+48 12 429 20 20', icon: 'fa-solid fa-phone', iconTone: 'purple' })
			]),
			'<div class="dashboard-grid">' + [
				panel({ title: 'WL-01 — Ziemia Święta (Wielkanoc 2026)', body: '<div class="info-table"><div class="info-row"><span>Trasa</span><strong>Kraków → Tel Aviv → Jerozolima → Tel Aviv → Kraków</strong></div><div class="info-row"><span>Wylot</span><strong>01.04.2026. KRK, godz. 06:50 · PNR: LO4KL2</strong></div><div class="info-row"><span>Powrót</span><strong>06.04.2026, TLV godz. 22:10</strong></div><div class="info-row"><span>Uczestnicy</span><strong>42 osoby · 21 pokoje DBL</strong></div><div class="info-row"><span>Organizator</span><strong>ks. Jan Wiśniewski · 501 234 567</strong></div><div class="info-row"><span>Ubezpieczenie</span><strong>Allianz Travel — polisa grupowa #12345678</strong></div></div>' }),
				panel({ title: 'Dokumenty gotowe do pobrania', body: '<div class="list-group"><div class="list-item"><div class="list-item-icon" style="background:var(--primary-light);color:var(--primary-color)"><i class="fa-solid fa-file-pdf"></i></div><div class="list-item-content"><div class="list-item-title">Program wycieczki (pełny)</div><div class="list-item-desc">WL-01_Program_v3.pdf · 12 stron</div></div></div><div class="list-item"><div class="list-item-icon" style="background:var(--success-light);color:var(--success-color)"><i class="fa-solid fa-list-check"></i></div><div class="list-item-content"><div class="list-item-title">Lista uczestników</div><div class="list-item-desc">PESEL, dok., pokoje, wpłaty · XLS i PDF</div></div></div><div class="list-item"><div class="list-item-icon" style="background:var(--warning-light);color:var(--warning-color)"><i class="fa-solid fa-shield-halved"></i></div><div class="list-item-content"><div class="list-item-title">Polisa ubezpieczenia</div><div class="list-item-desc">Allianz · grupowa · wszystkich uczestników</div></div></div></div>' })
			].join('') + '</div>'
		].join('')
	};

	window.AppDashboards = { dashboards };
})();
