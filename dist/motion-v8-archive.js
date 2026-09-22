(()=>{
 const observed=new WeakSet();
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('archive-lit');observer.unobserve(e.target);}}),{rootMargin:'0px 0px -12% 0px',threshold:.1});
 window.decorateArchive=()=>{
  const grid=document.querySelector('#projects');
  if(grid.querySelectorAll('.project').length!==11){grid.querySelectorAll('.archive-band').forEach(e=>e.remove());return;}
  for(const [id,range,label]of [['portrait-interview','03—06','CONTENT / 内容与构思'],['photography','07—11','IMAGE / 影像与探索']]){
   const card=grid.querySelector('[data-id="'+id+'"]');if(!card||card.previousElementSibling?.classList.contains('archive-band'))continue;
   const band=document.createElement('div');band.className='archive-band';band.setAttribute('aria-hidden','true');band.innerHTML='<span>ARCHIVE / '+range+'</span><i class="archive-line"></i><span>'+label+'</span><i class="archive-ticks"></i>';card.before(band);if(!observed.has(band)){observed.add(band);observer.observe(band);}
  }
 };window.decorateArchive();
})();
