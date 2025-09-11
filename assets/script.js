// mobile nav (progressive enhancement)
;(() => {
  const btn = document.getElementById('navToggle')
  const nav = document.getElementById('siteNav')
  if (!btn || !nav) {
    return
  }
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', (!expanded).toString())
    nav.style.display = expanded ? 'none' : 'flex'
  })
})()(
  // basic client-side form validation + inline status
  () => {
    const form = document.getElementById('contactForm')
    const msg = document.getElementById('formMsg')
    if (!form || !msg) {
      return
    }
    form.addEventListener('submit', (e) => {
      const name = form.name.value.trim()
      const email = form.email.value.trim()
      const text = form.message.value.trim()
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      if (!name || !validEmail || text.length < 10) {
        e.preventDefault()
        msg.textContent =
          'Please provide a name, a valid email, and a message (10+ chars).'
        msg.style.color = 'crimson'
      } else {
        msg.textContent = 'Thanks! Submitting…'
        msg.style.color = 'green'
      }
    })
  }
)()
