import { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real implementation, we would change the theme here
  };

  return (
    <header className="w-full py-4 px-6 border-b border-primary/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-primary mr-2">
            <i className="ri-shield-flash-line text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold tracking-wider">
            <span className="text-white">Neon</span>
            <span className="text-primary">Proxy</span>
          </h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#help" className="text-muted-foreground hover:text-primary transition-colors">
            Help
          </a>
          <button 
            className="text-muted-foreground hover:text-primary transition-colors" 
            title="Toggle Theme"
            onClick={toggleTheme}
          >
            <i className={`${darkMode ? 'ri-moon-line' : 'ri-sun-line'} text-xl`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
