import { useEffect, useRef, useState } from 'react'

export default function GalleryModal({ isOpen, onClose, title, images }) {
  const dialogRef = useRef(null)
  const lightboxRef = useRef(null)
  const trackRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  // Управление основным окном галереи
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    else if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Управление окном Lightbox (полноэкранной картинки)
  useEffect(() => {
    const lightbox = lightboxRef.current
    if (!lightbox) return
    
    if (currentIndex !== null && !lightbox.open) {
      lightbox.showModal()
      // Мгновенно прокручиваем к нужной картинке при открытии
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.scrollTo({
            left: currentIndex * trackRef.current.clientWidth,
            behavior: 'auto'
          })
        }
      }, 10)
    } else if (currentIndex === null && lightbox.open) {
      lightbox.close()
    }
  }, [currentIndex])

  // Сброс при закрытии галереи
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => {
      setCurrentIndex(null)
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Блокировка скролла страницы
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Функция прокрутки к определенной картинке (для стрелок и клавиатуры)
  const scrollToImage = (index) => {
    if (!trackRef.current) return
    const newIndex = Math.max(0, Math.min(index, images.length - 1))
    trackRef.current.scrollTo({
      left: newIndex * trackRef.current.clientWidth,
      behavior: 'smooth'
    })
    setCurrentIndex(newIndex)
  }

  // Отслеживаем нативный скролл (когда пользователь листает пальцем)
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft
    const width = e.target.clientWidth
    const newIndex = Math.round(scrollLeft / width)
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex)
    }
  }

  // Обработка клавиатуры (стрелочки на ПК)
  useEffect(() => {
    if (currentIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') scrollToImage(currentIndex + 1)
      if (e.key === 'ArrowLeft') scrollToImage(currentIndex - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  return (
    <>
      <dialog ref={dialogRef} className="gallery-modal">
        <div className="gallery-header">
          <h3>{title}</h3>
          <button type="button" className="close-gallery" onClick={onClose} aria-label="Close gallery">
            ×
          </button>
        </div>
        
        <div className="gallery-grid">
          {images.length === 0 ? (
            <p style={{ padding: '20px', color: 'var(--yellow)' }}>
              No images found.
            </p>
          ) : (
            images.map((img, index) => (
              <img 
                key={index} 
                src={img.src} 
                alt={img.alt} 
                loading="lazy" 
                onClick={() => setCurrentIndex(index)}
                className="gallery-thumb"
              />
            ))
          )}
        </div>
      </dialog>

      {/* Окно просмотра картинки */}
      <dialog ref={lightboxRef} className="lightbox-modal">
        {currentIndex !== null && (
          <div className="lightbox-container">
            {/* Кнопки-стрелки для ПК */}
            <button 
              className="lightbox-nav prev" 
              onClick={() => scrollToImage(currentIndex - 1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="lightbox-nav next" 
              onClick={() => scrollToImage(currentIndex + 1)}
              aria-label="Next image"
            >
              ›
            </button>

            <button 
              className="lightbox-close" 
              onClick={() => setCurrentIndex(null)}
              aria-label="Close enlarged image"
            >
              ×
            </button>

            {/* Лента с картинками (Скролл-снап) */}
            <div 
              className="lightbox-track" 
              ref={trackRef} 
              onScroll={handleScroll}
            >
              {images.map((img, index) => (
                <div 
                  className="lightbox-slide" 
                  key={index}
                  onClick={() => setCurrentIndex(null)} // Клик по фону закрывает
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="lightbox-image" 
                    onClick={(e) => e.stopPropagation()} // Клик по картинке не закрывает
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}