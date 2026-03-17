import { createContext, useContext, useState } from 'react'
import { recentFeedbacks as initialFeedbacks } from '../data/mockData'

const FeedbackContext = createContext()

export function FeedbackProvider({ children }) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)

  const addFeedback = (feedback) => {
    setFeedbacks(prev => [feedback, ...prev])
  }

  const stats = {
    total: feedbacks.length,
    positivePercent: feedbacks.length
      ? Math.round((feedbacks.filter(f => f.sentiment === 'positive').length / feedbacks.length) * 100)
      : 0,
    negativePercent: feedbacks.length
      ? Math.round((feedbacks.filter(f => f.sentiment === 'negative').length / feedbacks.length) * 100)
      : 0,
  }

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, stats }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
