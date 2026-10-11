/* =====================================================================
   INNER PAGES — Category (Agriculture/Industry/Training), Product detail,
   Support, About, News list, News article, Contact, 404.
   ===================================================================== */

/* ---------- Category page copy (EDITABLE) ---------- */
const CATEGORY = {
  agriculture: {
    hero: "heroAgri",
    title: { en: "Agriculture", zh: "农业植保" },
    sub: { en: "Spraying, spreading and mapping drones that cover more hectares with less water and chemical.", zh: "以更少的水与药剂覆盖更多面积的喷洒、播撒与测绘无人机。" },
    introH: { en: "Precision that pays back every season", zh: "精准作业，每一季都看得见回报" },
    intro: { en: "EFT agricultural drones combine centrifugal atomisation, terrain-following radar and route planning so a single operator can treat up to 21 hectares an hour. Every platform is IP67-rated, foldable for transport and supported by local service partners.", zh: "EFT农业无人机结合离心雾化、仿地雷达与航线规划，单人每小时可作业高达21公顷。全系IP67防护、可折叠运输，并由本地服务网点提供支持。" },
    feats: [
      { h: { en: "Uniform droplets", zh: "均匀雾滴" }, p: { en: "50–500 μm adjustable droplets reduce drift and improve canopy penetration.", zh: "50–500μm可调雾滴，减少飘移并提升冠层穿透。" } },
      { h: { en: "Terrain following", zh: "仿地飞行" }, p: { en: "Millimetre-wave radar holds height on terraces and slopes up to 45°.", zh: "毫米波雷达在梯田及45°坡地保持定高。" } },
      { h: { en: "One-tap missions", zh: "一键作业" }, p: { en: "Import field boundaries or prescription maps and launch from the controller.", zh: "导入地块边界或处方图，遥控器一键起飞。" } },
    ],
  },
  industry: {
    hero: "heroIndustry",
    title: { en: "Industry", zh: "行业应用" },
    sub: { en: "Inspection, heavy-lift and logistics platforms built for demanding, repeatable work.", zh: "为高强度、可重复任务打造的巡检、重载与物流平台。" },
    introH: { en: "Platforms that keep critical assets running", zh: "守护关键资产稳定运行的平台" },
    intro: { en: "From grid inspection to mountain cargo delivery, EFT industrial drones feature redundant power, long-range transmission and an open payload interface so integrators can build exactly the system a mission needs.", zh: "从电网巡检到山区货运，EFT行业无人机具备冗余动力、远距离图传与开放载荷接口，帮助集成商构建任务所需的系统。" },
    feats: [
      { h: { en: "Redundant by design", zh: "冗余设计" }, p: { en: "Dual IMUs, dual GNSS and battery redundancy for safe operation over people and assets.", zh: "双IMU、双GNSS与电池冗余，保障作业安全。" } },
      { h: { en: "Open payload SDK", zh: "开放载荷SDK" }, p: { en: "Integrate cameras, LiDAR, winches and custom sensors on a universal rail.", zh: "在通用导轨上集成相机、激光雷达、绞盘与定制传感器。" } },
      { h: { en: "15 km transmission", zh: "15公里图传" }, p: { en: "Encrypted triple-band link keeps 1080p video stable at range.", zh: "加密三频链路，远距离稳定传输1080p画面。" } },
    ],
  },
  training: {
    hero: "heroTraining",
    title: { en: "Training", zh: "飞手培训" },
    sub: { en: "Trainer drones, simulators and certified curricula that turn beginners into licensed pilots.", zh: "训练机、模拟器与认证课程，让新手成为持证飞手。" },
    introH: { en: "A complete path from first hover to licence", zh: "从首次悬停到考取执照的完整路径" },
    intro: { en: "EFT Academy partners with schools and service centres to deliver theory, simulator and field sessions on hardware students will actually fly at work. Instructors can take over any trainer instantly with a linked controller.", zh: "EFT学院与院校及服务中心合作，提供理论、模拟与外场课程，学员使用的正是日后作业的机型。教练可通过联控遥控器随时接管训练机。" },
    feats: [
      { h: { en: "Instructor takeover", zh: "教练接管" }, p: { en: "Dual-controller link lets instructors recover any situation in one switch.", zh: "双遥控联控，一键接管化解任何状况。" } },
      { h: { en: "Exam-mode simulator", zh: "考试模式模拟器" }, p: { en: "Scoring aligned with licensing tests, plus agriculture and inspection missions.", zh: "评分与考证标准一致，并含农业与巡检任务。" } },
      { h: { en: "Certified centres", zh: "认证中心" }, p: { en: "Train locally at partner centres in 30+ countries.", zh: "在30多个国家的合作中心就近培训。" } },
    ],
  },
};

