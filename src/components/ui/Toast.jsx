import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

const variants = {
  success: { icon: CheckCircle2, bg: 'bg-emerald-50 dark:bg-emerald-950/50', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-200', iconColor: 'text-emerald-500' },
  error: { icon: AlertCircle, bg: 'bg-rose-50 dark:bg-rose-950/50', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-800 dark:text-rose-200', iconColor: 'text-rose-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-950/50', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-200', iconColor: 'text-amber-500' },
  info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-950/50', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200', iconColor: 'text-blue-500' },
}

export default function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => {
        const v = variants[t.variant] || variants.info
        const Icon = v.icon
        return (
          <div
            key={t.id}
            className={`${v.bg} ${v.border} border rounded-lg p-3 shadow-lg animate-slide-up flex items-start gap-3`}
          >
            <Icon size={18} className={`${v.iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              {t.title && <p className={`text-sm font-medium ${v.text}`}>{t.title}</p>}
              {t.description && <p className={`text-xs ${v.text} opacity-80 mt-0.5`}>{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className={`${v.text} opacity-50 hover:opacity-100 shrink-0`}>
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
