document.addEventListener('DOMContentLoaded', function () {
    const leftSidebar = document.querySelector('.left-sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');
    
    let isLeftSidebarVisible = false;
    let isRightSidebarVisible = false;

    function updateSidebars() {
        const mouseX = event.clientX;
        const windowWidth = window.innerWidth;

        // Show or hide the left sidebar based on mouse position
        if (mouseX < 50) {
            leftSidebar.style.transform = 'translateX(0)';
            isLeftSidebarVisible = true;
        } else if (mouseX > 200 && isLeftSidebarVisible) {
            leftSidebar.style.transform = 'translateX(-100%)';
            isLeftSidebarVisible = false;
        }

        // Show or hide the right sidebar based on mouse position
        if (mouseX > windowWidth - 50) {
            rightSidebar.style.transform = 'translateX(0)';
            isRightSidebarVisible = true;
        } else if (mouseX < windowWidth - 200 && isRightSidebarVisible) {
            rightSidebar.style.transform = 'translateX(100%)';
            isRightSidebarVisible = false;
        }
    }

    // Use the mousemove event to show/hide sidebars
    document.addEventListener('mousemove', updateSidebars);

    // Handle window resizing to adjust sidebar visibility
    window.addEventListener('resize', function() {
        // Reset sidebar visibility on resize
        leftSidebar.style.transform = 'translateX(0)';
        rightSidebar.style.transform = 'translateX(0)';
        isLeftSidebarVisible = true;
        isRightSidebarVisible = true;
    });
});
