document.addEventListener('DOMContentLoaded', () => {
	const dom = window.AppDom.getDomRefs();
	const state = window.AppState.createAppState();
	const toast = window.FeedbackToast.createToastController(dom.feedbackToast);
	const layout = window.LayoutController.createLayoutController({ dom });

	const feedback = window.FeedbackController.createFeedbackController({
		dom,
		state,
		toast,
		config: window.AppConfig,
		api: window.FeedbackApi,
		panel: window.FeedbackPanel
	});

	function renderCurrentView() {
		dom.mainContentArea.innerHTML = window.ViewRegistry.renderView(state.currentRole, state.currentPage);
		feedback.onViewContextChange();
	}

	const navigation = window.NavigationController.createNavigationController({
		dom,
		state,
		getRoleLabel: window.AppConfig.getRoleLabel,
                getRolePages: window.AppConfig.getRolePages,
		onChange: renderCurrentView
	});

	layout.init();
	feedback.init();
	navigation.init();
	window.SearchController.createSearchController().init();
	window.DemoInteractions.init();
});