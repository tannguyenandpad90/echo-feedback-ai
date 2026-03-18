export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-12 flex flex-col items-center text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Icon size={24} className="text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
