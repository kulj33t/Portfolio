import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./main.css"
import Background from './components/Background'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Background />
  </StrictMode>,
)
