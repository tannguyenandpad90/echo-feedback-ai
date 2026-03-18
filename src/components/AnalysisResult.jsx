import { ThumbsUp, ThumbsDown, Tag, MessageCircle, Copy } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export default function AnalysisResult({ result }) {
  const isPositive = result.sentiment === 'positive'
  const { toast } = useToast()

  const copyReply = () => {
    navigator.clipboard.writeText(result.suggestedReply)
    toast({ title: 'Copied to clipboard', variant: 'success' })
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 space-y-5 animate-slide-up">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Analysis Result</h3>

      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isPositive ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
        }`}>
          {isPositive ? <ThumbsUp size={18} /> : <ThumbsDown size={18} />}
        </div>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">Sentiment</p>
          <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {isPositive ? 'Positive' : 'Negative'}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Tag size={14} className="text-gray-400" />
          <p className="text-xs text-gray-400 dark:text-gray-500">Key Tags</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-100 dark:border-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageCircle size={14} className="text-gray-400" />
            <p className="text-xs text-gray-400 dark:text-gray-500">Suggested Reply</p>
          </div>
          <button onClick={copyReply} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 transition-colors">
            <Copy size={12} /> Copy
          </button>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 leading-relaxed">
          {result.suggestedReply}
        </p>
      </div>
    </div>
  )
}
