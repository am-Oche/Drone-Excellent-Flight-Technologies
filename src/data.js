/* =====================================================================
   CONTENT DATA — assets, products, scenarios, news, downloads, timeline.
   All copy is EDITABLE placeholder copy unless marked "from reference".
   Maps to src/data/{assets,products,news,downloads}.ts in the Vite build.
   ===================================================================== */

/* ---------- ASSETS: slot -> image metadata ----------
   status: "final" | "verify" | "needs-client-photo"
   To swap: drop a file into /img and change `src`. focal = object-position. */
const IMG = "img/";
window.ASSETS = {
  heroAgri:   { src: IMG + "ag-field.jpg", w: 1280, h: 853, focal: "50% 40%", status: "verify",
    alt: { en: "Hexacopter spraying drone hovering low over a green rice paddy", zh: "六旋翼植保无人机低空悬停于绿色稻田之上" },
    credit: "needpix.com (Public Domain / CC0)", license: "CC0" },
  heroIndustry: { src: IMG + "airborne.jpg", w: 1920, h: 1073, focal: "45% 45%", status: "verify",
    alt: { en: "Quadcopter in flight against an overcast sky, rotors in motion", zh: "四旋翼无人机在阴天中飞行，旋翼高速转动" },
    credit: "PublicDomainPictures.net — 'Airborne Drone'", license: "CC0" },
  heroTraining: { src: IMG + "forest-drone.jpg", w: 728, h: 485, focal: "50% 45%", status: "needs-client-photo",
    alt: { en: "Training drone hovering above a field with forest and rapeseed behind", zh: "训练无人机悬停在森林与油菜花田上方" },
    credit: "PickPik (royalty-free)", license: "PickPik free license" },
  scnAgri: { src: IMG + "rice-drone.jpg", w: 1024, h: 683, focal: "50% 35%", status: "verify",
    alt: { en: "Spraying drone misting crops during an IRRI field demonstration", zh: "植保无人机在田间演示中喷洒作物" },
    credit: "IRRI via PICRYL (Public Domain)", license: "Public Domain" },
  scnIndustry: { src: IMG + "white-drone.jpg", w: 728, h: 546, focal: "55% 45%", status: "needs-client-photo",
    alt: { en: "Professional white-bodied drone flying beneath dark storm clouds", zh: "白色专业无人机在乌云下飞行" },
    credit: "PickPik (royalty-free)", license: "PickPik free license" },
  scnTraining: { src: IMG + "quad-sky.jpg", w: 1920, h: 1280, focal: "50% 40%", status: "verify",
    alt: { en: "Entry-level quadcopter hovering during a beginner flight lesson", zh: "入门四旋翼在新手飞行课中悬停" },
    credit: "PublicDomainPictures.net — 'Phantom 4 Drone'", license: "CC0" },
  productA: { src: IMG + "drone-isolated.jpg", w: 2560, h: 1701, focal: "50% 50%", status: "needs-client-photo",
    alt: { en: "Studio shot of a folding drone on a white background, three-quarter view", zh: "白底棚拍无人机三分之四视角" },
    credit: "PxHere (CC0) — replace with client product renders", license: "CC0" },
  productB: { src: IMG + "airborne.jpg", w: 1920, h: 1073, focal: "45% 45%", status: "needs-client-photo",
    alt: { en: "Drone in flight on a neutral grey backdrop", zh: "灰色背景中飞行的无人机" },
    credit: "PublicDomainPictures.net (CC0) — replace with client product renders", license: "CC0" },
  productC: { src: IMG + "quad-sky.jpg", w: 1920, h: 1280, focal: "50% 40%", status: "needs-client-photo",
    alt: { en: "Front view of a quadcopter with landing gear extended", zh: "起落架展开的四旋翼正视图" },
    credit: "PublicDomainPictures.net (CC0) — replace with client product renders", license: "CC0" },
  stats: { src: IMG + "propeller.jpg", w: 2560, h: 1706, focal: "40% 50%", status: "final",
    alt: { en: "Sharp macro of a drone motor and arm", zh: "无人机电机与机臂微距特写" },
    credit: "NegativeSpace — 'Drone Propeller Close Up'", license: "CC0" },
  news: { src: IMG + "engineers.jpg", w: 1024, h: 683, focal: "60% 40%", status: "verify",
    alt: { en: "Engineers examining an unmanned aircraft sensor pod at a technology showcase", zh: "工程师在技术展示会上查看无人机传感器吊舱" },
    credit: "U.S. Army Research Laboratory via PICRYL (Public Domain)", license: "Public Domain" },
  contact: { src: IMG + "office.jpg", w: 1920, h: 1075, focal: "50% 50%", status: "verify",
    alt: { en: "Bright, modern white office interior with large windows", zh: "明亮现代的白色办公空间" },
    credit: "PublicDomainPictures.net — 'Modern White Office Interior'", license: "CC0" },
  about: { src: IMG + "engineers.jpg", w: 1024, h: 683, focal: "50% 40%", status: "needs-client-photo",
    alt: { en: "R&D team inspecting aircraft hardware in a lab", zh: "研发团队在实验室检查飞行器硬件" },
    credit: "PICRYL (Public Domain)", license: "Public Domain" },
  corn: { src: IMG + "corn.jpg", w: 1280, h: 1920, focal: "50% 70%", status: "final",
    alt: { en: "Corn field under a clear blue sky", zh: "蓝天下的玉米田" },
    credit: "PublicDomainPictures.net — 'Corn field background'", license: "CC0" },
};