function CategoryPage({ cat, query }) {
  const { t, L } = useT();
  const c = CATEGORY[cat];
  const [sub, setSub] = useState(query.get("sub") || "all");
  useEffect(() => setSub(query.get("sub") || "all"), [query.get("sub")]);
  const items = window.PRODUCTS.filter(p => p.category === cat && (sub === "all" || p.sub === sub));
  const subs = ["all", ...new Set(window.PRODUCTS.filter(p => p.category === cat).map(p => p.sub))];
  return (
    <div className="page">
      <PageHero slot={c.hero} title={L(c.title)} sub={L(c.sub)} crumbs={[{ label: t("home"), to: "/" }, { label: L(c.title) }]} />
      <section className="section wrap"><Reveal className="intro"><h2>{L(c.introH)}</h2><p>{L(c.intro)}</p></Reveal></section>
      <section className="section bg-tint" id="products">
        <div className="wrap">
          <SectionHeading left title={t("products")} />
          <div className="filters" role="group" aria-label={t("filterType")}>
            {subs.map(s => <Pill light key={s} aria-pressed={sub === s} onClick={() => setSub(s)}>{t(s)}</Pill>)}
          </div>
          <div className="grid3">{items.map((p, k) => <Reveal key={p.id} delay={k * 60}><ProductCard p={p} /></Reveal>)}</div>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeading eyebrow={t("whyEft")} title={L(c.introH)} />
        <div className="grid3">{c.feats.map((f, k) => <Reveal key={k} delay={k * 80} className="feat"><div className="num">0{k + 1}</div><h3>{L(f.h)}</h3><p>{L(f.p)}</p></Reveal>)}</div>
      </section>
      <CTABand />
    </div>
  );
}

/* ---------- Product detail ---------- */
function ProductPage({ id }) {
  const { t, L, lang } = useT();
  const p = window.PRODUCTS.find(x => x.id === id);
  const [g, setG] = useState(0);
  useEffect(() => setG(0), [id]);
  if (!p) return <NotFound />;
  /* gallery: product slot + other studio slots — replace with 4–5 angles of the same product */
  const gallery = [p.img, ...["productA", "productB", "productC"].filter(s => s !== p.img)].slice(0, 4);
  const cat = CATEGORY[p.category];
  const related = window.PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3);
  const dls = window.DOWNLOADS.filter(d => d.product === p.name);
  return (
    <div className="page">
      <section className="wrap" style={{ paddingTop: 24 }}>
        <Breadcrumbs dark items={[{ label: t("home"), to: "/" }, { label: L(cat.title), to: "/" + p.category }, { label: p.name }]} />
        <div className="pd" style={{ marginTop: 16 }}>
          <div>
            <Img slot={gallery[g]} className="gal-main" eager contain key={gallery[g]} />
            <div className="gal-thumbs">{gallery.map((s, k) => <button key={s} aria-current={k === g} aria-label={`${p.name} view ${k + 1}`} onClick={() => setG(k)}><Img slot={s} contain /></button>)}</div>
          </div>
          <div>
            {p.isNew && <span className="eyebrow-g">{t("newUpgrade")}</span>}
            <h1>{p.name}</h1>
            <p className="tagline">{L(p.tagline)}</p>
            <h2 style={{ fontSize: "var(--fs-lg)", marginBottom: 8 }}>{t("keySpecs")}</h2>
            <table className="spec"><tbody>{p.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <Button to="/contact" arrow>{t("contactQuote")}</Button>
              <Button variant="outline" href="#dl">{t("downloads")}</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap two">
          <Reveal className="card"><h2 style={{ fontSize: "var(--fs-xl)", marginBottom: 20 }}>{t("features")}</h2><ul className="checklist">{p.features[lang].map(f => <li key={f}>{f}</li>)}</ul></Reveal>
          <Reveal className="card" id="dl"><h2 style={{ fontSize: "var(--fs-xl)", marginBottom: 20 }}>{t("downloads")}</h2>
            {dls.length ? <DownloadList items={dls} /> : <p style={{ color: "var(--muted)" }}>{t("noResults")} <Link to="/support" style={{ color: "var(--green)", fontWeight: 600 }}>{t("downloadCenter")} →</Link></p>}
          </Reveal>
        </div>
      </section>
      {related.length > 0 && <section className="section bg-tint"><div className="wrap"><SectionHeading left title={t("related")} /><div className="grid3">{related.map(r => <ProductCard key={r.id} p={r} />)}</div></div></section>}
      <div style={{ paddingTop: "clamp(56px,8vw,100px)" }}><CTABand /></div>
    </div>
  );
}

