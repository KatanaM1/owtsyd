export default function Hero({ onOpenBrief }) {
  return (
    <div>
      <section className="wrap hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="label">Web design &amp; graphic design</p>
          <h1 id="hero-title">
            Web design for <em>small businesses.</em>
          </h1>
          <p className="lede">
            We build and redesign mobile-first websites for businesses. Get a free redesign prototype within 48 hours.
          </p>
          <a 
            className="button accent" 
            href="#brief-form" 
            onClick={(e) => { e.preventDefault(); onOpenBrief(); }}
          >
            Get a Free Redesign Prototype <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="hero-visual">
          <div className="hero-grid" aria-hidden="true" />
          <img className="hero-window" src="/umbr-desktop.webp" alt="Desktop mockup of the UMBR fashion website" width="1440" height="900" fetchPriority="high" />
          <img className="hero-phone" src="/umbr-mobile.webp" alt="Mobile mockup of the UMBR fashion website" width="390" height="844" />
        </figure>
      </section>
    </div>
  )
}