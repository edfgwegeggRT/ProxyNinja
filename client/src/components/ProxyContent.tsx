
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
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ErrorDisplay from './ErrorDisplay';

interface ProxyContentProps {
  proxyUrl: string;
  originalUrl: string;
  onClose: () => void;
  onRefresh: () => void;
}

const ProxyContent: React.FC<ProxyContentProps> = ({
  proxyUrl,
  originalUrl,
  onClose,
  onRefresh
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false);
  };

  // Function to handle iframe errors
  const handleIframeError = () => {
    setLoading(false);
    setError("There was an error loading the proxied content.");
  };

  return (
    <div className="mb-12 mt-8">
      <div className="bg-gray-800/50 p-4 rounded-t-lg border border-gray-700 flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 w-full sm:w-auto overflow-hidden">
          <h2 className="text-lg font-semibold mb-1 truncate">
            Proxying: {originalUrl}
          </h2>
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-xs text-gray-400">Protected connection active</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            className="text-xs"
          >
            <i className="ri-refresh-line mr-1"></i> Refresh
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            <i className="ri-close-line mr-1"></i> Close
          </Button>
        </div>
      </div>
      
      {error ? (
        <ErrorDisplay errorMessage={error} onDismiss={() => setError(null)} />
      ) : (
        <div className="border border-t-0 border-gray-700 rounded-b-lg bg-white" style={{ height: '70vh' }}>
          {loading && (
            <div className="flex justify-center items-center h-full bg-black">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          )}
          <iframe 
            src={proxyUrl} 
            className="w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-forms allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

export default ProxyContent;
