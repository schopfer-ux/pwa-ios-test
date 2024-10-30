import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from './services/pushNotification'

async function init() {
  if ('serviceWorker' in navigator) {
    await registerSW();
  }
}

init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
