/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * Utility Functions
 * 
 * Shared utilities for data processing, sanitization, search scoring,
 * and formatting. Zero dependencies.
 */

(function() {
  'use strict';

  window.CBH = window.CBH || {};

  CBH.utils = {
    /**
     * Debounce function execution. Returns a wrapped function that delays
     * invocation until `wait` milliseconds have elapsed since the last call.
     */
    debounce: function(func, wait) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
      };
    },

    /**
     * Robust CSV parser supporting:
     * - Quoted fields containing commas
     * - Escaped quotes ("")
     * - CRLF and LF line endings
     * Returns array of objects using the first row as headers.
     */
    parseCSV: function(csvText) {
      var lines = [];
      var currentLine = [];
      var currentField = '';
      var insideQuotes = false;

      for (var i = 0; i < csvText.length; i++) {
        var char = csvText[i];
        var nextChar = csvText[i + 1];

        if (insideQuotes) {
          if (char === '"') {
            if (nextChar === '"') {
              currentField += '"';
              i++; // Skip escaped quote
            } else {
              insideQuotes = false;
            }
          } else {
            currentField += char;
          }
        } else {
          if (char === '"') {
            insideQuotes = true;
          } else if (char === ',') {
            currentLine.push(currentField.trim());
            currentField = '';
          } else if (char === '\n' || char === '\r') {
            if (currentField !== '' || currentLine.length > 0) {
              currentLine.push(currentField.trim());
              lines.push(currentLine);
              currentLine = [];
              currentField = '';
            }
            if (char === '\r' && nextChar === '\n') {
              i++;
            }
          } else {
            currentField += char;
          }
        }
      }

      if (currentField !== '' || currentLine.length > 0) {
        currentLine.push(currentField.trim());
        lines.push(currentLine);
      }

      if (lines.length < 2) return [];

      var headers = lines[0];
      var results = [];

      for (var j = 1; j < lines.length; j++) {
        var obj = {};
        var line = lines[j];
        for (var k = 0; k < headers.length; k++) {
          obj[headers[k]] = line[k] !== undefined ? line[k] : '';
        }
        results.push(obj);
      }

      return results;
    },

    /**
     * Basic HTML sanitization to prevent XSS injection.
     * Converts special characters to HTML entities via textContent assignment.
     */
    sanitizeHTML: function(str) {
      if (!str) return '';
      var div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },

    /**
     * Format an ISO or standard date string to Indian locale format.
     */
    formatDate: function(dateStr) {
      if (!dateStr) return '';
      try {
        var date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      } catch (e) {
        return dateStr;
      }
    },

    /**
     * Normalize text for search comparison:
     * lowercase, trim, collapse whitespace.
     */
    normalizeText: function(str) {
      if (!str) return '';
      return str.toString().toLowerCase().trim().replace(/\s+/g, ' ');
    },

    /**
     * Calculate search relevance score for a doctor record against a query.
     * 
     * Scoring weights:
     *   - Full query substring match: +100
     *   - All tokens present in record: +50
     *   - Per-token match: +10 each
     *   - Exact field match: +25 per field
     *   - Token within field: +5 per field
     * 
     * Returns 0 if no match found.
     */
    calculateSearchScore: function(query, doctor, fields) {
      var normalizedQuery = this.normalizeText(query);
      if (!normalizedQuery) return 1;

      var tokens = normalizedQuery.split(' ').filter(function(t) { return t.length > 0; });
      var fullText = '';

      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (doctor[field]) {
          fullText += ' ' + this.normalizeText(doctor[field]);
        }
      }

      fullText = fullText.trim();
      if (!fullText) return 0;

      var score = 0;

      if (fullText.indexOf(normalizedQuery) !== -1) {
        score += 100;
      }

      var allTokensPresent = true;
      var tokenMatchCount = 0;

      for (var j = 0; j < tokens.length; j++) {
        if (fullText.indexOf(tokens[j]) !== -1) {
          tokenMatchCount++;
        } else {
          allTokensPresent = false;
        }
      }

      if (allTokensPresent) score += 50;
      score += tokenMatchCount * 10;

      for (var k = 0; k < fields.length; k++) {
        var fieldValue = this.normalizeText(doctor[fields[k]]);
        if (fieldValue.indexOf(normalizedQuery) !== -1) score += 25;
        for (var t = 0; t < tokens.length; t++) {
          if (fieldValue.indexOf(tokens[t]) !== -1) score += 5;
        }
      }

      return score;
    },

    /**
     * Generate a unique session ID for visitor tracking.
     */
    generateSessionId: function() {
      return 'cbh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Escape special regex characters for safe RegExp construction.
     */
    escapeRegex: function(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Deep clone a serializable object/array.
     */
    deepClone: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  };
})();
