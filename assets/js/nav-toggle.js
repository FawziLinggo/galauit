document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
});

