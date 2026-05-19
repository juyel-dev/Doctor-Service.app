const PNGShare = {
  async share(doc) {
    if (typeof html2canvas === "undefined") {
      Utils.toast("Share library not loaded. Try again.", "error");
      return;
    }
    const card = PNGShare._buildCard(doc);
    document.body.appendChild(card);
    try {
      const canvas = await html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 400,
        logging: false,
        windowWidth: 420
      });
      document.body.removeChild(card);
      const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
      const fname = doc.name.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".png";
      const file = new File([blob], fname, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: doc.name + " — " + CONFIG.APP.NAME,
          text: `${doc.spec ? doc.spec + " • " : ""}${doc.chamber || ""}, ${doc.area || ""}`
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), { href: url, download: fname });
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        Utils.toast("Image saved!", "success");
      }
    } catch (err) {
      if (document.body.contains(card)) document.body.removeChild(card);
      if (err.name !== "AbortError") Utils.toast("Share failed. Try again.", "error");
    }
  },

  _buildCard(d) {
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
      "position:fixed", "left:-9999px", "top:0",
      "width:400px", "background:#fff",
      "font-family:system-ui,-apple-system,sans-serif",
      "padding:0", "border-radius:12px",
      "box-sizing:border-box", "overflow:hidden"
    ].join(";");

    const isVerified = d.verif?.toLowerCase().includes("verified");
    const badge = isVerified
      ? `<span style="background:#dbeafe;color:#1e40af;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">✓ Verified</span>`
      : `<span style="background:#fefcbf;color:#975a16;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;">📋 Listed by community</span>`;

    const sessions = [d.s1, d.s2, d.s3]
      .filter(Boolean)
      .map(s => `<span style="background:#e6fffa;color:#234e52;padding:3px 9px;border-radius:4px;font-size:11px;margin-right:4px;display:inline-block;margin-bottom:4px;">🕐 ${Utils.sanitize(s)}</span>`)
      .join("");

    el.innerHTML = `
<div style="background:#2c7a7b;padding:10px 16px;display:flex;align-items:center;gap:8px;">
  <span style="font-size:20px;">🏥</span>
  <div>
    <div style="color:#fff;font-size:12px;font-weight:700;letter-spacing:0.3px;">${CONFIG.APP.NAME}</div>
    <div style="color:rgba(255,255,255,0.75);font-size:10px;">${CONFIG.APP.TAGLINE}</div>
  </div>
</div>
<div style="padding:16px;">
  ${d.spec ? `<div style="color:#2c7a7b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">${Utils.sanitize(d.spec)}</div>` : ""}
  <div style="font-size:21px;font-weight:700;color:#1a202c;margin-bottom:2px;">👨‍⚕️ ${Utils.sanitize(d.name)}</div>
  ${d.deg ? `<div style="color:#718096;font-size:12px;margin-bottom:10px;">${Utils.sanitize(d.deg)}</div>` : `<div style="margin-bottom:10px;"></div>`}
  <div style="margin-bottom:12px;">${badge}</div>
  ${d.chamber ? `<div style="font-size:13px;color:#2d3748;margin-bottom:3px;">🏥 ${Utils.sanitize(d.chamber)}</div>` : ""}
  ${d.addr || d.area ? `<div style="font-size:12px;color:#718096;margin-bottom:10px;">📍 ${Utils.sanitize([d.addr, d.area, d.city].filter(Boolean).join(", "))}</div>` : ""}
  ${sessions ? `<div style="margin-bottom:10px;">${sessions}</div>` : ""}
  ${d.fees ? `<div style="font-size:14px;font-weight:700;color:#38a169;margin-bottom:10px;">💰 ${Utils.sanitize(d.fees)}</div>` : ""}
  ${d.phone ? `<div style="font-size:14px;color:#2c7a7b;font-weight:600;padding:8px 12px;background:#e6fffa;border-radius:8px;margin-bottom:4px;">📞 ${Utils.sanitize(d.phone)}</div>` : ""}
</div>
<div style="background:#f7fafc;padding:8px 16px;border-top:1px solid #e2e8f0;font-size:9px;color:#a0aec0;text-align:center;letter-spacing:0.3px;">
  COOCH BEHAR HEALTHCARE DIRECTORY • COMMUNITY POWERED • NOT MEDICAL ADVICE
</div>`;
    return el;
  }
};
