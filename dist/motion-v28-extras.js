/* Stable symbol field and continuous capability strip, preview only. */
(()=>{
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),body=document.body,detail=document.querySelector('#detail');
 const quiet=()=>reduced.matches||body.classList.contains('motion-static');
 const host=document.querySelector('.about-name'),layer=document.createElement('div');layer.className='about-left-atmosphere';layer.setAttribute('aria-hidden','true');

 host.prepend(layer);
 let symbolAnimations=[],fieldSize='',mobileField=null;const mobileQuery=matchMedia('(max-width: 800px)');mobileQuery.addEventListener('change',()=>{fieldSize='';rebuildSymbols();});
 const seed=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};
 function rebuildSymbols(){
  const width=layer.clientWidth,height=layer.clientHeight;if(!width||!height)return;
  const size=width+':'+height;if(size===fieldSize)return;fieldSize=size;
  symbolAnimations.forEach(a=>a.cancel());symbolAnimations=[];mobileField?.destroy();mobileField=null;
  const scale=width/500,H=height/scale,hostRect=host.getBoundingClientRect();
  const clearTo=(host.querySelector(':scope>.blue').getBoundingClientRect().bottom-hostRect.top+18)/scale;
  let symbols='';
  for(let row=0,y=16;y<H-16;row++,y+=13){let cells='';
   for(let col=0;col<40;col++){const x=10+col*12,r=seed(col,row),wave=(Math.sin(col*.15+row*.11)+Math.sin(col*.06-row*.16)+2)/4;
    const clearance=y<clearTo&&x<380?.035:1,edge=Math.max(0,Math.min(1,x/65,(500-x)/65,y/80,(H-y)/58));
    const density=(.18+wave*.68)*clearance*edge;if(r>density)continue;
    const alpha=(.13+wave*.42)*clearance*edge;
    cells+='<text x="'+x+'" y="'+y+'" data-phase="'+(col*.16+row*.13)+'" opacity="'+alpha+'">'+(r>.38?'#':'.')+'</text>';
   }symbols+='<g class="symbol-row">'+cells+'</g>';
  }
  let grid='M75 35V'+(H-22)+' M225 35V'+(H-22)+' M375 35V'+(H-22);for(let y=90;y<H-30;y+=130)grid+=' M18 '+y+'H484';
  layer.innerHTML='<svg viewBox="0 0 500 '+H+'" preserveAspectRatio="xMidYMid meet"><path class="decor-grid" d="'+grid+'"/><path class="decor-accent" d="M18 58V35H42 M460 35H484V58 M484 '+(H-46)+'V'+(H-22)+'H460 M42 '+(H-22)+'H18V'+(H-46)+'"/><g class="symbol-field">'+symbols+'</g></svg>';
  if(mobileQuery.matches){mobileField=window.createMobileAboutField(layer,scale,seed,quiet);sync();return;}
  symbolAnimations=[...layer.querySelectorAll('.symbol-field text')].map((el,i)=>{
   const alpha=Number(el.getAttribute('opacity')),phase=Number(el.dataset.phase),dx=(7+seed(i,8)*3)/scale,dy=(4+seed(i,4)*3)/scale,stretch=1.04+seed(i,6)*.09;
   el.style.transformBox='fill-box';el.style.transformOrigin='center';
   return el.animate([{transform:'translate('+(-dx)+'px,0) scaleX(1)',opacity:alpha*.7},{transform:'translate(0,'+dy+'px) scaleX('+stretch+')',opacity:alpha},{transform:'translate('+dx+'px,0) scaleX(.96)',opacity:alpha*.85},{transform:'translate('+(-dx)+'px,0) scaleX(1)',opacity:alpha*.7}],{duration:8000+(i%9)*450,delay:-phase*1250,iterations:Infinity,easing:'ease-in-out'});
  });
  [...layer.querySelectorAll('.symbol-row')].forEach((row,i)=>{if(i<23||i%7!==2)return;const cells=[...row.children].slice(4,9);if(!cells.length)return;
   const fragment=document.createElementNS('http://www.w3.org/2000/svg','g');cells.forEach(el=>fragment.append(el));row.append(fragment);
   symbolAnimations.push(fragment.animate([{transform:'translateX(0)',offset:0},{transform:'translateX(0)',offset:.8},{transform:'translateX('+(7/scale)+'px)',offset:.83},{transform:'translateX('+(-2/scale)+'px)',offset:.86},{transform:'translateX(0)',offset:.9},{transform:'translateX(0)',offset:1}],{duration:18000,delay:-(i-23)*1050,iterations:Infinity,easing:'ease-in-out'}));
  });sync();
 }
 new ResizeObserver(rebuildSymbols).observe(layer);
 document.fonts.ready.then(()=>{fieldSize='';rebuildSymbols();});
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
 function sync(){const blocked=quiet()||document.hidden||detail.open;mobileField?.sync(!blocked&&symbolsVisible);symbolAnimations.forEach(a=>{if(!blocked&&symbolsVisible)a.play();else a.pause();});if(quiet())symbolAnimations.forEach(a=>a.currentTime=1800);if(marquee){if(!blocked&&stripVisible&&!hovered&&!userPaused)marquee.play();else marquee.pause();if(quiet())marquee.currentTime=0;}pause.textContent=userPaused?'▷':'Ⅱ';pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'继续横幅滚动':'暂停横幅滚动');}
 new IntersectionObserver(entries=>{for(const e of entries){if(e.target===host)symbolsVisible=e.isIntersecting;if(e.target===strip)stripVisible=e.isIntersecting;}sync();},{threshold:.01}).observe(host);
 new IntersectionObserver(entries=>{stripVisible=entries[0].isIntersecting;sync();},{threshold:.01}).observe(strip);
 strip.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;sync();}});strip.addEventListener('pointerleave',()=>{hovered=false;sync();});
 strip.addEventListener('focusin',()=>{hovered=true;sync();});strip.addEventListener('focusout',()=>{hovered=false;sync();});
 pause.addEventListener('click',()=>{userPaused=!userPaused;sync();});
 new ResizeObserver(resize).observe(original);
 new MutationObserver(sync).observe(body,{attributes:true,attributeFilter:['class']});new MutationObserver(sync).observe(detail,{attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
})();

