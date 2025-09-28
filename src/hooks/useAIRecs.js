import { useState } from 'react'

export const useAIRecs = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getHybrid = async (userId, limit = 10, alpha = 0.6) => {
    try {
      setLoading(true)
      setError(null)
      const url = `/api/recommendations/hybrid?user_id=${encodeURIComponent(userId)}&limit=${limit}&alpha=${alpha}`
      const res = await fetch(url)
      const json = await res.json()
      setResults(json.results || [])
      return json
    } catch (e) {
      setError(e.message)
      setResults([])
      return { results: [] }
    } finally {
      setLoading(false)
    }
  }

  const getCF = async (userId, limit = 10) => {
    try {
      setLoading(true)
      setError(null)
      const url = `/api/recommendations/cf?user_id=${encodeURIComponent(userId)}&limit=${limit}`
      const res = await fetch(url)
      const json = await res.json()
      setResults(json.results || [])
      return json
    } catch (e) {
      setError(e.message)
      setResults([])
      return { results: [] }
    } finally {
      setLoading(false)
    }
  }

  const getCBF = async (productId, limit = 10) => {
    try {
      setLoading(true)
      setError(null)
      const url = `/api/recommendations/cbf?product_id=${encodeURIComponent(productId)}&limit=${limit}`
      const res = await fetch(url)
      const json = await res.json()
      setResults(json.results || [])
      return json
    } catch (e) {
      setError(e.message)
      setResults([])
      return { results: [] }
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, getHybrid, getCF, getCBF }
}
