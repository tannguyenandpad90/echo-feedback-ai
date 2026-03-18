import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('ef-theme')
    return stored || 'system'
  })

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  useEffect(() => {
    localStorage.setItem('ef-theme', theme)
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [theme, resolvedTheme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      document.documentElement.classList.toggle('dark', mq.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
