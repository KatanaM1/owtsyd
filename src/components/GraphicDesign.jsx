import Merch from './Merch.jsx'

const GRAPHICS = [
  {
    src: '/graphic-logos.webp',
    alt: 'A collection of logo and wordmark designs',
    caption: 'Logos & identity',
  },
  {
    src: '/graphic-posters.webp',
    alt: 'Four illustrated event and promotional posters',
    caption: 'Posters & promotions',
  },
  {
    src: '/graphic-menus.webp',
    alt: 'A red restaurant menu set with coordinated food and drink layouts',
    caption: 'Menus & print',
  },
]

export default function GraphicDesign({ onOpenBrief }) {
  return (
    <section
      className="section graphic-design"
      id="graphic-design"
      aria-labelledby="graphic-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="label">Graphic design</p>
            <h2 id="graphic-title">From logos to merch.</h2>
          </div>
          <p>
            Brand identities, campaign graphics, posters, menus, packaging,
            and print materials.
          </p>
        </div>
        <div className="graphic-grid">
          {GRAPHICS.map((g) => (
            <figure key={g.src}>
              <img
                src={g.src}
                alt={g.alt}
                width={1152}
                height={648}
                loading="lazy"
              />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
        <Merch />
        <div className="graphic-actions">
          <button
            type="button"
            className="button accent"
            onClick={() => onOpenBrief('Graphic design')}
          >
            Discuss a Design Project <span aria-hidden="true">↗</span>
          </button>
          <a
            className="button outline"
            href="https://t.me/OWTSYD"
            target="_blank"
            rel="noopener"
          >
            More Work on Telegram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}