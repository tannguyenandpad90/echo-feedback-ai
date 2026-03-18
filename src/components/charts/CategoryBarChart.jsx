import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useFeedback } from '../../context/FeedbackContext'

export default function CategoryBarChart() {
  const { categoryBreakdown } = useFeedback()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Feedback by Category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={categoryBreakdown} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={100} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
