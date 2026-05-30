import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'y8ooeznz', // 🛑 We will find this in a second!
  dataset: 'production',
  useCdn: true, // Use CDN for fast caching
  apiVersion: '2024-05-01', // Use today's date
});

// Helper function to easily render Sanity images
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);