function DownloadList({ items }) {
  const { t, L } = useT();
  return (
    <ul className="dl">{items.map((d, k) => (
      <li key={k}><span className="type">{t(d.type)}</span><span><b style={{ fontWeight: 600 }}>{L(d.title)}</b><br /><span className="size">{d.product} · {d.date}</span></span><span className="size">{d.size}</span>
        <Button variant="outline" size="sm" href="#/support" aria-label={t("download") + " " + L(d.title)}><Icon n="dl" style={{ width: 14, height: 14 }} />{t("download")}</Button></li>
    ))}</ul>
  );
}

/* ---------- Support ---------- */
function SupportPage() {
  const { t, L, lang } = useT();
  const [prod, setProd] = useState("all"); const [type, setType] = useState("all");
  const prods = [...new Set(window.DOWNLOADS.map(d => d.product))];
  const types = [...new Set(window.DOWNLOADS.map(d => d.type))];
  const items = window.DOWNLOADS.filter(d => (prod === "all" || d.product === prod) && (type === "all" || d.type === type));
  const services = [
    { h: { en: "Warranty & Repair", zh: "保修与维修" }, p: { en: "Register your aircraft and track repairs online. Standard 12-month warranty on airframes.", zh: "在线注册设备并跟踪维修进度，机身标准保修12个月。" } },
    { h: { en: "Find a Service Point", zh: "查找服务网点" }, p: { en: "1,000+ partners provide parts, batteries and same-week repairs in season.", zh: "1000多家合作网点提供配件、电池及农忙季当周维修。" } },
    { h: { en: "Remote Diagnostics", zh: "远程诊断" }, p: { en: "Upload flight logs from the app and get an engineer's assessment within 24 hours.", zh: "通过App上传飞行日志，24小时内获得工程师评估。" } },
  ];
  return (
    <div className="page">
      <PageHero slot="stats" title={L({ en: "Service & Support", zh: "服务与支持" })} sub={L({ en: "Manuals, firmware and real people ready to help you stay in the air.", zh: "手册、固件，以及随时帮您保持作业的专业团队。" })} crumbs={[{ label: t("home"), to: "/" }, { label: t("downloadCenter") }]} />
      <section className="section wrap" id="downloads">
        <SectionHeading left title={t("downloadCenter")} />
        <div className="filters">
          <select className="sel" value={prod} onChange={e => setProd(e.target.value)} aria-label={t("products")}><option value="all">{t("all")} — {t("products")}</option>{prods.map(p => <option key={p}>{p}</option>)}</select>
          <select className="sel" value={type} onChange={e => setType(e.target.value)} aria-label={t("filterType")}><option value="all">{t("all")} — {t("filterType")}</option>{types.map(x => <option key={x} value={x}>{t(x)}</option>)}</select>
        </div>
        {items.length ? <DownloadList items={items} /> : <p>{t("noResults")}</p>}
      </section>
      <section className="section bg-tint"><div className="wrap">
        <SectionHeading left title={t("services")} />
        <div className="grid3">{services.map((s, k) => <Reveal key={k} delay={k * 80} className="feat"><div className="num">0{k + 1}</div><h3>{L(s.h)}</h3><p>{L(s.p)}</p></Reveal>)}</div>
      </div></section>
      <section className="section wrap"><div className="two">
        <div><SectionHeading left title={t("comments")} desc={L({ en: "Tell us what works and what doesn't. Every message is read by our product team.", zh: "告诉我们哪些好用、哪些需要改进，每条留言都会由产品团队阅读。" })} /></div>
        <div className="card"><ContactForm topics={lang === "zh" ? ["产品建议", "服务反馈", "其他"] : ["Product suggestion", "Service feedback", "Other"]} /></div>
      </div></section>
    </div>
  );
}

