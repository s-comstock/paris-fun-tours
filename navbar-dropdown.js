window.Webflow ||= [];
window.Webflow.push(() => {
  const wfIx = Webflow.require("ix3");
  const dropdownToggles = document.querySelectorAll('.menu_dropdown-link') ||
    document.querySelectorAll('.w-dropdown-toggle');

  // Create a map to track open/closed state for each dropdown
  const dropdownStates = new Map();

  // Initialize state for each dropdown
  dropdownToggles.forEach(function (dropdownToggle) {
    dropdownStates.set(dropdownToggle, false);

    // Listen for clicks on the dropdown toggle
    dropdownToggle.addEventListener('click', function () {
      // Toggle the state for this specific dropdown
      const isOpen = !dropdownStates.get(dropdownToggle);
      dropdownStates.set(dropdownToggle, isOpen);

      if (isOpen) {
        wfIx.emit("Dropdown Open");
        console.log('Dropdown opened');
      } else {
        wfIx.emit("Dropdown Close");
        console.log('Dropdown closed');
      }
    });
  });

  // Listen for clicks outside to close dropdown
  document.addEventListener('click', function (event) {
    dropdownToggles.forEach(function (dropdownToggle) {
      const dropdownContent = dropdownToggle.querySelector('[w-dropdown-toggle]') ||
        dropdownToggle.nextElementSibling;

      const isClickOutside = !dropdownToggle.contains(event.target) &&
        (!dropdownContent || !dropdownContent.contains(event.target));

      // Get the current open state from our Map
      const isOpen = dropdownStates.get(dropdownToggle);

      // Only emit if dropdown is currently open and user clicked outside
      if (isOpen && isClickOutside) {
        dropdownStates.set(dropdownToggle, false);
        wfIx.emit("Dropdown Close");
        console.log('Dropdown closed (outside click)');
      }
    });
  });
});
