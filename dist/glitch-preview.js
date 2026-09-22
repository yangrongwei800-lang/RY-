/* Slow independent motion, occasional soft displacement; no flashing or text glyphs. */
(()=>{
 const host=document.querySelector('.about-name'),layer=document.createElement('div');
 layer.className='about-left-atmosphere';layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<canvas></canvas><svg viewBox="0 0 500 580" preserveAspectRatio="none"><g class="decor-grid"><path d="M16 40H484 M310 172H484 M16 314H484 M16 436H484 M16 560H484 M26 304V560 M170 314V560 M322 40V560 M474 40V560"/></g><g class="decor-accent"><path d="M306 40H322V56 M458 172H474V188 M10 314H22 M16 308V320 M164 436H176 M170 430V442 M316 560H328 M322 554V566"/></g></svg>';
 host.prepend(layer);
 const canvas=layer.querySelector('canvas'),ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const rand=(a,b)=>Math.abs(Math.sin(a*127.1+b*311.7)*43758.5453)%1;
 const centers=[[.12,.68],[.31,.8],[.56,.68],[.78,.85],[.9,.55],[.9,.3],[.47,.96]];
 const patches=centers.map(([x,y],i)=>({x,y,phase:i*1.83,period:13+i*1.37,blocks:Array.from({length:110},(_,j)=>{const r=rand(i+7,j+1),s=rand(i+11,j+2);return {x:(j%11-5)*.017,y:(Math.floor(j/11)-5)*.021,w:r<.16?12:2+r*5,h:s<.22?18+s*25:3+s*9,a:.15+rand(i+33,j+7)*.36,color:r<.2?'130,157,181':r<.37?'112,135,154':'173,188,202',present:rand(i+48,j+19)<.65};})}));
 let width=0,height=0,frame=0,last=0,visible=false,t=0,frames=0;
 const quiet=()=>reduced.matches||document.body.classList.contains('motion-static');
 const active=()=>visible&&!document.hidden&&!document.querySelector('#detail').open&&!quiet();
 function draw(time){if(!width||!height)return;const dpr=Math.min(devicePixelRatio,1.5);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);const scale=width/500,amplitude=width<400?.6:1;
  for(const p of patches){const dx=(Math.sin(time*.36+p.phase)*11+Math.sin(time*.19+p.phase*.8)*4)*amplitude,dy=Math.sin(time*.29+p.phase*1.3)*17*amplitude;
   const cycle=(time+p.phase*1.7)%p.period,displace=cycle>.9?0:Math.pow(Math.sin(cycle/.9*Math.PI),2)*6*amplitude;
   for(const b of p.blocks){if(!b.present)continue;const x=(p.x+b.x)*width+dx+(b.y>.015?displace:0),y=(p.y+b.y)*height+dy;
    if(x<width*.73&&y<height*.51)continue;
    const alpha=b.a*(p.y<.4?.27:1),bw=b.w*Math.max(.7,scale),bh=b.h*Math.max(.7,scale);
    ctx.fillStyle=`rgba(${b.color},${alpha})`;ctx.fillRect(x,y,bw,bh);
    ctx.fillStyle=`rgba(44,153,174,${alpha*.56})`;ctx.fillRect(x-1.4,y,1.2,bh);
    ctx.fillStyle=`rgba(163,77,132,${alpha*.52})`;ctx.fillRect(x+bw-.3,y+.6,1.3,bh);
    if(b.h>9){ctx.fillStyle=`rgba(120,162,114,${alpha*.42})`;ctx.fillRect(x+bw*.45,y,.8,bh);}
   }
  }
  ctx.fillStyle='rgba(9,19,32,.30)';for(let y=0;y<height;y+=3)ctx.fillRect(0,y,width,.7);
  canvas.dataset.frames=String(++frames);
 }
 function tick(now){if(!active()){frame=0;last=0;return;}if(!last)last=now;if(now-last>=40){t+=Math.min(.08,(now-last)/1000);draw(t);last=now;}frame=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(quiet()){draw(0);return;}if(active())frame=requestAnimationFrame(tick);}
 function resize(){width=layer.clientWidth;height=layer.clientHeight;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);draw(quiet()?0:t);sync();}
 new ResizeObserver(resize).observe(layer);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.06}).observe(host);
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 new MutationObserver(sync).observe(document.querySelector('#detail'),{attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 const mail=document.querySelector('.outro-mail'),actions=document.createElement('div');actions.className='contact-actions';mail.before(actions);actions.append(mail);
 mail.innerHTML='<span>发送邮件</span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6L12 13L21 6"/></svg>';
 mail.setAttribute('aria-describedby','contact-feedback');mail.title='尝试打开设备的邮件应用';
 const copy=document.createElement('button');copy.type='button';copy.className='copy-email';copy.innerHTML='<span>复制邮箱</span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="13" height="13" rx="1"/><path d="M16 5V3H3V16H5"/></svg>';actions.append(copy);
 const feedback=document.createElement('p');feedback.className='contact-feedback';feedback.id='contact-feedback';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.textContent='发送邮件将尝试打开邮件应用，也可以直接复制邮箱。';actions.after(feedback);
 let resetTimer;
 copy.addEventListener('click',async()=>{const email='1269064105@qq.com';let copied=false;try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(email);copied=true;}}catch{}
  if(!copied){const field=document.createElement('textarea');field.value=email;field.setAttribute('aria-label','邮箱地址');Object.assign(field.style,{position:'fixed',top:'0',left:'-9999px'});document.body.append(field);field.select();try{copied=document.execCommand('copy');}catch{}field.remove();copy.focus({preventScroll:true});}
  clearTimeout(resetTimer);copy.querySelector('span').textContent=copied?'已复制':'复制邮箱';feedback.textContent=copied?'已复制邮箱：'+email:'未能自动复制，请选中下方邮箱地址手动复制。';if(copied)resetTimer=setTimeout(()=>copy.querySelector('span').textContent='复制邮箱',2500);
 });
 const controls=document.querySelector('.preview-controls');controls.querySelector('span').textContent='MOTION / 04';const compare=controls.querySelector('a');compare.href='motion-preview-v3-texture.html';compare.textContent='对比上一版 ↗';
})();
