/* =========================================================
   CONTENT CREATOR FACELESS MARKETING PLANNER — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  renderVideoBank();
  renderAudioTracker();
});

/* ---------------------------------------------------------
   1. SPA TAB NAVIGATION
   --------------------------------------------------------- */
function initTabNavigation () {
  const tabs = document.querySelectorAll('.tab');
  const pages = document.querySelectorAll('.page');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-target');
      goToPage(targetId, tabs, pages);
    });
  });

  // Support direct #hash links (kept intact for PDF export hyperlinks)
  window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.replace('#', '');
    if (targetId) goToPage(targetId, tabs, pages);
  });
}

function goToPage (targetId, tabs, pages) {
  pages.forEach(page => {
    if (page.id === targetId) {
      page.classList.add('active');
      page.classList.remove('fade-in');
      // restart animation
      void page.offsetWidth;
      page.classList.add('fade-in');
    } else {
      page.classList.remove('active');
    }
  });

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-target') === targetId);
  });
}

/* ---------------------------------------------------------
   2. VIDEO BANK — auto-generated rows (Page 2)
   --------------------------------------------------------- */
function renderVideoBank () {
  const container = document.getElementById('video-bank-list');
  if (!container) return;

  const categories = ['B-Roll', 'Talking Head', 'Screen Record', 'Voiceover', 'Transition', 'Product Shot'];
  const statuses = [
    { key: 'ready',    label: 'Ready' },
    { key: 'progress', label: 'In Progress' },
    { key: 'used',     label: 'Used' }
  ];

  const rows = Array.from({ length: 10 }, (_, i) => {
    const status = statuses[i % statuses.length];
    const category = categories[i % categories.length];
    return { no: i + 1, category, status };
  });

  container.innerHTML = rows.map(row => `
    <div class="tracker-row video-grid-cols">
      <span class="row-no">${String(row.no).padStart(2, '0')}</span>
      <input class="row-input" type="text" placeholder="e.g. Morning coffee pour, desk flatlay..." />
      <div class="row-category">
        <select>
          ${categories.map(c => `<option ${c === row.category ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <span class="status-pill status-${row.status.key}">${row.status.label}</span>
    </div>
  `).join('');
}

/* ---------------------------------------------------------
   3. AUDIO & HOOK TRACKER — auto-generated rows (Page 3)
   --------------------------------------------------------- */
function renderAudioTracker () {
  const container = document.getElementById('audio-tracker-list');
  if (!container) return;

  const trendLevels = ['up', 'up', 'flat', 'up', 'down'];

  const trendIcon = (level) => {
    if (level === 'up') {
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 16L10 10L14 14L20 6" stroke="#A3B19B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 6H20V11" stroke="#A3B19B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (level === 'down') {
      return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 8L10 14L14 10L20 18" stroke="#C97F6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 18H20V13" stroke="#C97F6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12H20" stroke="#D4A373" stroke-width="2.4" stroke-linecap="round"/></svg>`;
  };

  const rows = Array.from({ length: 10 }, (_, i) => trendLevels[i % trendLevels.length]);

  container.innerHTML = rows.map((level) => `
    <div class="tracker-row audio-grid-cols">
      <input class="row-input" type="text" placeholder="Trending audio title..." />
      <input class="row-input" type="text" placeholder="Hook idea for this sound..." />
      <span class="trend-icon">${trendIcon(level)}</span>
    </div>
  `).join('');
}

// Memastikan tombol cetak merespons dengan memanggil print dialog browser secara bersih
document.getElementById('download-btn').addEventListener('click', () => {
    // Jalankan perintah cetak otomatis browser
    window.print();
});

