import FeedbackForm from '../components/FeedbackForm'
import FeedbackList from '../components/FeedbackList'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'

export default function Feedbacks() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Feedbacks</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Analyze and manage customer feedback</p>
      </div>

      <FeedbackForm />
      <FilterBar />
      <FeedbackList />
      <Pagination />
    </div>
  )
}