/* ---------- HERO SLIDES ---------- */
window.HERO_SLIDES = [
  { img: "heroAgri",
    title: { en: "Professional Drone Solution Supplier", zh: "专业无人机解决方案供应商" },
    sub: { en: "Precision spraying, spreading and mapping for modern farms.", zh: "为现代农场提供精准喷洒、播撒与测绘。" } },
  { img: "heroIndustry",
    title: { en: "Built for Industrial Missions", zh: "为行业任务而生" },
    sub: { en: "Inspection, heavy lift and logistics platforms you can rely on.", zh: "可靠的巡检、重载与物流平台。" } },
  { img: "heroTraining",
    title: { en: "Train the Next Generation of Pilots", zh: "培养新一代飞手" },
    sub: { en: "Certified courses, trainers and simulators from day one.", zh: "从第一天起提供认证课程、训练机与模拟器。" } },
];

/* ---------- SCENARIO CAROUSEL (home section 2) ---------- */
window.SCENARIOS = {
  training: [
    { img: "scnTraining", title: { en: "Pilot Training Systems", zh: "飞手培训体系" },
      desc: { en: "Trainers, simulators and curricula for certified operators.", zh: "面向持证飞手的训练机、模拟器与课程。" }, path: "/training" },
    { img: "heroTraining", title: { en: "Field Flight Lessons", zh: "外场飞行课程" },
      desc: { en: "Hands-on outdoor sessions with instructor-linked controllers.", zh: "带教练联控的外场实操课程。" }, path: "/training" },
    { img: "heroIndustry", title: { en: "Advanced Mission Training", zh: "进阶任务培训" },
      desc: { en: "Industry scenarios: inspection, mapping and emergency response.", zh: "巡检、测绘与应急救援场景培训。" }, path: "/training" },
  ],
  agriculture: [
    { img: "scnAgri", title: { en: "Agricultural Plant Protection", zh: "农业植保" },
      desc: { en: "Uniform droplet coverage across rice, wheat, corn and orchards.", zh: "水稻、小麦、玉米与果园的均匀雾滴覆盖。" }, path: "/agriculture" },
    { img: "heroAgri", title: { en: "Smart Spreading", zh: "智能播撒" },
      desc: { en: "Seed and fertiliser spreading at up to 50 kg per sortie.", zh: "单架次最高50公斤种子与肥料播撒。" }, path: "/agriculture" },
    { img: "corn", title: { en: "Field Mapping", zh: "农田测绘" },
      desc: { en: "Generate prescription maps before the first flight.", zh: "首飞前即可生成处方图。" }, path: "/agriculture" },
  ],
  industry: [
    { img: "scnIndustry", title: { en: "Heavy Lift Logistics", zh: "重载物流" },
      desc: { en: "Move up to 60 kg of cargo across mountains and water.", zh: "跨越山川水域运输最高60公斤货物。" }, path: "/industry" },
    { img: "heroIndustry", title: { en: "Power Line Inspection", zh: "电力巡检" },
      desc: { en: "Zoom and thermal payloads for grid and solar assets.", zh: "变焦与热成像载荷用于电网和光伏巡检。" }, path: "/industry" },
    { img: "stats", title: { en: "Custom Airframes", zh: "定制机架" },
      desc: { en: "OEM frames and payload integration for integrators.", zh: "面向集成商的OEM机架与载荷集成。" }, path: "/industry" },
  ],
};
window.SCENARIO_TAGS = [
  { label: { en: "Drones", zh: "整机" }, hash: "drones" },
  { label: { en: "Frames", zh: "机架" }, hash: "frames" },
  { label: { en: "Payloads", zh: "载荷" }, hash: "payloads" },
];

