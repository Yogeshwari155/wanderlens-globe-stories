import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="travel"
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-50 shadow-lg transition-all duration-300 ease-in-out",
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </Button>
  );
};