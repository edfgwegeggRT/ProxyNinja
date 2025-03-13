import { useState } from "react";
import Header from "@/components/Header";
import ProxyForm from "@/components/ProxyForm";
import ProxyContent from "@/components/ProxyContent";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorDisplay from "@/components/ErrorDisplay";
import { useProxyState } from "@/hooks/useProxyState";

interface HomeProps {
  isStaticEnvironment: boolean;
}

export default function Home({ isStaticEnvironment }: HomeProps) {
  const {
    urlInput,
    setUrlInput,
    currentProxyUrl,
    setCurrentProxyUrl,
    displayUrl,
    isLoading,
    setIsLoading,
    error,
    setError,
    processUrl,
    closeProxy,
    refreshProxy,
  } = useProxyState(isStaticEnvironment);

  const [notification, setNotification] = useState<{
    message: string;
    type: "info" | "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "info",
    visible: false,
  });

  const showNotification = (message: string, type: "info" | "success" | "error" = "info") => {
    setNotification({ message, type, visible: true });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      await processUrl(url);
      showNotification("URL loaded successfully", "success");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => setError("");
  
  const handleRefresh = () => {
    showNotification("Refreshing content...", "info");
    refreshProxy();
    setTimeout(() => {
      showNotification("Content refreshed", "success");
    }, 1000);
  };

  const handleCloseProxy = () => {
    closeProxy();
    setUrlInput("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Title and Description */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Fast & Secure Web <span className="text-primary">Proxy</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse any website anonymously through our UV static proxy. 
              Your data stays private, your browsing stays secure.
            </p>
          </div>

          <ProxyForm 
            urlInput={urlInput} 
            setUrlInput={setUrlInput} 
            onSubmit={handleSubmit} 
          />

          {isLoading && <LoadingIndicator />}
          
          {error && (
            <ErrorDisplay 
              errorMessage={error} 
              onDismiss={handleDismissError} 
            />
          )}
          
          {currentProxyUrl && !isLoading && !error && (
            <ProxyContent 
              displayUrl={displayUrl} 
              proxyUrl={currentProxyUrl}
              onRefresh={handleRefresh}
              onClose={handleCloseProxy}
            />
          )}

          <Features />
        </div>
      </main>

      <Footer />
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        visible={notification.visible}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
