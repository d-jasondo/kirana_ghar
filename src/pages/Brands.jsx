import React from 'react'

const Brands = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section for Brands */}
      <div className="relative min-h-[400px] rounded-xl overflow-hidden flex flex-col justify-center items-center p-12 text-white text-center"
           style={{ background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)' }}>
        <span className="material-symbols-outlined text-7xl mb-4 opacity-80">storefront</span>
        <h1 className="text-5xl font-extrabold tracking-tight animate-slide-in" style={{ animationDelay: '0.2s' }}>
          Trusted Brands of India
        </h1>
        <p className="text-xl mt-4 max-w-2xl opacity-90 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          Explore the best and most popular grocery brands that power every Indian kitchen.
        </p>
      </div>

      {/* Featured Brands Carousel */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white text-center mb-8">Our Featured Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Brand Cards */}
          {[
            { name: 'Tata', category: 'Salt, Tea, Spices', badge: 'Premium' },
            { name: 'MDH', category: 'Spices & Masala', badge: 'Heritage' },
            { name: 'Everest', category: 'Spices & Seasonings', badge: 'Popular' },
            { name: 'Catch', category: 'Spices & Condiments', badge: 'Trusted' },
            { name: 'Amul', category: 'Dairy Products', badge: 'Premium' },
            { name: 'Mother Dairy', category: 'Dairy & Fresh', badge: 'Fresh' }
          ].map((brand, index) => (
            <div key={index} className="group relative flex flex-col items-center p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-5xl text-blue-600">local_mall</span>
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{brand.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">{brand.category}</p>
              <span className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${
                brand.badge === 'Premium' ? 'bg-blue-500' :
                brand.badge === 'Heritage' ? 'bg-green-500' :
                brand.badge === 'Popular' ? 'bg-purple-500' :
                brand.badge === 'Trusted' ? 'bg-orange-500' :
                'bg-gray-500'
              }`}>
                {brand.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Category Sections */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white text-center mb-8">Explore by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Spices & Masala */}
          <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
               style={{ background: 'linear-gradient(45deg, #ef4444 0%, #dc2626 100%)' }}>
            <span className="material-symbols-outlined absolute -top-4 -right-4 text-9xl opacity-20">local_fire_department</span>
            <h3 className="text-2xl font-bold mb-2">Spices & Masala</h3>
            <p className="text-lg opacity-90 mb-4">Flavor your dishes with authentic Indian spices.</p>
            <span className="text-sm font-semibold">15+ Brands</span>
            <a href="#" className="block mt-4 text-white font-bold hover:underline">View All <span className="material-symbols-outlined text-base align-middle">arrow_right_alt</span></a>
          </div>

          {/* Dairy & Fresh */}
          <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
               style={{ background: 'linear-gradient(45deg, #10b981 0%, #059669 100%)' }}>
            <span className="material-symbols-outlined absolute -top-4 -right-4 text-9xl opacity-20">local_drink</span>
            <h3 className="text-2xl font-bold mb-2">Dairy & Fresh</h3>
            <p className="text-lg opacity-90 mb-4">Fresh dairy products and daily essentials.</p>
            <span className="text-sm font-semibold">12+ Brands</span>
            <a href="#" className="block mt-4 text-white font-bold hover:underline">View All <span className="material-symbols-outlined text-base align-middle">arrow_right_alt</span></a>
          </div>

          {/* Cooking Essentials */}
          <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
               style={{ background: 'linear-gradient(45deg, #8b5cf6 0%, #7c3aed 100%)' }}>
            <span className="material-symbols-outlined absolute -top-4 -right-4 text-9xl opacity-20">restaurant</span>
            <h3 className="text-2xl font-bold mb-2">Cooking Essentials</h3>
            <p className="text-lg opacity-90 mb-4">Everything you need for perfect cooking.</p>
            <span className="text-sm font-semibold">20+ Brands</span>
            <a href="#" className="block mt-4 text-white font-bold hover:underline">View All <span className="material-symbols-outlined text-base align-middle">arrow_right_alt</span></a>
          </div>
        </div>
      </section>

      {/* Brand Stories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white text-center mb-8">Brand Stories & Heritage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Heritage */}
          <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-5xl text-amber-500 mb-4">history_edu</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Traditional Heritage</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">Discover brands that have been a part of Indian kitchens for generations.</p>
            <div className="flex gap-4">
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">MDH</span>
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Everest</span>
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Catch</span>
            </div>
          </div>

          {/* Modern Innovation */}
          <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-5xl text-blue-500 mb-4">auto_awesome</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Modern Innovation</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">Contemporary brands bringing innovation to traditional products.</p>
            <div className="flex gap-4">
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Tata</span>
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Amul</span>
              <span className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">Mother Dairy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white text-center mb-8">Exclusive Brand Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MDH Offer */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-red-500">
            <span className="material-symbols-outlined text-5xl text-red-500 mb-4">local_offer</span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">MDH Spices</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">Buy 2 Get 1 Free on select spice blends!</p>
            <button className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition-colors">Shop Now</button>
          </div>

          {/* Amul Offer */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-blue-500">
            <span className="material-symbols-outlined text-5xl text-blue-500 mb-4">local_offer</span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Amul Dairy</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">20% off on all dairy products this week!</p>
            <button className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors">Shop Now</button>
          </div>

          {/* Tata Offer */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-green-500">
            <span className="material-symbols-outlined text-5xl text-green-500 mb-4">local_offer</span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Tata Products</h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">Special bulk pricing for retailers!</p>
            <button className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition-colors">Shop Now</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Brands
