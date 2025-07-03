import { Link } from "react-router-dom";
import { MapPin, Camera, Users, Globe } from "lucide-react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-travel text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About WanderLens
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Where every photo tells a story and every journey inspires the next adventure
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              WanderLens is more than just a photo sharing platform—it's a community of storytellers, 
              adventurers, and dreamers who believe that every journey, no matter how big or small, 
              has a story worth sharing. We're here to help you capture, preserve, and share those 
              magical moments that make travel so transformative.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-travel rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Visual Storytelling</h3>
              <p className="text-muted-foreground">
                Transform your travel photos into compelling stories that inspire others to explore the world.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Discover Places</h3>
              <p className="text-muted-foreground">
                Explore destinations through the eyes of fellow travelers and find your next adventure.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Connect & Share</h3>
              <p className="text-muted-foreground">
                Join a community of like-minded travelers and share experiences that matter.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Global Community</h3>
              <p className="text-muted-foreground">
                Be part of a worldwide network of travelers sharing authentic experiences.
              </p>
            </Card>
          </div>

          {/* Story Section */}
          <Card className="p-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">The Story Behind WanderLens</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                WanderLens was born from a simple belief: that travel is one of life's greatest teachers, 
                and the stories we collect along the way deserve to be preserved and shared. Whether you're 
                capturing the misty peaks of Patagonia, the golden waves of California, or the endless 
                dunes of the Sahara, every photo has the power to transport others to that exact moment.
              </p>
              <p className="mb-4">
                We created WanderLens as a space where travelers can go beyond the typical social media 
                post. Here, you can craft rich, detailed stories that give context to your images, 
                share the emotions behind the moments, and inspire others to seek their own adventures.
              </p>
              <p>
                Join us in building a platform that celebrates the art of travel photography and 
                the power of storytelling. Because every journey matters, and every story deserves to be told.
              </p>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Share Your Story?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Start capturing and sharing your travel experiences with the WanderLens community.
            </p>
            <Link to="/">
              <Button variant="travel" size="lg" className="animate-float">
                Explore Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};