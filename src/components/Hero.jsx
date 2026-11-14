export default function Hero({ onOpenBrief }) {
  return (
    <div className="blue">
      <section className="wrap hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="label"><i></i> New websites &amp; redesigns</p>
          <h1 id="hero-title">
            Premium Web Design for <em>U.S. Small Businesses.</em>
          </h1>
          <p className="lede">
            We turn outdated websites into mobile-first experiences built for bookings.
            See a redesign concept in 48 hours.
          </p>
          <button
            type="button"
            className="button accent"
            onClick={() => onOpenBrief()}
          >
            Get a Free Redesign Concept <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-window" />
          <div className="hero-phone" />
        </div>
      </section>
    </div>
  )
}