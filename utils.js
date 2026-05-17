/**
 * utils.js — Pure utility functions for the directory
 * Includes CSV parsing, debounce, sanitization, localStorage helpers, etc.
 * All functions are pure and reusable, with no DOM dependencies.
 */

const Utils = (() => {

    /**
     * Parse CSV string into array of objects.
     * Handles quoted fields, commas within quotes, and header row mapping.
     * @param {string} csvText - Raw CSV data
     * @returns {Array<Object>} Array of row objects with keys from header
     */
    function parseCSV(csvText) {
        if (!csvText || typeof csvText !== 'string') return [];
        const rows = [];
        let current = '';
        let inQuotes = false;

        // Parse lines character by character to respect quoted commas
        const lines = [];
        for (let i = 0; i < csvText.length; i++) {
            const char = csvText[i];
            if (char === '"') {
                inQuotes = !inQuotes;
                current += char;
            } else if (char === '\n' && !inQuotes) {
                lines.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        if (current) lines.push(current);

        if (lines.length < 2) return [];

        // Extract headers
        const headers = parseLineToArray(lines[0]);
        // Normalize header names (trim, remove quotes)
        const normalizedHeaders = headers.map(h => h.trim().replace(/^"|"$/g, '').toLowerCase().replace(/\s+/g, '_'));

        for (let i = 1; i < lines.length; i++) {
            const values = parseLineToArray(lines[i]);
            const row = {};
            normalizedHeaders.forEach((header, idx) => {
                let val = values[idx] || '';
                // Remove surrounding quotes and unescape internal quotes
                val = val.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
                row[header] = val;
            });
            // Ensure doctor_id exists; if missing, skip or generate
            if (!row.doctor_id) row.doctor_id = `DR${String(i).padStart(4, '0')}`;
            rows.push(row);
        }
        return rows;
    }

    /**
     * Helper: parse a CSV line into an array, handling quoted commas.
     */
    function parseLineToArray(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
                current += char;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    /**
     * Creates a debounced version of a function.
     * @param {Function} fn - Function to debounce
     * @param {number} delay - Delay in ms
     * @returns {Function} Debounced function
     */
    function debounce(fn, delay = 300) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    /**
     * Simple HTML sanitizer to prevent XSS.
     * Escapes <, >, &, ", ' characters.
     * @param {string} str - Untrusted string
     * @returns {string} Sanitized string
     */
    function sanitizeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Normalize a string for search: lowercase, trim, remove extra spaces.
     * @param {string} str
     * @returns {string}
     */
    function normalize(str) {
        return (str || '').toLowerCase().trim().replace(/\s+/g, ' ');
    }

    /**
     * Build a searchable string from a doctor object.
     * Includes name, specialty, chamber, address, area, city, phone.
     * @param {Object} doctor - doctor row object
     * @returns {string} concatenated searchable text
     */
    function getSearchableText(doctor) {
        const fields = ['name', 'specialty', 'chamber_name', 'chamber_address', 'area', 'city', 'phone'];
        return fields.map(f => doctor[f] || '').join(' ').toLowerCase();
    }

    /**
     * Perform client-side fuzzy search: token matching + substring matching.
     * Returns a score (higher = better match).
     * @param {string} query - user search query
     * @param {string} searchableText - concatenated text to search in
     * @returns {number} score
     */
    function fuzzyMatchScore(query, searchableText) {
        if (!query || !searchableText) return 0;
        const q = normalize(query);
        const target = normalize(searchableText);
        if (target.includes(q)) return 100; // exact substring
        const queryTokens = q.split(/\s+/);
        let tokenMatches = 0;
        for (let token of queryTokens) {
            if (target.includes(token)) tokenMatches++;
        }
        return tokenMatches * 30; // proportional score
    }

    /**
     * localStorage helpers with JSON parse/stringify safety.
     */
    const storage = {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('localStorage set failed', e);
            }
        },
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {}
        }
    };

    /**
     * Generate a simple unique session ID for visitor counting.
     */
    function generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Detect if device is primarily mobile (for UI tweaks).
     */
    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    /**
     * Format phone number for tel: link (remove non-digit characters).
     */
    function cleanPhoneForTel(phone) {
        return phone.replace(/[^0-9+]/g, '');
    }

    // Public API
    return {
        parseCSV,
        debounce,
        sanitizeHTML,
        normalize,
        getSearchableText,
        fuzzyMatchScore,
        storage,
        generateSessionId,
        isMobile,
        cleanPhoneForTel
    };
})();
