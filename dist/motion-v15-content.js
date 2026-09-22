/* Preview-specific content edits. Shared data and earlier previews remain intact. */
(()=>{
 const commercial=projects.find(p=>p.id==='commercial');
 commercial.cover='fashion-red-cover-v6';
 caseVisuals.commercial.image='fashion-red-cover-v6.jpg';
 const commercialMaterial=commercial.material;
 commercial.material=()=>commercialMaterial().replace('poster="media/fashion-red.jpg"','poster="media/fashion-red-cover-v6.jpg"');
 const planning=projects.find(p=>p.id==='planning');
 planning.cover='nice-v15-p01';planning.sub='纳爱斯 / 赤尾 / 打工人摸鱼企划';
 const byBrand=['纳爱斯','赤尾','打工人'];
 planning.steps.sort((a,b)=>byBrand.findIndex(s=>a[0].startsWith(s))-byBrand.findIndex(s=>b[0].startsWith(s)));
 planning.intro='三份独立课程方案，分别从人群情绪、产品体验和生活场景出发，练习完整的品牌传播构思。';
 planning.material=()=>heading('纳爱斯品牌策划案','9 页精选 / 独立课程方案')+'<p class="planning-material-lead">从口腔敏感与情绪敏感的连接出发，展开话题预热、持续打卡和线下体验。以下为原方案选页，按策划逻辑阅读。</p><p class="planning-material-note">课程策划提案 · 合作、预算与效果表述属于方案设想；图片可点击放大。</p>'+grid([pic('nice-v15-p01','方案封面 · 你，好敏感 · 原稿 P01'),pic('nice-v15-p09','品牌定位与目标人群 · 原稿 P09'),pic('nice-v15-p15','主题阐释 · 口腔功能与情感关怀 · 原稿 P15'),pic('nice-v15-p18','内容摘要 · 三阶段传播结构 · 原稿 P18'),pic('nice-v15-p19','话题预热 · 只有自己知道的小敏感 · 原稿 P19'),pic('nice-v15-p20','持续参与 · 护牙 21 天打卡计划 · 原稿 P20'),pic('nice-v15-p24','线下体验 · 牙齿有话说科普展 · 原稿 P24'),pic('nice-v15-p25','情绪互动 · 爱上敏感的自己 · 原稿 P25'),pic('nice-v15-p29','执行规划 · 活动排期与预算设想 · 原稿 P29')])+
heading('赤尾品牌策划案','选页 / 独立课程方案')+grid([pic('redtail-1','《爱有赤滑，更有一套》· 独立课程方案'),pic('redtail-19','赤尾方案选页 · 创意呈现')])+
heading('打工人摸鱼企划','9 页精选 / 独立课程方案')+'<p class="planning-material-lead">围绕职场日常与解压需求，将线上话题、摸鱼展和主题市集串联成一条体验路线。以下展示活动概念与具体互动设计。</p><p class="planning-material-note">课程策划提案 · 合作、预算与效果表述属于方案设想；图片可点击放大。</p>'+grid([pic('fish-v15-p01','方案封面 · 打工人摸鱼企划 · 原稿 P01'),pic('fish-v15-p08','活动概念 · 摸鱼展与摸鱼市集 · 原稿 P08'),pic('fish-v15-p10','传播思考 · 借势、造势与声势 · 原稿 P10'),pic('fish-v15-p16','前期预热 · 主题海报 · 原稿 P16'),pic('fish-v15-p18','线上互动 · 摸鱼主题 H5 构想 · 原稿 P18'),pic('fish-v15-p22','体验路线 · 打工人摸鱼的一天 · 原稿 P22'),pic('fish-v15-p23','入场互动 · 打卡摸鱼 · 原稿 P23'),pic('fish-v15-p33','空间设计 · 市集氛围包装 · 原稿 P33'),pic('fish-v15-p34','摊位设计 · 禁止蕉绿 · 原稿 P34')]);
 Object.assign(caseVisuals.planning,{image:'nice-v15-p01.jpg',caption:'纳爱斯品牌方案 · 独立课程作业',images:[['nice-v15-p01.jpg','纳爱斯 / 人群情绪'],['redtail-1.jpg','赤尾 / 产品体验'],['fish-v15-p01.jpg','摸鱼企划 / 生活场景']]});
 render();
})();
