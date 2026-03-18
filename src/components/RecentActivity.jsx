import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useFeedback } from '../context/FeedbackContext'
import { formatDistanceToNow } from 'date-fns'

export default function RecentActivity() {
  const { feedbacks } = useFeedback()
  const recent = feedbacks.slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {recent.map(fb => (
          <div key={fb.id} className="flex items-start gap-3">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
              fb.sentiment === 'positive'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
            }`}>
              {fb.sentiment === 'positive' ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{fb.text}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {formatDistanceToNow(new Date(fb.date), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
