
(() => {
  // load index once for performance
  let INDEX = null;
  const loadIndex = async () => {
    if(INDEX) return INDEX;
    try{
      const res = await fetch(new URL('/searchIndex.json', location.origin).pathname);
      INDEX = await res.json();
    }catch(err){
      console.warn('Failed to load searchIndex.json', err);
      INDEX = [];
    }
    return INDEX;
  };

  // utility: simple token match
  const matches = (text, q) => {
    if(!text) return false;
    return text.toLowerCase().includes(q.toLowerCase());
  };

  const renderResults = (results, containerSelector) => {
    const cont = document.querySelector(containerSelector);
    if(!cont) return;
    if(results.length===0){
      cont.innerHTML = '<div class="card"><p>No results found.</p></div>';
      return;
    }
    cont.innerHTML = results.map((r) => `<article class="card"><h3><a href="${r.url}">${r.title}</a></h3><p>${r.snippet||''}</p><div style="font-size:0.85rem;color:rgba(255,255,255,0.6)">on <em>${r.page}</em></div></article>`).join('');
  };

  // core search runner
  const runSearch = async (q, scope) => {
    if(!q) return;
    if(scope === 'all'){
      const idx = await loadIndex();
      // naive relevance: title matches first
      const results = idx.filter((item) => matches(item.title,q) || matches(item.snippet||'',q) || matches(item.content||'',q));
      renderResults(results,'#search-results');

    } else if(scope === 'story'){
      // story-level: try to locate story id from URL
      const path = location.pathname;
      // example path: /sites/story-1/index.html
      const match = path.match(/story-\d+/);
      const storyId = match?match[0]:null;
      if(!storyId){
        // fallback: searchIndex filtered by page containing '/story-'
        const idx=await loadIndex();
        const results = idx.filter((item) => (item.page||'').includes('story') && (matches(item.title,q)||matches(item.snippet||'',q)||matches(item.content||'',q)));
        renderResults(results,'#story-search-results');
        return;
      }
      const idx=await loadIndex();
      const results = idx.filter((item) => ((item.page||'').includes(storyId)) && (matches(item.title,q)||matches(item.snippet||'',q)||matches(item.content||'',q)));
      renderResults(results,'#story-search-results');

    } else if(scope === 'chapter'){
      // chapter-level: do in-page search for content text nodes
      const ql = q.toLowerCase();
      const inpage = [];
      document.querySelectorAll('main *').forEach((el) => {
        const txt = el.innerText || '';
        if(txt.toLowerCase().includes(ql)){
          inpage.push({title:document.title, url:location.href, snippet: txt.trim().slice(0,200)});
        }
      });
      // render into a local container if present
      const cont = document.getElementById('chapter-search-results') || document.getElementById('story-search-results') || document.getElementById('search-results');
      if(cont){
        cont.innerHTML = inpage.length ? inpage.map((r)=>`<div class="card"><h3><a href="${r.url}">${r.title}</a></h3><p>${r.snippet}</p></div>`).join('') : '<div class="card"><p>No matches in this page.</p></div>';
      }
    }
  };

  // Listen for custom events
  window.addEventListener('nenzee:search', (ev) => {
    const {query, scope} = ev.detail || {};
    runSearch(query, scope||'all');
  });

  // Also wire local button events to direct calls if the page includes search inputs with IDs
  document.getElementById('search-btn')?.addEventListener('click', async () => {
    const q=document.getElementById('site-search').value;
    runSearch(q,'all');
  });

  // expose on window for manual invocation
  window.nenzeeSearch = function (q, scope) {
    return runSearch(q, scope);
  };
})();


