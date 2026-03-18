import { MessageSquareText, TrendingUp, TrendingDown } from 'lucide-react'
import StatCard from '../components/StatCard'
import SentimentChart from '../components/SentimentChart'
import FeedbackForm from '../components/FeedbackForm'
import RecentActivity from '../components/RecentActivity'
import { useFeedback } from '../context/FeedbackContext'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { stats } = useFeedback()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
          {getGreeting()}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          You have {stats.total} feedbacks — {stats.positivePercent}% positive today
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SentimentChart />
        </div>
        <RecentActivity />
      </div>

      <FeedbackForm />
    </div>
  )
}
