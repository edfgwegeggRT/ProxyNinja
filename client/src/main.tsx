import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Detect if we're in a static environment (Netlify) or dynamic (Replit)
// This will be used to determine which proxy method to use
const isStaticEnvironment = !window.location.hostname.includes('replit');

const root = createRoot(document.getElementById("root")!);
root.render(<App isStaticEnvironment={isStaticEnvironment} />);
