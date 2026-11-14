import Merch from './Merch.jsx'

const GRAPHICS = [
  { src: '/graphic-logos.webp', alt: 'A collection of logo and wordmark designs', caption: 'Logos & identity' },
  { src: '/graphic-posters.webp', alt: 'Four event posters', caption: 'Posters & promotions' },
  { src: '/graphic-menus.webp', alt: 'A red restaurant menu set', caption: 'Menus & print' },
]

export default function GraphicDesign({ onOpenBrief }) {
  return (
    <section className="section graphic-design" id="graphic-design" aria-labelledby="graphic-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="label">Graphic design</p>
            <h2 id="graphic-title">From logos to merch.</h2>
          </div>
          <p>From a single poster to a full brand identity, we take on projects of any complexity. We design campaigns, menus, packaging, print, and merch.</p>
        </div>
        
        <div className="design-options">
          <article>
            <h3>One-off projects</h3>
            <p>Commission a single piece or a full set of deliverables. We agree on scope and price up front.</p>
          </article>
          <article>
            <h3>Monthly design support</h3>
            <p>A monthly subscription for teams with ongoing design needs. We agree on priorities and a scope that fits your workload.</p>
          </article>
        </div>

        <div className="graphic-grid">
          {GRAPHICS.map((g) => (
            <figure key={g.src}>
              <img src={g.src} alt={g.alt} width="1152" height="648" loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
        <Merch />
        <div className="graphic-actions">
          <a className="button accent" href="#brief-form" onClick={(e) => { e.preventDefault(); onOpenBrief('Graphic design'); }}>
            Discuss a Design Project <span aria-hidden="true">↗</span>
          </a>
          <a className="button outline" href="https://t.me/OWTSYD" target="_blank" rel="noopener">
            More Work on Telegram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}