window.Webflow ||= [];
window.Webflow.push(() => {
  const menuButton = document.querySelector('.navbar_menu-button') ||
    document.querySelector('.w-nav-button') ||
    document.querySelector('.nav_menu-button');

  // Get the nav menu container
  const navMenu = document.querySelector('.w-nav-menu') ||
    document.querySelector('[role="navigation"]');

  if (menuButton && navMenu) {
    // Track the menu's open/closed state
    let isMenuOpen = false;

    // Listen for the hamburger button click
    menuButton.addEventListener('click', function () {
      const wfIx = Webflow.require("ix3");
      isMenuOpen = !isMenuOpen; // Toggle the state
      wfIx.emit("Menu Toggle");
      console.log('CLICKED');
    });

    // Listen for clicks outside the nav to detect when menu closes
    document.addEventListener('click', function (event) {
      const wfIx = Webflow.require("ix3");

      // Check if click is outside both the menu AND the button
      const isClickOutside = !navMenu.contains(event.target) &&
        !menuButton.contains(event.target);

      // Only emit if menu is currently open and user clicked outside
      if (isMenuOpen && isClickOutside) {
        isMenuOpen = false;
        wfIx.emit("Menu Toggle");
      }
    });
  }
});
