import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Heart, ShoppingCart } from 'lucide-react'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = React.useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    const result = await addToCart(product.id, 1)
    if (result.success) {
      // You could show a toast notification here
      console.log('Added to cart:', product.name)
    }
    setIsAdding(false)
  }

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-square w-full bg-center bg-no-repeat bg-cover" 
           style={{ backgroundImage: `url(${product.image_url})` }}>
      </div>
      
      {product.badge && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.badge}
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-bold text-base text-zinc-800 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary">
            ₹{product.price}
          </span>
          
          <div className="flex items-center gap-2">
            <button className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full p-2 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-500 transition-colors duration-300">
              <Heart className="h-4 w-4" />
            </button>
            
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-primary/10 dark:bg-primary/20 text-primary rounded-full p-2 hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default ProductCard
