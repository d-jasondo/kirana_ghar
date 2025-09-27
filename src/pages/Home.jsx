import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { ArrowRight, TrendingUp, Box } from 'lucide-react'

const Home = () => {
  const { products, loading, fetchFeaturedProducts } = useProducts()

  React.useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] rounded-xl overflow-hidden flex flex-col justify-center items-center p-12 text-white text-center"
               style={{ background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)' }}>
        <div className="material-symbols-outlined text-7xl mb-4 opacity-80">storefront</div>
        <h1 className="text-5xl font-extrabold tracking-tight animate-slide-in" style={{ animationDelay: '0.2s' }}>
          Welcome to Kirana Ghar
        </h1>
        <p className="text-xl mt-4 max-w-2xl opacity-90 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          Your trusted B2B partner for quality groceries and essentials. 
          Smart ordering, bulk discounts, and AI-powered insights for your business.
        </p>
        <div className="mt-8 flex gap-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
          <Link 
            to="/products" 
            className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Explore Products
          </Link>
          <Link 
            to="/deals" 
            className="bg-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-colors"
          >
            View Deals
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Analytics</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            AI-powered insights to optimize your inventory and maximize profits
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Box className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Bulk Discounts</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Special pricing for bulk orders with flexible payment terms
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-5xl text-primary">auto_awesome</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">AI Features</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Automated reordering and demand forecasting for your business
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Now Selling</h2>
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
          Join thousands of retailers who trust Kirana Ghar for their supply chain needs. 
          Get started with our AI-powered platform today.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            to="/brands" 
            className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold py-3 px-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Explore Brands
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
