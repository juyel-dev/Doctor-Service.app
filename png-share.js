/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * PNG Share Engine
 * 
 * Generates shareable PNG images of doctor cards using native HTML5 Canvas API.
 * No external libraries (no html2canvas dependency). Optimized for mobile
 * sharing via download or Web Share API where available.
 */

(function() {
  'use strict';

  window.CBH = window.CBH || {};

  CBH.share = {
    /**
     * Generate a PNG share card for a doctor and trigger download.
     * Canvas is dynamically sized based on content volume.
     */
    generateDoctorCard: function(doctor) {
      var c = CBH.config.COLORS;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var width = 800;
      var padding = 40;
      var lineHeight = 32;
      var height = this._calculateHeight(doctor, padding, lineHeight);

      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = c.BACKGROUND;
      ctx.fillRect(0, 0, width, height);

      // Card background with rounded corners
      ctx.fillStyle = c.CARD_BG;
      this._roundRect(ctx, 20, 20, width - 40, height - 40, 16);
      ctx.fill();

      var currentY = 50;

      // Header bar
      ctx.fillStyle = c.PRIMARY;
      this._roundRect(ctx, 20, 20, width - 40, 70, {tl: 16, tr: 16, bl: 0, br: 0});
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(CBH.config.APP_NAME, width / 2, 60);

      currentY = 110;
      ctx.textAlign = 'left';

      // Doctor Name
      ctx.fillStyle = c.TEXT_PRIMARY;
      ctx.font = 'bold 28px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('\ud83d\udc68\u200d\u2695\ufe0f ' + (doctor.name || 'Unknown Doctor'), padding + 20, currentY);
      currentY += lineHeight + 10;

      // Specialty
      if (doctor.specialty) {
        ctx.fillStyle = c.PRIMARY;
        ctx.font = '600 20px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(doctor.specialty, padding + 20, currentY);
        currentY += lineHeight + 5;
      }

      // Degree
      if (doctor.degree) {
        ctx.fillStyle = c.TEXT_SECONDARY;
        ctx.font = '18px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(doctor.degree, padding + 20, currentY);
        currentY += lineHeight + 15;
      }

      // Divider
      this._drawDivider(ctx, padding + 20, currentY, width - padding * 2 - 40);
      currentY += 20;

      // Chamber Info
      if (doctor.chamber_name) {
        ctx.fillStyle = c.TEXT_PRIMARY;
        ctx.font = '600 18px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\ud83c\udfe5 ' + doctor.chamber_name, padding + 20, currentY);
        currentY += lineHeight;
      }

      if (doctor.chamber_address) {
        ctx.fillStyle = c.TEXT_SECONDARY;
        ctx.font = '16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\ud83d\udccd ' + doctor.chamber_address, padding + 20, currentY);
        currentY += lineHeight;
      }

      if (doctor.area || doctor.city) {
        ctx.fillStyle = c.TEXT_MUTED;
        ctx.font = '16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\ud83c\udf10 ' + [doctor.area, doctor.city].filter(Boolean).join(', '), padding + 20, currentY);
        currentY += lineHeight + 15;
      }

      // Divider
      this._drawDivider(ctx, padding + 20, currentY, width - padding * 2 - 40);
      currentY += 20;

      // Sessions
      ctx.fillStyle = c.TEXT_PRIMARY;
      ctx.font = '600 17px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('\ud83d\udd50 Chamber Hours', padding + 20, currentY);
      currentY += lineHeight;

      var sessions = [doctor.session_1, doctor.session_2, doctor.session_3].filter(Boolean);
      if (sessions.length > 0) {
        ctx.fillStyle = c.TEXT_SECONDARY;
        ctx.font = '16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        for (var i = 0; i < sessions.length; i++) {
          ctx.fillText('\u2022 ' + sessions[i], padding + 40, currentY);
          currentY += lineHeight - 4;
        }
      } else {
        ctx.fillStyle = c.TEXT_MUTED;
        ctx.font = '16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\u2022 Contact for timing', padding + 40, currentY);
        currentY += lineHeight;
      }

      if (doctor.time_description) {
        ctx.fillStyle = c.TEXT_MUTED;
        ctx.font = 'italic 15px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('Note: ' + doctor.time_description, padding + 40, currentY);
        currentY += lineHeight + 10;
      }

      currentY += 10;

      // Fees
      if (doctor.fees) {
        ctx.fillStyle = c.TEXT_PRIMARY;
        ctx.font = '600 18px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\ud83d\udcb0 Fees: ' + doctor.fees, padding + 20, currentY);
        currentY += lineHeight + 15;
      }

      // Divider
      this._drawDivider(ctx, padding + 20, currentY, width - padding * 2 - 40);
      currentY += 20;

      // Contact
      if (doctor.phone) {
        ctx.fillStyle = c.TEXT_PRIMARY;
        ctx.font = '600 17px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('\ud83d\udcde Contact', padding + 20, currentY);
        currentY += lineHeight;
        ctx.fillStyle = c.PRIMARY;
        ctx.font = 'bold 20px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(doctor.phone, padding + 20, currentY);
        currentY += lineHeight + 10;
      }

      // Verification Badge
      currentY += 10;
      var isVerified = (doctor.verification || '').toLowerCase().indexOf('verified') !== -1;
      var badgeText = isVerified ? '\u2713 Verified' : '\u26a0 Listed by Community';
      var badgeBg = isVerified ? c.VERIFIED_BG : c.LISTED_BG;
      var badgeTextColor = isVerified ? c.VERIFIED_TEXT : c.LISTED_TEXT;

      ctx.font = '600 15px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      var badgeWidth = ctx.measureText(badgeText).width + 30;
      var badgeHeight = 34;
      var badgeX = padding + 20;
      var badgeY = currentY - 24;

      ctx.fillStyle = badgeBg;
      this._roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 8);
      ctx.fill();

      ctx.fillStyle = badgeTextColor;
      ctx.fillText(badgeText, badgeX + 15, currentY - 2);

      currentY += 30;

      // Footer / Watermark
      currentY += 30;
      ctx.fillStyle = c.PRIMARY_SOFT;
      this._roundRect(ctx, 20, height - 80, width - 40, 60, {tl: 0, tr: 0, bl: 16, br: 16});
      ctx.fill();

      ctx.fillStyle = c.PRIMARY;
      ctx.font = '600 16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Cooch Behar Healthcare Directory', width / 2, height - 50);

      ctx.fillStyle = c.TEXT_MUTED;
      ctx.font = '13px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText('Community-powered healthcare discovery', width / 2, height - 28);

      // Trigger download
      var fileName = (doctor.name || 'doctor').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_coochbehar.png';

      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    },

    /**
     * Calculate required canvas height based on doctor data presence.
     */
    _calculateHeight: function(doctor, padding, lineHeight) {
      var height = 320;

      if (doctor.degree) height += lineHeight;
      if (doctor.chamber_name) height += lineHeight;
      if (doctor.chamber_address) height += lineHeight;
      if (doctor.area || doctor.city) height += lineHeight;

      var sessions = [doctor.session_1, doctor.session_2, doctor.session_3].filter(Boolean);
      height += Math.max(sessions.length, 1) * (lineHeight - 4) + lineHeight + 20;
      if (doctor.time_description) height += lineHeight;

      if (doctor.fees) height += lineHeight + 15;
      if (doctor.phone) height += lineHeight * 2 + 20;

      height += 80;  // Badge + spacing
      height += 100; // Footer

      return height;
    },

    /**
     * Draw a horizontal divider line.
     */
    _drawDivider: function(ctx, x, y, width) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.strokeStyle = CBH.config.COLORS.BORDER;
      ctx.lineWidth = 1;
      ctx.stroke();
    },

    /**
     * Draw a rounded rectangle path (does not fill/stroke).
     * Supports uniform radius or per-corner radii object.
     */
    _roundRect: function(ctx, x, y, width, height, radius) {
      if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
    }
  };
})();
