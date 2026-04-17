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
var bokOk = !g.anulowana && (g.status === 'Zako\u0144czona' || g.id === 'MT-2026-IT-01' || g.id === 'MT-2026-WL-03');
var bilOk = !g.anulowana && (g.status === 'Zako\u0144czona' || g.id === 'MT-2026-IT-01');
var mktOk = !g.anulowana && (g.status === 'Zako\u0144czona');
var _p = function(l, ok) { return '<span style="font-size:0.62rem;padding:0.08rem 0.3rem;border-radius:3px;font-weight:700;white-space:nowrap;background:' + (ok ? '#dcfce7' : '#fef3c7') + ';color:' + (ok ? '#166534' : '#92400e') + '">' + l + (ok ? ' \u2713' : ' \u23f3') + '</span>'; };
var deptPills = g.anulowana ? '' :
  '<div style="display:flex;gap:0.2rem;flex-wrap:wrap;margin-top:0.3rem">' + _p('BOK', bokOk) + _p('Bil.', bilOk) + _p('Mkt', mktOk) + '</div>';
var dataRow = '<tr' + rowCls + ' onclick="window.AppNavigation.setActivePage(\'szczegoly_grupy\')" style="cursor:pointer">' +
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
'<td>' +
'<div style="display:flex;gap:0.25rem">' +
button({ label: 'Karta', variant: 'outline', attrs: { 'data-action': 'karta_grupy' } }) +
button({ label: '', icon: 'fa-solid fa-clock-rotate-left', variant: 'ghost', attrs: { title: 'Historia zmian' } }) +
'</div>' +
deptPills +
'</td>' +
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

/* ===== CALENDAR VIEW ===== */
function parseGrpDate(s) {
    var p = s.split('.');
    return new Date(parseInt(p[2]), parseInt(p[1]) - 1, parseInt(p[0]));
}
var calDestColors = {
    'Egipt':                  '#f59e0b',
    'Kenia':                  '#16a34a',
    'Izrael / Palestyna':     '#0ea5e9',
    'Włochy':                 '#ec4899',
    'Portugalia':             '#a855f7',
    'Portugalia / Hiszpania': '#a855f7',
    'Hiszpania':              '#f97316',
};
var calYear = 2026, calMonth = 4;
var calAllEvents = groups.map(function(g) {
    return { g: g, from: parseGrpDate(g.from), to: parseGrpDate(g.to), color: calDestColors[g.dest] || '#64748b' };
});

