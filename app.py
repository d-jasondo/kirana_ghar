from flask import Flask, request, jsonify, session, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'kirana-ghar-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kirana_ghar.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for React frontend
CORS(app, origins=['http://localhost:3000'])

db = SQLAlchemy(app)

# Database Models
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200))
    category = db.Column(db.String(50))
    stock_quantity = db.Column(db.Integer, default=0)
    badge = db.Column(db.String(20))  # New, Best Seller, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'category': self.category,
            'stock_quantity': self.stock_quantity,
            'badge': self.badge,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

# API Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category', '')
    search = request.args.get('search', '')
    
    query = Product.query.filter(Product.stock_quantity > 0)
    
    if category:
        query = query.filter(Product.category == category)
    if search:
        query = query.filter(Product.name.contains(search))
    
    products = query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = db.session.query(Product.category).distinct().all()
    return jsonify([cat[0] for cat in categories if cat[0]])

@app.route('/api/featured-products', methods=['GET'])
def get_featured_products():
    products = Product.query.filter(Product.stock_quantity > 0).limit(4).all()
    
    # If no products in database, create some sample data
    if not products:
        sample_products = [
            Product(
                name="Fresh Strawberries",
                description="1kg Pack",
                price=749.0,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBBGXlUVBboyAGGGONRCJPFBrkv6NtNspsiJbn9mpScDvVy_VpElFBnZGEOHRH-5b-VPsH57cLwEdfjo5iEmI_J8yuOaL63LbCH5aUy79O6ErCh8UlagSq-wxGk_AF1oTV0D5Cmj6HSs7zt0dCNV1jBpJnBnGsYItqxr3jmjrwRRuhVq1j5AS41XsybzD0lcdv29Oio8Qe4I1WUvyCGUYNJPbtZjh-kLUM3TpLLL5-hRRBjAmQTUONfVqbZktlm1iN1bikWltfK2WA",
                category="Fruits",
                stock_quantity=50,
                badge="New"
            ),
            Product(
                name="Hass Avocado",
                description="Single",
                price=125.0,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBDwOzAURvwC-u2PxBJpdE3U2U3WkjI-lIkn94eUGxWudMlrMKyBfEKOGYvW77P46HLQaeExgd443EhxEeW7fU_TQq5NWiJsq6YU-vZSO4tWmdpPKz-AGi8_t416Ncdrb0MDyfjn-MNHoggVgO-dt5__cyKG83fJOiDx1iIYmmc6OhSJHRNgB7tZobKQ-9UoObCPOgt03vKVW57uVjEdnpT6O3guGOs-FZoCdX7VdD9k9wS8S3IvJ1PI5G_ApagKfoN7uOTSUhhtLk",
                category="Fruits",
                stock_quantity=30,
                badge=None
            ),
            Product(
                name="Organic Milk",
                description="1L Carton",
                price=265.0,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBly4wahBn3jhtrqrEE4s1BIpApA8vEuoDx6A2FjzHSKxwghq5lBdgI7I6pxA5tsYKOgoLJjXMuTDjFEYmt-o-l4lD1nTMQnHaxmLLKBrGmIeNzgP0Rr20TpG9x8W0rLe8vAZJND5_DR2d7J53CKMerAZJKepJs28ktiNLe7e9ChTN0i5ZQaeDbHewI7JHQDSaO1N8lICSCwMHITj5YONK2m5lM7pQEeDYhydcnn3EtuK3KWeo0gNBDvzn8VIgSVIrpk6mXxucrRKk",
                category="Dairy",
                stock_quantity=25,
                badge="Best Seller"
            ),
            Product(
                name="Sourdough Bread",
                description="Loaf",
                price=450.0,
                image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBkgFpTe8WKBVIUzSQeQxQVy55C-zDM9QW0IG3aw5mHIx8ujpzaHWbEwqa_Q5Fn4VFxDu20OZmJAcLOvs_fZJEyBynxdJDOFxr9H7uu1DanuqmKNfXjLZDOwW-bedcUdYUud83xsLvY6Ys8TBVViyFpMdGasyqnlV8w-FQFGJagOu7DnLAUvkQ01ftCCtA4r4JFzaqkJrMO6G7jRlteropI3DgkpOBWDd-64o9fJ4Vp3csrzgvQRM4npiXCQeSfaBNf5cu_izQ-ItA",
                category="Bakery",
                stock_quantity=15,
                badge=None
            )
        ]
        
        for product in sample_products:
            db.session.add(product)
        db.session.commit()
        products = Product.query.filter(Product.stock_quantity > 0).limit(4).all()
    
    return jsonify([product.to_dict() for product in products])

