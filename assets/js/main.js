
(() => {
  // progressive enhancement: handle main search button
  const siteSearchBtn = document.getElementById('search-btn');
  if (siteSearchBtn) {
    siteSearchBtn.addEventListener('click', () => {
      const q = (document.getElementById('site-search') || {}).value || '';
      if (!q) return;
      window.dispatchEvent(new CustomEvent('nenzee:search', { detail: { query: q, scope: 'all' } }));
    });
  }

  // wire story-level searches (if present)
  const storyBtn = document.getElementById('story-search-btn');
  if (storyBtn) {
    storyBtn.addEventListener('click', () => {
      const q = (document.getElementById('story-search') || {}).value || '';
      window.dispatchEvent(new CustomEvent('nenzee:search', { detail: { query: q, scope: 'story' } }));
    });
  }

  const chapterBtn = document.getElementById('chapter-search-btn');
  if (chapterBtn) {
    chapterBtn.addEventListener('click', () => {
      const q = (document.getElementById('chapter-search') || {}).value || '';
      window.dispatchEvent(new CustomEvent('nenzee:search', { detail: { query: q, scope: 'chapter' } }));
    });
  }

  // keyboard accessibility: press Enter on focused .card goes to first link
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      const active = document.activeElement;
      if (active && active.classList && active.classList.contains('card')) {
        const link = active.querySelector('a');
        if (link) link.focus();
      }
    }
  });

  // Azure Function form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('#c-name')?.value || '';
      const email = contactForm.querySelector('#c-email')?.value || '';
      const message = contactForm.querySelector('#c-message')?.value || '';

      const response = await fetch('https://your-function-app.azurewebsites.net/api/HttpFormSubmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        alert('Message sent!');
        contactForm.reset(); // ✅ Clears the form
      } else {
        alert('Error sending message.');
      }
    });
  }
})();