(()=>{
  const root=document.documentElement;
  document.addEventListener('pointerdown',()=>{root.dataset.detailInput='pointer'},true);
  document.addEventListener('keydown',e=>{if(!e.metaKey&&!e.ctrlKey&&!e.altKey)root.dataset.detailInput='keyboard'},true);
})();