@app.route('/api/cart', methods=['GET'])
def get_cart():
    # For demo purposes, we'll use session to store cart
    cart_items = []
    if 'cart' in session:
        for product_id, quantity in session['cart'].items():
            product = Product.query.get(int(product_id))
            if product:
                cart_items.append({
                    'product': product.to_dict(),
                    'quantity': quantity
                })
    
    return jsonify(cart_items)

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = str(data.get('product_id'))
    quantity = int(data.get('quantity', 1))
    
    # For demo purposes, we'll use session to store cart
    if 'cart' not in session:
        session['cart'] = {}
    
    cart = session['cart']
    if product_id in cart:
        cart[product_id] += quantity
    else:
        cart[product_id] = quantity
    
    session['cart'] = cart
    session.modified = True
    
    return jsonify({'success': True, 'message': 'Item added to cart!'})

@app.route('/api/cart/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    if 'cart' in session:
        cart = session['cart']
        if str(product_id) in cart:
            del cart[str(product_id)]
            session['cart'] = cart
            session.modified = True
    
    return jsonify({'success': True, 'message': 'Item removed from cart!'})

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if len(query) < 2:
        return jsonify([])
    
    products = Product.query.filter(
        Product.name.contains(query) | Product.description.contains(query)
    ).limit(5).all()
    
    results = [{'id': p.id, 'name': p.name, 'price': p.price} for p in products]
    return jsonify(results)

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    # Simple demo login - in production, use proper authentication
    if data.get('username') and data.get('password'):
        session['user'] = {'username': data['username']}
        return jsonify({'success': True, 'message': 'Login successful!'})
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'success': True, 'message': 'Logout successful!'})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    # Simple demo registration - in production, use proper validation and hashing
    if data.get('username') and data.get('email') and data.get('password'):
        return jsonify({'success': True, 'message': 'Registration successful!'})
    return jsonify({'success': False, 'message': 'Missing required fields'}), 400

# HTML Template Routes
@app.route('/')
def index():
    featured_products = Product.query.filter(Product.stock_quantity > 0).limit(4).all()
    return render_template('index.html', featured_products=featured_products)

@app.route('/products')
def products():
    category = request.args.get('category', '')
    search = request.args.get('search', '')
    
    query = Product.query.filter(Product.stock_quantity > 0)
    
    if category:
        query = query.filter(Product.category == category)
    if search:
        query = query.filter(Product.name.contains(search))
    
    products = query.all()
    categories = db.session.query(Product.category).distinct().all()
    categories = [cat[0] for cat in categories if cat[0]]
    
    return render_template('products.html', products=products, categories=categories, 
                         selected_category=category, search_query=search)

@app.route('/brands')
def brands():
    return render_template('brands.html')

@app.route('/deals')
def deals():
    return render_template('deals.html')

