import { useState } from 'react';
import { createStaticProxyUrl, createDynamicProxyUrl } from '@/lib/proxyUtils';

export function useProxyState(isStaticEnvironment: boolean) {
  const [urlInput, setUrlInput] = useState<string>('');
  const [currentProxyUrl, setCurrentProxyUrl] = useState<string>('');
  const [displayUrl, setDisplayUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const formatDisplayUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);
      return `<span class="text-primary">${parsedUrl.protocol}//</span><span class="text-white">${parsedUrl.host}${parsedUrl.pathname}</span>`;
    } catch (e) {
      return url;
    }
  };

  const processUrl = async (url: string): Promise<void> => {
    if (!url) {
      throw new Error('Please enter a URL');
    }

    // Validate URL format
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('URL must begin with http:// or https://');
      }
    } catch (e) {
      throw new Error('Please enter a valid URL with http:// or https://');
    }

    try {
      // Choose appropriate proxy method based on environment
      const proxyUrl = isStaticEnvironment 
        ? createStaticProxyUrl(url)  // For Netlify (static)
        : await createDynamicProxyUrl(url); // For Replit (dynamic)
      
      setCurrentProxyUrl(proxyUrl);
      setDisplayUrl(formatDisplayUrl(url));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const closeProxy = () => {
    setCurrentProxyUrl('');
    setDisplayUrl('');
  };

  const refreshProxy = () => {
    // Re-apply the current proxy URL which will refresh the content
    if (currentProxyUrl) {
      const refreshedUrl = `${currentProxyUrl}${currentProxyUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
      setCurrentProxyUrl(refreshedUrl);
    }
  };

  return {
    urlInput,
    setUrlInput,
    currentProxyUrl,
    setCurrentProxyUrl,
    displayUrl,
    isLoading,
    setIsLoading,
    error,
    setError,
    processUrl,
    closeProxy,
    refreshProxy,
  };
}
