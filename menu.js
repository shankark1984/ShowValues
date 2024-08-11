const sheetId = '1mle7fv9FiBj2cu7h7LLF-a9JnPbSx-6w1WhjH76CegQ';
const apiKey = 'AIzaSyDr1hKI4jpsDw4_WfVTt81obTNLgIdU6P4';
const SHEET_NAME = 'Menu';

const menuItemsContainer = document.getElementById('menu-items');
const cartItemsContainer = document.getElementById('cart-items');
const totalQuantityElement = document.getElementById('total-quantity');
const totalPriceElement = document.getElementById('total-price');

let cart = [];

// Fetch menu items from Google Sheets
fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${SHEET_NAME}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const items = data.values.slice(1); // Skip header row
        displayMenu(items);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayMenu(items) {
    menuItemsContainer.innerHTML = '';

    items.forEach(item => {
        const [SlNo, FoodCode, Category, SubCategory, FoodName, FoodQuantity, FoodPerUnitPrice,FoodDescription,Status] = item;

        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        itemElement.innerHTML = `
            <img src="${FoodCode}.jpg" alt="${FoodCode}">
            <div>
                <p>${FoodName}</p>
                <p>Quantity: ${FoodQuantity}</p>
                <p>Price: ${FoodPerUnitPrice}</p>
            </div>
            <button onclick="addToCart('${FoodName}', ${FoodQuantity}, ${FoodPerUnitPrice})">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(itemElement);
    });
}

function addToCart(name, quantity, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, quantity, price });
    }

    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotalPrice = item.quantity * item.price;
        totalQuantity += item.quantity;
        totalPrice += itemTotalPrice;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${itemTotalPrice.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const items = Array.from(menuItemsContainer.children);

    items.forEach(item => {
        const foodName = item.querySelector('div > p:first-child').textContent.toLowerCase();
        if (foodName.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

document.getElementById('veg-toggle').addEventListener('change', function () {
    const isVegOnly = this.checked;
    const items = Array.from(menuItemsContainer.children);

    items.forEach(item => {
        const foodName = item.querySelector('div > p:first-child').textContent.toLowerCase();
        if (isVegOnly && !foodName.includes('veg')) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    });
});

document.getElementById('print-bill').addEventListener('click', function () {
    window.print();
});
