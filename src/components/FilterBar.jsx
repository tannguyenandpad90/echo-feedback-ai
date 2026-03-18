import { Search, X, Download } from 'lucide-react'
import { useFeedback } from '../context/FeedbackContext'
import { useToast } from '../context/ToastContext'
import { exportToCSV } from '../utils/export'

export default function FilterBar() {
  const { searchQuery, sentimentFilter, tagFilter, allTags, filteredFeedbacks, dispatch } = useFeedback()
  const { toast } = useToast()

  const hasFilters = searchQuery || sentimentFilter !== 'all' || tagFilter

  const handleExport = () => {
    exportToCSV(filteredFeedbacks)
    toast({ title: 'Export complete', description: `Exported ${filteredFeedbacks.length} feedbacks`, variant: 'success' })
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            placeholder="Search feedbacks..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:focus:border-indigo-600 transition-colors"
          />
        </div>

        <select
          value={sentimentFilter}
          onChange={(e) => dispatch({ type: 'SET_SENTIMENT_FILTER', payload: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
        >
          <option value="all">All Sentiments</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>

        <select
          value={tagFilter}
          onChange={(e) => dispatch({ type: 'SET_TAG_FILTER', payload: e.target.value })}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={14} /> Clear
          </button>
        )}

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
        >
          <Download size={14} /> Export
        </button>
      </div>
    </div>
  )
}
