// Config – update these URLs after publishing Sheets & Doc
const DOCTORS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=...&single=true&output=csv';
const NEWS_DOC_HTML_URL = 'https://docs.google.com/document/d/e/2PACX-.../pub?embedded=true'; // published as web page
const GAS_SUBMIT_URL = 'https://script.google.com/macros/s/.../exec'; // doPost endpoint
const GAS_ANALYTICS_URL = 'https://script.google.com/macros/s/.../exec'; // analytics logger

let doctors = [];
let filteredDoctors = [];
let allCategories = [];

// DOM elements
const searchInput = document.getElementById('search-input');
const specialtyFilter = document.getElementById('specialty-filter');
const quickCategoriesDiv = document.getElementById('quick-categories');
const doctorListDiv = document.getElementById('doctor-list');
const announceBar = document.getElementById('announcement-bar');
const newsCardsDiv = document.getElementById('news-cards');
const popup = document.getElementById('doctor-popup');
const popupDetails = document.getElementById('popup-details');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Load doctors CSV
    const csvText = await fetchCSV(DOCTORS_CSV_URL);
    doctors = parseCSV(csvText);
    // 2. Extract unique categories (specialties)
    const specialties = new Set(doctors.map(d => d.specialty).filter(Boolean));
    allCategories = Array.from(specialties).sort();
    populateSpecialtyFilter(allCategories);
    renderQuickCategories(allCategories);
    // Initial render
    applyFilters();
  } catch (err) {
    console.error('Doctor data load failed:', err);
    doctorListDiv.innerHTML = '<p>ডাক্তারের তথ্য আপাতত লোড হয়নি। অনুগ্রহ করে পরে চেষ্টা করুন।</p>';
  }

  // Load news
  try {
    const news = await fetchNewsFromDoc(NEWS_DOC_HTML_URL);
    renderNews(news);
    renderAnnouncementBar(news);
  } catch (e) {
    console.warn('News load failed:', e);
  }

  // Analytics
  logVisit();
  updateStatsDisplay();
  // Periodically update online count simulation
  setInterval(updateOnlineSimulation, 30000);
  
  // Event listeners
  searchInput.addEventListener('input', debounce(applyFilters, 300));
  specialtyFilter.addEventListener('change', applyFilters);
  
  // Quick category clicks
  quickCategoriesDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
      const cat = e.target.dataset.category;
      searchInput.value = '';
      specialtyFilter.value = cat;
      applyFilters();
    }
  });

  // Form submission
  document.getElementById('contribute-form').addEventListener('submit', handleContribution);

  // Popup close
  document.querySelector('.close-popup').addEventListener('click', () => popup.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
  });
});

// --- RENDERING ---
function renderDoctors(list) {
  if (list.length === 0) {
    doctorListDiv.innerHTML = '<p style="text-align:center; padding:2rem;">কোন ডাক্তার পাওয়া যায়নি।</p>';
    return;
  }
  doctorListDiv.innerHTML = list.map(doc => `
    <div class="doctor-card">
      <h3>${sanitize(doc.doctor_name)}</h3>
      <div class="specialty">${sanitize(doc.specialty)}</div>
      <div class="degree">${sanitize(doc.degree)}</div>
      <div class="chamber">📍 ${sanitize(doc.chamber_name)}, ${sanitize(doc.area)}</div>
      <div class="timing">🕒 ${sanitize(doc.timing)}</div>
      ${doc.verification_status === 'verified' 
        ? '<span class="verification-badge badge-verified">✔ ভেরিফাইড</span>'
        : doc.verification_status === 'community'
        ? '<span class="verification-badge badge-community">👥 কমিউনিটি আপডেট</span>'
        : '<span class="verification-badge badge-listed">📋 তালিকাভুক্ত</span>'
      }
      <div class="doctor-actions">
        <a href="tel:${doc.phone}" class="btn-call">📞 কল</a>
        <a href="https://wa.me/91${doc.phone.replace(/\D/g,'')}" target="_blank" class="btn-whatsapp">💬 WhatsApp</a>
        <button onclick="showDoctorDetail('${doc.doctor_id}')">বিস্তারিত</button>
      </div>
    </div>
  `).join('');
}

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const specialty = specialtyFilter.value;
  
  filteredDoctors = doctors.filter(doc => {
    const matchSearch = !searchTerm || 
      (doc.doctor_name.toLowerCase().includes(searchTerm) ||
       doc.specialty.toLowerCase().includes(searchTerm) ||
       doc.chamber_name.toLowerCase().includes(searchTerm) ||
       doc.area.toLowerCase().includes(searchTerm));
    const matchSpecialty = !specialty || doc.specialty === specialty;
    return matchSearch && matchSpecialty;
  });
  renderDoctors(filteredDoctors);
}

