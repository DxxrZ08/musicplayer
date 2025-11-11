/* main.js — loads songs from IndexedDB, renders UI, plays audio, search, browse, library */

window.songsDB = []; // runtime array

/* Default sample songs - EMPTY (user uploads only) */
const DEFAULT_SAMPLES = [];

/* Local MP3 files from mp3/ folder - auto-loaded */
const LOCAL_MP3_SONGS = [
  {
    id: 'local-1',
    title: 'Pankhi Re',
    artist: 'aditya gadhvi',
    language: 'gujrati',
    genre: 'Folk',
    trending: true,
    audioUrl: 'mp3/Pankhi Re (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 'local-2',
    title: 'P-Pop Culture',
    artist: 'karan aujla',
    language: 'Punjabi',
    genre: 'Pop',
    trending: true,
    audioUrl: 'mp3/P-Pop Culture (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3558618/pexels-photo-3558618.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'local-3',
    title: 'Luv Ni Love Storys',
    artist: 'aditya gadhvi',
    language: 'gujrati',
    genre: 'Romance',
    trending: false,
    audioUrl: 'mp3/Luv Ni Love Storys (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: 'local-4',
    title: 'Khalasi',
    artist: 'aditya gadhvi',
    language: 'gujrati',
    genre: 'Classical',
    trending: true,
    audioUrl: 'mp3/Khalasi   Coke Studio Bharat (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3926881/pexels-photo-3926881.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
  },
  {
    id: 'local-5',
    title: 'Garbe Ghume',
    artist: 'aditya gadhvi',
    language: 'Gujarati',
    genre: 'Folk',
    trending: false,
    audioUrl: 'mp3/Garbe Ghume (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3762516/pexels-photo-3762516.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
  },
  {
    id: 'local-6',
    title: 'For A Reason',
    artist: 'karan aujla',
    language: 'English',
    genre: 'Pop',
    trending: false,
    audioUrl: 'mp3/For A Reason (PenduJatt.Com.Se).mp3',
    coverUrl: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: 'local-7',
    title: 'Deewaniyat',
    artist: 'Vishal Mishra',
    language: 'Hindi',
    genre: 'Romance',
    trending: true,
    audioUrl: 'mp3/Deewaniyat -vishal mishra.mp3',
    coverUrl: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
  },
  {
    id: 'local-8',
    title: 'Deewaniyat',
    artist: 'Unknown',
    language: 'Hindi',
    genre: 'Romance',
    trending: false,
    audioUrl: 'mp3/Deewaniyat.mp3',
    coverUrl: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
  },
  {
    id: 'local-9',
    title: 'Boyfriend',
    artist: 'karan aujla',
    language: 'English',
    genre: 'Pop',
    trending: true,
    audioUrl: 'mp3/Boyfriend.mp3',
    coverUrl: 'https://images.pexels.com/photos/3756622/pexels-photo-3756622.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'local-10',
    title: 'At Peace',
    artist: 'karan aujla',
    language: 'English',
    genre: 'Chill',
    trending: false,
    audioUrl: 'mp3/At Peace.mp3',
    coverUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString()
  },
  {
    id: 'local-11',
    title: 'Your Song Title',
    artist: 'Artist Name',
    language: 'Language',
    genre: 'Genre',
    trending: true,
    audioUrl: 'mp3/YourSongFile.mp3',
    coverUrl: 'https://images.pexels.com/photos/3756622/pexels-photo-3756622.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date().toISOString()
  }
];

