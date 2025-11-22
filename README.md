# Cairo Bites - Restaurant Ordering System

A modern, visually stunning, and highly engaging restaurant ordering system built with HTML5, CSS3, and JavaScript (ES6 OOP). Features premium design elements, full responsiveness, and elegant user experience.

## ✨ Features

### Core Functionality
- **OOP Concepts**: Demonstrates Encapsulation, Inheritance, and Polymorphism
- **Category-based Menu**: Organized into Appetizers, Main Dishes, Drinks, and Desserts
- **Horizontal Scrolling**: Smooth horizontal scrolling for each menu category
- **Shopping Cart**: Add items to cart with quantity management
- **Cart Persistence**: Cart data saved in localStorage across pages
- **Checkout System**: Complete checkout page with delivery information form
- **Item Details**: Detailed view for each menu item with nutrition information
- **Team Page**: Showcase of restaurant team members

### Design & UX Features
- **Premium Design**: Modern, elegant interface with glassmorphism effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Premium hover effects, transitions, and micro-interactions
- **Mobile Menu**: Animated hamburger menu for mobile navigation
- **Scroll Progress**: Visual progress indicator at the top
- **Toast Notifications**: Elegant notification system for user feedback
- **Backdrop Blur**: Modern glassmorphism effects on navigation and cards
- **Enhanced Typography**: Professional font weights, spacing, and hierarchy

### Color Palette
The website uses an elegant, gradient-free color scheme:
- **Primary**: `#72383D` (Burgundy)
- **Secondary**: `#322D29` (Dark Brown)
- **Accent**: `#AC9C8D` (Taupe)
- **Backgrounds**: `#EFE9E1` (Cream), `#D9D9D9` (Light Gray), `#D1C7BD` (Light Beige)
- **Borders**: `#AC9C8D` (Taupe)

## 📄 Pages

- `index.html` - Home page with features and call-to-action
- `menu.html` - Menu page with categorized items and filtering
- `item.html` - Individual item detail page with nutrition facts
- `checkout.html` - Checkout and cart management page
- `team.html` - Team members showcase page

## 🛠 Technologies

- **HTML5**: Semantic markup and structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - CSS Custom Properties (Variables)
  - Backdrop filters (Glassmorphism)
  - Advanced animations and transitions
  - Media queries for responsive design
- **JavaScript ES6+**:
  - Classes and OOP principles
  - Private class fields (`#`)
  - Inheritance and Polymorphism
  - LocalStorage API
  - DOM manipulation

## 📁 Project Structure

```
├── index.html          # Home page
├── menu.html          # Menu page
├── item.html          # Item detail page
├── checkout.html      # Checkout page
├── team.html          # Team page
├── css/
│   └── style.css      # Main stylesheet with all design styles
├── js/
│   ├── classes.js     # OOP classes (MenuItem, FoodItem, DrinkItem, OrderManager)
│   ├── main.js        # Home page functionality
│   ├── menu.js        # Menu page functionality
│   ├── item.js        # Item detail page functionality
│   ├── checkout.js    # Checkout page functionality
│   └── team.js        # Team page functionality
├── images/            # Menu item images
└── README.md          # This file
```

## 🎯 OOP Implementation

### 1. Encapsulation
**Location**: `js/classes.js` - Lines 98-250

The `OrderManager` class demonstrates encapsulation using ES6 private class fields:

```javascript
class OrderManager {
    // Private fields (cannot be accessed directly)
    #items = [];
    #storageKey = 'cairoBitesCart';
    
    // Public methods provide controlled access
    addItem(item, qty = 1) { ... }
    removeItem(index) { ... }
    calculateTotal() { ... }
    getItems() { ... }
}
```

**Key Points**:
- Private fields (`#items`, `#storageKey`) protect internal data
- Public methods provide controlled access to private data
- Data integrity maintained through encapsulation

### 2. Inheritance
**Location**: `js/classes.js` - Lines 1-68

Class hierarchy demonstrating inheritance:

```javascript
// Base Class
class MenuItem {
    constructor(name, price, image, description, category, nutrition) {
        this.name = name;
        this.price = price;
        // ... other properties
    }
}

// Subclass - FoodItem extends MenuItem
class FoodItem extends MenuItem {
    constructor(name, price, image, description, category, nutrition) {
        super(name, price, image, description, category, nutrition);
    }
}

// Subclass - DrinkItem extends MenuItem
class DrinkItem extends MenuItem {
    constructor(name, price, image, description, category, nutrition) {
        super(name, price, image, description, category, nutrition);
    }
}
```

**Key Points**:
- `MenuItem` is the base class
- `FoodItem` and `DrinkItem` inherit from `MenuItem`
- `super()` calls parent constructor
- Child classes inherit all parent properties and methods

### 3. Polymorphism
**Location**: `js/classes.js` - Lines 12-67

Method overriding demonstrates polymorphism:

```javascript
// Base class method
class MenuItem {
    displayInfo() {
        return `${this.name} - ${this.price} EGP`;
    }
}

// Overridden in FoodItem
class FoodItem extends MenuItem {
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Hot)`;
    }
}

// Overridden in DrinkItem
class DrinkItem extends MenuItem {
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Cold)`;
    }
}
```

**Key Points**:
- Same method name (`displayInfo()`) in all classes
- Different implementations in each subclass
- Runtime polymorphism - method called depends on object type

## 🚀 Usage

### Getting Started

1. **Open the website**: Open `index.html` in a web browser
2. **Browse the menu**: Navigate to the menu page
3. **View items**: Click on any menu item to see details
4. **Add to cart**: Click "Add to Order" button on menu items
5. **Manage cart**: Adjust quantities or remove items
6. **Checkout**: Proceed to checkout and fill delivery information
7. **Explore team**: Visit the team page to see restaurant staff

### Features Usage

- **Menu Filtering**: Use filter buttons to show specific categories
- **Cart Management**: 
  - Add items with quantity
  - Increase/decrease quantities
  - Remove items
  - View total price
- **Responsive Navigation**: 
  - Desktop: Full navigation bar
  - Mobile: Hamburger menu (click to toggle)
- **Scroll Progress**: Visual indicator shows page scroll progress

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism**: Backdrop blur effects on navigation and cards
- **Smooth Animations**: Premium hover effects and transitions
- **Enhanced Shadows**: Multi-level shadow system for depth
- **Micro-interactions**: Button ripple effects, card hover animations
- **Scroll Effects**: Navbar changes on scroll, progress indicator

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 600, 700
- **Optimized**: Letter spacing, line heights, and font smoothing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### File Organization
- **HTML**: Structure and content
- **CSS**: All styles in `css/style.css` with CSS variables
- **JavaScript**: Modular JS files for each page
- **Images**: Menu item images in `images/` folder

### Key JavaScript Files
- `classes.js`: Core OOP classes and menu data
- `main.js`: Home page and shared functionality
- `menu.js`: Menu page rendering and filtering
- `item.js`: Item detail page rendering
- `checkout.js`: Cart management and checkout
- `team.js`: Team page rendering

## 📝 Notes

- Cart data persists in browser localStorage
- All menu items include nutrition information
- Images should be placed in the `images/` folder
- Color palette can be customized via CSS variables in `:root`

## 📄 License

© 2025 Cairo Bites. All rights reserved. Made with ❤️ in Egypt.

---

**Built with modern web technologies and best practices for a premium user experience.**
