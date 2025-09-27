import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

const Cart = () => {
  const { cart, loading, removeFromCart, updateQuantity, getCartTotal } = useCart()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading cart...</div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Add some products to get started!</p>
        <a 
          href="/products" 
          className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Shop Now
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <div className="flex gap-4">
                <img 
                  src={item.product.image_url} 
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    {item.product.description}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ₹{item.product.price}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium text-zinc-900 dark:text-white">
                      {item.quantity}
                    </span>
                    
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Tax</span>
                <span>₹{(getCartTotal() * 0.18).toFixed(2)}</span>
              </div>
              <hr className="border-zinc-200 dark:border-zinc-700" />
              <div className="flex justify-between text-lg font-bold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span>₹{(getCartTotal() * 1.18).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors mb-4">
              Proceed to Checkout
            </button>
            
            <button className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
