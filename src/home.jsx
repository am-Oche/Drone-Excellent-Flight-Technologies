/* =====================================================================
   HOME PAGE — sections replicate the reference in order:
   1 Hero · 2 Multi-Scenario · 3 Product grid · 4 Stats · 5 News/Contact
   ===================================================================== */

function Hero() {
  const { t, L } = useT();
  const slides = window.HERO_SLIDES;
  const DUR = 6000;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useMemo(() => matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const stopped = paused || hover || reduce;
  const timer = useRef();
  /* auto-advance — the CSS bar animation is the visible timer; JS mirrors it */
  useEffect(() => {
    if (stopped) return;
    timer.current = setTimeout(() => setI((i + 1) % slides.length), DUR);
    return () => clearTimeout(timer.current);
  }, [i, stopped]);
  const touch = useRef(null);
  const go = (n) => setI((n + slides.length) % slides.length);
  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Highlights"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { if (touch.current == null) return; const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); touch.current = null; }}>
      <div className="hero-media">
        {slides.map((s, k) => (
          <div key={k} className={"hero-slide" + (k === i ? " on" : "")} style={{ opacity: k === i ? 1 : 0 }} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} / ${slides.length}`}>
            <Img slot={s.img} eager={k === 0} />
          </div>
        ))}
        <div className="hero-scrim" />
        <div className="hero-copy" aria-live={stopped ? "polite" : "off"}>
          <h1 key={"h" + i} className="page">{L(slides[i].title)}</h1>
          <p key={"p" + i} className="page">{L(slides[i].sub)}</p>
          <div className="hero-bars">
            {slides.map((_, k) => (
              <button key={k + "-" + i} className={"hero-bar" + (k === i ? " on" : "") + (k < i ? " done" : "") + (stopped ? " paused" : "")} style={{ "--dur": DUR + "ms" }}
                onClick={() => setI(k)} aria-label={`${t("slide")} ${k + 1}`} aria-current={k === i}>
                <span><i /></span>
              </button>
            ))}
            <button className="hero-pause" onClick={() => setPaused(!paused)} aria-label={paused ? t("play") : t("pause")} aria-pressed={paused}>
              <Icon n={paused ? "play" : "pause"} />
            </button>
          </div>
        </div>
        {/* glass promo card (copy from reference) */}
        <div className="glass">
          <div>
            <div className="eyebrow">{t("newUpgrade")}</div>
            <h3>Z30P / Z50P</h3>
            <Button size="sm" to="/product/z30p" arrow>{t("learnMore")}</Button>
          </div>
          <Img slot="productA" contain />
        </div>
      </div>
      {/* scroll-down seated in the masked notch */}
      <a href="#scenarios" className="scroll-down" aria-label={t("scrollDown")}
        onClick={(e) => { e.preventDefault(); const el = document.getElementById("scenarios"); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" }); }}>
        <Icon n="down" />
      </a>
    </section>
  );
}

function HomePage() {
  const { t } = useT();
  const prods = window.PRODUCTS;
  /* grid order: 2 large + 3 small (edit in data.js via `featured`) */
  const grid = [prods.find(p => p.id === "z30p"), prods.find(p => p.id === "z50p"), prods.find(p => p.id === "h60"), prods.find(p => p.id === "t5"), prods.find(p => p.id === "s40")];
  return (
    <div className="page">
      <Hero />

      {/* 2 — Multi-Scenario (white) */}
      <section id="scenarios" className="section" style={{ paddingTop: "clamp(80px, 10vw, 128px)" }}>
        <div className="wrap">
          <SectionHeading title={t("scnTitle")} desc={t("scnDesc")} />
          <TabCarousel data={window.SCENARIOS} tabs={[
            { key: "training", label: t("tabTraining") },
            { key: "agriculture", label: t("tabAgriculture") },
            { key: "industry", label: t("tabIndustry") },
          ]} />
        </div>
      </section>

      {/* 3 — Product intro + grid (light green tint for rhythm) */}
      <section className="section bg-tint">
        <div className="wrap">
          <Reveal as="h2" className="ph">{t("prodH1")}<span>{t("prodH2")}</span></Reveal>
          <div className="pgrid">
            {grid.map((p, k) => <Reveal key={p.id} delay={k * 70}><ProductCard p={p} large={k < 2} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* 4 — Stats band (dark) */}
      <div style={{ paddingTop: "clamp(56px, 8vw, 100px)" }}>
        <StatBand title={t("statsTitle")} cta={t("statsCta")} />
      </div>

      {/* 5 — News / Contact (white) */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap icards">
          <ImageCard slot="news" title={t("newsTitle")} text={t("newsText")} cta={t("viewNews")} to="/news" />
          <ImageCard slot="contact" title={t("contactTitle")} text={t("contactText")} cta={t("getInTouch")} to="/contact" />
        </div>
      </section>
    </div>
  );
}
window.HomePage = HomePage;
