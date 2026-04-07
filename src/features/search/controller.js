(function () {

	/* ------------------------------------------------------------------ */
	/* Mock data — pełna baza do wyszukiwania                              */
	/* ------------------------------------------------------------------ */
	var MOCK_DATA = [
		/* Uczestnicy */
		{ type: 'client', icon: 'fa-user', title: 'Anna Kowalska', sub: 'ul. Kwiatowa 12, Warszawa · +48 500 100 200', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Jan Malinowski', sub: 'ul. Lipowa 3, Kraków · +48 600 200 300', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Maria Wiśniewska', sub: 'ul. Różana 7, Wrocław · +48 700 300 400', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Tomasz Jabłoński', sub: 'Gdańsk · RES-2026-051', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Katarzyna Zielińska', sub: 'Łódź · ZS-2026-067', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Paweł Dąbrowski', sub: 'Poznań · pielgrzymka Ziemia Święta', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Elżbieta Wróbel', sub: 'Szczecin · RES-2026-019', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Michał Kowalczyk', sub: 'Lublin · depozyt do zapłaty', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Barbara Lewandowska', sub: 'Kraków · 3 rezerwacje', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'ks. Marcin Olszewski', sub: 'Warszawa · zapytanie z formularza WWW', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Joanna Kwiatkowska', sub: 'Rzeszów · +48 510 900 111', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },
		{ type: 'client', icon: 'fa-user', title: 'Rafał Nowakowski', sub: 'Białystok · 2 rezerwacje · ZS-2026-089', page: 'crm', cat: 'Uczestnicy', badge: 'CRM', badgeCls: 'badge-crm' },

		/* Grupy */
		{ type: 'group', icon: 'fa-people-group', title: 'Ziemia Święta z Jordanią — kwiecień 2026', sub: 'GR-2026-008 · 34 uczestników · od 8 590 PLN', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Rzym + Watykan — maj 2026', sub: 'GR-2026-012 · 22 uczestników · od 4 290 PLN', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Fatima i Santiago de Compostela', sub: 'GR-2026-015 · 18 uczestników · czerwiec 2026', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Egipt — Hurghada All Inclusive', sub: 'GR-2026-003 · 40 uczestników · lipiec 2026', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Medjugorie — pielgrzymka parafialna', sub: 'GR-2026-021 · 25 uczestników · sierpień 2026', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Turcja — Stambuł i Kappadocja', sub: 'GR-2026-019 · 16 uczestników · wrzesień 2026', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },
		{ type: 'group', icon: 'fa-people-group', title: 'Lourdes — pielgrzymka chorych', sub: 'GR-2026-024 · 30 uczestników · październik 2026', page: 'grupy', cat: 'Grupy / Imprezy', badge: 'Grupy', badgeCls: 'badge-grupy' },

		/* Rezerwacje */
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-042 — Maria Nowak', sub: 'Ziemia Święta z Jordanią · 4 osoby · 34 360 PLN', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-038 — Jan Kowalski', sub: 'Rzym + Watykan · 2 osoby · 8 580 PLN', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-051 — Tomasz Jabłoński', sub: 'Egipt Hurghada · 3 osoby · wpłacono 50%', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-027 — Katarzyna Wiśniewska', sub: 'Fatima i Santiago · 1 osoba · opłacona', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-033 — Paweł Dąbrowski', sub: 'Medjugorie · 2 osoby · brak depozytu', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },
		{ type: 'reservation', icon: 'fa-clipboard-list', title: 'RES-2026-019 — Elżbieta Wróbel', sub: 'Turcja Stambuł · 2 osoby · zaliczka wpłacona', page: 'rezerwacje', cat: 'Rezerwacje', badge: 'Rezerwacje', badgeCls: 'badge-rezerwacje' },

		/* Zapytania */
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-042 — Pielgrzymka Ziemia Święta', sub: 'ks. Marcin Olszewski · Nowa · z formularza WWW', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-098 — Wycieczka Turcja', sub: 'Rodzina Malinowskich · W wycenie · 6 osób', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-105 — Medjugorie parafia', sub: 'Parafia Świętej Rodziny · Oferta wysłana · 24 osoby', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-112 — Rzym na komunię', sub: 'Anna Kowalska · Negocjacje · 4 osoby', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-067 — Egipt wczasy', sub: 'Katarzyna Zielińska · Zaakceptowana · 2 osoby', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },
		{ type: 'query', icon: 'fa-paper-plane', title: 'ZS-2026-089 — Fatima pielgrzymka', sub: 'Rafał Nowakowski · W wycenie · 5 osób', page: 'zapytania', cat: 'Zapytania i Oferty', badge: 'Zapytania', badgeCls: 'badge-zapytania' },

		/* Moduły */
		{ type: 'module', icon: 'fa-gauge-high',       title: 'Dashboard',            sub: 'Pulpit główny z KPI i aktywnością',        page: 'dashboard',  cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-address-book',     title: 'CRM / Uczestnicy',        sub: 'Baza uczestników i kontaktów',                 page: 'crm',        cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-paper-plane',      title: 'Zapytania i Oferty',   sub: 'Zarządzanie zapytaniami i wycenami',        page: 'zapytania',  cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-people-group',     title: 'Grupy / Imprezy',      sub: 'Zarządzanie wyjazdami grupowymi',           page: 'grupy',      cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-clipboard-list',   title: 'Rezerwacje',           sub: 'Lista wszystkich rezerwacji',               page: 'rezerwacje', cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-credit-card',      title: 'Płatności',            sub: 'Kontrola wpłat i salda należności',         page: 'platnosci',  cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-calculator',       title: 'Księgowość',           sub: 'Faktury, koszty i rozliczenia',             page: 'ksiegowosc', cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-plane-departure',  title: 'Bilety Lotnicze',      sub: 'Zarządzanie biletami i lotami',             page: 'bilety',     cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-calendar-days',    title: 'Kalendarz',            sub: 'Harmonogram wyjazdów i zadań',              page: 'kalendarz',  cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-chart-bar',        title: 'Raporty',              sub: 'Analizy i zestawienia sprzedaży',           page: 'raporty',    cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-bullhorn',         title: 'Marketing',            sub: 'Kampanie, leady i social media',            page: 'marketing',  cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-envelope',         title: 'Poczta',               sub: 'Skrzynka pocztowa',                         page: 'poczta',     cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-comments',         title: 'Czat wewnętrzny',      sub: 'Komunikacja z zespołem',                    page: 'czat',       cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-truck-fast',       title: 'Wysyłki / Logistyka',  sub: 'Zarządzanie przesyłkami i wysyłkami',       page: 'wysylki',    cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
		{ type: 'module', icon: 'fa-gear',             title: 'Ustawienia',           sub: 'Konfiguracja systemu i konta',              page: 'ustawienia', cat: 'Moduły', badge: 'Moduł', badgeCls: 'badge-modul' },
	];

	/* domyślnie pokazywane gdy pole puste */
	var DEFAULT_ITEMS = [
		MOCK_DATA.find(function (d) { return d.title === 'Dashboard'; }),
		MOCK_DATA.find(function (d) { return d.title === 'CRM / Uczestnicy'; }),
		MOCK_DATA.find(function (d) { return d.title === 'Zapytania i Oferty'; }),
		MOCK_DATA.find(function (d) { return d.title === 'Grupy / Imprezy'; }),
		MOCK_DATA.find(function (d) { return d.title === 'Rezerwacje'; }),
		MOCK_DATA.find(function (d) { return d.title === 'Kalendarz'; }),
		MOCK_DATA.find(function (d) { return d.title === 'Raporty'; }),
	];

	/* ------------------------------------------------------------------ */
	/* Helpers                                                              */
	/* ------------------------------------------------------------------ */

	function normalize(str) {
		return str
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}

	function highlight(text, query) {
		if (!query) return escHtml(text);
		var escaped = escHtml(text);
		var escapedQuery = escHtml(query);
		var normText = normalize(text);
		var normQuery = normalize(query);
		var idx = normText.indexOf(normQuery);
		if (idx === -1) return escaped;
		return (
			escHtml(text.slice(0, idx)) +
			'<mark>' + escHtml(text.slice(idx, idx + query.length)) + '</mark>' +
			escHtml(text.slice(idx + query.length))
		);
	}

	function escHtml(str) {
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function search(query) {
		var norm = normalize(query.trim());
		if (!norm) return null; /* null = pokaż domyślne */
		return MOCK_DATA.filter(function (item) {
			return (
				normalize(item.title).indexOf(norm) !== -1 ||
				normalize(item.sub).indexOf(norm) !== -1 ||
				normalize(item.cat).indexOf(norm) !== -1
			);
		});
	}

	/* grupuj tablicę wyników wg cat */
	function groupBy(items, key) {
		var groups = [];
		var map = {};
		items.forEach(function (item) {
			var k = item[key];
			if (!map[k]) {
				map[k] = [];
				groups.push({ label: k, items: map[k] });
			}
			map[k].push(item);
		});
		return groups;
	}

	/* skrót wyświetlania kategorii — maks 5 na kategorię */
	var CAT_LIMIT = 5;

	/* ------------------------------------------------------------------ */
	/* Kontroler                                                            */
	/* ------------------------------------------------------------------ */

	function createSearchController() {
		var overlay = document.getElementById('searchModal');
		var input = document.getElementById('searchModalInput');
		var body = document.getElementById('searchModalBody');
		var topbarInput = document.getElementById('globalSearch');

		if (!overlay || !input || !body) return;

		var activeIndex = -1;
		var flatResults = [];
		var debounceTimer = null;

		/* --- otwieranie / zamykanie ------------------------------------ */

		function open() {
			overlay.classList.add('show');
			overlay.setAttribute('aria-hidden', 'false');
			input.value = '';
			renderDefault();
			setTimeout(function () { input.focus(); }, 30);
		}

		function close() {
			overlay.classList.remove('show');
			overlay.setAttribute('aria-hidden', 'true');
			input.value = '';
			activeIndex = -1;
			flatResults = [];
		}

		/* --- renderowanie --------------------------------------------- */

		function renderDefault() {
			var html = '<div class="search-modal-section">';
			html += '<div class="search-modal-section-label">Szybki dostęp</div>';
			DEFAULT_ITEMS.forEach(function (item, i) {
				html += renderItem(item, '', i);
			});
			html += '</div>';
			body.innerHTML = html;
			flatResults = DEFAULT_ITEMS.slice();
			activeIndex = -1;
			attachResultEvents();
		}

		function renderResults(results, query) {
			if (results.length === 0) {
				body.innerHTML =
					'<div class="search-modal-empty">' +
					'<i class="fa-solid fa-magnifying-glass"></i>' +
					'<strong>Brak wyników dla „' + escHtml(query) + '"</strong>' +
					'<p style="margin-top:0.4rem">Spróbuj innej frazy lub sprawdź pisownię.</p>' +
					'</div>';
				flatResults = [];
				activeIndex = -1;
				return;
			}

			var groups = groupBy(results, 'cat');
			var html = '';
			flatResults = [];

			groups.forEach(function (group) {
				var limited = group.items.slice(0, CAT_LIMIT);
				html += '<div class="search-modal-section">';
				html += '<div class="search-modal-section-label">' + escHtml(group.label) + '</div>';
				limited.forEach(function (item) {
					html += renderItem(item, query, flatResults.length);
					flatResults.push(item);
				});
				html += '</div>';
			});

			body.innerHTML = html;
			activeIndex = -1;
			attachResultEvents();
		}

		function renderItem(item, query, idx) {
			return (
				'<div class="search-modal-result" data-idx="' + idx + '">' +
				'<div class="search-modal-result-icon type-' + item.type + '">' +
				'<i class="fa-solid ' + item.icon + '"></i>' +
				'</div>' +
				'<div class="search-modal-result-text">' +
				'<div class="search-modal-result-title">' + highlight(item.title, query) + '</div>' +
				'<div class="search-modal-result-sub">' + escHtml(item.sub) + '</div>' +
				'</div>' +
				'<span class="search-modal-result-badge ' + item.badgeCls + '">' + escHtml(item.badge) + '</span>' +
				'</div>'
			);
		}

		function attachResultEvents() {
			var rows = body.querySelectorAll('.search-modal-result');
			rows.forEach(function (row) {
				row.addEventListener('mouseenter', function () {
					setActive(parseInt(row.dataset.idx, 10));
				});
				row.addEventListener('click', function () {
					selectActive();
				});
			});
		}

		/* --- keyboard nav --------------------------------------------- */

		function setActive(idx) {
			var rows = body.querySelectorAll('.search-modal-result');
			rows.forEach(function (r) { r.classList.remove('active'); });
			activeIndex = idx;
			if (idx >= 0 && idx < rows.length) {
				rows[idx].classList.add('active');
				rows[idx].scrollIntoView({ block: 'nearest' });
			}
		}

		function moveActive(dir) {
			var rows = body.querySelectorAll('.search-modal-result');
			if (!rows.length) return;
			var next = activeIndex + dir;
			if (next < 0) next = rows.length - 1;
			if (next >= rows.length) next = 0;
			setActive(next);
		}

		function selectActive() {
			var item = (activeIndex >= 0 && activeIndex < flatResults.length)
				? flatResults[activeIndex]
				: (flatResults.length > 0 ? flatResults[0] : null);
			if (!item) return;
			navigateTo(item.page);
			close();
		}

		function navigateTo(pageKey) {
			var navItem = document.querySelector('.nav-item[data-page="' + pageKey + '"]');
			if (navItem) navItem.click();
		}

		/* --- zdarzenia ------------------------------------------------ */

		function bindEvents() {
			/* Ctrl+K globalnie */
			document.addEventListener('keydown', function (e) {
				if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
					e.preventDefault();
					if (overlay.classList.contains('show')) {
						close();
					} else {
						open();
					}
				}
				if (!overlay.classList.contains('show')) return;
				if (e.key === 'Escape') { close(); return; }
				if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); return; }
				if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); return; }
				if (e.key === 'Enter') { e.preventDefault(); selectActive(); return; }
			});

			/* kliknięcie topbar search → otwiera modal */
			if (topbarInput) {
				topbarInput.addEventListener('focus', function (e) {
					e.target.blur();
					open();
				});
				topbarInput.addEventListener('click', function () {
					open();
				});
			}

			/* zamknij przez kliknięcie tła */
			overlay.addEventListener('click', function (e) {
				if (e.target === overlay) close();
			});

			/* wpisywanie z debouncem */
			input.addEventListener('input', function () {
				var q = input.value;
				clearTimeout(debounceTimer);
				debounceTimer = setTimeout(function () {
					var results = search(q);
					if (results === null) {
						renderDefault();
					} else {
						renderResults(results, q.trim());
					}
				}, 80);
			});
		}

		function init() {
			bindEvents();
		}

		return { init: init };
	}

	window.SearchController = { createSearchController: createSearchController };
})();
