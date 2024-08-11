// const sheetId = '1mle7fv9FiBj2cu7h7LLF-a9JnPbSx-6w1WhjH76CegQ';
// const apiKey = 'AIzaSyDr1hKI4jpsDw4_WfVTt81obTNLgIdU6P4';;
const categoriesSheetName = 'Categories';  // Assuming this is the name of your sheet

async function fetchCategories() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${categoriesSheetName}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

async function loadCategories() {
    try {
        const categories = await fetchCategories();
        console.log(categories); // Log the fetched categories

        const categoryList = document.getElementById('category-list');

        // Clear the existing list
        categoryList.innerHTML = '';

        // Check if categories data is present
        if (categories && categories.length > 0) {
            categories.forEach(category => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#'; // You can modify this to link to the appropriate category page
                link.textContent = category[0]; // Assuming each row has a single column with the category name
                listItem.appendChild(link);
                categoryList.appendChild(listItem);
            });
        } else {
            categoryList.innerHTML = '<li>No categories found</li>';
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Call loadCategories when the page loads
document.addEventListener('DOMContentLoaded', loadCategories);
