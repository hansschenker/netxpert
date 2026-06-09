// Minimal client entry. This is the seam where the rxjs-full-claude runtime
// (@rxjs-full/runtime) will mount/hydrate the app once that package exists.

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <main style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem;">
      <h1>netxpert · playground</h1>
      <p>Cloudflare Vite plugin vertical slice is running.</p>
      <pre id="api" style="background:#f4f4f5;padding:1rem;border-radius:8px;">loading /api…</pre>
    </main>
  `

  fetch('/api/')
    .then((res) => res.json())
    .then((data) => {
      const el = document.querySelector('#api')
      if (el) el.textContent = JSON.stringify(data, null, 2)
    })
    .catch((err) => {
      const el = document.querySelector('#api')
      if (el) el.textContent = `error: ${String(err)}`
    })
}
