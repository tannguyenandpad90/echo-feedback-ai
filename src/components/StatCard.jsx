export default function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400',
    green: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400',
    red: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-sm transition-all duration-200 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>
      <p className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">{value}</p>
      {subtitle && <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}
