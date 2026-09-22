/* Preview-specific content edits. Shared data and earlier previews remain intact. */
(()=>{
 const commercial=projects.find(p=>p.id==='commercial');
 commercial.cover='fashion-red-cover-v6';
 caseVisuals.commercial.image='fashion-red-cover-v6.jpg';
 const commercialMaterial=commercial.material;
 commercial.material=()=>commercialMaterial().replace('poster="media/fashion-red.jpg"','poster="media/fashion-red-cover-v6.jpg"');
 const planning=projects.find(p=>p.id==='planning');
 planning.cover='nice';planning.sub='纳爱斯 / 赤尾 / 打工人摸鱼企划';
 const byBrand=['纳爱斯','赤尾','打工人'];
 planning.steps.sort((a,b)=>byBrand.findIndex(s=>a[0].startsWith(s))-byBrand.findIndex(s=>b[0].startsWith(s)));
 planning.intro='三份独立课程方案，分别从人群情绪、产品体验和生活场景出发，练习完整的品牌传播构思。';
 planning.material=()=>heading('纳爱斯品牌策划案','封面 / 独立课程方案')+grid([pic('nice','《你，好敏感》· 纳爱斯独立课程方案')])+heading('赤尾品牌策划案','选页 / 独立课程方案')+grid([pic('redtail-1','《爱有赤滑，更有一套》· 独立课程方案'),pic('redtail-19','赤尾方案选页 · 创意呈现')])+heading('打工人摸鱼企划','封面 / 独立课程方案')+grid([pic('fish','《打工人摸鱼企划》· 独立课程方案')]);
 Object.assign(caseVisuals.planning,{image:'nice.jpg',caption:'纳爱斯品牌方案 · 独立课程作业',images:[['nice.jpg','纳爱斯 / 人群情绪'],['redtail-1.jpg','赤尾 / 产品体验'],['fish.jpg','摸鱼企划 / 生活场景']]});
 render();
})();
