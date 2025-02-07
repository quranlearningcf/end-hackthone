import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

// Initialize Sanity client
const client = createClient({
  projectId: 'hxmux9ap', // Your Sanity project ID
  dataset: 'production', // Ensure this is the correct dataset (production or development)
  useCdn: false, // Set to false for better consistency when using the API
  apiVersion: '2022-03-07', // Ensure this matches the version you want to use
  token: 'skx96GFcgYr4EC7Pgk4ku7egdftMg8cpOdiRwVWTtMzyMpbQP8BLtBuzO36iizLFBTRLJR0roS5k43Cca3XYGGspFM5qPXf2w38cPWwkwf2oCEOLrer53aEU9qObOzbIaqsnCGJC9SGWoTFtfpn4fFwTLA0SsQ09AJa5xl8yZa3AFtrWa64a', // Replace with your Sanity API token with write permissions
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    if (!imageUrl) {
      console.log('Invalid image URL:', imageUrl);
      return null;
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

// Function to upload a single product to Sanity
async function uploadProduct(product) {
  try {
    console.log('Uploading product:', product.name);

    // Check if product has all required fields
    if (!product.id || !product.name || !product.imagePath) {
      console.log('Missing fields in product:', product);
      return;
    }

    // Check if product already exists by name or slug to avoid duplicates
    const existingProduct = await client
      .fetch('*[_type == "product" && slug.current == $slug][0]', {
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      });

    if (existingProduct) {
      console.log(`Product "${product.name}" already exists in Sanity. Skipping.`);
      return;
    }

    const imageId = await uploadImageToSanity(product.imagePath);

    if (imageId) {
      const document = {
        _type: 'product',
        name: product.name,
        slug: {
          _type: 'slug',
          current: product.name.toLowerCase().replace(/\s+/g, '-'),
        },
        description: product.description,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        price: parseFloat(product.price), // Ensure price is a number
        discountPercent: product.discountPercentage || 0, // Ensure discountPercent field is mapped correctly
        category: product.category,
        colors: product.colors || [], // Ensure default empty array for colors
        sizes: product.sizes || [], // Ensure default empty array for sizes
        isNew: product.isNew || false,
        ratings: product.ratings || 0, // Default to 0 if not provided
      };

      // Create the product in Sanity
      const createdProduct = await client.create(document);
      console.log(`Product "${product.name}" uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product "${product.name}" skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}

// Function to fetch products from the provided API and upload them to Sanity
async function migrateProducts() {
  try {
    const response = await fetch('https://template1-neon-nu.vercel.app/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log('Fetched products:', products); // Log the entire products array

    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Start the migration
migrateProducts();
