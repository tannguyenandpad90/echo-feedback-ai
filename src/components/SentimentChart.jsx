import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { sentimentTrend } from '../data/mockData'

const ranges = ['7d', '14d', '30d']

export default function SentimentChart() {
  const [range, setRange] = useState('7d')

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sentiment Trend</h2>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                range === r
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={sentimentTrend}>
          <defs>
            <linearGradient id="gradPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={{ stroke: '#e5e7eb' }}
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
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              fontSize: '13px',
              backgroundColor: 'var(--tooltip-bg, #fff)',
            }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '13px', color: '#6b7280' }} />
          <Area type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} fill="url(#gradPositive)" dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} name="Positive" />
          <Area type="monotone" dataKey="negative" stroke="#f43f5e" strokeWidth={2} fill="url(#gradNegative)" dot={{ r: 3, fill: '#f43f5e' }} activeDot={{ r: 5 }} name="Negative" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
