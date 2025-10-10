import { CosmosClient } from "@azure/cosmos";

(async () => {
  // Helper: unique id
  const uid = () => Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);

  // Get page id for storage: use pathname

  const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
  });
  
  const database = client.database("Nenzee.com");
  const container = database.container("Comments");
  
  // Add a comment
  await container.items.create({
    id: "unique-id",
    name: "Jennifer",
    body: "This is a comment",
    page: "/contact",
    status: "pending",
    when: new Date().toISOString()
  });
  
  // Load comments for this page
  const loadComments = () => {
    const raw = localStorage.getItem('Nenzee.com') || '[]';
    try{ return JSON.parse(raw); } catch(e){ return []; }
  };

  const saveComments = (arr) => {
    localStorage.setItem('Nenzee.com', JSON.stringify(arr));
  };

  const renderComments = () => {
    const listEl = document.getElementById('comment-list');
    if(!listEl) return;
    const all = loadComments();
    // only show approved comments for normal users
    const approved = all.filter((c)=>c.page===pageId && c.status==='approved');
    if(approved.length===0) { listEl.innerHTML='<div class="card"><p>No comments yet.</p></div>'; return; }
    listEl.innerHTML = approved.map((c)=>`<div class="comment"><div class="meta"><strong>${c.name}</strong> • ${c.when}</div><p>${c.body}</p></div>`).join('');
  };

  function postComment(name, email, body) {
    const arr = loadComments();
    const data = {
      id: uid(), page: pageId, name, body,
      when: new Date().toLocaleString(), status: 'pending'
    };
    arr.push(data);
    saveComments(arr);
    alert('Your comment has been posted and is pending approval.');
    renderComments(); // shows approved only, so pending not shown
  }

  // wire up form handler
  const postBtn = document.getElementById('comment-form');
  if(postBtn){
    postBtn.addEventListener('click', () => {
      const name=(document.getElementById('comment-name')||{}).value||'Anonymous';
      const body=(document.getElementById('comment-body')||{}).value||'';
      if(!body.trim()){ alert('Please enter a comment'); return; }
      postComment(name, body);
      document.getElementById('comment-name').value='';
      document.getElementById('comment-body').value='';
    });
  }

  // render on load
  document.addEventListener('DOMContentLoaded', renderComments);
  // also in case script is loaded after DOM
  setTimeout(renderComments,300);
})();
________________________________________
index.json ()
[
  {
    "id":"story-1",
    "title":"**BOLD: Story 1 Title**",
    "snippet":"**BOLD: Short story 1 snippet**",
    "page":"sites/story-1/index.html",
    "url":"sites/story-1/index.html",
    "content":"**BOLD: Longer searchable content for story 1**"
  },
  {
    "id":"story-1-ch1",
    "title":"Chapter 1 — **BOLD: Chapter Title**",
    "snippet":"**BOLD: chapter 1 snippet**",
    "page":"sites/story-1/chapter-1.html",
    "url":"sites/story-1/chapter-1.html",
    "content":"**BOLD: Full chapter content for indexing (or a summary)**"
  }
]





