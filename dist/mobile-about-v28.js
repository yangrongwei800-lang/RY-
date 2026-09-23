// Mobile-only renderer; desktop retains the original SVG animations.
window.createMobileAboutField=(layer,scale,seed,quiet)=>{
 const svg=layer.querySelector('svg'),group=svg.querySelector('.symbol-field'),style=getComputedStyle(group),opacity=Number(style.opacity)||1;
 const width=layer.clientWidth,height=layer.clientHeight,dpr=Math.min(devicePixelRatio||1,1.5),canvas=document.createElement('canvas');
 canvas.className='mobile-about-field';canvas.width=Math.ceil(width*dpr);canvas.height=Math.ceil(height*dpr);layer.append(canvas);
 const ctx=canvas.getContext('2d'),sprites=new Map();
 const font=style.font,fill=style.fill;
 for(const glyph of ['#','.']){const tile=document.createElement('canvas');tile.width=48;tile.height=48;const c=tile.getContext('2d');c.scale(2,2);c.font=font;c.fillStyle=fill;c.fillText(glyph,6,16);sprites.set(glyph,tile);}
 const points=[...group.querySelectorAll('text')].map((el,i)=>({x:+el.getAttribute('x'),y:+el.getAttribute('y'),alpha:+el.getAttribute('opacity'),phase:+el.dataset.phase,dx:(7+seed(i,8)*3)/scale,dy:(4+seed(i,4)*3)/scale,stretch:1.04+seed(i,6)*.09,duration:8000+(i%9)*450,glyph:el.textContent,row:[...group.children].indexOf(el.parentNode),cell:[...el.parentNode.children].indexOf(el)}));group.remove();
 let frame=0,running=false,time=0,last=0,dead=false;const ease=t=>(1-Math.cos(Math.PI*t))/2;
 function draw(){ctx.setTransform(dpr*scale,0,0,dpr*scale,0,0);ctx.clearRect(0,0,width/scale,height/scale);for(const p of points){const q=quiet()?0:((time+p.phase*1250)%p.duration)/p.duration*3,k=Math.floor(q),f=ease(q-k),xs=[-p.dx,0,p.dx,-p.dx],ys=[0,p.dy,0,0],ss=[1,p.stretch,.96,1],aa=[.7,1,.85,.7];let shift=0;
 if(!quiet()&&p.row>=23&&p.row%7===2&&p.cell>=4&&p.cell<9){const g=((time+(p.row-23)*1050)%18000)/18000;if(g>=.8&&g<.83)shift=7/scale*ease((g-.8)/.03);else if(g>=.83&&g<.86)shift=(7-9*ease((g-.83)/.03))/scale;else if(g>=.86&&g<.9)shift=-2/scale*(1-ease((g-.86)/.04));}
 const x=p.x+xs[k]+(xs[k+1]-xs[k])*f+shift,y=p.y+ys[k]+(ys[k+1]-ys[k])*f,s=ss[k]+(ss[k+1]-ss[k])*f;ctx.globalAlpha=p.alpha*opacity*(aa[k]+(aa[k+1]-aa[k])*f);ctx.drawImage(sprites.get(p.glyph),x-6*s,y-16,24*s,24);}}
 function tick(now){if(!running||dead)return;if(last)time+=Math.min(now-last,50);last=now;draw();frame=requestAnimationFrame(tick);}
 draw();return {sync(active){if(dead)return;if(active&&!quiet()){if(!running){running=true;last=0;frame=requestAnimationFrame(tick);}}else{running=false;cancelAnimationFrame(frame);if(quiet())draw();}},destroy(){dead=true;cancelAnimationFrame(frame);canvas.remove();},get count(){return points.length}};
};
