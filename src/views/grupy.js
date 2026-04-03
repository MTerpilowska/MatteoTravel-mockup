(function () {
const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

function renderGrupy() {

/* ===== TERMINARZ DATA ===== */
const groups = [
/* styczeń 2026 */
{
section: 'Styczeń 2026', id: 'MT-2026-EG-00', anulowana: true,
name: 'EGIPT — na sprzedaż (anulacja 29.10.2025)',
org: 'brak — nie ma nikogo', autor: 'Ania', bok: '—', bilety: '—',
dest: 'Egipt', from: '22.01.2026', to: '29.01.2026',
pilot: '—', kontrahent: 'Iza SENT', transport: 'samolot LOT', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: 'ZVEQA4', pax: 0, paxMax: 45,
umowy: '—', gratisy: '—', status: 'Anulowana', statusTone: 'neutral',
prowizja: '—'
},
{
section: null, id: 'MT-2026-EG-01', anulowana: false,
name: 'Egipt — Piramidy, pociąg, Hurghada',
org: 'Izabela Żebrowska / ks. Wojciech Lipka', autor: 'Ania', bok: 'K', bilety: 'E',
dest: 'Egipt', from: '24.01.2026', to: '31.01.2026',
pilot: 'Alicja Aziz', kontrahent: 'Iza Strzelak SENT', transport: 'samolot LOT + autokar (Regency)', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '24.01 g. 14:00 — WAW', bilety_nr: '44×W6Y73A / 1×TD236Z', pax: 44, paxMax: 45,
umowy: 'wysłana', gratisy: '80 USD/os. (karta)', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
{
section: null, id: 'MT-2026-KE-01', anulowana: false,
name: 'Kenia — Nairobi, Subukia, Watamu',
org: 'ks. Paweł Antosiak / ks. Wojciech Iwanicki', autor: 'Natalia', bok: 'P', bilety: 'M',
dest: 'Kenia', from: '25.01.2026', to: '08.02.2026',
pilot: 'Radosław Malinowski', kontrahent: 'ks. Antosiak (sam organizuje)', transport: 'samolot Ethiopian Airlines', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: '11×WLJENV / 1×8IAKUH', pax: 11, paxMax: 12,
umowy: 'wysłana 17.10.2025', gratisy: '150 PLN/os.', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
/* luty 2026 */
{
section: 'Luty 2026', id: 'MT-2026-EG-02', anulowana: false,
name: 'Egipt — Kair, Sharm el Sheikh, Krzysiak',
org: 'Józefa Krzysiak / ks. Michał Nędza', autor: 'Ania', bok: 'P', bilety: 'E',
dest: 'Egipt', from: '31.01.2026', to: '07.02.2026',
pilot: 'Alicja Aziz', kontrahent: 'Iza Strzelak SENT', transport: 'samolot LOT + autokar (Regency)', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '31.01 g. 15:00 — lotnisko Chopina', bilety_nr: '33×73QAVQ', pax: 33, paxMax: 33,
umowy: 'wysłana 28.02.2025', gratisy: '—', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
{
section: null, id: 'MT-2026-PT-01', anulowana: false,
name: 'Portugalia — Braga, Fatima, Santiago',
org: 'ks. Henryk Hendzel', autor: 'Zuzia', bok: 'K', bilety: 'E',
dest: 'Portugalia / Hiszpania', from: '03.02.2026', to: '10.02.2026',
pilot: 'TBD', kontrahent: 'Zuzia SENT', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'tak', msza: '—', bilety_nr: 'TBD', pax: 35, paxMax: 40,
umowy: 'wysłana', gratisy: '—', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
{
section: null, id: 'MT-2026-WL-01', anulowana: false,
name: 'Ziemia Święta — ks. Maciej Gierula',
org: 'ks. Maciej Gierula', autor: 'Anna', bok: 'P', bilety: 'M',
dest: 'Izrael / Palestyna', from: '08.02.2026', to: '16.02.2026',
pilot: 'Peter', kontrahent: 'Peter rooming sent 11.12', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: 'TBD', pax: 18, paxMax: 25,
umowy: 'wysłana', gratisy: '—', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
{
section: null, id: 'MT-2026-WL-02', anulowana: false,
name: 'Ziemia Święta — ks. Tomasz Radliński',
org: 'ks. Tomasz Radliński', autor: 'Anna', bok: 'P', bilety: 'M',
dest: 'Izrael / Palestyna', from: '13.02.2026', to: '20.02.2026',
pilot: 'Peter', kontrahent: 'Peter sent 13.01', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: 'TBD', pax: 22, paxMax: 30,
umowy: 'wysłana', gratisy: '—', status: 'Zakończona', statusTone: 'success',
prowizja: '2%'
},
/* kwiecień–maj 2026 */
{
section: 'Kwiecień 2026', id: 'MT-2026-IT-01', anulowana: false,
name: 'Rzym, Asyż, Watykan — Parafia Bożego Ciała',
org: 'Parafia Bożego Ciała, Poznań', autor: 'Marek', bok: 'K', bilety: 'E',
dest: 'Włochy', from: '12.04.2026', to: '19.04.2026',
pilot: 'Monika B.', kontrahent: 'Kontrahent IT', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'tak', msza: '—', bilety_nr: '45×GRP-IT-03', pax: 45, paxMax: 45,
umowy: 'wysłana', gratisy: '—', status: 'Gotowy do wyjazdu', statusTone: 'success',
prowizja: '2%'
},
{
section: null, id: 'MT-2026-WL-03', anulowana: false,
name: 'Pielgrzymka jubileuszowa Ziemia Święta',
org: 'ks. Jan Wiśniewski', autor: 'Anna', bok: 'K', bilety: 'E',
dest: 'Izrael / Palestyna', from: '25.04.2026', to: '02.05.2026',
pilot: 'Krzysztof T.', kontrahent: 'Peter', transport: 'samolot LOT', trans_ico: 'fa-plane',
trans_lotnisko: 'tak', msza: '—', bilety_nr: '42×LO4KL2', pax: 42, paxMax: 50,
umowy: 'wysłana', gratisy: '2 miejsca (co 20 os.)', status: 'Potwierdzony', statusTone: 'success',
prowizja: '2%'
},
/* maj 2026 */
{
section: 'Maj 2026', id: 'MT-2026-ES-01', anulowana: false,
name: 'Santiago de Compostela — LO Pijarów',
org: 'Liceum Pijarów Kraków', autor: 'Piotr', bok: 'P', bilety: 'M',
dest: 'Hiszpania', from: '05.05.2026', to: '12.05.2026',
pilot: 'TBD', kontrahent: '—', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: 'opcja (30 miejsc)', pax: 20, paxMax: 30,
umowy: 'w przygotowaniu', gratisy: '—', status: 'W trakcie zbierania', statusTone: 'info',
prowizja: '—'
},
{
section: null, id: 'MT-2026-PT-02', anulowana: false,
name: 'Fatima i Lizbona — pielgrzymka maryjna',
org: 'ks. Marek Kowalski', autor: 'Anna', bok: 'K', bilety: 'E',
dest: 'Portugalia', from: '18.05.2026', to: '25.05.2026',
pilot: 'TBD', kontrahent: '—', transport: 'samolot', trans_ico: 'fa-plane',
trans_lotnisko: 'nie', msza: '—', bilety_nr: '—', pax: 18, paxMax: 35,
umowy: 'w przygotowaniu', gratisy: '—', status: 'W trakcie zbierania', statusTone: 'info',
prowizja: '—'
},
];

/* ===== TERMINARZ TABLE ===== */
var lastSection = null;
var terminarzRows = groups.map(function(g) {
var sectionRow = '';
if (g.section && g.section !== lastSection) {
lastSection = g.section;
sectionRow = '<tr><td colspan="13" class="terminarz-section"><i class="fa-solid fa-calendar-days" style="margin-right:0.4rem"></i>' + escapeHtml(g.section) + '</td></tr>';
}
var pct = g.paxMax ? Math.round(g.pax / g.paxMax * 100) : 0;
var paxCol = pct >= 100 ? 'var(--success-color)' : pct >= 70 ? 'var(--primary-color)' : pct >= 40 ? 'var(--warning-color)' : 'var(--danger-color)';
var rowCls = g.anulowana ? ' class="terminarz-anulowana"' : '';
var bikona = '<i class="fa-solid ' + g.trans_ico + '" style="color:var(--text-muted);margin-right:0.3rem"></i>';
var dataRow = '<tr' + rowCls + '>' +
'<td><code style="font-size:0.7rem">' + escapeHtml(g.id) + '</code></td>' +
'<td><strong style="font-size:0.82rem">' + escapeHtml(g.org) + '</strong>' +
(g.anulowana ? '<br><small style="color:var(--danger-color)"><i class="fa-solid fa-ban"></i> anulowana ' + escapeHtml(g.notes || '') + '</small>' : '') +
'</td>' +
'<td style="text-align:center"><span style="font-size:0.75rem;background:#e0e7ff;color:#4338ca;padding:0.1rem 0.4rem;border-radius:4px;font-weight:700">' + escapeHtml(g.autor) + '</span></td>' +
'<td style="text-align:center">' +
'<span style="font-size:0.72rem;background:#dcfce7;color:#166534;padding:0.1rem 0.35rem;border-radius:3px;font-weight:700">' + escapeHtml(g.bok) + '</span>' +
' <span style="font-size:0.72rem;background:#fef3c7;color:#92400e;padding:0.1rem 0.35rem;border-radius:3px;font-weight:700">' + escapeHtml(g.bilety) + '</span>' +
'</td>' +
'<td><strong style="font-size:0.82rem">' + escapeHtml(g.dest) + '</strong><br><small style="white-space:nowrap">' + escapeHtml(g.from) + ' – ' + escapeHtml(g.to) + '</small></td>' +
'<td><small>' + escapeHtml(g.pilot) + '</small></td>' +
'<td><small>' + bikona + escapeHtml(g.transport) + '</small></td>' +
'<td>' +
'<div class="pax-cell"><span style="font-weight:700;color:' + paxCol + ';font-size:0.9rem">' + g.pax + '/' + g.paxMax + '</span>' +
'<div class="mini-progress" style="margin-top:3px"><div class="mini-progress-fill" style="width:' + pct + '%;background:' + paxCol + '"></div></div></div>' +
'</td>' +
'<td><small style="font-family:monospace;font-size:0.72rem">' + escapeHtml(g.bilety_nr) + '</small></td>' +
'<td><small>' + (g.msza !== '—' ? '<span style="color:var(--primary-color)"><i class="fa-solid fa-church"></i> ' + escapeHtml(g.msza) + '</span>' : '<span style="color:var(--text-muted)">—</span>') + '</small></td>' +
'<td><span style="font-size:0.78rem;' + (g.umowy === 'wysłana' || g.umowy === 'wysłana 17.10.2025' || g.umowy === 'wysłana 28.02.2025' ? 'color:var(--success-color);font-weight:600' : g.umowy === 'w przygotowaniu' ? 'color:var(--warning-color)' : 'color:var(--text-muted)') + '">' + escapeHtml(g.umowy) + '</span></td>' +
'<td>' + statusBadge(g.status, g.statusTone) + '</td>' +
'<td><div style="display:flex;gap:0.25rem">' +
button({ label: 'Karta', variant: 'outline', attrs: { 'data-action': 'karta_grupy' } }) +
button({ label: '', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost', attrs: { title: 'Historia zmian' } }) +
'</div></td>' +
'</tr>';
return sectionRow + dataRow;
}).join('');

/* ===== HOTELS — Egipt Żebrowska ===== */
var hotels = [
{ nights: '3 noce', dates: '24–27.01', miejsce: 'Kair', hotel: 'Azal Pyramids Hotel', adres: 'Al Haram Giza, 12511 Cairo', typ: 'HB', usd: '$7 000', status: 'Wpłacono', statusTone: 'success', note: 'Dep. 1: $2 000 (25.09.25) · Dep. 2: $5 000 (12.11.25)' },
{ nights: '1 noc', dates: '27–28.01', miejsce: 'pociąg nocny', hotel: 'Wagon sypialny — trasa Kair–Luksur', adres: '—', typ: '—', usd: '$5 000', status: 'Wpłacono', statusTone: 'success', note: 'Koszty przelewu +40 USD' },
{ nights: '2 noce', dates: '28–30.01', miejsce: 'Hurghada', hotel: 'Bella Vista Hurghada Hotel', adres: 'Sheraton Rd, Hurghada, Red Sea', typ: 'HB', usd: '$15 120', status: 'Wpłacono', statusTone: 'success', note: 'Dopłata — przelew 21.01.2026' },
{ nights: '1 noc', dates: '30–31.01', miejsce: 'Kair', hotel: 'Azal Pyramids + wstępy', adres: 'Al Haram, Giza', typ: 'HB', usd: '$9 000', status: 'Cash na miejscu', statusTone: 'warning', note: 'Cash: 2 firmy ($3 000 × 2) + Didanos rejs $3 000' },
];

var hotelRows = hotels.map(function(h) {
return '<tr>' +
'<td style="text-align:center;font-weight:700;font-size:0.8rem">' + escapeHtml(h.dates) + '</td>' +
'<td><span style="font-size:0.75rem;background:#e0e7ff;color:#3730a3;padding:0.1rem 0.4rem;border-radius:4px;font-weight:600">' + escapeHtml(h.nights) + '</span></td>' +
'<td><strong>' + escapeHtml(h.miejsce) + '</strong></td>' +
'<td>' +
'<strong style="font-size:0.82rem">' + escapeHtml(h.hotel) + '</strong>' +
(h.adres !== '—' ? '<br><small style="color:var(--text-muted)">' + escapeHtml(h.adres) + '</small>' : '') +
'</td>' +
'<td style="text-align:center"><span class="type-pill">' + escapeHtml(h.typ) + '</span></td>' +
'<td style="font-weight:700;color:var(--text-main)">' + escapeHtml(h.usd) + '</td>' +
'<td>' + statusBadge(h.status, h.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(h.note) + '</small></td>' +
'</tr>';
}).join('');

/* ===== DODATKOWE REZERWACJE ===== */
var dodRez = [
{ ico: 'fa-ship', typ: 'Rejs Nilu (Didanos)', opis: 'Hurghada — rejs wieczorny', termin: '29.01.2026', kwota: '$3 000', waluta: 'USD', status: 'cash na miejscu', statusTone: 'warning', kto: 'Alicja Aziz' },
{ ico: 'fa-monument', typ: 'Wstępy do piramid', opis: 'Kair — 2 firmy lokalne (piramidy Gizy + Sfinks)', termin: '31.01.2026', kwota: '$6 000', waluta: 'USD', status: 'cash na miejscu', statusTone: 'warning', kto: 'Alicja Aziz' },
{ ico: 'fa-bus', typ: 'Autokar lokalny', opis: 'Transport na miejscu — Regency (cały wyjazd)', termin: 'przez cały wyjazd', kwota: 'w cenie hotelu', waluta: '—', status: 'uwzględnione', statusTone: 'success', kto: 'Iza Strzelak' },
{ ico: 'fa-church', typ: 'Msza na lotnisku WAW', opis: 'Lotnisko Chopina — sala odpraw — g. 14:00', termin: '24.01.2026', kwota: 'bezpłatna', waluta: '—', status: 'potwierdzona', statusTone: 'success', kto: 'BOK' },
{ ico: 'fa-radio', typ: 'Radyjka — wysyłka', opis: 'OrlenPaczka: Cichej Łąki 5, Piaseczno', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane 13.02', statusTone: 'success', kto: 'BOK' },
{ ico: 'fa-briefcase', typ: 'Teczki pilota — wysyłka', opis: 'InPost: 603901479635210133492690', termin: '19.01.2026', kwota: '—', waluta: '—', status: 'odesłane InPost', statusTone: 'success', kto: 'BOK' },
];
var dodRezRows = dodRez.map(function(r) {
return '<tr>' +
'<td><div style="display:flex;align-items:center;gap:0.5rem">' +
'<div style="width:30px;height:30px;background:var(--primary-light);color:var(--primary-color);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid ' + r.ico + '" style="font-size:0.75rem"></i></div>' +
'<strong style="font-size:0.82rem">' + escapeHtml(r.typ) + '</strong>' +
'</div></td>' +
'<td><small>' + escapeHtml(r.opis) + '</small></td>' +
'<td><small>' + escapeHtml(r.termin) + '</small></td>' +
'<td><strong>' + escapeHtml(r.kwota) + '</strong> <small style="color:var(--text-muted)">' + escapeHtml(r.waluta) + '</small></td>' +
'<td>' + statusBadge(r.status, r.statusTone) + '</td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(r.kto) + '</small></td>' +
'</tr>';
}).join('');

/* ===== HISTORIA ZMIAN ===== */
var historia = [
{ date: '24.01.2026', type: 'info', icon: 'fa-plane-departure', text: 'Wyjazd grupy — Egipt Żebrowska/Lipka. Skład: 44 os. + pilot Alicja Aziz.' },
{ date: '23.01.2026', type: 'payment', icon: 'fa-receipt', text: 'Faktura za zmianę nazwisk LOT opłacona: f.0566/01/26 minus f.k.0080/01/26 = <strong>5 558,40 zł</strong> paid.' },
{ date: '22.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Michał Kosiorek</strong> → wchodzi <strong>Sławomir Zaręba</strong>. Zmiana nazwiska na bilecie (dopłata za zmianę).' },
{ date: '21.01.2026', type: 'payment', icon: 'fa-money-bill-transfer', text: 'Dopłata Hotel Bella Vista Hurghada: <strong>$15 120</strong> — przelew (faktura 0238/01/26/F/BSP 84 406 zł — LOT f.końcowa paid).' },
{ date: '21.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Stefan i Teresa Jaworscy</strong> (2 os.) → wchodzą <strong>Aldona Skrońska</strong> i <strong>Mariusz Kozioł</strong>. Zmiana nazwisk na bilety.' },
{ date: '13.01.2026', type: 'payment', icon: 'fa-circle-check', text: 'Faktura końcowa LOT opłacona: <strong>84 406 zł</strong> (f. 0238/01/26/F/BSP) — LOT paid.' },
{ date: '05.01.2026', type: 'change', icon: 'fa-user-group', text: 'Rezygnacja: <strong>Alicja Myśliwiec</strong> → wchodzi <strong>Barbara Grzesiak</strong>. Rezygnacja: <strong>Zuzanna Krazy</strong> → wchodzi <strong>Violetta Zdanowska</strong>.' },
{ date: '12.11.2025', type: 'payment', icon: 'fa-receipt', text: 'II depozyt hotelowy (Azal Pyramids): <strong>$5 000</strong> paid (koszty przelewu 40 USD). II depozyt —  pociąg nocny: $5 000.' },
{ date: '25.09.2025', type: 'payment', icon: 'fa-receipt', text: 'I depozyt: <strong>$2 000</strong> → Azal Pyramids Kair.' },
{ date: '29.10.2025', type: 'cancel', icon: 'fa-ban', text: '<strong>Anulacja MT-2026-EG-00</strong> — EGIPT NA SPRZEDAŻ. Powód: nie ma nikogo. Rezerwacja lotu ZVEQA4 anulowana. Podjęta decyzja o nowym terminie.' },
];
var historiaHtml = historia.map(function(e) {
var dotColors = { info: '#3b82f6', payment: '#10b981', change: '#f59e0b', cancel: '#ef4444', add: '#8b5cf6' };
var bgColors = { info: '#eff6ff', payment: '#f0fdf4', change: '#fff7ed', cancel: '#fef2f2', add: '#f5f3ff' };
var col = dotColors[e.type] || '#6b7280';
var bg = bgColors[e.type] || '#f8fafc';
return '<div style="display:flex;gap:0.75rem;align-items:flex-start;padding:0.6rem 0.75rem;border-radius:8px;margin-bottom:0.4rem;background:' + bg + '">' +
'<div style="width:30px;height:30px;border-radius:50%;background:' + col + '1a;color:' + col + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
'<i class="fa-solid ' + e.icon + '" style="font-size:0.75rem"></i>' +
'</div>' +
'<div>' +
'<div style="font-size:0.72rem;color:var(--text-muted);font-weight:600;margin-bottom:0.15rem">' + escapeHtml(e.date) + '</div>' +
'<div style="font-size:0.82rem;line-height:1.45">' + e.text + '</div>' +
'</div>' +
'</div>';
}).join('');

/* ===== DOCUMENTS CHECKLIST ===== */
var docs = [
{ name: 'Strona tytułowa', done: true }, { name: 'Program wyjazdu', done: true },
{ name: 'Kosztorys', done: true }, { name: 'Rozpiska dla pilota', done: true },
{ name: 'Lista uczestników', done: true }, { name: 'Rooming list', done: true },
{ name: 'Lista wpłat', done: true }, { name: 'Authority Letter', done: true },
{ name: 'Certyfikat Uniqa', done: true }, { name: 'Ubezpieczenie grupy', done: true },
{ name: 'Bilety lotnicze', done: true }, { name: 'Wjazdówki', done: true },
{ name: 'Msze Święte', done: true }, { name: 'Przewodnicy lokalni', done: true },
{ name: 'Vouchery hotelowe', done: true }, { name: 'Koperty uczestników', done: true },
{ name: 'Lista wsiadania', done: true }, { name: 'Plakat / grafika MS', done: true },
];
var docGrid = docs.map(function(d) {
return '<div class="doc-item ' + (d.done ? 'done' : 'pending') + '">' +
'<i class="fa-solid ' + (d.done ? 'fa-circle-check' : 'fa-circle-xmark') + '"></i>' +
'<span>' + escapeHtml(d.name) + '</span>' +
'</div>';
}).join('');

/* ===== TRIP SEQUENCE (hotel timeline) for Żebrowska ===== */
var hotelSeq = [
{ ikona: 'fa-plane-arrival', kolor: '#3b82f6', dates: '24.01', label: 'Przylot Kair — lotnisko CAI' },
{ ikona: 'fa-hotel', kolor: '#7c3aed', dates: '24–27.01', label: 'Kair — Azal Pyramids Hotel (3 noce, HB)' },
{ ikona: 'fa-train', kolor: '#f59e0b', dates: '27/28.01', label: 'Pociąg nocny — Kair → Luksur (1 noc)' },
{ ikona: 'fa-monument', kolor: '#f59e0b', dates: '28.01', label: 'Zwiedzanie Luksur' },
{ ikona: 'fa-hotel', kolor: '#10b981', dates: '28–30.01', label: 'Hurghada — Bella Vista Hotel (2 noce, HB)' },
{ ikona: 'fa-ship', kolor: '#10b981', dates: '29.01', label: 'Rejs Nilu — Didanos (wieczorny)' },
{ ikona: 'fa-hotel', kolor: '#7c3aed', dates: '30/31.01', label: 'Kair — Azal Pyramids (1 noc) + wstępy do piramid' },
{ ikona: 'fa-plane-departure', kolor: '#3b82f6', dates: '31.01', label: 'Wylot Kair CAI → WAW' },
];
var seqHtml = hotelSeq.map(function(s, i) {
return '<div class="trip-timeline-row">' +
'<div style="display:flex;flex-direction:column;align-items:center;gap:0">' +
'<div style="width:32px;height:32px;border-radius:50%;background:' + s.kolor + '18;color:' + s.kolor + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
'<i class="fa-solid ' + s.ikona + '" style="font-size:0.8rem"></i>' +
'</div>' +
(i < hotelSeq.length - 1 ? '<div style="width:2px;height:18px;background:var(--border-color);margin:2px 0"></div>' : '') +
'</div>' +
'<div style="flex:1;padding-bottom:' + (i < hotelSeq.length - 1 ? '0' : '0') + '">' +
'<span style="font-size:0.72rem;font-weight:700;color:var(--text-muted);margin-right:0.5rem">' + escapeHtml(s.dates) + '</span>' +
'<span style="font-size:0.82rem">' + escapeHtml(s.label) + '</span>' +
'</div>' +
'</div>';
}).join('');

/* ===== KARTA GRUPY — Egipt Żebrowska ===== */
var kartaGrupy = '<div class="group-card-detail">' +
'<div class="group-card-hero">' +
'<div class="group-card-hero-top">' +
'<div>' +
'<div class="group-card-code">MT-2026-EG-01 · Pielgrzymka · Egipt</div>' +
'<h2 class="group-card-title">Egipt — Piramidy, Pociąg Nocny, Hurghada</h2>' +
'<div class="group-card-meta">' +
'<span><i class="fa-solid fa-user-tie"></i> Izabela Żebrowska / ks. Wojciech Lipka</span>' +
'<span><i class="fa-solid fa-calendar"></i> 24–31 stycznia 2026 (7 nocy)</span>' +
'<span><i class="fa-solid fa-location-dot"></i> Egipt — Kair, Luksur, Hurghada</span>' +
'<span><i class="fa-solid fa-user"></i> BOK: Kamila (K) · Bilety: Edyta (E)</span>' +
'</div>' +
'</div>' +
'<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
statusBadge('Zakończona', 'success') +
button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' }) +
'</div>' +
'</div>' +
'<div class="group-card-tabs">' +
'<button class="group-tab active" data-tab="przeglad">Przegląd</button>' +
'<button class="group-tab" data-tab="hotele">Hotele</button>' +
'<button class="group-tab" data-tab="bilety">Bilety lotnicze</button>' +
'<button class="group-tab" data-tab="transport">Transport</button>' +
'<button class="group-tab" data-tab="pasazerowie">Pasażerowie <span class="tab-badge">44</span></button>' +
'<button class="group-tab" data-tab="dod-rezerwacje">Dod. rezerwacje <span class="tab-badge">6</span></button>' +
'<button class="group-tab" data-tab="dokumenty">Dokumenty</button>' +
'<button class="group-tab" data-tab="historia">Historia zmian <span class="tab-badge">10</span></button>' +
'</div>' +
'</div>' +
'<div class="group-card-body">' +
'<div class="group-tab-panel active" data-panel="przeglad">' +
'<div class="group-overview-grid">' +
'<div class="group-info-col">' +
panel({ title: 'Informacje ogólne', body:
'<div class="info-table">' +
'<div class="info-row"><span>Organizatorzy</span><strong>Izabela Żebrowska + ks. Wojciech Lipka</strong></div>' +
'<div class="info-row"><span>Pilot</span><strong>Alicja Aziz</strong></div>' +
'<div class="info-row"><span>Kontrahent (in-dest.)</span><strong>Iza Strzelak (SENT)</strong></div>' +
'<div class="info-row"><span>Kierunek</span><strong>Egipt — Kair · Luksur · Hurghada</strong></div>' +
'<div class="info-row"><span>Termin</span><strong>24–31 stycznia 2026 (7 nocy, 8 dni)</strong></div>' +
'<div class="info-row"><span>Transport główny</span><strong>Samolot LOT (WAW)</strong></div>' +
'<div class="info-row"><span>Autokar na miejscu</span><strong>Regency — całodobowo</strong></div>' +
'<div class="info-row"><span>Msza na lotnisku</span><strong>WAW — 24.01.2026 g. 14:00</strong></div>' +
'<div class="info-row"><span>Transport na lotnisko</span><strong style="color:var(--text-muted)">NIE</strong></div>' +
'<div class="info-row"><span>Autor oferty</span><strong>Ania</strong></div>' +
'<div class="info-row"><span>Gratisy</span><strong>80 USD/os. (karta)</strong></div>' +
'<div class="info-row"><span>Prowizja biuro</span><strong>2%</strong></div>' +
'</div>'
}) +
panel({ title: 'Bilety lotnicze — szczegóły', body:
'<div class="info-table">' +
'<div class="info-row"><span>Bilety grupowe (44 os.)</span><strong style="font-family:monospace">W6Y73A</strong></div>' +
'<div class="info-row"><span>Bilet indywidualny (1 os.)</span><strong style="font-family:monospace">TD236Z</strong></div>' +
'<div class="info-row"><span>Faktura końcowa LOT</span><strong>84 406 zł — f. 0238/01/26/F/BSP</strong></div>' +
'<div class="info-row"><span>Opłacono</span><strong>13.01.2026</strong></div>' +
'<div class="info-row"><span>Faktury za zmiany nazwisk</span><strong>f. 0566 → po odjęciu f.k. 0080 = 5 558,40 zł</strong></div>' +
'<div class="info-row"><span>Zmiana nazwisk paid</span><strong>23.01.2026</strong></div>' +
'</div>' +
'<div style="display:flex;gap:0.5rem;margin-top:0.75rem">' +
button({ label: 'Exportuj bilety PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
button({ label: 'Dodaj korektę', icon: 'fa-solid fa-plus', variant: 'ghost' }) +
'</div>'
}) +
'</div>' +
'<div class="group-status-col">' +
'<div class="group-status-cards">' +
'<div class="group-stat-big">' +
'<span>Uczestnicy (finalne)</span>' +
'<strong>44 / 45</strong>' +
'<div class="big-progress"><div style="width:98%;height:100%;border-radius:5px;background:var(--primary-color)"></div></div>' +
'<small>1 miejsce na gratisa · 3 zmiany uczestników w trakcie</small>' +
'</div>' +
'<div class="group-stat-big accent-green">' +
'<span>Płatności LOT (f. końcowa)</span>' +
'<strong>84 406 zł</strong>' +
'<div class="big-progress"><div style="width:100%;height:100%;border-radius:5px;background:var(--success-color)"></div></div>' +
'<small>Wszystkie faktury opłacone ✓</small>' +
'</div>' +
'<div class="group-stat-big accent-green">' +
'<span>Płatności hotelowe</span>' +
'<strong>$31 120 USD</strong>' +
'<div class="big-progress"><div style="width:100%;height:100%;border-radius:5px;background:var(--success-color)"></div></div>' +
'<small>Dep. + dopłaty + cash na miejscu ✓</small>' +
'</div>' +
'</div>' +
panel({ title: 'Umowy i dokumentacja', body:
'<div class="info-table">' +
'<div class="info-row"><span>Umowy — wysłano</span><strong style="color:var(--success-color)"><i class="fa-solid fa-check"></i> Wysłane</strong></div>' +
'<div class="info-row"><span>Mailingi do p. Leszka</span><strong>12.01.2026</strong></div>' +
'<div class="info-row"><span>Wysyłka radyjek (OrlenPaczka)</span><strong>19.01.2026 · 2102007626042</strong></div>' +
'<div class="info-row"><span>Zwrot radyjek</span><strong style="color:var(--success-color)">InPost odebrany 13.02.2026</strong></div>' +
'<div class="info-row"><span>Wysyłka teczek (InPost)</span><strong>19.01.2026 · 603901...90</strong></div>' +
'<div class="info-row"><span>Zwrot teczek</span><strong style="color:var(--success-color)">InPost odebrany 16.02.2026</strong></div>' +
'</div>'
}) +
'</div>' +  /* end group-status-col */
'</div>' +  /* end group-overview-grid */
'</div>' +  /* end przegląd tab panel */

/* ==== HOTELE tab ==== */
'<div class="group-tab-panel" data-panel="hotele">' +
panel({
  title: 'Hotele i noclegi — Egipt Żebrowska / Lipka · 24–31.01.2026',
  action: '<div style="display:flex;gap:0.5rem">' +
    button({ label: 'Dodaj nocleg', icon: 'fa-solid fa-plus', variant: 'outline' }) +
    button({ label: 'Historia rezerwacji', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost' }) +
    '</div>',
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Daty</th><th>Noce</th><th>Miejscowość</th><th>Hotel / Sposób noclegu</th><th>Typ</th><th>Kwota (USD)</th><th>Status</th><th>Uwagi</th></tr></thead>' +
    '<tbody>' + hotelRows + '</tbody>' +
    '<tfoot><tr><td colspan="4" style="font-weight:700;text-align:right;padding-top:0.75rem">Suma (przelewem + cash)</td><td></td><td style="font-weight:700;color:var(--primary-color)">$36 120 USD</td><td colspan="2"></td></tr></tfoot>' +
    '</table></div>'
}) +
panel({
  title: 'Sekwencja podróży — wizualizacja',
  body: '<div class="trip-timeline" style="padding:0.25rem 0">' + seqHtml + '</div>'
}) +
'</div>' +

/* ==== BILETY tab ==== */
'<div class="group-tab-panel" data-panel="bilety">' +
panel({ title: 'Bilety lotnicze — MT-2026-EG-01', body:
  '<div class="info-table">' +
  '<div class="info-row"><span>Bilety grupowe (44 os.)</span><strong style="font-family:monospace;font-size:1rem">W6Y73A</strong></div>' +
  '<div class="info-row"><span>Bilet indywidualny (1 os.)</span><strong style="font-family:monospace;font-size:1rem">TD236Z</strong></div>' +
  '<div class="info-row"><span>Liczba biletów</span><strong>45 miejsc (44 grup. + 1 ind.)</strong></div>' +
  '<div class="info-row"><span>Przewoźnik</span><strong>LOT — Polskie Linie Lotnicze</strong></div>' +
  '<div class="info-row"><span>Faktura końcowa LOT</span><strong>84 406 zł — f. 0238/01/26/F/BSP</strong></div>' +
  '<div class="info-row"><span>Opłacono</span><strong style="color:var(--success-color)">13.01.2026 ✓</strong></div>' +
  '<div class="info-row"><span>Faktura za zmianę nazwisk</span><strong>f. 0566/01/26/F/BSP = 6 384,12 zł</strong></div>' +
  '<div class="info-row"><span>Korekta (f.k. 0080/01/26)</span><strong>–5 558,40 zł paid 23.01.2026</strong></div>' +
  '<div class="info-row"><span>Potwierdzenie grupy</span><strong>430 zł/gr — f. 250400486 (14.04.2025)</strong></div>' +
  '</div>' +
  '<div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">' +
  button({ label: 'Exportuj bilety PDF', icon: 'fa-solid fa-file-pdf', variant: 'outline' }) +
  button({ label: 'Dodaj korektę', icon: 'fa-solid fa-plus', variant: 'ghost' }) +
  button({ label: 'Historia zmian biletów', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost' }) +
  '</div>'
}) +
'</div>' +

/* ==== TRANSPORT tab ==== */
'<div class="group-tab-panel" data-panel="transport">' +
panel({ title: 'Transport — szczegóły Egipt 24–31.01.2026', body:
  '<div class="info-table">' +
  '<div class="info-row"><span>Transport główny</span><strong>Samolot LOT — lot czarterowy</strong></div>' +
  '<div class="info-row"><span>Lotnisko wylotu</span><strong>Warszawa WAW — Terminal 2</strong></div>' +
  '<div class="info-row"><span>Msza na lotnisku</span><strong style="color:var(--primary-color)"><i class="fa-solid fa-church"></i> 24.01.2026 g. 14:00 — WAW</strong></div>' +
  '<div class="info-row"><span>Transport na lotnisko</span><strong style="color:var(--text-muted)">NIE — uczestnicy we własnym zakresie</strong></div>' +
  '<div class="info-row"><span>Autokar na miejscu</span><strong>Regency — całodobowo przez cały wyjazd</strong></div>' +
  '<div class="info-row"><span>Kontrahent na miejscu</span><strong>Iza Strzelak (SENT — rooming list 8.01)</strong></div>' +
  '<div class="info-row"><span>Pociąg nocny</span><strong>Kair → Luksur — 27/28.01 (wagony sypialne, $5 000)</strong></div>' +
  '</div>'
}) +
'</div>' +

/* ==== PASAŻEROWIE tab ==== */
'<div class="group-tab-panel" data-panel="pasazerowie">' +
panel({ title: 'Pasażerowie — 44 / 45 (Egipt Żebrowska / Lipka)', action:
  '<div style="display:flex;gap:0.5rem">' +
  button({ label: 'Import z Excela', icon: 'fa-solid fa-file-excel', variant: 'outline' }) +
  button({ label: 'Eksport listy', icon: 'fa-solid fa-download', variant: 'ghost' }) +
  '</div>',
  body:
  '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0.6rem">' +
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(function(i) {
    var names = ['Alicja Aziz (pilot)','Izabela Żebrowska','ks. Wojciech Lipka','Barbara Grzesiak','Violetta Zdanowska','Aldona Skrońska','Mariusz Kozioł','Sławomir Zaręba','Renata Kowalczyk','Piotr Nowak','Maria Jankowska','Anna Wiśniewska','Tomasz Zieliński','Krystyna Malinowska','Zbigniew Dąbrowski','Helena Pawlak'];
    return '<div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;background:var(--bg-main);border-radius:7px;border:1px solid var(--border-color)">' +
      '<div style="width:28px;height:28px;background:var(--primary-light);color:var(--primary-color);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.72rem;flex-shrink:0">' + i + '</div>' +
      '<span style="font-size:0.82rem">' + names[i-1] + '</span>' +
      '</div>';
  }).join('') +
  '<div style="display:flex;align-items:center;justify-content:center;padding:0.5rem;background:var(--bg-main);border-radius:7px;border:1px dashed var(--border-color);color:var(--text-muted);font-size:0.78rem;grid-column:span 2">+ 28 kolejnych uczestników</div>' +
  '</div>'
}) +
'</div>' +

/* ==== DODATKOWE REZERWACJE tab ==== */
'<div class="group-tab-panel" data-panel="dod-rezerwacje">' +
panel({
  title: 'Dodatkowe rezerwacje (poza hotelami)',
  action: button({ label: 'Dodaj rezerwację', icon: 'fa-solid fa-plus', variant: 'outline' }),
  body: '<div class="table-container"><table class="data-table">' +
    '<thead><tr><th>Typ</th><th>Opis</th><th>Termin</th><th>Kwota</th><th>Status</th><th>Odpowiada</th></tr></thead>' +
    '<tbody>' + dodRezRows + '</tbody>' +
    '</table></div>'
}) +
'</div>' +

/* ==== DOKUMENTY tab ==== */
'<div class="group-tab-panel" data-panel="dokumenty">' +
panel({
  title: 'Dokumenty — lista kontrolna',
  action: '<span style="font-size:0.8rem;color:var(--success-color);font-weight:600"><i class="fa-solid fa-circle-check"></i> 18 / 18 — wszystkie gotowe</span>',
  body: '<div class="doc-checklist">' + docGrid + '</div>'
}) +
'</div>' +

/* ==== HISTORIA ZMIAN tab ==== */
'<div class="group-tab-panel" data-panel="historia">' +
panel({
  title: 'Historia zmian — MT-2026-EG-01 Żebrowska',
  action: button({ label: 'Eksport logu', icon: 'fa-solid fa-download', variant: 'ghost' }),
  body: historiaHtml
}) +
'</div>' +

'</div>' +   /* end group-card-body */
'</div>';    /* end group-card-detail */

/* ===== RENDER ===== */
return [
dashboardHeader({
title: 'Grupy i Imprezy',
subtitle: 'Terminarz wyjazdów 2026 — od rezerwacji do rozliczenia. Karta grupy, historia zmian, dokumentacja.',
actions: [
button({ label: 'Widok kalendarza', icon: 'fa-solid fa-calendar-week', variant: 'outline' }),
button({ label: 'Eksport Excel', icon: 'fa-solid fa-file-excel', variant: 'outline' }),
button({ label: 'Nowa impreza', icon: 'fa-solid fa-plus' })
]
}),
'<div class="stats-grid">' +
statCard({ title: 'Imprezy 2026', value: '24', icon: 'fa-solid fa-globe', iconTone: 'blue' }) +
statCard({ title: 'Uczestnicy zebranych', value: '1 024', icon: 'fa-solid fa-people-group', iconTone: 'green', trend: '+18% r/r', trendTone: 'positive' }) +
statCard({ title: 'W trakcie zbierania', value: '3', icon: 'fa-solid fa-users-line', iconTone: 'orange' }) +
statCard({ title: 'Gotowych do wyjazdu', value: '2', icon: 'fa-solid fa-plane-departure', iconTone: 'purple' }) +
'</div>',

panel({
title: 'Terminarz grup 2026',
action: '<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
'<select class="inline-select"><option>Wszystkie statusy</option><option>Zakończona</option><option>Potwierdzony</option><option>W trakcie zbierania</option><option>Anulowana</option></select>' +
'<select class="inline-select"><option>Wszystkie kierunki</option><option>Egipt</option><option>Kenia</option><option>Izrael / Palestyna</option><option>Włochy</option><option>Portugalia</option><option>Hiszpania</option></select>' +
'<select class="inline-select"><option>Wszyscy autorzy</option><option>Ania</option><option>Natalia</option><option>Zuzia</option><option>Marek</option></select>' +
button({ label: 'Eksport PDF', icon: 'fa-solid fa-download', variant: 'ghost' }) +
'</div>',
body: '<div class="table-container" style="overflow-x:auto"><table class="data-table terminarz-table">' +
'<thead><tr>' +
'<th>Kod</th>' +
'<th style="min-width:180px">Organizator</th>' +
'<th>Autor</th>' +
'<th title="BOK / Bilety">BOK/B</th>' +
'<th>Kierunek / Termin</th>' +
'<th>Pilot</th>' +
'<th>Transport</th>' +
'<th>PAX</th>' +
'<th>Nr biletów</th>' +
'<th>Msza lotn.</th>' +
'<th>Umowy</th>' +
'<th>Status</th>' +
'<th></th>' +
'</tr></thead>' +
'<tbody>' + terminarzRows + '</tbody>' +
'</table></div>'
}),

kartaGrupy

].join('');
}

window.GrupyView = { renderGrupy };
})();
