import { createContext, useCallback, useContext, useState } from 'react'

const NotificationContext = createContext()

let notifId = 0

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: ++notifId, title: 'New feedback received', message: 'A customer left positive feedback about the dashboard.', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: ++notifId, title: 'Bug report submitted', message: 'Export feature CSV headers are missing.', read: false, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: ++notifId, title: 'Weekly digest ready', message: 'Your weekly sentiment report is available.', read: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = useCallback((title, message) => {
    setNotifications(prev => [
      { id: ++notifId, title, message, read: false, timestamp: new Date() },
      ...prev,
    ])
  }, [])

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
