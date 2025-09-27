import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // In a real app, you'd check for a valid token here
      // For now, we'll just check localStorage
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/auth/login', credentials)
      
      if (response.data.success) {
        const userData = { username: credentials.username }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      console.error('Error logging in:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/auth/register', userData)
      
      if (response.data.success) {
        return { success: true, message: response.data.message }
      }
    } catch (error) {
      console.error('Error registering:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await axios.post('/api/auth/logout')
      setUser(null)
      localStorage.removeItem('user')
      return { success: true, message: 'Logout successful!' }
    } catch (error) {
      console.error('Error logging out:', error)
      return { success: false, message: 'Logout failed' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
