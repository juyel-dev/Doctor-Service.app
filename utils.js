const Utils = {
  debounce(fn, ms) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  },

  sanitize(s) {
    return String(s || "").replace(/[<>"'&]/g, c =>
      ({ "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "&": "&amp;" }[c])
    );
  },

  autoLink(s) {
    return Utils.sanitize(s).replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  },

  fmtDate(s) {
    if (!s) return "";
    try {
      return new Date(s).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
      });
    } catch { return s; }
  },

  fmtNum(n) {
    const num = Number(n);
    return isNaN(num) ? "0" : num.toLocaleString("en-IN");
  },

  getSession() {
    const k = CONFIG.APP.SESSION_KEY;
    let id = sessionStorage.getItem(k);
    if (!id) {
      id = "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(k, id);
    }
    return id;
  },

  qs: (sel, root = document) => root.querySelector(sel),
  qsa: (sel, root = document) => [...root.querySelectorAll(sel)],
  on: (el, ev, fn) => el?.addEventListener(ev, fn),

  show(el) { el && (el.hidden = false); },
  hide(el) { el && (el.hidden = true); },

  toast(msg, type = "info") {
    Utils.qs(".toast")?.remove();
    const t = document.createElement("div");
    t.className = `toast toast--${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => t.classList.add("toast--show"));
    });
    setTimeout(() => {
      t.classList.remove("toast--show");
      setTimeout(() => t.remove(), 320);
    }, 3200);
  },

  escapePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
  }
};
