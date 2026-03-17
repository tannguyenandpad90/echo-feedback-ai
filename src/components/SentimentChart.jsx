import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { sentimentTrend } from '../data/mockData'

export default function SentimentChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-sm font-medium text-gray-500 mb-6">Sentiment Trend — Last 7 Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sentimentTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={{ stroke: '#f3f4f6' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #f3f4f6',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              fontSize: '13px',
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '13px', color: '#6b7280' }}
          />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
            name="Positive"
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ r: 4, fill: '#f43f5e' }}
            activeDot={{ r: 6 }}
            name="Negative"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
