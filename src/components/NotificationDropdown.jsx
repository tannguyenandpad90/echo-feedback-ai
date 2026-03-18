import { useState, useRef, useEffect } from 'react'
import { Bell, Check } from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import { formatDistanceToNow } from 'date-fns'

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full"
      >
        <div className="relative">
          <Bell size={18} strokeWidth={1.8} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        Notifications
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400 p-4 text-center">No notifications</p>
            ) : (
              notifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!n.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}
                >
                  <div className="flex items-start gap-2">
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />}
                    <div className={!n.read ? '' : 'ml-3.5'}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
