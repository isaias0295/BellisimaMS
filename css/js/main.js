document.addEventListener('DOMContentLoaded', function () {

  // Navbar: agrega fondo sólido al hacer scroll
  var nav = document.getElementById('mainNav');
  var toggleNav = function () {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };
  toggleNav();
  window.addEventListener('scroll', toggleNav, { passive: true });

  // Cierra el menú colapsable en mobile al elegir una opción
  var navLinks = document.querySelectorAll('#navMenu .nav-link');
  var collapseEl = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  // Año actual en el footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
