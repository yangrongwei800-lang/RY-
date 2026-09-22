document.body.classList.add('motion-v15');
const previewV15Controls=document.querySelector('.preview-controls');
previewV15Controls.querySelector('span').textContent='MOTION / 15';
previewV15Controls.setAttribute('aria-label','第十五版策划材料预览控制');
previewV15Controls.querySelector('a').href='motion-preview-v14.html';
previewV15Controls.querySelector('a').textContent='对比 V14 ↗';
