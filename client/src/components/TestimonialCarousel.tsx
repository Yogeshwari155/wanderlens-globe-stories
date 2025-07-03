import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b353?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment: "WanderLens has completely transformed how I document my travels. The photo organization and storytelling features are incredible!",
    location: "San Francisco, CA"
  },
  {
    id: "2", 
    name: "Marco Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment: "As a digital nomad, this platform helps me keep all my travel memories organized and easily shareable with friends and family.",
    location: "Barcelona, Spain"
  },
  {
    id: "3",
    name: "Emma Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    comment: "Love the clean interface and smooth animations. It makes browsing travel stories such a delightful experience.",
    location: "Tokyo, Japan"
  },
  {
    id: "4",
    name: "David Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment: "The filtering and search features make it so easy to find inspiration for my next adventure. Highly recommended!",
    location: "London, UK"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-8 text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-foreground mb-6 text-lg italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        onClick={goToPrevious}
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        onClick={goToNext}
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-primary scale-110"
                : "bg-muted hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};