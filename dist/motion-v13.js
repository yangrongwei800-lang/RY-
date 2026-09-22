document.body.classList.add('motion-v13');
const previewV13Controls=document.querySelector('.preview-controls');
previewV13Controls.querySelector('span').textContent='MOTION / 13';
previewV13Controls.setAttribute('aria-label','第十三版动效预览控制');
previewV13Controls.querySelector('a').href='motion-preview-v12.html';
previewV13Controls.querySelector('a').textContent='对比 V12 ↗';
