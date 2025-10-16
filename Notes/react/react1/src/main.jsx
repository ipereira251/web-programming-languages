import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <h1>Stuff can go here!</h1>
  //<StrictMode>
  //  <App />
  //</StrictMode>,
)
