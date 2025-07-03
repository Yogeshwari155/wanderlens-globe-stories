import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { TravelCard } from "@/components/TravelCard";
import { FilterBar } from "@/components/FilterBar";
import { HeroImageSlider } from "@/components/HeroImageSlider";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { BackToTop } from "@/components/BackToTop";
import { travelPosts } from "@/data/travelPosts";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [posts, setPosts] = useState(travelPosts);

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.story.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => post.tags.includes(tag));

      const matchesCountries = selectedCountries.length === 0 ||
        selectedCountries.includes(post.country);

      return matchesSearch && matchesTags && matchesCountries;
    });
  }, [posts, searchQuery, selectedTags, selectedCountries]);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <HeroImageSlider />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Capture Your Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              Share your travel stories through stunning photography and connect with fellow wanderers
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold">{travelPosts.length}</div>
                <div className="text-sm">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {travelPosts.reduce((acc, post) => acc + post.images.length, 0)}
                </div>
                <div className="text-sm">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {new Set(travelPosts.map(post => post.country)).size}
                </div>
                <div className="text-sm">Countries</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <div className="w-20 h-20 bg-white rounded-full" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 bg-white rounded-full" />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            selectedCountries={selectedCountries}
            onCountriesChange={setSelectedCountries}
          />
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredPosts.length === travelPosts.length 
              ? `Showing all ${filteredPosts.length} travel stories`
              : `Showing ${filteredPosts.length} of ${travelPosts.length} travel stories`
            }
          </p>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TravelCard post={post} onLike={handleLike} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-medium mb-2">No stories found</h3>
              <p>Try adjusting your search or filters to find more travel stories.</p>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Travelers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of adventurers who trust WanderLens to capture and share their most precious travel memories.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default Index;
