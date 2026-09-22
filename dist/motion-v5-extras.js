/* Stable symbol field and continuous capability strip, preview only. */
(()=>{
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),body=document.body,detail=document.querySelector('#detail');
 const quiet=()=>reduced.matches||body.classList.contains('motion-static');
 const host=document.querySelector('.about-name'),layer=document.createElement('div');layer.className='about-left-atmosphere';layer.setAttribute('aria-hidden','true');
 let symbols='';
 const seed=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};
 for(let row=0;row<44;row++){
  let cells='';const y=16+row*13;
  for(let col=0;col<40;col++){
   const x=10+col*12,r=seed(col,row);
   // A continuous curved density band, anchored to its grid; no translating patches.
   const wave=(Math.sin(col*.15+row*.11)+Math.sin(col*.06-row*.16)+2)/4;
   const clearance=y<300&&x<380?.045:1;
   const edge=Math.min(1,x/65,(500-x)/65,y/80,(580-y)/65);
   const density=(.12+wave*.72)*clearance*edge;
   if(r>density)continue;
   const alpha=(.12+wave*.44)*clearance*edge;
   cells+='<text x="'+x+'" y="'+y+'" opacity="'+alpha.toFixed(3)+'">'+(r>.38?'#':'.')+'</text>';
  }
  symbols+='<g class="symbol-row">'+cells+'</g>';
 }
 layer.innerHTML='<svg viewBox="0 0 500 580" preserveAspectRatio="none"><path class="decor-grid" d="M18 90H484 M18 220H484 M18 350H484 M18 480H484 M75 35V550 M225 35V550 M375 35V550"/><path class="decor-accent" d="M18 58V35H42 M460 35H484V58 M484 526V550H460 M42 550H18V526 M213 480H237 M225 468V492"/><g class="symbol-field">'+symbols+'</g></svg>';host.prepend(layer);
 const symbolAnimations=[...layer.querySelectorAll('.symbol-row')].map((el,i)=>el.animate([{opacity:.45},{opacity:1},{opacity:.45}],{duration:7000+(i%5)*610,delay:-i*390,iterations:Infinity,easing:'ease-in-out'}));
 let symbolsVisible=false,stripVisible=false,hovered=false,userPaused=false,marquee=null;
 const strip=document.querySelector('.portfolio-strip');
 const icons=[
  '<rect x="8" y="5" width="22" height="28"/><path d="M13 12H24 M13 19H20 M13 26H23 M4 9V29"/><circle cx="29" cy="24" r="5"/>',
  '<path d="M3 12V4H11 M25 4H33V12 M33 24V32H25 M11 32H3V24"/><rect x="8" y="10" width="12" height="15"/><path d="M22 10H28V25H22 M11 15L17 18L11 21Z"/>',
  '<rect x="5" y="5" width="21" height="21"/><circle cx="23" cy="24" r="9"/><path d="M5 31H12 M9 27V35"/>'
 ];
 const names=['内容策划','影像叙事','视觉表达'],labels=['CONTENT & CONCEPT','IMAGE & STORY','FORM & EXPRESSION'];
 const group='<div class="marquee-group">'+names.map((name,i)=>'<div class="capability-cell"><svg viewBox="0 0 38 38" aria-hidden="true">'+icons[i]+'</svg><div>'+name+'<small>'+labels[i]+'</small></div></div>').join('')+'</div>';
 strip.innerHTML='<span class="strip-code">RY / PORTFOLIO</span><div class="marquee-window"><div class="marquee-track">'+group+'</div></div><button class="strip-pause" type="button" aria-label="暂停横幅滚动" aria-pressed="false">Ⅱ</button>';
 const track=strip.querySelector('.marquee-track'),original=track.firstElementChild,pause=strip.querySelector('.strip-pause');
 // Three copies fill even wide screens; only the original is exposed to assistive tech.
 for(let i=0;i<3;i++){const clone=original.cloneNode(true);clone.setAttribute('aria-hidden','true');track.append(clone);}
 function resize(){const width=original.getBoundingClientRect().width;if(!width)return;const time=marquee?.currentTime||0;marquee?.cancel();marquee=track.animate([{transform:'translateX(0)'},{transform:'translateX(-'+width+'px)'}],{duration:width/23*1000,iterations:Infinity,easing:'linear'});marquee.currentTime=time;sync();}
 function sync(){const blocked=quiet()||document.hidden||detail.open;symbolAnimations.forEach(a=>{if(!blocked&&symbolsVisible)a.play();else a.pause();});if(quiet())symbolAnimations.forEach(a=>a.currentTime=1800);if(marquee){if(!blocked&&stripVisible&&!hovered&&!userPaused)marquee.play();else marquee.pause();if(quiet())marquee.currentTime=0;}pause.textContent=userPaused?'▷':'Ⅱ';pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'继续横幅滚动':'暂停横幅滚动');}
 new IntersectionObserver(entries=>{for(const e of entries){if(e.target===host)symbolsVisible=e.isIntersecting;if(e.target===strip)stripVisible=e.isIntersecting;}sync();},{threshold:.01}).observe(host);
 new IntersectionObserver(entries=>{stripVisible=entries[0].isIntersecting;sync();},{threshold:.01}).observe(strip);
 strip.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;sync();}});strip.addEventListener('pointerleave',()=>{hovered=false;sync();});
 strip.addEventListener('focusin',()=>{hovered=true;sync();});strip.addEventListener('focusout',()=>{hovered=false;sync();});
 pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
 new ResizeObserver(resize).observe(original);
 new MutationObserver(sync).observe(body,{attributes:true,attributeFilter:['class']});new MutationObserver(sync).observe(detail,{attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();
