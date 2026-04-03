(function () {
	function createLayoutController({ dom }) {
		function setCurrentDate() {
			dom.currentDate.textContent = new Intl.DateTimeFormat('pl-PL', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			}).format(new Date());
		}

		function openModal(modal) {
			modal?.classList.add('show');
		}

		function closeModal(modal) {
			modal?.classList.remove('show');
		}

		function bindEvents() {
			dom.sidebarToggle?.addEventListener('click', () => dom.sidebar.classList.toggle('collapsed'));
			dom.mobileToggle?.addEventListener('click', () => dom.sidebar.classList.toggle('mobile-open'));
			dom.notificationBtn?.addEventListener('click', (event) => {
				event.stopPropagation();
				dom.notificationPanel.classList.toggle('show');
			});
			dom.quickAddBtn?.addEventListener('click', () => openModal(dom.quickAddModal));
			dom.modalClose?.addEventListener('click', () => closeModal(dom.quickAddModal));

			document.addEventListener('click', (event) => {
				if (dom.notificationPanel?.classList.contains('show') && !event.target.closest('.topbar-actions')) {
					dom.notificationPanel.classList.remove('show');
				}
			});

			window.addEventListener('click', (event) => {
				if (event.target === dom.quickAddModal) {
					closeModal(dom.quickAddModal);
				}
			});
		}

		function init() {
			setCurrentDate();
			bindEvents();
		}

		return { init };
	}

	window.LayoutController = { createLayoutController };
})();