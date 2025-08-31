// Sample product data with 10 products
const products = [
    { id: 1, name: "Laptop Pro", price: 1299.99, category: "computers", image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg" },
    { id: 2, name: "Smartphone X", price: 799.99, category: "mobile", image: "https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg" },
    { id: 3, name: "Wireless Headphones", price: 149.99, category: "accessories", image: "https://images.pexels.com/photos/4887151/pexels-photo-4887151.jpeg" },
    { id: 4, name: "Smartwatch Series 5", price: 299.99, category: "accessories", image: "https://images.pexels.com/photos/440320/pexels-photo-440320.jpeg" },
    { id: 5, name: "Gaming Laptop", price: 1599.99, category: "computers", image: "https://images.pexels.com/photos/19012051/pexels-photo-19012051.jpeg" },
   
    { id: 6, name: "Wireless Mouse", price: 29.99, category: "accessories", image: "https://images.pexels.com/photos/32995421/pexels-photo-32995421.jpeg" },
    { id: 7, name: "Mechanical Keyboard", price: 89.99, category: "accessories", image: "https://images.pexels.com/photos/4792732/pexels-photo-4792732.jpeg" },
    { id: 8, name: "Bluetooth Speaker", price: 129.99, category: "accessories", image: "https://images.pexels.com/photos/9767549/pexels-photo-9767549.jpeg" },
    { id: 9, name: "4K Monitor", price: 399.99, category: "computers", image:"https://images.pexels.com/photos/7989228/pexels-photo-7989228.jpeg" }
];

// Cart array to store selected items
let cart = [];
let filteredProducts = [...products]; // Copy of products for filtering/sorting

// Function to display products
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <p class="category">Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} (x${item.quantity})</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2);
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart();
    }
}

// Function to filter products by category
function filterByCategory() {
    const category = document.getElementById('category-select').value;
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts();
}

// Function to sort products
function sortProducts() {
    const sortOption = document.getElementById('sort-select').value;
    if (sortOption === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        filteredProducts = [...products]; // Reset to default
    }
    displayProducts();
}

// Function to search products
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    displayProducts();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});