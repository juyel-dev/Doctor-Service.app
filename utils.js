// Debounce function for search input
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Format date from YYYY-MM-DD to readable Bengali-like (simple)
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('bn-BD', { year:'numeric', month:'short', day:'numeric' });
}

// Simple sanitize (prevents XSS from user content)
function sanitize(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Generate unique session ID (used for analytics)
function getSessionId() {
  if (!localStorage.getItem('sid')) {
    localStorage.setItem('sid', 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
  }
  return localStorage.getItem('sid');
}
