import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { urlSchema } from '@shared/schema';

interface ProxyFormProps {
  urlInput: string;
  setUrlInput: (value: string) => void;
  onSubmit: (url: string) => void;
}

const ProxyForm: React.FC<ProxyFormProps> = ({
  urlInput,
  setUrlInput,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate URL
      const result = urlSchema.safeParse({ url: urlInput });
      
      if (!result.success) {
        // Get the first error message
        const errorMessage = result.error.errors[0]?.message || 'Invalid URL';
        throw new Error(errorMessage);
      }
      
      onSubmit(urlInput);
    } catch (error) {
      // This error will be caught by the parent component
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Invalid URL format');
      }
    }
  };

  return (
    <div className="bg-background/70 backdrop-blur border border-primary/30 rounded-lg p-6 mb-8 animate-glow">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-link text-primary/70"></i>
          </div>
          <Input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            className="w-full bg-black border border-primary/50 hover:border-primary focus:border-primary rounded-lg py-6 pl-10 pr-3 font-mono text-white placeholder:text-gray-500 transition-all"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 md:w-auto w-full h-12"
        >
          <span className="flex items-center justify-center gap-2">
            <i className="ri-shield-flash-line"></i>
            <span>Access Now</span>
          </span>
        </Button>
      </form>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          <i className="ri-information-line text-primary/70 mr-1"></i>
          Enter a complete URL including http:// or https://
        </p>
      </div>
    </div>
  );
};

export default ProxyForm;
