/* =====================================================================
   SHARED COMPONENTS
   Button, Pill, SectionHeading, Img (skeleton + blur-up), ImageCard,
   ProductCard, StatBand, TabCarousel, Breadcrumbs, PageHero,
   ContactForm, SearchOverlay, Navbar, Footer, Reveal.
   ===================================================================== */
const { useState, useEffect, useRef, useContext, createContext, useCallback, useMemo } = React;

/* ---------- i18n ---------- */
const LangCtx = createContext({ lang: "en", setLang: () => {} });
function useT() {
  const { lang, setLang } = useContext(LangCtx);
  const t = (k) => (window.LOCALES[lang] && window.LOCALES[lang][k]) || k;
  const L = (obj) => (obj == null ? "" : typeof obj === "string" ? obj : obj[lang] || obj.en);
  return { t, L, lang, setLang };
}

/* ---------- tiny hash router ---------- */
function parseHash() {
  const raw = (location.hash || "#/").slice(1) || "/";
  const [path, q] = raw.split("?");
  return { path: path || "/", query: new URLSearchParams(q || "") };
}
function useRoute() {
  const [r, setR] = useState(parseHash());
  useEffect(() => {
    const on = () => { setR(parseHash()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return r;
}
/* config paths may use "/agriculture#drones" — converted to a query so it works with hash routing */
const toHref = (p) => (p.startsWith("http") || p.startsWith("#") ? p : "#" + p.replace("#", "?sub="));
function Link({ to, href, children, ...rest }) {
  return <a href={href || toHref(to)} {...rest}>{children}</a>;
}

/* ---------- icons (simple strokes only) ---------- */
const Icon = ({ n, ...p }) => {
  const d = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    left: <path d="M15 6l-6 6 6 6" />,
    right: <path d="M9 6l6 6-6 6" />,
    down: <path d="M12 5v14M6 13l6 6 6-6" />,
    chev: <path d="M6 9l6 6 6-6" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    play: <path d="M7 5l12 7-12 7z" fill="currentColor" />,
    pause: <path d="M7 5v14M17 5v14" strokeWidth="3.5" />,
    dl: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  }[n];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{d}</svg>;
};

/* Flags drawn as simple shapes (rect/star) */
const Flag = ({ lang }) => lang === "zh" ? (
  <svg className="flag" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" fill="#DE2910" /><polygon points="9,5 10.2,8.6 14,8.6 11,10.8 12.1,14.4 9,12.2 5.9,14.4 7,10.8 4,8.6 7.8,8.6" fill="#FFDE00" /></svg>
) : (
  <svg className="flag" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" fill="#012169" /><path d="M0 0L30 30M30 0L0 30" stroke="#fff" strokeWidth="6" /><path d="M0 0L30 30M30 0L0 30" stroke="#C8102E" strokeWidth="2" /><path d="M15 0v30M0 15h30" stroke="#fff" strokeWidth="9" /><path d="M15 0v30M0 15h30" stroke="#C8102E" strokeWidth="5" /></svg>
);

/* ---------- Button / Pill ---------- */
function Button({ variant = "primary", size, to, href, arrow, children, ...rest }) {
  const cls = `btn btn-${variant}${size ? " btn-" + size : ""}`;
  const inner = <>{children}{arrow && <Icon n="arrow" className="arrow" />}</>;
  if (to || href) return <Link to={to} href={href} className={cls} {...rest}>{inner}</Link>;
  return <button className={cls} {...rest}>{inner}</button>;
}
const Pill = ({ to, light, children, ...r }) => to
  ? <Link to={to} className={"pill" + (light ? " pill-light" : "")} {...r}>{children}</Link>
  : <button className={"pill" + (light ? " pill-light" : "")} {...r}>{children}</button>;

/* ---------- Img: reads ASSETS slot, skeleton shimmer, blur-up, focal point ---------- */
function Img({ slot, className = "", eager, style, contain }) {
  const { L } = useT();
  const a = window.ASSETS[slot] || {};
  const [ok, setOk] = useState(false);
  const ref = useRef();
  useEffect(() => { if (ref.current && ref.current.complete && ref.current.naturalWidth) setOk(true); }, [slot]);
  return (
    <div className={`img ${ok ? "loaded" : ""} ${className}`} style={style}>
      <img ref={ref} src={a.src} alt={L(a.alt)} width={a.w} height={a.h}
        loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} decoding="async"
        style={{ objectPosition: a.focal, objectFit: contain ? "contain" : undefined }}
        onLoad={() => setOk(true)} />
    </div>
  );
}

/* ---------- Reveal on scroll (IntersectionObserver; no-op for reduced motion via CSS) ---------- */
function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...r }) {
  const ref = useRef();
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: delay + "ms" }} {...r}>{children}</Tag>;
}

