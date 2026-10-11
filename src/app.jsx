/* =====================================================================
   APP SHELL — routes, SEO meta, theme tokens, language persistence.
   Add a page = one entry in ROUTES (+ optional nav entry in config.js).
   ===================================================================== */
const ROUTES = [
  { match: /^\/$/, render: () => <HomePage />, seo: { en: ["Professional Drone Solution Supplier", "EFT designs agricultural, industrial and training drones."], zh: ["专业无人机解决方案供应商", "EFT研发农业、行业与培训无人机。"] } },
  { match: /^\/(agriculture|industry|training)$/, render: (m, q) => <CategoryPage cat={m[1]} query={q} />, seo: (m) => ({ en: [CATEGORY[m[1]].title.en, CATEGORY[m[1]].sub.en], zh: [CATEGORY[m[1]].title.zh, CATEGORY[m[1]].sub.zh] }) },
  { match: /^\/product\/([\w-]+)$/, render: (m) => <ProductPage id={m[1]} />, seo: (m) => { const p = PRODUCTS.find(x => x.id === m[1]); return p ? { en: [p.name, p.tagline.en], zh: [p.name, p.tagline.zh] } : null; } },
  { match: /^\/support$/, render: () => <SupportPage />, seo: { en: ["Support & Downloads", "Manuals, firmware and service for EFT drones."], zh: ["服务支持", "EFT无人机手册、固件与服务。"] } },
  { match: /^\/about$/, render: () => <AboutPage />, seo: { en: ["About EFT", "Our story, milestones and certifications."], zh: ["关于EFT", "品牌故事、发展历程与资质。"] } },
  { match: /^\/news$/, render: () => <NewsPage />, seo: { en: ["News Center", "Product launches and company news."], zh: ["新闻中心", "新品发布与企业动态。"] } },
  { match: /^\/news\/([\w-]+)$/, render: (m) => <ArticlePage id={m[1]} />, seo: (m) => { const n = NEWS.find(x => x.id === m[1]); return n ? { en: [n.title.en, n.excerpt.en], zh: [n.title.zh, n.excerpt.zh] } : null; } },
  { match: /^\/contact$/, render: () => <ContactPage />, seo: { en: ["Contact Us", "Quotes, dealers and after-sales service."], zh: ["联系我们", "报价、经销商与售后服务。"] } },
];

function setMeta(name, content, prop) {
  let el = document.head.querySelector(`meta[${prop ? "property" : "name"}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(prop ? "property" : "name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function App() {
  const [lang, setLangState] = useState(() => localStorage.getItem("eft-lang") || "en");
  const setLang = (l) => { setLangState(l); localStorage.setItem("eft-lang", l); };
  const [searchOpen, setSearchOpen] = useState(false);
  const { path, query } = useRoute();

  /* theme tokens from config */
  useEffect(() => {
    const th = SITE.theme, r = document.documentElement.style;
    r.setProperty("--green", th.green); r.setProperty("--green-hover", th.greenHover); r.setProperty("--forest", th.forest);
    r.setProperty("--forest-2", th.forest2); r.setProperty("--surround", th.surround); r.setProperty("--tint", th.tint);
    r.setProperty("--ink", th.ink); r.setProperty("--muted", th.muted);
  }, []);

  let page = <NotFound />, seo = { en: ["Page not found", ""], zh: ["页面未找到", ""] };
  for (const rt of ROUTES) {
    const m = path.match(rt.match);
    if (m) { page = rt.render(m, query); seo = (typeof rt.seo === "function" ? rt.seo(m) : rt.seo) || seo; break; }
  }
  useEffect(() => {
    const [title, desc] = seo[lang];
    const full = `${title} | ${SITE.brand.short} — ${SITE.brand.name[lang]}`;
    document.title = full; document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    setMeta("description", desc); setMeta("og:title", full, true); setMeta("og:description", desc, true); setMeta("og:type", "website", true);
  }, [path, lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main").focus(); }}>Skip to content</a>
      <div className="frame">
        <Navbar path={path} onSearch={() => setSearchOpen(true)} />
        <main id="main" tabIndex={-1} key={path} style={{ outline: "none", paddingTop: 4 }}>{page}</main>
        <Footer />
      </div>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
