import { useState } from 'react'

export const useAIRecs = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const parseJsonSafe = async (res) => {
    try {
      if (!res) return null
      const ct = res.headers.get('content-type') || ''
      const len = res.headers.get('content-length')
      if (!res.ok) {
        // Try to read text for debugging
        const txt = await res.text().catch(() => '')
        throw new Error(`HTTP ${res.status}: ${txt?.slice(0, 200)}`)
      }
      if (len === '0') return null
      if (ct.includes('application/json')) {
        return await res.json()
      }
      // Not JSON, try text; treat as no results
      await res.text()
      return null
    } catch (e) {
      throw e
    }
  }

  const getHybrid = async (userId, limit = 10, alpha = 0.6) => {
    try {
      setLoading(true)
      setError(null)
      const url = `/api/recommendations/hybrid?user_id=${encodeURIComponent(userId)}&limit=${limit}&alpha=${alpha}`
      const res = await fetch(url)
      const json = await parseJsonSafe(res)
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
      const json = await parseJsonSafe(res)
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
      const json = await parseJsonSafe(res)
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
