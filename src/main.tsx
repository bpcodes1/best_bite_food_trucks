import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const container = document.getElementById('root')!

// Built pages ship pre-rendered markup, so attach to it rather than throwing it
// away. `npm run dev` serves an empty shell, which has nothing to hydrate.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
