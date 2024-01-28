import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AudioProvider } from './shared/AudioContext/AudioContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>,
)
