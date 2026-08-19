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

  // Refuerza el autoplay del video de fondo en mobile
  // (algunos navegadores como Chrome con "Ahorro de datos" o Safari
  // con batería baja bloquean el autoplay y muestran el botón de play)
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    var tryPlay = function () {
      var playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Autoplay bloqueado: reintenta apenas el usuario interactúe
          var resumeOnInteraction = function () {
            heroVideo.play();
            document.removeEventListener('touchstart', resumeOnInteraction);
            document.removeEventListener('click', resumeOnInteraction);
          };
          document.addEventListener('touchstart', resumeOnInteraction, { once: true, passive: true });
          document.addEventListener('click', resumeOnInteraction, { once: true });
        });
      }
    };

    tryPlay();

    // Si el video se pausa por cualquier motivo (cambio de pestaña, etc.),
    // intenta reanudarlo al volver a estar visible
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && heroVideo.paused) {
        tryPlay();
      }
    });
  }

});
