import { useState, useEffect } from 'react'
import axios from 'axios'

export const useProducts = (category = '', search = '') => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [category, search])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      
      const response = await axios.get(`/api/products?${params.toString()}`)
      setProducts(response.data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('/api/featured-products')
      setProducts(response.data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching featured products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      return response.data
    } catch (err) {
      console.error('Error fetching categories:', err)
      return []
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchFeaturedProducts,
    fetchCategories
  }
}
