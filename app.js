/**
 * app.js — Main application controller for Cooch Behar Healthcare Directory.
 * Orchestrates UI rendering, search/filter, modals, feedback, and PWA events.
 * Depends on DataService, Utils, PngShare, and CONFIG.
 */
const App = (() => {
    // State
    let allDoctors = [];
    let currentFilters = {
        searchQuery: '',
        specialty: null,
        area: ''
    };
    let selectedSpecialty = null;
    let isOnline = navigator.onLine;

    // DOM elements (cached after DOM ready)
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // Elements references
    let dom = {};

    /**
     * Initialise the application after DOM is ready.
     */
    async function init() {
        cacheDom();
        setupEventListeners();
        setupOnlineStatus();
        await loadInitialData();
        startVisitorRefresh();
        checkNotice();
    }

    function cacheDom() {
        dom.announcementBar = $('#announcementBar');
        dom.announcementText = $('#announcementText');
        dom.announcementDismiss = $('#announcementDismiss');
        dom.hamburgerBtn = $('#hamburgerBtn');
        dom.slideMenu = $('#slideMenu');
        dom.slideMenuClose = $('#slideMenuClose');
        dom.slideMenuBackdrop = $('#slideMenuBackdrop');
        dom.searchInput = $('#searchInput');
        dom.searchClear = $('#searchClear');
        dom.specialtyPills = $('#specialtyPills');
        dom.areaFilter = $('#areaFilter');
        dom.visitorCount = $('#visitorCount');
        dom.resultsInfo = $('#resultsInfo');
        dom.doctorCards = $('#doctorCards');
        dom.loadingSkeleton = $('#loadingSkeleton');
        dom.emptyState = $('#emptyState');
        dom.errorState = $('#errorState');
        dom.retryBtn = $('#retryBtn');
        dom.fabAddDoctor = $('#fabAddDoctor');
        dom.fabFeedback = $('#fabFeedback');
        dom.addDoctorModal = $('#addDoctorModal');
        dom.addDoctorForm = $('#addDoctorForm');
        dom.addDoctorClose = $('#addDoctorClose');
        dom.submitDoctorBtn = $('#submitDoctorBtn');
        dom.addDoctorSuccess = $('#addDoctorSuccess');
        dom.addDoctorDone = $('#addDoctorDone');
        dom.feedbackModal = $('#feedbackModal');
        dom.feedbackClose = $('#feedbackClose');
        dom.feedbackText = $('#feedbackText');
        dom.feedbackImage = $('#feedbackImage');
        dom.feedbackVoiceBtn = $('#feedbackVoiceBtn');
        dom.voiceStatus = $('#voiceStatus');
        dom.voiceTimer = $('#voiceTimer');
        dom.voiceStopBtn = $('#voiceStopBtn');
        dom.feedbackSubmit = $('#feedbackSubmit');
        dom.feedbackSuccess = $('#feedbackSuccess');
        dom.noticeModal = $('#noticeModal');
        dom.noticeClose = $('#noticeClose');
        dom.noticeModalBody = $('#noticeModalBody');
        dom.detailModal = $('#detailModal');
        dom.detailClose = $('#detailClose');
        dom.detailModalBody = $('#detailModalBody');
        dom.detailModalTitle = $('#detailModalTitle');
        dom.toastContainer = $('#toastContainer');
        dom.shareRenderTarget = $('#shareRenderTarget');
        dom.mainContent = $('#mainContent');
    }

    function setupEventListeners() {
        // Hamburger menu
        dom.hamburgerBtn.addEventListener('click', toggleSlideMenu);
        dom.slideMenuClose.addEventListener('click', closeSlideMenu);
        dom.slideMenuBackdrop.addEventListener('click', closeSlideMenu);

        // Search
        dom.searchInput.addEventListener('input', Utils.debounce(handleSearch, CONFIG.SEARCH_DEBOUNCE_MS));
        dom.searchClear.addEventListener('click', clearSearch);

        // Area filter
        dom.areaFilter.addEventListener('change', handleAreaFilter);

        // Modals
        dom.fabAddDoctor.addEventListener('click', openAddDoctorModal);
        dom.addDoctorClose.addEventListener('click', closeAddDoctorModal);
        dom.addDoctorDone.addEventListener('click', closeAddDoctorModal);
        dom.addDoctorForm.addEventListener('submit', handleDoctorSubmit);

        dom.fabFeedback.addEventListener('click', openFeedbackModal);
        dom.feedbackClose.addEventListener('click', closeFeedbackModal);
        dom.feedbackSubmit.addEventListener('click', handleFeedbackSubmit);
        dom.feedbackVoiceBtn.addEventListener('click', toggleVoiceRecording);
        dom.voiceStopBtn.addEventListener('click', stopVoiceRecording);

        // Notice modal close
        dom.noticeClose.addEventListener('click', () => dom.noticeModal.hidden = true);

        // Detail modal close
        dom.detailClose.addEventListener('click', () => dom.detailModal.hidden = true);

        // Retry button
        dom.retryBtn.addEventListener('click', loadInitialData);

        // Announcement dismiss
        dom.announcementDismiss.addEventListener('click', dismissAnnouncement);

        // Delegate card actions (call, whatsapp, share, details)
        dom.doctorCards.addEventListener('click', handleCardAction);

        // Close modals on backdrop click (generic)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__backdrop')) {
                e.target.closest('.modal').hidden = true;
            }
        });
    }

    async function loadInitialData() {
        showLoading(true);
        hideError();
        try {
            allDoctors = await DataService.fetchDoctors(true);
            renderFilters();
            applyFiltersAndRender();
            // Record pageview (non-blocking)
            DataService.recordPageview();
        } catch (err) {
            showError();
        } finally {
            showLoading(false);
        }
    }

    function renderFilters() {
        renderSpecialtyPills();
        renderAreaOptions();
    }

    function renderSpecialtyPills() {
        const specialties = [...new Set(allDoctors.map(d => d.specialty).filter(Boolean))].sort();
        dom.specialtyPills.innerHTML = '';
        // "All" pill
        const allPill = createPill('All', null, selectedSpecialty === null);
        dom.specialtyPills.appendChild(allPill);
        specialties.forEach(spec => {
            const pill = createPill(spec, spec, selectedSpecialty === spec);
            dom.specialtyPills.appendChild(pill);
        });
    }

    function createPill(label, value, isActive) {
        const pill = document.createElement('span');
        pill.className = `specialty-pill${isActive ? ' specialty-pill--active' : ''}`;
        pill.textContent = label;
        pill.dataset.value = value || '';
        pill.addEventListener('click', () => {
            selectedSpecialty = value || null;
            renderSpecialtyPills(); // update active states
            applyFiltersAndRender();
        });
        return pill;
    }

    function renderAreaOptions() {
        const areas = [...new Set(allDoctors.map(d => d.area).filter(Boolean))].sort();
        dom.areaFilter.innerHTML = '<option value="">📍 All Areas</option>';
        areas.forEach(area => {
            const opt = document.createElement('option');
            opt.value = area;
            opt.textContent = area;
            dom.areaFilter.appendChild(opt);
        });
        dom.areaFilter.value = currentFilters.area;
    }

    function handleSearch(e) {
        currentFilters.searchQuery = e.target.value.trim();
        dom.searchClear.hidden = currentFilters.searchQuery === '';
        applyFiltersAndRender();
    }

    function clearSearch() {
        dom.searchInput.value = '';
        currentFilters.searchQuery = '';
        dom.searchClear.hidden = true;
        applyFiltersAndRender();
        dom.searchInput.focus();
    }

    function handleAreaFilter(e) {
        currentFilters.area = e.target.value;
        applyFiltersAndRender();
    }

    function applyFiltersAndRender() {
        let filtered = [...allDoctors];

        // Specialty filter
        if (selectedSpecialty) {
            filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
        }

        // Area filter
        if (currentFilters.area) {
            filtered = filtered.filter(doc => doc.area === currentFilters.area);
        }

        // Search filter
        if (currentFilters.searchQuery) {
            const query = Utils.normalize(currentFilters.searchQuery);
            filtered = filtered.filter(doc => {
                const searchable = Utils.getSearchableText(doc);
                return Utils.fuzzyMatchScore(query, searchable) > 0;
            });
            // Sort by relevance score
            filtered.sort((a, b) => {
                const scoreA = Utils.fuzzyMatchScore(query, Utils.getSearchableText(a));
                const scoreB = Utils.fuzzyMatchScore(query, Utils.getSearchableText(b));
                return scoreB - scoreA;
            });
        }

        renderDoctorCards(filtered);
        dom.resultsInfo.textContent = `${filtered.length} doctor${filtered.length !== 1 ? 's' : ''} found`;
        dom.emptyState.hidden = filtered.length > 0 || allDoctors.length === 0;
    }

    function renderDoctorCards(doctors) {
        dom.doctorCards.innerHTML = '';
        if (doctors.length === 0) {
            dom.emptyState.hidden = false;
            return;
        }
        dom.emptyState.hidden = true;
        doctors.forEach(doc => {
            dom.doctorCards.appendChild(createDoctorCard(doc));
        });
    }

    function createDoctorCard(doc) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.doctorId = doc.doctor_id;
        card.dataset.doctor = JSON.stringify(doc); // Store for sharing/details

        const verificationBadge = doc.verification && doc.verification.toLowerCase().includes('verified')
            ? `<span class="card__badge card__badge--verified">✅ Verified</span>`
            : `<span class="card__badge card__badge--listed">🟡 Listed by community</span>`;

        const sessionsHTML = [doc.session_1, doc.session_2, doc.session_3]
            .filter(s => s && s.trim() !== '')
            .map(s => `<span class="card__session-item">🕐 ${Utils.sanitizeHTML(s)}</span>`)
            .join('');

        const timingNote = doc.time_description ? `<div class="card__session-note">📝 ${Utils.sanitizeHTML(doc.time_description)}</div>` : '';

        card.innerHTML = `
            <div class="card__header">
                <h3 class="card__name">👨‍⚕️ ${Utils.sanitizeHTML(doc.name)}</h3>
                <span class="card__specialty">${Utils.sanitizeHTML(doc.specialty)}</span>
            </div>
            ${doc.degree ? `<div class="card__degree">${Utils.sanitizeHTML(doc.degree)}</div>` : ''}
            <div class="card__chamber">🏥 ${Utils.sanitizeHTML(doc.chamber_name)}</div>
            <div class="card__address">📍 ${Utils.sanitizeHTML(doc.chamber_address || doc.area)}, ${Utils.sanitizeHTML(doc.city || 'Cooch Behar')}</div>
            <div class="card__sessions">${sessionsHTML}${timingNote}</div>
            <div class="card__fees">💰 ${Utils.sanitizeHTML(doc.fees || 'Not specified')}</div>
            ${verificationBadge}
            <div class="card__actions">
                ${doc.phone ? `<a href="tel:${Utils.cleanPhoneForTel(doc.phone)}" class="card__action-btn" aria-label="Call doctor">📞 Call</a>` : ''}
                ${doc.whatsapp ? `<a href="https://wa.me/${Utils.cleanPhoneForTel(doc.whatsapp)}" target="_blank" rel="noopener" class="card__action-btn" aria-label="WhatsApp">💬 WhatsApp</a>` : ''}
                <button class="card__action-btn card__share-btn" data-action="share" aria-label="Share doctor">📤 Share</button>
                <button class="card__action-btn card__details-btn" data-action="details" aria-label="View details">🔍 Details</button>
            </div>
            <div class="card__footer">
                🕒 Updated: ${doc.submitted_at ? new Date(doc.submitted_at).toLocaleDateString() : 'Unknown'}
            </div>
        `;
        return card;
    }

    function handleCardAction(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        const card = btn.closest('.card');
        if (!card) return;
        const docData = JSON.parse(card.dataset.doctor);

        if (btn.classList.contains('card__share-btn')) {
            PngShare.generateAndShare(docData, card);
        } else if (btn.classList.contains('card__details-btn')) {
            showDoctorDetails(docData);
        }
    }

    function showDoctorDetails(doc) {
        dom.detailModalTitle.textContent = `Dr. ${doc.name}`;
        dom.detailModalBody.innerHTML = `
            <p><strong>Specialty:</strong> ${Utils.sanitizeHTML(doc.specialty)}</p>
            <p><strong>Degree:</strong> ${Utils.sanitizeHTML(doc.degree || 'N/A')}</p>
            <p><strong>Chamber:</strong> ${Utils.sanitizeHTML(doc.chamber_name)}</p>
            <p><strong>Address:</strong> ${Utils.sanitizeHTML(doc.chamber_address || doc.area)}, ${Utils.sanitizeHTML(doc.city)}</p>
            <p><strong>Phone:</strong> ${doc.phone ? Utils.sanitizeHTML(doc.phone) : 'N/A'}</p>
            <p><strong>WhatsApp:</strong> ${doc.whatsapp ? Utils.sanitizeHTML(doc.whatsapp) : 'N/A'}</p>
            <p><strong>Sessions:</strong><br>${[doc.session_1, doc.session_2, doc.session_3].filter(Boolean).map(s => Utils.sanitizeHTML(s)).join('<br>') || 'N/A'}</p>
            <p><strong>Timing Note:</strong> ${Utils.sanitizeHTML(doc.time_description || 'None')}</p>
            <p><strong>Fees:</strong> ${Utils.sanitizeHTML(doc.fees || 'Not specified')}</p>
            <p><strong>Verification:</strong> ${doc.verification || 'Listed'}</p>
            <p><strong>Last Updated:</strong> ${doc.submitted_at || 'Unknown'}</p>
        `;
        dom.detailModal.hidden = false;
    }

    // ---------- Modals ----------
    function openAddDoctorModal() {
        dom.addDoctorModal.hidden = false;
        dom.addDoctorSuccess.hidden = true;
        dom.addDoctorForm.reset();
        document.getElementById('docCity').value = CONFIG.DEFAULT_CITY;
    }
    function closeAddDoctorModal() {
        dom.addDoctorModal.hidden = true;
    }
    async function handleDoctorSubmit(e) {
        e.preventDefault();
        dom.submitDoctorBtn.disabled = true;
        dom.submitDoctorBtn.textContent = 'Submitting...';
        const formData = {
            name: document.getElementById('docName').value,
            specialty: document.getElementById('docSpecialty').value,
            degree: document.getElementById('docDegree').value,
            chamber_name: document.getElementById('docChamber').value,
            chamber_address: document.getElementById('docAddress').value,
            area: document.getElementById('docArea').value,
            city: document.getElementById('docCity').value || CONFIG.DEFAULT_CITY,
            phone: document.getElementById('docPhone').value,
            whatsapp: document.getElementById('docWhatsApp').value,
            session_1: document.getElementById('docSession1').value,
            session_2: document.getElementById('docSession2').value,
            session_3: document.getElementById('docSession3').value,
            time_description: document.getElementById('docTimingNote').value,
            fees: document.getElementById('docFees').value,
            submitted_by: document.getElementById('submitterName').value,
            submitter_address: document.getElementById('submitterAddress').value,
            submitter_phone: document.getElementById('submitterPhone').value
        };
        try {
            const result = await DataService.submitDoctor(formData);
            if (result.success) {
                dom.addDoctorForm.hidden = true;
                dom.addDoctorSuccess.hidden = false;
                DataService.invalidateCache();
                // Reload data in background
                loadInitialData();
                showToast('Doctor added successfully!');
            } else {
                throw new Error('Server responded with error');
            }
        } catch (err) {
            showToast('Submission failed. Please try again.', true);
        } finally {
            dom.submitDoctorBtn.disabled = false;
            dom.submitDoctorBtn.textContent = 'Submit Doctor';
        }
    }

    function openFeedbackModal() {
        dom.feedbackModal.hidden = false;
        dom.feedbackSuccess.hidden = true;
        dom.feedbackText.value = '';
        dom.feedbackImage.value = '';
    }
    function closeFeedbackModal() {
        dom.feedbackModal.hidden = true;
    }
    async function handleFeedbackSubmit() {
        const text = dom.feedbackText.value.trim();
        const imageFile = dom.feedbackImage.files[0];
        if (!text && !imageFile) {
            showToast('Please enter a message or attach an image.', true);
            return;
        }
        dom.feedbackSubmit.disabled = true;
        dom.feedbackSubmit.textContent = 'Sending...';
        try {
            await sendFeedbackToTelegram(text, imageFile);
            dom.feedbackSuccess.hidden = false;
            dom.feedbackText.value = '';
            dom.feedbackImage.value = '';
            setTimeout(() => {
                dom.feedbackSuccess.hidden = true;
                closeFeedbackModal();
            }, 2000);
        } catch (err) {
            showToast('Feedback failed. Try again.', true);
        } finally {
            dom.feedbackSubmit.disabled = false;
            dom.feedbackSubmit.textContent = 'Submit Feedback';
        }
    }

    async function sendFeedbackToTelegram(text, imageFile) {
        const chatId = CONFIG.TELEGRAM_CHAT_ID;
        const token = CONFIG.TELEGRAM_BOT_TOKEN;
        const baseUrl = `https://api.telegram.org/bot${token}`;

        // If image exists, send photo with caption
        if (imageFile) {
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('photo', imageFile);
            formData.append('caption', text || 'Feedback image');
            const res = await fetch(`${baseUrl}/sendPhoto`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Image send failed');
        } else {
            // Send text message
            const res = await fetch(`${baseUrl}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: text })
            });
            if (!res.ok) throw new Error('Text send failed');
        }
    }

    // ---------- Voice Recording ----------
    let mediaRecorder = null;
    let voiceChunks = [];
    let voiceStartTime = 0;
    let voiceTimerInterval = null;

    async function toggleVoiceRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopVoiceRecording();
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            voiceChunks = [];
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorder.ondataavailable = e => voiceChunks.push(e.data);
            mediaRecorder.onstop = async () => {
                const blob = new Blob(voiceChunks, { type: 'audio/webm' });
                if (blob.size > 0) {
                    await sendVoiceToTelegram(blob);
                }
                stream.getTracks().forEach(track => track.stop());
                dom.voiceStatus.hidden = true;
                dom.feedbackVoiceBtn.hidden = false;
                clearInterval(voiceTimerInterval);
            };
            mediaRecorder.start();
            voiceStartTime = Date.now();
            dom.voiceStatus.hidden = false;
            dom.feedbackVoiceBtn.hidden = true;
            voiceTimerInterval = setInterval(updateVoiceTimer, 1000);
            // Auto-stop after max duration
            setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state === 'recording') stopVoiceRecording();
            }, CONFIG.VOICE_MAX_DURATION * 1000);
        } catch (err) {
            showToast('Microphone access denied.', true);
        }
    }

    function stopVoiceRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
    }

    function updateVoiceTimer() {
        const elapsed = Math.floor((Date.now() - voiceStartTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        dom.voiceTimer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    async function sendVoiceToTelegram(blob) {
        const chatId = CONFIG.TELEGRAM_CHAT_ID;
        const token = CONFIG.TELEGRAM_BOT_TOKEN;
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('voice', blob, 'feedback.ogg');
        try {
            await fetch(`https://api.telegram.org/bot${token}/sendVoice`, { method: 'POST', body: formData });
            showToast('Voice feedback sent.');
        } catch (e) {
            showToast('Voice send failed.', true);
        }
    }

    // ---------- Visitor Counter ----------
    async function updateVisitorCount() {
        const count = await DataService.fetchVisitorCount();
        dom.visitorCount.textContent = count.toLocaleString();
    }
    function startVisitorRefresh() {
        updateVisitorCount();
        setInterval(updateVisitorCount, CONFIG.VISITOR_REFRESH_INTERVAL);
    }

    // ---------- Notice System ----------
    async function checkNotice() {
        const noticeText = await DataService.fetchNotice();
        if (!noticeText) return;
        // Show sticky bar if not dismissed
        const dismissed = Utils.storage.get('notice_dismissed', false);
        if (!dismissed) {
            dom.announcementText.innerHTML = Utils.sanitizeHTML(noticeText).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
            dom.announcementBar.hidden = false;
        }
        // Also show modal if not dismissed
        if (!dismissed) {
            dom.noticeModalBody.innerHTML = dom.announcementText.innerHTML;
            dom.noticeModal.hidden = false;
        }
    }
    function dismissAnnouncement() {
        dom.announcementBar.hidden = true;
        dom.noticeModal.hidden = true;
        Utils.storage.set('notice_dismissed', true);
    }

    // ---------- Slide Menu ----------
    function toggleSlideMenu() {
        const isOpen = dom.slideMenu.getAttribute('aria-hidden') === 'false';
        if (isOpen) {
            closeSlideMenu();
        } else {
            dom.slideMenu.setAttribute('aria-hidden', 'false');
            dom.hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    }
    function closeSlideMenu() {
        dom.slideMenu.setAttribute('aria-hidden', 'true');
        dom.hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    // ---------- Helpers ----------
    function showLoading(show) {
        dom.loadingSkeleton.hidden = !show;
        dom.doctorCards.hidden = show;
        dom.emptyState.hidden = true;
    }
    function showError() {
        dom.errorState.hidden = false;
        dom.doctorCards.hidden = true;
    }
    function hideError() {
        dom.errorState.hidden = true;
    }
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.background = isError ? '#c53030' : '#1a202c';
        dom.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), CONFIG.TOAST_DURATION);
    }
    function setupOnlineStatus() {
        window.addEventListener('online', () => { isOnline = true; });
        window.addEventListener('offline', () => { isOnline = false; showToast('You are offline. Data may be stale.', true); });
    }

    // Start the app when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

    // Public API (if needed externally)
    return { init };
})();
