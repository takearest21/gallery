import React, { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import Carousel from './components/Carousel/Carousel';
import Header from './components/Header/Header';

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

// Sample image data
const generateImageData = (count) => {
  return Array.from({ length: count }, (_, id) => ({
    id,
    title: `Image ${id + 1}`,
    description: `Description for image ${id + 1}`,
    url: generatePlaceholderImage(id),
    alt: `Image ${id + 1}`
  }));
};

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Simulate loading images
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setImages(generateImageData(12));
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleImageClick = (id) => {
    setActiveIndex(id);
    setViewMode('carousel');
  };
  
  return (
    <div className="app-container">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      
      {loading ? (
        <div className="loading">Loading gallery...</div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <Gallery 
              images={images} 
              onImageClick={handleImageClick} 
            />
          ) : (
            <Carousel 
              images={images} 
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onBackToGallery={() => setViewMode('grid')}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;