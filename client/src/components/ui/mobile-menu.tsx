import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className={cn("md:hidden", className)}>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50"
        aria-label="Toggle mobile menu"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={cn(
              "absolute inset-0 w-6 h-6 transition-all duration-300",
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          />
          <X
            className={cn(
              "absolute inset-0 w-6 h-6 transition-all duration-300",
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          />
        </div>
      </Button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-background border-l border-border z-50",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16 px-6">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 story-link"
            >
              Explore
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 story-link"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};