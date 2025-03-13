import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProxyFormProps {
  onSubmit: (url: string) => void;
}

const ProxyForm: React.FC<ProxyFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    // Add http:// prefix if missing
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = 'https://' + url;
    }

    onSubmit(formattedUrl);
  };

  return (
    <div className="my-12">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="ri-earth-line text-primary"></i>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-12 pl-10 pr-4 text-sm rounded-lg bg-black/50 border border-primary/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter URL (e.g., example.com)"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-8 animate-glow"
          >
            Proxy Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProxyForm;