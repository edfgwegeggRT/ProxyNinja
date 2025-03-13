import React from 'react';
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
          src={proxyUrl}
          className="proxy-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms" 
          title="Proxied Content"
        ></iframe>
      </div>
    </div>
  );
};

export default ProxyContent;