@app.route('/cart')
def cart():
    cart_items = []
    if 'cart' in session:
        for product_id, quantity in session['cart'].items():
            product = Product.query.get(int(product_id))
            if product:
                cart_items.append({
                    'product': product,
                    'quantity': quantity
                })
    return render_template('cart.html', cart_items=cart_items)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username and password:
            session['user'] = {'username': username}
            flash('Login successful!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid credentials', 'error')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        if username and email and password:
            flash('Registration successful!', 'success')
            return redirect(url_for('login'))
        else:
            flash('Please fill all fields', 'error')
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('Logged out successfully!', 'info')
    return redirect(url_for('index'))

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = {}
    
    cart = session['cart']
    if str(product_id) in cart:
        cart[str(product_id)] += 1
    else:
        cart[str(product_id)] = 1
    
    session['cart'] = cart
    session.modified = True
    flash('Item added to cart!', 'success')
    return redirect(request.referrer or url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Create sample data if no products exist
        if Product.query.count() == 0:
            sample_products = [
                Product(
                    name="Fresh Strawberries",
                    description="1kg Pack",
                    price=749.0,
                    image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBBGXlUVBboyAGGGONRCJPFBrkv6NtNspsiJbn9mpScDvVy_VpElFBnZGEOHRH-5b-VPsH57cLwEdfjo5iEmI_J8yuOaL63LbCH5aUy79O6ErCh8UlagSq-wxGk_AF1oTV0D5Cmj6HSs7zt0dCNV1jBpJnBnGsYItqxr3jmjrwRRuhVq1j5AS41XsybzD0lcdv29Oio8Qe4I1WUvyCGUYNJPbtZjh-kLUM3TpLLL5-hRRBjAmQTUONfVqbZktlm1iN1bikWltfK2WA",
                    category="Fruits",
                    stock_quantity=50,
                    badge="New"
                ),
                Product(
                    name="Hass Avocado",
                    description="Single",
                    price=125.0,
                    image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBDwOzAURvwC-u2PxBJpdE3U2U3WkjI-lIkn94eUGxWudMlrMKyBfEKOGYvW77P46HLQaeExgd443EhxEeW7fU_TQq5NWiJsq6YU-vZSO4tWmdpPKz-AGi8_t416Ncdrb0MDyfjn-MNHoggVgO-dt5__cyKG83fJOiDx1iIYmmc6OhSJHRNgB7tZobKQ-9UoObCPOgt03vKVW57uVjEdnpT6O3guGOs-FZoCdX7VdD9k9wS8S3IvJ1PI5G_ApagKfoN7uOTSUhhtLk",
                    category="Fruits",
                    stock_quantity=30,
                    badge=None
                ),
                Product(
                    name="Organic Milk",
                    description="1L Carton",
                    price=265.0,
                    image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBly4wahBn3jhtrqrEE4s1BIpApA8vEuoDx6A2FjzHSKxwghq5lBdgI7I6pxA5tsYKOgoLJjXMuTDjFEYmt-o-l4lD1nTMQnHaxmLLKBrGmIeNzgP0Rr20TpG9x8W0rLe8vAZJND5_DR2d7J53CKMerAZJKepJs28ktiNLe7e9ChTN0i5ZQaeDbHewI7JHQDSaO1N8lICSCwMHITj5YONK2m5lM7pQEeDYhydcnn3EtuK3KWeo0gNBDvzn8VIgSVIrpk6mXxucrRKk",
                    category="Dairy",
                    stock_quantity=25,
                    badge="Best Seller"
                ),
                Product(
                    name="Sourdough Bread",
                    description="Loaf",
                    price=450.0,
                    image_url="https://lh3.googleusercontent.com/aida-public/AB6AXuBkgFpTe8WKBVIUzSQeQxQVy55C-zDM9QW0IG3aw5mHIx8ujpzaHWbEwqa_Q5Fn4VFxDu20OZmJAcLOvs_fZJEyBynxdJDOFxr9H7uu1DanuqmKNfXjLZDOwW-bedcUdYUud83xsLvY6Ys8TBVViyFpMdGasyqnlV8w-FQFGJagOu7DnLAUvkQ01ftCCtA4r4JFzaqkJrMO6G7jRlteropI3DgkpOBWDd-64o9fJ4Vp3csrzgvQRM4npiXCQeSfaBNf5cu_izQ-ItA",
                    category="Bakery",
                    stock_quantity=15,
                    badge=None
                )
            ]
            
            for product in sample_products:
                db.session.add(product)
            db.session.commit()
    
    app.run(debug=True, port=5000)