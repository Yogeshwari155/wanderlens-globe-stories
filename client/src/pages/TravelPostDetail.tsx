import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getPostById } from "@/data/travelPosts";

export const TravelPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : null;
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Link to="/" className="absolute top-6 left-6 z-10">
          <Button variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{post.location}, {post.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleLike}
                  className="bg-white/90 backdrop-blur-sm px-4"
                >
                  <Heart
                    className={`w-5 h-5 mr-2 transition-all duration-200 ${
                      isLiked 
                        ? 'fill-heart text-heart animate-heart-bounce' 
                        : 'text-muted-foreground'
                    }`}
                  />
                  {likes}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">The Story</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.story}
              </p>
            </Card>

            {/* Photo Gallery */}
            {post.images.length > 1 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Photo Gallery</h2>
                <PhotoGallery images={post.images} title={post.title} />
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="bg-accent hover:bg-accent/80 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Location Map Placeholder */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Location</h3>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Interactive map</p>
                  <p className="text-xs">Coming soon</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>{post.location}</strong><br />
                {post.country}
              </p>
              {post.coordinates && (
                <p className="text-xs text-muted-foreground mt-2">
                  {post.coordinates.lat.toFixed(4)}, {post.coordinates.lng.toFixed(4)}
                </p>
              )}
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Likes</span>
                  <span className="font-medium">{likes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Photos</span>
                  <span className="font-medium">{post.images.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-sm">{formatDate(post.date)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};