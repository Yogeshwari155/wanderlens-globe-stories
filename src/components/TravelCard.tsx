import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TravelPost } from "@/data/travelPosts";

interface TravelCardProps {
  post: TravelPost;
  onLike: (id: string) => void;
}

export const TravelCard = ({ post, onLike }: TravelCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(post.id);
  };

  return (
    <Link to={`/post/${post.id}`}>
      <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Like button */}
          <button
            onClick={handleLike}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 group z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${
                post.isLiked 
                  ? 'fill-heart text-heart animate-heart-bounce' 
                  : 'text-muted-foreground group-hover:text-heart'
              }`}
            />
          </button>

          {/* Location badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              {post.country}
            </Badge>
          </div>

          {/* Title and description overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-2 line-clamp-1">
              {post.title}
            </h3>
            <p className="text-sm text-white/90 mb-3 line-clamp-2">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/80">
                {post.location}
              </span>
              <div className="flex items-center space-x-1 text-sm text-white/80">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs border-border hover:bg-accent transition-colors"
              >
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};