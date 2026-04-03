(function () {
	function createAppState() {
		return {
			currentRole: 'admin',
			currentPage: 'dashboard',
			selectedRoleFilter: 'admin',
			selectedPageFilter: 'dashboard',
			feedbackOpen: false,
			captureMode: false,
			markersVisible: false,
			historyVisible: false,
			selectedFeedbackId: null,
			pendingDraft: null,
			feedbackItems: [],
			loadingFeedback: false
		};
	}

	window.AppState = { createAppState };
})();