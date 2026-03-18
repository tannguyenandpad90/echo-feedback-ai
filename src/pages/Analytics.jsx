import SentimentPieChart from '../components/charts/SentimentPieChart'
import CategoryBarChart from '../components/charts/CategoryBarChart'
import SentimentByCategoryChart from '../components/charts/SentimentByCategoryChart'
import SentimentChart from '../components/SentimentChart'
import { useFeedback } from '../context/FeedbackContext'

export default function Analytics() {
  const { categoryBreakdown, stats } = useFeedback()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Deep insights from {stats.total} feedbacks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SentimentPieChart />
        <CategoryBarChart />
      </div>

      <SentimentChart />
      <SentimentByCategoryChart />

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Tags</h3>
        <div className="space-y-2">
          {categoryBreakdown.slice(0, 8).map((tag, i) => (
            <div key={tag.name} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 w-5 text-right">{i + 1}</span>
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-32">{tag.name}</span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(tag.count / categoryBreakdown[0].count) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">{tag.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
