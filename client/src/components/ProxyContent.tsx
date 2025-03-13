
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ProxyContentProps {
  proxyUrl: string;
  originalUrl: string;
  onClose: () => void;
  onRefresh: () => void;
}

export const ProxyContent: React.FC<ProxyContentProps> = ({
  proxyUrl,
  originalUrl,
  onClose,
  onRefresh
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Format the display URL to enhance readability
  const displayUrl = originalUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '');
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // If we're not in fullscreen mode, request it
      if (iframeRef.current?.requestFullscreen) {
        iframeRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
      setIsFullscreen(true);
    } else {
      // If we are in fullscreen mode, exit it
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
      setIsFullscreen(false);
    }
  };
  
  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="border border-primary/30 rounded-lg overflow-hidden mb-8">
      {/* Proxy Info Bar */}
      <div className="bg-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center flex-grow mr-4 overflow-hidden">
          <span className="text-primary mr-2">🔒</span>
          <span className="truncate text-sm font-mono">{displayUrl}</span>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh}
            className="text-gray-300 hover:text-white"
          >
            <i className="ri-refresh-line mr-1"></i> Refresh
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleFullscreen}
            className="text-gray-300 hover:text-white"
          >
            <i className={`ri-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}-line mr-1`}></i>
            {isFullscreen ? 'Exit' : 'Full'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-300 hover:text-white"
          >
            <i className="ri-close-line mr-1"></i> Close
          </Button>
        </div>
      </div>
      
      {/* Proxy Iframe Container */}
      <div className="bg-black relative" style={{ height: '500px' }}>
        <iframe 
          ref={iframeRef}
          src={proxyUrl}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms" 
          title="Proxied Content"
          allowFullScreen
        />
      </div>
    </div>
  );
};