/* ---------- About ---------- */
function AboutPage() {
  const { t, L } = useT();
  return (
    <div className="page">
      <PageHero slot="about" title={L({ en: "About EFT", zh: "关于EFT" })} sub={L(window.SITE.brand.tagline)} crumbs={[{ label: t("home"), to: "/" }, { label: L({ en: "About EFT", zh: "关于EFT" }) }]} />
      <section className="section wrap"><Reveal className="intro">
        <h2>{t("ourStory")}</h2>
        <div style={{ display: "grid", gap: 16 }}>
          <p>{L({ en: "Excellent Flight Technology was founded in 2015 by flight-control engineers who believed drones could do far more than take pictures. Our first spraying drone shipped two years later; today EFT designs agriculture, industry and training systems used in more than 30 countries.", zh: "卓越飞行科技由一群飞控工程师于2015年创立，他们相信无人机的价值远不止航拍。两年后首款植保无人机量产交付；如今EFT的农业、行业与培训系统已服务30多个国家。" })}</p>
          <p>{L({ en: "We build everything in-house — flight controllers, power systems, airframes and software — so each part is designed to work with the others and we can support it for its whole service life.", zh: "我们自主研发飞控、动力系统、机架与软件，确保各部件协同设计，并在整个生命周期内提供支持。" })}</p>
        </div>
      </Reveal></section>
      <StatBand title={t("statsTitle")} />
      <section className="section"><div className="wrap">
        <div className="bg-dark" style={{ borderRadius: "var(--r-lg)", padding: "clamp(32px,5vw,64px)" }}>
          <h2 style={{ fontSize: "var(--fs-2xl)", marginBottom: 40 }}>{t("milestones")}</h2>
          <ol className="tl">{window.TIMELINE.map(m => <li key={m.year}><b>{m.year}</b><p>{L(m.text)}</p></li>)}</ol>
        </div>
      </div></section>
      <section className="section bg-tint"><div className="wrap">
        <SectionHeading title={t("certifications")} desc={L({ en: "Certificates will be supplied by EFT.", zh: "资质证书由EFT提供后替换。" })} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
          {["ISO 9001", "ISO 14001", "CE", "FCC", "CAAC", "IP67 Test"].map(c => <div key={c} className="cert">{c}<br />certificate scan</div>)}
        </div>
      </div></section>
    </div>
  );
}

