// public/main.js
(() => {
  // Site-wide search trigger
  const triggerSearch = (btnId, inputId, scope) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const q = (document.getElementById(inputId)?.value || '').trim();
      if (!q) return;
      window.dispatchEvent(new CustomEvent('nenzee:search', {detail: {query: q, scope}}));
    });
  };
  triggerSearch('search-btn', 'site-search', 'all');
  triggerSearch('story-search-btn', 'story-search', 'story');
  triggerSearch('chapter-search-btn', 'chapter-search', 'chapter');

  // Enter key accessibility for .card focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList?.contains('card')) {
      const link = e.target.querySelector('a');
      if (link) link.focus();
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#comment-name')?.value || '';
      const email = contactForm.querySelector('#comment-email')?.value || '';
      const comment = contactForm.querySelector('#comment-comment')?.value || '';
      const clientnum = contactForm.querySelector('#comment-clientnum')?.value || '';

      if (!name || !email || !comment) {
        alert('Please fill out all required fields.');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/contactForm', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name, email, comment, clientnum})
        });

        if (res.ok) {
          alert('Your message has been submitted.');
          contactForm.reset();
        } else {
          const errText = await res.text();
          alert('Error: ' + errText);
        }
      } catch (err) {
        alert('Connection error: ' + err.message);
      }
    });
  }

  // Basic Search Logic (local JSON)
  let INDEX = null;
  const loadIndex = async () => {
    if (INDEX) return INDEX;
    try {
      const res = await fetch('/searchIndex.json');
      INDEX = await res.json();
    } catch (err) {
      console.warn('Failed to load search index:', err);
      INDEX = [];
    }
    return INDEX;
  };

  const matches = (text, q) => text?.toLowerCase().includes(q.toLowerCase());
  const renderResults = (results, sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = results.length
      ? results.map((r) => `<article class="card"><h3><a href="${r.url}">${r.title}</a></h3><p>${r.snippet||''}</p></article>`).join('')
      : '<div class="card"><p>No results found.</p></div>';
  };

  const runSearch = async (q, scope) => {
    if (!q) return;
    const idx = await loadIndex();
    const results = idx.filter((i) => matches(i.title,q) || matches(i.snippet,q) || matches(i.content,q));
    renderResults(results, '#search-results');
  };

  window.addEventListener('nenzee:search', (ev) => {
    const {query, scope} = ev.detail || {};
    runSearch(query, scope);
  });
})();
