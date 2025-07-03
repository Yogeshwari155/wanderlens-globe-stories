import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileMenu } from "@/components/ui/mobile-menu";

export const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-travel text-white group-hover:scale-105 transition-transform duration-200">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                WanderLens
              </h1>
              <p className="text-sm text-muted-foreground">
                Capture. Share. Explore.
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium story-link"
            >
              Explore
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-primary transition-colors story-link"
            >
              About
            </Link>
          </nav>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};