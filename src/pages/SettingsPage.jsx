import { useState } from 'react'
import { Save, Sun, Moon, Monitor, Trash2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useFeedback } from '../context/FeedbackContext'

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('gpt-4')
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { dispatch } = useFeedback()

  const handleSave = (e) => {
    e.preventDefault()
    toast({ title: 'Settings saved', variant: 'success' })
  }

  const handleClearData = () => {
    dispatch({ type: 'CLEAR_ALL' })
    toast({ title: 'All feedbacks cleared', variant: 'info' })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Configure your workspace</p>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
        <div className="flex gap-3">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                theme === value
                  ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">AI Engine</h2>
        <form onSubmit={handleSave} className="space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">OpenAI API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:focus:border-indigo-600 transition-colors"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">Used for sentiment analysis. Stored locally only.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-sonnet">Claude Sonnet</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save size={16} />
            Save Settings
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-rose-200 dark:border-rose-900/50 p-6">
        <h2 className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Permanently delete all feedback data. This action cannot be undone.
        </p>
        <button
          onClick={handleClearData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition-colors"
        >
          <Trash2 size={16} />
          Clear All Data
        </button>
      </div>
    </div>
  )
}
