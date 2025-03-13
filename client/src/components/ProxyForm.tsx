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
      // Validate input (could be URL or search query)
      const result = urlSchema.safeParse({ url: urlInput });
      
      if (!result.success) {
        // Get the first error message
        const errorMessage = result.error.errors[0]?.message || 'Invalid input';
        throw new Error(errorMessage);
      }
      
      onSubmit(urlInput);
    } catch (error) {
      // This error will be caught by the parent component
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Invalid input format');
      }
    }
  };

  return (
    <div className="bg-background/70 backdrop-blur border border-primary/30 rounded-lg p-6 mb-8 animate-glow">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white">NeonProxy</h2>
        <p className="text-muted-foreground">Browse securely and anonymously</p>
      </div>
      
      <form id="uv-form" onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <input id="uv-search-engine" value="https://duckduckgo.com/?t=h_&q=%s&ia=web" type="hidden" />
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-primary/70"></i>
          </div>
          
          <Input
            id="uv-address"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search Google or type a URL"
            className="w-full bg-black border-2 border-primary/50 hover:border-primary focus:border-primary rounded-lg py-6 pl-10 pr-3 font-mono text-white placeholder:text-gray-500 transition-all text-center"
            autoComplete="off"
            required
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/80 text-black font-semibold px-6 rounded-r-lg h-full transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="ri-arrow-right-line"></i>
              </span>
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          <i className="ri-information-line text-primary/70 mr-1"></i>
          Enter a URL or search query to browse securely through our proxy
        </p>
      </div>
    </div>
  );
};

export default ProxyForm;
