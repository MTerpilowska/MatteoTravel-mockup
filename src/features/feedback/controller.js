(function () {
	function createFeedbackController({ dom, state, toast, config, api, panel }) {
		const { ROLE_OPTIONS, PAGE_OPTIONS, STATUS_META, STORAGE_KEYS, createViewLabel } = config;
		const { fetchFeedback, createFeedback, addReply, updateStatus } = api;
		const { formatSummary, listMarkup, historyMarkup, draftMarkup, threadMarkup, emptyThreadMarkup } = panel;

		function getAuthorName() {
			return dom.feedbackAuthorInput.value.trim() || 'Anonim';
		}

		function persistAuthorName() {
			localStorage.setItem(STORAGE_KEYS.authorName, getAuthorName());
		}

		function restoreAuthorName() {
			dom.feedbackAuthorInput.value = localStorage.getItem(STORAGE_KEYS.authorName) || '';
		}

		function populateSelect(select, items, selectedKey) {
			select.innerHTML = items.map((item) => `<option value="${item.key}" ${item.key === selectedKey ? 'selected' : ''}>${item.label}</option>`).join('');
		}

		function formatDateTime(dateValue) {
			return new Intl.DateTimeFormat('pl-PL', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}).format(new Date(dateValue));
		}

		function formatRelativeTime(dateValue) {
			const diffMinutes = Math.max(1, Math.round((Date.now() - new Date(dateValue).getTime()) / 60000));
			if (diffMinutes < 60) return `${diffMinutes} min temu`;
			const diffHours = Math.round(diffMinutes / 60);
			if (diffHours < 24) return `${diffHours} godz. temu`;
			return `${Math.round(diffHours / 24)} dni temu`;
		}

		function getCurrentContextLabel() {
			return createViewLabel(state.selectedRoleFilter, state.selectedPageFilter);
		}

		function getActiveFeedbackItems() {
			return state.feedbackItems.filter((item) => item.status !== 'resolved');
		}

		function getHistoryItems() {
			return state.feedbackItems.filter((item) => item.status === 'resolved');
		}

		function getSelectedFeedback() {
			return getActiveFeedbackItems().find((item) => item.id === state.selectedFeedbackId) || null;
		}

		function renderFeedbackLayer() {
			dom.mainContentArea.querySelector('.feedback-layer')?.remove();
			if (!state.markersVisible) {
				return;
			}
			const layer = document.createElement('div');
			layer.className = 'feedback-layer';
			layer.style.height = `${dom.mainContentArea.scrollHeight}px`;
			getActiveFeedbackItems().forEach((item, index) => {
				const marker = document.createElement('button');
				marker.type = 'button';
				marker.className = `feedback-marker ${STATUS_META[item.status].className}`;
				marker.dataset.feedbackId = item.id;
				marker.style.left = `${item.x * 100}%`;
				marker.style.top = `${item.y * dom.mainContentArea.scrollHeight}px`;
				marker.innerHTML = `<span>${index + 1}</span>`;
				marker.title = item.title;
				layer.appendChild(marker);
			});
			dom.mainContentArea.appendChild(layer);
		}

		function renderPanel() {
			const activeItems = getActiveFeedbackItems();
			const historyItems = getHistoryItems();
			const selectedFeedback = getSelectedFeedback();

			dom.feedbackContextLabel.textContent = getCurrentContextLabel();
			dom.feedbackSummary.innerHTML = formatSummary(activeItems);
			dom.feedbackCountLabel.textContent = `${activeItems.length} aktywnych`;
			dom.feedbackTabBadge.textContent = String(activeItems.length);
			dom.feedbackToggleMarkersBtn.innerHTML = state.markersVisible ? '<i class="fa-solid fa-location-crosshairs"></i> Ukryj punkty' : '<i class="fa-solid fa-location-dot"></i> Pokaż punkty';
			dom.feedbackToggleHistoryBtn.innerHTML = state.historyVisible ? '<i class="fa-regular fa-clock"></i> Ukryj historię' : '<i class="fa-regular fa-clock"></i> Pokaż historię';

			const activeMarkup = listMarkup(activeItems, state.selectedFeedbackId, formatRelativeTime);
			const historySectionMarkup = state.historyVisible
				? `<div class="feedback-history-block"><div class="feedback-history-head"><strong>Historia zamknietych uwag</strong><span>${historyItems.length}</span></div>${historyMarkup(historyItems, formatRelativeTime)}</div>`
				: '';
			dom.feedbackList.innerHTML = `${activeMarkup}${historySectionMarkup}`;

			if (state.selectedFeedbackId) {
				dom.feedbackThread.innerHTML = threadMarkup(selectedFeedback, formatDateTime);
			} else {
				dom.feedbackThread.innerHTML = emptyThreadMarkup();
			}

			dom.feedbackPanel.classList.toggle('show', state.feedbackOpen);
			dom.feedbackPanel.setAttribute('aria-hidden', String(!state.feedbackOpen));
			dom.feedbackCaptureHint.classList.toggle('show', state.captureMode);
			dom.feedbackDraftModal.hidden = !state.pendingDraft;
			dom.feedbackDraftModal.setAttribute('aria-hidden', String(!state.pendingDraft));
			dom.feedbackDraftDialog.innerHTML = state.pendingDraft ? draftMarkup(getCurrentContextLabel(), state.pendingDraft) : '';
			document.body.classList.toggle('feedback-draft-open', Boolean(state.pendingDraft));
			document.body.classList.toggle('feedback-capture-mode', state.captureMode);
		}

		async function loadFeedback() {
			state.loadingFeedback = true;
			try {
				const result = await fetchFeedback(state.selectedRoleFilter, state.selectedPageFilter);
				state.feedbackItems = (result.items || []).sort((left, right) => new Date(right.updatedAt) - new Date(left.updatedAt));
				if (!getActiveFeedbackItems().some((item) => item.id === state.selectedFeedbackId)) {
					state.selectedFeedbackId = null;
				}
				renderFeedbackLayer();
				renderPanel();
			} catch (error) {
				toast.show(error.message, 'error');
			} finally {
				state.loadingFeedback = false;
			}
		}

		async function captureCurrentView() {
			if (typeof html2canvas !== 'function') return '';
			try {
				const canvas = await html2canvas(dom.mainContent, {
					backgroundColor: '#f8fafc',
					useCORS: true,
					logging: false,
					ignoreElements: (element) => element.dataset?.html2canvasIgnore === 'true'
				});
				return canvas.toDataURL('image/png', 0.92);
			} catch (error) {
				return '';
			}
		}

		function resetDraft() {
			state.pendingDraft = null;
			state.captureMode = false;
		}

		async function beginDraftAtPoint(event) {
			if (!state.captureMode || event.target.closest('.feedback-marker')) return;
			const bounds = dom.mainContentArea.getBoundingClientRect();
			const clickX = event.clientX - bounds.left;
			const clickY = event.clientY - bounds.top + dom.mainContentArea.scrollTop;
			state.pendingDraft = {
				x: Math.min(0.98, Math.max(0.02, clickX / bounds.width)),
				y: Math.min(0.98, Math.max(0.02, clickY / dom.mainContentArea.scrollHeight)),
				screenshot: ''
			};
			state.captureMode = false;
			renderPanel();
			const screenshot = await captureCurrentView();
			if (state.pendingDraft) {
				state.pendingDraft.screenshot = screenshot;
				renderPanel();
			}
		}

		async function submitDraft(form) {
			if (!state.pendingDraft) return;
			persistAuthorName();
			const formData = new FormData(form);
			try {
				await createFeedback({
					author: getAuthorName(),
					roleKey: state.selectedRoleFilter,
					pageKey: state.selectedPageFilter,
					viewLabel: getCurrentContextLabel(),
					title: formData.get('title').toString().trim(),
					description: formData.get('description').toString().trim(),
					category: formData.get('category').toString(),
					priority: formData.get('priority').toString(),
					x: state.pendingDraft.x,
					y: state.pendingDraft.y,
					screenshot: state.pendingDraft.screenshot
				});
				resetDraft();
				await loadFeedback();
				toast.show('Uwaga zostala zapisana.', 'success');
			} catch (error) {
				toast.show(error.message, 'error');
			}
		}

		async function submitReply(form) {
			const selected = getSelectedFeedback();
			if (!selected) return;
			persistAuthorName();
			const formData = new FormData(form);
			const reply = formData.get('reply').toString().trim();
			if (!reply) return;
			try {
				await addReply(selected.id, { author: getAuthorName(), role: 'Uzytkownik', text: reply });
				await loadFeedback();
				state.selectedFeedbackId = selected.id;
				toast.show('Dodano odpowiedz.', 'success');
			} catch (error) {
				toast.show(error.message, 'error');
			}
		}

		async function changeStatus(status) {
			const selected = getSelectedFeedback();
			if (!selected) return;
			persistAuthorName();
			try {
				await updateStatus(selected.id, { author: getAuthorName(), status });
				if (status === 'resolved') {
					state.selectedFeedbackId = null;
				}
				await loadFeedback();
				toast.show('Status uwagi zostal zmieniony.', 'success');
			} catch (error) {
				toast.show(error.message, 'error');
			}
		}

		function focusSelectedMarker() {
			const selected = getSelectedFeedback();
			if (!selected) return;
			state.markersVisible = true;
			renderFeedbackLayer();
			renderPanel();
			dom.mainContentArea.scrollTo({
				top: Math.max(0, selected.y * dom.mainContentArea.scrollHeight - dom.mainContentArea.clientHeight / 2),
				behavior: 'smooth'
			});
			const marker = dom.mainContentArea.querySelector(`[data-feedback-id="${selected.id}"]`);
			if (marker) {
				marker.classList.add('pulse');
				setTimeout(() => marker.classList.remove('pulse'), 1200);
			}
		}

		function applySelectedView() {
			state.selectedRoleFilter = dom.feedbackRoleFilter.value;
			state.selectedPageFilter = dom.feedbackPageFilter.value;
			state.selectedFeedbackId = null;
			resetDraft();
			loadFeedback();
		}

		function syncToCurrentView() {
			state.selectedRoleFilter = state.currentRole;
			state.selectedPageFilter = state.currentPage;
			dom.feedbackRoleFilter.value = state.currentRole;
			dom.feedbackPageFilter.value = state.currentPage;
			state.selectedFeedbackId = null;
			loadFeedback();
		}

		function bindEvents() {
			dom.feedbackTab.addEventListener('click', () => {
				state.feedbackOpen = !state.feedbackOpen;
				renderPanel();
			});
			dom.feedbackCloseBtn.addEventListener('click', () => {
				state.feedbackOpen = false;
				renderPanel();
			});
			dom.feedbackNewBtn.addEventListener('click', () => {
				state.captureMode = true;
				state.pendingDraft = null;
				state.feedbackOpen = true;
				renderPanel();
			});
			dom.feedbackCancelCapture.addEventListener('click', () => {
				resetDraft();
				renderPanel();
			});
			dom.feedbackApplyViewBtn.addEventListener('click', applySelectedView);
			dom.feedbackSyncCurrentBtn.addEventListener('click', syncToCurrentView);
			dom.feedbackToggleMarkersBtn.addEventListener('click', () => {
				state.markersVisible = !state.markersVisible;
				renderFeedbackLayer();
				renderPanel();
			});
			dom.feedbackToggleHistoryBtn.addEventListener('click', () => {
				state.historyVisible = !state.historyVisible;
				renderPanel();
			});
			dom.feedbackAuthorInput.addEventListener('change', persistAuthorName);
			dom.mainContentArea.addEventListener('click', beginDraftAtPoint);
			dom.mainContentArea.addEventListener('click', (event) => {
				const marker = event.target.closest('.feedback-marker');
				if (!marker) return;
				event.preventDefault();
				state.selectedFeedbackId = marker.dataset.feedbackId;
				state.feedbackOpen = true;
				renderPanel();
			});
			dom.feedbackList.addEventListener('click', (event) => {
				const item = event.target.closest('.feedback-list-item');
				if (!item) return;
				state.selectedFeedbackId = item.dataset.feedbackId;
				renderPanel();
			});
			dom.feedbackThread.addEventListener('click', (event) => {
				const actionButton = event.target.closest('[data-action]');
				if (!actionButton) return;
				const { action } = actionButton.dataset;
				if (action === 'cancel-draft') {
					resetDraft();
					renderPanel();
					return;
				}
				if (action === 'focus-marker') {
					focusSelectedMarker();
					return;
				}
				if (action === 'set-status') {
					changeStatus(actionButton.dataset.status);
				}
			});
			dom.feedbackDraftModal.addEventListener('click', (event) => {
				const actionButton = event.target.closest('[data-action]');
				if (!actionButton) return;
				if (actionButton.dataset.action === 'cancel-draft' || actionButton.dataset.action === 'close-draft-modal') {
					resetDraft();
					renderPanel();
				}
			});
			dom.feedbackThread.addEventListener('submit', (event) => {
				if (event.target.id === 'feedbackDraftForm') {
					event.preventDefault();
					submitDraft(event.target);
					return;
				}
				if (event.target.id === 'feedbackReplyForm') {
					event.preventDefault();
					submitReply(event.target);
				}
			});
			dom.feedbackDraftModal.addEventListener('submit', (event) => {
				if (event.target.id !== 'feedbackDraftForm') return;
				event.preventDefault();
				submitDraft(event.target);
			});
			document.addEventListener('keydown', (event) => {
				if (event.key !== 'Escape') return;
				if (state.pendingDraft) {
					resetDraft();
					renderPanel();
				}
			});
			window.addEventListener('resize', renderFeedbackLayer);
			dom.mainContentArea.addEventListener('scroll', () => {
				dom.mainContentArea.querySelector('.feedback-layer')?.style.setProperty('height', `${dom.mainContentArea.scrollHeight}px`);
			});
		}

		function onViewContextChange() {
			renderFeedbackLayer();
			renderPanel();
		}

		function init() {
			populateSelect(dom.feedbackRoleFilter, ROLE_OPTIONS, state.selectedRoleFilter);
			populateSelect(dom.feedbackPageFilter, PAGE_OPTIONS, state.selectedPageFilter);
			restoreAuthorName();
			bindEvents();
			renderPanel();
			loadFeedback();
		}

		return {
			init,
			loadFeedback,
			renderFeedbackLayer,
			renderPanel,
			onViewContextChange
		};
	}

	window.FeedbackController = { createFeedbackController };
})();