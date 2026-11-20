import { useState } from 'react'
import GalleryModal from './GalleryModal.jsx'

const hkgModules = import.meta.glob('/src/assets/gallery/merch/hkg/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })
const adrrGtModules = import.meta.glob('/src/assets/gallery/merch/adrr-gt/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })
const adrRacingModules = import.meta.glob('/src/assets/gallery/merch/adr-racing/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

const formatImages = (modules) => {
  return shuffle(Object.values(modules)).map((src, i) => ({
    src,
    alt: `Garment image ${i + 1}`
  }))
}

const ITEMS = [
  {
    id: 'hkg',
    title: 'HKG Eurofighter',
    cover: '/merch-hkg.webp',
    coverClass: 'merch-cover-hkg',
    coverAlt: 'HKG Eurofighter T-shirt',
    images: formatImages(hkgModules)
  },
  {
    id: 'adrr-gt',
    title: 'ADRR × Gaijin Tuned',
    cover: '/merch-adrr-gt.jfif',
    coverAlt: 'ADRR and Gaijin Tuned T-shirt',
    images: formatImages(adrrGtModules)
  },
  {
    id: 'adr-racing',
    title: 'ADR Racing Team',
    cover: '/merch-adr-racing.jfif',
    coverAlt: 'ADR Racing team apparel',
    images: formatImages(adrRacingModules)
  },
]

export default function Merch() {
  const [activeGallery, setActiveGallery] = useState(null)

  const openGallery = (item) => {
    setActiveGallery({
      title: `${item.title} — Garment Layouts`,
      images: item.images
    })
  }

  return (
    <section className="merch" aria-labelledby="merch-title">
      <h3 id="merch-title">Merch projects</h3>
      <div className="merch-grid">
        {ITEMS.map((item) => (
          <article className="merch-project" key={item.id}>
            <img
              className={`merch-cover clickable-image ${item.coverClass ?? ''}`.trim()}
              src={item.cover}
              alt={item.coverAlt}
              width="1024"
              height="768"
              loading="lazy"
              onClick={() => openGallery(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openGallery(item) }}
            />
            <h4>{item.title}</h4>
            <span 
              className="clickable-caption" 
              onClick={() => openGallery(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openGallery(item) }}
            >
              See garment layouts <span>↗</span>
            </span>
          </article>
        ))}
      </div>

      <GalleryModal 
        isOpen={!!activeGallery} 
        onClose={() => setActiveGallery(null)} 
        title={activeGallery?.title}
        images={activeGallery?.images || []}
      />
    </section>
  )
}