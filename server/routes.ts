import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { urlSchema } from "@shared/schema";
import { setupUVProxy, createProxyUrl } from "./proxy";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Setup UV Proxy middleware if in non-static environment
  setupUVProxy(app);

  // API endpoint to create a proxy URL
  app.post('/api/proxy', async (req, res) => {
    try {
      const validation = urlSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0]?.message || 'Invalid URL format'
        });
      }
      
      let { url } = validation.data;
      
      // Check if input is a URL or a search query
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Default search engine template for DuckDuckGo
        const searchEngine = "https://duckduckgo.com/?t=h_&q=%s&ia=web";
        
        // Replace %s in the search engine URL with the encoded query
        url = searchEngine.replace('%s', encodeURIComponent(url));
      }
      
      // Create a proxy URL for the requested site
      const proxyUrl = createProxyUrl(url);
      
      // Log the proxy request (optional)
      await storage.logProxyRequest({
        url,
        timestamp: new Date().toISOString(),
        userId: undefined, // Use actual user ID if authenticated
        success: true,
        errorMessage: undefined,
      });
      
      return res.json({ proxyUrl });
    } catch (error) {
      console.error('Proxy error:', error);
      
      // Log the failed request
      if (req.body && req.body.url) {
        await storage.logProxyRequest({
          url: req.body.url,
          timestamp: new Date().toISOString(),
          userId: undefined,
          success: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      
      return res.status(500).json({ 
        message: 'Failed to create proxy URL'
      });
    }
  });

  return httpServer;
}
