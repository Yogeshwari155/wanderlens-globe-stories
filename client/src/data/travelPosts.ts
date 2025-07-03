export interface TravelPost {
  id: string;
  title: string;
  location: string;
  country: string;
  description: string;
  story: string;
  images: string[];
  coverImage: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  date: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const travelPosts: TravelPost[] = [
  {
    id: "1",
    title: "Misty Mountains of Patagonia",
    location: "Torres del Paine",
    country: "Chile",
    description: "Breathtaking granite towers rising through morning mist",
    story: "Waking up at 4 AM to catch the first light hitting the iconic towers of Torres del Paine was absolutely worth it. The way the mist danced around these ancient granite peaks felt like witnessing nature's own symphony. Every step of the grueling hike was rewarded with views that no camera could truly capture.",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&h=600&fit=crop"
    ],
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    tags: ["mountains", "hiking", "sunrise", "patagonia"],
    likes: 127,
    isLiked: false,
    date: "2024-01-15",
    coordinates: { lat: -50.9423, lng: -73.4068 }
  },
  {
    id: "2", 
    title: "Ocean Waves at Golden Hour",
    location: "Big Sur",
    country: "USA",
    description: "Perfect waves crashing against rugged coastline",
    story: "The California coast never fails to amaze me. Standing on the cliffs of Big Sur, watching the Pacific Ocean's endless dance with the rocky shore, I felt completely humbled by nature's power. The golden hour light transformed each wave into liquid gold, creating a moment of pure magic.",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop"
    ],
    coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop",
    tags: ["ocean", "waves", "sunset", "california"],
    likes: 203,
    isLiked: true,
    date: "2024-02-03",
    coordinates: { lat: 36.2704, lng: -121.8081 }
  },
  {
    id: "3",
    title: "Serene Forest Lake",
    location: "Banff National Park",
    country: "Canada",
    description: "Crystal clear waters reflecting towering pines",
    story: "Finding this hidden gem required a 6-hour hike through dense forest, but the reward was beyond my wildest dreams. The lake's surface was so still it created a perfect mirror of the surrounding mountains and trees. I spent hours here, completely disconnected from the world, just soaking in the profound peace.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop"
    ],
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    tags: ["lake", "forest", "reflection", "canada"],
    likes: 89,
    isLiked: false,
    date: "2024-01-28",
    coordinates: { lat: 51.4968, lng: -115.9281 }
  },
  {
    id: "4",
    title: "Desert Sunrise Solitude",
    location: "Sahara Desert",
    country: "Morocco",
    description: "Endless dunes painted in morning light",
    story: "Camping under the stars in the Sahara and waking up to this sunrise was a spiritual experience. The silence is unlike anything I've ever experienced - so complete that you can hear your own heartbeat. As the sun painted the dunes in shades of gold and amber, I understood why this place has inspired travelers for centuries.",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop"
    ],
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    tags: ["desert", "sunrise", "morocco", "solitude"],
    likes: 156,
    isLiked: true,
    date: "2024-03-12",
    coordinates: { lat: 25.0136, lng: -4.0000 }
  }
];

export const getPostById = (id: string): TravelPost | undefined => {
  return travelPosts.find(post => post.id === id);
};

export const getPostsByTag = (tag: string): TravelPost[] => {
  return travelPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
  );
};

export const getPostsByLocation = (location: string): TravelPost[] => {
  return travelPosts.filter(post => 
    post.location.toLowerCase().includes(location.toLowerCase()) ||
    post.country.toLowerCase().includes(location.toLowerCase())
  );
};

export const getAllTags = (): string[] => {
  const allTags = travelPosts.flatMap(post => post.tags);
  return [...new Set(allTags)].sort();
};