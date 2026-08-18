/* Navbar Shift */
window.Webflow ||= [];
window.Webflow.push(() => {
  const navbarComponent = document.querySelector(
    '.navbar_component'); //Add your navbar class here
  const navbarMenuButton = document.querySelector(
    '.navbar_menu-button'); //Add your navbar menu button class here

  if (navbarComponent && navbarMenuButton) {
    // Helper function to determine if the menu is open
    const isMenuOpen = () => navbarMenuButton.classList.contains('is-active');

    // Function to update the scroll state
    function updateScrollState() {
      const isScrolled = window.scrollY > 100;
      navbarComponent.classList.toggle('is-scrolled', isScrolled);
    }

    // Function to update the active state
    function updateActiveState() {
      const isHovered = navbarComponent.matches(':hover');
      const isOpen = isMenuOpen();

      // Apply the .is-active class based on hover or menu open
      if (isHovered || isOpen) {
        navbarComponent.classList.add('is-active');
      } else {
        navbarComponent.classList.remove('is-active');
      }
    }

    // Event listeners
    navbarComponent.addEventListener('mouseenter', updateActiveState);
    navbarComponent.addEventListener('mouseleave', updateActiveState);
    navbarMenuButton.addEventListener('click', () => {
      // Toggle the 'is-active' class on the menu button
      navbarMenuButton.classList.toggle('is-active');
      // Directly toggle the 'is-active' class on the navbar component
      navbarComponent.classList.toggle('is-active', isMenuOpen());
    });
    window.addEventListener('scroll', updateScrollState);

    // Initial checks
    updateScrollState();
    updateActiveState();
  }
});

/*

let menuButton = $('.navbar_menu-button');
let line = '.navbar_menu-line';

menuButton.each(function () {
  let button = $(this);
  let state = 0;

  button.on('click', function () {
    state = (state + 1) % 2;

    if (state) {
      button.find(line).addClass('is-open');
    } else {
      setTimeout(function () {
        button.find(line).removeClass('is-open');
      }, 300);
    }
  });
});
*/
