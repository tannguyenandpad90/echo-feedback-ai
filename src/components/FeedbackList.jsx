import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'
import { useFeedback } from '../context/FeedbackContext'
import { useToast } from '../context/ToastContext'
import EmptyState from './ui/EmptyState'
import { MessageSquareText } from 'lucide-react'

export default function FeedbackList() {
  const { paginatedFeedbacks, filteredFeedbacks, deleteFeedback } = useFeedback()
  const { toast } = useToast()

  const handleDelete = (id) => {
    deleteFeedback(id)
    toast({ title: 'Feedback deleted', variant: 'info' })
  }

  if (filteredFeedbacks.length === 0) {
    return <EmptyState icon={MessageSquareText} title="No feedbacks found" description="Try adjusting your filters or add new feedback." />
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
      <div className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Showing {paginatedFeedbacks.length} of {filteredFeedbacks.length} feedbacks
        </h2>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {paginatedFeedbacks.map(fb => (
          <div key={fb.id} className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              fb.sentiment === 'positive'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
            }`}>
              {fb.sentiment === 'positive' ? <ThumbsUp size={14} /> : <ThumbsDown size={14} />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{fb.text}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {fb.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded border border-gray-100 dark:border-gray-700">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-gray-300 dark:text-gray-600 ml-auto">{fb.date}</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(fb.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
