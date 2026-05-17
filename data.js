/**
 * data.js — Data service for the healthcare directory.
 * Responsible for fetching CSV from Google Sheets, parsing, caching,
 * visitor counting via Google Apps Script, and fetching T1 notice.
 * Uses Utils and CONFIG from global scope.
 */
const DataService = (() => {
    let doctorsCache = null;
    let cacheTimestamp = 0;
    let visitorCount = 0;

    /**
     * Fetch and parse doctor CSV. Uses cache if fresh.
     * @returns {Promise<Array>} Array of doctor objects
     */
    async function fetchDoctors(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && doctorsCache && (now - cacheTimestamp < CONFIG.CSV_CACHE_TTL)) {
            return doctorsCache;
        }
        try {
            const response = await fetch(CONFIG.SHEET_CSV_URL, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const csvText = await response.text();
            const parsed = Utils.parseCSV(csvText);
            // Filter out rows without a name (likely empty)
            doctorsCache = parsed.filter(doc => doc.name && doc.name.trim() !== '');
            cacheTimestamp = now;
            return doctorsCache;
        } catch (error) {
            console.error('Failed to fetch doctor data:', error);
            // Return stale cache if available, otherwise re-throw
            if (doctorsCache) return doctorsCache;
            throw error;
        }
    }

    /**
     * Get the current visitor count from Google Apps Script.
     * @returns {Promise<number>}
     */
    async function fetchVisitorCount() {
        try {
            const response = await fetch(`${CONFIG.GAS_WEBAPP_URL}?action=getStats`, { cache: 'no-cache' });
            const data = await response.json();
            if (data && typeof data.visitors === 'number') {
                visitorCount = data.visitors;
            }
        } catch (e) {
            console.warn('Visitor count fetch failed:', e);
        }
        return visitorCount;
    }

    /**
     * Send a pageview event to GAS to increment counter.
     * Uses session ID to avoid duplicate counts per session.
     */
    async function recordPageview() {
        const sessionId = Utils.storage.get('session_id', Utils.generateSessionId());
        Utils.storage.set('session_id', sessionId);
        try {
            await fetch(CONFIG.GAS_WEBAPP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'pageview', sessionId })
            });
        } catch (e) {
            console.warn('Pageview recording failed:', e);
        }
    }

    /**
     * Fetch notice content from cell T1 of the sheet (via GAS or CSV).
     * For MVP, we'll fetch from a GAS endpoint returning the notice text.
     * @returns {Promise<string>}
     */
    async function fetchNotice() {
        try {
            const response = await fetch(`${CONFIG.GAS_WEBAPP_URL}?action=getNotice`, { cache: 'no-cache' });
            const data = await response.json();
            return (data && data.notice) ? data.notice : '';
        } catch (e) {
            console.warn('Notice fetch failed:', e);
            return '';
        }
    }

    /**
     * Submit a new doctor record to Google Apps Script.
     * @param {Object} doctorData - form data matching sheet columns
     * @returns {Promise<Object>} response with success and doctor_id
     */
    async function submitDoctor(doctorData) {
        const payload = {
            action: 'addDoctor',
            ...doctorData
        };
        const response = await fetch(CONFIG.GAS_WEBAPP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Submission failed');
        return await response.json();
    }

    // Expose cache invalidator for after submission
    function invalidateCache() {
        doctorsCache = null;
        cacheTimestamp = 0;
    }

    return {
        fetchDoctors,
        fetchVisitorCount,
        recordPageview,
        fetchNotice,
        submitDoctor,
        invalidateCache
    };
})();
