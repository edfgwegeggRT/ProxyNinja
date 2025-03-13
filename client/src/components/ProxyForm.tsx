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
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProxyFormProps {
  onSubmit: (url: string) => void;
}

const ProxyForm: React.FC<ProxyFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateUrl = (url: string) => {
    // Basic URL validation
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setIsValid(false);
      return;
    }

    let processedUrl = url;
    // Add https:// if no protocol specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = 'https://' + url;
    }
    
    if (validateUrl(processedUrl)) {
      setIsValid(true);
      onSubmit(processedUrl);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setIsValid(true);
            }}
            placeholder="Enter website URL (e.g., example.com)"
            className={`flex-1 bg-black/50 border-gray-700 placeholder:text-gray-500 ${!isValid ? 'border-red-500' : ''}`}
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium"
          >
            Access Site
          </Button>
        </div>
        {!isValid && (
          <p className="text-red-500 text-sm">Please enter a valid URL</p>
        )}
      </form>
    </div>
  );
};

export default ProxyForm;
