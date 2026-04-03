(function () {
	function getDomRefs() {
		return {
			roleBtn: document.getElementById('roleDropdownBtn'),
			roleMenu: document.getElementById('roleDropdownMenu'),
			roleOptions: Array.from(document.querySelectorAll('.role-option')),
			currentRoleName: document.getElementById('currentRoleName'),
			navItems: Array.from(document.querySelectorAll('.nav-item[data-page]')),
			mainContentArea: document.getElementById('contentArea'),
			mainContent: document.getElementById('mainContent'),
			sidebar: document.getElementById('sidebar'),
			sidebarToggle: document.getElementById('sidebarToggle'),
			mobileToggle: document.getElementById('mobileToggle'),
			notificationBtn: document.getElementById('notificationBtn'),
			notificationPanel: document.getElementById('notificationPanel'),
			currentDate: document.getElementById('currentDate'),
			quickAddModal: document.getElementById('quickAddModal'),
			quickAddBtn: document.getElementById('quickAddBtn'),
			modalClose: document.getElementById('quickAddClose'),
			feedbackTab: document.getElementById('feedbackTab'),
			feedbackTabBadge: document.getElementById('feedbackTabBadge'),
			feedbackPanel: document.getElementById('feedbackPanel'),
			feedbackCloseBtn: document.getElementById('feedbackCloseBtn'),
			feedbackNewBtn: document.getElementById('feedbackNewBtn'),
			feedbackSummary: document.getElementById('feedbackSummary'),
			feedbackList: document.getElementById('feedbackList'),
			feedbackThread: document.getElementById('feedbackThread'),
			feedbackCountLabel: document.getElementById('feedbackCountLabel'),
			feedbackContextLabel: document.getElementById('feedbackContextLabel'),
			feedbackCaptureHint: document.getElementById('feedbackCaptureHint'),
			feedbackCancelCapture: document.getElementById('feedbackCancelCapture'),
			feedbackDraftModal: document.getElementById('feedbackDraftModal'),
			feedbackDraftDialog: document.getElementById('feedbackDraftDialog'),
			feedbackToast: document.getElementById('feedbackToast'),
			feedbackAuthorInput: document.getElementById('feedbackAuthorInput'),
			feedbackRoleFilter: document.getElementById('feedbackRoleFilter'),
			feedbackPageFilter: document.getElementById('feedbackPageFilter'),
			feedbackApplyViewBtn: document.getElementById('feedbackApplyViewBtn'),
			feedbackSyncCurrentBtn: document.getElementById('feedbackSyncCurrentBtn'),
			feedbackToggleMarkersBtn: document.getElementById('feedbackToggleMarkersBtn'),
			feedbackToggleHistoryBtn: document.getElementById('feedbackToggleHistoryBtn')
		};
	}

	window.AppDom = { getDomRefs };
})();