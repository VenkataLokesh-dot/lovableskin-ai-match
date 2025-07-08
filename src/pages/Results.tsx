
import { Star, CheckCircle, ArrowRight, Eye, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import productsHero from "@/assets/products-hero.jpg";

// Mock analysis results
const analysisResults = {
  skinType: "Combination",
  confidence: 92,
  concerns: [
    { name: "Enlarged Pores", severity: "Moderate", confidence: 88 },
    { name: "Oily T-Zone", severity: "Mild", confidence: 95 },
    { name: "Dry Cheeks", severity: "Mild", confidence: 76 }
  ],
  recommendations: [
    {
      category: "Cleanser",
      product: {
        name: "Gentle Foaming Cleanser",
        brand: "PureSkin",
        price: 28,
        rating: 4.6,
        image: productsHero,
        whyRecommended: "Perfect for combination skin, cleanses without over-drying"
      }
    },
    {
      category: "Treatment",
      product: {
        name: "Niacinamide Serum",
        brand: "ClearPath",
        price: 32,
        rating: 4.7,
        image: productsHero,
        whyRecommended: "Minimizes pores and controls oil production in T-zone"
      }
    },
    {
      category: "Moisturizer",
      product: {
        name: "Hydrating Day Cream",
        brand: "GlowTech",
        price: 45,
        rating: 4.8,
        image: productsHero,
        whyRecommended: "Lightweight formula that hydrates dry areas without clogging pores"
      }
    },
    {
      category: "Sunscreen",
      product: {
        name: "SPF 50 Daily Protection",
        brand: "SunGuard",
        price: 38,
        rating: 4.5,
        image: productsHero,
        whyRecommended: "Non-comedogenic formula ideal for combination skin"
      }
    }
  ],
  personalTips: [
    "Use a gentle cleanser twice daily to avoid over-stripping your skin",
    "Apply moisturizer to dry areas (cheeks) while using lighter products on your T-zone",
    "Always use sunscreen, even indoors, to prevent premature aging",
    "Introduce new products gradually to avoid irritation",
    "Stay hydrated and maintain a balanced diet for healthy skin from within",
    "Avoid touching your face throughout the day to prevent bacteria transfer"
  ]
};

const Results = () => {
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
                <Link to="/products">
                  <Button variant="outline">
                    Browse All Products
                  </Button>
                </Link>
              </div>
              <div className="md:hidden">
                <Link to="/products">
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Analysis Complete!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your personalized skincare analysis and recommendations
          </p>
        </div>

        {/* Analysis Results */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Skin Type */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Your Skin Type
                <Badge variant="secondary">{analysisResults.confidence}% confident</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {analysisResults.skinType.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {analysisResults.skinType}
                </h3>
                <p className="text-sm text-muted-foreground">
                  You have combination skin with an oily T-zone and drier cheek areas. 
                  This is very common and requires a balanced skincare approach.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detected Concerns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Detected Concerns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.concerns.map((concern, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{concern.name}</span>
                    <Badge 
                      variant={concern.severity === "Mild" ? "secondary" : "outline"}
                      className={concern.severity === "Moderate" ? "bg-warning/10 text-warning-foreground" : ""}
                    >
                      {concern.severity}
                    </Badge>
                  </div>
                  <Progress value={concern.confidence} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {concern.confidence}% confidence
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Personal Tips */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-mint" />
                Personal Tips for {analysisResults.skinType} Skin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResults.personalTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-mint/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent-mint">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Routine */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Perfect Skincare Routine
            </h2>
            <p className="text-lg text-muted-foreground">
              Curated specifically for combination skin with your detected concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisResults.recommendations.map((rec, index) => (
              <Card key={index} className="group hover:shadow-hover transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={rec.product.image}
                      alt={rec.product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent-blue text-accent-blue-foreground">
                        {rec.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {rec.product.rating} <Star className="w-3 h-3 fill-current ml-1" />
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {rec.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{rec.product.brand}</p>
                  <p className="text-sm text-accent-blue mb-3 font-medium">
                    Why it's perfect for you:
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {rec.product.whyRecommended}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-foreground">
                      ${rec.product.price}
                    </span>
                  </div>
                  <Button variant="electric" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Combination Skin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Combination skin is characterized by having different skin types in different areas of your face:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>T-Zone (forehead, nose, chin):</strong> Tends to be oily with visible pores</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Cheeks and temples:</strong> Usually normal to dry</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Goal:</strong> Balance oil production while maintaining hydration</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Routine Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Morning Routine</h4>
                <ol className="space-y-1 text-sm text-muted-foreground">
                  <li>1. Gentle Foaming Cleanser</li>
                  <li>2. Niacinamide Serum (T-zone focus)</li>
                  <li>3. Hydrating Day Cream</li>
                  <li>4. SPF 50 Daily Protection</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Evening Routine</h4>
                <ol className="space-y-1 text-sm text-muted-foreground">
                  <li>1. Gentle Foaming Cleanser</li>
                  <li>2. Niacinamide Serum</li>
                  <li>3. Hydrating Night Moisturizer</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore these recommended products and start seeing results in just a few weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="hero" size="lg">
                Browse Recommended Products
              </Button>
            </Link>
            <Link to="/analysis">
              <Button variant="outline" size="lg">
                Analyze Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