/* ---------- News ---------- */
function NewsPage() {
  const { t, L } = useT();
  const [cat, setCat] = useState("all");
  const cats = ["all", "product", "company", "industry"];
  const label = { all: t("catAll"), product: t("catProduct"), company: t("catCompany"), industry: t("catIndustry") };
  const items = window.NEWS.filter(n => cat === "all" || n.cat === cat);
  return (
    <div className="page">
      <PageHero slot="news" title={t("newsTitle")} sub={t("newsText")} crumbs={[{ label: t("home"), to: "/" }, { label: t("newsTitle") }]} />
      <section className="section wrap">
        <div className="filters" role="group" aria-label="Category">{cats.map(c => <Pill light key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{label[c]}</Pill>)}</div>
        <div className="grid3">{items.map((n, k) => (
          <Reveal key={n.id} delay={k * 60} as="article" className="ncard">
            <Img slot={n.img} />
            <div className="ncard-b"><time dateTime={n.date}>{n.date} · {label[n.cat]}</time><h3><Link to={"/news/" + n.id} className="stretch-n">{L(n.title)}</Link></h3><p>{L(n.excerpt)}</p></div>
            <Link to={"/news/" + n.id} aria-hidden="true" tabIndex={-1} style={{ position: "absolute", inset: 0 }} />
          </Reveal>
        ))}</div>
      </section>
    </div>
  );
}
function ArticlePage({ id }) {
  const { t, L } = useT();
  const n = window.NEWS.find(x => x.id === id);
  if (!n) return <NotFound />;
  return (
    <div className="page"><article className="section wrap"><div className="article">
      <Breadcrumbs dark items={[{ label: t("home"), to: "/" }, { label: t("newsTitle"), to: "/news" }, { label: L(n.title) }]} />
      <time className="meta-line" dateTime={n.date}>{n.date}</time>
      <h1>{L(n.title)}</h1>
      <p style={{ fontSize: "var(--fs-lg)", color: "var(--ink)" }}>{L(n.excerpt)}</p>
      <Img slot={n.img} eager />
      <p>{L({ en: "This article is placeholder copy for the news template. Replace it in data.js with the full story — paragraphs, quotes and images are all supported by the article layout.", zh: "本文为新闻模板的占位内容。请在 data.js 中替换为完整报道，文章布局支持段落、引用与图片。" })}</p>
      <p>{L({ en: "EFT continues to invest in research, local service and pilot training so customers can adopt drone operations with confidence. For media enquiries, contact our communications team through the Contact page.", zh: "EFT持续投入研发、本地服务与飞手培训，帮助客户放心开展无人机作业。媒体垂询请通过联系我们页面与品牌团队联系。" })}</p>
      <Button variant="outline" to="/news" style={{ marginTop: 12 }}>← {t("backToNews")}</Button>
    </div></article></div>
  );
}

/* ---------- Contact ---------- */
function ContactPage() {
  const { t, L } = useT();
  const C = window.SITE.contact;
  return (
    <div className="page">
      <PageHero slot="contact" title={t("contactTitle")} sub={t("contactText")} crumbs={[{ label: t("home"), to: "/" }, { label: t("contactTitle") }]} />
      <section className="section wrap"><div className="two">
        <div className="card"><h2 style={{ fontSize: "var(--fs-xl)", marginBottom: 24 }}>{t("contactQuote")}</h2><ContactForm /></div>
        <div style={{ display: "grid", gap: "var(--gutter)", alignContent: "start" }}>
          <div className="card bg-dark" style={{ border: 0 }}>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: "var(--fs-sm)" }}>{L(C.phoneLabel)}</p>
            <a href={"tel:" + C.servicePhone.replace(/\D/g, "")} style={{ fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 700, display: "block", margin: "4px 0 20px" }}>{C.servicePhone}</a>
            <dl style={{ display: "grid", gap: 14, margin: 0 }}>
              <div><dt style={{ fontSize: 12, opacity: .7 }}>{t("address")}</dt><dd style={{ margin: 0 }}>{L(C.address)}</dd></div>
              <div><dt style={{ fontSize: 12, opacity: .7 }}>{t("email")}</dt><dd style={{ margin: 0 }}><a href={"mailto:" + C.email}>{C.email}</a></dd></div>
              <div><dt style={{ fontSize: 12, opacity: .7 }}>{t("hours")}</dt><dd style={{ margin: 0 }}>{L(C.hours)}</dd></div>
            </dl>
          </div>
          <div className="map-ph" role="img" aria-label={t("map")}>map embed — client to supply (Google / AMap)</div>
        </div>
      </div></section>
    </div>
  );
}

/* ---------- 404 ---------- */
function NotFound() {
  const { t } = useT();
  return <section className="page wrap nf"><b>404</b><h1 style={{ fontSize: "var(--fs-2xl)", marginTop: 16 }}>{t("notFound")}</h1><p style={{ color: "var(--muted)", margin: "12px 0 28px" }}>{t("notFoundText")}</p><Button to="/" arrow>{t("backHome")}</Button></section>;
}

Object.assign(window, { CATEGORY, CategoryPage, ProductPage, SupportPage, AboutPage, NewsPage, ArticlePage, ContactPage, NotFound });
