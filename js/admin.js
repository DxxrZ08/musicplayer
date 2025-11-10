/* admin.js — lightweight client-side validation + small UX helpers */
(function(){
  function isNonEmpty(s){ return String(s||'').trim().length>0; }
  function isValidUrl(s){ try{ new URL(s); return true; }catch(e){return false;} }

  // Basic client-side checks for upload form
  document.getElementById('uploadForm')?.addEventListener('submit', (e)=>{
    // handled in main.js; but we also validate fields here to give inline errors
    // This file intentionally small because main.js handles the upload logic
  });

  // Edit form validation handled in main.js before DB put

  // Expose helper to show alerts in a nicer way
  // Bootstrap toast helper
  window.uiToast = function(msg, opts = {}){
    const { type = 'info', timeout = 3000 } = opts;
    // create container if missing
    let container = document.getElementById('uiToastContainer');
    if(!container){
      container = document.createElement('div');
      container.id = 'uiToastContainer';
      container.className = 'position-fixed bottom-0 end-0 p-3';
      container.style.zIndex = 20000;
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-dark border-0 show';
    toast.role = 'status';
    toast.ariaLive = 'polite';
    toast.ariaAtomic = 'true';
    toast.style.minWidth = '200px';
    toast.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button></div>`;
    container.appendChild(toast);
    const closeBtn = toast.querySelector('.btn-close');
    const remove = ()=> { toast.remove(); };
    closeBtn && closeBtn.addEventListener('click', remove);
    if(timeout>0) setTimeout(remove, timeout);
    return toast;
  };

  // Generate a simple initials avatar as a data URL (SVG)
  // Usage: generateInitialsAvatar('Alice Doe', 120)
  window.generateInitialsAvatar = function(name, size){
    size = size || 120;
    const initials = (name||'').split(' ').filter(Boolean).map(s=>s[0]).slice(0,2).join('').toUpperCase() || 'G';
    const bg = '#1DB954';
    const fg = '#FFFFFF';
    const fontSize = Math.round(size * 0.45);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><rect width='100%' height='100%' fill='${bg}' rx='12' ry='12'/><text x='50%' y='50%' dy='0.35em' font-family='Rubik, Inter, system-ui, Arial' font-size='${fontSize}' fill='${fg}' text-anchor='middle' alignment-baseline='middle'>${initials}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  // Confirm modal helper that returns a Promise<boolean>
  window.uiConfirm = function(message, title='Confirm'){
    return new Promise((resolve)=>{
      // create modal markup
      let modal = document.getElementById('uiConfirmModal');
      if(!modal){
        modal = document.createElement('div');
        modal.id = 'uiConfirmModal';
        modal.className = 'modal fade';
        modal.tabIndex = -1;
        modal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark text-light">
              <div class="modal-header border-0"><h5 class="modal-title">${title}</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button></div>
              <div class="modal-body">${message}</div>
              <div class="modal-footer border-0">
                <button type="button" class="btn btn-outline-light btn-sm" data-action="cancel">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" data-action="ok">OK</button>
              </div>
            </div>
          </div>`;
        document.body.appendChild(modal);
      } else {
        modal.querySelector('.modal-title').innerText = title;
        modal.querySelector('.modal-body').innerText = message;
      }
      const bs = new bootstrap.Modal(modal);
      modal.addEventListener('hidden.bs.modal', function onhide(){
        modal.removeEventListener('hidden.bs.modal', onhide);
        resolve(false);
      });
      modal.querySelector('[data-action="ok"]').onclick = ()=>{ bs.hide(); resolve(true); };
      modal.querySelector('[data-action="cancel"]').onclick = ()=>{ bs.hide(); resolve(false); };
      bs.show();
    });
  };
})();
