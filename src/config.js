/* =====================================================================
   SITE CONFIG — the ONE file the client edits for brand, contact, nav,
   footer, stats and theme. Every bilingual string is { en, zh }.
   Maps 1:1 to src/config/site.ts in the Vite/TS build.
   ===================================================================== */
window.SITE = {
  brand: {
    name: { en: "Excellent Flight Technology", zh: "卓越飞行科技" },
    short: "EFT",
    tagline: { en: "Professional Drone Solution Supplier", zh: "专业无人机解决方案供应商" },
  },

  contact: {
    address: {
      en: "No. 88 Innovation Avenue, High-Tech Zone, Shenzhen, Guangdong, China",
      zh: "中国广东省深圳市高新区创新大道88号",
    },
    servicePhone: "400-888-6688",
    phoneLabel: { en: "Service Hotline", zh: "服务热线" },
    email: "service@eft-drone.com",
    hours: { en: "Mon – Sat, 8:30 – 18:00 (GMT+8)", zh: "周一至周六 8:30 – 18:00" },
  },

  /* Theme tokens — written to CSS variables at boot (see app.jsx).
     Change a colour here and the whole site follows. */
  theme: {
    green: "#2DB82D",
    greenHover: "#27A327",
    forest: "#0A2A0A",
    forest2: "#123A12",
    surround: "#EAEAEA",
    tint: "#F1F7EE",
    ink: "#121812",
    muted: "#5A665B",
  },

  /* NAVBAR — add / remove / rename / reorder freely.
     `children` renders a dropdown (mega-menu if it has `groups`). */
  nav: [
    { label: { en: "Home", zh: "首页" }, path: "/" },
    {
      label: { en: "Agriculture", zh: "农业" }, path: "/agriculture",
      children: [
        { label: { en: "Spraying Drones", zh: "植保无人机" }, path: "/agriculture#drones" },
        { label: { en: "Spreading Systems", zh: "播撒系统" }, path: "/agriculture#payloads" },
        { label: { en: "Airframes", zh: "机架" }, path: "/agriculture#frames" },
      ],
    },
    {
      label: { en: "Industry", zh: "行业" }, path: "/industry",
      children: [
        { label: { en: "Inspection", zh: "巡检" }, path: "/industry#drones" },
        { label: { en: "Heavy Lift & Logistics", zh: "重载物流" }, path: "/industry#payloads" },
      ],
    },
    { label: { en: "Training", zh: "培训" }, path: "/training" },
    { label: { en: "Support", zh: "服务支持" }, path: "/support" },
    { label: { en: "About EFT", zh: "关于EFT" }, path: "/about" },
    { label: { en: "News Center", zh: "新闻中心" }, path: "/news" },
    { label: { en: "Contact Us", zh: "联系我们" }, path: "/contact" },
  ],

  /* "Our Store" dropdown */
  store: [
    { label: { en: "Official Online Store", zh: "官方商城" }, href: "#/contact" },
    { label: { en: "Find a Dealer", zh: "查找经销商" }, href: "#/contact" },
    { label: { en: "Parts & Accessories", zh: "配件商城" }, href: "#/support" },
  ],

  /* FOOTER — six link columns */
  footer: [
    { title: { en: "Agriculture", zh: "农业" }, links: [
      { label: { en: "Z30P Spraying Drone", zh: "Z30P 植保机" }, path: "/product/z30p" },
      { label: { en: "Z50P Spraying Drone", zh: "Z50P 植保机" }, path: "/product/z50p" },
      { label: { en: "S40 Spreader", zh: "S40 播撒机" }, path: "/product/s40" },
    ]},
    { title: { en: "Industry", zh: "行业" }, links: [
      { label: { en: "H60 Heavy Lift", zh: "H60 重载机" }, path: "/product/h60" },
      { label: { en: "I12 Inspection", zh: "I12 巡检机" }, path: "/product/i12" },
      { label: { en: "Payloads", zh: "任务载荷" }, path: "/industry" },
    ]},
    { title: { en: "Training", zh: "培训" }, links: [
      { label: { en: "T5 Trainer", zh: "T5 训练机" }, path: "/product/t5" },
      { label: { en: "Pilot Courses", zh: "飞手课程" }, path: "/training" },
      { label: { en: "Simulator", zh: "模拟器" }, path: "/product/sim" },
    ]},
    { title: { en: "Support", zh: "服务支持" }, links: [
      { label: { en: "Download Center", zh: "下载中心" }, path: "/support" },
      { label: { en: "Convenient Services", zh: "便捷服务" }, path: "/support" },
      { label: { en: "Comments & Suggestions", zh: "意见反馈" }, path: "/support" },
    ]},
    { title: { en: "About Us", zh: "关于我们" }, links: [
      { label: { en: "Company Profile", zh: "公司简介" }, path: "/about" },
      { label: { en: "News Center", zh: "新闻中心" }, path: "/news" },
      { label: { en: "Contact Us", zh: "联系我们" }, path: "/contact" },
    ]},
    { title: { en: "Social Media", zh: "社交媒体" }, links: [
      { label: { en: "WeChat", zh: "微信" }, href: "#" },
      { label: { en: "YouTube", zh: "YouTube" }, href: "#" },
      { label: { en: "LinkedIn", zh: "领英" }, href: "#" },
    ]},
  ],

  /* STATS BAND */
  stats: [
    { value: 10, suffix: "+", label: { en: "Years of R&D", zh: "年研发经验" } },
    { value: 30, suffix: "+", label: { en: "Countries Served", zh: "服务国家" } },
    { value: 100, suffix: "+", label: { en: "Patents Granted", zh: "授权专利" } },
    { value: 1000, suffix: "+", label: { en: "Service Partners", zh: "服务网点" } },
  ],

  copyright: {
    en: "© 2026 Excellent Flight Technology Co., Ltd. All rights reserved.",
    zh: "© 2026 卓越飞行科技有限公司 版权所有",
  },
};
