import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Feedbacks from './pages/Feedbacks'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/SettingsPage'
import NotFound from './pages/NotFound'
import { FeedbackProvider } from './context/FeedbackContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { NotificationProvider } from './context/NotificationContext'
import ToastContainer from './components/ui/Toast'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <FeedbackProvider>
            <NotificationProvider>
              <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <MobileHeader onMenuToggle={() => setSidebarOpen(true)} />
                <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                  <div className="max-w-5xl mx-auto">
                    <ErrorBoundary>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/feedbacks" element={<Feedbacks />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </ErrorBoundary>
                  </div>
                </main>
              </div>
              <ToastContainer />
            </NotificationProvider>
          </FeedbackProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
