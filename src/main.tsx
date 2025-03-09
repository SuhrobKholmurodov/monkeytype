import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  )
} else {
  console.error('Root element not found!')
}
