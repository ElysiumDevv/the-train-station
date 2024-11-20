import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './styles/ImageUploader.css';

const ImageUploader = ({
  onUpload,
  maxFiles = 10,
  maxSize = 5, // in MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  categories = ['venue', 'events', 'artists', 'blog']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  
  // Validate file
  const validateFile = (file) => {
    const errors = [];
    
    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      errors.push(`${file.name}: File size exceeds ${maxSize}MB limit`);
    }
    
    return errors;
  };

  // Handle file selection
  const handleFiles = useCallback((newFiles) => {
    if (files.length + newFiles.length > maxFiles) {
      setErrors(prev => [...prev, `Maximum ${maxFiles} files allowed`]);
      return;
    }

    const fileArray = Array.from(newFiles);
    const newErrors = [];
    const validFiles = [];

    fileArray.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      } else {
        // Create preview URL
        const preview = URL.createObjectURL(file);
        validFiles.push({
          file,
          preview,
          category: categories[0],
          progress: 0,
          status: 'pending' // pending, uploading, complete, error
        });
      }
    });

    setErrors(prev => [...prev, ...newErrors]);
    setFiles(prev => [...prev, ...validFiles]);
  }, [files.length, maxFiles, allowedTypes, maxSize, categories]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    handleFiles(files);
  }, [handleFiles]);

  // Handle category change
  const handleCategoryChange = (index, category) => {
    setFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, category } : file
    ));
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  // Handle upload
  const handleUpload = async () => {
    const uploads = files.map(async (fileObj, index) => {
      if (fileObj.status === 'complete') return;

      try {
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'uploading' } : f
        ));

        // Simulate upload progress
        const updateProgress = (progress) => {
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress } : f
          ));
        };

        // Call the onUpload callback with progress updates
        await onUpload(fileObj.file, fileObj.category, updateProgress);

        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'complete', progress: 100 } : f
        ));
      } catch (error) {
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'error' } : f
        ));
        setErrors(prev => [...prev, `Failed to upload ${fileObj.file.name}: ${error.message}`]);
      }
    });

    await Promise.all(uploads);
  };

  // Clear all
  const handleClear = () => {
    files.forEach(fileObj => {
      URL.revokeObjectURL(fileObj.preview);
    });
    setFiles([]);
    setErrors([]);
  };

  return (
    <div className="image-uploader">
      {/* Drag and drop zone */}
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="upload-prompt">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Drag and drop images here or click to browse</p>
          <span className="upload-info">
            Maximum {maxFiles} files, up to {maxSize}MB each
          </span>
        </div>
      </div>

      {/* Preview grid */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="preview-grid"
          >
            {files.map((fileObj, index) => (
              <motion.div
                key={fileObj.preview}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="preview-item"
              >
                <img src={fileObj.preview} alt={`Preview ${index + 1}`} />
                
                <div className="preview-overlay">
                  <select
                    value={fileObj.category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    className="category-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>

                {fileObj.status === 'uploading' && (
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${fileObj.progress}%` }}
                    />
                  </div>
                )}

                {fileObj.status === 'complete' && (
                  <div className="complete-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}

                {fileObj.status === 'error' && (
                  <div className="error-indicator">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="error-messages"
          >
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="action-buttons"
        >
          <button onClick={handleClear} className="clear-button">
            Clear All
          </button>
          <button onClick={handleUpload} className="upload-button">
            Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string)
};

export default ImageUploader;
