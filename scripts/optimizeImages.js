const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SIZES = {
  thumbnail: { width: 400, height: 400 },
  medium: { width: 800, height: 600 },
  large: { width: 1920, height: 1080 }
};

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

async function optimizeImage(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      // Convert to WebP
      .webp({ quality: 80 })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));

    // Create JPEG fallback
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath.replace(/\.[^.]+$/, '.jpg'));

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const inputPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // Skip the optimized directory
        if (entry.name === 'optimized') continue;
        await processDirectory(inputPath);
        continue;
      }

      // Only process image files
      if (!/\.(jpg|jpeg|png)$/i.test(entry.name)) continue;

      const relativePath = path.relative(INPUT_DIR, directory);
      
      for (const [sizeName, dimensions] of Object.entries(SIZES)) {
        const outputDir = path.join(OUTPUT_DIR, relativePath, sizeName);
        await fs.mkdir(outputDir, { recursive: true });
        
        const outputPath = path.join(
          outputDir,
          entry.name
        );

        console.log(`Processing ${entry.name} - ${sizeName}`);
        await optimizeImage(inputPath, outputPath, dimensions);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Create a function to generate image metadata
async function generateImageMetadata() {
  const metadata = {};
  
  async function scanDirectory(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        if (entry.name === 'optimized') continue;
        metadata[entry.name] = await scanDirectory(fullPath);
        continue;
      }

      if (!/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) continue;

      const relativePath = path.relative(INPUT_DIR, fullPath);
      const category = path.dirname(relativePath).split(path.sep)[0];
      
      if (!metadata[category]) {
        metadata[category] = [];
      }

      metadata[category].push({
        original: relativePath,
        sizes: Object.keys(SIZES).reduce((acc, size) => {
          acc[size] = {
            webp: `optimized/${category}/${size}/${entry.name.replace(/\.[^.]+$/, '.webp')}`,
            jpg: `optimized/${category}/${size}/${entry.name.replace(/\.[^.]+$/, '.jpg')}`
          };
          return acc;
        }, {})
      });
    }
    
    return metadata;
  }

  await scanDirectory(INPUT_DIR);
  
  // Write metadata to JSON file
  await fs.writeFile(
    path.join(__dirname, '../src/data/imageMetadata.json'),
    JSON.stringify(metadata, null, 2)
  );
}

// Main execution
async function main() {
  try {
    console.log('Starting image optimization...');
    await processDirectory(INPUT_DIR);
    console.log('Generating image metadata...');
    await generateImageMetadata();
    console.log('Image processing complete!');
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

main();
