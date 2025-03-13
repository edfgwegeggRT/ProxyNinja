import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ProxyContentProps {
  displayUrl: string;
  proxyUrl: string;
  onRefresh: () => void;
  onClose: () => void;
}

const ProxyContent: React.FC<ProxyContentProps> = ({
  displayUrl,
  proxyUrl,
  onRefresh,
  onClose,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const toggleFullscreen = async () => {
    if (isFullscreen) {
      // Exit fullscreen
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      // Enter fullscreen
      const iframeElement = iframeRef.current;
      if (iframeElement) {
        try {
          await iframeElement.requestFullscreen();
          setIsFullscreen(true);
        } catch (err) {
          console.error("Fullscreen error:", err);
        }
      }
    }
  };

  return (
    <div className="border border-primary/30 rounded-lg overflow-hidden mb-8">
      {/* URL Display Bar */}
      <div className="bg-black border-b border-primary/30 p-3 flex items-center justify-between">
        <div className="flex items-center flex-1 overflow-hidden">
          <span className="text-primary mr-2">
            <i className="ri-shield-check-line"></i>
          </span>
          <div 
            className="font-mono text-sm truncate flex-1"
            dangerouslySetInnerHTML={{ __html: displayUrl }}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleFullscreen}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <i className={isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"}></i>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRefresh}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            title="Refresh"
          >
            <i className="ri-refresh-line"></i>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            title="Close"
          >
            <i className="ri-close-line"></i>
          </Button>
        </div>
      </div>
      
      {/* Proxy Iframe Container */}
      <div className="bg-black">
        <iframe 
          ref={iframeRef}
          src={proxyUrl}
          className="proxy-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms" 
          title="Proxied Content"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Fullscreen Access Button */}
      <div className="bg-black border-t border-primary/30 p-3 flex justify-center">
        <Button 
          variant="default"
          onClick={toggleFullscreen}
          className="bg-primary hover:bg-primary/80 text-black font-bold animate-glow"
        >
          {isFullscreen ? "Exit Fullscreen" : "Access Fullscreen"}
        </Button>
      </div>
    </div>
  );
};

export default ProxyContent;
