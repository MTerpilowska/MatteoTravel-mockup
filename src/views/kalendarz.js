(function () {
	const { button, dashboardHeader, panel, statCard, statusBadge, escapeHtml } = window.SharedUI;

	// View state: 'month' or 'list'
	let currentView = 'month';
	let currentYear = 2026;
	let currentMonth = 3; // April (0-indexed)
	
	// Filter state
	let activeFilters = {
		bok: true,
		booking: true,
		bilety: true,
		ksiegowosc: true,
		marketing: true
	};

	function renderKalendarz() {
		console.log('renderKalendarz called, currentView:', currentView);
		const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
		
		const events = [
			{ date: '01.04', day: 'Śr', type: 'bok', label: 'MT-2026-WL-01 — Wylot Kraków → Tel Aviv', time: 'KRK 06:50', tone: 'blue' },
			{ date: '05.04', day: 'Nd', type: 'ksiegowosc', label: 'Termin: I rata — MT-2026-IT-03 (44 os.)', time: '23:59', tone: 'green' },
			{ date: '06.04', day: 'Pn', type: 'bok', label: 'MT-2026-WL-01 — Powrót Tel Aviv → Kraków', time: 'TLV 22:10', tone: 'blue' },
			{ date: '07.04', day: 'Wt', type: 'bilety', label: 'Deadline bilety LO — PNR LO4KL2 — depozyt', time: '12:00', tone: 'red' },
			{ date: '10.04', day: 'Pt', type: 'marketing', label: 'Spotkanie zoomowe — ks. Kowalczyk — Santiagio 2027', time: '16:00', tone: 'orange' },
			{ date: '12.04', day: 'Nd', type: 'ksiegowosc', label: 'Termin: II rata — MT-2026-WL-01 (42 os.)', time: '23:59', tone: 'green' },
			{ date: '15.04', day: 'Śr', type: 'booking', label: 'Deadline wysyłka teczek pilota — MT-2026-WL-01', time: '12:00', tone: 'purple' },
			{ date: '20.04', day: 'Pn', type: 'bok', label: 'MT-2026-IT-03 — Wylot Kraków → Rzym', time: 'KRK 07:30', tone: 'blue' },
			{ date: '27.04', day: 'Pn', type: 'bok', label: 'MT-2026-IT-03 — Powrót Rzym → Kraków', time: 'FCO 19:50', tone: 'blue' },
			{ date: '30.04', day: 'Cz', type: 'ksiegowosc', label: 'Termin: całość — MT-2026-IT-03 (44 os.)', time: '23:59', tone: 'green' },
		];

		const legend = [
			{ tone: 'blue', label: 'Biuro Obsługi Klienta', type: 'bok' },
			{ tone: 'purple', label: 'Booking', type: 'booking' },
			{ tone: 'red', label: 'Bilety lotnicze', type: 'bilety' },
			{ tone: 'green', label: 'Księgowość', type: 'ksiegowosc' },
			{ tone: 'orange', label: 'Marketing', type: 'marketing' },
		];

		// Month navigation handlers
		window.changeCalendarMonth = function(direction) {
			currentMonth += direction;
			if (currentMonth > 11) {
				currentMonth = 0;
				currentYear++;
			} else if (currentMonth < 0) {
				currentMonth = 11;
				currentYear--;
			}
			const contentArea = document.getElementById('contentArea');
			if (contentArea) {
				contentArea.innerHTML = renderKalendarz();
			}
		};

		window.toggleEventFilter = function(type) {
			activeFilters[type] = !activeFilters[type];
			const contentArea = document.getElementById('contentArea');
			if (contentArea) {
				contentArea.innerHTML = renderKalendarz();
			}
		};

		// Toggle view handler
		window.toggleCalendarView = function() {
			currentView = currentView === 'month' ? 'list' : 'month';
			const contentArea = document.getElementById('contentArea');
			if (contentArea) {
				contentArea.innerHTML = renderKalendarz();
			}
		};

		// Generate monthly calendar view
		function renderMonthView() {
			const year = currentYear;
			const month = currentMonth;
			const firstDay = new Date(year, month, 1);
			const lastDay = new Date(year, month + 1, 0);
			const daysInMonth = lastDay.getDate();
			const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
			const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Monday = 0
			
			// Get previous month's last days
			const prevMonthLastDay = new Date(year, month, 0).getDate();
			const prevMonthDays = adjustedStartDay;
			
			// Calculate total cells needed
			const totalCells = Math.ceil((daysInMonth + adjustedStartDay) / 7) * 7;
			const nextMonthDays = totalCells - (daysInMonth + adjustedStartDay);
			
			// Filter events
			const filteredEvents = events.filter(e => activeFilters[e.type]);
			
			// Create event map by day number
			const eventsByDay = {};
			filteredEvents.forEach(e => {
				const dayNum = parseInt(e.date.split('.')[0]);
				const eventMonth = parseInt(e.date.split('.')[1]) - 1; // 0-indexed
				// Only show events for current month
				if (eventMonth === month) {
					if (!eventsByDay[dayNum]) eventsByDay[dayNum] = [];
					eventsByDay[dayNum].push(e);
				}
			});
			
			let cells = [];
			
			// Previous month days
			for (let i = prevMonthDays - 1; i >= 0; i--) {
				cells.push(`<div class="calendar-day-cell other-month">
					<div class="calendar-day-number">${prevMonthLastDay - i}</div>
				</div>`);
			}
			
			// Current month days
			const today = 7; // April 7, 2026
			for (let day = 1; day <= daysInMonth; day++) {
				const isToday = day === today;
				const dayEvents = eventsByDay[day] || [];
				const eventsHtml = dayEvents.map(e => 
					`<div class="calendar-day-event tone-${e.tone}" title="${escapeHtml(e.label)} — ${escapeHtml(e.time)}">
					<span class="calendar-day-event-time">${escapeHtml(e.time)}</span>${escapeHtml(e.label.length > 20 ? e.label.substring(0, 20) + '...' : e.label)}
				</div>`
				).join('');
				
				cells.push(`<div class="calendar-day-cell ${isToday ? 'today' : ''}">
					<div class="calendar-day-number">${day}</div>
					<div class="calendar-day-events">${eventsHtml}</div>
				</div>`);
			}
			
			// Next month days
			for (let i = 1; i <= nextMonthDays; i++) {
				cells.push(`<div class="calendar-day-cell other-month">
					<div class="calendar-day-number">${i}</div>
				</div>`);
			}
			
			return `
				<div class="calendar-month-grid">
					<div class="calendar-month-header">
						<div class="calendar-month-header-day">Pn</div>
						<div class="calendar-month-header-day">Wt</div>
						<div class="calendar-month-header-day">Śr</div>
						<div class="calendar-month-header-day">Cz</div>
						<div class="calendar-month-header-day">Pt</div>
						<div class="calendar-month-header-day">Sb</div>
						<div class="calendar-month-header-day">Nd</div>
					</div>
					<div class="calendar-month-body">
						${cells.join('')}
					</div>
				</div>
			`;
		}

		// Generate list view
		function renderListView() {
			return `<div class="calendar-timeline">
				${events.map(e => `
					<div class="cal-event-row">
						<div class="cal-date-col">
							<span class="cal-day">${escapeHtml(e.day)}</span>
							<span class="cal-num">${escapeHtml(e.date)}</span>
						</div>
						<div class="cal-event-dot tone-${e.tone}"></div>
						<div class="cal-event-info">
							<span class="cal-event-label">${escapeHtml(e.label)}</span>
							<span class="cal-event-time">${escapeHtml(e.time)}</span>
						</div>
					</div>
				`).join('')}
			</div>`;
		}

		const viewToggleButton = button({ 
			label: currentView === 'month' ? 'Widok listy' : 'Widok miesięczny', 
			icon: currentView === 'month' ? 'fa-solid fa-list' : 'fa-solid fa-calendar-days', 
			variant: 'outline',
			attrs: { onclick: 'window.toggleCalendarView()' }
		});

		const legendHtml = `<div class="cal-legend${currentView === 'month' ? '-horizontal' : ''}">${legend.map(l => `
			<div class="cal-legend-item"><span class="cal-event-dot tone-${l.tone}" style="display:inline-block"></span> ${escapeHtml(l.label)}
			</div>`).join('')}</div>`;

		const legendInline = `<div style="display:flex;align-items:center;gap:1rem;padding:1rem 0 0.5rem 0;border-top:1px solid var(--border-color);margin-top:1rem;flex-wrap:wrap">
			<span style="font-weight:600;font-size:0.9rem;color:var(--text-main)">Legenda:</span>
			${legend.map(l => `<div class="cal-legend-item"><span class="cal-event-dot tone-${l.tone}" style="display:inline-block"></span> ${escapeHtml(l.label)}</div>`).join('')}
		</div>`;
		
		const currentMonthName = monthNames[currentMonth] + ' ' + currentYear;
		
	const navAndFiltersSection = `<div style="display:flex;justify-content:space-between;align-items:center;gap:1.5rem;padding:0 0 1rem 0;flex-wrap:wrap">
		<div style="display:flex;align-items:center;gap:0.75rem">
			<button onclick="window.changeCalendarMonth(-1)" class="calendar-month-nav-btn"><i class="fa-solid fa-chevron-left"></i></button>
			<span style="font-weight:700;font-size:1.25rem;color:var(--text-main);min-width:180px;text-align:left">${currentMonthName}</span>
			<button onclick="window.changeCalendarMonth(1)" class="calendar-month-nav-btn"><i class="fa-solid fa-chevron-right"></i></button>
		</div>
		<div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center">
			<span style="font-weight:600;font-size:0.85rem;color:var(--text-main);margin-right:0.5rem">Filtruj:</span>
			<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer">
				<input type="checkbox" ${activeFilters.bok ? 'checked' : ''} onchange="window.toggleEventFilter('bok')" style="cursor:pointer">
				Biuro Obsługi Klienta
			</label>
			<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer">
				<input type="checkbox" ${activeFilters.booking ? 'checked' : ''} onchange="window.toggleEventFilter('booking')" style="cursor:pointer">
				Booking
			</label>
			<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer">
				<input type="checkbox" ${activeFilters.bilety ? 'checked' : ''} onchange="window.toggleEventFilter('bilety')" style="cursor:pointer">
				Bilety lotnicze
			</label>
			<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer">
				<input type="checkbox" ${activeFilters.ksiegowosc ? 'checked' : ''} onchange="window.toggleEventFilter('ksiegowosc')" style="cursor:pointer">
				Księgowość
			</label>
			<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;cursor:pointer">
				<input type="checkbox" ${activeFilters.marketing ? 'checked' : ''} onchange="window.toggleEventFilter('marketing')" style="cursor:pointer">
				Marketing
			</label>
		</div>
	</div>`;
	
	if (currentView === 'month') {
		return [
			dashboardHeader({
				title: 'Kalendarz',
				subtitle: 'Przegląd terminów — wyloty, raty, deadliny biletowe, spotkania z organizatorami',
				actions: [
					viewToggleButton,
					button({ label: 'Dodaj zdarzenie', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Zdarzeń w tym miesiącu', value: '18', icon: 'fa-solid fa-calendar-days', iconTone: 'blue' })}
				${statCard({ title: 'Pilnych terminów', value: '3', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange' })}
				${statCard({ title: 'Wylotów w maju', value: '2', icon: 'fa-solid fa-plane-departure', iconTone: 'green' })}
				${statCard({ title: 'Spotkań zaplanowanych', value: '4', icon: 'fa-solid fa-video', iconTone: 'purple' })}
			</div>`,
			`<div class="panel"><div class="panel-body" style="padding-top:0.75rem">${navAndFiltersSection + renderMonthView() + legendInline}</div></div>`
		].join('');
	} else {
		return [
			dashboardHeader({
				title: 'Kalendarz',
				subtitle: 'Przegląd terminów — wyloty, raty, deadliny biletowe, spotkania z organizatorami',
				actions: [
					viewToggleButton,
					button({ label: 'Dodaj zdarzenie', icon: 'fa-solid fa-plus' })
				]
			}),
			`<div class="stats-grid">
				${statCard({ title: 'Zdarzeń w tym miesiącu', value: '18', icon: 'fa-solid fa-calendar-days', iconTone: 'blue' })}
				${statCard({ title: 'Pilnych terminów', value: '3', icon: 'fa-solid fa-triangle-exclamation', iconTone: 'orange' })}
				${statCard({ title: 'Wylotów w maju', value: '2', icon: 'fa-solid fa-plane-departure', iconTone: 'green' })}
				${statCard({ title: 'Spotkań zaplanowanych', value: '4', icon: 'fa-solid fa-video', iconTone: 'purple' })}
			</div>`,
			`<div class="dashboard-grid" style="grid-template-columns:3fr 1fr">
				${panel({ title: 'Kwiecień 2026 — terminy i zdarzenia', body: renderListView() })}
				<div style="display:flex;flex-direction:column;gap:1rem">
					${panel({ title: 'Legenda', body: legendHtml })}
					${panel({ title: 'Najbliższe 7 dni', body: `
						<div class="cal-upcoming">
							<div class="cal-upcoming-item urgent"><i class="fa-solid fa-plane-departure"></i>  <div><strong>01.04</strong><p>WL-01 — wylot o 06:50</p></div></div>
							<div class="cal-upcoming-item"><i class="fa-solid fa-money-bill-wave"></i> <div><strong>05.04</strong><p>Rata IT-03</p></div></div>
							<div class="cal-upcoming-item urgent"><i class="fa-solid fa-triangle-exclamation"></i> <div><strong>07.04</strong><p>Deadline bilety LO</p></div></div>
						</div>
					` })}
				</div>
			</div>`
		].join('');
	}
}

window.KalendarzView = { renderKalendarz };
console.log('KalendarzView registered:', typeof window.KalendarzView.renderKalendarz);
})();
