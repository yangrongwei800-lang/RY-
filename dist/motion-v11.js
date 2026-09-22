document.body.classList.add('motion-v11');
const previewV11Controls=document.querySelector('.preview-controls');
previewV11Controls.querySelector('span').textContent='MOTION / 11';
previewV11Controls.setAttribute('aria-label','第十一版动效预览控制');
previewV11Controls.querySelector('a').href='motion-preview-v10.html';
previewV11Controls.querySelector('a').textContent='对比 V10 ↗';
