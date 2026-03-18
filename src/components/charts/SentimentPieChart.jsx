import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useFeedback } from '../../context/FeedbackContext'

const COLORS = ['#10b981', '#f43f5e']

export default function SentimentPieChart() {
  const { stats } = useFeedback()

  const data = [
    { name: 'Positive', value: stats.positive },
    { name: 'Negative', value: stats.negative },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
            }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '13px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
