(function(){
  // Inject admin controls into existing navbar. Run after DOM is ready.
  function injectAdminBar() {
    const navCollapse = document.querySelector('#navMain');
    // prefer an existing right-side container (.d-flex) inside navbar
    let rightEl = document.querySelector('.navbar .d-flex');
    // if no top navbar, try sidebar
    if (!rightEl) {
      rightEl = document.querySelector('.sidebar');
    }
    // if sidebar found, create a bottom area for admin controls
    if (rightEl && rightEl.classList.contains('sidebar')) {
      let adminWrap = rightEl.querySelector('.admin-controls');
      if (!adminWrap) {
        adminWrap = document.createElement('div');
        adminWrap.className = 'admin-controls mt-3';
        rightEl.appendChild(adminWrap);
      }
      rightEl = adminWrap;
    }
    if (!rightEl) {
      // create a right-side div inside the navbar container
      const container = document.querySelector('.navbar .container') || document.querySelector('.navbar');
      rightEl = document.createElement('div');
      rightEl.className = 'd-flex';
      if (container) container.appendChild(rightEl);
    }

    // Helper to create admin button or menu
    function render() {
      rightEl.innerHTML = '';
      const isAdmin = !!sessionStorage.getItem('adminLoggedIn');
      const user = (()=>{ try{ return JSON.parse(sessionStorage.getItem('userLoggedIn')||'null'); }catch(e){return null;} })();

      // User controls (left) — show profile/name or Login button
      if (user && user.email) {
        const uw = document.createElement('div');
        uw.className = 'me-2';
        uw.innerHTML = `<div class="dropdown d-inline-block"><button class="btn btn-outline-light dropdown-toggle" type="button" id="userMenuBtn" data-bs-toggle="dropdown" aria-expanded="false">${user.name||user.email}</button><ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuBtn"><li><a class="dropdown-item" href="profile.html">Profile</a></li><li><a class="dropdown-item" href="playlist.html">My Playlists</a></li><li><hr class="dropdown-divider"></li><li><button class="dropdown-item text-danger" id="userLogoutBtn">Logout</button></li></ul></div>`;
        rightEl.appendChild(uw);
        uw.querySelector('#userLogoutBtn')?.addEventListener('click', ()=>{ sessionStorage.removeItem('userLoggedIn'); window.location.href='index.html'; });
      } else {
        const login = document.createElement('a');
        login.href = 'login.html';
        login.className = 'btn btn-outline-light me-2';
        login.textContent = 'Login';
        rightEl.appendChild(login);
      }

      // Admin controls (right)
      if (isAdmin) {
        // dropdown
        const wrapper = document.createElement('div');
        wrapper.className = 'dropdown';
        wrapper.innerHTML = `
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="adminMenuBtn" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="adminMenuBtn">
            <li><a class="dropdown-item" href="admin-dashboard.html">Dashboard</a></li>
            <li><a class="dropdown-item" href="admin-manage.html">Manage Songs</a></li>
            <li><a class="dropdown-item" href="admin-users.html">Manage Users</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item text-danger" id="adminLogoutBtn">Logout Admin</button></li>
          </ul>
        `;
        rightEl.appendChild(wrapper);

        // attach logout handler
        const logoutBtn = wrapper.querySelector('#adminLogoutBtn');
        logoutBtn && logoutBtn.addEventListener('click', function() {
          sessionStorage.removeItem('adminLoggedIn');
          window.location.href = 'index.html';
        });
      } else {
        // show admin link
        const login = document.createElement('a');
        login.href = 'admin-login.html';
        login.className = 'btn btn-primary';
        login.textContent = 'Admin';
        rightEl.appendChild(login);
      }
    }

    render();

    // Observe sessionStorage changes in same tab via custom event (other tabs won't trigger)
    window.addEventListener('storage', function(e) {
      if (e.key === 'adminLoggedIn') render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAdminBar);
  } else {
    injectAdminBar();
  }
})();
