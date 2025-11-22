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

    // Toast notification method with enhanced styling
    showToast(message, type = 'success') {
        const toastContainer = document.querySelector('#toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'fa-check-circle';
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
        } else if (type === 'info') {
            icon = 'fa-info-circle';
        } else if (type === 'warning') {
            icon = 'fa-warning';
        }

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto-remove after 3.5 seconds
        setTimeout(() => {
            toast.remove();
        }, 3500);
    }
}

// Menu items array organized by categories
const menu = {
    appetizers: [
        new FoodItem("Hummus", 45, "images/hummus.jpg", "Creamy chickpea dip with tahini, lemon, and garlic", "appetizers"),
        new FoodItem("Baba Ganoush", 50, "images/Baba ghanoug.jpg", "Smoky roasted eggplant dip with tahini", "appetizers"),
        new FoodItem("Fattoush Salad", 55, "images/Fattoush salad.jpg", "Fresh mixed salad with crispy pita bread", "appetizers"),
        new FoodItem("Tabbouleh", 48, "images/Tabbouleh.jpg", "Parsley salad with tomatoes, bulgur, and mint", "appetizers"),
        new FoodItem("Stuffed Vine Leaves", 60, "images/Stuffed Vine Leaves.jpg", "Rice-stuffed grape leaves with herbs", "appetizers")
    ],
    mainDishes: [
        new FoodItem("Koshari", 60, "images/Koshari.jpg", "Egypt's national dish with rice, lentils, and pasta", "mainDishes"),
        new FoodItem("Shawarma", 120, "images/Shawarma.jpg", "Marinated meat with garlic sauce and pickles", "mainDishes"),
        new FoodItem("Ful Medames", 45, "images/Full medames.jpg", "Traditional fava beans cooked to perfection", "mainDishes"),
        new FoodItem("Grilled Kofta", 140, "images/Grilled Kofta.jpg", "Spiced ground meat skewers with tahini", "mainDishes"),
        new FoodItem("Hawawshi", 80, "images/Hawawshi.jpg", "Spiced meat baked in crispy bread", "mainDishes"),
        new FoodItem("Molokhia", 75, "images/molokhia.jpg", "Traditional jute leaf stew with chicken", "mainDishes"),
        new FoodItem("Kofta with Rice", 130, "images/Kofta with rice.jpg", "Spiced meatballs with aromatic rice", "mainDishes")
    ],
    drinks: [
        new DrinkItem("Pepsi", 25, "images/pepsi.jpg", "Refreshing carbonated soft drink", "drinks"),
        new DrinkItem("Mango Juice", 40, "images/Mango juice.jpg", "Fresh tropical mango juice", "drinks"),
        new DrinkItem("Fresh Orange", 35, "images/Fresh Orange juice.jpg", "Freshly squeezed orange juice", "drinks"),
        new DrinkItem("Tea", 20, "images/tea.jpg", "Traditional Egyptian black tea", "drinks"),
        new DrinkItem("Hibiscus", 30, "images/Hibiscus.jpg", "Refreshing hibiscus tea (Karkade)", "drinks"),
        new DrinkItem("Lemon Mint", 32, "images/Lemon ment.jpg", "Cool lemonade with fresh mint", "drinks"),
        new DrinkItem("Coffee", 25, "images/coffee.jpg", "Rich Turkish coffee", "drinks")
    ],
    desserts: [
        new FoodItem("Baklava", 65, "images/baklava.jpg", "Layers of phyllo with nuts and honey", "desserts"),
        new FoodItem("Basbousa", 50, "images/basbousa.jpg", "Sweet semolina cake with syrup", "desserts"),
        new FoodItem("Umm Ali", 55, "images/Um ali.jpg", "Traditional bread pudding with nuts", "desserts"),
        new FoodItem("Kunafa", 70, "images/kunafa.jpg", "Sweet cheese pastry with syrup", "desserts"),
        new FoodItem("Mahalabia", 40, "images/mahalabia.jpg", "Creamy milk pudding with rose water", "desserts"),
        new FoodItem("Zalabia", 45, "images/zalabia.jpg", "Crispy fried dough with honey", "desserts")
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

