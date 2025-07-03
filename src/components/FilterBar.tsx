import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { getAllTags } from "@/data/travelPosts";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
}

const countries = ["Chile", "USA", "Canada", "Morocco"];

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagsChange,
  selectedCountries,
  onCountriesChange
}: FilterBarProps) => {
  const allTags = getAllTags();
  const [showFilters, setShowFilters] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const handleCountryToggle = (country: string) => {
    const newCountries = selectedCountries.includes(country)
      ? selectedCountries.filter(c => c !== country)
      : [...selectedCountries, country];
    onCountriesChange(newCountries);
  };

  const clearAllFilters = () => {
    onSearchChange("");
    onTagsChange([]);
    onCountriesChange([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedCountries.length > 0;

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search destinations, stories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 ${showFilters ? 'bg-accent' : ''}`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="px-3"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tags Filter */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Tags</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTags.length > 0 
                      ? `${selectedTags.length} selected`
                      : "Select tags"
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {allTags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    >
                      #{tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Countries Filter */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Countries</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedCountries.length > 0 
                      ? `${selectedCountries.length} selected`
                      : "Select countries"
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {countries.map((country) => (
                    <DropdownMenuCheckboxItem
                      key={country}
                      checked={selectedCountries.includes(country)}
                      onCheckedChange={() => handleCountryToggle(country)}
                    >
                      {country}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {selectedTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-accent"
            >
              #{tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-2 text-accent-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedCountries.map((country) => (
            <Badge 
              key={country} 
              variant="secondary"
              className="bg-accent"
            >
              {country}
              <button
                onClick={() => handleCountryToggle(country)}
                className="ml-2 text-accent-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};