/* ---------- SectionHeading ---------- */
const SectionHeading = ({ eyebrow, title, desc, left }) => (
  <Reveal className={"sh" + (left ? " left" : "")}>
    {eyebrow && <span className="eyebrow-g">{eyebrow}</span>}
    <h2>{title}</h2>
    {desc && <p>{desc}</p>}
  </Reveal>
);

/* ---------- Language switcher (persists to localStorage) ---------- */
function LangSwitch({ className = "" }) {
  const { lang, setLang } = useT();
  const next = lang === "en" ? "zh" : "en";
  return (
    <button className={"lang " + className} onClick={() => setLang(next)} aria-label={lang === "en" ? "切换到中文" : "Switch to English"}>
      <Flag lang={next} /> {next === "zh" ? "中文" : "EN"}
    </button>
  );
}

/* ---------- Logo ---------- */
const Logo = () => {
  const { L } = useT();
  return (
    <Link to="/" className="logo" aria-label={window.SITE.brand.short + " — home"}>
      <span className="logo-mark"><i /></span>
      <span>{window.SITE.brand.short}<small>{L(window.SITE.brand.name)}</small></span>
    </Link>
  );
};

/* ---------- Navbar ---------- */
function isActive(itemPath, cur) { return itemPath === "/" ? cur === "/" : cur === itemPath || cur.startsWith(itemPath + "/") || (itemPath === "/news" && cur.startsWith("/news")); }
function Navbar({ path, onSearch }) {
  const { t, L } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  useEffect(() => { const on = () => setScrolled(window.scrollY > 8); on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  useEffect(() => { setDrawer(false); setStoreOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; }, [drawer]);
  useEffect(() => { const k = (e) => { if (e.key === "Escape") { setDrawer(false); setStoreOpen(false); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  /* product pages light up their category */
  const prod = path.startsWith("/product/") && window.PRODUCTS.find(p => p.id === path.split("/")[2]);
  const cur = prod ? "/" + prod.category : path;
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-in wrap">
        <Logo />
        <nav aria-label="Primary">
          <ul className="nav-links">
            {window.SITE.nav.map((it) => (
              <li key={it.path} className={it.children ? "has-dd" : ""}>
                <Link to={it.path} className={"nav-link" + (isActive(it.path, cur) ? " active" : "")} aria-current={isActive(it.path, cur) ? "page" : undefined} aria-haspopup={it.children ? "true" : undefined}>
                  {L(it.label)}{it.children && <Icon n="chev" />}
                </Link>
                {it.children && (
                  <ul className="dropdown" role="menu">
                    {it.children.map((c) => <li key={c.path} role="none"><Link role="menuitem" to={c.path}>{L(c.label)}</Link></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={onSearch} aria-label={t("search")}><Icon n="search" /></button>
          <div className={"store has-dd" + (storeOpen ? " open" : "")} style={{ position: "relative" }}>
            <button className="btn btn-dark" aria-haspopup="true" aria-expanded={storeOpen} onClick={() => setStoreOpen(!storeOpen)}>
              {t("ourStore")} <Icon n="chev" style={{ width: 14, height: 14 }} />
            </button>
            <ul className="dropdown right" role="menu">
              {window.SITE.store.map((s) => <li key={s.href + L(s.label)} role="none"><a role="menuitem" href={s.href}>{L(s.label)}</a></li>)}
            </ul>
          </div>
          <LangSwitch className="lang-desk" />
          <button className="icon-btn hamburger" onClick={() => setDrawer(true)} aria-label={t("menu")} aria-expanded={drawer}><Icon n="menu" /></button>
        </div>
      </div>
      {drawer && (
        <div className="drawer page" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <div className="drawer-head"><Logo /><button className="icon-btn" onClick={() => setDrawer(false)} aria-label={t("close")} autoFocus><Icon n="x" /></button></div>
          <nav aria-label="Mobile">
            {window.SITE.nav.map((it) => (
              <div key={it.path}>
                <Link to={it.path} className={isActive(it.path, cur) ? "active" : ""}>{L(it.label)}<Icon n="right" style={{ width: 18, height: 18 }} /></Link>
                {it.children && <div className="sub">{it.children.map((c) => <Link key={c.path} to={c.path}>{L(c.label)}</Link>)}</div>}
              </div>
            ))}
          </nav>
          <div className="drawer-foot">
            <Button variant="dark" href={window.SITE.store[0].href}>{t("ourStore")}</Button>
            <LangSwitch />
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Search overlay (products, news, downloads) ---------- */
function SearchOverlay({ onClose }) {
  const { t, L } = useT();
  const [q, setQ] = useState("");
  const items = useMemo(() => [
    ...window.PRODUCTS.map(p => ({ k: t("products"), label: p.name + " — " + L(p.tagline), to: "/product/" + p.id })),
    ...window.NEWS.map(n => ({ k: t("newsTitle"), label: L(n.title), to: "/news/" + n.id })),
    ...window.DOWNLOADS.map(d => ({ k: t("downloads"), label: L(d.title), to: "/support" })),
  ], [L]);
  const res = q.trim() ? items.filter(i => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8) : items.slice(0, 5);
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  return (
    <div className="search-ov page" role="dialog" aria-modal="true" aria-label={t("search")} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-box">
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} aria-label={t("search")} />
        <ul className="search-res">
          {res.length ? res.map((r, i) => <li key={i}><Link to={r.to} onClick={onClose}><span>{r.label}</span><small>{r.k}</small></Link></li>)
            : <li style={{ padding: 16, color: "var(--muted)" }}>{t("noResults")}</li>}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { L } = useT();
  const S = window.SITE;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-top">
          <div><Logo /><p className="f-addr">{L(S.contact.address)}</p></div>
          <div className="f-phone"><span>{L(S.contact.phoneLabel)}</span><a href={"tel:" + S.contact.servicePhone.replace(/\D/g, "")}>{S.contact.servicePhone}</a></div>
        </div>
        <div className="f-cols">
          {S.footer.map((col) => (
            <nav key={col.title.en} aria-label={L(col.title)}>
              <h4>{L(col.title)}</h4>
              <ul>{col.links.map((l) => <li key={l.label.en}><Link to={l.path} href={l.href}>{L(l.label)}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="f-bot"><span>{L(S.copyright)}</span><LangSwitch /></div>
      </div>
    </footer>
  );
}

/* ---------- ImageCard (rounded image + gradient scrim + centered copy) ---------- */
const ImageCard = ({ slot, title, text, cta, to }) => (
  <Reveal className="icard">
    <Img slot={slot} /><div className="ov" />
    <div className="icard-body"><h3>{title}</h3><p>{text}</p><Button to={to} arrow>{cta}</Button></div>
  </Reveal>
);

/* ---------- ProductCard ---------- */
function ProductCard({ p, large }) {
  const { t, L } = useT();
  return (
    <article className={"pcard" + (large ? " lg" : "")}>
      {p.isNew && <span className="tag-new">NEW</span>}
      <h3><Link to={"/product/" + p.id} className="stretch">{p.name}</Link></h3>
      <p>{L(p.tagline)}</p>
      <Img slot={p.img} className="pimg" contain />
      <div className="row"><span className="btn btn-primary btn-sm" aria-hidden="true">{t("learnMore")} <Icon n="arrow" className="arrow" /></span></div>
    </article>
  );
}

/* ---------- CountUp + StatBand ---------- */
function CountUp({ to, suffix }) {
  const ref = useRef(); const [v, setV] = useState(0);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      if (reduce) return setV(to);
      const t0 = performance.now(), dur = 1600;
      const step = (now) => { const k = Math.min(1, (now - t0) / dur); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(ref.current); return () => io.disconnect();
  }, [to]);
  return <b ref={ref}>{v.toLocaleString()}<em>{suffix}</em></b>;
}
function StatBand({ title, cta, to = "/about", slot = "stats" }) {
  const { L } = useT();
  return (
    <section className="stats" aria-label={title}>
      <Img slot={slot} /><div className="ov" />
      <div className="stats-in">
        <Reveal as="h2">{title}</Reveal>
        <div className="stat-row">
          {window.SITE.stats.map((s) => <div className="stat" key={s.label.en}><CountUp to={s.value} suffix={s.suffix} /><span>{L(s.label)}</span></div>)}
        </div>
        {cta && <Button variant="primary" to={to} arrow>{cta}</Button>}
      </div>
    </section>
  );
}

/* ---------- TabCarousel: tabs + center-focus carousel ---------- */
function TabCarousel({ tabs, data }) {
  const { t, L } = useT();
  const [tab, setTab] = useState(tabs[1].key);
  const [i, setI] = useState(0);
  const [w, setW] = useState(0);
  const vp = useRef(); const touch = useRef(null);
  const slides = data[tab];
  useEffect(() => setI(0), [tab]);
  useEffect(() => { const m = () => vp.current && setW(vp.current.offsetWidth); m(); window.addEventListener("resize", m); return () => window.removeEventListener("resize", m); }, []);
  const go = (n) => setI((n + slides.length) % slides.length);
  /* slide width mirrors CSS flex-basis */
  const sw = w <= 720 ? w * 0.84 : Math.min(w * 0.64, 920); const gap = 24;
  const x = w / 2 - sw / 2 - i * (sw + gap);
  const onKeyTabs = (e) => {
    const idx = tabs.findIndex(x => x.key === tab);
    if (e.key === "ArrowRight") { setTab(tabs[(idx + 1) % tabs.length].key); e.preventDefault(); }
    if (e.key === "ArrowLeft") { setTab(tabs[(idx - 1 + tabs.length) % tabs.length].key); e.preventDefault(); }
  };
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Scenarios" onKeyDown={onKeyTabs}>
        {tabs.map((x) => <button key={x.key} id={"tab-" + x.key} role="tab" className="tab" aria-selected={tab === x.key} aria-controls="scn-panel" tabIndex={tab === x.key ? 0 : -1} onClick={() => setTab(x.key)}>{x.label}</button>)}
      </div>
      <div id="scn-panel" role="tabpanel" aria-labelledby={"tab-" + tab}>
        <div className="carousel" ref={vp} role="region" aria-roledescription="carousel" aria-label={tabs.find(x => x.key === tab).label}
          tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { if (touch.current == null) return; const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); touch.current = null; }}>
          <div className="fade-l" /><div className="fade-r" />
          <div className="track" style={{ transform: `translateX(${x}px)` }}>
            {slides.map((s, k) => {
              const side = k !== i;
              return (
                <div key={tab + k} className={"cslide" + (side ? " side" : "")} role="group" aria-roledescription="slide" aria-label={`${k + 1} / ${slides.length}`} aria-hidden={side}
                  onClick={side ? () => go(k) : undefined}>
                  <Img slot={s.img} /><div className="ov" />
                  {side && <span className={"side-arrow " + (k < i ? "l" : "r")}><Icon n={k < i ? "left" : "right"} /></span>}
                  <div className="tags">{window.SCENARIO_TAGS.map((tg) => <Pill key={tg.hash} to={s.path + "#" + tg.hash} tabIndex={side ? -1 : 0}>{L(tg.label)}</Pill>)}</div>
                  <div className="meta"><h3>{L(s.title)}</h3><p>{L(s.desc)}</p></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="c-ctrl">
          <button className="c-arrow" onClick={() => go(i - 1)} aria-label={t("prev")}><Icon n="left" /></button>
          <div className="dots">{slides.map((_, k) => <button key={k} className="dot" aria-current={k === i} aria-label={`${t("slide")} ${k + 1}`} onClick={() => setI(k)} />)}</div>
          <button className="c-arrow" onClick={() => go(i + 1)} aria-label={t("next")}><Icon n="right" /></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Breadcrumbs / PageHero / CTA ---------- */
const Breadcrumbs = ({ items, dark }) => (
  <nav aria-label="Breadcrumb"><ol className={"crumbs" + (dark ? " dark" : "")}>
    {items.map((c, k) => <li key={k}>{c.to && k < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
  </ol></nav>
);
function PageHero({ slot, title, sub, crumbs }) {
  return (
    <section className="phero">
      <Img slot={slot} eager /><div className="ov" />
      <div className="phero-in"><Breadcrumbs items={crumbs} /><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
    </section>
  );
}
function CTABand() {
  const { t } = useT();
  return (
    <Reveal className="cta-band">
      <div><h2>{t("ctaTitle")}</h2><p>{t("ctaText")}</p></div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button to="/contact" arrow>{t("contactQuote")}</Button>
        <Button variant="ghost-light" to="/support">{t("downloadCenter")}</Button>
      </div>
    </Reveal>
  );
}

/* ---------- ContactForm (client-side validation, no backend) ---------- */
function ContactForm({ topics }) {
  const { t } = useT();
  const [v, setV] = useState({ name: "", email: "", phone: "", company: "", topic: topics ? topics[0] : "", message: "" });
  const [err, setErr] = useState({}); const [sent, setSent] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = t("required");
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = t("invalidEmail");
    if (!v.message.trim()) er.message = t("required");
    setErr(er); if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <p className="ok-msg" role="status">{t("sent")}</p>;
  const F = ({ k, label, full, type = "text", area, req }) => (
    <div className={"field" + (full ? " full" : "")} data-err={err[k] ? "" : undefined}>
      <label htmlFor={"f-" + k}>{label}{req && " *"}</label>
      {area ? <textarea id={"f-" + k} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} />
        : <input id={"f-" + k} type={type} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} />}
      {err[k] && <div className="err">{err[k]}</div>}
    </div>
  );
  return (
    <form className="form" onSubmit={submit} noValidate>
      {F({ k: "name", label: t("name"), req: true })}
      {F({ k: "email", label: t("email"), type: "email", req: true })}
      {F({ k: "phone", label: t("phone"), type: "tel" })}
      {F({ k: "company", label: t("company") })}
      {topics && <div className="field full"><label htmlFor="f-topic">{t("topic")}</label><select id="f-topic" value={v.topic} onChange={set("topic")}>{topics.map(x => <option key={x}>{x}</option>)}</select></div>}
      {F({ k: "message", label: t("message"), full: true, area: true, req: true })}
      <div className="full"><Button type="submit" arrow>{t("send")}</Button></div>
    </form>
  );
}

Object.assign(window, { useState, useEffect, useRef, useContext, useCallback, useMemo, LangCtx, useT, useRoute, Link, Icon, Button, Pill, Img, Reveal, SectionHeading, LangSwitch, Logo, Navbar, SearchOverlay, Footer, ImageCard, ProductCard, StatBand, TabCarousel, Breadcrumbs, PageHero, CTABand, ContactForm, CountUp });
