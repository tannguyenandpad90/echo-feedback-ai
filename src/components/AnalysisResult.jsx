import { ThumbsUp, ThumbsDown, Tag, MessageCircle } from 'lucide-react'

export default function AnalysisResult({ result }) {
  const isPositive = result.sentiment === 'positive'

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5 animate-in fade-in">
      <h3 className="text-sm font-medium text-gray-500">Analysis Result</h3>

      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isPositive ? <ThumbsUp size={18} /> : <ThumbsDown size={18} />}
        </div>
        <div>
          <p className="text-xs text-gray-400">Sentiment</p>
          <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? 'Positive' : 'Negative'}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Tag size={14} className="text-gray-400" />
          <p className="text-xs text-gray-400">Key Tags</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle size={14} className="text-gray-400" />
          <p className="text-xs text-gray-400">Suggested Reply</p>
        </div>
        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-100 leading-relaxed">
          {result.suggestedReply}
        </p>
      </div>
    </div>
  )
}
