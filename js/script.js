const profilePic = document.getElementById('navProfilePic');
  const submenu = document.getElementById('submenu');
  const hamburger = document.getElementById('hamburger');
  const navbarRight = document.getElementById('navbarRight');

  function toggleMenu() {
    submenu.classList.toggle('open');
  }

  hamburger.addEventListener('click', () => {
    navbarRight.classList.toggle('show');
  });

  window.addEventListener('click', (e) => {
    if (!submenu.contains(e.target) && !profilePic.contains(e.target)) {
      submenu.classList.remove('open');
    }

    if (
      !navbarRight.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navbarRight.classList.remove('show');
    }
  });