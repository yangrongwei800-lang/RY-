(()=>{
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

})();
