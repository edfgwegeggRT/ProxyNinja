import { apiRequest } from './queryClient';

// For static deployment (Netlify) we use client-side proxy
export function createStaticProxyUrl(url: string): string {
  // This is the UV client-side proxy implementation
  // For production, you would embed the UV static assets and use its encoding function
  // For this example, we're using a base64 encoding which is a simplified approach
  
  // In production you would use something like:
  // return __uv$config.prefix + __uv$config.encodeUrl(url);
  
  // Using raw encoding for demonstration
  const encodedUrl = btoa(url);
  return `/proxy/${encodedUrl}`;
}

// For dynamic deployment (Replit) we make a request to the backend
export async function createDynamicProxyUrl(url: string): Promise<string> {
  try {
    const response = await apiRequest('POST', '/api/proxy', { url });
    const data = await response.json();
    
    if (!data.proxyUrl) {
      throw new Error('Failed to create proxy URL');
    }
    
    return data.proxyUrl;
  } catch (error) {
    console.error('Error creating proxy URL:', error);
    throw new Error('Failed to create proxy URL. Please try again.');
  }
}

// Function to decode a proxied URL back to its original form
export function decodeProxyUrl(encodedUrl: string): string {
  try {
    // Remove the prefix and decode
    const urlPart = encodedUrl.replace('/proxy/', '');
    return atob(urlPart);
  } catch (error) {
    console.error('Error decoding proxy URL:', error);
    return '';
  }
}
