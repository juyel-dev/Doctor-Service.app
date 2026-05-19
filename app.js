const UI = {
  showLoading() {
    Utils.qs("#cards-container").innerHTML =
      `<div class="loading-wrap"><div class="spinner"></div>Loading doctors...</div>`;
  },

  renderCards(docs) {
    const el = Utils.qs("#cards-container");
    if (!docs.length) {
      el.innerHTML = `<div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No doctors found</div>
        <div class="empty-sub">Try a different search or clear the filters.</div>
      </div>`;
      return;
    }
    el.innerHTML = docs.map(UI._cardHTML).join("");
  },

  _cardHTML(d) {
    const isV = d.verif?.toLowerCase().includes("verified");
    const badge = isV
      ? `<span class="card-badge badge-v">✓ Verified</span>`
      : `<span class="card-badge badge-l">📋 Listed</span>`;

    const sessions = [d.s1, d.s2, d.s3].filter(Boolean)
      .map(s => `<span class="session-tag">🕐 ${Utils.sanitize(s)}</span>`).join("");

    const phone = Utils.escapePhone(d.phone);
    const wa = Utils.escapePhone(d.wa || d.phone);

    const callBtn = phone
      ? `<a href="tel:${phone}" class="action-btn btn-call">📞 Call</a>`
      : `<span class="action-btn btn-call" style="opacity:.4;cursor:default;">📞 No Phone</span>`;

    const waBtn = wa
      ? `<a href="https://wa.me/91${wa}" target="_blank" rel="noopener" class="action-btn btn-wa">💬 WhatsApp</a>`
      : "";

    const location = [d.addr, d.area, d.city].filter(Boolean).map(Utils.sanitize).join(", ");

    return `<div class="doctor-card" data-id="${Utils.sanitize(d.id)}">
  ${d.spec ? `<div class="card-spec">${Utils.sanitize(d.spec)}</div>` : ""}
  <div class="card-name">👨‍⚕️ ${Utils.sanitize(d.name)}</div>
  ${d.deg ? `<div class="card-deg">${Utils.sanitize(d.deg)}</div>` : ""}
  ${badge}
  <div class="card-info">
    ${d.chamber ? `<div class="card-row"><span class="card-row-icon">🏥</span><span>${Utils.sanitize(d.chamber)}</span></div>` : ""}
    ${location ? `<div class="card-row"><span class="card-row-icon">📍</span><span>${location}</span></div>` : ""}
    ${d.phone ? `<div class="card-row"><span class="card-row-icon">📞</span><span>${Utils.sanitize(d.phone)}</span></div>` : ""}
  </div>
  ${sessions ? `<div class="sessions-wrap">${sessions}</div>` : ""}
  ${d.fees ? `<div class="card-fees">💰 ${Utils.sanitize(d.fees)}</div>` : ""}
  <div class="card-actions">
    ${callBtn}
    ${waBtn || `<span></span>`}
    <button class="action-btn btn-share" onclick="App.shareCard('${Utils.sanitize(d.id)}')">🖼 Share</button>
    <button class="action-btn btn-detail" onclick="App.toggleDetails('${Utils.sanitize(d.id)}')">🔽 Details</button>
  </div>
  <div class="card-expand" hidden id="exp-${Utils.sanitize(d.id)}">
    ${d.note ? `<div class="exp-row"><span class="exp-lbl">Timing note</span><span class="exp-val">${Utils.sanitize(d.note)}</span></div>` : ""}
    ${d.wa && d.wa !== d.phone ? `<div class="exp-row"><span class="exp-lbl">WhatsApp</span><span class="exp-val">${Utils.sanitize(d.wa)}</span></div>` : ""}
    ${d.city ? `<div class="exp-row"><span class="exp-lbl">City</span><span class="exp-val">${Utils.sanitize(d.city)}</span></div>` : ""}
    ${d.at ? `<div class="exp-row"><span class="exp-lbl">Listed on</span><span class="exp-val">${Utils.fmtDate(d.at)}</span></div>` : ""}
  </div>
  <div class="card-foot">
    <span>${Utils.sanitize(d.area || d.city || "")}</span>
    ${d.id ? `<span class="doc-id">${Utils.sanitize(d.id)}</span>` : ""}
  </div>
</div>`;
  },

  renderSpecPills(specs) {
    const wrap = Utils.qs("#pills-wrap");
    const all = `<button class="pill active" data-spec="" onclick="App.selectSpec(this,'')">🏥 All</button>`;
    const pills = specs.map(s =>
      `<button class="pill" data-spec="${Utils.sanitize(s)}" onclick="App.selectSpec(this,'${Utils.sanitize(s)}')">${Utils.sanitize(s)}</button>`
    ).join("");
    wrap.innerHTML = all + pills;
  },

  renderAreaSelect(areas) {
    const sel = Utils.qs("#area-select");
    const opts = areas.map(a =>
      `<option value="${Utils.sanitize(a)}">${Utils.sanitize(a)}</option>`
    ).join("");
    sel.innerHTML = `<option value="">📍 All Areas</option>` + opts;
  },

  highlightPill(activeSpec) {
    Utils.qsa(".pill").forEach(p => {
      p.classList.toggle("active", p.dataset.spec === activeSpec);
    });
  },

  updateStats(visitors, total) {
    UI.updateVisitors(visitors);
    UI.updateResultCount(total, total);
  },

  updateVisitors(v) {
    const el = Utils.qs("#visitor-count");
    if (el) el.textContent = Utils.fmtNum(v);
  },

  updateResultCount(count, total) {
    const el = Utils.qs("#result-count");
    if (!el) return;
    el.textContent = count === total
      ? `${Utils.fmtNum(total)} doctors`
      : `${Utils.fmtNum(count)} of ${Utils.fmtNum(total)}`;
  },

  openModal(id) {
    const ov = Utils.qs(`#${id}-overlay`);
    if (!ov) return;
    ov.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeModal(id) {
    const ov = Utils.qs(`#${id}-overlay`);
    if (!ov) return;
    ov.classList.remove("open");
    document.body.style.overflow = "";
  },

  showNotice(text) {
    if (!text?.trim()) return;
    const dismissed = localStorage.getItem(CONFIG.APP.NOTICE_KEY);
    if (dismissed === text.trim()) return;

    const el = Utils.qs("#notice-content");
    if (el) el.innerHTML = Utils.autoLink(text);

    const bar = Utils.qs("#announce-bar");
    const barText = Utils.qs("#announce-text");
    if (bar && barText) {
      barText.innerHTML = "📌 " + Utils.autoLink(text);
      Utils.show(bar);
    }

    setTimeout(() => UI.openModal("modal-notice"), 800);

    Utils.on(Utils.qs("#modal-notice-close"), "click", () => {
      localStorage.setItem(CONFIG.APP.NOTICE_KEY, text.trim());
      UI.closeModal("modal-notice");
    });
    Utils.on(Utils.qs("#notice-dismiss"), "click", () => {
      localStorage.setItem(CONFIG.APP.NOTICE_KEY, text.trim());
      UI.closeModal("modal-notice");
    });
    Utils.on(Utils.qs("#announce-close"), "click", () => {
      localStorage.setItem(CONFIG.APP.NOTICE_KEY, text.trim());
      Utils.hide(bar);
    });
  }
};

const App = {
  _state: { query: "", spec: "", area: "" },
  _recorder: null,
  _voiceBlob: null,

  async init() {
    App._registerSW();
    App._bindNav();
    UI.showLoading();
    await Data.loadAll();
    UI.renderSpecPills(Data.getSpecialties());
    UI.renderAreaSelect(Data.getAreas());
    UI.renderCards(Data.doctors);
    UI.updateStats(Data.visitors, Data.doctors.length);
    UI.showNotice(Data.notice);
    App._bindSearch();
    App._bindForms();
    Data.trackVisit().then(v => v && UI.updateVisitors(v));
    App._startVisitorPoll();
  },

  _registerSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  },

  _bindNav() {
    const menu = Utils.qs("#slide-menu");
    const overlay = Utils.qs("#menu-overlay");
    const open = () => { menu.classList.add("open"); overlay.classList.add("show"); document.body.style.overflow = "hidden"; };
    const close = () => { menu.classList.remove("open"); overlay.classList.remove("show"); document.body.style.overflow = ""; };
    Utils.on(Utils.qs("#menu-btn"), "click", open);
    Utils.on(overlay, "click", close);
    Utils.on(Utils.qs("#menu-close-btn"), "click", close);
    Utils.on(Utils.qs("#menu-add-doctor"), "click", () => { close(); UI.openModal("modal-add"); });
    Utils.on(Utils.qs("#menu-feedback"), "click", () => { close(); UI.openModal("modal-feedback"); });
  },

  _bindSearch() {
    const inp = Utils.qs("#search-input");
    const clr = Utils.qs("#search-clear");
    const area = Utils.qs("#area-select");

    const run = Utils.debounce(() => {
      App._state.query = inp.value;
      clr.hidden = !inp.value;
      App._filter();
    }, CONFIG.APP.DEBOUNCE_MS);

    Utils.on(inp, "input", run);
    Utils.on(clr, "click", () => {
      inp.value = "";
      App._state.query = "";
      clr.hidden = true;
      App._filter();
    });
    Utils.on(area, "change", () => {
      App._state.area = area.value;
      App._filter();
    });
  },

  _filter() {
    const result = Data.search(App._state.query, App._state.spec, App._state.area);
    UI.renderCards(result);
    UI.updateResultCount(result.length, Data.doctors.length);
  },

  selectSpec(btn, spec) {
    App._state.spec = App._state.spec === spec ? "" : spec;
    UI.highlightPill(App._state.spec);
    App._filter();
  },

  toggleDetails(id) {
    const exp = Utils.qs(`#exp-${id}`);
    const card = exp?.closest(".doctor-card");
    if (!exp) return;
    const open = exp.hidden;
    exp.hidden = !open;
    const detBtn = card?.querySelector(".btn-detail");
    if (detBtn) detBtn.textContent = open ? "🔼 Less" : "🔽 Details";
  },

  shareCard(id) {
    const doc = Data.doctors.find(d => d.id === id);
    if (!doc) { Utils.toast("Doctor not found.", "error"); return; }
    PNGShare.share(doc);
  },

  _bindForms() {
    Utils.on(Utils.qs("#fab-add"), "click", () => UI.openModal("modal-add"));
    Utils.on(Utils.qs("#modal-add-close"), "click", () => UI.closeModal("modal-add"));
    Utils.on(Utils.qs("#modal-add-overlay"), "click", e => { if (e.target === e.currentTarget) UI.closeModal("modal-add"); });
    Utils.on(Utils.qs("#doctor-form"), "submit", App._submitDoctor);

    Utils.on(Utils.qs("#fab-feedback"), "click", () => UI.openModal("modal-feedback"));
    Utils.on(Utils.qs("#modal-feedback-close"), "click", () => UI.closeModal("modal-feedback"));
    Utils.on(Utils.qs("#modal-feedback-overlay"), "click", e => { if (e.target === e.currentTarget) UI.closeModal("modal-feedback"); });
    Utils.on(Utils.qs("#feedback-form"), "submit", App._submitFeedback);

    App._bindVoice();
    App._bindImageUpload();
  },

  async _submitDoctor(e) {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector("[type=submit]");

    const req = [
      [f.doc_name, "Doctor name is required"],
      [f.doc_spec, "Specialty is required"],
      [f.doc_chamber, "Chamber name is required"],
      [f.doc_area, "Area is required"],
      [f.doc_phone, "Phone number is required"],
      [f.sub_name, "Your name is required"],
      [f.sub_phone, "Your phone is required"]
    ];
    let valid = true;
    req.forEach(([field, msg]) => {
      field.classList.remove("err");
      if (!field.value.trim()) { field.classList.add("err"); if (valid) { Utils.toast(msg, "error"); field.focus(); } valid = false; }
    });
    if (!valid) return;

    const payload = {
      name: f.doc_name.value.trim(),
      specialty: f.doc_spec.value.trim(),
      degree: f.doc_deg.value.trim(),
      chamber_name: f.doc_chamber.value.trim(),
      chamber_address: f.doc_addr.value.trim(),
      area: f.doc_area.value.trim(),
      city: f.doc_city.value.trim(),
      phone: f.doc_phone.value.trim(),
      whatsapp: f.doc_wa.value.trim(),
      session_1: f.doc_s1.value.trim(),
      session_2: f.doc_s2.value.trim(),
      session_3: f.doc_s3.value.trim(),
      time_description: f.doc_note.value.trim(),
      fees: f.doc_fees.value.trim(),
      submitted_by: f.sub_name.value.trim(),
      submitter_address: f.sub_addr.value.trim(),
      submitter_phone: f.sub_phone.value.trim()
    };

    btn.disabled = true;
    btn.textContent = "Submitting…";
    try {
      const res = await Data.submitDoctor(payload);
      if (res.success) {
        UI.closeModal("modal-add");
        f.reset();
        Utils.toast(`✅ Submitted! ID: ${res.doctor_id || "pending"}`, "success");
      } else {
        Utils.toast(res.message || "Submission failed. Try again.", "error");
      }
    } catch (err) {
      Utils.toast(CONFIG.GAS_URL === "Place_Holder" ? "GAS URL not set yet." : "Network error. Try again.", "error");
    }
    btn.disabled = false;
    btn.textContent = "Submit Doctor";
  },

  _bindVoice() {
    const btn = Utils.qs("#voice-btn");
    if (!btn || !navigator.mediaDevices) {
      if (btn) Utils.hide(btn);
      return;
    }
    Utils.on(btn, "click", async () => {
      if (App._recorder?.state === "recording") { App._recorder.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        App._recorder = new MediaRecorder(stream);
        App._recorder.ondataavailable = e => chunks.push(e.data);
        App._recorder.onstop = () => {
          App._voiceBlob = new Blob(chunks, { type: "audio/webm" });
          stream.getTracks().forEach(t => t.stop());
          btn.textContent = "🎤 Voice recorded ✓";
          btn.classList.remove("recording");
        };
        App._recorder.start();
        btn.textContent = "⏹ Stop Recording";
        btn.classList.add("recording");
        setTimeout(() => { if (App._recorder?.state === "recording") App._recorder.stop(); }, 15000);
      } catch { Utils.toast("Microphone access denied.", "error"); }
    });
  },

  _bindImageUpload() {
    const input = Utils.qs("#img-input");
    const preview = Utils.qs("#img-preview");
    if (!input) return;
    Utils.on(input, "change", () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => { preview.src = e.target.result; preview.classList.add("show"); };
      reader.readAsDataURL(file);
    });
  },

  async _submitFeedback(e) {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector("[type=submit]");
    const text = Utils.qs("#feedback-text")?.value.trim() || "";
    const imgFile = Utils.qs("#img-input")?.files[0];

    if (!text && !App._voiceBlob && !imgFile) {
      Utils.toast("Please add text, image, or voice.", "error");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending…";

    const base = `https://api.telegram.org/bot${CONFIG.TG.BOT}`;
    const chat = CONFIG.TG.CHAT;

    try {
      if (text) {
        const msg = `📬 *Feedback — ${CONFIG.APP.NAME}*\n\n${text}\n\n⏰ ${new Date().toLocaleString("en-IN")}`;
        await fetch(`${base}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chat, text: msg, parse_mode: "Markdown" })
        });
      }
      if (imgFile) {
        const fd = new FormData();
        fd.append("chat_id", chat);
        fd.append("photo", imgFile, imgFile.name);
        if (text) fd.append("caption", text.slice(0, 1024));
        await fetch(`${base}/sendPhoto`, { method: "POST", body: fd });
      }
      if (App._voiceBlob) {
        const fd = new FormData();
        fd.append("chat_id", chat);
        fd.append("voice", App._voiceBlob, "voice.webm");
        await fetch(`${base}/sendVoice`, { method: "POST", body: fd });
      }

      UI.closeModal("modal-feedback");
      f.reset();
      App._voiceBlob = null;
      App._recorder = null;
      const preview = Utils.qs("#img-preview");
      if (preview) { preview.classList.remove("show"); preview.src = ""; }
      const voiceBtn = Utils.qs("#voice-btn");
      if (voiceBtn) { voiceBtn.textContent = "🎤 Record Voice (max 15s)"; voiceBtn.classList.remove("recording"); }
      Utils.toast("✅ Feedback sent! Thank you.", "success");
    } catch { Utils.toast("Failed to send. Check connection.", "error"); }

    btn.disabled = false;
    btn.textContent = "Submit Feedback";
  },

  _startVisitorPoll() {
    setInterval(async () => {
      const v = await Data.trackVisit();
      if (v) UI.updateVisitors(v);
    }, CONFIG.APP.VISITOR_MS);
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