function populateSpecialtyFilter(categories) {
  specialtyFilter.innerHTML = '<option value="">সকল স্পেশালিটি</option>' +
    categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderQuickCategories(cats) {
  quickCategoriesDiv.innerHTML = cats.map(c => 
    `<button class="category-btn" data-category="${c}">${c}</button>`
  ).join('');
}

// Doctor detail popup
window.showDoctorDetail = function(id) {
  const doc = doctors.find(d => d.doctor_id === id);
  if (!doc) return;
  popupDetails.innerHTML = `
    <h2>${sanitize(doc.doctor_name)}</h2>
    <p>${sanitize(doc.specialty)} | ${sanitize(doc.degree)}</p>
    <p>🏥 ${sanitize(doc.chamber_name)}</p>
    <p>📍 ${sanitize(doc.area)}</p>
    <p>⏰ ${sanitize(doc.timing)}</p>
    <p>💰 ফি: ${sanitize(doc.fees)}</p>
    <p>📞 ${sanitize(doc.phone)}</p>
    ${doc.verification_status === 'verified' 
      ? '<span class="verification-badge badge-verified">✔ ভেরিফাইড</span>'
      : '<span class="verification-badge badge-listed">📋 তালিকাভুক্ত</span>'}
  `;
  popup.style.display = 'flex';
};

// --- NEWS RENDERING ---
function renderNews(items) {
  if (!items.length) {
    newsCardsDiv.innerHTML = '<p>কোনো নতুন আপডেট নেই।</p>';
    return;
  }
  newsCardsDiv.innerHTML = items.map(item => `
    <div class="news-card">
      <h3>${item.title}</h3>
      ${item.short_description ? `<p>${item.short_description}</p>` : ''}
      ${item.description ? `<div>${item.description}</div>` : ''}
      ${item.image_url ? `<img src="${item.image_url}" alt="">` : ''}
      ${item.cta_link && item.cta_text ? `<a href="${item.cta_link}" class="news-cta" target="_blank">${item.cta_text}</a>` : ''}
      <small style="color:#718096;">${formatDate(item.publish_date)}</small>
    </div>
  `).join('');
}

function renderAnnouncementBar(items) {
  const active = items.find(i => i.priority === 1); // highest priority
  if (active) {
    announceBar.style.display = 'block';
    announceBar.innerHTML = `📌 ${active.title} 
      ${active.cta_link ? `<a href="${active.cta_link}" target="_blank">${active.cta_text || 'বিস্তারিত'}</a>` : ''}`;
  } else {
    announceBar.style.display = 'none';
  }
}

// --- ANALYTICS ---
async function logVisit() {
  const payload = {
    action: 'pageview',
    session: getSessionId(),
    page: window.location.pathname,
    referrer: document.referrer,
    timestamp: new Date().toISOString()
  };
  try {
    await fetch(GAS_ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {}
}

async function updateStatsDisplay() {
  // Try fetching aggregated stats from GAS (optional endpoint)
  try {
    const resp = await fetch(GAS_ANALYTICS_URL + '?action=stats');
    const stats = await resp.json();
    document.getElementById('stats-total-visitors').textContent = stats.total || 0;
    document.getElementById('stats-today-visitors').textContent = stats.today || 0;
    document.getElementById('stats-online-users').textContent = stats.online || 0;
  } catch (e) {
    // fallback to local counter in session (simple)
    document.getElementById('stats-total-visitors').textContent = '?';
    document.getElementById('stats-today-visitors').textContent = '?';
  }
}

function updateOnlineSimulation() {
  const el = document.getElementById('stats-online-users');
  // A very naive placeholder; in production, a real-time service is needed.
  if (el.textContent === '?' || el.textContent === '0') {
    el.textContent = Math.floor(Math.random() * 5) + 1; // just for demo
  }
}

// --- USER CONTRIBUTION ---
async function handleContribution(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    submitted_by_name: form.submitted_by_name.value,
    submitted_by_phone: form.submitted_by_phone.value,
    submitted_by_whatsapp: form.submitted_by_whatsapp.value,
    submitted_by_facebook: form.submitted_by_facebook.value,
    message: form.message.value,
    timestamp: new Date().toISOString()
  };
  try {
    await fetch(GAS_SUBMIT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    form.reset();
    alert('আপনার তথ্য জমা হয়েছে। অ্যাডমিন রিভিউ করবে।');
  } catch (err) {
    alert('সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
  }
      }
