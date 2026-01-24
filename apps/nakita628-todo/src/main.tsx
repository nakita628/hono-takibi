import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SWRConfig } from 'swr'
import App from '@/app'
import { GlobalErrorBoundary } from '@/components/error'
import { TodoPage } from '@/pages/todo'
import { TodoDetailPage } from '@/pages/todo-detail'
import '@/index.css'

const rootElement = document.getElementById('root')
const root = rootElement ? createRoot(rootElement) : console.error('Root element not found')

if (root) {
  root.render(
    <StrictMode>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <GlobalErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/todos' element={<TodoPage />} />
              <Route path='/todos/:id' element={<TodoDetailPage />} />
            </Routes>
          </BrowserRouter>
        </GlobalErrorBoundary>
      </SWRConfig>
    </StrictMode>,
  )
}
