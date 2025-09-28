import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useUser } from '../contexts/UserContext'
import { Search, Heart, ShoppingCart, User, Mic, Camera } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const { getCartCount } = useCart()
  const { user, logout } = useUser()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const cartCount = getCartCount()

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.length >= 2) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const results = await response.json()
        setSearchResults(results)
        setShowSearchResults(true)
      } catch (error) {
        console.error('Search error:', error)
      }
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-zinc-900 dark:text-zinc-200">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-zinc-200/50 dark:border-zinc-800/50 px-10 py-5">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <img 
              alt="Kirana Ghar Logo" 
              className="h-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3egmstoVTQNsHQcInquak6RK4IGU8SbRxtT1XR5Qcmaz8tfLDHDRvByHDjsbxvHBmHsl01mCiW3ZE-lNFGgJgiMrF9ZHzUCuPkpc_Ti06AoUIo9MIneZ229P6Ot0OROLg1mabzZBKXu79iHu6jEEMqQ5YqQ_Fjyn2B6fXVZ_Ag7Mi4Fa4NyFdxbkh62y2cACOFqrbfC_PftxfKRVIvUWgDjYYlb9Jkz5-Y8fk9lpQBHWF-7_4xZBlepNe5OhYItjCkkflTD47z_w"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-base font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/recs" 
              className={`text-base font-medium transition-colors ${
                isActive('/recs') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              AI Recs
            </Link>
            
            {/* AI Features Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg text-primary">auto_awesome</span>
                AI Features
              </button>
              <div className="absolute z-10 mt-3 w-72 rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block animate-slide-in">
                <div className="py-2">
                  <a className="flex items-center gap-4 px-5 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" href="#">
                    <span className="material-symbols-outlined text-primary">trending_up</span>
                    <div>
                      <p className="font-semibold">Local Trends</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Products popular in your area</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-4 px-5 py-3 text-base text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" href="#">
                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                    <div>
                      <p className="font-semibold">Smart Reorders</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">AI-powered suggestions</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            <Link 
              to="/brands" 
              className={`text-base font-medium transition-colors ${
                isActive('/brands') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Brands
            </Link>
            <Link 
              to="/deals" 
              className={`text-base font-medium transition-colors ${
                isActive('/deals') 
                  ? 'text-primary dark:text-primary' 
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Deals
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 justify-end gap-5">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="text-zinc-400 dark:text-zinc-500 h-5 w-5" />
            </div>
            <input 
              type="search"
              className="w-full rounded-xl border-0 bg-zinc-100 dark:bg-zinc-800/50 h-12 pl-12 pr-24 text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-3">
              <button className="text-zinc-400 dark:text-zinc-500 hover:text-primary dark:hover:text-primary transition-colors">
                <Mic className="h-6 w-6" />
              </button>
              <button className="text-zinc-400 dark:text-zinc-500 hover:text-primary dark:hover:text-primary transition-colors">
                <Camera className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 z-50">
                <div className="p-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div key={result.id} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg cursor-pointer">
                        <p className="font-medium text-zinc-900 dark:text-white">{result.name}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">₹{result.price}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 p-2">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative group">
            <Heart className="h-6 w-6 group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">
              0
            </span>
          </button>
          
          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              <User className="h-6 w-6" />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-300">Welcome, {user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold h-12 px-6 rounded-xl text-base hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary text-white font-semibold h-12 px-6 rounded-xl text-base flex items-center gap-2 hover:bg-primary/90 transition-transform transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  )
}

export default Layout
