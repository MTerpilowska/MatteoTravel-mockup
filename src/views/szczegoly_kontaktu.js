(function () {
        const { button, dashboardHeader, panel, statusBadge, escapeHtml } = window.SharedUI;

        function tripCount(p) { return Object.keys(p.wyjazdy).length; }
        function initials(p) {
                if (p.tytul === 'inst.') {
                        var w = (p.nazwisko || '').split(/\s+/);
                        return (w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : (w[0] ? w[0][1] : ''));
                }
                return ((p.imie || '')[0] || '') + ((p.nazwisko || '')[0] || '');
        }

        const TRIP_YEAR_TONE = {
                '2018': '#94a3b8', '2019': '#8b5cf6', '2020': '#f59e0b',
                '2022': '#3b82f6', '2023': '#10b981', '2024': '#0ea5e9',
                '2025': '#f43f5e', '2026': '#6366f1'
        };

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

        function renderSzczegolyKontaktu() {
                const demo = {
                        tytul: 'ks.', imie: 'Wojciech', nazwisko: 'Adamczyk', funkcja: 'Proboszcz',
                        telefon: '502 597 835', email: 'wojada2@op.pl',
                        parafia: 'pw. Chrystusa Dobrego Pasterza', diecezja: 'Sandomierska',
                        adres: 'ul. Sienkiewicza 213, 39-400 Tarnob\u017ceg',
                        popParafie: '', uwagi: '',
                        wyjazdy: { '2020': 'Gruzja i Armenia', '2022': 'Turcja', '2023': 'Cypr', '2024': 'Bu\u0142garia', '2025': 'Sycylia' }
                };
                const demoFullName = demo.tytul + ' ' + demo.imie + ' ' + demo.nazwisko;
                const demoSt = { label: 'By\u0142 w 2025', tone: 'info' };

                return [
                        '<div style="margin-bottom: 1.5rem;"><a href="#" onclick="event.preventDefault(); window.AppNavigation.setActivePage(\'crm\')" style="color: var(--text-muted, #64748B); text-decoration: none; font-weight: 500; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-arrow-left"></i> Wróć do listy kontaktów</a></div>',
                        dashboardHeader({
                                title: '\uD83D\uDC64 Kartoteka \u2014 ' + demoFullName,
                                subtitle: 'Szczegóły uczestnika / organizatora',
                                
                                actions: [
                                        button({ label: 'Edytuj', icon: 'fa-solid fa-pen', variant: 'outline' }),
                                        button({ label: 'Zapisz', icon: 'fa-solid fa-check', variant: 'primary' })
                                ]
                        }),
                        '<div class="dashboard-grid">' +
                        panel({
                                title: 'Dane kontaktowe ',
                                body: '<div class="kartoteka-grid">' +
                                        '<div class="kartoteka-col">' +
                                        '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem">' +
                                        '<div style="width:60px;height:60px;border-radius:50%;background:var(--primary-light);color:var(--primary-color);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;flex-shrink:0">' + initials(demo) + '</div>' +
                                        '<div><h3 style="margin:0 0 0.3rem;font-size:1.05rem">' + escapeHtml(demoFullName) + '</h3>' +
                                        '<div style="display:flex;gap:0.4rem;flex-wrap:wrap">' + statusBadge(demoSt.label, demoSt.tone) + ' ' + statusBadge(demo.funkcja, 'neutral') + '</div></div>' +
                                        '</div>' +
                                        '<div class="info-table">' +
                                        '<div class="info-row"><span>Parafia</span><strong>' + escapeHtml(demo.parafia || '\u2014') + '</strong></div>' +
                                        '<div class="info-row"><span>Diecezja</span><strong>' + escapeHtml(demo.diecezja || '\u2014') + '</strong></div>' +
                                        '<div class="info-row"><span>Adres</span><strong>' + escapeHtml(demo.adres || '\u2014') + '</strong></div>' +
                                        '<div class="info-row"><span>Telefon</span><strong>' + escapeHtml(demo.telefon) + '</strong></div>' +
                                        '<div class="info-row"><span>E-mail</span><strong>' + escapeHtml(demo.email || '\u2014') + '</strong></div>' +
                                        '<div class="info-row"><span>Opiekun CRM</span><strong>Anna K.</strong></div>' +
                                        '<div class="info-row"><span>Poprz. parafie</span><strong>' + escapeHtml(demo.popParafie || '\u2014') + '</strong></div>' +
                                        '<div class="info-row"><span>Uwagi</span><strong>' + escapeHtml(demo.uwagi || '\u2014') + '</strong></div>' +
                                        '</div>' +
                                        '<div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">' +
                                        button({ label: 'SMS', icon: 'fa-solid fa-comment-sms', variant: 'outline' }) +
                                        button({ label: 'E-mail', icon: 'fa-solid fa-envelope', variant: 'outline' }) +
                                        button({ label: 'Nowe zapytanie', icon: 'fa-solid fa-file-pen', variant: 'ghost' }) +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="kartoteka-col">' +
                                        '<h4 style="margin:0 0 1rem;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted)">Historia wyjazdow (' + tripCount(demo) + ')</h4>' +
                                        tripTimeline(demo.wyjazdy) +
                                        '<div style="margin-top:1.25rem;border-top:1px solid var(--border-color);padding-top:1rem">' +
                                        '<h4 style="margin:0 0 0.75rem;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted)">Aktualne zainteresowanie</h4>' +
                                        '<div class="note-item" style="border-left-color:var(--success-color)"><strong>Sycylia 2026</strong> \u00b7 wstepne zainteresowanie<br><small style="color:var(--text-muted)">Oferta w przygotowaniu</small></div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="kartoteka-col">' +
                                        '<h4 style="margin:0 0 1rem;font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted)">Historia kontaktow</h4>' +
                                        '<div class="notes-list">' +
                                        '<div class="note-item"><span style="font-size:0.72rem;color:var(--text-muted);display:block;margin-bottom:0.2rem"><i class="fa-solid fa-phone"></i> Telefon \u00b7 24.03.2026</span>Omowiono Sycylie 2026. Ks. Adamczyk potwierdza zainteresowanie \u2014 czeka na oferte.</div>' +
                                        '<div class="note-item"><span style="font-size:0.72rem;color:var(--text-muted);display:block;margin-bottom:0.2rem"><i class="fa-solid fa-envelope"></i> E-mail \u00b7 18.03.2026</span>Przeslano katalog 2026/2027. Zainteresowanie Sycylia i Malta.</div>' +
                                        '<div class="note-item"><span style="font-size:0.72rem;color:var(--text-muted);display:block;margin-bottom:0.2rem"><i class="fa-solid fa-comment-sms"></i> SMS \u00b7 01.01.2026</span>Zyczenia noworoczne \u2014 wyslane automatycznie z szablonu.</div>' +
                                        '</div>' +
                                        '<div style="margin-top:1rem">' + button({ label: 'Zaloguj kontakt', icon: 'fa-solid fa-plus', variant: 'outline' }) + '</div>' +
                                        '</div>' +
                                        '</div>'
                        }) + '</div>'
                ].join('');
        }

        window.SzczegolyKontaktuView = { renderSzczegolyKontaktu };
})();
