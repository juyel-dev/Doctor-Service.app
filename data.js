/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * Data Layer
 * 
 * Handles all external data fetching, in-memory caching, filtering,
 * and API communication with Google Apps Script & Telegram.
 */

(function() {
  'use strict';

  window.CBH = window.CBH || {};

  CBH.data = {
    /** In-memory cache to minimize network requests */
    _cache: {
      doctors: null,
      specialties: null,
      areas: null,
      visitors: null,
      notice: null,
      lastFetch: null
    },

    /**
     * Fetch doctor directory from Google Sheets CSV export.
     * Appends cache-busting timestamp to bypass browser cache.
     */
    fetchDoctors: function() {
      var self = this;
      var url = CBH.config.SHEET_CSV_URL + '&t=' + Date.now();

      return fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'text/csv' }
      })
      .then(function(response) {
        if (!response.ok) throw new Error('CSV fetch failed: ' + response.status);
        return response.text();
      })
      .then(function(csvText) {
        var doctors = CBH.utils.parseCSV(csvText);

        self._cache.doctors = doctors.map(function(doc) {
          return {
            doctor_id: doc.doctor_id || '',
            name: doc.name || '',
            specialty: doc.specialty || '',
            degree: doc.degree || '',
            chamber_name: doc.chamber_name || '',
            chamber_address: doc.chamber_address || doc.address || '',
            area: doc.area || '',
            city: doc.city || '',
            phone: doc.phone || '',
            whatsapp: doc.whatsapp || '',
            session_1: doc.session_1 || '',
            session_2: doc.session_2 || '',
            session_3: doc.session_3 || '',
            time_description: doc.time_description || doc.note || '',
            fees: doc.fees || '',
            verification: doc.verification || 'Listed by community',
            submitted_by: doc.submitted_by || '',
            submitted_at: doc.submitted_at || ''
          };
        });

        self._cache.lastFetch = Date.now();
        return self._cache.doctors;
      });
    },

    /**
     * Return cached doctors or fetch if cache is empty/stale.
     */
    getDoctors: function(forceRefresh) {
      if (!forceRefresh && this._cache.doctors) {
        return Promise.resolve(this._cache.doctors);
      }
      return this.fetchDoctors();
    },

    /**
     * Extract unique, sorted specialties from doctor list.
     */
    getSpecialties: function(doctors) {
      if (this._cache.specialties) return this._cache.specialties;

      var map = {};
      for (var i = 0; i < doctors.length; i++) {
        var spec = doctors[i].specialty;
        if (spec) map[spec] = true;
      }

      this._cache.specialties = Object.keys(map).sort();
      return this._cache.specialties;
    },

    /**
     * Extract unique, sorted areas from doctor list.
     */
    getAreas: function(doctors) {
      if (this._cache.areas) return this._cache.areas;

      var map = {};
      for (var i = 0; i < doctors.length; i++) {
        var area = doctors[i].area;
        if (area) map[area] = true;
      }

      this._cache.areas = Object.keys(map).sort();
      return this._cache.areas;
    },

    /**
     * Filter and search doctors based on query, specialty, and area.
     * Returns sorted results by relevance score (descending).
     */
    filterDoctors: function(doctors, query, specialty, area) {
      var results = [];
      var utils = CBH.utils;
      var config = CBH.config;

      for (var i = 0; i < doctors.length; i++) {
        var doctor = doctors[i];
        var match = true;
        var score = 0;

        if (query && query.trim()) {
          score = utils.calculateSearchScore(query, doctor, config.SEARCH_FIELDS);
          if (score === 0) match = false;
        } else {
          score = 1;
        }

        if (specialty && specialty !== 'all') {
          if (utils.normalizeText(doctor.specialty) !== utils.normalizeText(specialty)) {
            match = false;
          }
        }

        if (area && area !== 'all') {
          if (utils.normalizeText(doctor.area) !== utils.normalizeText(area)) {
            match = false;
          }
        }

        if (match) {
          doctor._searchScore = score;
          results.push(doctor);
        }
      }

      results.sort(function(a, b) {
        return (b._searchScore || 0) - (a._searchScore || 0);
      });

      return results;
    },

    /**
     * Record a page view via Google Apps Script.
     * Uses no-cors mode required for GAS Web App POST from static origins.
     */
    recordPageView: function() {
      var sessionId = localStorage.getItem('cbh_session_id');
      if (!sessionId) {
        sessionId = CBH.utils.generateSessionId();
        localStorage.setItem('cbh_session_id', sessionId);
      }

      fetch(CBH.config.GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'pageview',
          session_id: sessionId,
          timestamp: new Date().toISOString()
        }),
        mode: 'no-cors'
      }).catch(function(err) {
        console.warn('Visitor count update failed:', err);
      });
    },

    /**
     * Fetch visitor statistics from GAS.
     */
    fetchVisitorStats: function() {
      var self = this;
      var url = CBH.config.GAS_URL + '?action=getStats&t=' + Date.now();

      return fetch(url)
        .then(function(response) {
          if (!response.ok) throw new Error('Stats fetch failed');
          return response.json();
        })
        .then(function(data) {
          self._cache.visitors = data.count || 0;
          return self._cache.visitors;
        })
        .catch(function(err) {
          console.warn('Failed to fetch visitor stats:', err);
          return self._cache.visitors || 0;
        });
    },

    /**
     * Fetch notice/announcement text from cell T1 via GAS.
     */
    fetchNotice: function() {
      var self = this;
      var url = CBH.config.GAS_URL + '?action=getNotice&t=' + Date.now();

      return fetch(url)
        .then(function(response) {
          if (!response.ok) return '';
          return response.text();
        })
        .then(function(text) {
          self._cache.notice = text.trim();
          return self._cache.notice;
        })
        .catch(function() {
          return '';
        });
    },

    /**
     * Submit new doctor data to GAS for Sheet append.
     */
    submitDoctor: function(formData) {
      var payload = Object.assign({}, formData, {
        action: 'submitDoctor',
        submitted_at: new Date().toISOString()
      });

      return fetch(CBH.config.GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      }).then(function() {
        CBH.data._cache.doctors = null;
        return { success: true };
      });
    },

    /**
     * Send user feedback to Telegram Bot API.
     * Supports text, optional photo, and optional voice message.
     * Sends as separate Telegram messages to avoid multipart complexity.
     */
    sendFeedback: function(text, imageFile, voiceBlob) {
      var token = CBH.config.TELEGRAM_BOT_TOKEN;
      var chatId = CBH.config.TELEGRAM_CHAT_ID;
      var baseUrl = 'https://api.telegram.org/bot' + token;
      var promises = [];

      if (text && text.trim()) {
        promises.push(
          fetch(baseUrl + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: '\ud83d\udccb *Cooch Behar Healthcare Feedback*\n\n' + text,
              parse_mode: 'Markdown'
            })
          })
        );
      }

      if (imageFile) {
        var photoForm = new FormData();
        photoForm.append('chat_id', chatId);
        photoForm.append('photo', imageFile);
        photoForm.append('caption', '\ud83d\udcf7 Feedback Image');

        promises.push(
          fetch(baseUrl + '/sendPhoto', {
            method: 'POST',
            body: photoForm
          })
        );
      }

      if (voiceBlob) {
        var voiceForm = new FormData();
        voiceForm.append('chat_id', chatId);
        voiceForm.append('voice', voiceBlob, 'feedback.ogg');
        voiceForm.append('caption', '\ud83c\udfa4 Voice Feedback');

        promises.push(
          fetch(baseUrl + '/sendVoice', {
            method: 'POST',
            body: voiceForm
          })
        );
      }

      return Promise.all(promises);
    }
  };
})();
