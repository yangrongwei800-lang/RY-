/* Case-specific art direction, using the portfolio's own project materials. */
const caseVisuals = {
  sunshine: {kind:'story', image:'sunshine.jpg', caption:'公益项目成片 · 团队协作', word:'STORY', statement:'从一座古建，打开一本书。', keywords:['公益内容','叙事构思','分镜脚本'], images:[['storyboard-02.jpg','从画面开始'],['storyboard-12.jpg','把故事写进分镜'],['sunshine-script-1.jpg','让内容形成脉络']]},
  'portrait-interview': {kind:'interview', image:'wudajing-portrait.png', caption:'武大靖 · 项目展示素材', word:'PORTRAIT', statement:'从冠军的冰场，到你的冰场。', keywords:['人物采访','品牌内容','互动创意'], images:[['portrait-plan-03.jpg','主题与内容'],['portrait-plan-04.jpg','采访框架'],['portrait-plan-05.jpg','品牌与互动']]},
  xuwen: {kind:'story', image:'xuwen-harvest.jpg', caption:'徐闻菠萝 · 团队项目影像', word:'CHRONICLE', statement:'以时间为线索，看见产业中的人。', keywords:['主题影像','场景拆解','拍摄筹备'], images:[['xuwen-harvest.jpg','田间采收'],['xuwen-processing.jpg','产业生产'],['xuwen-finance.jpg','产业服务']]},
  commercial: {kind:'film', image:'fashion-red.jpg', caption:'人物棚拍 · 商业影像', word:'IN FRAME', statement:'不同的内容版本，同一个表达目标。', keywords:['人物','产品','镜头语言'], images:[['drink-product.jpg','产品呈现'],['drink-life.jpg','生活场景'],['fashion-suit.jpg','人物表达']]},
  planning: {kind:'planning', image:'redtail-1.jpg', caption:'赤尾品牌方案 · 独立课程作业', word:'CONCEPT', statement:'让产品特点，成为传播的切口。', keywords:['品牌洞察','内容概念','传播构思'], images:[['redtail-1.jpg','赤尾 / 产品体验'],['nice.jpg','纳爱斯 / 人群情绪'],['fish.jpg','摸鱼企划 / 生活场景']]},
  photography: {kind:'photo', image:'photo-10.jpg', caption:'人物活动 · 商业摄影', word:'OBSERVE', statement:'在流动的现场，留下有关系的瞬间。', keywords:['空间','人物','现场关系'], images:[['photo-01.jpg','建立场景'],['photo-09.jpg','观察人物'],['photo-12.jpg','记录互动']]},
  ring: {kind:'film', image:'ring.jpg', caption:'三维产品影像 · 合作制作', word:'FORM', statement:'从产品形态，到影像节奏。', keywords:['创意','三维建模','剪辑'], images:[['ring.jpg','产品形态'],['ring-dark.jpg','影像表达']]},
  motion: {kind:'motion', image:'tech.jpg', caption:'科技场景动效 · 独立商业制作', word:'MOTION', statement:'让场景、文字与信息一起运动。', keywords:['C4D','AFTER EFFECTS','动态叙事'], images:[['tech.jpg','科技场景 / 商业'],['data.jpg','数据动效 / 商业'],['sanfu.jpg','图形广告 / 课程']]},
  posters: {kind:'poster', image:'poster-01.jpg', caption:'波点创意 · 独立课程设计', word:'COMPOSE', statement:'在平面里，找到主题的另一种表达。', keywords:['视觉概念','图形语言','系列表达'], images:[['poster-09.jpg','品牌主题'],['poster-02.jpg','城市文化'],['poster-05.jpg','形式探索']]},
  exploration: {kind:'photo', image:'photo-15.jpg', caption:'篮球活动 · 校园融媒体摄影', word:'EXPLORE', statement:'把现场经验，带进下一次镜头实验。', keywords:['校园实践','日常观察','独立习作'], images:[['photo-17.jpg','活动现场'],['night.jpg','城市氛围'],['pocari.jpg','广告叙事']]}
};

function caseOverview(project) {
  if(project.id==='noodle')return noodleOverview(project);
  const v=caseVisuals[project.id];
  return `<section class="case-thesis"><div class="thesis-marker"><span class="mono">THE APPROACH / 创作线索</span><span aria-hidden="true">↗</span></div><h3>${esc(v.statement)}</h3><div class="thesis-rule" aria-hidden="true"><i></i><span>${esc(v.word)}</span><i></i></div></section><div class="case-contactsheet">${v.images.map(([file,caption],i)=>`<figure><button class="image-button" data-image="media/${esc(file)}" data-caption="${esc(caption)} · ${esc(project.title)}" aria-label="查看${esc(caption)}"><img src="media/${esc(file)}" alt="${esc(caption)}" loading="lazy"></button><figcaption><span class="mono">${String(i+1).padStart(2,'0')}</span>${esc(caption)}<span aria-hidden="true">↗</span></figcaption></figure>`).join('')}</div><div class="case-process"><div class="process-heading"><span class="mono">PROCESS / 内容展开</span><span aria-hidden="true">＋</span></div>${project.steps.map(([h,p],i)=>`<section class="case-step"><span class="step-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></section>`).join('')}</div>${project.note?`<aside class="case-note"><span class="mono">PROJECT NOTE / 项目说明</span><p>${esc(project.note)}</p></aside>`:''}<button class="view-material" data-view-material><span>展开作品材料</span><span class="mono">FILM / IMAGE / DOCUMENT</span><span aria-hidden="true">↗</span></button>`;
}

function decorateMaterials(project, container) {
  const v=caseVisuals[project.id];
  container.dataset.kind=v.kind;
  let headings=[...container.querySelectorAll('.media-heading')];
  headings.forEach((heading,i)=>{
    const index=document.createElement('span');index.className='material-index';index.textContent=String(i+1).padStart(2,'0');index.setAttribute('aria-hidden','true');heading.prepend(index);
  });
  const grids=[...container.querySelectorAll('.media-grid')];
  grids.forEach(grid=>{
    grid.classList.toggle('single',grid.children.length===1);
    grid.classList.toggle('video-grid',!!grid.querySelector('video'));
    if(v.kind==='poster')grid.classList.add('poster-grid');
    if(v.kind==='photo')grid.classList.add('photo-grid');
    [...grid.children].forEach((card,i)=>{
      const caption=card.querySelector('figcaption');
      if(caption){const index=document.createElement('span');index.className='caption-index';index.textContent=String(i+1).padStart(2,'0');index.setAttribute('aria-hidden','true');caption.prepend(index);}
      const video=card.querySelector('video');
      if(video){card.classList.add('video-card');if(/fashion-suit|drink-/.test(video.getAttribute('poster')||''))card.classList.add('portrait-film');}
    });
  });
  container.querySelectorAll('.document-link').forEach(link=>{const icon=document.createElement('span');icon.className='document-icon';icon.textContent='PDF';icon.setAttribute('aria-hidden','true');link.prepend(icon);});
}
