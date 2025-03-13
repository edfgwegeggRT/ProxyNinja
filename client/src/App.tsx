import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

interface AppProps {
  isStaticEnvironment: boolean;
}

function Router({ isStaticEnvironment }: { isStaticEnvironment: boolean }) {
  return (
    <Switch>
      <Route path="/">
        <Home isStaticEnvironment={isStaticEnvironment} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App({ isStaticEnvironment }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router isStaticEnvironment={isStaticEnvironment} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import ProxyForm from './components/ProxyForm';
import Footer from './components/Footer';
import ProxyContent from './components/ProxyContent';

interface AppProps {
  isStaticEnvironment: boolean;
}

function App({ isStaticEnvironment }: AppProps) {
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  
  const handleProxySubmit = (url: string) => {
    // Store the original URL for display purposes
    setOriginalUrl(url);
    
    if (isStaticEnvironment) {
      // For Netlify: use Netlify function
      const encodedUrl = encodeURIComponent(url);
      setProxyUrl(`/.netlify/functions/proxy?url=${encodedUrl}`);
    } else {
      // For Replit: use server proxy
      const encodedUrl = encodeURIComponent(url);
      setProxyUrl(`/api/proxy?url=${encodedUrl}`);
    }
  };
  
  const handleCloseProxy = () => {
    setProxyUrl(null);
    setOriginalUrl('');
  };
  
  const handleRefreshProxy = () => {
    // Re-trigger the proxy with the same URL
    if (originalUrl) {
      handleProxySubmit(originalUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Hero />
        
        {proxyUrl ? (
          <ProxyContent 
            proxyUrl={proxyUrl}
            originalUrl={originalUrl}
            onClose={handleCloseProxy}
            onRefresh={handleRefreshProxy}
          />
        ) : (
          <>
            <ProxyForm onSubmit={handleProxySubmit} />
            <Features />
          </>
        )}
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
