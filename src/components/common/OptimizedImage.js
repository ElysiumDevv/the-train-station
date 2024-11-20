import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt,
  size = 'medium',
  className = '',
  onClick,
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Dynamic import of image metadata
    import('../../data/imageMetadata.json')
      .then(metadata => {
        const category = src.split('/')[0];
        const filename = src.split('/').pop();
        
        const imageData = metadata[category]?.find(
          img => img.original.includes(filename)
        );

        if (imageData) {
          setImageSrc({
            webp: imageData.sizes[size].webp,
            jpg: imageData.sizes[size].jpg
          });
        } else {
          console.warn(`Image metadata not found for: ${src}`);
          setImageSrc({ jpg: src }); // Fallback to original source
        }
      })
      .catch(err => {
        console.error('Error loading image metadata:', err);
        setImageSrc({ jpg: src }); // Fallback to original source
      });
  }, [src, size]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  if (!imageSrc) {
    return null; // Or a placeholder/skeleton
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`optimized-image-container ${className}`}
    >
      <picture>
        {imageSrc.webp && (
          <source
            srcSet={`/images/${imageSrc.webp}`}
            type="image/webp"
          />
        )}
        <img
          src={`/images/${imageSrc.jpg}`}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`optimized-image ${error ? 'image-error' : ''}`}
          onClick={onClick}
          {...props}
        />
      </picture>
    </motion.div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['thumbnail', 'medium', 'large']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  priority: PropTypes.bool
};

export default OptimizedImage;
