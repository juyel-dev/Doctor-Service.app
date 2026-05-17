// CSV parser – converts CSV text to array of objects
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
}

// Fetch CSV from published Google Sheet URL
async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('CSV fetch failed');
  return await res.text();
}

// --- News: Fetch from published Google Doc (HTML table) ---
async function fetchNewsFromDoc(docPublishedUrl) {
  const res = await fetch(docPublishedUrl);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const table = doc.querySelector('table');
  if (!table) return [];

  const rows = table.querySelectorAll('tr');
  if (rows.length < 2) return [];

  // Assume first row is header, rest are data
  const headerCells = Array.from(rows[0].querySelectorAll('td, th')).map(cell => cell.textContent.trim().toLowerCase());
  const newsItems = [];

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll('td');
    const item = {};
    headerCells.forEach((key, idx) => {
      item[key] = cells[idx] ? cells[idx].innerHTML : ''; // rich content
    });
    // Map to our expected fields (English)
    const mapped = {
      news_id: item['news id'] || item['news_id'] || '',
      title: item['title'] || '',
      short_description: item['short description'] || item['short_description'] || '',
      description: item['full description'] || item['description'] || '',
      image_url: item['image url'] || item['image_url'] || '',
      cta_text: item['cta text'] || item['cta_text'] || '',
      cta_link: item['cta link'] || item['cta_link'] || '',
      status: (item['status'] || 'active').trim().toLowerCase(),
      priority: parseInt(item['priority'] || '5'),
      publish_date: item['publish date'] || item['publish_date'] || '',
      expiry_date: item['expiry date'] || item['expiry_date'] || ''
    };
    if (mapped.status === 'active' && mapped.title) {
      // expiry check later
      newsItems.push(mapped);
    }
  }
  return newsItems.sort((a,b) => a.priority - b.priority);
}
