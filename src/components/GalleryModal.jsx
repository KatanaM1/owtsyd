import { useEffect, useRef, useState } from 'react'

export default function GalleryModal({ isOpen, onClose, title, images }) {
  const dialogRef = useRef(null)
  const lightboxRef = useRef(null)
  
  // Теперь храним индекс текущей картинки, а не просто ссылку
  const [currentIndex, setCurrentIndex] = useState(null)
  
  // Состояния для свайпов на мобилках
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Синхронизация основного окна галереи
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    else if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Синхронизация окна Lightbox (полноэкранной картинки)
  useEffect(() => {
    const lightbox = lightboxRef.current
    if (!lightbox) return
    if (currentIndex !== null && !lightbox.open) lightbox.showModal()
    else if (currentIndex === null && lightbox.open) lightbox.close()
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

  // Функции перелистывания
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  // Обработка клавиатуры (стрелочки влево/вправо) для ПК
  useEffect(() => {
    if (currentIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  // Обработка свайпов для мобильных устройств
  const minSwipeDistance = 50 // Минимальная длина свайпа в пикселях

  const onTouchStart = (e) => {
    setTouchEnd(null) // Сбрасываем предыдущий свайп
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) nextImage()
    if (isRightSwipe) prevImage()
  }

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
                onClick={() => setCurrentIndex(index)} // Передаем индекс
                className="gallery-thumb"
              />
            ))
          )}
        </div>
      </dialog>

      {/* Окно просмотра картинки */}
      <dialog 
        ref={lightboxRef} 
        className="lightbox-modal" 
        onClick={() => setCurrentIndex(null)} 
      >
        {currentIndex !== null && (
          <div 
            className="lightbox-content"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Кнопка Назад (стрелка влево) */}
            <button 
              className="lightbox-nav prev" 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              ‹
            </button>

            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="lightbox-image" 
              onClick={(e) => e.stopPropagation()} 
            />

            {/* Кнопка Вперед (стрелка вправо) */}
            <button 
              className="lightbox-nav next" 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              ›
            </button>

            <button 
              className="lightbox-close" 
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(null); }}
              aria-label="Close enlarged image"
            >
              ×
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}