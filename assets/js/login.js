const sheetId = '1mle7fv9FiBj2cu7h7LLF-a9JnPbSx-6w1WhjH76CegQ';
const apiKey = 'AIzaSyDr1hKI4jpsDw4_WfVTt81obTNLgIdU6P4';
const UsersheetName = 'User';
const branchSheetName='BranchDetails';

async function fetchSheetData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${UsersheetName}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

async function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const branchDropdown = document.getElementById('branch-list-dropdown');
    const selectedBranch = branchDropdown.value;
    const messageElement = document.getElementById('message');

    try {
        // Fetch user data
        const users = await fetchSheetData(UsersheetName);

        // Find the user based on username and password
        const user = users.find(row => row[4] === usernameInput && row[5] === passwordInput && row[6]===selectedBranch);

        if (user) {
            messageElement.textContent = 'Login successful!';
            messageElement.style.color = 'green';
            // Redirect or perform further actions here
            window.location.href = 'home.html';
        } else {
            messageElement.textContent = 'Invalid username or password or branch';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error during login:', error);
        messageElement.textContent = 'Error occurred during login';
        messageElement.style.color = 'red';
    }
}

// Function to fetch branch data from Google Sheets
async function fetchBranchList() {
    try {

        // Fetch branch data from Google Sheets
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${branchSheetName}?key=${apiKey}`);
        const data = await response.json();
        const branches = data.values; // Adjust based on your API response structure

        // Get the dropdown element
        const branchDropdown = document.getElementById('branch-list-dropdown');
        branchDropdown.innerHTML = ''; // Clear any existing options

        // Filter branches with status "Active"
        const activeBranches = branches.filter(branch => branch[14] === 'Active'); // Adjust index based on your data structure

        if (activeBranches.length > 0) {
            activeBranches.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch[2]; // Adjust index based on your data structure
                option.textContent = branch[2]; // Display branch name
                branchDropdown.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.textContent = 'No active branches available.';
            option.disabled = true;
            branchDropdown.appendChild(option);
        }
    } catch (error) {
        console.error('Error fetching branch list:', error);
        const branchDropdown = document.getElementById('branch-list-dropdown');
        branchDropdown.innerHTML = '<option>Error fetching branches.</option>';
    }
}

// Call the fetchBranchList function when the page loads
document.addEventListener('DOMContentLoaded', fetchBranchList);


