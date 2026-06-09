import { state } from '@rxjs-full/core'

// Minimal client entry. This is the seam where the rxjs-full-claude runtime
// (@rxjs-full/runtime) will mount/hydrate the app once that package exists.
// For now it dogfoods @rxjs-full/core: a reactive counter wired to the DOM.

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <main style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem;">
      <h1>netxpert · playground</h1>
      <p>Cloudflare Vite plugin vertical slice, dogfooding <code>@rxjs-full/core</code>.</p>
      <button id="inc" type="button" style="font-size:1rem;padding:0.5rem 1rem;">count: 0</button>
      <pre id="api" style="background:#f4f4f5;padding:1rem;border-radius:8px;margin-top:1rem;">loading /api…</pre>
    </main>
  `

  // Reactive counter via @rxjs-full/core.
  const count = state(0)
  const btn = document.querySelector<HTMLButtonElement>('#inc')
  if (btn) {
    count.subscribe((n) => {
      btn.textContent = `count: ${n}`
    })
    btn.addEventListener('click', () => count.update((n) => n + 1))
  }

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
