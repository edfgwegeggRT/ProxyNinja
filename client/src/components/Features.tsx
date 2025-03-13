import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <div className="border border-primary/30 rounded-lg p-6 bg-black/50">
        <div className="text-primary mb-4">
          <i className="ri-lock-line text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">Private Browsing</h3>
        <p className="text-muted-foreground">Access websites anonymously through our secure UV proxy service.</p>
      </div>
      
      <div className="border border-primary/30 rounded-lg p-6 bg-black/50">
        <div className="text-primary mb-4">
          <i className="ri-speed-line text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">Static Deployment</h3>
        <p className="text-muted-foreground">Optimized for Netlify with fallback for Replit compatibility.</p>
      </div>
      
      <div className="border border-primary/30 rounded-lg p-6 bg-black/50">
        <div className="text-primary mb-4">
          <i className="ri-smartphone-line text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
        <p className="text-muted-foreground">Works seamlessly across desktop, tablet, and mobile devices.</p>
      </div>
    </div>
  );
};

export default Features;
