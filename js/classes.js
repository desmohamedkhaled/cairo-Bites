// Base Class - MenuItem (Inheritance)
class MenuItem {
    constructor(name, price, image, description = '', category = '') {
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
    }

    // Polymorphism - Base displayInfo method
    displayInfo() {
        return `${this.name} - ${this.price} EGP`;
    }

    // Method to check if item is Food or Drink
    getCategory() {
        return this.constructor.name === 'FoodItem' ? 'food' : 'drink';
    }

    // Serialize for localStorage
    toJSON() {
        return {
            type: this.constructor.name,
            name: this.name,
            price: this.price,
            image: this.image,
            description: this.description,
            category: this.category
        };
    }

    // Deserialize from localStorage
    static fromJSON(data) {
        if (data.type === 'FoodItem') {
            return new FoodItem(data.name, data.price, data.image, data.description || '', data.category || '');
        } else if (data.type === 'DrinkItem') {
            return new DrinkItem(data.name, data.price, data.image, data.description || '', data.category || '');
        }
        return new MenuItem(data.name, data.price, data.image, data.description || '', data.category || '');
    }
}

// Subclass - FoodItem (Inheritance)
class FoodItem extends MenuItem {
    constructor(name, price, image, description = '', category = '') {
        super(name, price, image, description, category);
    }

