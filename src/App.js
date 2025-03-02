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
  
  // Dynamically import all images from the images folder using webpack's require.context
  const importAllImages = () => {
    // This function creates a context of all image files in the images directory
    const r = require.context('./images', false, /\.(jpe?g|png|gif)$/i);
    
    // Map over all the keys (file paths) and create an array of image objects
    return r.keys().map((fileName, index) => ({
      id: index,
      url: r(fileName),
      alt: `Image ${index + 1}`,
      title: fileName.replace(/^\.\//, '').replace(/\.(jpe?g|png|gif)$/i, '')
    }));
  };
  
  // Load initial images
  useEffect(() => {
    try {
      // Get all images from the folder
      const allImages = importAllImages();
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Load first batch of images
        setImages(allImages.slice(0, imagesPerPage));
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error loading images:", error);
      setLoading(false);
    }
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
    
    try {
      const allImages = importAllImages();
      
      // Simulate API call to load more images
      setTimeout(() => {
        const nextPage = page + 1;
        const startIndex = images.length;
        const endIndex = Math.min(startIndex + imagesPerPage, allImages.length);
        
        // Check if there are more images to load
        if (startIndex < allImages.length) {
          const newImages = allImages.slice(startIndex, endIndex);
          setImages([...images, ...newImages]);
          setPage(nextPage);
        }
        
        setLoadingMore(false);
      }, 1000);
    } catch (error) {
      console.error("Error loading more images:", error);
      setLoadingMore(false);
    }
  };
  
  // Check if all images are loaded
  const allImagesLoaded = () => {
    try {
      const allImages = importAllImages();
      return images.length >= allImages.length;
    } catch (error) {
      console.error("Error checking loaded images:", error);
      return true; // Assume all loaded if we can't check
    }
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
          
          {!allImagesLoaded() && (
            <div className="load-more-container">
              <button 
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          
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