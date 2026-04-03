(function () {
	const TOAST_META = {
		info: { icon: 'fa-solid fa-circle-info', className: 'feedback-toast-info' },
		success: { icon: 'fa-solid fa-circle-check', className: 'feedback-toast-success' },
		error: { icon: 'fa-solid fa-triangle-exclamation', className: 'feedback-toast-error' }
	};

	function createToastController(element) {
		function hide() {
			element.classList.remove('show');
			element.hidden = true;
			element.setAttribute('aria-hidden', 'true');
			element.innerHTML = '';
		}

		function show(message, tone = 'info') {
			if (!message) {
				hide();
				return;
			}
			const meta = TOAST_META[tone] || TOAST_META.info;
			element.hidden = false;
			element.setAttribute('aria-hidden', 'false');
			element.className = `feedback-toast ${meta.className}`;
			element.innerHTML = `<i class="${meta.icon}"></i><span>${message}</span>`;
			element.classList.add('show');
			clearTimeout(show.timeoutId);
			show.timeoutId = setTimeout(hide, 3200);
		}

		hide();

		return {
			show,
			hide
		};
	}

	window.FeedbackToast = { createToastController };
})();