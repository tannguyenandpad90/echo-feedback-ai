import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MessageSquareText, Settings, BarChart3, X } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/feedbacks', icon: MessageSquareText, label: 'Feedbacks' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed left-0 top-0 z-50 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="px-6 py-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400">Echo</span>Feedback
          </h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-2">
          <NotificationDropdown />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">v2.0.0 — EchoFeedback</p>
        </div>
      </aside>
    </>
  )
}
