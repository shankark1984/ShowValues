document.addEventListener('DOMContentLoaded', function() {
    const themeSelector = document.getElementById('theme-selector');
    const themeLink = document.getElementById('theme-link');
    const savedTheme = localStorage.getItem('theme') || 'default';

    // Apply the saved theme
    themeLink.href = `assets/css/styles-${savedTheme}.css`;
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', function() {
        const selectedTheme = themeSelector.value;
        themeLink.href = `assets/css/styles-${selectedTheme}.css`;

        // Save the selected theme to local storage
        localStorage.setItem('theme', selectedTheme);
    });
});
