import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from './common/ImageUploader';
import Gallery from './common/Gallery';
import { processImageForUpload, createPreviewUrl, revokePreviewUrl } from '../utils/imageUtils';
import '../styles/AdminImageManager.css';

// In a real app, this would be server-side and properly hashed
const ADMIN_PASSWORD = 'TrainStation2024!';

// Website asset configurations with dimensions
const WEBSITE_ASSETS = {
  logo: {
    title: 'Website Logo',
    description: 'Main logo displayed in the header (SVG or PNG recommended, transparent background)',
    path: '/images/core/logo.png',
    defaultPath: '/images/core/default-logo.png',
    maxSize: 1,
    dimensions: { width: 200, height: 60 },
    allowedTypes: ['image/png', 'image/svg+xml'],
  },
  footerLogo: {
    title: 'Footer Logo',
    description: 'Logo displayed in the footer (SVG or PNG recommended, transparent background)',
    path: '/images/core/footer-logo.png',
    defaultPath: '/images/core/default-footer-logo.png',
    maxSize: 1,
    dimensions: { width: 150, height: 45 },
    allowedTypes: ['image/png', 'image/svg+xml'],
  },
  favicon: {
    title: 'Favicon',
    description: 'Website icon shown in browser tabs (must be ICO format)',
    path: '/favicon.ico',
    defaultPath: '/favicon.ico',
    maxSize: 0.5,
    dimensions: { width: 32, height: 32 },
    allowedTypes: ['image/x-icon', 'image/vnd.microsoft.icon'],
  },
  ogImage: {
    title: 'Social Share Image',
    description: 'Image shown when website is shared on social media',
    path: '/images/core/og-image.jpg',
    defaultPath: '/images/core/default-og-image.jpg',
    maxSize: 2,
    dimensions: { width: 1200, height: 630 },
    allowedTypes: ['image/jpeg', 'image/png'],
  },
  heroBackground: {
    title: 'Hero Background',
    description: 'Background image for the homepage hero section',
    path: '/images/core/hero-bg.jpg',
    defaultPath: '/images/core/default-hero-bg.jpg',
    maxSize: 3,
    dimensions: { width: 1920, height: 1080 },
    allowedTypes: ['image/jpeg', 'image/png'],
  },
  heroVideo: {
    title: 'Hero Background Video',
    description: 'Background video for the homepage hero section (MP4 format)',
    path: '/videos/hero-bg.mp4',
    defaultPath: '/videos/default-hero-bg.mp4',
    maxSize: 20,
    allowedTypes: ['video/mp4'],
  }
};

const AdminImageManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('assets');
  const [assetPreviews, setAssetPreviews] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  useEffect(() => {
    const authStatus = localStorage.getItem('trainstation_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    loadAssetPreviews();
  }, []);

  useEffect(() => {
    // Cleanup object URLs when component unmounts
    return () => {
      Object.values(assetPreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          revokePreviewUrl(url);
        }
      });
    };
  }, [assetPreviews]);

  const loadAssetPreviews = () => {
    const previews = {};
    Object.entries(WEBSITE_ASSETS).forEach(([key, asset]) => {
      // Try to load the custom image first, fallback to default
      fetch(asset.path)
        .then(response => {
          if (!response.ok) {
            return asset.defaultPath;
          }
          return asset.path;
        })
        .then(path => {
          previews[key] = `${path}?t=${Date.now()}`;
          setAssetPreviews(prev => ({ ...prev, [key]: previews[key] }));
        })
        .catch(() => {
          previews[key] = asset.defaultPath;
          setAssetPreviews(prev => ({ ...prev, [key]: previews[key] }));
        });
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('trainstation_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('trainstation_admin_auth');
    setPassword('');
  };

  const handleAssetUpload = async (file, assetKey) => {
    try {
      const asset = WEBSITE_ASSETS[assetKey];
      setUploadStatus(prev => ({ ...prev, [assetKey]: 'uploading' }));

      // Process and validate the image
      const { previewUrl } = await processImageForUpload(file, {
        maxSize: asset.maxSize,
        allowedTypes: asset.allowedTypes
      });

      // Save the file to the public directory
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', asset.path);

      // Create a copy of the file in the public directory
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          // Store in localStorage for persistence
          localStorage.setItem(`trainstation_asset_${assetKey}`, fileReader.result);
          
          // Update preview
          setAssetPreviews(prev => {
            // Revoke old preview URL if it exists
            if (prev[assetKey] && prev[assetKey].startsWith('blob:')) {
              revokePreviewUrl(prev[assetKey]);
            }
            return {
              ...prev,
              [assetKey]: previewUrl
            };
          });

          setUploadStatus(prev => ({ ...prev, [assetKey]: 'success' }));
          
          // Clear success status after 3 seconds
          setTimeout(() => {
            setUploadStatus(prev => ({ ...prev, [assetKey]: null }));
          }, 3000);
        } catch (error) {
          console.error('Error saving file:', error);
          setUploadStatus(prev => ({ ...prev, [assetKey]: 'error' }));
          throw error;
        }
      };

      fileReader.readAsDataURL(file);
      return true;
    } catch (error) {
      console.error(error);
      setUploadStatus(prev => ({ ...prev, [assetKey]: 'error' }));
      alert(error.message);
      return false;
    }
  };

  const handleUpload = async (file, category, onProgress) => {
    try {
      onProgress(10);

      // Process the image
      const { previewUrl } = await processImageForUpload(file, {
        maxSize: 5, // 5MB max
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      });

      onProgress(50);

      // Store in localStorage with a unique key
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const key = `trainstation_image_${category}_${Date.now()}`;
        localStorage.setItem(key, fileReader.result);
        
        // Store metadata
        const metadata = JSON.parse(localStorage.getItem('trainstation_images') || '{}');
        metadata[category] = metadata[category] || [];
        metadata[category].push({
          key,
          name: file.name,
          type: file.type,
          size: file.size,
          timestamp: Date.now()
        });
        localStorage.setItem('trainstation_images', JSON.stringify(metadata));
      };

      fileReader.readAsDataURL(file);
      onProgress(100);

      // Cleanup preview URL
      revokePreviewUrl(previewUrl);

      return true;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  const renderWebsiteAssets = () => (
    <div className="website-assets">
      {Object.entries(WEBSITE_ASSETS).map(([key, asset]) => (
        <div key={key} className="asset-card">
          <h3>{asset.title}</h3>
          <p className="asset-description">{asset.description}</p>
          <div className="asset-details">
            <span>Dimensions: {asset.dimensions ? `${asset.dimensions.width}x${asset.dimensions.height}` : 'N/A'}</span>
            <span>Max Size: {asset.maxSize}MB</span>
          </div>
          <div className="asset-preview">
            {assetPreviews[key] && (
              key === 'heroVideo' ? (
                <video
                  src={assetPreviews[key]}
                  className="preview-video"
                  controls
                  muted
                />
              ) : (
                <img
                  src={assetPreviews[key]}
                  alt={asset.title}
                  className="preview-image"
                />
              )
            )}
            {uploadStatus[key] && (
              <div className={`upload-status ${uploadStatus[key]}`}>
                {uploadStatus[key] === 'uploading' && 'Uploading...'}
                {uploadStatus[key] === 'success' && '✓ Uploaded'}
                {uploadStatus[key] === 'error' && '✗ Failed'}
              </div>
            )}
          </div>
          <div className="asset-upload">
            <input
              type="file"
              accept={asset.allowedTypes.join(',')}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleAssetUpload(file, key);
              }}
              className="file-input"
            />
          </div>
          <p className="asset-path">Path: {asset.path}</p>
        </div>
      ))}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card"
        >
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="admin-password-input"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="admin-login-button">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Image Management</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveTab('assets')}
        >
          Website Assets
        </button>
        <button
          className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Images
        </button>
        <button
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Images
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'assets' ? (
            renderWebsiteAssets()
          ) : activeTab === 'upload' ? (
            <div className="upload-section">
              <ImageUploader
                onUpload={handleUpload}
                maxFiles={10}
                maxSize={5}
                allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                categories={['venue', 'events', 'artists', 'blog']}
              />
            </div>
          ) : (
            <div className="manage-section">
              <div className="gallery-container">
                <h3>Venue Images</h3>
                <Gallery category="venue" initialSize={8} gridCols={4} />
              </div>
              <div className="gallery-container">
                <h3>Event Images</h3>
                <Gallery category="events" initialSize={8} gridCols={4} />
              </div>
              <div className="gallery-container">
                <h3>Artist Images</h3>
                <Gallery category="artists" initialSize={8} gridCols={4} />
              </div>
              <div className="gallery-container">
                <h3>Blog Images</h3>
                <Gallery category="blog" initialSize={8} gridCols={4} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminImageManager;
