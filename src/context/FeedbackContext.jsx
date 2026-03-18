import { createContext, useContext, useMemo, useReducer } from 'react'
import { recentFeedbacks as initialFeedbacks } from '../data/mockData'

const FeedbackContext = createContext()

const initialState = {
  feedbacks: initialFeedbacks,
  searchQuery: '',
  sentimentFilter: 'all',
  tagFilter: '',
  currentPage: 1,
  pageSize: 8,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FEEDBACK':
      return { ...state, feedbacks: [action.payload, ...state.feedbacks], currentPage: 1 }
    case 'DELETE_FEEDBACK':
      return { ...state, feedbacks: state.feedbacks.filter(f => f.id !== action.payload) }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1 }
    case 'SET_SENTIMENT_FILTER':
      return { ...state, sentimentFilter: action.payload, currentPage: 1 }
    case 'SET_TAG_FILTER':
      return { ...state, tagFilter: action.payload, currentPage: 1 }
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload }
    case 'CLEAR_FILTERS':
      return { ...state, searchQuery: '', sentimentFilter: 'all', tagFilter: '', currentPage: 1 }
    case 'CLEAR_ALL':
      return { ...initialState, feedbacks: [] }
    default:
      return state
  }
}

export function FeedbackProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const filteredFeedbacks = useMemo(() => {
    let result = state.feedbacks

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase()
      result = result.filter(f => f.text.toLowerCase().includes(q))
    }

    if (state.sentimentFilter !== 'all') {
      result = result.filter(f => f.sentiment === state.sentimentFilter)
    }

    if (state.tagFilter) {
      result = result.filter(f => f.tags.includes(state.tagFilter))
    }

    return result
  }, [state.feedbacks, state.searchQuery, state.sentimentFilter, state.tagFilter])

  const paginatedFeedbacks = useMemo(() => {
    const start = (state.currentPage - 1) * state.pageSize
    return filteredFeedbacks.slice(start, start + state.pageSize)
  }, [filteredFeedbacks, state.currentPage, state.pageSize])

  const totalPages = Math.ceil(filteredFeedbacks.length / state.pageSize)

  const stats = useMemo(() => {
    const total = state.feedbacks.length
    const positive = state.feedbacks.filter(f => f.sentiment === 'positive').length
    const negative = state.feedbacks.filter(f => f.sentiment === 'negative').length
    return {
      total,
      positivePercent: total ? Math.round((positive / total) * 100) : 0,
      negativePercent: total ? Math.round((negative / total) * 100) : 0,
      positive,
      negative,
    }
  }, [state.feedbacks])

  const categoryBreakdown = useMemo(() => {
    const counts = {}
    state.feedbacks.forEach(f => {
      f.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [state.feedbacks])

  const sentimentByCategory = useMemo(() => {
    const map = {}
    state.feedbacks.forEach(f => {
      f.tags.forEach(tag => {
        if (!map[tag]) map[tag] = { name: tag, positive: 0, negative: 0 }
        map[tag][f.sentiment]++
      })
    })
    return Object.values(map).sort((a, b) => (b.positive + b.negative) - (a.positive + a.negative))
  }, [state.feedbacks])

  const allTags = useMemo(() => {
    const tags = new Set()
    state.feedbacks.forEach(f => f.tags.forEach(t => tags.add(t)))
    return [...tags].sort()
  }, [state.feedbacks])

  const addFeedback = (feedback) => dispatch({ type: 'ADD_FEEDBACK', payload: feedback })
  const deleteFeedback = (id) => dispatch({ type: 'DELETE_FEEDBACK', payload: id })

  return (
    <FeedbackContext.Provider value={{
      feedbacks: state.feedbacks,
      filteredFeedbacks,
      paginatedFeedbacks,
      totalPages,
      currentPage: state.currentPage,
      searchQuery: state.searchQuery,
      sentimentFilter: state.sentimentFilter,
      tagFilter: state.tagFilter,
      stats,
      categoryBreakdown,
      sentimentByCategory,
      allTags,
      addFeedback,
      deleteFeedback,
      dispatch,
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
