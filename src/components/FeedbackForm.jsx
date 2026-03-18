import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { analyzeFeedback } from '../data/mockData'
import { useFeedback } from '../context/FeedbackContext'
import { useNotifications } from '../context/NotificationContext'
import { useToast } from '../context/ToastContext'
import AnalysisResult from './AnalysisResult'

export default function FeedbackForm() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const { addFeedback } = useFeedback()
  const { addNotification } = useNotifications()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setResult(null)

    await new Promise(r => setTimeout(r, 800))

    const analysis = analyzeFeedback(text)
    setResult(analysis)

    addFeedback({
      id: Date.now(),
      text: text.trim(),
      sentiment: analysis.sentiment,
      tags: analysis.tags,
      date: new Date().toISOString().split('T')[0],
    })

    addNotification(
      'Feedback analyzed',
      `New ${analysis.sentiment} feedback with tags: ${analysis.tags.join(', ')}`
    )

    toast({
      title: 'Analysis complete',
      description: `Detected ${analysis.sentiment} sentiment`,
      variant: analysis.sentiment === 'positive' ? 'success' : 'warning',
    })

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Analyze New Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste customer feedback here..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:focus:border-indigo-600 transition-colors"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Analyze
            </button>
          </div>
        </form>
      </div>

      {result && <AnalysisResult result={result} />}
    </div>
  )
}
