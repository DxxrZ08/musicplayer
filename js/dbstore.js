// dbstore.js — small IndexedDB wrapper for songs
(function(global){
  const DB_NAME = 'musicstream_db';
  const DB_VERSION = 1;
  const STORE = 'songs';

  function openDB(){
    return new Promise((resolve,reject)=>{
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e)=> {
        const db = e.target.result;
        if(!db.objectStoreNames.contains(STORE)){
          const os = db.createObjectStore(STORE, { keyPath: 'id' });
          os.createIndex('createdAt','createdAt',{unique:false});
        }
      };
      req.onsuccess = ()=> resolve(req.result);
      req.onerror = ()=> reject(req.error);
    });
  }

  async function putSong(song){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const tx = db.transaction(STORE,'readwrite');
      const os = tx.objectStore(STORE);
      const r = os.put(song);
      r.onsuccess = ()=> resolve(song);
      r.onerror = ()=> reject(r.error);
    });
  }

  async function getSong(id){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const r = db.transaction(STORE,'readonly').objectStore(STORE).get(id);
      r.onsuccess = ()=> resolve(r.result);
      r.onerror = ()=> reject(r.error);
    });
  }

  async function deleteSong(id){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const r = db.transaction(STORE,'readwrite').objectStore(STORE).delete(id);
      r.onsuccess = ()=> resolve(true);
      r.onerror = ()=> reject(r.error);
    });
  }

  async function listSongs(limit=500){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
      const items = [];
      const tx = db.transaction(STORE,'readonly');
      const os = tx.objectStore(STORE);
      const req = os.openCursor(null,'prev');
      req.onsuccess = (e)=> {
        const cur = e.target.result;
        if(cur && items.length < limit){ items.push(cur.value); cur.continue(); } else resolve(items);
      };
      req.onerror = ()=> reject(req.error);
    });
  }

  function blobToURL(blob){
    if(!blob) return null;
    return URL.createObjectURL(blob);
  }

  function uid(){ return 'id-' + Math.random().toString(36).slice(2,11); }

  global.DBSTORE = { putSong, getSong, deleteSong, listSongs, blobToURL, uid };
})(window);
