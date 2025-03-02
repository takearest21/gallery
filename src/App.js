import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import Carousel from './components/Carousel/Carousel';
import Header from './components/Header/Header';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;
  const carouselOverlayRef = useRef(null);
  
  // Function to generate placeholder images
  const generatePlaceholderImage = (id) => {
    const colors = [
      '#5D8CAE', '#4A6B8A', '#2C3E50', '#7AA5D2', '#253746',
      '#3D5A80', '#98C1D9', '#293241', '#6497B1', '#025E73'
    ];
    const color = colors[id % colors.length];
    const secondaryColor = colors[(id + 3) % colors.length];
    
    // Create SVG with sample patterns
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='${color.replace('#', '%23')}'/%3E%3Ccircle cx='${150 + (id * 20) % 100}' cy='${100 + (id * 15) % 100}' r='${30 + id % 20}' fill='${secondaryColor.replace('#', '%23')}' opacity='0.7'/%3E%3Cpath d='M ${50 + (id * 10) % 100} ${200 + (id * 5) % 50} L ${300 + (id * 7) % 50} ${100 + (id * 12) % 150} Z' fill='${secondaryColor.replace('#', '%23')}' opacity='0.5'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='24' text-anchor='middle' fill='white'%3EImage ${id + 1}%3C/text%3E%3C/svg%3E`;
  };
  
  // Generate image data
  const generateImageData = (count, startId = 0) => {
    return Array.from({ length: count }, (_, index) => {
      const id = startId + index;
      return {
        id,
        title: `Image ${id + 1}`,
        description: `Description for image ${id + 1}`,
        url: generatePlaceholderImage(id),
        alt: `Image ${id + 1}`
      };
    });
  };
  
  // Load initial images
  useEffect(() => {
    const timer = setTimeout(() => {
      setImages(generateImageData(imagesPerPage));
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle image click to show carousel
  const handleImageClick = (id) => {
    setActiveIndex(id);
    setViewMode('carousel');
  };
  
  // Handle click outside carousel to close it
  const handleOverlayClick = (e) => {
    if (e.target === carouselOverlayRef.current) {
      setViewMode('grid');
    }
  };
  
  // Handle load more button click
  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate API call to load more images
    setTimeout(() => {
      const nextPage = page + 1;
      const startId = images.length;
      const newImages = generateImageData(imagesPerPage, startId);
      
      setImages([...images, ...newImages]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 1000);
  };
  
  return (
    <div className="app-container">
      <Header />
      
      {loading ? (
        <div className="loading">Loading gallery...</div>
      ) : (
        <>
          <Gallery 
            images={images} 
            onImageClick={handleImageClick} 
          />
          
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
          
          {viewMode === 'carousel' && (
            <div 
              className="carousel-overlay" 
              ref={carouselOverlayRef}
              onClick={handleOverlayClick}
            >
              <Carousel 
                images={images} 
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                onBackToGallery={() => setViewMode('grid')}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;