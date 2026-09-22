/* Keep the original layout; replace the standalone diagram with background texture. */
(()=>{
 const host=document.querySelector('.about-name'),layer=document.createElement('div');
 layer.className='about-left-atmosphere';layer.setAttribute('aria-hidden','true');
 let glyphs='';const random=(x,y)=>Math.abs(Math.sin(x*127.1+y*311.7)*43758.5453)%1;
 for(let y=18;y<566;y+=13)for(let x=12;x<484;x+=12){
  const r=random(x,y),bottom=Math.max(0,(y-270)/300),side=Math.max(0,(x-335)/160);
  const density=Math.min(.64,bottom*.5+side*.32);if(r>density)continue;
  const band=(Math.sin(x*.024+y*.013)+1)/2,alpha=(.09+band*.16)*(y<270?.45:1),glyph=r<density*.2?'#':'.';
  glyphs+=`<text x="${x}" y="${y}" fill="#91adc9" opacity="${alpha.toFixed(3)}">${glyph}</text>`;
  if(r<.10&&y>280)glyphs+=`<text x="${x-1}" y="${y}" fill="#409fae" opacity=".16">${glyph}</text><text x="${x+1}" y="${y}" fill="#a5709c" opacity=".13">${glyph}</text>`;
 }
 layer.innerHTML=`<svg viewBox="0 0 500 580" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g class="decor-grid"><path d="M16 40H484 M310 172H484 M16 314H484 M16 436H484 M16 560H484 M26 304V560 M170 314V560 M322 40V560 M474 40V560"/></g><g font-family="Ryan Inter,sans-serif" font-size="11">${glyphs}</g><g class="decor-accent"><path d="M306 40H322V56 M458 172H474V188 M10 314H22 M16 308V320 M164 436H176 M170 430V442 M316 560H328 M322 554V566"/></g></svg>`;
 host.prepend(layer);
 const controls=document.querySelector('.preview-controls');controls.querySelector('span').textContent='MOTION / 03.1';
 const compare=controls.querySelector('a');compare.href='motion-preview-v3.html';compare.textContent='对比 V3 ↗';
})();
