import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-rose-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw size={16} />
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
