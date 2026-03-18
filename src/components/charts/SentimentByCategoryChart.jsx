import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useFeedback } from '../../context/FeedbackContext'

export default function SentimentByCategoryChart() {
  const { sentimentByCategory } = useFeedback()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Sentiment by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sentimentByCategory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '13px' }} />
          <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Positive" />
          <Bar dataKey="negative" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Negative" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
