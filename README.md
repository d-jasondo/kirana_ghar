# 🚀 Kirana Ghar - B2B E-commerce Platform

A modern, dynamic React.js frontend with Flask API backend for B2B grocery e-commerce.

## ✨ Features

### 🎯 **Frontend (React.js)**
- **Dynamic React Components** with modern hooks and context
- **Responsive Design** with Tailwind CSS
- **Real-time State Management** for cart, user, and products
- **Client-side Routing** with React Router
- **Interactive UI** with smooth animations and transitions
- **Dark Mode Support** throughout the application

### 🔧 **Backend (Flask API)**
- **RESTful API** with JSON responses
- **CORS Enabled** for React frontend integration
- **SQLAlchemy ORM** with SQLite database
- **Session Management** for cart and user authentication
- **Product Management** with categories and search
- **Bulk Discount** calculations

### 🛒 **E-commerce Features**
- **Product Catalog** with filtering and search
- **Shopping Cart** with quantity management
- **User Authentication** (Login/Register)
- **Deals & Promotions** page
- **Brand Showcase** with creative sections
- **B2B Features** like bulk pricing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
pip install -r requirements.txt
```

### 2. Start the Development Servers

**Backend (Flask API):**
```bash
python app.py
```
Runs on: `http://localhost:5000`

**Frontend (React):**
```bash
npm run dev
```
Runs on: `http://localhost:3000`

### 3. Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
kirana-ghar/
├── src/                          # React frontend
│   ├── components/               # Reusable components
│   │   ├── Layout.jsx           # Main layout with header
│   │   └── ProductCard.jsx      # Product display component
│   ├── contexts/                # React Context for state
│   │   ├── CartContext.jsx     # Cart state management
│   │   └── UserContext.jsx     # User authentication
│   ├── hooks/                   # Custom React hooks
│   │   └── useProducts.js      # Product data fetching
│   ├── pages/                   # Page components
│   │   ├── Home.jsx            # Homepage
│   │   ├── Products.jsx        # Product listing
│   │   ├── Brands.jsx          # Brand showcase
│   │   ├── Deals.jsx           # Deals & promotions
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Login.jsx           # User login
│   │   └── Register.jsx        # User registration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── app.py                       # Flask API backend
├── requirements.txt             # Python dependencies
├── package.json                 # Node.js dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # This file
```

## 🎨 Design Features

### **Modern UI/UX**
- **Orange Primary Color** (`#f97316`) for brand consistency
- **Clean Typography** with Manrope font family
- **Smooth Animations** with CSS transitions
- **Responsive Grid Layouts** for all screen sizes
- **Interactive Elements** with hover effects

### **Component Architecture**
- **Reusable Components** for consistent design
- **Context-based State** for global data management
- **Custom Hooks** for data fetching and state logic
- **Route-based Navigation** with active state indicators

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/<id>` - Get specific product
- `GET /api/featured-products` - Get featured products
- `GET /api/categories` - Get product categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/<id>` - Remove item from cart

### Search
- `GET /api/search?q=<query>` - Search products

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

## 🛠️ Development

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development
```bash
# Run Flask development server
python app.py

# The API will be available at http://localhost:5000
```

## 🎯 Key Technologies

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Lightweight Python web framework
- **Flask-SQLAlchemy** - Database ORM
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite** - Lightweight database

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
# Add Procfile:
web: python app.py
```

## 🎉 What's New in React Version

### **Dynamic Interactions**
- ✅ **Real-time Cart Updates** without page refresh
- ✅ **Instant Search** with live results
- ✅ **Smooth Page Transitions** with React Router
- ✅ **Interactive Product Cards** with hover effects
- ✅ **Responsive State Management** across components

### **Modern Development Experience**
- ✅ **Hot Module Replacement** for instant updates
- ✅ **Component-based Architecture** for maintainability
- ✅ **TypeScript Ready** (can be added easily)
- ✅ **Modern ES6+ Features** throughout
- ✅ **Optimized Bundle** with Vite

### **Enhanced User Experience**
- ✅ **Loading States** for better feedback
- ✅ **Error Handling** with user-friendly messages
- ✅ **Form Validation** with real-time feedback
- ✅ **Accessibility Features** built-in
- ✅ **Mobile-first Design** approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React.js and Flask**