import FeedbackForm from '../components/FeedbackForm'
import FeedbackList from '../components/FeedbackList'

export default function Feedbacks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Feedbacks</h1>
        <p className="text-sm text-gray-400 mt-1">Analyze and manage customer feedback</p>
      </div>

      <FeedbackForm />
      <FeedbackList />
    </div>
  )
}
