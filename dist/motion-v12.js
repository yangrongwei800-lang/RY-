document.body.classList.add('motion-v12');
const previewV12Controls=document.querySelector('.preview-controls');
previewV12Controls.querySelector('span').textContent='MOTION / 12';
previewV12Controls.setAttribute('aria-label','第十二版动效预览控制');
previewV12Controls.querySelector('a').href='motion-preview-v11.html';
previewV12Controls.querySelector('a').textContent='对比 V11 ↗';