/* ---------- PRODUCTS ---------- */
window.PRODUCTS = [
  { id: "z30p", category: "agriculture", sub: "drones", img: "productA", featured: true, isNew: true,
    name: "Z30P", tagline: { en: "30 L spraying drone for mid-size farms", zh: "30升植保无人机，适合中型农场" },
    specs: [["Tank capacity", "30 L"], ["Spray width", "4 – 9 m"], ["Max flow", "8 L/min"], ["Flight time (full)", "8 min"], ["Battery", "14S 30,000 mAh"], ["IP rating", "IP67"]],
    features: { en: ["Dual centrifugal nozzles with 50–500 μm droplet control", "Terrain-following radar for slopes up to 45°", "Foldable arms — fits a standard pickup bed"], zh: ["双离心喷头，雾滴50–500μm可调", "仿地雷达，适应45°坡地", "机臂可折叠，标准皮卡即可装载"] } },
  { id: "z50p", category: "agriculture", sub: "drones", img: "productB", featured: true, isNew: true,
    name: "Z50P", tagline: { en: "50 L flagship for large-scale plantations", zh: "50升旗舰机型，面向规模化种植" },
    specs: [["Tank capacity", "50 L"], ["Spray width", "5 – 11 m"], ["Max flow", "16 L/min"], ["Flight time (full)", "7 min"], ["Battery", "18S 30,000 mAh"], ["IP rating", "IP67"]],
    features: { en: ["Up to 21 ha/hour operating efficiency", "Omnidirectional obstacle-avoidance radar", "Swap to 70 L spreader in under 3 minutes"], zh: ["作业效率最高21公顷/小时", "全向避障雷达", "3分钟内切换70升播撒箱"] } },
  { id: "s40", category: "agriculture", sub: "payloads", img: "productC",
    name: "S40", tagline: { en: "Precision granule spreading system", zh: "精准颗粒播撒系统" },
    specs: [["Hopper", "40 L / 40 kg"], ["Spread width", "up to 8 m"], ["Flow rate", "up to 100 kg/min"], ["Granule size", "0.5 – 6 mm"]],
    features: { en: ["Variable-rate spreading from prescription maps", "Anti-clog stirring motor"], zh: ["基于处方图的变量播撒", "防堵搅拌电机"] } },
  { id: "h60", category: "industry", sub: "drones", img: "productB",
    name: "H60", tagline: { en: "Heavy-lift logistics multirotor", zh: "重载物流多旋翼" },
    specs: [["Max payload", "60 kg"], ["Range (loaded)", "12 km"], ["Wind resistance", "Level 6"], ["Winch", "30 m cable"]],
    features: { en: ["Cargo winch with auto-release hook", "Redundant power and flight control"], zh: ["绞盘配自动释放挂钩", "冗余动力与飞控"] } },
  { id: "i12", category: "industry", sub: "payloads", img: "productA",
    name: "I12", tagline: { en: "Compact inspection drone with zoom + thermal", zh: "小型巡检无人机，变焦+热成像" },
    specs: [["Zoom", "56× hybrid"], ["Thermal", "640 × 512"], ["Flight time", "42 min"], ["Transmission", "15 km"]],
    features: { en: ["Laser rangefinder for target geolocation", "Automated grid inspection routes"], zh: ["激光测距目标定位", "自动化电网巡检航线"] } },
  { id: "f8", category: "industry", sub: "frames", img: "productC",
    name: "F8 Frame", tagline: { en: "Carbon octocopter airframe for integrators", zh: "面向集成商的碳纤维八旋翼机架" },
    specs: [["Wheelbase", "1,600 mm"], ["Frame weight", "6.2 kg"], ["Arm tube", "Ø 40 mm carbon"]],
    features: { en: ["Quick-release arms", "Universal payload rail"], zh: ["快拆机臂", "通用载荷导轨"] } },
  { id: "t5", category: "training", sub: "drones", img: "productA", featured: true,
    name: "T5 Trainer", tagline: { en: "Rugged trainer with instructor link", zh: "带教练联控的耐用训练机" },
    specs: [["Weight", "1.4 kg"], ["Flight time", "25 min"], ["Prop guards", "Integrated"], ["Modes", "Beginner / Normal / Sport"]],
    features: { en: ["Dual-controller instructor takeover", "Crash-resistant modular arms"], zh: ["双遥控器教练接管", "抗摔模块化机臂"] } },
  { id: "sim", category: "training", sub: "payloads", img: "productC", featured: true,
    name: "FlightSim Pro", tagline: { en: "Certified pilot simulator kit", zh: "认证飞手模拟器套件" },
    specs: [["Scenarios", "40+"], ["Controller", "Real-hardware replica"], ["Platform", "Windows / macOS"]],
    features: { en: ["Exam-mode scoring aligned with licensing tests", "Agriculture and inspection mission packs"], zh: ["与考证一致的考试评分模式", "农业与巡检任务包"] } },
];

