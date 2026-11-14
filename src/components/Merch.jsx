const ITEMS = [
  {
    id: 'hkg',
    title: 'HKG Eurofighter',
    cover: '/merch-hkg.webp',
    coverClass: 'merch-cover-hkg',
    coverAlt:
      'HKG Eurofighter T-shirt with a lime race-car graphic across the back',
    detail: '/merch-hkg-detail.webp',
    detailAlt: 'Front and back layouts of the Eurofighter T-shirt',
    width: 880,
    height: 1100,
  },
  {
    id: 'adrr-gt',
    title: 'ADRR × Gaijin Tuned',
    cover: '/merch-adrr-gt.webp',
    coverAlt:
      'Two models wearing the front and back of the black ADRR and Gaijin Tuned collaboration T-shirt',
    detail: '/merch-adrr-gt-detail.webp',
    detailAlt: 'Front, back, and sleeve print placements for the collaboration T-shirt',
    width: 1024,
    height: 768,
  },
  {
    id: 'adr-racing',
    title: 'ADR Racing Team',
    cover: '/merch-adr-racing.webp',
    coverAlt:
      'ADR Racing team apparel with track-inspired graphics and the number 92 on the back',
    detail: '/merch-adr-racing-detail.webp',
    detailAlt: 'Front and back layouts for two ADR Racing Team T-shirts',
    width: 1024,
    height: 768,
  },
]

export default function Merch() {
  return (
    <section className="merch" aria-labelledby="merch-title">
      <h3 id="merch-title">Merch projects</h3>
      <div className="merch-grid">
        {ITEMS.map((item) => (
          <article className="merch-project" key={item.id}>
            <img
              className={`merch-cover ${item.coverClass ?? ''}`.trim()}
              src={item.cover}
              alt={item.coverAlt}
              width={item.width}
              height={item.height}
              loading="lazy"
            />
            <h4>{item.title}</h4>
            <details>
              <summary>See garment layouts</summary>
              <img
                src={item.detail}
                alt={item.detailAlt}
                width={item.width}
                height={item.height}
                loading="lazy"
              />
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}