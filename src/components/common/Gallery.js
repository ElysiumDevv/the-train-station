import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import OptimizedImage from './OptimizedImage';

const Gallery = ({
  category,
  initialSize = 12,
  gridCols = 3,
  className = ''
}) => {
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../../data/imageMetadata.json')
      .then(metadata => {
        const categoryImages = metadata[category] || [];
        setImages(categoryImages);
        setVisibleImages(categoryImages.slice(0, initialSize));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading gallery images:', err);
        setLoading(false);
      });
  }, [category, initialSize]);

  const loadMore = () => {
    const currentLength = visibleImages.length;
    const nextImages = images.slice(
      currentLength,
      currentLength + initialSize
    );
    setVisibleImages([...visibleImages, ...nextImages]);
  };

  const Modal = ({ image }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={() => setSelectedImage(null)}
    >
      <div className="relative max-w-4xl mx-auto p-4">
        <OptimizedImage
          src={image.original}
          alt="Gallery image"
          size="large"
          className="max-h-90vh object-contain"
          priority
        />
        <button
          className="absolute top-4 right-4 text-white text-xl"
          onClick={() => setSelectedImage(null)}
        >
          ×
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className={`gallery-container ${className}`}>
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: '1rem',
          padding: '1rem'
        }}
      >
        {visibleImages.map((image, index) => (
          <motion.div
            key={image.original}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="gallery-item"
          >
            <OptimizedImage
              src={image.original}
              alt={`Gallery image ${index + 1}`}
              size="thumbnail"
              className="cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(image)}
            />
          </motion.div>
        ))}
      </div>

      {visibleImages.length < images.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-gold hover:bg-coral text-black px-6 py-2 rounded-full transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedImage && <Modal image={selectedImage} />}
      </AnimatePresence>
    </div>
  );
};

Gallery.propTypes = {
  category: PropTypes.string.isRequired,
  initialSize: PropTypes.number,
  gridCols: PropTypes.number,
  className: PropTypes.string
};

export default Gallery;
