import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
      <p className="text-7xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Home size={16} />
        Back to Dashboard
      </Link>
    </div>
  )
}
