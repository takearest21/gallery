import React from 'react';
import './Gallery.css';

const Gallery = ({ images, onImageClick }) => {
  return (
    <div className="gallery-grid">
      {images.map(image => (
        <div 
          key={image.id} 
          className="gallery-item" 
          onClick={() => onImageClick(image.id)}
        >
          <img 
            src={image.url} 
            alt={image.alt} 
            className="gallery-img" 
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;