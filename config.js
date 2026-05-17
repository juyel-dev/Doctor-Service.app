/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * Configuration & Constants
 * 
 * IMPORTANT: Update these values with your actual deployment credentials.
 * For MVP stage, some tokens are exposed client-side by design (acceptable
 * tradeoff for zero-backend infrastructure).
 */

(function() {
  'use strict';

  window.CBH = window.CBH || {};

  CBH.config = {
    // App Metadata
    APP_NAME: 'Cooch Behar Healthcare',
    APP_VERSION: '1.0.0',
    CACHE_VERSION: 'cbh-v1',

    // Google Sheets CSV Export URL
    // Format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={SHEET_GID}
    SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0',

    // Google Apps Script Web App URL
    GAS_URL: 'https://script.google.com/macros/s/YOUR_GAS_DEPLOYMENT_ID/exec',

    // Telegram Bot Configuration (Exposed client-side for MVP per architecture decision)
    TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN',
    TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID',

    // UI Configuration
    DEBOUNCE_DELAY: 300,
    VISITOR_REFRESH_INTERVAL: 30000, // 30 seconds
    MAX_VOICE_RECORDING_SECONDS: 15,

    // Search Configuration
    SEARCH_FIELDS: ['name', 'specialty', 'chamber_name', 'chamber_address', 'area', 'city', 'phone'],

    // Colors for Canvas Share (matching CSS variables)
    COLORS: {
      PRIMARY: '#2c7a7b',
      PRIMARY_SOFT: '#e6fffa',
      BACKGROUND: '#f7fafc',
      CARD_BG: '#ffffff',
      BORDER: '#e2e8f0',
      VERIFIED_BG: '#dbeafe',
      VERIFIED_TEXT: '#1e40af',
      LISTED_BG: '#fefcbf',
      LISTED_TEXT: '#975a16',
      SUCCESS: '#38a169',
      DANGER: '#e53e3e',
      TEXT_PRIMARY: '#1a202c',
      TEXT_SECONDARY: '#4a5568',
      TEXT_MUTED: '#718096'
    }
  };
})();
