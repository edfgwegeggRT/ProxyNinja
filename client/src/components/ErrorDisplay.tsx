import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  errorMessage: string;
  onDismiss: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errorMessage,
  onDismiss
}) => {
  return (
    <div className="bg-black/80 border border-destructive rounded-lg p-6 mb-8">
      <div className="flex items-start">
        <div className="text-destructive mr-4">
          <i className="ri-error-warning-line text-3xl"></i>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Error Accessing URL</h3>
          <p className="text-muted-foreground mb-4">
            {errorMessage || "Unable to load the requested URL. Please check the address and try again."}
          </p>
          <Button 
            variant="destructive"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
