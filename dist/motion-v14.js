document.body.classList.add('motion-v14');
const previewV14Controls=document.querySelector('.preview-controls');
previewV14Controls.querySelector('span').textContent='MOTION / 14';
previewV14Controls.setAttribute('aria-label','第十四版动效预览控制');
previewV14Controls.querySelector('a').href='motion-preview-v13.html';
previewV14Controls.querySelector('a').textContent='对比 V13 ↗';
