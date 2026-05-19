const Data = {
  doctors: [],
  notice: "",
  visitors: 0,

  async loadAll() {
    await Promise.all([Data._loadDoctors(), Data._loadMeta()]);
  },

  async _loadDoctors() {
    try {
      const res = await fetch(CONFIG.SHEET_CSV + "&t=" + Date.now());
      const csv = await res.text();
      const rows = Data._parseCSV(csv);
      Data.doctors = rows.slice(1)
        .filter(r => r[CONFIG.C.NAME]?.trim())
        .map(Data._mapRow);
    } catch (e) {
      console.error("CSV load error:", e);
      Data.doctors = [];
    }
  },

  _parseCSV(text) {
    const rows = [];
    let row = [], cur = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQ && text[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (c === ',' && !inQ) {
        row.push(cur.trim()); cur = "";
      } else if ((c === '\n' || c === '\r') && !inQ) {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cur.trim());
        if (row.some(v => v)) rows.push(row);
        row = []; cur = "";
      } else {
        cur += c;
      }
    }
    if (cur || row.length) { row.push(cur.trim()); if (row.some(v => v)) rows.push(row); }
    return rows;
  },

  _mapRow(r) {
    const g = i => (r[i] || "").trim();
    const C = CONFIG.C;
    const d = {
      id: g(C.ID), name: g(C.NAME), spec: g(C.SPEC),
      deg: g(C.DEG), chamber: g(C.CHAMBER), addr: g(C.ADDR),
      area: g(C.AREA), city: g(C.CITY), phone: g(C.PHONE),
      wa: g(C.WA), s1: g(C.S1), s2: g(C.S2),
      s3: g(C.S3), note: g(C.NOTE), fees: g(C.FEES),
      verif: g(C.VERIF), at: g(C.AT)
    };
    d._search = [
      d.name, d.spec, d.deg, d.chamber,
      d.addr, d.area, d.city, d.phone
    ].join(" ").toLowerCase();
    return d;
  },

  async _loadMeta() {
    if (CONFIG.GAS_URL === "Place_Holder") return;
    try {
      const res = await fetch(CONFIG.GAS_URL + "?action=getStats&t=" + Date.now());
      const json = await res.json();
      Data.notice = json.notice || "";
      Data.visitors = Number(json.visitors) || 0;
    } catch {}
  },

  getSpecialties() {
    const seen = new Set();
    return Data.doctors
      .map(d => d.spec)
      .filter(s => s && !seen.has(s) && seen.add(s))
      .sort();
  },

  getAreas() {
    const seen = new Set();
    return Data.doctors
      .map(d => d.area)
      .filter(a => a && !seen.has(a) && seen.add(a))
      .sort();
  },

  search(query, spec, area) {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    let result = Data.doctors.filter(d => {
      if (spec && d.spec !== spec) return false;
      if (area && d.area !== area) return false;
      if (!tokens.length) return true;
      return tokens.every(t => d._search.includes(t));
    });

    if (q) {
      result = result.sort((a, b) => {
        const aEx = a._search.startsWith(q) ? 2 : a._search.includes(q) ? 1 : 0;
        const bEx = b._search.startsWith(q) ? 2 : b._search.includes(q) ? 1 : 0;
        return bEx - aEx;
      });
    }

    return result;
  },

  async submitDoctor(payload) {
    if (CONFIG.GAS_URL === "Place_Holder") {
      throw new Error("GAS URL not configured");
    }
    const res = await fetch(CONFIG.GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addDoctor", ...payload })
    });
    return res.json();
  },

  async trackVisit() {
    if (CONFIG.GAS_URL === "Place_Holder") return null;
    try {
      await fetch(CONFIG.GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pageview", sid: Utils.getSession() })
      });
      const res = await fetch(CONFIG.GAS_URL + "?action=getStats&t=" + Date.now());
      const json = await res.json();
      Data.visitors = Number(json.visitors) || Data.visitors;
      return Data.visitors;
    } catch { return null; }
  }
};
