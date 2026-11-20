import { useState } from 'react'
import Merch from './Merch.jsx'
import GalleryModal from './GalleryModal.jsx'

const logoModules = import.meta.glob('/src/assets/gallery/logos/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })
const posterModules = import.meta.glob('/src/assets/gallery/posters/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })
const menuModules = import.meta.glob('/src/assets/gallery/menus/*.{webp,png,jpg,jpeg,jfif,WEBP,PNG,JPG,JPEG,JFIF}', { eager: true, import: 'default' })

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
    alt: `Design project ${i + 1}`
  }))
}

const GRAPHICS = [
  { 
    id: 'logos',
    src: '/graphic-logos.jfif', 
    alt: 'A collection of logo and wordmark designs', 
    caption: 'Logos & identity',
    images: formatImages(logoModules)
  },
  { 
    id: 'posters',
    src: '/graphic-posters.webp', 
    alt: 'Four event posters', 
    caption: 'Posters & promotions',
    images: formatImages(posterModules)
  },
  { 
    id: 'menus',
    src: '/graphic-menus.jfif', 
    alt: 'A red restaurant menu set', 
    caption: 'Menus & print',
    images: formatImages(menuModules)
  },
]

export default function GraphicDesign({ onOpenBrief }) {
  const [activeGallery, setActiveGallery] = useState(null)

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
              <img 
                src={g.src} 
                alt={g.alt} 
                width="1152" 
                height="648" 
                loading="lazy" 
                className="clickable-image"
                onClick={() => setActiveGallery(g)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveGallery(g) }}
              />
              <figcaption 
                className="clickable-caption" 
                onClick={() => setActiveGallery(g)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveGallery(g) }}
              >
                {g.caption} <span>↗</span>
              </figcaption>
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

      <GalleryModal 
        isOpen={!!activeGallery} 
        onClose={() => setActiveGallery(null)} 
        title={activeGallery?.caption}
        images={activeGallery?.images || []}
      />
    </section>
  )
}