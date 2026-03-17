import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Feedbacks from './pages/Feedbacks'
import SettingsPage from './pages/SettingsPage'
import { FeedbackProvider } from './context/FeedbackContext'

export default function App() {
  return (
    <BrowserRouter>
      <FeedbackProvider>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            <div className="max-w-5xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </FeedbackProvider>
    </BrowserRouter>
  )
}
