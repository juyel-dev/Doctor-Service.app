/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * Main Application Controller
 * 
 * Orchestrates UI rendering, event handling, state management,
 * modal control, voice recording, and user interactions.
 * 
 * Architecture: Namespace pattern (window.CBH.app) for broad device compatibility.
 */

(function() {
  'use strict';

  window.CBH = window.CBH || {};

  CBH.app = {
    /** DOM element references cached at init */
    dom: {},

    /** Mutable application state */
    state: {
      doctors: [],
      filteredDoctors: [],
      currentQuery: '',
      currentSpecialty: 'all',
      currentArea: '',
      isLoading: false,
      voiceRecorder: null,
      voiceChunks: [],
      isRecording: false,
      recordingTimer: null,
      recordingSeconds: 0,
      voiceBlob: null
    },

    /**
     * Initialize the application.
     * Loads data, binds events, records visit, starts background refresh.
     */
    init: function() {
      this._cacheDOM();
      this._bindEvents();
      this._loadInitialData();
      this._recordVisit();
      this._startVisitorRefresh();
    },

    /**
     * Cache frequently-accessed DOM elements to minimize querySelector overhead.
     */
    _cacheDOM: function() {
      var d = this.dom;
      d.announcementBar = document.getElementById('announcement-bar');
      d.announcementText = document.getElementById('announcement-text');
      d.announcementClose = document.getElementById('announcement-close');
      d.searchInput = document.getElementById('search-input');
      d.specialtyPills = document.getElementById('specialty-pills');
      d.areaFilter = document.getElementById('area-filter');
      d.visitorCount = document.getElementById('visitor-count');
      d.doctorList = document.getElementById('doctor-list');
      d.emptyState = document.getElementById('empty-state');
      d.fabAdd = document.getElementById('fab-add');
      d.fabFeedback = document.getElementById('fab-feedback');
      d.modalAdd = document.getElementById('modal-add');
      d.modalFeedback = document.getElementById('modal-feedback');
      d.modalDetails = document.getElementById('modal-details');
      d.menuToggle = document.getElementById('menu-toggle');
      d.mainNav = document.getElementById('main-nav');
      d.toast = document.getElementById('toast');
      d.formAddDoctor = document.getElementById('form-add-doctor');
      d.formFeedback = document.getElementById('form-feedback');
      d.voiceBtn = document.getElementById('voice-record-btn');
      d.voiceTimer = document.getElementById('voice-timer');
    },

    /**
     * Bind all event listeners: search, filters, FABs, modals, forms, voice.
     */
    _bindEvents: function() {
      var self = this;
      var d = this.dom;

      // Search input with debounce for performance
      d.searchInput.addEventListener('input', CBH.utils.debounce(function(e) {
        self.state.currentQuery = e.target.value;
        self._applyFilters();
      }, CBH.config.DEBOUNCE_DELAY));

      // Specialty pills via event delegation
      d.specialtyPills.addEventListener('click', function(e) {
        var pill = e.target.closest('.pill');
        if (!pill) return;

        var specialty = pill.dataset.specialty;
        self.state.currentSpecialty = specialty;

        var pills = d.specialtyPills.querySelectorAll('.pill');
        for (var i = 0; i < pills.length; i++) {
          var isActive = pills[i].dataset.specialty === specialty;
          pills[i].classList.toggle('active', isActive);
          pills[i].setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }

        self._applyFilters();
      });

      // Area dropdown filter
      d.areaFilter.addEventListener('change', function(e) {
        self.state.currentArea = e.target.value;
        self._applyFilters();
      });

      // Floating action buttons
      d.fabAdd.addEventListener('click', function() {
        self._openModal('modalAdd');
      });

      d.fabFeedback.addEventListener('click', function() {
        self._openModal('modalFeedback');
      });

      // Modal close via overlay or close button (event delegation)
      document.addEventListener('click', function(e) {
        var closeTrigger = e.target.closest('.modal-close, .modal-overlay');
        if (closeTrigger) {
          var modal = e.target.closest('.modal');
          if (modal) self._closeModalByElement(modal);
        }
      });

      // Escape key closes any open modal
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          var openModal = document.querySelector('.modal:not(.hidden)');
          if (openModal) self._closeModalByElement(openModal);
        }
      });

      // Add doctor form
      d.formAddDoctor.addEventListener('submit', function(e) {
        e.preventDefault();
        self._handleAddDoctor(e.target);
      });

      // Feedback form
      d.formFeedback.addEventListener('submit', function(e) {
        e.preventDefault();
        self._handleFeedback(e.target);
      });

      // Voice recording toggle
      if (d.voiceBtn) {
        d.voiceBtn.addEventListener('click', function() {
          self._toggleVoiceRecording();
        });
      }

      // File input label update
      var fileInput = d.formFeedback ? d.formFeedback.querySelector('input[type="file"]') : null;
      if (fileInput) {
        fileInput.addEventListener('change', function(e) {
          var label = e.target.parentElement.querySelector('.file-input-label');
          if (e.target.files && e.target.files[0]) {
            label.textContent = '\u2713 ' + e.target.files[0].name;
          } else {
            label.textContent = '\ud83d\udcf7 Tap to upload image';
          }
        });
      }

      // Announcement dismiss
      if (d.announcementClose) {
        d.announcementClose.addEventListener('click', function() {
          d.announcementBar.classList.add('hidden');
          localStorage.setItem('cbh_announcement_dismissed', 'true');
        });
      }

      // Hamburger menu toggle
      if (d.menuToggle) {
        d.menuToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          var isOpen = !d.mainNav.classList.contains('hidden');
          d.mainNav.classList.toggle('hidden', isOpen);
          d.menuToggle.setAttribute('aria-expanded', !isOpen);
          d.mainNav.setAttribute('aria-hidden', isOpen);
        });
      }

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('#menu-toggle') && !e.target.closest('#main-nav')) {
          d.mainNav.classList.add('hidden');
          d.menuToggle.setAttribute('aria-expanded', 'false');
          d.mainNav.setAttribute('aria-hidden', 'true');
        }
      });
    },

    /**
     * Load initial dataset: doctors, notice, visitor stats.
     */
    _loadInitialData: function() {
      var self = this;
      self._setLoading(true);

      CBH.data.getDoctors()
        .then(function(doctors) {
          self.state.doctors = doctors;
          self.state.filteredDoctors = doctors;

          self._renderSpecialtyPills(doctors);
          self._renderAreaOptions(doctors);
          self._renderDoctors(doctors);

          return CBH.data.fetchNotice();
        })
        .then(function(notice) {
          if (notice) self._showAnnouncement(notice);
          self._setLoading(false);
        })
        .catch(function(err) {
          console.error('Initial data load failed:', err);
          self._showToast('Failed to load directory. Please refresh.', 'error');
          self._setLoading(false);
        });
    },

    /**
     * Record page visit for analytics.
     */
    _recordVisit: function() {
      CBH.data.recordPageView();
    },

    /**
     * Start periodic visitor count refresh (every 30s per config).
     */
    _startVisitorRefresh: function() {
      var self = this;
      self._updateVisitorCount();
      setInterval(function() {
        self._updateVisitorCount();
      }, CBH.config.VISITOR_REFRESH_INTERVAL);
    },

    /**
     * Fetch and display latest visitor count.
     */
    _updateVisitorCount: function() {
      CBH.data.fetchVisitorStats()
        .then(function(count) {
          var el = document.getElementById('visitor-count');
          if (el) el.textContent = count.toLocaleString('en-IN');
        });
    },

    /**
     * Show announcement bar if notice exists and not previously dismissed.
     */
    _showAnnouncement: function(text) {
      var d = this.dom;
      var lastNotice = localStorage.getItem('cbh_last_notice');
      var dismissed = localStorage.getItem('cbh_announcement_dismissed');

      // Reset dismissal if notice content changed
      if (lastNotice !== text) {
        localStorage.removeItem('cbh_announcement_dismissed');
        localStorage.setItem('cbh_last_notice', text);
        dismissed = null;
      }

      if (!dismissed && text && d.announcementBar && d.announcementText) {
        // Auto-link URLs
        var linkedText = text.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:inherit;font-weight:600;">$1</a>'
        );
        d.announcementText.innerHTML = linkedText;
        d.announcementBar.classList.remove('hidden');
      }
    },

    /**
     * Render specialty filter pills horizontally.
     */
    _renderSpecialtyPills: function(doctors) {
      var specialties = CBH.data.getSpecialties(doctors);
      var container = this.dom.specialtyPills;

      var html = '<button class="pill active" data-specialty="all" aria-pressed="true">\u09b8\u09ac (All)</button>';

      for (var i = 0; i < specialties.length; i++) {
        var spec = CBH.utils.sanitizeHTML(specialties[i]);
        html += '<button class="pill" data-specialty="' + spec + '" aria-pressed="false">' + spec + '</button>';
      }

      container.innerHTML = html;
    },

    /**
     * Render area dropdown options.
     */
    _renderAreaOptions: function(doctors) {
      var areas = CBH.data.getAreas(doctors);
      var select = this.dom.areaFilter;

      var html = '<option value="">\u09b8\u09ac \u098f\u09b0\u09bf\u09df\u09be (All Areas)</option>';

      for (var i = 0; i < areas.length; i++) {
        var area = CBH.utils.sanitizeHTML(areas[i]);
        html += '<option value="' + area + '">' + area + '</option>';
      }

      select.innerHTML = html;
    },

    /**
     * Apply active filters and re-render the doctor list.
     */
    _applyFilters: function() {
      var filtered = CBH.data.filterDoctors(
        this.state.doctors,
        this.state.currentQuery,
        this.state.currentSpecialty,
        this.state.currentArea
      );
      this.state.filteredDoctors = filtered;
      this._renderDoctors(filtered);
    },

    /**
     * Render doctor cards using DocumentFragment for batch DOM insertion.
     */
    _renderDoctors: function(doctors) {
      var container = this.dom.doctorList;
      var emptyState = this.dom.emptyState;

      if (doctors.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      emptyState.classList.add('hidden');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < doctors.length; i++) {
        fragment.appendChild(this._createDoctorCard(doctors[i]));
      }

      container.innerHTML = '';
      container.appendChild(fragment);
    },

    /**
     * Create a single doctor card DOM element.
     */
    _createDoctorCard: function(doctor) {
      var utils = CBH.utils;
      var isVerified = (doctor.verification || '').toLowerCase().indexOf('verified') !== -1;
      var badgeClass = isVerified ? 'badge-verified' : 'badge-listed';
      var badgeText = isVerified ? '\u2713 Verified' : '\u26a0 Listed by community';

      var sessions = [doctor.session_1, doctor.session_2, doctor.session_3]
        .filter(Boolean)
        .map(function(s) {
          return '<div class="session-time">\ud83d\udd50 ' + utils.sanitizeHTML(s) + '</div>';
        })
        .join('');

      if (!sessions) {
        sessions = '<div class="session-time text-muted">\ud83d\udd50 Contact for timing</div>';
      }

      var card = document.createElement('article');
      card.className = 'doctor-card';
      card.setAttribute('data-id', doctor.doctor_id);

      var html =
        '<div class="card-header">' +
          '<h3 class="doctor-name">' + utils.sanitizeHTML(doctor.name) + '</h3>' +
          '<span class="specialty-tag">' + utils.sanitizeHTML(doctor.specialty) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          (doctor.degree ? '<p class="doctor-degree">' + utils.sanitizeHTML(doctor.degree) + '</p>' : '') +
          '<div class="chamber-info">' +
            (doctor.chamber_name ? '<p class="chamber-name">\ud83c\udfe5 ' + utils.sanitizeHTML(doctor.chamber_name) + '</p>' : '') +
            (doctor.chamber_address ? '<p class="chamber-address">\ud83d\udccd ' + utils.sanitizeHTML(doctor.chamber_address) + '</p>' : '') +
            ((doctor.area || doctor.city) ? '<p class="chamber-area">\ud83c\udf10 ' + utils.sanitizeHTML([doctor.area, doctor.city].filter(Boolean).join(', ')) + '</p>' : '') +
          '</div>' +
          '<div class="session-info">' + sessions +
            (doctor.time_description ? '<p class="time-note">\ud83d\udcdd ' + utils.sanitizeHTML(doctor.time_description) + '</p>' : '') +
          '</div>' +
          (doctor.fees ? '<p class="fees">\ud83d\udcb0 ' + utils.sanitizeHTML(doctor.fees) + '</p>' : '') +
          '<span class="verification-badge ' + badgeClass + '">' + badgeText + '</span>' +
        '</div>' +
        '<div class="card-actions">' +
          (doctor.phone ? '<a href="tel:' + utils.sanitizeHTML(doctor.phone) + '" class="btn-action btn-call" aria-label="Call doctor">\ud83d\udcde Call</a>' : '') +
          (doctor.whatsapp ? '<a href="https://wa.me/' + utils.sanitizeHTML(doctor.whatsapp.replace(/\D/g, '')) + '" target="_blank" rel="noopener" class="btn-action btn-whatsapp" aria-label="WhatsApp doctor">\ud83d\udcac WhatsApp</a>' : '') +
          '<button class="btn-action btn-share" data-action="share" aria-label="Share doctor card">\ud83d\udce4 Share</button>' +
          '<button class="btn-action btn-details" data-action="details" aria-label="View details">\ud83d\udd0d Details</button>' +
        '</div>' +
        '<div class="card-footer">' +
          '<span class="updated-at">\ud83d\udd52 Updated: ' + utils.formatDate(doctor.submitted_at) + '</span>' +
        '</div>';

      card.innerHTML = html;

      var self = this;
      var shareBtn = card.querySelector('[data-action="share"]');
      var detailsBtn = card.querySelector('[data-action="details"]');

      if (shareBtn) {
        shareBtn.addEventListener('click', function() {
          CBH.share.generateDoctorCard(doctor);
        });
      }

      if (detailsBtn) {
        detailsBtn.addEventListener('click', function() {
          self._showDoctorDetails(doctor);
        });
      }

      return card;
    },

    /**
     * Show full doctor details in a modal.
     */
    _showDoctorDetails: function(doctor) {
      var modal = this.dom.modalDetails;
      var content = modal.querySelector('.modal-body');
      var utils = CBH.utils;

      var isVerified = (doctor.verification || '').toLowerCase().indexOf('verified') !== -1;
      var badgeClass = isVerified ? 'badge-verified' : 'badge-listed';
      var badgeText = isVerified ? '\u2713 Verified' : '\u26a0 Listed by community';

      var html =
        '<div class="details-card">' +
          '<h2>' + utils.sanitizeHTML(doctor.name) + '</h2>' +
          '<p class="detail-specialty">' + utils.sanitizeHTML(doctor.specialty) + '</p>' +
          (doctor.degree ? '<p class="detail-degree">' + utils.sanitizeHTML(doctor.degree) + '</p>' : '') +
          '<hr>' +
          (doctor.chamber_name ? '<p><strong>Chamber:</strong> ' + utils.sanitizeHTML(doctor.chamber_name) + '</p>' : '') +
          (doctor.chamber_address ? '<p><strong>Address:</strong> ' + utils.sanitizeHTML(doctor.chamber_address) + '</p>' : '') +
          (doctor.area ? '<p><strong>Area:</strong> ' + utils.sanitizeHTML(doctor.area) + '</p>' : '') +
          (doctor.city ? '<p><strong>City:</strong> ' + utils.sanitizeHTML(doctor.city) + '</p>' : '') +
          '<hr>' +
          '<p><strong>Sessions:</strong></p>' +
          '<ul>' +
            (doctor.session_1 ? '<li>' + utils.sanitizeHTML(doctor.session_1) + '</li>' : '') +
            (doctor.session_2 ? '<li>' + utils.sanitizeHTML(doctor.session_2) + '</li>' : '') +
            (doctor.session_3 ? '<li>' + utils.sanitizeHTML(doctor.session_3) + '</li>' : '') +
          '</ul>' +
          (doctor.time_description ? '<p><strong>Note:</strong> ' + utils.sanitizeHTML(doctor.time_description) + '</p>' : '') +
          (doctor.fees ? '<p><strong>Fees:</strong> ' + utils.sanitizeHTML(doctor.fees) + '</p>' : '') +
          '<hr>' +
          (doctor.phone ? '<p><strong>Phone:</strong> <a href="tel:' + utils.sanitizeHTML(doctor.phone) + '">' + utils.sanitizeHTML(doctor.phone) + '</a></p>' : '') +
          (doctor.whatsapp ? '<p><strong>WhatsApp:</strong> <a href="https://wa.me/' + utils.sanitizeHTML(doctor.whatsapp.replace(/\D/g, '')) + '" target="_blank" rel="noopener">' + utils.sanitizeHTML(doctor.whatsapp) + '</a></p>' : '') +
          '<span class="verification-badge ' + badgeClass + '">' + badgeText + '</span>' +
          '<p class="detail-meta">ID: ' + utils.sanitizeHTML(doctor.doctor_id) + ' \u2022 Submitted: ' + utils.formatDate(doctor.submitted_at) + '</p>' +
        '</div>';

      content.innerHTML = html;
      this._openModal('modalDetails');
    },

    /**
     * Handle add-doctor form submission with validation.
     */
    _handleAddDoctor: function(form) {
      var self = this;
      var formData = new FormData(form);
      var data = {};

      formData.forEach(function(value, key) {
        data[key] = value.trim();
      });

      var required = ['name', 'specialty', 'chamber_name', 'area', 'phone', 'submitter_name'];
      for (var i = 0; i < required.length; i++) {
        if (!data[required[i]]) {
          self._showToast('Please fill in all required fields', 'error');
          return;
        }
      }

      var phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      if (!phoneRegex.test(data.phone)) {
        self._showToast('Please enter a valid phone number', 'error');
        return;
      }

      self._setLoading(true);

      CBH.data.submitDoctor(data)
        .then(function() {
          self._showToast('Doctor submitted! It will appear after review.', 'success');
          form.reset();
          self._closeModalByElement(self.dom.modalAdd);
          setTimeout(function() {
            self._loadInitialData();
          }, 2000);
        })
        .catch(function(err) {
          console.error('Submit failed:', err);
          self._showToast('Submission failed. Please try again.', 'error');
        })
        .finally(function() {
          self._setLoading(false);
        });
    },

    /**
     * Handle feedback form submission to Telegram.
     */
    _handleFeedback: function(form) {
      var self = this;
      var text = form.querySelector('[name="feedback_text"]').value.trim();
      var imageInput = form.querySelector('[name="feedback_image"]');
      var imageFile = imageInput && imageInput.files ? imageInput.files[0] : null;

      if (!text && !imageFile && !self.state.voiceBlob) {
        self._showToast('Please provide feedback text, image, or voice', 'error');
        return;
      }

      self._setLoading(true);

      CBH.data.sendFeedback(text, imageFile, self.state.voiceBlob)
        .then(function() {
          self._showToast('Feedback sent! Thank you.', 'success');
          form.reset();

          // Reset voice state
          self.state.voiceBlob = null;
          self.state.voiceChunks = [];
          self._updateVoiceUI();

          // Reset file label
          var label = form.querySelector('.file-input-label');
          if (label) label.textContent = '\ud83d\udcf7 Tap to upload image';

          self._closeModalByElement(self.dom.modalFeedback);
        })
        .catch(function(err) {
          console.error('Feedback failed:', err);
          self._showToast('Failed to send feedback. Please try again.', 'error');
        })
        .finally(function() {
          self._setLoading(false);
        });
    },

    /**
     * Toggle voice recording on/off.
     */
    _toggleVoiceRecording: function() {
      if (this.state.isRecording) {
        this._stopRecording();
      } else {
        this._startRecording();
      }
    },

    /**
     * Start microphone recording via MediaRecorder API.
     */
    _startRecording: function() {
      var self = this;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        self._showToast('Voice recording not supported on this device', 'error');
        return;
      }

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          var mediaRecorder = new MediaRecorder(stream);
          self.state.voiceRecorder = mediaRecorder;
          self.state.voiceChunks = [];
          self.state.isRecording = true;
          self.state.recordingSeconds = 0;

          mediaRecorder.ondataavailable = function(e) {
            if (e.data.size > 0) {
              self.state.voiceChunks.push(e.data);
            }
          };

          mediaRecorder.onstop = function() {
            var blob = new Blob(self.state.voiceChunks, { type: 'audio/ogg; codecs=opus' });
            self.state.voiceBlob = blob;
            self._updateVoiceUI();
            stream.getTracks().forEach(function(track) { track.stop(); });
          };

          mediaRecorder.start();
          self._updateVoiceUI();

          self.state.recordingTimer = setInterval(function() {
            self.state.recordingSeconds++;
            self._updateVoiceUI();
            if (self.state.recordingSeconds >= CBH.config.MAX_VOICE_RECORDING_SECONDS) {
              self._stopRecording();
            }
          }, 1000);
        })
        .catch(function(err) {
          console.error('Microphone access denied:', err);
          self._showToast('Microphone access required for voice recording', 'error');
        });
    },

    /**
     * Stop active voice recording.
     */
    _stopRecording: function() {
      if (this.state.recordingTimer) {
        clearInterval(this.state.recordingTimer);
        this.state.recordingTimer = null;
      }

      if (this.state.voiceRecorder && this.state.voiceRecorder.state !== 'inactive') {
        this.state.voiceRecorder.stop();
      }

      this.state.isRecording = false;
      this._updateVoiceUI();
    },

    /**
     * Update voice recording button UI state.
     */
    _updateVoiceUI: function() {
      var btn = this.dom.voiceBtn;
      var timer = this.dom.voiceTimer;
      if (!btn) return;

      if (this.state.isRecording) {
        btn.textContent = '\u23f9 Stop (' + this.state.recordingSeconds + 's)';
        btn.classList.add('recording');
        if (timer) {
          timer.textContent = 'Recording... ' + this.state.recordingSeconds + 's / ' + CBH.config.MAX_VOICE_RECORDING_SECONDS + 's';
          timer.classList.remove('hidden');
        }
      } else if (this.state.voiceBlob) {
        btn.textContent = '\ud83c\udfa4 Record Again';
        btn.classList.remove('recording');
        if (timer) {
          timer.textContent = '\u2713 Voice recorded (' + Math.round(this.state.voiceBlob.size / 1024) + ' KB)';
          timer.classList.remove('hidden');
        }
      } else {
        btn.textContent = '\ud83c\udfa4 Record Voice (max ' + CBH.config.MAX_VOICE_RECORDING_SECONDS + 's)';
        btn.classList.remove('recording');
        if (timer) timer.classList.add('hidden');
      }
    },

    /**
     * Open a modal by its key in the dom cache.
     */
    _openModal: function(modalKey) {
      var modal = this.dom[modalKey];
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length) focusable[0].focus();
      }
    },

    /**
     * Close a modal by its DOM element.
     */
    _closeModalByElement: function(modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    },

    /**
     * Show a temporary toast notification.
     */
    _showToast: function(message, type) {
      var toast = this.dom.toast;
      toast.textContent = message;
      toast.className = 'toast toast-' + (type || 'info');
      toast.classList.remove('hidden');

      setTimeout(function() {
        toast.classList.add('hidden');
      }, 4000);
    },

    /**
     * Toggle global loading state.
     */
    _setLoading: function(isLoading) {
      this.state.isLoading = isLoading;
      document.body.classList.toggle('is-loading', isLoading);
    }
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      CBH.app.init();
    });
  } else {
    CBH.app.init();
  }
})();
