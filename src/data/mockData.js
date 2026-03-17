export const sentimentTrend = [
  { date: 'Mar 11', positive: 72, negative: 28 },
  { date: 'Mar 12', positive: 65, negative: 35 },
  { date: 'Mar 13', positive: 80, negative: 20 },
  { date: 'Mar 14', positive: 68, negative: 32 },
  { date: 'Mar 15', positive: 85, negative: 15 },
  { date: 'Mar 16', positive: 78, negative: 22 },
  { date: 'Mar 17', positive: 82, negative: 18 },
]

export const recentFeedbacks = [
  {
    id: 1,
    text: 'Love the new dashboard design! Very intuitive.',
    sentiment: 'positive',
    tags: ['UI', 'Design'],
    date: '2026-03-17',
  },
  {
    id: 2,
    text: 'The pricing is too high for small teams.',
    sentiment: 'negative',
    tags: ['Price'],
    date: '2026-03-16',
  },
  {
    id: 3,
    text: 'Found a bug in the export feature.',
    sentiment: 'negative',
    tags: ['Bug'],
    date: '2026-03-16',
  },
  {
    id: 4,
    text: 'Customer support resolved my issue in minutes!',
    sentiment: 'positive',
    tags: ['Support'],
    date: '2026-03-15',
  },
  {
    id: 5,
    text: 'Great onboarding experience, very smooth.',
    sentiment: 'positive',
    tags: ['UX', 'Onboarding'],
    date: '2026-03-15',
  },
]

const tagPool = ['Bug', 'Price', 'Support', 'UI', 'UX', 'Performance', 'Feature Request', 'Onboarding', 'Design']

const positiveResponses = [
  "Thank you so much for the kind words! We're thrilled you're enjoying the experience.",
  "We really appreciate your feedback! It motivates our team to keep improving.",
  "Thanks for sharing! We'll pass this along to our team — it means a lot.",
]

const negativeResponses = [
  "We're sorry to hear about your experience. Our team is looking into this right away.",
  "Thank you for reporting this. We take this seriously and will work on a fix.",
  "We appreciate you bringing this to our attention. We'll reach out with an update soon.",
]

export function analyzeFeedback(text) {
  const lowerText = text.toLowerCase()

  const negativeKeywords = ['bug', 'issue', 'problem', 'expensive', 'slow', 'crash', 'error', 'bad', 'terrible', 'hate', 'worst', 'broken', 'fix', 'fail', 'price', 'costly']
  const positiveKeywords = ['love', 'great', 'amazing', 'fast', 'awesome', 'excellent', 'good', 'best', 'smooth', 'intuitive', 'helpful', 'thank', 'perfect', 'easy']

  const negScore = negativeKeywords.filter(w => lowerText.includes(w)).length
  const posScore = positiveKeywords.filter(w => lowerText.includes(w)).length

  const sentiment = negScore > posScore ? 'negative' : 'positive'

  const detectedTags = []
  if (lowerText.includes('bug') || lowerText.includes('error') || lowerText.includes('crash') || lowerText.includes('broken')) detectedTags.push('Bug')
  if (lowerText.includes('price') || lowerText.includes('expensive') || lowerText.includes('costly') || lowerText.includes('pricing')) detectedTags.push('Price')
  if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('team')) detectedTags.push('Support')
  if (lowerText.includes('ui') || lowerText.includes('design') || lowerText.includes('interface')) detectedTags.push('UI')
  if (lowerText.includes('slow') || lowerText.includes('fast') || lowerText.includes('speed') || lowerText.includes('performance')) detectedTags.push('Performance')
  if (lowerText.includes('feature') || lowerText.includes('request') || lowerText.includes('wish')) detectedTags.push('Feature Request')

  if (detectedTags.length === 0) {
    detectedTags.push(tagPool[Math.floor(Math.random() * tagPool.length)])
  }

  const responses = sentiment === 'positive' ? positiveResponses : negativeResponses
  const suggestedReply = responses[Math.floor(Math.random() * responses.length)]

  return { sentiment, tags: detectedTags, suggestedReply }
}
