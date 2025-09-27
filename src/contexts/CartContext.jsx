import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload
    case 'ADD_TO_CART':
      return [...state, action.payload]
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.payload)
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [loading, setLoading] = React.useState(false)

  // Load cart from API on component mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/cart')
      dispatch({ type: 'SET_CART', payload: response.data })
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/cart', {
        product_id: productId,
        quantity: quantity
      })
      
      if (response.data.success) {
        // Reload cart to get updated data
        await loadCart()
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { success: false, message: 'Failed to add item to cart' }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      setLoading(true)
      const response = await axios.delete(`/api/cart/${productId}`)
      
      if (response.data.success) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      return { success: false, message: 'Failed to remove item from cart' }
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
