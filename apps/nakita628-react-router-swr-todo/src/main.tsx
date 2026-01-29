import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { SWRConfig } from 'swr'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { HomePage } from '@/routes/index'
import { TodosPage } from '@/routes/todos/index'
import { TodoDetailPage } from '@/routes/todos/$id'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/todos/:id" element={<TodoDetailPage />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </SWRConfig>
    </StrictMode>,
  )
}
