// Main JavaScript functionality for Qwipo

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSearch();
    initCart();
    initWishlist();
    initAnimations();
});

// Wishlist functionality
function initWishlist() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistCount = document.getElementById('wishlist-count');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            // Toggle wishlist icon color
            const heartIcon = this.querySelector('svg');
            const isActive = heartIcon.classList.contains('text-red-500');
            
            if (isActive) {
                heartIcon.classList.remove('text-red-500');
                heartIcon.classList.add('text-zinc-600', 'dark:text-zinc-300');
                wishlistCount.classList.add('hidden');
                showNotification('Removed from wishlist', 'info');
            } else {
                heartIcon.classList.remove('text-zinc-600', 'dark:text-zinc-300');
                heartIcon.classList.add('text-red-500');
                wishlistCount.classList.remove('hidden');
                wishlistCount.textContent = '1';
                showNotification('Added to wishlist!', 'success');
            }
        });
    }
    
    // Add wishlist buttons to product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const productCard = button.closest('.group');
        if (productCard && !productCard.querySelector('.wishlist-btn')) {
            const wishlistBtn = document.createElement('button');
            wishlistBtn.className = 'wishlist-btn absolute top-2 left-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110';
            wishlistBtn.innerHTML = `
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
                </svg>
            `;
            
            wishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = this.classList.contains('text-red-500');
                
                if (isActive) {
                    this.classList.remove('text-red-500', 'dark:text-red-400');
                    this.classList.add('text-zinc-600', 'dark:text-zinc-300');
                    showNotification('Removed from wishlist', 'info');
                } else {
                    this.classList.remove('text-zinc-600', 'dark:text-zinc-300');
                    this.classList.add('text-red-500', 'dark:text-red-400');
                    showNotification('Added to wishlist!', 'success');
                    updateWishlistCount();
                }
            });
            
            productCard.appendChild(wishlistBtn);
        }
    });
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    const currentCount = parseInt(wishlistCount.textContent) || 0;
    wishlistCount.textContent = currentCount + 1;
    wishlistCount.classList.remove('hidden');
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchTimeout;

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            // Debounce search requests
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Search error:', error);
            displaySearchResults([]);
        });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    const resultsContainer = searchResults.querySelector('.p-2');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="text-sm text-zinc-500 dark:text-zinc-400 p-2">No results found</div>';
    } else {
        resultsContainer.innerHTML = results.map(result => `
            <div class="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg cursor-pointer">
                <div class="w-10 h-10 bg-zinc-200 dark:bg-zinc-600 rounded-lg"></div>
                <div class="flex-1">
                    <div class="font-medium text-zinc-900 dark:text-white">${result.name}</div>
                    <div class="text-sm text-zinc-500 dark:text-zinc-400">₹${result.price}</div>
                </div>
            </div>
        `).join('');
    }
    
    searchResults.classList.remove('hidden');
}

// Cart functionality
function initCart() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', '1');

    fetch('/add_to_cart', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Item added to cart!', 'success');
            updateCartCount();
        } else {
            showNotification(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Cart error:', error);
        showNotification('Error adding item to cart', 'error');
    });
}

function updateCartCount() {
    // This would typically fetch the current cart count from the server
    // For now, we'll just show a simple animation
    const cartButton = document.querySelector('a[href*="cart"]');
    if (cartButton) {
        cartButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartButton.style.transform = 'scale(1)';
        }, 200);
    }
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Dark mode toggle (if needed)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialize dark mode from localStorage
function initDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }
}

// Initialize dark mode on page load
initDarkMode();

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts
window.QwipoApp = {
    addToCart,
    showNotification,
    toggleDarkMode,
    formatPrice
};