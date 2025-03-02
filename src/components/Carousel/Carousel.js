import React, { useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ images, activeIndex, setActiveIndex, onBackToGallery }) => {
  const goToNext = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };
  
  const goToPrev = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        onBackToGallery();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onBackToGallery]);
  
  return (
    <div className="carousel-wrapper">
      <button className="back-to-gallery-btn" onClick={onBackToGallery}>
        ← Back to Gallery
      </button>
      
      <div className="carousel-container">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="carousel-img" 
            />
          </div>
        ))}
        
        <button className="carousel-btn prev" onClick={goToPrev} aria-label="Previous image">
          &#8249;
        </button>
        <button className="carousel-btn next" onClick={goToNext} aria-label="Next image">
          &#8250;
        </button>
        
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <div 
              key={index} 
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;