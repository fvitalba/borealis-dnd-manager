import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/Game.css'
import './styles/output.css'
import App from './components/App'

const container = document.getElementById('root')
if (container) {
    const root = createRoot(container)
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
