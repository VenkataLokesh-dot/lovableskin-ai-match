
import { useState } from "react";
import { Search, Filter, Star, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import productsHero from "@/assets/products-hero.jpg";

// Mock product data
const products = [
  {
    id: 1,
    name: "Hydrating Vitamin C Serum",
    brand: "GlowTech",
    price: 45,
    rating: 4.8,
    reviews: 1234,
    skinTypes: ["All", "Dry", "Combination"],
    concerns: ["Dullness", "Fine Lines"],
    image: productsHero,
    benefits: "Brightens & Hydrates"
  },
  {
    id: 2,
    name: "Gentle Foam Cleanser",
    brand: "PureSkin",
    price: 28,
    rating: 4.6,
    reviews: 892,
    skinTypes: ["Sensitive", "Dry"],
    concerns: ["Irritation", "Dryness"],
    image: productsHero,
    benefits: "Soothes & Cleanses"
  },
  {
    id: 3,
    name: "Niacinamide Treatment",
    brand: "ClearPath",
    price: 32,
    rating: 4.7,
    reviews: 756,
    skinTypes: ["Oily", "Acne-Prone"],
    concerns: ["Acne", "Large Pores"],
    image: productsHero,
    benefits: "Controls Oil & Minimizes Pores"
  },
  {
    id: 4,
    name: "Retinol Night Cream",
    brand: "AgeReverse",
    price: 68,
    rating: 4.9,
    reviews: 543,
    skinTypes: ["Mature", "Normal"],
    concerns: ["Aging", "Fine Lines"],
    image: productsHero,
    benefits: "Anti-Aging & Renewal"
  },
  {
    id: 5,
    name: "SPF 50 Daily Moisturizer",
    brand: "SunGuard",
    price: 38,
    rating: 4.5,
    reviews: 1098,
    skinTypes: ["All"],
    concerns: ["Sun Protection"],
    image: productsHero,
    benefits: "Protects & Moisturizes"
  },
  {
    id: 6,
    name: "Exfoliating Toner",
    brand: "GlowTech",
    price: 42,
    rating: 4.4,
    reviews: 687,
    skinTypes: ["Oily", "Combination"],
    concerns: ["Dullness", "Texture"],
    image: productsHero,
    benefits: "Exfoliates & Refines"
  }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || product.skinTypes.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              SkinAI
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Link to="/analysis">
                  <Button variant="hero" size="lg">
                    Analyze Your Skin
                  </Button>
                </Link>
              </div>
              <div className="md:hidden">
                <Link to="/analysis">
                  <Button variant="hero" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Skincare Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover science-backed skincare solutions for every skin type
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Oily", "Dry", "Sensitive", "Combination", "Mature"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "electric" : "outline"}
                onClick={() => setSelectedFilter(filter)}
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {product.rating} <Star className="w-3 h-3 fill-current ml-1" />
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <p className="text-sm text-accent-blue font-medium mb-3">
                  {product.benefits}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.concerns.slice(0, 2).map((concern) => (
                    <Badge key={concern} variant="outline" className="text-xs">
                      {concern}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="electric">
                  <Eye className="w-4 h-4 mr-2" />
                  View Product
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Not sure what's right for your skin?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get personalized product recommendations with our AI skin analysis
          </p>
          <Link to="/analysis">
            <Button variant="hero" size="lg">
              Get Personalized Recommendations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
