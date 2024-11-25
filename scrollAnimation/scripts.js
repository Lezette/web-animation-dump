document.addEventListener('DOMContentLoaded', () => {
  const dropdownItems = document.querySelectorAll('.about-dropdown-item');

  // On scroll, determine which item should be active
  const handleScroll = () => {
    dropdownItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

      // Toggle active state
      if (isVisible) {
        dropdownItems.forEach((el, i) => el.classList.toggle('active', i === index));
      }
    });
  };

  // Listen for scrolling
  window.addEventListener('scroll', handleScroll);

  // Expand the first item on page load
  if (dropdownItems.length) dropdownItems[0].classList.add('active');
});