    // Polymorphism - Override displayInfo for FoodItem
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Hot)`;
    }
}

// Subclass - DrinkItem (Inheritance)
class DrinkItem extends MenuItem {
    constructor(name, price, image, description = '', category = '') {
        super(name, price, image, description, category);
    }

    // Polymorphism - Override displayInfo for DrinkItem
    displayInfo() {
        return `${this.name} - ${this.price} EGP (Served Cold)`;
    }
}

// CartItem class to manage quantity
class CartItem {
    constructor(item) {
        this.item = item;
        this.quantity = 1;
    }

    getTotalPrice() {
        return this.item.price * this.quantity;
    }

    // Serialize for localStorage
    toJSON() {
        return {
            item: this.item.toJSON(),
            quantity: this.quantity
        };
    }

    // Deserialize from localStorage
    static fromJSON(data) {
        const item = MenuItem.fromJSON(data.item);
        const cartItem = new CartItem(item);
        cartItem.quantity = data.quantity;
        return cartItem;
    }
}

// OrderManager Class (Encapsulation with private fields)
class OrderManager {
    // Encapsulation - Private field using # (ES6 private class fields)
    #items = [];
    #storageKey = 'cairoBitesCart';

    constructor() {
        this.loadFromStorage();
    }

    // Load cart from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.#storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                this.#items = data.map(item => CartItem.fromJSON(item));
                this.updateCartBadge();
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        }
    }

    // Save cart to localStorage
    saveToStorage() {
        try {
            const data = this.#items.map(item => item.toJSON());
            localStorage.setItem(this.#storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    // Public method to add item
    addItem(item) {
        const existingItemIndex = this.#items.findIndex(
            cartItem => cartItem.item.name === item.name
        );

        if (existingItemIndex !== -1) {
            this.#items[existingItemIndex].quantity++;
        } else {
            this.#items.push(new CartItem(item));
        }

        this.saveToStorage();
        this.updateCartBadge();
        this.showToast('Item added to cart!', 'success');
    }

    // Public method to remove item
    removeItem(index) {
        if (index >= 0 && index < this.#items.length) {
            this.#items.splice(index, 1);
            this.saveToStorage();
            this.updateCartBadge();
            this.showToast('Item removed from cart', 'success');
        }
    }

    // Public method to increase quantity
    increaseQuantity(index) {
        if (index >= 0 && index < this.#items.length) {
            this.#items[index].quantity++;
            this.saveToStorage();
            this.updateCartBadge();
        }
    }

    // Public method to decrease quantity
    decreaseQuantity(index) {
        if (index >= 0 && index < this.#items.length) {
            if (this.#items[index].quantity > 1) {
                this.#items[index].quantity--;
            } else {
                this.removeItem(index);
                return;
            }
            this.saveToStorage();
            this.updateCartBadge();
        }
    }

    // Public method to calculate total (encapsulated calculation)
    calculateTotal() {
        return this.#items.reduce((total, cartItem) => total + cartItem.getTotalPrice(), 0);
    }

    // Public method to get items count
    getItemCount() {
        return this.#items.reduce((count, cartItem) => count + cartItem.quantity, 0);
    }

    // Public method to get unique items count
    getUniqueItemCount() {
        return this.#items.length;
    }

    // Public method to clear order
    clearOrder() {
        this.#items = [];
        this.saveToStorage();
        this.updateCartBadge();
    }

    // Public method to get all items
    getItems() {
        return this.#items;
    }

    // Update cart badge in navbar
    updateCartBadge() {
        const cartBadge = document.querySelector('#cartBadge');
        if (cartBadge) {
            const itemCount = this.getItemCount();
            cartBadge.textContent = itemCount;
            cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
        }
    }

    // Toast notification method
    showToast(message, type = 'success') {
        const toastContainer = document.querySelector('#toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Menu items array organized by categories
const menu = {
    appetizers: [
        new FoodItem("Hummus", 45, "https://images.unsplash.com/photo-1571155329693-1e4d6d8c43e5?w=400&h=300&fit=crop", "Creamy chickpea dip with tahini, lemon, and garlic", "appetizers"),
        new FoodItem("Baba Ganoush", 50, "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop", "Smoky roasted eggplant dip with tahini", "appetizers"),
        new FoodItem("Fattoush Salad", 55, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", "Fresh mixed salad with crispy pita bread", "appetizers"),
        new FoodItem("Tabbouleh", 48, "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", "Parsley salad with tomatoes, bulgur, and mint", "appetizers"),
        new FoodItem("Stuffed Vine Leaves", 60, "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop", "Rice-stuffed grape leaves with herbs", "appetizers")
    ],
    mainDishes: [
        new FoodItem("Koshari", 60, "https://images.unsplash.com/photo-1619895862022-091cfb1b6d1f?w=400&h=300&fit=crop", "Egypt's national dish with rice, lentils, and pasta", "mainDishes"),
        new FoodItem("Shawarma", 120, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", "Marinated meat with garlic sauce and pickles", "mainDishes"),
        new FoodItem("Ful Medames", 45, "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", "Traditional fava beans cooked to perfection", "mainDishes"),
        new FoodItem("Grilled Kofta", 140, "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop", "Spiced ground meat skewers with tahini", "mainDishes"),
        new FoodItem("Hawawshi", 80, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", "Spiced meat baked in crispy bread", "mainDishes"),
        new FoodItem("Molokhia", 75, "https://images.unsplash.com/photo-1546069901-5d8d92d0e8f5?w=400&h=300&fit=crop", "Traditional jute leaf stew with chicken", "mainDishes"),
        new FoodItem("Kofta with Rice", 130, "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", "Spiced meatballs with aromatic rice", "mainDishes")
    ],
    drinks: [
        new DrinkItem("Pepsi", 25, "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop", "Refreshing carbonated soft drink", "drinks"),
        new DrinkItem("Mango Juice", 40, "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=300&fit=crop", "Fresh tropical mango juice", "drinks"),
        new DrinkItem("Fresh Orange", 35, "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop", "Freshly squeezed orange juice", "drinks"),
        new DrinkItem("Tea", 20, "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", "Traditional Egyptian black tea", "drinks"),
        new DrinkItem("Hibiscus", 30, "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop", "Refreshing hibiscus tea (Karkade)", "drinks"),
        new DrinkItem("Lemon Mint", 32, "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop", "Cool lemonade with fresh mint", "drinks"),
        new DrinkItem("Coffee", 25, "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop", "Rich Turkish coffee", "drinks")
    ],
    desserts: [
        new FoodItem("Baklava", 65, "https://images.unsplash.com/photo-1567921464020-f85aea2619c0?w=400&h=300&fit=crop", "Layers of phyllo with nuts and honey", "desserts"),
        new FoodItem("Basbousa", 50, "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop", "Sweet semolina cake with syrup", "desserts"),
        new FoodItem("Umm Ali", 55, "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop", "Traditional bread pudding with nuts", "desserts"),
        new FoodItem("Kunafa", 70, "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop", "Sweet cheese pastry with syrup", "desserts"),
        new FoodItem("Mahalabia", 40, "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop", "Creamy milk pudding with rose water", "desserts"),
        new FoodItem("Zalabia", 45, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", "Crispy fried dough with honey", "desserts")
    ]
};

// Flatten menu for compatibility with existing code
const allMenuItems = [
    ...menu.appetizers,
    ...menu.mainDishes,
    ...menu.drinks,
    ...menu.desserts
];

// Initialize global OrderManager instance
const order = new OrderManager();

// Newsletter subscription function (global)
function subscribeNewsletter() {
    const input = document.querySelector('#newsletterInput');
    if (!input) return;
    
    const email = input.value.trim();
    
    if (!email) {
        order.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        order.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    order.showToast('Thank you for subscribing!', 'success');
    input.value = '';
}