function renderCalendarMonth(yr, mo) {
    var monthNames = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
    var CELL_TOP = 32, BAR_H = 24, BAR_GAP = 3, BTM_PAD = 8;
    var daysInMonth = new Date(yr, mo, 0).getDate();
    var firstDow = (new Date(yr, mo - 1, 1).getDay() + 6) % 7;
    var todayMs = new Date(2026, 3, 13).getTime();
    var mStart = new Date(yr, mo - 1, 1), mEnd = new Date(yr, mo - 1, daysInMonth);

    var eventsThisMonth = calAllEvents.filter(function(e) { return e.from <= mEnd && e.to >= mStart; });

    var weeks = [], wk = [];
    for (var i = 0; i < firstDow; i++) wk.push(null);
    for (var d = 1; d <= daysInMonth; d++) {
        wk.push(new Date(yr, mo - 1, d));
        if (wk.length === 7) { weeks.push(wk); wk = []; }
    }
    if (wk.length > 0) { while (wk.length < 7) wk.push(null); weeks.push(wk); }

    var dayHdrsHtml = ['Pn','Wt','Śr','Cz','Pt','Sb','Nd'].map(function(n, i) {
        return '<div style="text-align:center;padding:6px 0;font-size:0.72rem;font-weight:700;letter-spacing:0.04em;color:'
            + (i >= 5 ? '#94a3b8' : 'var(--text-muted)') + ';border-right:'
            + (i < 6 ? '1px solid var(--border-color)' : 'none') + '">' + n + '</div>';
    }).join('');

    var weeksHtml = weeks.map(function(weekDates) {
        var realDates = weekDates.filter(Boolean);
        if (!realDates.length) return '';
        var wkStart = realDates[0], wkEnd = realDates[realDates.length - 1];
        var wkEventSpans = eventsThisMonth.map(function(ev) {
            var cs = 7, ce = -1;
            for (var c = 0; c < 7; c++) {
                if (weekDates[c] && weekDates[c] >= ev.from && weekDates[c] <= ev.to) {
                    if (c < cs) cs = c;
                    if (c > ce) ce = c;
                }
            }
            return cs <= ce ? { ev: ev, colStart: cs, colEnd: ce } : null;
        }).filter(Boolean);

        wkEventSpans.sort(function(a, b) {
            return a.colStart !== b.colStart ? a.colStart - b.colStart : (b.colEnd - b.colStart) - (a.colEnd - a.colStart);
        });

        var slotOcc = [];
        var placed = wkEventSpans.map(function(es) {
            for (var s = 0; ; s++) {
                if (!slotOcc[s]) slotOcc[s] = [];
                var fits = slotOcc[s].every(function(o) { return es.colEnd < o.colStart || es.colStart > o.colEnd; });
                if (fits) { slotOcc[s].push({ colStart: es.colStart, colEnd: es.colEnd }); return { es: es, slot: s }; }
            }
        });

        var numSlots = placed.reduce(function(m, p) { return Math.max(m, p.slot + 1); }, 0);
        var wkH = CELL_TOP + numSlots * (BAR_H + BAR_GAP) + BTM_PAD;

        var bgCols = weekDates.map(function(date, ci) {
            var isWe = ci >= 5, isToday = date && date.getTime() === todayMs, isEmpty = !date;
            var bg = isEmpty ? 'var(--bg-main)' : isToday ? '#eff6ff' : isWe ? '#f8fafc' : 'var(--card-bg)';
            return '<div style="background:' + bg + ';border-right:' + (ci < 6 ? '1px solid var(--border-color)' : 'none') + ';height:' + wkH + 'px"></div>';
        }).join('');

        var dayNums = weekDates.map(function(date, ci) {
            if (!date) return '<div></div>';
            var d = date.getDate(), isWe = ci >= 5, isToday = date.getTime() === todayMs;
            var numEl = isToday
                ? '<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#3b82f6;color:#fff;font-weight:700;font-size:0.76rem">' + d + '</span>'
                : '<span style="font-size:0.76rem;color:' + (isWe ? '#94a3b8' : 'var(--text-main)') + '">' + d + '</span>';
            return '<div style="padding:5px 7px">' + numEl + '</div>';
        }).join('');

        var bars = placed.map(function(p) {
            var es = p.es, ev = es.ev, g = ev.g;
            var topPx = CELL_TOP + p.slot * (BAR_H + BAR_GAP);
            var lp = (es.colStart / 7 * 100).toFixed(3) + '%';
            var wp = ((es.colEnd - es.colStart + 1) / 7 * 100).toFixed(3) + '%';
            var startsHere = weekDates[es.colStart] && weekDates[es.colStart].getTime() === ev.from.getTime();
            var endsHere   = weekDates[es.colEnd]   && weekDates[es.colEnd].getTime()   === ev.to.getTime();
            var brL = startsHere ? '4px' : '0', brR = endsHere ? '4px' : '0';
            var ico = g.trans_ico || 'fa-plane';
            var barText = escapeHtml(g.dest) + ' \u00b7 ' + escapeHtml(g.from.slice(0,5)) + '\u2013' + escapeHtml(g.to.slice(0,5));
            if (es.colEnd - es.colStart >= 2) barText += ' \u00b7 ' + g.pax + '/' + g.paxMax + ' os.';
            var tip = escapeHtml([g.name, g.org, 'Status: ' + g.status, 'PAX: ' + g.pax + '/' + g.paxMax, 'Pilot: ' + g.pilot, g.transport].join('\n'));
            return '<div title="' + tip + '"'
                + ' onclick="window.AppNavigation && window.AppNavigation.setActivePage(\'szczegoly_grupy\')"'
                + ' style="position:absolute;left:calc(' + lp + ' + 2px);width:calc(' + wp + ' - 4px);'
                + 'top:' + topPx + 'px;height:' + BAR_H + 'px;'
                + 'background:' + ev.color + (g.anulowana ? '77' : '') + ';'
                + 'border-radius:' + brL + ' ' + brR + ' ' + brR + ' ' + brL + ';'
                + 'display:flex;align-items:center;gap:0.3rem;padding:0 0.45rem;cursor:pointer;overflow:hidden;'
                + 'font-size:0.67rem;font-weight:600;color:#fff;white-space:nowrap">'
                + (g.anulowana
                    ? '<i class="fa-solid fa-ban" style="font-size:0.58rem;flex-shrink:0;opacity:0.9"></i>'
                    : '<i class="fa-solid ' + ico + '" style="font-size:0.58rem;flex-shrink:0;opacity:0.85"></i>')
                + '<span style="overflow:hidden;text-overflow:ellipsis">' + barText + '</span>'
                + '</div>';
        }).join('');

        return '<div style="display:grid;grid-template-columns:repeat(7,1fr);position:relative;border-bottom:1px solid var(--border-color)">'
            + bgCols
            + '<div style="position:absolute;top:0;left:0;right:0;display:grid;grid-template-columns:repeat(7,1fr);pointer-events:none">' + dayNums + '</div>'
            + bars
            + '</div>';
    }).join('');

    return '<div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;overflow:hidden">'
        + '<div style="display:flex;align-items:center;justify-content:center;gap:0.1rem;padding:0.75rem 1.25rem;border-bottom:1px solid var(--border-color);background:var(--bg-main)">'
            + '<button onclick="window.GrupyCalNav && window.GrupyCalNav(-1)" class="btn btn-ghost" style="padding:0.25rem 0.55rem;border:none"><i class="fa-solid fa-chevron-left"></i></button>'
            + '<h2 style="margin:0;font-size:0.95rem;font-weight:700;padding:0.25rem 0.6rem;line-height:1.6">' + escapeHtml(monthNames[mo - 1]) + ' ' + yr + '</h2>'
            + '<button onclick="window.GrupyCalNav && window.GrupyCalNav(1)" class="btn btn-ghost" style="padding:0.25rem 0.55rem;border:none"><i class="fa-solid fa-chevron-right"></i></button>'
        + '</div>'
        + '<div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--bg-main);border-bottom:1px solid var(--border-color)">' + dayHdrsHtml + '</div>'
        + weeksHtml
        + '</div>';
}

