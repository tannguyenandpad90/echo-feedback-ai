import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useFeedback } from '../context/FeedbackContext'

export default function FeedbackList() {
  const { feedbacks } = useFeedback()

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-medium text-gray-500">All Feedbacks</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {feedbacks.map(fb => (
          <div key={fb.id} className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              fb.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {fb.sentiment === 'positive' ? <ThumbsUp size={14} /> : <ThumbsDown size={14} />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">{fb.text}</p>
              <div className="flex items-center gap-2 mt-2">
                {fb.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded border border-gray-100">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-gray-300 ml-auto">{fb.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
