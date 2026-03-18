import { Menu } from 'lucide-react'

export default function MobileHeader({ onMenuToggle }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
      <button
        onClick={onMenuToggle}
        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
      </button>
      <h1 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
        <span className="text-indigo-600 dark:text-indigo-400">Echo</span>Feedback
      </h1>
    </header>
  )
}