/* ---------- DOWNLOADS ---------- */
window.DOWNLOADS = [
  { product: "Z30P", type: "manual", title: { en: "Z30P User Manual v2.1", zh: "Z30P 用户手册 v2.1" }, size: "18.4 MB", date: "2026-08-12" },
  { product: "Z30P", type: "firmware", title: { en: "Z30P Flight Controller Firmware 3.4.0", zh: "Z30P 飞控固件 3.4.0" }, size: "42.1 MB", date: "2026-09-20" },
  { product: "Z50P", type: "manual", title: { en: "Z50P User Manual v1.3", zh: "Z50P 用户手册 v1.3" }, size: "21.0 MB", date: "2026-07-02" },
  { product: "Z50P", type: "brochure", title: { en: "Z50P Product Brochure", zh: "Z50P 产品彩页" }, size: "6.8 MB", date: "2026-06-15" },
  { product: "H60", type: "manual", title: { en: "H60 Operations Guide", zh: "H60 操作指南" }, size: "15.2 MB", date: "2026-05-30" },
  { product: "I12", type: "software", title: { en: "EFT Ground Station 5.2 (Windows)", zh: "EFT 地面站 5.2（Windows）" }, size: "212 MB", date: "2026-09-01" },
  { product: "T5", type: "brochure", title: { en: "Pilot Training Program Overview", zh: "飞手培训项目介绍" }, size: "4.3 MB", date: "2026-04-11" },
];

/* ---------- NEWS ---------- */
window.NEWS = [
  { id: "z50p-launch", cat: "product", date: "2026-09-18", img: "heroAgri",
    title: { en: "EFT launches the Z50P, its largest-capacity spraying drone", zh: "EFT发布Z50P，史上容量最大的植保无人机" },
    excerpt: { en: "A 50 L tank, omnidirectional radar and a 3-minute payload swap headline the new flagship.", zh: "50升药箱、全向雷达与3分钟载荷切换成为新旗舰亮点。" } },
  { id: "expo-2026", cat: "company", date: "2026-08-04", img: "news",
    title: { en: "EFT showcases low-altitude economy solutions at the 2026 UAV Expo", zh: "EFT亮相2026无人机博览会，展示低空经济解决方案" },
    excerpt: { en: "Visitors flew the T5 trainer and explored heavy-lift logistics demos at our booth.", zh: "观众在展台体验T5训练机并参观重载物流演示。" } },
  { id: "training-centers", cat: "company", date: "2026-06-21", img: "scnTraining",
    title: { en: "Twelve new certified training centres open across Southeast Asia", zh: "东南亚新增十二家认证培训中心" },
    excerpt: { en: "The network now spans 30+ countries, with localised curricula in six languages.", zh: "培训网络覆盖30多个国家，提供六种语言的本地化课程。" } },
  { id: "power-inspection", cat: "industry", date: "2026-05-09", img: "heroIndustry",
    title: { en: "How utilities cut inspection time by 60% with the I12", zh: "电力企业如何借助I12将巡检时间缩短60%" },
    excerpt: { en: "A case study from a regional grid operator covering 1,200 km of transmission line.", zh: "某区域电网运营商1200公里输电线路的案例研究。" } },
];

/* ---------- ABOUT TIMELINE ---------- */
window.TIMELINE = [
  { year: "2015", text: { en: "Founded in Shenzhen by a team of flight-control engineers.", zh: "由飞控工程师团队在深圳创立。" } },
  { year: "2017", text: { en: "First agricultural spraying drone certified and shipped.", zh: "首款植保无人机通过认证并量产交付。" } },
  { year: "2020", text: { en: "Industry line launched: inspection and heavy-lift platforms.", zh: "推出行业产品线：巡检与重载平台。" } },
  { year: "2023", text: { en: "Pilot training academy opens; 100th patent granted.", zh: "飞手培训学院成立；获得第100项专利。" } },
  { year: "2026", text: { en: "Z30P / Z50P upgrade series; service network passes 1,000 partners.", zh: "Z30P / Z50P升级系列发布；服务网点突破1000家。" } },
];
