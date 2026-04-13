(function () {
const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

/* =====================================================================
   CRM — Baza organizatorów pielgrzymek (księża, zakonnicy)
   Model oparty na rzeczywistym arkuszu biura Matteo Travel.
   ===================================================================== */

const TRIP_YEAR_TONE = {
'2018': '#94a3b8', '2019': '#8b5cf6', '2020': '#f59e0b',
'2022': '#3b82f6', '2023': '#10b981', '2024': '#0ea5e9',
'2025': '#f43f5e', '2026': '#6366f1'
};

const priests = [
{
tytul: 'ks.', imie: 'Dawid', nazwisko: 'Adamczak', funkcja: 'Wikariusz',
telefon: '17 324 394 241', email: 'dadamczak@wp.pl',
parafia: 'Parafia Sw. Stanislawa Kostki', diecezja: '\u2014',
adres: '184 Ray Street, Garfield, New Jersey 07026',
popParafie: '', uwagi: '',
wyjazdy: { '2020': 'W\u0142ochy' }
},
{
tytul: 'ks.', imie: 'Wojciech', nazwisko: 'Adamczyk', funkcja: 'Proboszcz',
telefon: '502 597 835', email: 'wojada2@op.pl',
parafia: 'pw. Chrystusa Dobrego Pasterza', diecezja: 'Sandomierska',
adres: 'ul. Sienkiewicza 213, 39-400 Tarnob\u017ceg',
popParafie: '', uwagi: '',
wyjazdy: { '2020': 'Gruzja i Armenia', '2022': 'Turcja', '2023': 'Cypr', '2024': 'Bu\u0142garia', '2025': 'Sycylia' }
},
{
tytul: 'ks.', imie: 'S\u0142awomir', nazwisko: 'Adamczyk', funkcja: 'Proboszcz',
telefon: '604 900 595', email: 'swnepomucen.przysucha@gmail.com',
parafia: 'Parafia Sw. Jana Nepomucena', diecezja: 'Radomska',
adres: 'ul. ks. Scigiennego 5, 26-400 Przysucha',
popParafie: '', uwagi: '',
wyjazdy: { '2025': 'Gruzja i Armenia' }
},
{
tytul: 'ks.', imie: 'Tomasz', nazwisko: 'Atras', funkcja: 'Wikariusz',
telefon: '600 269 717', email: 'atras@o2.pl',
parafia: 'pw. Przenajswietszej Trojcy', diecezja: 'Lubelska',
adres: 'ul. Plac Jana Pawla II 2, 22-100 Chelm',
popParafie: '', uwagi: '',
wyjazdy: { '2019': 'Meksyk', '2023': 'Medjugorie' }
},
{
tytul: 'o.', imie: 'Ezechiel', nazwisko: 'Adamski', funkcja: 'Zakonnik (Franciszkanie)',
telefon: '795 719 593', email: 'ezechiel_adamski@wp.pl',
parafia: 'Klasztor Franciszkanow pw. Sw. Antoniego Padarewskiego', diecezja: 'Wroclawska',
adres: 'al. Jana Kasprowicza 26, 51-161 Wroclaw',
popParafie: 'Kapelan szpitalny', uwagi: 'Obecnie kapelan w szpitalu',
wyjazdy: { '2020': 'W\u0142ochy', '2025': 'W\u0142ochy' }
},
{
tytul: 'ks.', imie: 'Marek', nazwisko: 'Adamus', funkcja: '\u2014',
telefon: '798 458 026', email: '',
parafia: '\u2014', diecezja: '\u2014',
adres: '', popParafie: '', uwagi: '',
wyjazdy: { '2025': 'Ziemia Swieta' }
},
{
tytul: 'ks.', imie: 'Albin', nazwisko: 'Rodryg', funkcja: 'Proboszcz',
telefon: '601 789 090', email: '',
parafia: 'Parafia Narodzenia NMP', diecezja: 'Legnicka',
adres: 'Maluszow 14, 59-425 Maluszow',
popParafie: '', uwagi: '',
wyjazdy: {}
},
{
tytul: 'o.', imie: 'Andrzej', nazwisko: 'Albiniak', funkcja: '\u2014',
telefon: '507 115 328', email: 'albinomi@gmail.com',
parafia: '\u2014', diecezja: '\u2014',
adres: 'ul. Koscielna 1, 14-200 Ilawa',
popParafie: '', uwagi: '',
wyjazdy: { '2018': '\u2014', '2022': 'Meksyk', '2024': 'Gruzja i Armenia, Turcja' }
},
{
tytul: 'ks.', imie: 'Pawel', nazwisko: 'Aniol', funkcja: 'Dyrektor',
telefon: '698 879 926', email: 'aniol@pro.onet.pl',
parafia: 'Dom Ulgi w Cierpieniu im. Jana Pawla II', diecezja: 'Sandomierska',
adres: 'ul. Focha, 27-400 Ostrowiec Swietokrzyski',
popParafie: '', uwagi: '',
wyjazdy: {}
},
{
tytul: 'ks.', imie: 'Jan', nazwisko: 'Wisnewski', funkcja: 'Proboszcz',
telefon: '501 234 567', email: 'jan.wisniewski@parafia.pl',
parafia: 'Parafia Wniebowziecia NMP', diecezja: 'Krakowska',
adres: 'ul. Mariacka 1, 31-042 Krakow',
popParafie: '', uwagi: 'Lider grupy MT-2026-WL-01',
wyjazdy: { '2022': 'Ziemia Swieta', '2023': 'Rzym', '2024': 'Lourdes', '2025': 'Fatima', '2026': 'Ziemia Swieta' }
},
{
tytul: 'ks.', imie: 'Marek', nazwisko: 'Kowalski', funkcja: 'Proboszcz',
telefon: '502 111 222', email: 'marek.kowalski@diecezja.pl',
parafia: 'Parafia Milosiedzia Bozego', diecezja: 'Krakowska',
adres: 'ul. Fatimska 5, 31-031 Krakow',
popParafie: '', uwagi: '',
wyjazdy: { '2019': 'W\u0142ochy', '2020': 'Ziemia Swieta', '2022': 'Grecja', '2023': 'Portugalia', '2024': 'Ziemia Swieta', '2025': 'Santiago' }
},
{
tytul: 'ks.', imie: 'Pawel', nazwisko: 'Nowicki', funkcja: 'Proboszcz',
telefon: '601 789 333', email: 'pawel.nowicki@diec.poznan.pl',
parafia: 'Parafia Bozego Ciala', diecezja: 'Poznanska',
adres: 'ul. Bozego Ciala 12, 61-001 Poznan',
popParafie: '', uwagi: '',
wyjazdy: { '2024': 'W\u0142ochy', '2026': 'W\u0142ochy' }
}
,
	/* --- Organizatorzy świeccy i instytucje (źródło: arkusz biura) --- */
	{
		tytul: 'inst.', imie: '', nazwisko: 'Akademia Liturgiczna', funkcja: 'Instytucja',
		telefon: '880 913 812', email: 'info@akademialiturgiczna.pl',
		parafia: 'Akademia Liturgiczna', diecezja: 'Rzeszowska',
		adres: 'ul. Witold 11a, 35-302 Rzeszów',
		popParafie: '', uwagi: '',
		wyjazdy: {}
	},
	{
		tytul: 'p.', imie: 'Agnieszka', nazwisko: 'Babiarz', funkcja: '—',
		telefon: '601 375 037', email: 'agnieszkababiarz@wp.pl',
		parafia: 'Brzoża Stadnicka', diecezja: '—',
		adres: '', popParafie: '', uwagi: '',
		wyjazdy: { '2025': 'Rzym — Watykan' }
	},
	{
		tytul: 'p.', imie: 'Krystyna', nazwisko: 'Borkowska', funkcja: '—',
		telefon: '606 719 551', email: '',
		parafia: 'Lubenia', diecezja: '—',
		adres: '', popParafie: '', uwagi: '',
		wyjazdy: { '2025': 'Włochy — Rimini' }
	},
	{
		tytul: 'p.', imie: 'Wojciech', nazwisko: 'Bator', funkcja: '—',
		telefon: '783 253 545', email: 'w.bator@b-koncept.pl',
		parafia: 'Akademia Liturgiczna', diecezja: 'Rzeszowska',
		adres: 'Rzeszów', popParafie: '', uwagi: '',
		wyjazdy: { '2022': 'Meksyk' , '2023': 'Turcja' }
	},
	{
		tytul: 'p.', imie: 'Jarosław', nazwisko: 'Barylski', funkcja: '—',
		telefon: '531 896 073', email: '',
		parafia: 'pw. św. Małgorzaty, dziewicy i męczennicy', diecezja: '—',
		adres: '99-122 Góra św. Małgorzaty 38A', popParafie: '', uwagi: '',
		wyjazdy: { '2025': 'Medjugorie' }
	},
	{
		tytul: 'p.', imie: 'Łukasz', nazwisko: 'Bereś', funkcja: '—',
		telefon: '693 631 063', email: 'Lberes102@wp.pl',
		parafia: '—', diecezja: '—',
		adres: '', popParafie: '', uwagi: '',
		wyjazdy: { '2025': 'Gruzja' }
	}
];

function tripCount(p) { return Object.keys(p.wyjazdy).length; }
function initials(p) {
	if (p.tytul === 'inst.') {
		// Institution: use first two letters of name
		var w = (p.nazwisko || '').split(/\s+/);
		return (w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : (w[0] ? w[0][1] : ''));
	}
	return ((p.imie || '')[0] || '') + ((p.nazwisko || '')[0] || '');
}

function avatarStyle(p) {
	if (p.tytul === 'inst.') return 'background:#f0fdf4;color:#166534';
	if (p.tytul === 'p.') return 'background:#fef9c3;color:#854d0e';
	return 'background:var(--primary-light);color:var(--primary-color)';
}

function crmStatus(p) {
const tc = tripCount(p);
if (p.wyjazdy['2026']) return { label: 'Aktywny 2026', tone: 'success' };
if (p.wyjazdy['2025']) return { label: 'By\u0142 w 2025', tone: 'info' };
if (tc >= 4) return { label: 'VIP / Lojalny', tone: 'purple' };
if (tc >= 1) return { label: 'W bazie', tone: 'neutral' };
return { label: 'Bez wyjazdow', tone: 'neutral' };
}

function tripChips(wyjazdy) {
const years = Object.keys(wyjazdy).sort();
if (!years.length) return '<span style="color:var(--text-muted);font-size:0.78rem">\u2014</span>';
return years.map(function(y) {
const c = TRIP_YEAR_TONE[y] || '#6b7280';
return '<span style="display:inline-block;background:' + c + '18;border:1px solid ' + c + '40;color:' + c + ';padding:0.1rem 0.4rem;border-radius:4px;font-size:0.7rem;font-weight:700;white-space:nowrap">' + y + '</span>';
}).join(' ');
}

function tripTimeline(wyjazdy) {
const years = Object.keys(wyjazdy).sort();
if (!years.length) return '<p style="color:var(--text-muted);font-size:0.85rem">Brak zarejestrowanych wyjazdow.</p>';
return '<div class="trip-timeline">' + years.map(function(y) {
const c = TRIP_YEAR_TONE[y] || '#6b7280';
return '<div class="trip-timeline-row">' +
'<div class="trip-year-badge" style="background:' + c + '15;color:' + c + ';border:1px solid ' + c + '40">' + y + '</div>' +
'<div class="trip-timeline-dot" style="background:' + c + '"></div>' +
'<div class="trip-timeline-label">' + (wyjazdy[y] || '') + '</div>' +
'</div>';
}).join('') + '</div>';
}

function renderCRM() {
const rows = priests.map(function(p) {
const st = crmStatus(p);
const isInst = p.tytul === 'inst.';
const fullName = isInst ? p.nazwisko : (p.tytul + ' ' + p.imie + ' ' + p.nazwisko).trim();
const typeTag = p.tytul === 'p.' ? '<span style="display:inline-block;background:#fef9c3;color:#854d0e;border:1px solid #fde68a;border-radius:3px;font-size:0.65rem;font-weight:700;padding:0 0.3rem;margin-left:0.3rem">świecki</span>'
				: p.tytul === 'inst.' ? '<span style="display:inline-block;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;border-radius:3px;font-size:0.65rem;font-weight:700;padding:0 0.3rem;margin-left:0.3rem">instytucja</span>'
				: '';
const tc = tripCount(p);
return '<tr>' +
'<td><div class="client-name-cell">' +
'<div class="avatar-sm" style="font-size:0.6rem;' + avatarStyle(p) + '">' + initials(p) + '</div>' +
'<div><strong>' + escapeHtml(fullName) + typeTag + '</strong><small>' + escapeHtml(p.parafia || '\u2014') + '</small></div>' +
'</div></td>' +
'<td><small>' + escapeHtml(p.funkcja || '\u2014') + '</small></td>' +
'<td><small>' + escapeHtml(p.diecezja || '\u2014') + '</small></td>' +
'<td style="white-space:nowrap"><small>' + escapeHtml(p.telefon || '\u2014') + '</small></td>' +
'<td><div style="display:flex;gap:0.2rem;flex-wrap:wrap">' + tripChips(p.wyjazdy) + '</div></td>' +
'<td style="text-align:center"><span class="trips-badge">' + tc + '</span></td>' +
'<td>' + statusBadge(st.label, st.tone) + '</td>' +
'<td><div style="display:flex;gap:0.3rem">' +
button({ label: 'Kartoteka', variant: 'outline', attrs: { onclick: "window.AppNavigation.setActivePage('kartoteka')" } }) +
(p.telefon ? button({ label: '', icon: 'fa-solid fa-phone', variant: 'ghost', attrs: { title: 'Zadzwon' } }) : '') +
(p.email ? button({ label: '', icon: 'fa-solid fa-envelope', variant: 'ghost', attrs: { title: 'E-mail' } }) : '') +
'</div></td>' +
'</tr>';
}).join('');

const demo = priests[1];
const demoFullName = demo.tytul + ' ' + demo.imie + ' ' + demo.nazwisko;
const demoSt = crmStatus(demo);

return [
dashboardHeader({
title: 'CRM \u2014 Baza organizator\u00f3w',
subtitle: 'Kartoteka księży, zakonników i organizatorów świeckich — dane z arkusza kalkulacyjnego biura',
actions: [
button({ label: 'Import XLS', icon: 'fa-solid fa-file-excel', variant: 'outline' }),
button({ label: 'Nowy kontakt', icon: 'fa-solid fa-user-plus' })
]
}),
'<div class="stats-grid">' +
statCard({ title: 'Kontakt\u00f3w w bazie', value: '847', icon: 'fa-solid fa-address-book', iconTone: 'blue' }) +
statCard({ title: 'Aktywni (2025\u20132026)', value: '124', icon: 'fa-solid fa-church', iconTone: 'green', trend: '<i class="fa-solid fa-arrow-trend-up"></i> +8 r/r', trendTone: 'positive' }) +
statCard({ title: 'Nowych w tym mies.', value: '14', icon: 'fa-solid fa-user-plus', iconTone: 'purple' }) +
statCard({ title: 'Imieniny dzi\u015b', value: '2', icon: 'fa-solid fa-cake-candles', iconTone: 'orange', trend: 'Zadzwo\u0144!', trendTone: 'positive' }) +
'</div>',
'<div class="dashboard-grid dashboard-grid-3-1">' +
panel({
title: 'Lista kontakt\u00f3w (' + priests.length + ' wy\u015bwietlono \u00b7 847 w bazie)',
action: '<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">' +
'<input type="text" class="inline-select" placeholder="Szukaj..." style="width:140px" />' +
'<select class="inline-select"><option>Typ: Wszyscy</option><option>Księża i zakonnicy</option><option>Świeccy</option><option>Instytucje</option></select>' + '<select class="inline-select"><option>Funkcja: Wszyscy</option><option>Proboszcz</option><option>Wikariusz</option><option>Zakonnik</option><option>Dyrektor</option></select>' +
'<select class="inline-select"><option>Wszystkie diecezje</option><option>Krakowska</option><option>Sandomierska</option><option>Lubelska</option><option>Radomska</option><option>Wroclawska</option><option>Legnicka</option></select>' +
'</div>',
body: '<div class="table-container"><table class="data-table">' +
'<thead><tr>' +
'<th>Kontakt</th>' +
'<th>Funkcja</th>' +
'<th>Diecezja</th>' +
'<th>Telefon</th>' +
'<th>Historia (lata)</th>' +
'<th style="text-align:center">\u0141\u0105cz.</th>' +
'<th>Status</th>' +
'<th></th>' +
'</tr></thead>' +
'<tbody>' + rows + '</tbody>' +
'</table></div>'
}) +
'<div style="display:flex;flex-direction:column;gap:1.25rem">' +
panel({
title: 'Segmentacja',
body: '<div class="segment-list">' +
'<button class="segment-tag active">Wszyscy <span>847</span></button>' +
'<button class="segment-tag">Aktywni 2026 <span>38</span></button>' +
'<button class="segment-tag">Byli w 2025 <span>94</span></button>' +
'<button class="segment-tag">Pielgrzymki <span>624</span></button>' +
'<button class="segment-tag">Zakonnicy <span>58</span></button>' + '<button class="segment-tag">Świeccy organizatorzy <span>143</span></button>' + '<button class="segment-tag">Instytucje <span>27</span></button>' +
'<button class="segment-tag">Nieaktywni 3+ lat <span>122</span></button>' +
'<button class="segment-tag">Bez e-mail <span>76</span></button>' +
'</div>'
}) +
panel({
title: 'Zadania CRM na dzi\u015b',
body: '<div class="list-group">' +
'<div class="list-item">' +
'<div class="list-item-icon" style="background:#dbeafe;color:#2563eb"><i class="fa-solid fa-phone"></i></div>' +
'<div class="list-item-content"><div class="list-item-title">Follow-up \u2014 ks. Atras Tomasz</div><div class="list-item-desc">Zapytanie o Medjugorie 2026</div></div>' +
button({ label: 'Zadzwon', variant: 'outline' }) +
'</div>' +
'<div class="list-item">' +
'<div class="list-item-icon" style="background:#fef3c7;color:#b45309"><i class="fa-solid fa-envelope"></i></div>' +
'<div class="list-item-content"><div class="list-item-title">Oferta \u2014 ks. Aniol Pawel</div><div class="list-item-desc">Dom Ulgi \u2014 propozycja rekolekcji</div></div>' +
button({ label: 'Otworz', variant: 'outline' }) +
'</div>' +
'<div class="list-item">' +
'<div class="list-item-icon" style="background:#d1fae5;color:#059669"><i class="fa-solid fa-star"></i></div>' +
'<div class="list-item-content"><div class="list-item-title">SMS imieninowy \u2014 o. Adamski</div><div class="list-item-desc">Imieniny Ezechiela \u2014 10.04</div></div>' +
button({ label: 'Zaplanuj', variant: 'outline' }) +
'</div>' +
'</div>'
}) +
'</div>' +
'</div>'
].join('');
}

window.CRMView = { renderCRM };
})();
