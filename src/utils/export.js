export function exportToCSV(feedbacks, filename = 'feedbacks.csv') {
  const headers = ['ID', 'Date', 'Sentiment', 'Tags', 'Text']
  const rows = feedbacks.map(f => [
    f.id,
    f.date,
    f.sentiment,
    f.tags.join('; '),
    `"${f.text.replace(/"/g, '""')}"`,
  ])

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
