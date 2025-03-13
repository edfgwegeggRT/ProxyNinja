import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface NotificationProps {
  message: string;
  type: 'info' | 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  visible,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visible) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!message || !visible) return null;

  // Determine icon based on type
  let icon;
  let borderClass = 'border-primary';
  
  if (type === 'error') {
    icon = 'ri-error-warning-line';
    borderClass = 'border-destructive';
  } else if (type === 'success') {
    icon = 'ri-check-line';
    borderClass = 'border-success';
  } else {
    icon = 'ri-information-line';
  }

  return (
    <div className={`fixed bottom-4 right-4 max-w-xs bg-black border ${borderClass} rounded-lg shadow-lg p-4 transform transition-all duration-300 z-50`}>
      <div className="flex items-start">
        <div className="text-primary mr-3">
          <i className={`${icon} text-xl`}></i>
        </div>
        <div className="flex-1">
          <p className="text-white">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-muted-foreground hover:text-primary ml-3"
        >
          <i className="ri-close-line"></i>
        </Button>
      </div>
    </div>
  );
};

export default Notification;
