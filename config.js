/**
 * config.js — Central configuration for Cooch Behar Healthcare Directory
 * All environment-dependent keys and endpoints are defined here.
 * Replace placeholder values before production deployment.
 */

const CONFIG = {
    // Google Sheets CSV export URL (published sheet)
    // Ensure the sheet is publicly accessible as CSV.
    SHEET_CSV_URL:
        'https://docs.google.com/spreadsheets/d/1R0iYUyB38m0dAhNhQfx5w2TVMAHIQ3Y1fWxvDlA-TWM/export?format=csv&gid=0',

    // Google Apps Script Web App URL
    // Handles doctor submissions, feedback, visitor tracking, etc.
    GAS_WEBAPP_URL:
        'https://script.google.com/macros/s/AKfycbwMPPxKZxSe2jbciI9aqELYV_WiYWsL-OI_Tk0M5F-kFB3Mi510PJPptkl9wmVafreOAw/exec',

    // Telegram Bot API credentials (MVP only)
    // Move to backend environment variables in production.
    TELEGRAM_BOT_TOKEN:
        '8935806264:AAHVB9rcx0hsu5jVBuEUVpQqw5MYba7FxR0',

    TELEGRAM_CHAT_ID:
        '100123456789',

    // Default city for auto-fill
    DEFAULT_CITY: 'Cooch Behar',

    // Visitor counter refresh interval (30 seconds)
    VISITOR_REFRESH_INTERVAL: 30000,

    // Search debounce delay (milliseconds)
    SEARCH_DEBOUNCE_MS: 300,

    // Maximum voice recording duration (seconds)
    VOICE_MAX_DURATION: 15,

    // Toast notification duration (milliseconds)
    TOAST_DURATION: 3000,

    // CSV cache duration (10 minutes)
    CSV_CACHE_TTL: 600000,

    // Feature flags
    FEATURES: {
        ENABLE_VOICE_FEEDBACK: true,
        ENABLE_IMAGE_FEEDBACK: true,
        ENABLE_PNG_SHARE: true
    }
};

// Prevent accidental modification
Object.freeze(CONFIG);

export default CONFIG;