window.GrupyCalNav = function(dir) {
    calMonth += dir;
    if (calMonth > 12) { calMonth = 1; calYear++; }
    if (calMonth < 1)  { calMonth = 12; calYear--; }
    var container = document.getElementById('grupy-calendar-month-view');
    if (container) container.innerHTML = renderCalendarMonth(calYear, calMonth);
};

// ---- placeholder to join with old section below (will be removed) ----
var calendarHtml = '<div id="grupy-calendar-view" style="display:none">'
    + '<div id="grupy-calendar-month-view">'
    + renderCalendarMonth(calYear, calMonth)
    + '</div>'
    + '</div>';

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

'<div id="grupy-table-view">' + panel({
title: 'Terminarz grup 2026',
action: '<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
'<select class="inline-select"><option>Wszystkie statusy</option><option>Zakończona</option><option>Potwierdzony</option><option>W trakcie zbierania</option><option>Anulowana</option></select>' +
'<select class="inline-select"><option>Wszystkie kierunki</option><option>Egipt</option><option>Kenia</option><option>Izrael / Palestyna</option><option>Włochy</option><option>Portugalia</option><option>Hiszpania</option></select>' +
'<select class="inline-select"><option>Każdy transport</option><option>Samolot</option><option>Autokar</option><option>Pociąg</option><option>Rejs</option></select>' +
'<select class="inline-select"><option>Wszyscy pracownicy</option><option>Ania</option><option>Natalia</option><option>Zuzia</option><option>Marek</option></select>' +
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
}) + '</div>',
calendarHtml,

].join('');
}

window.GrupyView = { renderGrupy };
})();
