(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	function renderRezerwacje() {

		/* ===== ALL-EVENTS DATA ===== */
		var groups = [
			{
				id: 'MT-2026-EG-01', name: 'Egipt — Piramidy, pociąg, Hurghada', dest: 'Egipt',
				from: '24.01.2026', to: '31.01.2026', status: 'Zakończona', statusTone: 'success',
				pax: 44, paxMax: 45,
				participants: [
					{ lp: 1, name: 'Wiśniewski Adam',          room: 'DBL 101', flight: 'W6Y73A', paid: 4990, total: 4990, contract: 'Podpisana', docs: 'OK', status: 'Kompletny', statusTone: 'success' },
					{ lp: 2, name: 'Wiśniewska Maria',          room: 'DBL 101', flight: 'W6Y73A', paid: 4990, total: 4990, contract: 'Podpisana', docs: 'OK', status: 'Kompletny', statusTone: 'success' },
					{ lp: 3, name: 'ks. Jan Kowalczyk',         room: 'SGL 105', flight: 'W6Y73A', paid: 0,    total: 0,    contract: 'Podpisana', docs: 'OK', status: 'Gratis',    statusTone: 'purple'  },
					{ lp: 4, name: 'Nowak Barbara',             room: 'SGL+ 203', flight: 'W6Y73A', paid: 3500, total: 5880, contract: 'Podpisana', docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
					{ lp: 5, name: 'Zielińska Anna',            room: 'DBL 204', flight: 'W6Y73A', paid: 2000, total: 4990, contract: 'Wysłana',  docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
					{ lp: 6, name: 'Zieliński Marek',           room: 'DBL 204', flight: 'W6Y73A', paid: 4990, total: 4990, contract: 'Podpisana', docs: 'Weryfikacja', status: 'Dokumenty', statusTone: 'info'    },
					{ lp: 7, name: 'Malczewski Tomasz',         room: 'DBL 301', flight: 'W6Y73A', paid: 0,    total: 4990, contract: 'Brak',     docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger'  },
					{ lp: 8, name: 'Malczewska Ewa',            room: 'DBL 301', flight: 'W6Y73A', paid: 0,    total: 4990, contract: 'Brak',     docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger'  },
				]
			},
			{
				id: 'MT-2026-WL-03', name: 'Pielgrzymka jubileuszowa Ziemia Święta', dest: 'Izrael / Palestyna',
				from: '25.04.2026', to: '02.05.2026', status: 'Potwierdzony', statusTone: 'success',
				pax: 42, paxMax: 50,
				participants: [
					{ lp: 1, name: 'ks. Jan Wiśniewski',        room: 'SGL 01',  flight: 'LO4KL2', paid: 0,    total: 0,    contract: 'Podpisana', docs: 'OK', status: 'Gratis',      statusTone: 'purple'  },
					{ lp: 2, name: 'Kowalski Andrzej',          room: 'DBL 02',  flight: 'LO4KL2', paid: 5490, total: 5490, contract: 'Podpisana', docs: 'OK', status: 'Kompletny',   statusTone: 'success' },
					{ lp: 3, name: 'Kowalska Jadwiga',          room: 'DBL 02',  flight: 'LO4KL2', paid: 5490, total: 5490, contract: 'Podpisana', docs: 'OK', status: 'Kompletny',   statusTone: 'success' },
					{ lp: 4, name: 'Dąbrowski Piotr',           room: 'SGL+ 03', flight: 'LO4KL2', paid: 3000, total: 6390, contract: 'Wysłana',  docs: 'Brak paszportu', status: 'Nieopłacony', statusTone: 'warning' },
					{ lp: 5, name: 'Jankowska Helena',          room: 'DBL 04',  flight: 'LO4KL2', paid: 5490, total: 5490, contract: 'Podpisana', docs: 'OK', status: 'Kompletny',   statusTone: 'success' },
					{ lp: 6, name: 'Jankowski Krzysztof',       room: 'DBL 04',  flight: 'LO4KL2', paid: 2000, total: 5490, contract: 'Podpisana', docs: 'OK', status: 'Nieopłacony', statusTone: 'warning' },
					{ lp: 7, name: 'Malinowska Teresa',         room: 'DBL 05',  flight: 'LO4KL3', paid: 0,    total: 5490, contract: 'Brak',     docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger'  },
				]
			},
			{
				id: 'MT-2026-ES-01', name: 'Santiago de Compostela — LO Pijarów', dest: 'Hiszpania',
				from: '05.05.2026', to: '12.05.2026', status: 'W trakcie zbierania', statusTone: 'info',
				pax: 20, paxMax: 30,
				participants: [
					{ lp: 1, name: 'Liceum Pijarów — gr. 01',  room: 'DBL A',   flight: 'opcja FR', paid: 1200, total: 3200, contract: 'W przygotowaniu', docs: 'OK', status: 'Zaliczka', statusTone: 'info' },
					{ lp: 2, name: 'Liceum Pijarów — gr. 02',  room: 'DBL B',   flight: 'opcja FR', paid: 1200, total: 3200, contract: 'W przygotowaniu', docs: 'OK', status: 'Zaliczka', statusTone: 'info' },
					{ lp: 3, name: 'Liceum Pijarów — gr. 03',  room: 'DBL C',   flight: 'opcja FR', paid: 0,    total: 3200, contract: 'Brak', docs: 'Brak', status: 'Brak wpłaty', statusTone: 'danger' },
				]
			},
		];

		/* ===== GLOBAL STATS ===== */
		var totalPax = 0, totalPaid = 0, totalMissingDocs = 0, totalMissingContract = 0, totalUnpaid = 0;
		groups.forEach(function(g) {
			g.participants.forEach(function(p) {
				totalPax++;
				if (p.balance < 0 || p.paid < p.total) totalUnpaid++;
				if (p.docs !== 'OK' && p.docs !== 'Brak') totalMissingDocs++;
				if (p.docs === 'Brak paszportu') totalMissingDocs++;
				if (p.contract === 'Brak') totalMissingContract++;
				if (p.status === 'Kompletny' || p.status === 'Gratis') totalPaid++;
			});
		});

		/* ===== GROUP SECTION ROWS ===== */
		var allGroupSections = groups.map(function(g) {
			var pRows = g.participants.map(function(p) {
				var bal = p.paid - p.total;
				var docsOk = p.docs === 'OK';
				return '<tr>' +
					'<td style="text-align:center;color:var(--text-muted);font-weight:600;font-size:0.8rem">' + p.lp + '</td>' +
					'<td><strong style="font-size:0.83rem">' + escapeHtml(p.name) + '</strong></td>' +
					'<td><span class="room-pill" style="font-size:0.75rem">' + escapeHtml(p.room) + '</span></td>' +
					'<td><code style="font-size:0.77rem">' + escapeHtml(p.flight) + '</code></td>' +
					'<td style="text-align:right;font-weight:600;font-size:0.83rem">' + (p.total > 0 ? p.total.toLocaleString('pl-PL') + ' zł' : '<span style="color:var(--text-muted)">Gratis</span>') + '</td>' +
					'<td style="text-align:right;color:var(--success-color);font-weight:600;font-size:0.83rem">' + (p.paid > 0 ? p.paid.toLocaleString('pl-PL') + ' zł' : '—') + '</td>' +
					'<td style="text-align:right;font-weight:700;font-size:0.83rem;color:' + (bal < 0 ? 'var(--danger-color)' : 'var(--success-color)') + '">' +
						(bal < 0 ? bal.toLocaleString('pl-PL') + ' zł' : (p.total > 0 ? '<i class="fa-solid fa-check"></i>' : '—')) +
					'</td>' +
					'<td>' + statusBadge(p.contract === 'Podpisana' ? 'Podpisana ✓' : p.contract, p.contract === 'Podpisana' ? 'success' : p.contract === 'Wysłana' ? 'info' : 'neutral') + '</td>' +
					'<td>' + (docsOk
						? '<span style="color:var(--success-color);font-size:0.8rem"><i class="fa-solid fa-check-circle"></i> OK</span>'
						: '<span style="color:var(--warning-color);font-size:0.8rem"><i class="fa-solid fa-triangle-exclamation"></i> ' + escapeHtml(p.docs) + '</span>') + '</td>' +
					'<td>' + statusBadge(p.status, p.statusTone) + '</td>' +
					'<td>' + button({ label: 'Edytuj', variant: 'outline' }) + '</td>' +
				'</tr>';
			}).join('');

			var pct = g.paxMax ? Math.round(g.pax / g.paxMax * 100) : 0;
			var pctColor = pct >= 100 ? 'var(--success-color)' : pct >= 70 ? 'var(--primary-color)' : 'var(--warning-color)';

			return '<div style="margin-bottom:1.5rem">' +
				'<div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 1rem;background:var(--bg-main);border:1px solid var(--border-color);border-radius:10px 10px 0 0;border-bottom:none;cursor:pointer" onclick="window.AppNavigation && window.AppNavigation.setActivePage(\'szczegoly_grupy\')">' +
					'<div style="display:flex;flex-direction:column;flex:1;min-width:0">' +
						'<div style="display:flex;align-items:center;gap:0.5rem">' +
							'<code style="font-size:0.72rem;color:var(--text-muted)">' + escapeHtml(g.id) + '</code>' +
							statusBadge(g.status, g.statusTone) +
						'</div>' +
						'<span style="font-weight:700;font-size:0.9rem;margin-top:0.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + escapeHtml(g.name) + '</span>' +
						'<span style="font-size:0.76rem;color:var(--text-muted)">' + escapeHtml(g.dest) + ' · ' + escapeHtml(g.from) + '–' + escapeHtml(g.to) + '</span>' +
					'</div>' +
					'<div style="text-align:right;flex-shrink:0">' +
						'<div style="font-weight:700;color:' + pctColor + '">' + g.pax + '/' + g.paxMax + ' os.</div>' +
						'<div style="width:80px;height:4px;background:var(--border-color);border-radius:2px;margin-top:4px"><div style="width:' + pct + '%;height:100%;border-radius:2px;background:' + pctColor + '"></div></div>' +
					'</div>' +
					'<i class="fa-solid fa-arrow-right" style="color:var(--text-muted);font-size:0.8rem;flex-shrink:0"></i>' +
				'</div>' +
				'<div style="border:1px solid var(--border-color);border-radius:0 0 10px 10px;overflow:hidden">' +
					'<div class="table-container" style="margin:0">' +
						'<table class="data-table" style="margin:0">' +
							'<thead><tr>' +
								'<th style="text-align:center">Lp</th>' +
								'<th>Uczestnik</th>' +
								'<th>Pokój</th>' +
								'<th>Lot</th>' +
								'<th style="text-align:right">Wartość</th>' +
								'<th style="text-align:right">Wpłacono</th>' +
								'<th style="text-align:right">Saldo</th>' +
								'<th>Umowa</th>' +
								'<th>Dokumenty</th>' +
								'<th>Status</th>' +
								'<th></th>' +
							'</tr></thead>' +
							'<tbody>' + pRows + '</tbody>' +
						'</table>' +
					'</div>' +
					'<div style="padding:0.5rem 1rem;background:var(--bg-main);border-top:1px solid var(--border-color);display:flex;align-items:center;gap:0.5rem">' +
					button({ label: 'Dodaj uczestnika', icon: 'fa-solid fa-user-plus', variant: 'ghost' }) +
						button({ label: 'Lista do biletowania', icon: 'fa-solid fa-list', variant: 'ghost' }) +
						'<span style="margin-left:auto;font-size:0.75rem;color:var(--text-muted)">' + g.participants.length + ' pozycji</span>' +
					'</div>' +
				'</div>' +
			'</div>';
		}).join('');

		return [
			dashboardHeader({
				title: 'Rezerwacje uczestników',
				subtitle: 'Wszystkie rezerwacje ze wszystkich imprez 2026',
				actions: [
					button({ label: 'Export Excel', icon: 'fa-solid fa-download', variant: 'outline' }),
					button({ label: 'Nowa rezerwacja', icon: 'fa-solid fa-plus' }),
				]
			}),
			'<div class="stats-grid">' +
				statCard({ title: 'Łącznie uczestników', value: String(totalPax), icon: 'fa-solid fa-users', iconTone: 'blue' }) +
				statCard({ title: 'Kompletnych', value: String(totalPaid), icon: 'fa-solid fa-circle-check', iconTone: 'green' }) +
				statCard({ title: 'Brak dokumentów', value: String(totalMissingDocs), icon: 'fa-solid fa-passport', iconTone: 'orange', trend: 'Wymagane do biletowania', trendTone: 'negative' }) +
				statCard({ title: 'Brak umowy', value: String(totalMissingContract), icon: 'fa-solid fa-file-contract', iconTone: 'purple' }) +
			'</div>',
			panel({
				title: 'Wszystkie rezerwacje — 2026',
				action: '<div style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
					'<select class="inline-select"><option>Wszystkie imprezy</option><option>MT-2026-EG-01 (Egipt)</option><option>MT-2026-WL-03 (Ziemia Święta)</option><option>MT-2026-ES-01 (Santiago)</option></select>' +
					'<select class="inline-select"><option>Wszystkie statusy</option><option>Kompletny</option><option>Nieopłacony</option><option>Brak wpłaty</option><option>Gratis</option><option>Dokumenty</option></select>' +
					'<select class="inline-select"><option>Wszystkie dokumenty</option><option>OK</option><option>Brak paszportu</option><option>Weryfikacja</option></select>' +
				'</div>',
				body: allGroupSections,
				bodyStyle: 'padding:1.25rem'
			}),
		].join('');
	}

	window.RezerwacjeView = { renderRezerwacje };
})();
