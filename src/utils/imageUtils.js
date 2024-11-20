// Helper function to create object URLs for previews
export const createPreviewUrl = (file) => {
  return URL.createObjectURL(file);
};

// Helper function to revoke object URLs to prevent memory leaks
export const revokePreviewUrl = (url) => {
  URL.revokeObjectURL(url);
};

// Process image and return dimensions
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = URL.createObjectURL(file);
  });
};

// Validate image file
export const validateImage = (file, config) => {
  const errors = [];
  
  // Check file type
  if (config.allowedTypes && !config.allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`);
  }

  // Check file size
  if (config.maxSize && file.size > config.maxSize * 1024 * 1024) {
    errors.push(`File too large. Maximum size: ${config.maxSize}MB`);
  }

  return errors;
};

// Process image for upload
export const processImageForUpload = async (file, config = {}) => {
  try {
    // Validate the file
    const validationErrors = validateImage(file, config);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join('\n'));
    }

    // Get file metadata
    const dimensions = await getImageDimensions(file);
    
    // Create metadata object
    const metadata = {
      originalName: file.name,
      size: file.size,
      type: file.type,
      width: dimensions.width,
      height: dimensions.height,
      timestamp: new Date().toISOString()
    };

    return {
      file,
      metadata,
      previewUrl: createPreviewUrl(file)
    };
  } catch (error) {
    throw error;
  }
};
