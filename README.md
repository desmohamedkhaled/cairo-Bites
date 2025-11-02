# Cairo Bites - Restaurant Ordering System

A modern, responsive restaurant ordering system built with HTML, CSS, and JavaScript (ES6 OOP).

## Features

- **OOP Concepts**: Demonstrates Encapsulation, Inheritance, and Polymorphism
- **Category-based Menu**: Organized into Appetizers, Main Dishes, Drinks, and Desserts
- **Horizontal Scrolling**: Smooth horizontal scrolling for each menu category
- **Shopping Cart**: Add items to cart with quantity management
- **Cart Persistence**: Cart data saved in localStorage across pages
- **Responsive Design**: Mobile-friendly layout with smooth animations
- **Checkout System**: Complete checkout page with delivery information form

## Pages

- `index.html` - Home page
- `menu.html` - Menu page with categorized items
- `checkout.html` - Checkout and cart management page

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript ES6 (Classes, Private Fields, Inheritance)

## Project Structure

```
├── index.html
├── menu.html
├── checkout.html
├── css/
│   └── style.css
├── js/
│   ├── classes.js
│   ├── menu.js
│   ├── checkout.js
│   └── main.js
└── README.md
```

## OOP Implementation

### Encapsulation
- `OrderManager` class uses private fields (`#items`) for data protection
- Public methods provide controlled access to private data

### Inheritance
- `MenuItem` base class
- `FoodItem` and `DrinkItem` extend `MenuItem`

### Polymorphism
- `displayInfo()` method overridden in subclasses
- Each subclass displays information differently

## Usage

1. Open `index.html` in a web browser
2. Navigate to the menu page
3. Browse items by category (horizontal scrolling)
4. Add items to cart
5. Proceed to checkout

## License

© 2025 Cairo Bites. All rights reserved.

