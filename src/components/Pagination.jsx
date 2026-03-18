import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFeedback } from '../context/FeedbackContext'

export default function Pagination() {
  const { currentPage, totalPages, dispatch } = useFeedback()

  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => dispatch({ type: 'SET_PAGE', payload: currentPage - 1 })}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-gray-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => dispatch({ type: 'SET_PAGE', payload: currentPage + 1 })}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
