// assets/js/main.js
// Handles basic nav behaviors and wiring search input clicks to search.js search function.
// Follow your code style: parentheses around params, minimal spaces inside objects.

(() => {
  // progressive enhancement: handle main search button
  const siteSearchBtn = document.getElementById('search-btn');
  if(siteSearchBtn){
    siteSearchBtn.addEventListener('click', () => {
      const q = (document.getElementById('site-search')||{}).value || '';
      if(!q) return;
      // navigate to results handled by search.js (it listens for 'nenzee:search' event)
      window.dispatchEvent(new CustomEvent('nenzee:search',{detail:{query:q,scope:'all'}}));
    });
  }

  // wire story-level searches (if present)
  const storyBtn=document.getElementById('story-search-btn');
  if(storyBtn){
    storyBtn.addEventListener('click', () => {
      const q=(document.getElementById('story-search')||{}).value||'';
      window.dispatchEvent(new CustomEvent('nenzee:search',{detail:{query:q,scope:'story'}}));
    });
  }

  const chapterBtn=document.getElementById('chapter-search-btn');
  if(chapterBtn){
    chapterBtn.addEventListener('click', () => {
      const q=(document.getElementById('chapter-search')||{}).value||'';
      window.dispatchEvent(new CustomEvent('nenzee:search',{detail:{query:q,scope:'chapter'}}));
    });
  }

  // generic keyboard accessibility: press Enter on focused .card goes to first link
  document.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter'){
      const active = document.activeElement;
      if(active && active.classList && active.classList.contains('card')){
        const link = active.querySelector('a');
        if(link) link.focus();
      }
    }
  });
})();