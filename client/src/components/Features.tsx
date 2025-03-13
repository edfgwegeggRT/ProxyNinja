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
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: 'ri-shield-line',
      title: 'Anonymous Browsing',
      description: 'Browse websites without revealing your identity or location'
    },
    {
      icon: 'ri-lock-line',
      title: 'Secure Connection',
      description: 'All traffic is encrypted and secure from prying eyes'
    },
    {
      icon: 'ri-rocket-line',
      title: 'High Performance',
      description: 'Built for speed with minimal latency and resource usage'
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-display">
        Why Choose NeonProxy?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all">
            <i className={`${feature.icon} text-4xl text-cyan-400 mb-4`}></i>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
