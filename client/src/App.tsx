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
