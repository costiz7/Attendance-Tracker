import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import App from './App.jsx'
import Snowfall from 'react-snowfall';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Snowfall color="#82C3D9" style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: 'none'
  }}/>
    <App />
  </StrictMode>,
)