// helper renderers
function createSongCard(song, idx){
  const col = document.createElement('div');
  col.className = 'col-6 col-sm-4 col-md-3';
  
  // Format creation date
  const createdDate = song.createdAt ? new Date(song.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A';
  
  col.innerHTML = `
    <div class="song-card p-2" data-idx="${idx}">
      <div class="play-overlay"><button class="play-btn" aria-label="Play">▶</button></div>
      <img src="${song.cover}" class="song-cover mb-2" alt="${song.title}">
      <div class="song-progress mt-2">
        <div class="song-progress-bar" style="width:0%"></div>
        <div class="song-progress-text">0%</div>
      </div>
      <div class="fw-semibold">${song.title}</div>
      <div class="text-sm text-slate-300"><a href="artist.html?artist=${encodeURIComponent(song.artist)}" class="text-slate-300 text-decoration-none" onclick="event.stopPropagation();">${song.artist}</a> • ${song.language}</div>
      <div class="text-xs text-slate-500 mt-1">Added: ${createdDate}</div>
      <button class="corner-play" aria-label="Play small">▶</button>
    </div>`;

  const card = col.querySelector('.song-card');
  // Play when clicking the card
  card.addEventListener('click', ()=> playIndex(idx));
  // Play when clicking the center overlay button
  const overlayBtn = card.querySelector('.play-btn');
  overlayBtn && overlayBtn.addEventListener('click', (ev)=>{ ev.stopPropagation(); playIndex(idx); });
  // Play when clicking the corner button (useful on small screens)
  const cornerBtn = card.querySelector('.corner-play');
  cornerBtn && cornerBtn.addEventListener('click', (ev)=>{ ev.stopPropagation(); playIndex(idx); });
  // Add-to-playlist button
  const addBtn = document.createElement('button');
  addBtn.className = 'corner-add';
  addBtn.setAttribute('aria-label','Add to playlist');
  addBtn.innerText = '+';
  card.appendChild(addBtn);
  addBtn.addEventListener('click', (ev)=>{ ev.stopPropagation(); openPlaylistDialog(song.id); });
  return col;
}

async function loadFromDB(){
  try {
    // Load LOCAL_MP3_SONGS from mp3/ folder
    let allSongs = [];
    if(Array.isArray(LOCAL_MP3_SONGS) && LOCAL_MP3_SONGS.length > 0){
      allSongs = LOCAL_MP3_SONGS.map(s => ({
        id: s.id,
        title: s.title,
        artist: s.artist,
        language: s.language,
        genre: s.genre,
        trending: !!s.trending,
        cover: s.coverUrl || `https://picsum.photos/seed/${encodeURIComponent(s.title)}/600/600`,
        audio: s.audioUrl,
        createdAt: s.createdAt,
        source: 'local'
      }));
    }
    
    // Load uploaded songs from IndexedDB (persisted across refreshes)
    try {
      const uploadedFromDB = await DBSTORE.listSongs(500);
      if(Array.isArray(uploadedFromDB) && uploadedFromDB.length > 0){
        const uploadedMapped = uploadedFromDB.map(s => {
          let audioUrl = '#';
          
          // Create blob URL if audioBlob exists
          if(s.audioBlob) {
            try {
              audioUrl = DBSTORE.blobToURL(s.audioBlob);
            } catch(e) {
              console.error('Failed to create blob URL for song', s.id, e);
              audioUrl = '#';
            }
          } else if(s.audioUrl) {
            audioUrl = s.audioUrl;
          }
          
          return {
            id: s.id,
            title: s.title,
            artist: s.artist,
            language: s.language,
            genre: s.genre,
            trending: !!s.trending,
            cover: s.coverUrl || `https://picsum.photos/seed/${encodeURIComponent(s.title)}/600/600`,
            audio: audioUrl,
            createdAt: s.createdAt,
            source: 'uploaded'
          };
        });
        allSongs = [...uploadedMapped, ...allSongs];
      }
    } catch(e) { console.warn('Failed to load uploaded songs from DB', e); }
    
    window.songsDB = allSongs;
  } catch (err) {
    console.error('Load error', err);
    window.songsDB = LOCAL_MP3_SONGS.map(s => ({ id: s.id, title: s.title, artist: s.artist, language: s.language, genre: s.genre, trending: s.trending, cover: s.coverUrl, audio: s.audioUrl, createdAt: s.createdAt, source: 'local' }));
  }
}

// UI population
// Populate home-specific sections (Made for you, New releases, Recently played)
function populateHomeSections(){
  // Made for you: a mix of trending and other songs
  const made = document.getElementById('madeForYouGrid');
  if(made){
    made.innerHTML = '';
    const picks = window.songsDB.slice(0,8);
    picks.forEach(s=>{ const idx = window.songsDB.findIndex(x=>x.id===s.id); made.appendChild(createSongCard(s, idx)); });
  }

  // New releases: newest by createdAt
  const newRel = document.getElementById('newReleasesGrid');
  if(newRel){
    newRel.innerHTML = '';
    const ordered = window.songsDB.slice().sort((a,b)=> (new Date(b.createdAt||0) - new Date(a.createdAt||0))).slice(0,8);
    ordered.forEach(s=>{ const idx = window.songsDB.findIndex(x=>x.id===s.id); newRel.appendChild(createSongCard(s, idx)); });
  }

  // Recently played: use a simple MRU stored in sessionStorage if present, otherwise show first few
  const rec = document.getElementById('recentlyPlayedList');
  if(rec){
    rec.innerHTML = '';
    let recentIds = [];
    try{ recentIds = JSON.parse(sessionStorage.getItem('recentlyPlayed')||'[]'); }catch(e){ recentIds = []; }
    const items = recentIds.length ? recentIds.map(id=> window.songsDB.find(s=>s.id===id)).filter(Boolean) : window.songsDB.slice(0,5);
    items.forEach(s=>{
      const el = document.createElement('button');
      el.className = 'list-group-item list-group-item-action bg-transparent d-flex align-items-center gap-3';
      el.innerHTML = `<img src="${s.cover}" width="56" height="56" class="rounded"> <div class="flex-grow-1 text-start"><div class="fw-semibold">${s.title}</div><div class="small text-slate-400">${s.artist}</div></div>`;
      el.addEventListener('click', ()=>{ const idx = window.songsDB.findIndex(x=>x.id===s.id); if(idx>=0) playIndex(idx); });
      rec.appendChild(el);
    });
  }
}

function populateFilters(){
  const artistSel = document.querySelectorAll('#filterArtist');
  const langSel = document.querySelectorAll('#filterLang');
  const genSel = document.querySelectorAll('#filterGenre');
  const artists = Array.from(new Set(window.songsDB.map(s=>s.artist))).sort();
  const langs = Array.from(new Set(window.songsDB.map(s=>s.language)));
  const genres = Array.from(new Set(window.songsDB.map(s=>s.genre)));
  
  artistSel.forEach(sel => { 
    if(!sel) return; 
    sel.innerHTML = `<option value="All">All Artists</option>` + artists.map(a=>`<option>${a}</option>`).join(''); 
    sel.addEventListener('change', populateBrowse); 
  });
  
  langSel.forEach(sel => { 
    if(!sel) return; 
    sel.innerHTML = `<option value="All">All Languages</option>` + langs.map(l=>`<option>${l}</option>`).join(''); 
    sel.addEventListener('change', populateBrowse); 
  });
  
  genSel.forEach(sel => { 
    if(!sel) return; 
    sel.innerHTML = `<option value="All">All Genres</option>` + genres.map(g=>`<option>${g}</option>`).join(''); 
    sel.addEventListener('change', populateBrowse); 
  });
}

function populateBrowse(){
  const grid = document.getElementById('browseGrid');
  if(!grid) return;
  const artist = document.getElementById('filterArtist')?.value || 'All';
  const lang = document.getElementById('filterLang')?.value || 'All';
  const gen = document.getElementById('filterGenre')?.value || 'All';
  grid.innerHTML = '';
  window.songsDB.filter(s => (artist==='All' || s.artist===artist) && (lang==='All' || s.language===lang) && (gen==='All' || s.genre===gen)).forEach(s=>{
    const idx = window.songsDB.findIndex(x=>x.id===s.id);
    grid.appendChild(createSongCard(s, idx));
  });
}

function populateLibrary(){
  const grid = document.getElementById('libraryGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const saved = window.songsDB.slice(0,8);
  saved.forEach((s,i)=> grid.appendChild(createSongCard(s, i)));
  const savedCount = document.getElementById('savedCount');
  if(savedCount) savedCount.innerText = `Saved: ${saved.length}`;
}

// search
let searchTimer = null;
document.addEventListener('input', (e)=>{
  if(e.target && e.target.id === 'searchInput'){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(()=> runSearch(e.target.value), 250);
  }
});
function runSearch(q){
  const out = document.getElementById('searchResults');
  if(!out) return;
  out.innerHTML = '';
  if(!q || !q.trim()) return;
  const v = q.trim().toLowerCase();
  const matched = window.songsDB.filter(s=> s.title.toLowerCase().includes(v) || s.artist.toLowerCase().includes(v) || s.language.toLowerCase().includes(v));
  if(matched.length === 0){ out.innerHTML = `<div class="col-12 text-center text-slate-400">No results</div>`; return; }
  matched.forEach(s=>{
    const idx = window.songsDB.findIndex(x=>x.id===s.id);
    out.appendChild(createSongCard(s, idx));
  });
}

// player - GLOBAL and PERSISTENT across pages
if(!window.globalAudio) window.globalAudio = new Audio();
window.globalAudio.preload = 'metadata';
let currentIndex = -1;

function setPlayerUI(s){
  document.getElementById('playerCover') && (document.getElementById('playerCover').src = s.cover);
  document.getElementById('playerTitle') && (document.getElementById('playerTitle').innerText = s.title);
  document.getElementById('playerArtist') && (document.getElementById('playerArtist').innerText = s.artist);
}

function playIndex(i){
  const s = window.songsDB[i];
  if(!s) return;
  currentIndex = i;
  setPlayerUI(s);
  // record recently played and update UI
  if (s && s.id) { try { pushRecentlyPlayed(s.id); populateHomeSections(); } catch(e){} }
  if(s.audio && s.audio !== '#'){ 
    window.globalAudio.src = s.audio; 
    window.globalAudio.play().catch(()=>{});
    // Save current playing state to localStorage (persists across page refreshes)
    try { 
      localStorage.setItem('__playerState', JSON.stringify({ songId: s.id, currentTime: 0 }));
      localStorage.setItem('__playerWasPlaying', 'true');
    } catch(e){}
  } else { 
    window.globalAudio.src = ''; 
  }
  document.getElementById('btnPlay') && (document.getElementById('btnPlay').innerText = '⏸');
  // ensure card progress gets updated immediately
  updateCardProgress();
}

// Restore player state on page load
function restorePlayerState(){
  try {
    const state = JSON.parse(localStorage.getItem('__playerState') || '{}');
    if(state.songId && window.songsDB && window.songsDB.length > 0){
      const idx = window.songsDB.findIndex(s => s.id === state.songId);
      if(idx >= 0){
        // Restore UI and current time
        const s = window.songsDB[idx];
        currentIndex = idx;
        setPlayerUI(s);
        if(s.audio && s.audio !== '#'){
          window.globalAudio.src = s.audio;
          window.globalAudio.currentTime = state.currentTime || 0;
          // Auto-resume if was playing before refresh
          const wasPlaying = localStorage.getItem('__playerWasPlaying') === 'true';
          if(wasPlaying){
            window.globalAudio.play().catch(()=>{});
            document.getElementById('btnPlay') && (document.getElementById('btnPlay').innerText = '⏸');
          }
        }
      }
    }
  } catch(e){ console.warn('Failed to restore player state', e); }
}

// Save player state every 500ms to localStorage (persists across refresh)
setInterval(()=>{
  try {
    if(currentIndex >= 0 && window.songsDB[currentIndex]){
      const s = window.songsDB[currentIndex];
      const isPlaying = !window.globalAudio.paused;
      localStorage.setItem('__playerState', JSON.stringify({ 
        songId: s.id, 
        currentTime: window.globalAudio.currentTime 
      }));
      localStorage.setItem('__playerWasPlaying', isPlaying ? 'true' : 'false');
    }
  } catch(e){}
}, 500);

// When a track plays, record it into recentlyPlayed MRU list (sessionStorage)
function pushRecentlyPlayed(id){
  try{
    const key = 'recentlyPlayed';
    let arr = JSON.parse(sessionStorage.getItem(key) || '[]');
    // remove existing
    arr = arr.filter(x=>x!==id);
    arr.unshift(id);
    if(arr.length>50) arr = arr.slice(0,50);
    sessionStorage.setItem(key, JSON.stringify(arr));
  }catch(e){ console.warn('recentlyPlayed error', e); }
}

// Playlist management (localStorage under mb_playlists)
function loadPlaylists(){
  try{ return JSON.parse(localStorage.getItem('mb_playlists')||'[]'); }catch(e){ return []; }
}
function savePlaylists(pls){ localStorage.setItem('mb_playlists', JSON.stringify(pls)); }
function renderPlaylistSelect(sel){
  const pls = loadPlaylists();
  if(!sel) return;
  sel.innerHTML = '';
  if(pls.length===0){ sel.innerHTML = '<option value="">(no playlists)</option>'; return; }
  pls.forEach(p=> sel.insertAdjacentHTML('beforeend', `<option value="${p.id}">${p.name} (${p.tracks?.length||0})</option>`));
}

let __playlistPendingSong = null;
let __playlistCreateMode = false; // Track which mode we're in

function openPlaylistDialog(songId){
  __playlistPendingSong = songId;
  __playlistCreateMode = false;
  
  // Show "Add to playlist" mode
  document.getElementById('playlistAddMode').style.display = 'block';
  document.getElementById('playlistCreateMode').style.display = 'none';
  document.getElementById('addToPlaylistBtn').style.display = 'inline-block';
  document.getElementById('createPlaylistWithSongsBtn').style.display = 'none';
  document.getElementById('playlistModalTitle').innerText = 'Add to playlist';
  
  const sel = document.getElementById('playlistSelect');
  renderPlaylistSelect(sel);
  const modalEl = document.getElementById('playlistModal');
  if(!modalEl){ uiToast('Playlist modal not found', {type:'danger'}); return; }
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// New function to open "Create playlist with songs" dialog
function openCreatePlaylistDialog(){
  __playlistCreateMode = true;
  __playlistPendingSong = null;
  
  // Show "Create playlist" mode
  document.getElementById('playlistAddMode').style.display = 'none';
  document.getElementById('playlistCreateMode').style.display = 'block';
  document.getElementById('addToPlaylistBtn').style.display = 'none';
  document.getElementById('createPlaylistWithSongsBtn').style.display = 'inline-block';
  document.getElementById('playlistModalTitle').innerText = 'Create Playlist';
  
  // Populate song checklist
  const container = document.getElementById('songChecklistContainer');
  container.innerHTML = '';
  window.songsDB.forEach(song => {
    const label = document.createElement('label');
    label.className = 'd-flex align-items-center gap-2 p-2 cursor-pointer';
    label.style.cursor = 'pointer';
    label.innerHTML = `
      <input type="checkbox" class="song-checkbox" value="${song.id}" style="cursor:pointer;">
      <div style="flex:1;">
        <div class="small fw-semibold">${song.title}</div>
        <div class="text-xs text-slate-400">${song.artist}</div>
      </div>
    `;
    container.appendChild(label);
  });
  
  document.getElementById('createPlaylistNameInput').value = '';
  
  const modalEl = document.getElementById('playlistModal');
  if(!modalEl){ uiToast('Playlist modal not found', {type:'danger'}); return; }
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

document.getElementById('createPlaylistBtn')?.addEventListener('click', ()=>{
  const name = (document.getElementById('newPlaylistName')?.value||'').trim();
  if(!name) return uiToast('Enter a playlist name', {type:'warning'});
  const pls = loadPlaylists();
  const id = DBSTORE && DBSTORE.uid ? DBSTORE.uid() : ('pl_' + Date.now());
  const entry = { id, name, tracks: [] };
  pls.push(entry); savePlaylists(pls);
  renderPlaylistSelect(document.getElementById('playlistSelect'));
  document.getElementById('newPlaylistName').value = '';
  uiToast('Playlist created', {type:'success'});
});

document.getElementById('createPlaylistWithSongsBtn')?.addEventListener('click', ()=>{
  const name = (document.getElementById('createPlaylistNameInput')?.value||'').trim();
  if(!name) return uiToast('Enter a playlist name', {type:'warning'});
  
  // Get selected songs
  const checkboxes = document.querySelectorAll('.song-checkbox:checked');
  const selectedSongIds = Array.from(checkboxes).map(cb => cb.value);
  
  // Create playlist with selected songs
  const pls = loadPlaylists();
  const id = DBSTORE && DBSTORE.uid ? DBSTORE.uid() : ('pl_' + Date.now());
  const entry = { id, name, tracks: selectedSongIds };
  pls.push(entry);
  savePlaylists(pls);
  
  // Hide modal and show success
  const modalEl = document.getElementById('playlistModal');
  try{ bootstrap.Modal.getInstance(modalEl).hide(); }catch(e){}
  uiToast(`Playlist "${name}" created with ${selectedSongIds.length} song(s)`, {type:'success'});
  
  // Refresh playlist display if on playlist page
  if(window.renderPlaylistsPage) renderPlaylistsPage();
});

document.getElementById('addToPlaylistBtn')?.addEventListener('click', ()=>{
  const sel = document.getElementById('playlistSelect');
  const chosen = sel?.value;
  if(!chosen) return uiToast('Select a playlist or create one first', {type:'warning'});
  const pls = loadPlaylists();
  const p = pls.find(x=>x.id===chosen);
  if(!p) return uiToast('Playlist not found', {type:'danger'});
  if(!__playlistPendingSong) return uiToast('No song selected', {type:'warning'});
  // prevent duplicates
  p.tracks = p.tracks || [];
  if(!p.tracks.includes(__playlistPendingSong)) p.tracks.push(__playlistPendingSong);
  savePlaylists(pls);
  // hide modal
  const modalEl = document.getElementById('playlistModal');
  try{ bootstrap.Modal.getInstance(modalEl).hide(); }catch(e){}
  uiToast('Added to playlist', {type:'success'});
  __playlistPendingSong = null;
});

document.getElementById('btnPlay')?.addEventListener('click', ()=> { 
  if(!window.globalAudio.src) return; 
  if(window.globalAudio.paused) { 
    window.globalAudio.play(); 
    document.getElementById('btnPlay').innerText='⏸'; 
  } else { 
    window.globalAudio.pause(); 
    document.getElementById('btnPlay').innerText='▶'; 
  }
});
document.getElementById('btnPrev')?.addEventListener('click', ()=> { if(currentIndex>0) playIndex(currentIndex-1); });
document.getElementById('btnNext')?.addEventListener('click', ()=> { if(currentIndex < window.songsDB.length-1) playIndex(currentIndex+1); });

window.globalAudio.addEventListener('timeupdate', ()=> {
  const seek = document.getElementById('seek');
  if(seek && window.globalAudio.duration){ 
    seek.value = (window.globalAudio.currentTime / window.globalAudio.duration) * 100; 
    document.getElementById('time').innerText = `${formatTime(window.globalAudio.currentTime)} / ${formatTime(window.globalAudio.duration)}`; 
  }
  // update per-card visual progress bars
  updateCardProgress();
});

window.globalAudio.addEventListener('ended', ()=>{
  document.getElementById('btnPlay') && (document.getElementById('btnPlay').innerText='▶');
  // mark progress as complete for current card then clear after short delay
  updateCardProgress(true);
  setTimeout(()=> updateCardProgress(false,true), 500);
  
  // Auto-play next song
  if(currentIndex < window.songsDB.length - 1){
    // Play next song
    playIndex(currentIndex + 1);
  } else {
    // If last song, stop (or you can loop back to first song)
    // Uncomment below to loop back to first song:
    // playIndex(0);
  }
});

// Update progress bar on the currently playing song card(s)
function updateCardProgress(markComplete=false, reset=false){
  try{
    const cards = document.querySelectorAll('.song-card');
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-idx'));
      const bar = card.querySelector('.song-progress-bar');
      if(!bar) return;
      if(reset){ bar.style.width = '0%'; return; }
      if(markComplete && idx === currentIndex){ bar.style.width = '100%'; return; }
      if(idx === currentIndex && window.globalAudio.duration){ 
        const pct = (window.globalAudio.currentTime / window.globalAudio.duration) * 100; 
        bar.style.width = pct + '%'; 
        const txt = card.querySelector('.song-progress-text'); 
        if(txt) txt.innerText = Math.floor(pct) + '%'; 
      }
      else { if(!markComplete) { bar.style.width = '0%'; const txt = card.querySelector('.song-progress-text'); if(txt) txt.innerText = '0%'; } }
    });
  }catch(e){ /* ignore DOM timing issues */ }
}

document.getElementById('seek')?.addEventListener('input', ()=> { 
  if(window.globalAudio.duration) window.globalAudio.currentTime = (document.getElementById('seek').value/100) * window.globalAudio.duration; 
});
function formatTime(s){ if(!s || isNaN(s)) return '0:00'; const m = Math.floor(s/60); const sec = Math.floor(s%60).toString().padStart(2,'0'); return `${m}:${sec}`; }

// admin/manage population
async function populateManage(){
  const list = document.getElementById('manageList');
  if(!list) return;
  list.innerHTML = '';
  window.songsDB.forEach(s=>{
    const createdDate = s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
    const it = document.createElement('div');
    it.className = 'list-group-item d-flex justify-content-between align-items-center bg-transparent';
    it.innerHTML = `<div class="d-flex gap-3 align-items-center flex-grow-1"><img src="${s.cover}" width="56" height="56" class="rounded"><div><div class="fw-semibold">${s.title}</div><div class="small text-slate-400">${s.artist} • ${s.language}</div><div class="text-xs text-slate-500 mt-1">Added: ${createdDate}</div></div></div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-primary" onclick="openEdit('${s.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="handleDelete('${s.id}')">Delete</button>
      </div>`;
    list.appendChild(it);
  });
  const total = document.getElementById('statTotal'); if(total) total.innerText = window.songsDB.length;
  const trending = document.getElementById('statTrending'); if(trending) trending.innerText = window.songsDB.filter(s=>s.trending).length;
  const recent = document.getElementById('recentUploads'); if(recent){ recent.innerHTML=''; window.songsDB.slice(0,8).forEach(s=> { const createdDate = s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'; const el = document.createElement('div'); el.className='list-group-item bg-transparent d-flex justify-content-between'; el.innerHTML = `<div class="d-flex gap-2 align-items-center"><img src="${s.cover}" width="48" height="48" class="rounded"><div><div class="fw-semibold">${s.title}</div><div class="small text-slate-400">${s.artist}</div></div></div><div class="small text-slate-400">${createdDate}</div>`; recent.appendChild(el); }); }
}

// open edit modal
function openEdit(id){
  const s = window.songsDB.find(x=>x.id===id);
  if(!s) return uiToast('Not found', {type:'danger'});
  document.getElementById('editSongId').value = s.id;
  document.getElementById('editTitle').value = s.title;
  document.getElementById('editArtist').value = s.artist;
  document.getElementById('editLang').value = s.language;
  document.getElementById('editGenre').value = s.genre;
  document.getElementById('editTrending').value = s.trending ? 'true' : 'false';
  const modal = new bootstrap.Modal(document.getElementById('editModal'));
  modal.show();
}

// handle edit submit
document.getElementById('editForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('editSongId').value;
  const title = document.getElementById('editTitle').value.trim();
  const artist = document.getElementById('editArtist').value.trim();
  const language = document.getElementById('editLang').value.trim();
  const genre = document.getElementById('editGenre').value.trim();
  const trending = document.getElementById('editTrending').value === 'true';
  
  try{
    // If it's an uploaded song, update in IndexedDB
    if(id.startsWith('upload-')) {
      const entry = await DBSTORE.getSong(id);
      if(!entry) return uiToast('Song not found', {type:'danger'});
      
      entry.title = title;
      entry.artist = artist;
      entry.language = language;
      entry.genre = genre;
      entry.trending = trending;
      
      await DBSTORE.putSong(entry);
      
      // Also update localStorage metadata
      let uploadedMetadata = JSON.parse(localStorage.getItem('musicstream_uploads') || '[]');
      const idx = uploadedMetadata.findIndex(s => s.id === id);
      if(idx !== -1) {
        uploadedMetadata[idx].title = title;
        uploadedMetadata[idx].artist = artist;
        uploadedMetadata[idx].language = language;
        uploadedMetadata[idx].genre = genre;
        uploadedMetadata[idx].trending = trending;
        localStorage.setItem('musicstream_uploads', JSON.stringify(uploadedMetadata));
      }
    } else {
      // Local mp3 songs can't be edited
      uiToast('Cannot edit songs from mp3 folder', {type:'warning'});
      return;
    }
    
    await loadFromDB(); 
    populateBrowse(); 
    populateManage(); 
    populateLibrary();
    populateFilters();
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    uiToast('Song updated! All users will see the changes.', {type:'success'});
  }catch(err){ console.error(err); uiToast('Update failed', {type:'danger'}); }
});

// delete
async function handleDelete(id){
  const ok = await uiConfirm('Delete this song?');
  if(!ok) return;
  try{ 
    // If it's an uploaded song (starts with 'upload-'), delete from IndexedDB
    if(id.startsWith('upload-')) {
      await DBSTORE.deleteSong(id);
      // Also remove from localStorage metadata
      let uploadedMetadata = JSON.parse(localStorage.getItem('musicstream_uploads') || '[]');
      uploadedMetadata = uploadedMetadata.filter(s => s.id !== id);
      localStorage.setItem('musicstream_uploads', JSON.stringify(uploadedMetadata));
    } else {
      // Local mp3 songs can't be deleted (they're from mp3 folder)
      uiToast('Cannot delete songs from mp3 folder', {type:'warning'});
      return;
    }
    
    await loadFromDB(); 
    populateBrowse(); 
    populateManage(); 
    populateLibrary(); 
    populateFilters();
    uiToast('Song deleted', {type:'success'}); 
  }catch(e){ 
    console.error(e); 
    uiToast('Delete failed', {type:'danger'}); 
  }
}
// upload (admin/upload.html)
// Upload handler - saves to IndexedDB + localStorage metadata so all users see it
document.getElementById('uploadForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const title = document.getElementById('upTitle').value.trim();
  const artist = document.getElementById('upArtist').value.trim();
  const language = document.getElementById('upLang').value;
  const genre = document.getElementById('upGenre').value || 'Unknown';
  const trending = document.getElementById('upTrending').value === 'true';
  
  if(!title || !artist || !language) {
    uiToast('Title, artist, language are required', {type:'warning'});
    return;
  }
  
  const audioFile = document.getElementById('upAudio')?.files?.[0];
  const coverFile = document.getElementById('upCoverFile')?.files?.[0];
  
  if(!audioFile) {
    uiToast('Select an audio file', {type:'warning'});
    return;
  }
  
  // Check file size - max 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  if(audioFile.size > MAX_FILE_SIZE) {
    const fileSizeMB = (audioFile.size / (1024 * 1024)).toFixed(2);
    uiToast(`File is too large (${fileSizeMB}MB). Max 10MB allowed.`, {type:'danger'});
    return;
  }
  
  try {
    // Create song entry with metadata
    const id = 'upload-' + Date.now();
    const createdAt = new Date().toISOString();
    
    // Get cover URL or file
    let coverUrl = document.getElementById('upCover')?.value?.trim();
    if(!coverUrl) {
      coverUrl = `https://picsum.photos/seed/${encodeURIComponent(title)}/600/600`;
    }
    
    // Create metadata object to save in localStorage
    const metadata = { 
      id, 
      title, 
      artist, 
      language, 
      genre, 
      trending,
      coverUrl,
      createdAt,
      hasAudio: true
    };
    
    // Save audio file to IndexedDB with the blob
    const dbEntry = {
      id,
      title,
      artist,
      language,
      genre,
      trending,
      coverUrl,
      audioBlob: audioFile,
      createdAt
    };
    
    // Check if DBSTORE is available
    if(!DBSTORE || !DBSTORE.putSong) {
      uiToast('Database not ready. Please refresh and try again.', {type:'danger'});
      return;
    }
    
    // Save to IndexedDB
    await DBSTORE.putSong(dbEntry);
    
    // Save metadata to localStorage for quick lookup
    let uploadedMetadata = [];
    try {
      uploadedMetadata = JSON.parse(localStorage.getItem('musicstream_uploads') || '[]');
    } catch(e) { uploadedMetadata = []; }
    
    uploadedMetadata.push(metadata);
    localStorage.setItem('musicstream_uploads', JSON.stringify(uploadedMetadata));
    
    // Reload UI
    await loadFromDB(); 
    populateBrowse();
    populateLibrary();
    populateManage();
    populateFilters();
    
    uiToast('Song uploaded successfully! All users will see it.', {type:'success'});
    e.target.reset();
    
    // Redirect to manage page
    setTimeout(()=>{ window.location.href = 'admin-manage.html'; }, 1000);
  } catch(err) { 
    console.error('Upload error:', err); 
    uiToast('Upload failed: ' + (err.message || err), {type:'danger'}); 
  }
});


// init
document.addEventListener('DOMContentLoaded', async ()=>{
  await loadFromDB();
  populateFilters();
  populateBrowse();
  populateLibrary();
  populateManage();
  populateHomeSections();
  renderPlaylistsPage();
  
  // Restore player state (song, position, play/pause)
  restorePlayerState();
  
  // Setup export/import handlers
  setupExportImport();
});

// Export/Import functionality
function setupExportImport(){
  // Export button
  document.getElementById('exportBtn')?.addEventListener('click', async ()=>{
    try {
      const uploadedMetadata = JSON.parse(localStorage.getItem('musicstream_uploads') || '[]');
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        songs: uploadedMetadata
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'musicstream_backup_' + new Date().getTime() + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      uiToast('Library exported successfully!', {type:'success'});
    } catch(e) {
      console.error(e);
      uiToast('Export failed', {type:'danger'});
    }
  });
  
  // Import button
  document.getElementById('importBtn')?.addEventListener('click', ()=>{
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      
      try {
        const text = await file.text();
        const importData = JSON.parse(text);
        const importedSongs = importData.songs || [];
        
        if(importedSongs.length === 0) {
          uiToast('No songs found in backup file', {type:'warning'});
          return;
        }
        
        const ok = await uiConfirm(`Import ${importedSongs.length} songs from backup?\nThey will be added to your library.`);
        if(!ok) return;
        
        // Load existing uploads
        let currentUploads = JSON.parse(localStorage.getItem('musicstream_uploads') || '[]');
        
        // Add imported songs (avoid duplicates by ID)
        let addedCount = 0;
        for(const song of importedSongs) {
          const exists = currentUploads.find(s => s.id === song.id);
          if(!exists) {
            currentUploads.push(song);
            addedCount++;
          }
        }
        
        // Save back to localStorage
        localStorage.setItem('musicstream_uploads', JSON.stringify(currentUploads));
        
        // Reload UI
        await loadFromDB();
        populateBrowse();
        populateManage();
        populateLibrary();
        populateFilters();
        
        uiToast(`Imported ${addedCount} new songs!`, {type:'success'});
      } catch(err) {
        console.error(err);
        uiToast('Import failed - invalid file format', {type:'danger'});
      }
    };
    input.click();
  });
}

// Handle "Create with Songs" button on playlist page
document.getElementById('createPlaylistWithSongsModalBtn')?.addEventListener('click', ()=>{
  openCreatePlaylistDialog();
});

// Render playlists page (cards) if container exists
function renderPlaylistsPage(){
  const row = document.getElementById('playlistsRow');
  if(!row) return;
  row.innerHTML = '';
  const pls = loadPlaylists();
  if(pls.length === 0){
    row.innerHTML = '<div class="col-12 text-slate-400">No playlists yet. Create one above.</div>';
    return;
  }
  pls.forEach(p => {
    const col = document.createElement('div'); col.className = 'col-12 col-md-6 col-lg-4';
    const tracksCount = (p.tracks && p.tracks.length) || 0;
    col.innerHTML = `<div class="card glass p-3">
      <div class="d-flex align-items-center">
        <div class="fw-semibold">${p.name}</div>
        <div class="small muted ms-2">${tracksCount} tracks</div>
      </div>
      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-sm btn-primary btn-open-playlist" data-id="${p.id}">Open</button>
        <button class="btn btn-sm btn-outline-light btn-play-first" data-id="${p.id}">Play</button>
        <button class="btn btn-sm btn-danger btn-delete-playlist ms-auto" data-id="${p.id}">Delete</button>
      </div>
    </div>`;
    row.appendChild(col);
  });

  // attach handlers
  row.querySelectorAll('.btn-open-playlist').forEach(btn=> btn.addEventListener('click', (e)=> openPlaylistView(e.target.dataset.id)));
  row.querySelectorAll('.btn-play-first').forEach(btn=> btn.addEventListener('click', (e)=>{
    const id = e.target.dataset.id; const p = loadPlaylists().find(x=>x.id===id); if(!p || !p.tracks || p.tracks.length===0){ uiToast('No tracks', {type:'warning'}); return; }
    const songId = p.tracks[0]; const idx = window.songsDB.findIndex(s=>s.id===songId); if(idx>=0) playIndex(idx); else uiToast('Track not available', {type:'warning'});
  }));
  row.querySelectorAll('.btn-delete-playlist').forEach(btn=> btn.addEventListener('click', async (e)=>{
    const id = e.target.dataset.id; const ok = await uiConfirm('Delete playlist?'); if(!ok) return; const pls = loadPlaylists().filter(x=>x.id!==id); savePlaylists(pls); renderPlaylistsPage();
  }));
}

// Open playlist modal and populate tracks
function openPlaylistView(id){
  const pls = loadPlaylists(); const p = pls.find(x=>x.id===id); if(!p) return uiToast('Playlist not found', {type:'danger'});
  document.getElementById('playlistViewTitle').innerText = p.name;
  document.getElementById('playlistRenameInput').value = p.name;
  const list = document.getElementById('playlistTrackList'); list.innerHTML = '';
  (p.tracks||[]).forEach(trackId=>{
    const s = window.songsDB.find(x=>x.id===trackId);
    const it = document.createElement('div'); it.className = 'list-group-item bg-transparent d-flex align-items-center justify-content-between';
    if(s){
      it.innerHTML = `<div class="d-flex gap-3 align-items-center"><img src="${s.cover}" width="56" height="56" class="rounded"><div><div class="fw-semibold">${s.title}</div><div class="small text-slate-400">${s.artist}</div></div></div>
        <div class="d-flex gap-2"><button class="btn btn-sm btn-light btn-play-track">Play</button><button class="btn btn-sm btn-outline-danger btn-remove-track">Remove</button></div>`;
      const playBtn = it.querySelector('.btn-play-track'); playBtn.addEventListener('click', ()=>{ const idx = window.songsDB.findIndex(x=>x.id===s.id); if(idx>=0) playIndex(idx); });
      const remBtn = it.querySelector('.btn-remove-track'); remBtn.addEventListener('click', async ()=>{ const ok = await uiConfirm('Remove from playlist?'); if(!ok) return; p.tracks = p.tracks.filter(t=>t!==trackId); savePlaylists(pls); openPlaylistView(id); renderPlaylistsPage(); });
    } else {
      it.innerHTML = `<div class="fw-semibold">(track not available)</div><div><button class="btn btn-sm btn-outline-danger btn-remove-track">Remove</button></div>`;
      it.querySelector('.btn-remove-track').addEventListener('click', async ()=>{ const ok = await uiConfirm('Remove missing track?'); if(!ok) return; p.tracks = p.tracks.filter(t=>t!==trackId); savePlaylists(pls); openPlaylistView(id); renderPlaylistsPage(); });
    }
    list.appendChild(it);
  });

  // rename handler
  const renameBtn = document.getElementById('playlistRenameBtn');
  renameBtn.onclick = ()=>{
    const newName = (document.getElementById('playlistRenameInput').value||'').trim(); if(!newName) return uiToast('Enter name', {type:'warning'}); p.name = newName; savePlaylists(pls); renderPlaylistsPage(); document.getElementById('playlistViewTitle').innerText = newName; uiToast('Renamed', {type:'success'});
  };

  // delete handler
  const delBtn = document.getElementById('playlistDeleteBtn');
  delBtn.onclick = async ()=>{ const ok = await uiConfirm('Delete playlist?'); if(!ok) return; const remaining = loadPlaylists().filter(x=>x.id!==id); savePlaylists(remaining); try{ bootstrap.Modal.getInstance(document.getElementById('playlistViewModal')).hide(); }catch(e){} renderPlaylistsPage(); };

  const modal = new bootstrap.Modal(document.getElementById('playlistViewModal'));
  modal.show();
}

/* ====== REAL-TIME USER TRACKING ====== */
// Track active users for admin dashboard
function setupUserTracking(){
  try {
    // Get or create a unique session ID for this user
    let sessionId = sessionStorage.getItem('sessionId');
    if(!sessionId){
      sessionId = 'user-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
      sessionStorage.setItem('sessionId', sessionId);
    }

    // Get current user info
    let currentUser = null;
    try {
      const userStr = sessionStorage.getItem('userLoggedIn');
      if(userStr) currentUser = JSON.parse(userStr);
    } catch(e) {}

    // Update active users list in localStorage
    const updateActiveUsers = ()=>{
      try {
        const key = 'activeUsers';
        let users = JSON.parse(localStorage.getItem(key) || '[]');
        
        // Remove this session if it exists
        users = users.filter(u => u.sessionId !== sessionId);
        
        // Add current user with timestamp
        users.push({
          sessionId: sessionId,
          email: currentUser?.email || 'Anonymous',
          name: currentUser?.name || 'Guest',
          lastSeen: new Date().toISOString(),
          page: window.location.pathname.split('/').pop() || 'index.html'
        });
        
        // Keep only last 100 sessions (clean up old ones)
        users = users.slice(-100);
        
        // Remove entries older than 5 minutes (session timeout)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        users = users.filter(u => u.lastSeen > fiveMinutesAgo);
        
        localStorage.setItem(key, JSON.stringify(users));
      } catch(e) {
        console.warn('Failed to update active users', e);
      }
    };

    // Update on page load
    updateActiveUsers();

    // Update every 30 seconds
    setInterval(updateActiveUsers, 30000);

    // Update on visibility change (when user comes back to tab)
    document.addEventListener('visibilitychange', ()=>{
      if(!document.hidden) updateActiveUsers();
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', ()=>{
      try {
        const key = 'activeUsers';
        let users = JSON.parse(localStorage.getItem(key) || '[]');
        users = users.filter(u => u.sessionId !== sessionId);
        localStorage.setItem(key, JSON.stringify(users));
      } catch(e) {}
    });
  } catch(e) {
    console.warn('Failed to setup user tracking', e);
  }
}

// Get active users for admin dashboard
window.getActiveUsers = function(){
  try {
    let users = JSON.parse(localStorage.getItem('activeUsers') || '[]');
    // Filter out sessions older than 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    users = users.filter(u => u.lastSeen > fiveMinutesAgo);
    return users;
  } catch(e) {
    return [];
  }
};

// Refresh active users display (for real-time updates)
window.refreshActiveUsers = function(){
  const usersList = document.getElementById('activeUsersList');
  if(!usersList) return;
  
  const users = window.getActiveUsers();
  
  if(users.length === 0){
    usersList.innerHTML = '<div class="text-muted text-center py-3">No active users</div>';
    return;
  }

  usersList.innerHTML = users.map((user, idx) => {
    const lastSeenTime = new Date(user.lastSeen);
    const minutesAgo = Math.floor((Date.now() - lastSeenTime) / 60000);
    const timeStr = minutesAgo === 0 ? 'just now' : minutesAgo + 'm ago';
    
    return `
      <div class="list-group-item bg-transparent d-flex justify-content-between align-items-center">
        <div>
          <div class="fw-semibold">${user.name || user.email}</div>
          <div class="small text-slate-400">
            <span class="badge bg-success" style="font-size:0.7rem;">● Online</span>
            <span class="text-muted ms-2">${user.page || 'index.html'} • ${timeStr}</span>
          </div>
        </div>
        <div>
          <small class="text-slate-400">${user.email}</small>
        </div>
      </div>
    `;
  }).join('');
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', ()=>{
  setupUserTracking();
  // Auto-refresh active users display every 3 seconds if on admin users page
  if(window.location.pathname.includes('admin-users.html')){
    setInterval(()=>{ window.refreshActiveUsers(); }, 3000);
  }
});

