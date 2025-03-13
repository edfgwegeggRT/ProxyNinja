import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-primary/30 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} NeonProxy. For educational purposes only.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
