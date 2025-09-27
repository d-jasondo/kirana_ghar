import React, { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

const Products = () => {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const { products, loading, error, fetchProducts, fetchCategories } = useProducts(category, search)
  const [categories, setCategories] = useState([])

  React.useEffect(() => {
    fetchProducts()
    loadCategories()
  }, [category, search])

  const loadCategories = async () => {
    const cats = await fetchCategories()
    setCategories(cats)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8">
      {/* Cashback Banner */}
      <div className="bg-gradient-to-r from-primary to-orange-500 rounded-xl p-8 text-white shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-5xl text-yellow-300">auto_awesome</span>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Instant Cashback Offer!</h2>
            <p className="text-lg mt-1 opacity-90">
              Buy above <span className="font-bold">₹5000/-</span> get instant{' '}
              <span className="font-bold text-yellow-300">₹1000/-</span> cashback.
            </p>
          </div>
        </div>
        <button className="bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors hidden sm:block">
          Shop Now
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white min-w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort By
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <section>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Featured Products</h2>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading products: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Combo Offers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Combo Offers</h2>
          <button className="text-sm font-medium text-primary hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Combo Offer 1 */}
          <div className="group relative bg-white dark:bg-zinc-900 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-2/5 p-4 flex flex-col justify-center">
              <div className="flex -space-x-4 justify-center mb-4">
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-zinc-900" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdD65LJzchr_W-A0RNJ_SccB1x3gBJLHhzQeeYD3orCfZjAwVZcEN_hoeTegJu0zunqNiDe4LgUOKChUYXrSb4nbBejk5f-X1ghKS59iK0qb32zdOsZ5PWr0ASFZbPSOBxCco3SOxfB8UyX3361qklU0aJNvDYRHkEQZD-9ByspunjDxAnn3O8y2L0ANso1U9ub3wI91tanQP4AXFrEEj4pU4zbstmWXvmLEbXJ3t5gstFnOUIHKMnJWu0IP0mT24VjyhvzVDbQlQ"
                  alt="Rice"
                />
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-zinc-900" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzPHDsks9fGCJjgF24st9iU7tLioX462pW6aV8ESx0J9_5HJL5sgoBjl-Zvv5itHNlU9NAh4rJV6_uVX2qR7gMCm_Gk4f_BRghaJt7ra63X1KDlZ9t6P_NB_EqMI6M2bxB38ZBTIOPerMw-HlL2uglvYJTDiH3RNabUjsOeG_vViA9Ljsf1egQn_XxtOeE_yjnDLYaXhglG1k3DdoW24FuOAE9gig7TMrx2bHojHzWN13js-xNrnENySEb4LO8Opq5vjT1ogLASyc"
                  alt="Dal"
                />
              </div>
              <h3 className="font-bold text-lg text-zinc-800 dark:text-white text-center">Staples Combo Pack</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">Rice (5kg) + Toor Dal (2kg)</p>
            </div>
            <div className="sm:w-3/5 p-6 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between">
              <div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2">
                  Get the essentials together and save big! Perfect for a family's monthly needs.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">₹850</span>
                  <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400 line-through">₹900</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add Combo to Cart
              </button>
            </div>
          </div>

          {/* Combo Offer 2 */}
          <div className="group relative bg-white dark:bg-zinc-900 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-2/5 p-4 flex flex-col justify-center">
              <div className="flex -space-x-4 justify-center mb-4">
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-zinc-900" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWNgOZjMPKuuugmjbmbHCiigCLfeOCWApuCfxIdqA484CRKaolMY41W4WpX5EXilCmeiJYyBXmsFwTGn4i0MUDepnO6UM1hPDfzKvhf4OPeVHifeFPGOZOKEM7GiphRz-ZRgnMpS2Cmzzn_lyTsi-mt4HHI1UWMmZ_cqy1g28_eCv4ThuMk5Acb3pkyrGTjI7Okq8bKxLG9sPaA2GKz4iHSuqW-JjaTLDeT0hIKhpO3MO3jLiGH3gj7sPVhd_1OnzlBqpCy4bdzj0"
                  alt="Masoor Dal"
                />
                <img 
                  className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-zinc-900" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBGXlUVBboyAGGGONRCJPFBrkv6NtNspsiJbn9mpScDvVy_VpElFBnZGEOHRH-5b-VPsH57cLwEdfjo5iEmI_J8yuOaL63LbCH5aUy79O6ErCh8UlagSq-wxGk_AF1oTV0D5Cmj6HSs7zt0dCNV1jBpJnBnGsYItqxr3jmjrwRRuhVq1j5AS41XsybzD0lcdv29Oio8Qe4I1WUvyCGUYNJPbtZjh-kLUM3TpLLL5-hRRBjAmQTUONfVqbZktlm1iN1bikWltfK2WA"
                  alt="Strawberries"
                />
              </div>
              <h3 className="font-bold text-lg text-zinc-800 dark:text-white text-center">Healthy Combo</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">Masoor Dal (1kg) + Fresh Strawberries (500g)</p>
            </div>
            <div className="sm:w-3/5 p-6 bg-primary/5 dark:bg-primary/10 flex flex-col justify-between">
              <div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2">
                  Nutritious combination for a healthy lifestyle. Great for families who love quality food.
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">₹420</span>
                  <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400 line-through">₹450</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add Combo to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Suggestions */}
      <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Smart Related Products Suggestions</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={`suggestion-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <nav className="flex items-center justify-center gap-2">
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-primary font-bold text-sm">1</button>
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">2</button>
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">3</button>
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">4</button>
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium">5</button>
        
        <button className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}

export default Products
