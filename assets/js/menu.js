// const sheetId = '1mle7fv9FiBj2cu7h7LLF-a9JnPbSx-6w1WhjH76CegQ';
// const apiKey = 'AIzaSyDr1hKI4jpsDw4_WfVTt81obTNLgIdU6P4';
const MenusheetName = 'Menu'; // Replace with your sheet name

async function fetchMenuData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${MenusheetName}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const headers = data.values[0];
            const rows = data.values.slice(1);

            // Parse and filter the menu items
            const menuItems = rows.map(row => {
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = row[index];
                });
                return item;
            }).filter(item => item.Status && item.Status.toLowerCase() === 'active'); // Filter only active items

            displayMenuItems(menuItems);
        } else {
            console.error('No data found.');
        }
    } catch (error) {
        console.error('Error fetching the menu data:', error);
    }
}

function displayMenuItems(items) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        if (item.Status && item.Status.toLowerCase() === 'active') { // Check if the item is active
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');

            itemDiv.innerHTML = `
                <h4>${item.FoodName || 'No Name'}</h4>
                <p>${item.FoodDescription || 'No Description'}</p>
                <p>Quantity: ${item.FoodQuantity || 'N/A'}</p>
                <p>Price: $${item.FoodPerUnitPrice || '0.00'}</p>
                <button onclick="addToCart('${item.FoodName || 'unknown'}')">Add to Cart</button>
            `;

            menuContainer.appendChild(itemDiv);
        }
    });
}

// Call the fetchMenuData function on page load or when needed
fetchMenuData();
