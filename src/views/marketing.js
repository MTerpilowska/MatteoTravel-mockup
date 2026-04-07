(function () {
const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

/* ===== LEADY ===== */
function renderLeady() {
const leads = [
{ id: 'LD-0391', source: 'Strona WWW', name: 'ks. Paweł Dąbrowski', parish: 'Parafia św. Stanisława, Nowy Sącz', interest: 'Ziemia Święta 2027', group: '30–35 os.', date: '26.03.2026', stage: 'Nowy', stageTone: 'blue', campaign: '—' },
{ id: 'LD-0390', source: 'Polecenie', name: 'ks. Tomasz Mazur', parish: 'Parafia Wniebowzięcia, Rzeszów', interest: 'Rzym + Asyż 2026', group: '40 os.', date: '24.03.2026', stage: 'Kontakt nawiązany', stageTone: 'purple', campaign: '—' },
{ id: 'LD-0389', source: 'Facebook Ads', name: 'S. Maria Łukasiewicz', parish: 'Zgromadzenie Służeb. NMP, Kraków', interest: 'Fatima + Lourdes 2026', group: '20 os.', date: '21.03.2026', stage: 'Oferta wysłana', stageTone: 'orange', campaign: 'FB — Wielkanoc 2026' },
{ id: 'LD-0385', source: 'Facebook Ads', name: 'ks. Grzegorz Ptak', parish: 'Parafia MBNP, Katowice', interest: 'Santiago de Compostela 2027', group: '25–30 os.', date: '15.03.2026', stage: 'Oferta wysłana', stageTone: 'orange', campaign: 'FB — Wielkanoc 2026' },
{ id: 'LD-0382', source: 'Strona WWW', name: 'Dyrekcja LO Pijarów', parish: 'Liceum Pijarów, Kraków', interest: 'Rzym — wyjazd szkolny', group: '50 os.', date: '12.03.2026', stage: 'Negocjacje', stageTone: 'purple', campaign: '—' },
{ id: 'LD-0379', source: 'Polecenie', name: 'ks. Jan Wróbel', parish: 'Parafia Dobrego Pasterza, Lublin', interest: 'Grecja — Śladami św. Pawła', group: '28 os.', date: '05.03.2026', stage: 'Zamknięty ✓', stageTone: 'success', campaign: '—' },
];

const stageFlow = [
{ label: 'Nowe', count: 4, tone: 'blue' },
{ label: 'Kontakt', count: 8, tone: 'purple' },
{ label: 'Oferta', count: 6, tone: 'orange' },
{ label: 'Negocjacje', count: 3, tone: 'orange' },
{ label: 'Zamknięty', count: 12, tone: 'success' },
];

return [
dashboardHeader({
title: 'Leady sprzedażowe',
subtitle: 'Lejek sprzedaży — od pierwszego kontaktu do podpisania umowy',
actions: [
button({ label: 'Importuj z XLS', icon: 'fa-solid fa-file-excel', variant: 'outline' }),
button({ label: 'Dodaj lead', icon: 'fa-solid fa-plus' })
]
}),
`<div class="stats-grid">
${statCard({ title: 'Leady aktywne', value: '21', icon: 'fa-solid fa-user-plus', iconTone: 'blue' })}
${statCard({ title: 'W tym miesiącu', value: '7', icon: 'fa-solid fa-chart-line', iconTone: 'green', trend: '+40% vs. poprzedni', trendTone: 'positive' })}
${statCard({ title: 'Conversion rate', value: '38%', icon: 'fa-solid fa-percent', iconTone: 'purple' })}
${statCard({ title: 'Est. przychód z leadów', value: '680 000 PLN', icon: 'fa-solid fa-sack-dollar', iconTone: 'orange' })}
</div>`,
panel({ title: 'Lejek leadów', body: `
<div class="pipeline-row">
${stageFlow.map((s, i) => `
<div class="pipeline-stage">
<div class="pipeline-icon pipeline-${s.tone}"><i class="fa-solid fa-circle"></i></div>
<div class="pipeline-info">
<div class="pipeline-label">${escapeHtml(s.label)}</div>
<div class="pipeline-count">${s.count} leadów</div>
</div>
</div>
${i < stageFlow.length - 1 ? '<div class="pipeline-arrow"><i class="fa-solid fa-chevron-right"></i></div>' : ''}
`).join('')}
</div>
` }),
panel({ title: 'Lista leadów', body: `
<table class="data-table">
<thead><tr>
<th>ID</th><th>Źródło</th><th>Kontakt</th><th>Zainteresowanie</th><th>Kampania</th><th>Grupa</th><th>Data</th><th>Etap</th><th></th>
</tr></thead>
<tbody>
${leads.map(l => `<tr>
<td><code>${escapeHtml(l.id)}</code></td>
<td><span class="type-pill">${escapeHtml(l.source)}</span></td>
<td>
<div class="client-name-cell">
<div class="avatar-sm">${l.name.split(' ').pop()[0] || '?'}</div>
<div><strong>${escapeHtml(l.name)}</strong><br><small>${escapeHtml(l.parish)}</small></div>
</div>
</td>
<td>${escapeHtml(l.interest)}</td>
<td><small style="color:var(--text-muted)">${escapeHtml(l.campaign)}</small></td>
<td>${escapeHtml(l.group)}</td>
<td>${escapeHtml(l.date)}</td>
<td>${statusBadge(l.stage, l.stageTone)}</td>
<td>${button({ label: '', icon: 'fa-solid fa-arrow-right', variant: 'outline', attrs: { title: 'Otwórz lead' } })}</td>
</tr>`).join('')}
</tbody>
</table>
` })
].join('');
}

/* ===== KAMPANIE SPRZEDAŻOWE ===== */
function renderKampanie() {

/* ---------- DANE ---------- */
const campaigns = [
{
id: 'KAM-001',
name: 'Retencja 2026 — starzy uczestnicy',
type: 'Retencja',
typeTone: 'purple',
typeIcon: 'fa-solid fa-rotate-left',
rule: 'Uczestnik z wyjazdami 2022–2024, brak rezerwacji 2025–2026',
segment: 'Proboszczowie i wikariusze · ostatni wyjazd ≤2024',
assigned: 'Anna K.',
contacts: 147,
done: 62,
conversions: 9,
status: 'Aktywna',
statusTone: 'green',
nextAction: 'Telefon',
priority: 'Wysoki'
},
{
id: 'KAM-002',
name: 'Zimna baza — wiosna 2026',
type: 'Zimna baza',
typeTone: 'blue',
typeIcon: 'fa-solid fa-snowflake',
rule: 'Baza CRM bez żadnego wyjazdu lub brak kontaktu >3 lata · region: Mazowsze / Małopolska',
segment: 'Funkcja: proboszcz · diecezje: Krakowska, Warszawska, Łódzka',
assigned: 'Marek W.',
contacts: 89,
done: 31,
conversions: 3,
status: 'Aktywna',
statusTone: 'green',
nextAction: 'Telefon',
priority: 'Średni'
},
{
id: 'KAM-003',
name: 'Leady z Facebook Ads — Wielkanoc',
type: 'Social leady',
typeTone: 'blue',
typeIcon: 'fa-brands fa-facebook',
rule: 'Lead z kampanii FB „Pielgrzymka Wielkanocna 2026" · czas reakcji <24 h',
segment: 'Automatyczne — z formularza FB Lead Ads',
assigned: 'Anna K.',
contacts: 23,
done: 18,
conversions: 5,
status: 'Aktywna',
statusTone: 'green',
nextAction: 'Telefon / E-mail',
priority: 'Pilny'
},
{
id: 'KAM-004',
name: 'Leady z formularza WWW',
type: 'Social leady',
typeTone: 'blue',
typeIcon: 'fa-solid fa-globe',
rule: 'Formularz kontaktowy na stronie · brak przydziału do ofertowania przez 48 h',
segment: 'Automatyczne — z CMS strony matteotravelkrakow.pl',
assigned: 'Marek W.',
contacts: 14,
done: 10,
conversions: 2,
status: 'Aktywna',
statusTone: 'green',
nextAction: 'Telefon',
priority: 'Pilny'
},
{
id: 'KAM-005',
name: 'Imieniny — maj 2026',
type: 'Event',
typeTone: 'orange',
typeIcon: 'fa-solid fa-cake-candles',
rule: 'Kontakt z imieniem mającym imieniny w maju · ostatni kontakt >6 miesięcy',
segment: 'CRM auto-segment: imieniny lub urodziny w maju',
assigned: 'Anna K.',
contacts: 67,
done: 0,
conversions: 0,
status: 'Zaplanowana',
statusTone: 'info',
nextAction: 'SMS + Telefon',
priority: 'Planowany'
},
{
id: 'KAM-006',
name: 'Newsletter — reaktywacja nieaktywnych',
type: 'Email',
typeTone: 'neutral',
typeIcon: 'fa-solid fa-envelope-open-text',
rule: 'Subskrybenci bez interakcji >12 miesięcy · 3 e-maile re-engagement co 2 tyg.',
segment: 'Baza e-mail · tag: brak otwarcia >365 dni',
assigned: 'System automatyczny',
contacts: 412,
done: 412,
conversions: 18,
status: 'Zakończona',
statusTone: 'success',
nextAction: '—',
priority: '—'
},
];

/* ---------- KOLEJKA ZADAŃ NA DZIŚ (28.03.2026) ---------- */
const todayTasks = [
{ time: '09:00', contact: 'ks. Tomasz Atras', parish: 'Chełm — pw. Przenajświętszej Trójcy', tel: '600 269 717', type: 'Telefon', campaign: 'Retencja 2026', note: 'Był na Medjugoriu 2023. Brak rezerwacji 2026. Zapytanie o Medjugorie.', priority: 'wysoki', done: true },
{ time: '09:30', contact: 'ks. Marek Adamus', parish: '— (brak parafii)', tel: '798 458 026', type: 'Telefon', campaign: 'Retencja 2026', note: 'Ziemia Święta 2025. Zaoferować Ziemię Świętą 2026/2027.', priority: 'wysoki', done: false },
{ time: '10:00', contact: 'Agnieszka Babiarz', parish: 'Brzoża Stadnicka', tel: '601 375 037', type: 'Telefon', campaign: 'Retencja 2026', note: 'Rzym-Watykan 2025 — zapytać o plany 2026.', priority: 'sredni', done: false },
{ time: '10:30', contact: 'ks. Grzegorz Ptak', parish: 'Parafia MBNP, Katowice', tel: '—', type: 'E-mail', campaign: 'Leady z Facebook Ads — Wielkanoc', note: 'Lead z 15.03, oferta wysłana. Follow-up — czy są pytania?', priority: 'pilny', done: false },
{ time: '11:00', contact: 'S. Maria Łukasiewicz', parish: 'Zgromadzenie Służeb. NMP, Kraków', tel: '—', type: 'Telefon', campaign: 'Leady z Facebook Ads — Wielkanoc', note: 'Oferta wysłana 21.03. Brak odpowiedzi — zadzwonić.', priority: 'pilny', done: false },
{ time: '12:00', contact: 'ks. Albin Rodryg', parish: 'Parafia Narodzenia NMP, Małuszów', tel: '601 789 090', type: 'Telefon', campaign: 'Zimna baza — wiosna 2026', note: 'Brak wyjazdów w historii. Pierwsze zimne zapytanie — Ziemia Święta lub Włochy?', priority: 'sredni', done: false },
{ time: '12:30', contact: 'ks. Paweł Anioł', parish: 'Dom Ulgi, Ostrowiec Świętokrzyski', tel: '698 879 926', type: 'Telefon', campaign: 'Zimna baza — wiosna 2026', note: 'Brak wyjazdów — dyrektor dużego domu opieki. Zapytanie o wyjazd integracyjny.', priority: 'sredni', done: false },
{ time: '14:00', contact: 'Łukasz Bereś', parish: '— (świecki)', tel: '693 631 063', type: 'Telefon', campaign: 'Retencja 2026', note: 'Gruzja 2025. Zapytać o plany 2026/2027.', priority: 'wysoki', done: false },
{ time: '15:00', contact: 'Jarosław Barylski', parish: 'pw. św. Małgorzaty, Góra Świętej Małgorzaty', tel: '531 896 073', type: 'SMS + Telefon', campaign: 'Retencja 2026', note: 'Medjugorie 2025. SMS z ofertą Medjugorie 2026, potem telefon po 10 min.', priority: 'wysoki', done: false },
];

const priorityColors = {
'pilny':  { bg: '#fff1f2', col: '#be123c', label: 'Pilny' },
'wysoki': { bg: '#fff7ed', col: '#c2410c', label: 'Wysoki' },
'sredni': { bg: '#f0f9ff', col: '#0369a1', label: 'Średni' }
};

const taskRows = todayTasks.map(function(t) {
const pc = priorityColors[t.priority] || { bg: '#f8fafc', col: '#475569', label: t.priority };
const doneCls = t.done ? 'style="opacity:0.5;text-decoration:line-through"' : '';
return '<tr ' + doneCls + '>' +
'<td style="font-weight:600;white-space:nowrap;color:var(--text-muted)">' + escapeHtml(t.time) + '</td>' +
'<td><div class="client-name-cell">' +
'<div class="list-item-icon" style="background:' + (t.done ? '#f1f5f9' : '#dbeafe') + ';color:' + (t.done ? '#94a3b8' : '#2563eb') + ';width:32px;height:32px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">' +
'<i class="fa-solid ' + (t.type === 'Telefon' ? 'fa-phone' : t.type === 'E-mail' ? 'fa-envelope' : 'fa-comment-sms') + '" style="font-size:0.75rem"></i>' +
'</div>' +
'<div><strong>' + escapeHtml(t.contact) + '</strong><small>' + escapeHtml(t.parish) + '</small></div>' +
'</div></td>' +
'<td><small style="white-space:nowrap">' + escapeHtml(t.tel) + '</small></td>' +
'<td><span class="type-pill">' + escapeHtml(t.type) + '</span></td>' +
'<td><small style="color:var(--text-muted)">' + escapeHtml(t.campaign) + '</small></td>' +
'<td style="max-width:220px"><small>' + escapeHtml(t.note) + '</small></td>' +
'<td><span style="background:' + pc.bg + ';color:' + pc.col + ';padding:0.1rem 0.5rem;border-radius:4px;font-size:0.7rem;font-weight:700;white-space:nowrap">' + pc.label + '</span></td>' +
'<td><div style="display:flex;gap:0.3rem">' +
(t.done
? '<span style="color:var(--success-color);font-size:0.8rem;font-weight:600"><i class="fa-solid fa-circle-check"></i> Wykonane</span>'
: button({ label: 'Zadzwoń', icon: 'fa-solid fa-phone', variant: 'outline' }) +
  button({ label: 'Zaloguj wynik', variant: 'ghost' })
) +
'</div></td>' +
'</tr>';
}).join('');

const campaignCards = campaigns.map(function(c) {
const pct = c.contacts ? Math.round(c.done / c.contacts * 100) : 0;
const bar = '<div style="height:6px;background:var(--border-color);border-radius:3px;margin-top:0.5rem">' +
'<div style="height:6px;border-radius:3px;width:' + pct + '%;background:' +
(c.statusTone === 'success' ? 'var(--success-color)' : c.statusTone === 'green' ? 'var(--primary-color)' : '#94a3b8') +
'"></div></div>';
return '<div style="padding:1rem;border:1px solid var(--border-color);border-radius:10px;display:flex;flex-direction:column;gap:0.6rem">' +
'<div style="display:flex;align-items:flex-start;gap:0.75rem">' +
'<div style="width:36px;height:36px;border-radius:8px;background:var(--primary-light);color:var(--primary-color);display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
'<i class="' + c.typeIcon + '" style="font-size:0.85rem"></i>' +
'</div>' +
'<div style="flex:1;min-width:0">' +
'<div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.2rem">' +
'<strong style="font-size:0.9rem">' + escapeHtml(c.name) + '</strong>' +
statusBadge(c.status, c.statusTone) +
'</div>' +
'<div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.35rem"><i class="fa-solid fa-filter" style="margin-right:0.3rem"></i>' + escapeHtml(c.rule) + '</div>' +
'<div style="font-size:0.72rem;color:var(--text-muted);font-style:italic">' + escapeHtml(c.segment) + '</div>' +
'</div>' +
'</div>' +
'<div style="display:flex;gap:1.5rem;font-size:0.78rem">' +
'<span><strong>' + c.contacts + '</strong> kontaktów</span>' +
'<span><strong>' + c.done + '</strong> wywołanych</span>' +
'<span style="color:var(--success-color)"><strong>' + c.conversions + '</strong> konwersji</span>' +
'<span style="margin-left:auto;color:var(--text-muted)">Opiekun: ' + escapeHtml(c.assigned) + '</span>' +
'</div>' +
bar +
'<div style="font-size:0.75rem;color:var(--text-muted)">Postęp: ' + c.done + ' / ' + c.contacts + ' (' + pct + '%) · Następna akcja: <strong>' + escapeHtml(c.nextAction) + '</strong></div>' +
'<div style="display:flex;gap:0.4rem;flex-wrap:wrap;padding-top:0.25rem">' +
button({ label: 'Zadania', icon: 'fa-solid fa-list-check', variant: 'outline' }) +
button({ label: 'Edytuj reguły', icon: 'fa-solid fa-sliders', variant: 'ghost' }) +
(c.statusTone === 'green' ? button({ label: 'Wstrzymaj', icon: 'fa-solid fa-pause', variant: 'ghost' }) : '') +
'</div>' +
'</div>';
}).join('');

/* ---------- REGUŁY — przykład rozwinięty ---------- */
const ruleExample = [
{ condition: 'Typ', op: 'jest', value: 'Ksiądz lub świecki organizator', tone: '#2563eb' },
{ condition: 'Historia wyjazdów', op: 'zawiera', value: 'dowolny rok 2022–2024', tone: '#7c3aed' },
{ condition: 'Rezerwacja 2026', op: 'nie istnieje', value: '—', tone: '#b45309' },
{ condition: 'Ostatni kontakt telefoniczny', op: 'starszy niż', value: '90 dni', tone: '#0369a1' },
];

const ruleRows = ruleExample.map(function(r) {
return '<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem;background:var(--bg-main);border-radius:6px">' +
'<span style="font-size:0.75rem;background:' + r.tone + '18;color:' + r.tone + ';border:1px solid ' + r.tone + '30;padding:0.1rem 0.4rem;border-radius:3px;font-weight:700;white-space:nowrap;min-width:3.5rem;text-align:center">Jeśli</span>' +
'<strong style="font-size:0.82rem;min-width:160px">' + escapeHtml(r.condition) + '</strong>' +
'<span style="font-size:0.8rem;color:var(--text-muted);font-style:italic;min-width:80px">' + escapeHtml(r.op) + '</span>' +
'<span style="font-size:0.82rem">' + escapeHtml(r.value) + '</span>' +
'</div>';
}).join('<div style="padding-left:3.2rem;font-size:0.72rem;color:var(--text-muted);font-weight:700">I</div>');

return [
dashboardHeader({
title: 'Kampanie sprzedażowe',
subtitle: 'Zarządzanie kampaniami retencyjnymi, zimnymi bazami i leadami — kolejka zadań na dziś dla działu sprzedaży',
actions: [
button({ label: 'Raport sprzedaży', icon: 'fa-solid fa-chart-bar', variant: 'outline' }),
button({ label: 'Nowa kampania', icon: 'fa-solid fa-bullhorn' })
]
}),
'<div class="stats-grid">' +
statCard({ title: 'Aktywne kampanie', value: '4', icon: 'fa-solid fa-bullhorn', iconTone: 'blue' }) +
statCard({ title: 'Zadań na dziś (28.03)', value: '9', icon: 'fa-solid fa-list-check', iconTone: 'orange', trend: '1 wykonane · 8 oczekuje', trendTone: 'negative' }) +
statCard({ title: 'Konwersje (marzec)', value: '19', icon: 'fa-solid fa-handshake', iconTone: 'green', trend: '+4 vs. luty', trendTone: 'positive' }) +
statCard({ title: 'Kontaktów w kolejce', value: '273', icon: 'fa-solid fa-address-book', iconTone: 'purple' }) +
'</div>',
'<div class="dashboard-grid dashboard-grid-3-1">' +
panel({
title: 'Kolejka zadań sprzedażowych — dziś 28.03.2026',
action: '<div style="display:flex;gap:0.5rem;align-items:center">' +
'<select class="inline-select"><option>Wszystkie osoby</option><option>Anna K.</option><option>Marek W.</option></select>' +
'<select class="inline-select"><option>Wszystkie kampanie</option><option>Retencja 2026</option><option>Zimna baza</option><option>FB Leady</option></select>' +
button({ label: 'Eksport dnia', icon: 'fa-solid fa-download', variant: 'ghost' }) +
'</div>',
body: '<div class="table-container"><table class="data-table">' +
'<thead><tr>' +
'<th>Godz.</th><th>Kontakt</th><th>Telefon</th><th>Typ</th><th>Kampania</th><th>Notatka / powód</th><th>Priorytet</th><th>Akcja</th>' +
'</tr></thead>' +
'<tbody>' + taskRows + '</tbody>' +
'</table></div>'
}) +
'<div style="display:flex;flex-direction:column;gap:1.25rem">' +
panel({
title: 'Dziś w sprzedaży',
body: '<div style="display:flex;flex-direction:column;gap:0.75rem">' +
'<div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">' +
'<span style="font-size:0.82rem;color:#166534"><i class="fa-solid fa-circle-check" style="margin-right:0.4rem"></i>Wykonane</span>' +
'<strong style="color:#166534">1 / 9</strong>' +
'</div>' +
'<div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:#fff7ed;border-radius:8px;border:1px solid #fed7aa">' +
'<span style="font-size:0.82rem;color:#c2410c"><i class="fa-solid fa-phone" style="margin-right:0.4rem"></i>Telefony</span>' +
'<strong style="color:#c2410c">7 zadań</strong>' +
'</div>' +
'<div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">' +
'<span style="font-size:0.82rem;color:#1e40af"><i class="fa-solid fa-envelope" style="margin-right:0.4rem"></i>E-maile / SMS</span>' +
'<strong style="color:#1e40af">2 zadania</strong>' +
'</div>' +
'<hr style="border:none;border-top:1px solid var(--border-color);margin:0.25rem 0">' +
'<div style="font-size:0.78rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Opiekunowie</div>' +
'<div style="display:flex;flex-direction:column;gap:0.4rem">' +
'<div style="display:flex;justify-content:space-between;font-size:0.82rem"><span>Anna K.</span><span><strong>5</strong> zadań</span></div>' +
'<div style="display:flex;justify-content:space-between;font-size:0.82rem"><span>Marek W.</span><span><strong>4</strong> zadania</span></div>' +
'</div>' +
'</div>'
}) +
panel({
title: 'Jak działa automatyzacja?',
body: '<div style="display:flex;flex-direction:column;gap:0.6rem;font-size:0.8rem;line-height:1.6">' +
'<div style="padding:0.6rem;background:var(--bg-main);border-radius:6px"><strong>1. Tworzysz kampanię</strong> i definiujesz reguły (kto trafia do kolejki).</div>' +
'<div style="padding:0.6rem;background:var(--bg-main);border-radius:6px"><strong>2. System każdego ranka</strong> generuje listę zadań dla opiekunów na podstawie reguł kampanii.</div>' +
'<div style="padding:0.6rem;background:var(--bg-main);border-radius:6px"><strong>3. Opiekun widzi</strong> kolejkę „na dziś" z kontekstem (historia wyjazdów, powód kontaktu).</div>' +
'<div style="padding:0.6rem;background:var(--bg-main);border-radius:6px"><strong>4. Po rozmowie</strong> loguje wynik (zainteresowany / oddzwoń / brak zainteresowania). Trafia to do historii CRM.</div>' +
'<div style="padding:0.6rem;background:var(--bg-main);border-radius:6px"><strong>5. Konwersja</strong> = nowe zapytanie (ZAP-XXXX) powiązane z kampanią i kontaktem.</div>' +
'</div>'
}) +
'</div>' +
'</div>',
'<div class="dashboard-grid">' +
panel({
title: 'Aktywne i zaplanowane kampanie',
action: button({ label: 'Nowa kampania', icon: 'fa-solid fa-plus', variant: 'outline' }),
body: '<div style="display:flex;flex-direction:column;gap:0.75rem">' + campaignCards + '</div>'
}) +
panel({
title: 'Edytor reguł — przykład: Retencja 2026',
body: '<div style="margin-bottom:0.75rem;font-size:0.78rem;color:var(--text-muted)">System wybiera kontakty do kampanii na podstawie warunków wizualnych. Wynik: <strong>147 kontaktów</strong> kwalifikuje się.</div>' +
'<div style="display:flex;flex-direction:column;gap:0.3rem">' + ruleRows + '</div>' +
'<div style="margin-top:1rem;padding:0.75rem;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:0.78rem;color:#166534">' +
'<strong><i class="fa-solid fa-circle-check" style="margin-right:0.4rem"></i>147 kontaktów spełnia powyższe warunki</strong> · Następna akcja: Telefon · Priorytet: Wysoki' +
'</div>' +
'<div style="margin-top:0.75rem;display:flex;gap:0.5rem">' +
button({ label: 'Dodaj warunek', icon: 'fa-solid fa-plus', variant: 'outline' }) +
button({ label: 'Zapisz reguły', variant: 'ghost' }) +
button({ label: 'Testuj segment', variant: 'ghost' }) +
'</div>'
}) +
'</div>'
].join('');
}

/* ===== SOCIAL MEDIA ===== */
function renderSocial() {
const posts = [
{ date: '01.04', platform: 'Facebook', content: 'Dziś wyruszamy! 🙏 42 pielgrzymów leci do Ziemi Świętej — módlcie się za nas!', status: 'Zaplanowany', statusTone: 'blue', img: true },
{ date: '03.04', platform: 'Instagram', content: 'Pierwsza Msza Święta pod gołym niebem — Betlejem 🕊️ #MatteoTravel #ZiemiaSwieta', status: 'Zaplanowany', statusTone: 'blue', img: true },
{ date: '07.04', platform: 'Facebook', content: 'Wróciły nasze Pielgrzymki — relacja z wyjazdu ➜ (link w komentarzu)', status: 'Szkic', statusTone: 'orange', img: false },
{ date: '10.04', platform: 'Facebook + Instagram', content: 'Otwieramy zapisy na Santiago de Compostela 2027! Cena early-bird ważna do 30.04.', status: 'Szkic', statusTone: 'orange', img: false },
];

return [
dashboardHeader({
title: 'Social media',
subtitle: 'Planowanie i publikacja postów — Facebook, Instagram, harmonogram treści',
actions: [
button({ label: 'Harmonogram', icon: 'fa-solid fa-calendar-week', variant: 'outline' }),
button({ label: 'Nowy post', icon: 'fa-brands fa-facebook' })
]
}),
`<div class="stats-grid">
${statCard({ title: 'Obserwujący FB', value: '8 420', icon: 'fa-brands fa-facebook', iconTone: 'blue', trend: '+124 w marcu', trendTone: 'positive' })}
${statCard({ title: 'Obserwujący IG', value: '3 280', icon: 'fa-brands fa-instagram', iconTone: 'purple', trend: '+88 w marcu', trendTone: 'positive' })}
${statCard({ title: 'Zaplanowane posty', value: '4', icon: 'fa-solid fa-calendar-check', iconTone: 'orange' })}
${statCard({ title: 'Avg. reach / post', value: '1 240', icon: 'fa-solid fa-eye', iconTone: 'green' })}
</div>`,
panel({ title: 'Kolejka publikacji', body: `
<div class="social-post-list">
${posts.map(p => `
<div class="social-post-card">
<div class="social-post-header">
<span class="type-pill">${escapeHtml(p.platform)}</span>
<span>${escapeHtml(p.date)}</span>
${statusBadge(p.status, p.statusTone)}
</div>
<p class="social-post-body">${escapeHtml(p.content)}</p>
${p.img ? `<div class="social-post-img-placeholder"><i class="fa-solid fa-image"></i> Obraz zaplanowany</div>` : ''}
<div class="social-post-actions">
${button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' })}
${button({ label: 'Podgląd', icon: 'fa-solid fa-eye', variant: 'ghost' })}
</div>
</div>
`).join('')}
</div>
` })
].join('');
}

window.LeadyView = { renderLeady };
window.KampanieView = { renderKampanie };
window.SocialView = { renderSocial };
})();
