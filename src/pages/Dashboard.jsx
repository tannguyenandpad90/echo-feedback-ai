import { MessageSquareText, TrendingUp, TrendingDown } from 'lucide-react'
import StatCard from '../components/StatCard'
import SentimentChart from '../components/SentimentChart'
import FeedbackForm from '../components/FeedbackForm'
import { useFeedback } from '../context/FeedbackContext'

export default function Dashboard() {
  const { stats } = useFeedback()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Monitor customer sentiment in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Feedbacks"
          value={stats.total}
          subtitle="All time"
          icon={MessageSquareText}
          color="indigo"
        />
        <StatCard
          title="Positive"
          value={`${stats.positivePercent}%`}
          subtitle="Of all feedbacks"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Negative"
          value={`${stats.negativePercent}%`}
          subtitle="Of all feedbacks"
          icon={TrendingDown}
          color="red"
        />
      </div>

      <SentimentChart />
      <FeedbackForm />
    </div>
  )
}
