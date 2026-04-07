(function () {
	'use strict';

	/* =====================================================================
	   DEMO INTERACTIONS – makes every button and interactive element respond
	   with realistic demo feedback (toasts, modals, inline state changes).
	   All handlers use event delegation so they survive innerHTML re-renders.
	   ===================================================================== */

	/* -------- DOM HELPERS -------- */
	function el(id) { return document.getElementById(id); }

	/* -------- 1. DEMO ACTION TOAST -------- */
	var toastEl = null;
	var toastTimer = null;

	function getToastEl() {
		if (!toastEl) {
			toastEl = document.createElement('div');
			toastEl.className = 'demo-action-toast';
			document.body.appendChild(toastEl);
		}
		return toastEl;
	}

	var typeIcons = {
		success: 'fa-solid fa-circle-check',
		info:    'fa-solid fa-circle-info',
		warning: 'fa-solid fa-triangle-exclamation',
		error:   'fa-solid fa-circle-xmark'
	};

	function showToast(msg, type) {
		type = type || 'success';
		var t = getToastEl();
		t.className = 'demo-action-toast type-' + type;
		t.innerHTML = '<i class="dat-icon ' + typeIcons[type] + '"></i><span>' + msg + '</span>';
		// Force reflow so transition plays
		void t.offsetWidth;
		t.classList.add('show');
		clearTimeout(toastTimer);
		toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3400);
	}

	/* -------- 2. DEMO MODAL -------- */
	var modalEl = null;
	var modalSaveCallback = null;

	function createModalEl() {
		modalEl = document.createElement('div');
		modalEl.className = 'demo-modal-overlay';
		modalEl.innerHTML = [
			'<div class="demo-modal">',
			'  <div class="demo-modal-header">',
			'    <h2 id="demoMTitle"></h2>',
			'    <button class="demo-modal-close" type="button" id="demoMClose">',
			'      <i class="fa-solid fa-xmark"></i>',
			'    </button>',
			'  </div>',
			'  <div class="demo-modal-body" id="demoMBody"></div>',
			'  <div class="demo-modal-footer" id="demoMFooter"></div>',
			'</div>'
		].join('');
		document.body.appendChild(modalEl);

		document.getElementById('demoMClose').addEventListener('click', closeModal);
		modalEl.addEventListener('click', function (e) {
			if (e.target === modalEl) closeModal();
		});
	}

	function openModal(title, body, saveLabel, onSave) {
		if (!modalEl) createModalEl();
		document.getElementById('demoMTitle').textContent = title;
		document.getElementById('demoMBody').innerHTML = body;
		var footerEl = document.getElementById('demoMFooter');
		footerEl.innerHTML = [
			'<button type="button" class="btn btn-outline" id="demoMCancel">Anuluj</button>',
			'<button type="button" class="btn btn-primary" id="demoMSave">' + (saveLabel || 'Zapisz') + '</button>'
		].join('');
		document.getElementById('demoMCancel').addEventListener('click', closeModal);
		modalSaveCallback = onSave || null;
		document.getElementById('demoMSave').addEventListener('click', function () {
			closeModal();
			if (modalSaveCallback) modalSaveCallback();
			else showToast('Zapisano pomyślnie!', 'success');
		});
		modalEl.classList.add('show');
	}

	function closeModal() {
		if (modalEl) modalEl.classList.remove('show');
	}

	/* -------- 3. PAGE CONTEXT DETECTION -------- */
	function getActivePage() {
		var active = document.querySelector('.nav-item.active');
		return active ? (active.dataset.page || 'dashboard') : 'dashboard';
	}

	/* -------- 4. FORM TEMPLATES PER PAGE -------- */
	var NEW_FORMS = {
		crm: {
			title: 'Nowy kontakt — baza organizatorów',
			fields: [
				{ label: 'Typ organizatora', type: 'select', options: ['Ksiądz / zakonnik', 'Osoba świecka', 'Instytucja / organizacja'] },
				{ label: 'Tytuł', type: 'select', options: ['ks.', 'o.', 'bp.', 'abp.', 'ks. dr', 'ks. prał.', 'br.', 'p. (osoba świecka)', 'inst. (instytucja)', 'bez tytułu'] },
				{ label: 'Imię', placeholder: 'np. Wojciech' },
				{ label: 'Nazwisko / nazwa', placeholder: 'np. Adamczyk lub Akademia Liturgiczna' },
				{ label: 'Funkcja / rola', type: 'select', options: ['Proboszcz', 'Wikariusz', 'Kapelan', 'Zakonnik', 'Dyrektor', 'Prefekt', 'Administrator parafii', 'Organizator świecki', 'Koordynator szkolny', 'Inny'] },
				{ label: 'Telefon', placeholder: '+48 500 000 000' },
				{ label: 'E-mail', placeholder: 'kontakt@parafia.pl' },
				{ label: 'Parafia / Instytucja / Miejsce', placeholder: 'np. Parafia pw. Chrystusa Dobrego Pasterza' },
				{ label: 'Diecezja', type: 'select', options: ['—', 'Krakowska', 'Sandomierska', 'Lubelska', 'Radomska', 'Wrocławska', 'Legnicka', 'Poznańska', 'Warszawska', 'Łódzka', 'Gdańska', 'Toruńska', 'Katowicka', 'Rzeszowska', 'Inna'] },
				{ label: 'Adres', placeholder: 'ul. Kościelna 1, 31-001 Kraków' },
				{ label: 'Skąd trafił do nas', type: 'select', options: ['Nowe zapytanie', 'Polecenie innego księdza', 'Polecenie od organizatora', 'Telefon przychodzący', 'Import XLS', 'Targi religijne / kongres', 'Strona WWW', 'Media społecznościowe', 'Inny'] },
				{ label: 'Uwagi / Notatka wstępna', type: 'textarea', placeholder: 'Pierwsze wrażenie, historia kontaktu, preferencje kierunków...' }
			]
		},
		zapytania: {
			title: 'Nowe zapytanie / oferta',
			fields: [
				{ label: 'Organizator', placeholder: 'Imię i nazwisko / instytucja' },
				{ label: 'Kierunek / Destynacja', placeholder: 'np. Ziemia Święta, Rzym, Santiago' },
				{ label: 'Termin (orientacyjny)', placeholder: 'np. kwiecień 2027' },
				{ label: 'Liczba uczestników', placeholder: 'np. 40' },
				{ label: 'Typ wyjazdu', type: 'select', options: ['Pielgrzymka religijna', 'Wyjazd szkolny', 'Wyjazd parafialny', 'Konferencja wyjazdowa', 'Inny'] },
				{ label: 'Uwagi', type: 'textarea', placeholder: 'Dodatkowe wymagania, preferencje...' }
			]
		},
		grupy: {
			title: 'Nowa impreza / wycieczka',
			fields: [
				{ label: 'Kod imprezy', placeholder: 'np. MT-2027-WL-01' },
				{ label: 'Nazwa imprezy', placeholder: 'np. Ziemia Święta — Wielkanoc 2027' },
				{ label: 'Kierunek', placeholder: 'np. Izrael / Palestyna' },
				{ label: 'Termin wyjazdu', placeholder: 'DD.MM.RRRR' },
				{ label: 'Termin powrotu', placeholder: 'DD.MM.RRRR' },
				{ label: 'Maks. uczestników', placeholder: 'np. 45' },
				{ label: 'Pilot', placeholder: 'Imię i nazwisko pilota' }
			]
		},
		rezerwacje: {
			title: 'Nowy uczestnik',
			fields: [
				{ label: 'Imię i nazwisko', placeholder: 'np. Jan Kowalski' },
				{ label: 'PESEL', placeholder: '00000000000' },
				{ label: 'Nr paszportu', placeholder: 'np. AA1234567' },
				{ label: 'Telefon', placeholder: '+48 600 000 000' },
				{ label: 'E-mail', placeholder: 'jan.kowalski@gmail.com' },
				{ label: 'Typ pokoju', type: 'select', options: ['DBL (do uzup.)', 'SGL', 'TPL', 'DBL solo'] },
				{ label: 'Uwagi', type: 'textarea', placeholder: 'Dieta, niepełnosprawność, uwagi specjalne...' }
			]
		},
		umowy: {
			title: 'Nowa umowa',
			fields: [
				{ label: 'Numer umowy', placeholder: 'np. UM/2026/042' },
				{ label: 'Organizator / Klient', placeholder: 'Imię, nazwisko lub nazwa' },
				{ label: 'Impreza (kod)', placeholder: 'np. MT-2026-WL-01' },
				{ label: 'Data zawarcia', placeholder: 'DD.MM.RRRR' },
				{ label: 'Kwota całkowita', placeholder: 'np. 9 000 PLN' },
				{ label: 'Typ umowy', type: 'select', options: ['Umowa o udział w imporezie', 'Umowa organizatora', 'Aneks'] }
			]
		},
		platnosci: {
			title: 'Zarejestruj wpłatę',
			fields: [
				{ label: 'Uczestnik', placeholder: 'Imię i nazwisko' },
				{ label: 'Impreza', placeholder: 'np. MT-2026-WL-01' },
				{ label: 'Kwota (PLN)', placeholder: 'np. 2500' },
				{ label: 'Data wpłaty', placeholder: 'DD.MM.RRRR' },
				{ label: 'Tytuł / opis', placeholder: 'np. II rata — Ziemia Święta' },
				{ label: 'Metoda', type: 'select', options: ['Przelew bankowy', 'Gotówka', 'Karta', 'BLIK'] }
			]
		},
		bilety: {
			title: 'Nowy PNR — rezerwacja lotów',
			fields: [
				{ label: 'Nr PNR', placeholder: 'np. LO4KL2' },
				{ label: 'Linia lotnicza', type: 'select', options: ['LOT Polish Airlines', 'Wizz Air', 'Ryanair', 'Iberia', 'Turkish Airlines', 'EL AL', 'Inna'] },
				{ label: 'Trasa (tam)', placeholder: 'np. KRK → TLV' },
				{ label: 'Trasa (powrót)', placeholder: 'np. TLV → KRK' },
				{ label: 'Data lotu (tam)', placeholder: 'DD.MM.RRRR' },
				{ label: 'Deadline ticketingu', placeholder: 'DD.MM.RRRR' },
				{ label: 'Impreza', placeholder: 'np. MT-2026-WL-01' }
			]
		},
		hotele: {
			title: 'Nowa rezerwacja hotelowa',
			fields: [
				{ label: 'Nazwa hotelu', placeholder: 'np. Dan Panorama, Tel Aviv' },
				{ label: 'Miejscowość', placeholder: 'np. Tel Aviv, Jerozolima' },
				{ label: 'Impreza', placeholder: 'np. MT-2026-WL-01' },
				{ label: 'Check-in', placeholder: 'DD.MM.RRRR' },
				{ label: 'Check-out', placeholder: 'DD.MM.RRRR' },
				{ label: 'Liczba pokoi DBL', placeholder: 'np. 20' },
				{ label: 'Opcja ważna do', placeholder: 'DD.MM.RRRR' }
			]
		},
		leady: {
			title: 'Nowy lead sprzedażowy',
			fields: [
				{ label: 'Imię i nazwisko (organizator)', placeholder: 'np. ks. Adam Nowak' },
				{ label: 'Parafia / Instytucja', placeholder: 'np. Parafia MBNP, Nowy Sącz' },
				{ label: 'Numer telefonu', placeholder: '+48 500 000 000' },
				{ label: 'Zainteresowanie', placeholder: 'np. Ziemia Święta 2027' },
				{ label: 'Szacowana liczba osób', placeholder: 'np. 35' },
				{ label: 'Źródło leadu', type: 'select', options: ['Strona WWW', 'Polecenie', 'Facebook', 'Targi', 'Telefon przychodzący', 'Inne'] },
				{ label: 'Notatka', type: 'textarea', placeholder: 'Pierwsze wrażenie, historia kontaktu...' }
			]
		},
		kampanie: {
			title: 'Nowa kampania marketingowa',
			fields: [
				{ label: 'Nazwa kampanii', placeholder: 'np. Wielkanoc 2027 — early bird' },
				{ label: 'Kanał', type: 'select', options: ['E-mail', 'Facebook Ads', 'Instagram', 'Facebook organiczny', 'SMS', 'E-mail + FB'] },
				{ label: 'Budżet (PLN)', placeholder: 'np. 800' },
				{ label: 'Data startu', placeholder: 'DD.MM.RRRR' },
				{ label: 'Data końca', placeholder: 'DD.MM.RRRR' },
				{ label: 'Cel kampanii', placeholder: 'np. pozyskanie 10 leadów' }
			]
		},
		social: {
			title: 'Nowy post — Social Media',
			fields: [
				{ label: 'Platforma', type: 'select', options: ['Facebook', 'Instagram', 'Facebook + Instagram'] },
				{ label: 'Treść posta', type: 'textarea', placeholder: 'Treść wiadomości...' },
				{ label: 'Data publikacji', placeholder: 'DD.MM.RRRR' },
				{ label: 'Godzina publikacji', placeholder: 'np. 10:00' }
			]
		},
		kalendarz: {
			title: 'Nowe zdarzenie w kalendarzu',
			fields: [
				{ label: 'Tytuł zdarzenia', placeholder: 'np. Wylot WL-01' },
				{ label: 'Typ', type: 'select', options: ['Wyjazd / wylot', 'Termin płatności', 'Deadline biletowy', 'Spotkanie', 'Logistyka'] },
				{ label: 'Data', placeholder: 'DD.MM.RRRR' },
				{ label: 'Godzina', placeholder: 'np. 14:30' },
				{ label: 'Powiązana impreza', placeholder: 'np. MT-2026-WL-01 lub pozostaw puste' },
				{ label: 'Notatka', type: 'textarea', placeholder: 'Szczegóły zdarzenia...' }
			]
		},
		default: {
			title: 'Nowy wpis',
			fields: [
				{ label: 'Nazwa', placeholder: 'Wpisz nazwę...' },
				{ label: 'Opis', type: 'textarea', placeholder: 'Opis...' }
			]
		}
	};

	function buildForm(page, overrideTitle) {
		var def = NEW_FORMS[page] || NEW_FORMS.default;
		var title = overrideTitle || def.title;
		var body = '<div class="form-mockup">' + def.fields.map(function (f) {
			var input;
			if (f.type === 'select') {
				input = '<select>' + f.options.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
			} else if (f.type === 'textarea') {
				input = '<textarea rows="3" placeholder="' + (f.placeholder || '') + '"></textarea>';
			} else {
				input = '<input type="text" placeholder="' + (f.placeholder || '') + '" />';
			}
			return '<div class="form-field"><span>' + f.label + '</span>' + input + '</div>';
		}).join('') + '</div>';
		return { title: title, body: body };
	}

	/* -------- 5. BUTTON RESPONSE MAP -------- */
	function detectActionType(btn) {
		var label = btn.textContent.trim();
		var icon = '';
		var iconEl = btn.querySelector('i');
		if (iconEl) icon = iconEl.className;

		if (btn.getAttribute('data-action') === 'ignore' || btn.getAttribute('data-no-demo') === 'true') return 'ignore';
		if (/^(nowy|nowa|nowe|dodaj|nowy lead|nowa rezerwacja|nowy pnr|nowa impreza|nowe zapytanie|nowe zdarzenie)$/i.test(label.trim()) || (/fa-plus/i.test(icon) && label.length < 4)) return 'new';
		if (/nowy|nowa|nowe|dodaj/i.test(label)) return 'new';
		if (/wyślij sms|wyślij email|wyślij wiadomość|wyślij sms|wyślij/i.test(label)) return 'send';
		if (/zapisz zmiany|zapisz/i.test(label)) return 'save';
		if (/eksport pdf|pdf/i.test(label) || /fa-file-pdf/i.test(icon)) return 'export_pdf';
		if (/eksport xls|xls/i.test(label) || /fa-file-excel/i.test(icon)) return 'export_xls';
		if (/eksport jpk|jpk/i.test(label)) return 'export_jpk';
		if (/eksport/i.test(label) || /fa-file-export/i.test(icon)) return 'export';
		if (/importuj/i.test(label) || /fa-file-import/i.test(icon)) return 'import';
		if (/pobierz teczki|pobierz/i.test(label) || /fa-download/i.test(icon)) return 'download';
		if (/odświeź|odśwież|odswież/i.test(label) || /fa-rotate/i.test(icon)) return 'refresh';
		if (/edytuj/i.test(label) || /fa-pen\b|fa-pencil/i.test(icon)) return 'edit';
		if (/otwórz|szczegóły/i.test(label) || /fa-arrow-right|fa-external-link/i.test(icon)) return 'open';
		if (/zatwierdź|zaakceptuj|akceptuj/i.test(label)) return 'approve';
		if (/potwierdź/i.test(label)) return 'confirm';
		if (/usuń|skasuj/i.test(label) || /fa-trash/i.test(icon)) return 'delete';
		if (/anuluj opcję|anuluj rezerwację/i.test(label)) return 'cancel_booking';
		if (/anuluj/i.test(label)) return 'cancel';
		if (/zaplanuj/i.test(label) || /fa-clock/i.test(icon)) return 'schedule';
		if (/filtruj|filtr/i.test(label) || /fa-filter/i.test(icon)) return 'filter';
		if (/wydruk|drukuj/i.test(label) || /fa-print/i.test(icon)) return 'print';
		if (btn.getAttribute('data-action') === 'karta_grupy' || /^karta$/i.test(label.trim())) return 'karta_grupy';
		if (/^kartoteka$/i.test(label.trim())) return 'kartoteka';
		if (/→ crm|dodaj do crm|powi.{0,4}z z crm/i.test(label)) return 'dodaj_crm';
		if (/^(zaloguj wynik|wynik rozmowy)$/i.test(label.trim())) return 'call_log';
		if (/^(zadzwoń|dzwoń|oddzwoń|call)$/i.test(label.trim()) || /fa-phone/i.test(icon)) return 'call';
		if (/historia zmian|historia rezerwacji/i.test(label)) return 'history';
		if (/utwórz imprezę|zamień w imprezę/i.test(label)) return 'new_event';
		if (/eksport logu|eksport dnia/i.test(label) || /fa-download/i.test(icon)) return 'download';
		if (/kalkulator/i.test(label)) return 'calc';
		if (/synchronizuj|sync/i.test(label)) return 'sync';
		if (/wyloguj/i.test(label)) return 'logout';
		if (/statistyki|statystyki/i.test(label) || /fa-chart-bar/i.test(icon)) return 'stats';
		if (/raport dzienny/i.test(label)) return 'report';
		if (/nowa akcja/i.test(label)) return 'new';
		if (/harmonogram/i.test(label)) return 'schedule_view';
		if (/widok tygodniowy/i.test(label)) return 'schedule_view';
		if (/podgląd/i.test(label)) return 'preview';
		if (/bieżący widok/i.test(label)) return 'ignore';
		if (/pokaż/i.test(label)) return 'toggle';
		if (/importuj z xls/i.test(label)) return 'import';
		if (label === '' && (/fa-paper-plane/i.test(icon) || /fa-arrow-right/i.test(icon))) return 'send';
		return 'generic';
	}

	var TOAST_MESSAGES = {
		send:           ['Wiadomość wysłana pomyślnie!', 'success'],
		save:           ['Zmiany zapisane.', 'success'],
		export_pdf:     null, // handled separately with delay
		export_xls:     null,
		export_jpk:     null,
		export:         null,
		import:         ['Import uruchomiony. Dane zostaną załadowane za chwilę.', 'info'],
		download:       null,
		refresh:        ['Dane zostały odświeżone.', 'success'],
		approve:        ['Zatwierdzone pomyślnie!', 'success'],
		confirm:        ['Potwierdzono.', 'success'],
		delete:         null, // handled separately (confirm first)
		cancel:         ['Operacja anulowana.', 'info'],
		cancel_booking: ['Anulowanie wysłane do hotelu / linii lotniczej. Oczekiwanie na potwierdzenie.', 'warning'],
		filter:         ['Filtr zastosowany.', 'info'],
		print:          ['Otwieranie podglądu wydruku...', 'info'],
		sync:           ['Synchronizacja zakończona.', 'success'],
		logout:         ['Wylogowywanie...', 'info'],
		stats:          ['Ładowanie statystyk...', 'info'],
		report:         ['Generowanie raportu dziennego...', 'info'],
		schedule_view:  ['Widok kalendarza — funkcja dostępna w wersji produkcyjnej.', 'info'],
		preview:        ['Podgląd otwarto w nowej zakładce — demo mode.', 'info'],
		toggle:         null,
		generic:        ['Akcja zarejestrowana.', 'info'],
		calc:           null, // open calc modal
		karta_grupy:    null, // scroll to group card
		kartoteka:      null, // open kartoteka modal
		dodaj_crm:      null, // open CRM add form
		call:           null, // open call modal
		call_log:       null, // open call-log modal
		history:        null, // open change history modal
		new_event:      null, // open new event modal (from accepted offer)
		open:           ['Otwieranie rekordu...', 'info'],
		ignore:         null
	};

	function handleButtonAction(btn, page) {
		var action = detectActionType(btn);

		// --- special complex actions ---
		if (action === 'ignore') return;

		if (action === 'new') {
			var f = buildForm(page, null);
			openModal(f.title, f.body, 'Dodaj', function () { showToast('Wpis dodany pomyślnie!', 'success'); });
			return;
		}

		if (action === 'edit') {
			var editDef = NEW_FORMS[page] || NEW_FORMS.default;
			var editBody = '<div class="form-mockup">' + editDef.fields.slice(0, 4).map(function (f) {
				var val = f.options ? f.options[0] : '';
				var input;
				if (f.type === 'select') {
					input = '<select>' + f.options.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
				} else if (f.type === 'textarea') {
					input = '<textarea rows="3">' + (f.placeholder || 'Przykładowy tekst...') + '</textarea>';
				} else {
					input = '<input type="text" value="' + (f.placeholder || 'Przykładowa wartość') + '" />';
				}
				return '<div class="form-field"><span>' + f.label + '</span>' + input + '</div>';
			}).join('') + '</div>';
			openModal('Edytuj rekord', editBody, 'Zapisz zmiany', function () { showToast('Zmiany zapisane pomyślnie!', 'success'); });
			return;
		}

		if (action === 'calc') {
			var calcBody = [
				'<div class="form-mockup">',
				'  <div class="form-row-2">',
				'    <div class="form-field"><span>Cena zakupu / os.</span><input type="text" value="8 200 PLN" /></div>',
				'    <div class="form-field"><span>Marża (%)</span><input type="text" value="18" /></div>',
				'  </div>',
				'  <div class="form-row-2">',
				'    <div class="form-field"><span>Liczba uczestników</span><input type="text" value="40" /></div>',
				'    <div class="form-field"><span>Waluta zakupu</span><select><option>PLN</option><option>EUR</option><option>USD</option><option>ILS</option></select></div>',
				'  </div>',
				'  <div class="form-field"><span>Kurs (jeżeli inna waluta)</span><input type="text" value="4.28" /></div>',
				'  <hr style="border:none;border-top:1px solid var(--border-color);margin:0.75rem 0"/>',
				'  <div style="background:var(--bg-main);border-radius:8px;padding:1rem;display:grid;gap:0.5rem">',
				'    <div style="display:flex;justify-content:space-between"><span>Cena sprzedaży / os.</span><strong>9 676 PLN</strong></div>',
				'    <div style="display:flex;justify-content:space-between"><span>Przychód całkowity</span><strong>387 040 PLN</strong></div>',
				'    <div style="display:flex;justify-content:space-between"><span>Marża brutto</span><strong>58 040 PLN</strong></div>',
				'    <div style="display:flex;justify-content:space-between"><span>TFG (0,55% UAB)</span><strong>2 129 PLN</strong></div>',
				'    <div style="display:flex;justify-content:space-between"><span>VAT marża (ok.)</span><strong>4 722 PLN</strong></div>',
				'  </div>',
				'</div>'
			].join('');
			openModal('Kalkulator ceny imprezy', calcBody, 'Zastosuj ceny', function () {
				showToast('Ceny zastosowane do imprezy.', 'success');
			});
			return;
		}

		if (action === 'delete') {
			openModal(
				'Potwierdź usunięcie',
				'<p style="color:var(--text-main)">Czy na pewno chcesz usunąć ten rekord? Tej operacji nie można cofnąć.</p>',
				'Usuń',
				function () { showToast('Rekord usunięty.', 'info'); }
			);
			return;
		}

		if (action === 'export_pdf' || action === 'export_xls' || action === 'export_jpk' || action === 'export') {
			showToast('Przygotowywanie pliku...', 'info');
			setTimeout(function () { showToast('Plik gotowy — pobieranie (demo mode).', 'success'); }, 1600);
			return;
		}

		if (action === 'download') {
			showToast('Przygotowywanie dokumentów do pobrania...', 'info');
			setTimeout(function () { showToast('Dokumenty gotowe do pobrania!', 'success'); }, 1800);
			return;
		}

		if (action === 'schedule') {
			var schedBody = '<div class="form-mockup"><div class="form-row-2"><div class="form-field"><span>Data wysyłki</span><input type="text" value="01.04.2026" /></div><div class="form-field"><span>Godzina</span><input type="text" value="08:00" /></div></div><div class="form-field"><span>Odbiorcy</span><select><option>Wszyscy uczestnicy WL-01 (42 os.)</option><option>Uczestnicy bez dokumentów (10 os.)</option><option>Zaległe płatności (7 os.)</option></select></div><div class="form-field"><span>Treść</span><textarea rows="3">Matteo Travel: Przypominamy o wyjeździe WL-01 zaplanowanym na 01.04.2026. Zbiórka przy lotnisku o godz. 05:00.</textarea></div></div>';
			openModal('Zaplanuj wysyłkę', schedBody, 'Zaplanuj', function () {
				showToast('Wysyłka zaplanowana na 01.04.2026 o 08:00.', 'success');
			});
			return;
		}

		if (action === 'kartoteka') {
			var kRow = btn.closest('tr');
			var kName = kRow ? (kRow.querySelector('td strong') || {}).textContent || 'Organizator' : 'Organizator';
			var kParish = kRow ? (kRow.querySelector('td small') || {}).textContent || '' : '';
			var kBody = [
				'<div class="form-mockup">',
				'  <div style="display:flex;gap:1rem;align-items:center;margin-bottom:1.25rem">',
				'    <div style="width:52px;height:52px;border-radius:50%;background:var(--primary-light);color:var(--primary-color);display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:700;flex-shrink:0">' + (kName.match(/\b(\S)/g) || []).slice(0,2).join('') + '</div>',
				'    <div><strong style="font-size:1rem">' + kName + '</strong><br><small style="color:var(--text-muted)">' + kParish + '</small></div>',
				'  </div>',
				'  <div class="info-table">',
				'    <div class="info-row"><span>Parafia</span><strong>' + (kParish || '—') + '</strong></div>',
				'    <div class="info-row"><span>Diecezja</span><strong>Sandomierska</strong></div>',
				'    <div class="info-row"><span>Funkcja</span><strong>Proboszcz</strong></div>',
				'    <div class="info-row"><span>Telefon</span><strong>502 597 835</strong></div>',
				'    <div class="info-row"><span>E-mail</span><strong>kontakt@parafia.pl</strong></div>',
				'    <div class="info-row"><span>Opiekun CRM</span><strong>Anna K.</strong></div>',
				'  </div>',
				'  <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border-color)">',
				'    <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);font-weight:700;margin-bottom:0.75rem">Historia wyjazdow</div>',
				'    <div style="display:flex;gap:0.4rem;flex-wrap:wrap">',
				'      <span style="background:#f59e0b18;border:1px solid #f59e0b40;color:#f59e0b;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700">2020</span>',
				'      <span style="background:#3b82f618;border:1px solid #3b82f640;color:#3b82f6;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700">2022</span>',
				'      <span style="background:#10b98118;border:1px solid #10b98140;color:#10b981;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700">2023</span>',
				'      <span style="background:#0ea5e918;border:1px solid #0ea5e940;color:#0ea5e9;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700">2024</span>',
				'      <span style="background:#f43f5e18;border:1px solid #f43f5e40;color:#f43f5e;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.72rem;font-weight:700">2025</span>',
				'    </div>',
				'  </div>',
				'</div>'
			].join('');
			openModal('Kartoteka — ' + kName, kBody, 'Edytuj dane', function () {
				showToast('Kartoteka zaktualizowana.', 'success');
			});
			return;
		}

		if (action === 'karta_grupy') {
                    window.AppNavigation.setActivePage('szczegoly_grupy');
                    return;
            }
            if (action === 'karta_grupy_old') {
			var card = document.querySelector('.group-card-detail');
			if (card) {
				card.style.display = 'block';
				card.scrollIntoView({ behavior: 'smooth', block: 'start' });
				card.style.outline = '2px solid var(--primary-color)';
				card.style.borderRadius = '12px';
				setTimeout(function () { card.style.outline = ''; card.style.borderRadius = ''; }, 1500);
			}
			return;
		}

		if (action === 'dodaj_crm') {
			var crmRow = btn.closest('tr');
			var crmOrg = crmRow ? (crmRow.querySelector('td strong') || {}).textContent || '' : '';
			var crmF = buildForm('crm', 'Dodaj organizatora do CRM');
			// Pre-fill name hint in body if we have context
			var crmBody = crmOrg
				? '<div style="margin-bottom:1rem;padding:0.6rem 0.85rem;background:#eff6ff;border-radius:6px;font-size:0.82rem;color:#1e40af"><i class="fa-solid fa-circle-info"></i> Wypełniasz dane dla: <strong>' + crmOrg + '</strong> (z zapytania)</div>' + crmF.body
				: crmF.body;
			openModal(crmF.title, crmBody, 'Dodaj do bazy', function () {
				showToast('Kontakt dodany do CRM!', 'success');
			});
			return;
		}

		if (action === 'call' || action === 'call_log') {
			var callRow = btn.closest('tr');
			var callName = callRow ? ((callRow.querySelector('.client-name-cell strong') || callRow.querySelector('td strong') || {}).textContent || 'Kontakt') : 'Kontakt';
			var callCampaign = callRow ? ((callRow.querySelector('td:nth-child(5) small') || {}).textContent || '') : '';
			var callBody = [
				'<div class="form-mockup">',
				callCampaign ? '<div style="margin-bottom:1rem;padding:0.6rem 0.85rem;background:#eff6ff;border-radius:6px;font-size:0.82rem;color:#1e40af"><i class="fa-solid fa-bullhorn" style="margin-right:0.4rem"></i>Kampania: <strong>' + callCampaign + '</strong></div>' : '',
				'  <div class="form-field"><span>Wynik rozmowy</span><select>',
				'    <option>Odebrał — zainteresowany (przesłać ofertę)</option>',
				'    <option>Odebrał — zainteresowany (oddzwoni)</option>',
				'    <option>Odebrał — umówiony na rozmowę z ofertowaniem</option>',
				'    <option>Odebrał — niezainteresowany</option>',
				'    <option>Nie odebrał — oddzwoni</option>',
				'    <option>Nie odebrał — brak kontaktu (3. próba)</option>',
				'    <option>Zajęty — zadzwonić za 1–2 dni</option>',
				'  </select></div>',
				'  <div class="form-row-2">',
				'    <div class="form-field"><span>Data następnego kontaktu</span><input type="text" value="04.04.2026" /></div>',
				'    <div class="form-field"><span>Godzina</span><input type="text" value="10:00" /></div>',
				'  </div>',
				'  <div class="form-field"><span>Notatka z rozmowy</span><textarea rows="3" placeholder="Co powiedział, czym jest zainteresowany, uwagi..."></textarea></div>',
				'  <div class="form-row-2">',
				'    <div class="form-field"><span>Kierunek / produkt</span><select><option>Ziemia Święta</option><option>Włochy / Rzym</option><option>Medjugorie</option><option>Grecja — Śladami Pawła</option><option>Santiago de Compostela</option><option>Fatima + Lourdes</option><option>Inny / do ustalenia</option></select></div>',
				'    <div class="form-field"><span>Czas trwania rozmowy (min)</span><input type="text" value="3" /></div>',
				'  </div>',
				'</div>'
			].join('');
			openModal('Zaloguj wynik rozmowy — ' + callName, callBody, 'Zapisz wynik', function () {
				showToast('Wynik rozmowy zapisany. Następny kontakt zaplanowany.', 'success');
			});
			return;
		}

		// Generic mapped messages
		var msgArr = TOAST_MESSAGES[action];
		if (action === 'history') {
			var histBody = [
				'<div style="display:flex;flex-direction:column;gap:0.4rem">',
				'<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">',
				'<div style="width:28px;height:28px;background:#fed7aa;color:#c2410c;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.7rem"></i></div>',
				'<div><div style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">22.01.2026</div><div style="font-size:0.82rem">Rezygnacja: <strong>Michał Kosiorek</strong> → wchodzi <strong>Sławomir Zaręba</strong>. Dopłata za zmianę biletu.</div></div>',
				'</div>',
				'<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">',
				'<div style="width:28px;height:28px;background:#fed7aa;color:#c2410c;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.7rem"></i></div>',
				'<div><div style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">21.01.2026</div><div style="font-size:0.82rem">Rezygnacja: <strong>Stefan i Teresa Jaworscy (2 os.)</strong> → wchodzą <strong>Aldona Skrońska</strong> i <strong>Mariusz Kozioł</strong>.</div></div>',
				'</div>',
				'<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#f0fdf4;border-radius:8px">',
				'<div style="width:28px;height:28px;background:#d1fae5;color:#166534;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-receipt" style="font-size:0.7rem"></i></div>',
				'<div><div style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">13.01.2026</div><div style="font-size:0.82rem">Faktura końcowa LOT opłacona: <strong>84 406 zł</strong> (f. 0238/01/26/F/BSP).</div></div>',
				'</div>',
				'<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fff7ed;border-radius:8px">',
				'<div style="width:28px;height:28px;background:#fed7aa;color:#c2410c;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-user-group" style="font-size:0.7rem"></i></div>',
				'<div><div style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">05.01.2026</div><div style="font-size:0.82rem">Rezygnacja: <strong>Alicja Myśliwiec</strong> → Barbara Grzesiak. Rezygnacja: <strong>Zuzanna Krazy</strong> → Violetta Zdanowska.</div></div>',
				'</div>',
				'<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;background:#fef2f2;border-radius:8px">',
				'<div style="width:28px;height:28px;background:#fecaca;color:#991b1b;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-ban" style="font-size:0.7rem"></i></div>',
				'<div><div style="font-size:0.72rem;font-weight:700;color:var(--text-muted)">29.10.2025</div><div style="font-size:0.82rem"><strong>Anulacja MT-2026-EG-00</strong> — EGIPT NA SPRZEDAŻ. Powód: nie ma nikogo. Bilet ZVEQA4 anulowany.</div></div>',
				'</div>',
				'</div>'
			].join('');
			openModal('Historia zmian — MT-2026-EG-01 Egipt Żebrowska', histBody, 'Zamknij', function () {});
			return;
		}

		if (action === 'new_event') {
			var evBody = [
				'<div class="form-mockup">',
				'<div style="margin-bottom:1rem;padding:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;font-size:0.82rem;color:#166534"><i class="fa-solid fa-circle-check" style="margin-right:0.4rem"></i>Tworzysz imprezę na podstawie zaakceptowanego zapytania <strong>ZAP-2026-038 — ks. Hendzel · Portugalia + Santiago (35 os., maj 2026)</strong>.</div>',
				'<div class="form-row-2">',
				'  <div class="form-field"><span>Kod imprezy</span><input type="text" value="MT-2026-PT-02" /></div>',
				'  <div class="form-field"><span>Typ imprezy</span><select><option>Pielgrzymka</option><option>Wycieczka szkolna</option><option>Wyjazd integracyjny</option></select></div>',
				'</div>',
				'<div class="form-row-2">',
				'  <div class="form-field"><span>Data wyjazdu</span><input type="text" value="18.05.2026" /></div>',
				'  <div class="form-field"><span>Data powrotu</span><input type="text" value="25.05.2026" /></div>',
				'</div>',
				'<div class="form-row-2">',
				'  <div class="form-field"><span>Autor oferty</span><select><option>Anna K.</option><option>Marek W.</option><option>Piotr S.</option></select></div>',
				'  <div class="form-field"><span>BOK (obsługa klienta)</span><select><option>Kamila (K)</option><option>Paulina (P)</option></select></div>',
				'</div>',
				'<div class="form-row-2">',
				'  <div class="form-field"><span>Bilety (dział biletowy)</span><select><option>Edyta (E)</option><option>Monika (M)</option></select></div>',
				'  <div class="form-field"><span>Pilot</span><input type="text" placeholder="Przypisz pilota..." /></div>',
				'</div>',
				'<div class="form-field"><span>Uwagi startowe</span><textarea rows="2" placeholder="Notatki do imprezy...">Zaakceptowana oferta v3. Cena: 5 190 zł/os. Kontrahent: do ustalenia (Fatima - Hotel Recinto).</textarea></div>',
				'</div>'
			].join('');
			openModal('Utwórz imprezę z zaakceptowanego zapytania', evBody, 'Utwórz imprezę', function () {
				showToast('Impreza MT-2026-PT-02 została utworzona w terminarz grup.', 'success');
			});
			return;
		}

		var msgArr = TOAST_MESSAGES[action];
		if (msgArr) {
			showToast(msgArr[0], msgArr[1]);
		}
	}

	/* -------- 6. TAB SWITCHING -------- */
	function handleTabSwitch(tab) {
		var container = tab.closest('.group-card-tabs') ||
		                tab.closest('.notif-tabs') ||
		                tab.closest('.mail-tabs') ||
		                tab.parentElement;
		if (container) {
			container.querySelectorAll('.group-tab, .notif-tab').forEach(function (t) {
				t.classList.remove('active');
			});
			tab.classList.add('active');
		}

		// Switch tab panels inside the closest group-card-detail (or card body)
		var panelKey = tab.getAttribute('data-tab');
		if (panelKey) {
			var cardDetail = tab.closest('.group-card-detail');
			if (cardDetail) {
				var body = cardDetail.querySelector('.group-card-body');
				if (body) {
					body.querySelectorAll('.group-tab-panel').forEach(function (p) {
						p.classList.remove('active');
					});
					var target = body.querySelector('.group-tab-panel[data-panel="' + panelKey + '"]');
					if (target) target.classList.add('active');
				}
			}
		}
	}

	/* -------- 7. MAIL FOLDER CLICK -------- */
	function handleFolderClick(folder) {
		var container = folder.closest('.mail-folder-list');
		if (container) {
			container.querySelectorAll('.mail-folder').forEach(function (f) { f.classList.remove('active'); });
			folder.classList.add('active');
		}
	}

	/* -------- 8. EMAIL ROW CLICK -------- */
	function handleEmailRowClick(row) {
		var allRows = row.closest('.email-list');
		if (allRows) allRows.querySelectorAll('.email-row').forEach(function (r) { r.classList.remove('open', 'unread'); });
		row.classList.add('open');
		row.classList.remove('unread');
		var subject = row.querySelector('.email-subject');
		var subjectText = subject ? subject.textContent.trim() : 'Wiadomość';
		openModal(
			subjectText.replace(/<[^>]+>/g, ''),
			[
				'<div style="margin-bottom:1rem;padding:0.75rem;background:var(--bg-main);border-radius:8px;font-size:0.85rem">',
				'  <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem">',
				'    <span><strong>Od:</strong> ' + (row.querySelector('.email-from')?.textContent || 'nadawca@example.com') + '</span>',
				'    <span>' + (row.querySelector('.email-time')?.textContent || '') + '</span>',
				'  </div>',
				'  <div><strong>Do:</strong> biuro@matteotravelkrakow.pl</div>',
				'</div>',
				'<div style="font-size:0.9rem;line-height:1.7">',
				'  <p>Szanowni Państwo,</p>',
				'  <p>Dziękuję za przesłaną ofertę i materiały dotyczące wyjazdu. Zapoznałem się z propozycją i mam kilka pytań odnośnie szczegółów programu:</p>',
				'  <ol style="margin:0.75rem 0 0.75rem 1.25rem">',
				'    <li>Czy możliwe jest dodanie dodatkowej Mszy Świętej w Betlejem?</li>',
				'    <li>Jaka część uczestników ma pokoje jednoosobowe w cenie?</li>',
				'    <li>Jak wygląda ubezpieczenie — czy obejmuje rezygnację z powodu choroby?</li>',
				'  </ol>',
				'  <p>Z poważaniem,<br><em>(treść demonstracyjna)</em></p>',
				'</div>'
			].join(''),
			'Odpowiedz',
			function () { showToast('Odpowiedź wysłana.', 'success'); }
		);
	}

	/* -------- 9. CHAT THREAD CLICK -------- */
	function handleChatThreadClick(thread) {
		var container = thread.closest('.chat-list');
		if (container) {
			container.querySelectorAll('.chat-thread').forEach(function (t) { t.classList.remove('active'); });
		}
		thread.classList.add('active');
		thread.querySelector('.chat-badge') && thread.querySelector('.chat-badge').remove();
	}

	/* -------- 9b. TECZKA SECTION CLICK -------- */
	function handleTeczkaSectionClick(section) {
		var container = section.closest('.teczka-sections');
		if (container) {
			container.querySelectorAll('.teczka-section').forEach(function (s) { s.classList.remove('active'); });
			section.classList.add('active');
		}
		// Update preview panel title in sibling column
		var grid = section.closest('.dashboard-grid');
		if (grid) {
			var previewEl = grid.querySelector('.teczka-preview');
			if (previewEl) {
				var previewPanel = previewEl.closest('.panel');
				var h2 = previewPanel && previewPanel.querySelector('.panel-header h2');
				if (h2) {
					// Get section label (strip icon, keep text)
					var clone = section.cloneNode(true);
					clone.querySelectorAll('i').forEach(function (i) { i.parentNode.removeChild(i); });
					var name = clone.textContent.replace(/\(\d+\)/, '').trim();
					h2.textContent = '\uD83D\uDCC4 Podgl\u0105d \u2014 ' + name;
				}
			}
		}
	}

	/* -------- 9c. SEGMENT TAG CLICK -------- */
	function handleSegmentTagClick(tag) {
		var container = tag.closest('[class*="segment"]') || tag.parentElement;
		if (container) {
			container.querySelectorAll('.segment-tag').forEach(function (t) { t.classList.remove('active'); });
		}
		tag.classList.add('active');
		var name = tag.textContent.trim();
		showToast('Segment: ' + name + ' — filtrowanie wyników.', 'info');
	}

	/* -------- 9d. PIPELINE STAGE CLICK -------- */
	function handlePipelineStageClick(stage) {
		var container = stage.closest('.pipeline-row');
		if (container) {
			container.querySelectorAll('.pipeline-stage').forEach(function (s) { s.classList.remove('selected'); });
		}
		stage.classList.add('selected');
		var label = stage.querySelector('.pipeline-label');
		var count = stage.querySelector('.pipeline-count');
		var msg = (label ? label.textContent.trim() : 'Etap') + (count ? ': ' + count.textContent.trim() : '');
		showToast(msg, 'info');
	}

	/* -------- 10. TABLE ROW CLICK -------- */
	function handleTableRowClick(row) {
		var tbl = row.closest('table');
		if (tbl) tbl.querySelectorAll('tr.selected-row').forEach(function (r) { r.classList.remove('selected-row'); });
		row.classList.add('selected-row');
		// Find meaningful cell text for the toast
		var firstCell = row.querySelector('td strong, td code');
		var label = firstCell ? firstCell.textContent.trim() : 'Rekord';
		showToast('Zaznaczono: ' + label + ' — dwuklik otwiera szczegóły.', 'info');
	}

	/* -------- 11. QUICK ADD MODAL ITEMS -------- */
	function handleQuickAddItem(item) {
		var label = item.querySelector('span')?.textContent?.trim() || 'Nowy wpis';
		var pageMap = {
			'Nowy klient': 'crm',
			'Nowe zapytanie': 'zapytania',
			'Nowa grupa': 'grupy',
			'Nowa rezerwacja': 'rezerwacje',
			'Nowa umowa': 'umowy',
			'Rejestruj wpłatę': 'platnosci',
			'Nowe spotkanie': 'kalendarz'
		};
		var page = pageMap[label] || 'default';
		var f = buildForm(page, label);
		// Close quick-add modal first
		document.getElementById('quickAddModal')?.classList?.remove('show');
		setTimeout(function () { openModal(f.title, f.body, 'Dodaj', function () { showToast(label + ' — dodano pomyślnie!', 'success'); }); }, 100);
	}

	/* -------- 12. NOTIFICATION DISMISS -------- */
	function handleNotifMarkAll() {
		document.querySelectorAll('.notif-item.unread').forEach(function (n) { n.classList.remove('unread'); });
		var dot = document.querySelector('.notification-dot');
		if (dot) dot.style.display = 'none';
		showToast('Wszystkie powiadomienia oznaczone jako przeczytane.', 'success');
	}

	/* -------- 13. MAIN EVENT DELEGATION -------- */
	var IGNORED_BTN_IDS = new Set([
		'sidebarToggle', 'mobileToggle', 'quickAddBtn', 'quickAddClose',
		'notificationBtn', 'feedbackTab', 'feedbackNewBtn', 'feedbackCloseBtn',
		'feedbackSyncCurrentBtn', 'feedbackCancelCapture', 'feedbackToggleMarkersBtn',
		'feedbackToggleHistoryBtn', 'feedbackApplyViewBtn', 'feedbackApplyViewBtn',
		'demoMClose', 'demoMCancel', 'demoMSave'
	]);

	function isFeedbackArea(el) {
		return !!(el.closest && el.closest('[data-html2canvas-ignore]'));
	}

	function initGlobalDelegation() {
		// Listen on document to catch content dynamically loaded in contentArea
		document.addEventListener('click', function (e) {
			var target = e.target;

			// --- Notification mark all ---
			if (target.closest('.notif-mark-all')) {
				handleNotifMarkAll();
				return;
			}

			// --- Quick-add items (inside modal) ---
			var quickItem = target.closest('.quick-add-item');
			if (quickItem) { handleQuickAddItem(quickItem); return; }

			// --- Ignore feedback system entirely ---
			if (isFeedbackArea(target)) return;

			var contentArea = el('contentArea');
			if (!contentArea || !contentArea.contains(target)) return;

			// --- Tab buttons ---
			var tab = target.closest('.group-tab, .notif-tab');
			if (tab) { handleTabSwitch(tab); return; }

			// --- Teczka section ---
			var teczkaSection = target.closest('.teczka-section');
			if (teczkaSection) { handleTeczkaSectionClick(teczkaSection); return; }

			// --- Segment tag ---
			var segTag = target.closest('.segment-tag');
			if (segTag) { handleSegmentTagClick(segTag); return; }

			// --- Pipeline stage ---
			var pipelineStage = target.closest('.pipeline-stage');
			if (pipelineStage && !target.closest('button')) { handlePipelineStageClick(pipelineStage); return; }

			// --- Mail folder ---
			var folder = target.closest('.mail-folder');
			if (folder) { handleFolderClick(folder); return; }

			// --- Email row ---
			var emailRow = target.closest('.email-row');
			if (emailRow && !target.closest('button')) { handleEmailRowClick(emailRow); return; }

			// --- Chat thread ---
			var chatThread = target.closest('.chat-thread');
			if (chatThread && !target.closest('button')) { handleChatThreadClick(chatThread); return; }

			// --- Table row (but not if clicking a button inside) ---
			// Terminarz row click → show group card
			var row = target.closest('tbody tr');
			if (row && !target.closest('button') && !target.closest('a')) {
				if (row.closest('.terminarz-table')) {
					var card = document.querySelector('.group-card-detail');
					if (card) {
						card.style.display = 'block';
						card.scrollIntoView({ behavior: 'smooth', block: 'start' });
						card.style.outline = '2px solid var(--primary-color)';
						card.style.borderRadius = '12px';
						setTimeout(function () { card.style.outline = ''; card.style.borderRadius = ''; }, 1500);
					}
					return;
				}
				handleTableRowClick(row);
				return;
			}

			// --- BUTTONS ---
			var btn = target.closest('button');
			if (!btn) return;
			if (btn.id && IGNORED_BTN_IDS.has(btn.id)) return;
			if (btn.closest('.role-dropdown')) return;   // role switcher
			if (btn.closest('.sidebar-footer')) {
				// User menu button
				showToast('Menu użytkownika — funkcja dostępna w wersji produkcyjnej.', 'info');
				return;
			}

			var page = getActivePage();
			handleButtonAction(btn, page);
		}, true); // capture phase so we get it before other handlers can stopPropagation
	}

	/* -------- 14. CHAIR ROW DOUBLE-CLICK DETAIL -------- */
	function initRowDblClick() {
		document.addEventListener('dblclick', function (e) {
			var contentArea = el('contentArea');
			if (!contentArea || !contentArea.contains(e.target)) return;
			var row = e.target.closest('tbody tr');
			if (!row) return;

			var cells = row.querySelectorAll('td');
			var page = getActivePage();
			var def = NEW_FORMS[page] || NEW_FORMS.default;

			var detailBody = '<div style="display:grid;gap:0.5rem">';
			cells.forEach(function (td, i) {
				var label = def.fields[i] ? def.fields[i].label : ('Kolumna ' + (i + 1));
				var val = td.textContent.trim();
				if (val) detailBody += '<div class="info-row"><span>' + label + '</span><strong>' + val + '</strong></div>';
			});
			detailBody += '</div>';

			openModal('Szczegóły rekordu', detailBody, 'Edytuj', function () {
				var f = buildForm(page, 'Edytuj rekord');
				openModal(f.title, f.body, 'Zapisz zmiany', function () { showToast('Zmiany zapisane!', 'success'); });
			});
		});
	}

	/* -------- 15. FORM FIELDS IN CONTENT AREA -------- */
	function initFormInputs() {
		// Debounced "auto-saved" indicator on native form fields in content area
		var debounceTimer = null;
		document.addEventListener('input', function (e) {
			var contentArea = el('contentArea');
			if (!contentArea || !contentArea.contains(e.target)) return;
			if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') return;
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(function () {
				// Only show if we're not inside the demo modal
				if (e.target.closest('.demo-modal')) return;
				showToast('Zmiany zostaną zapisane automatycznie.', 'info');
			}, 1200);
		});
	}

	/* -------- PUBLIC API -------- */
	function init() {
		initGlobalDelegation();
		initRowDblClick();
		initFormInputs();
	}

	window.DemoInteractions = { init: init, showToast: showToast };
})();
