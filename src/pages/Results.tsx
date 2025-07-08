import { Star, CheckCircle, ArrowRight, Eye, Lightbulb, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import productsHero from "@/assets/products-hero.jpg";
import { type SkinAnalysisResult } from "@/services/openai";

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
    },
    {
      category: "Exfoliant",
      product: {
        name: "BHA Gentle Exfoliant",
        brand: "SkinRenew",
        price: 35,
        rating: 4.4,
        image: productsHero,
        whyRecommended: "Unclogs pores and smooths skin texture for combination skin"
      }
    },
    {
      category: "Toner",
      product: {
        name: "Balancing Toner",
        brand: "HydraBalance",
        price: 24,
        rating: 4.3,
        image: productsHero,
        whyRecommended: "Balances pH and prepares skin for better product absorption"
      }
    },
    {
      category: "Eye Cream",
      product: {
        name: "Revitalizing Eye Cream",
        brand: "YouthGlow",
        price: 52,
        rating: 4.6,
        image: productsHero,
        whyRecommended: "Hydrates delicate eye area without causing milia"
      }
    },
    {
      category: "Night Cream",
      product: {
        name: "Overnight Repair Cream",
        brand: "NightRenew",
        price: 48,
        rating: 4.7,
        image: productsHero,
        whyRecommended: "Rich formula for nighttime repair and hydration"
      }
    },
    {
      category: "Mask",
      product: {
        name: "Clay Purifying Mask",
        brand: "PureClay",
        price: 29,
        rating: 4.5,
        image: productsHero,
        whyRecommended: "Weekly treatment to deep clean pores in oily areas"
      }
    },
    {
      category: "Serum",
      product: {
        name: "Vitamin C Brightening Serum",
        brand: "GlowBoost",
        price: 42,
        rating: 4.8,
        image: productsHero,
        whyRecommended: "Brightens skin and provides antioxidant protection"
      }
    },
    {
      category: "Oil",
      product: {
        name: "Lightweight Face Oil",
        brand: "PureBlend",
        price: 36,
        rating: 4.4,
        image: productsHero,
        whyRecommended: "Nourishes dry areas without clogging pores"
      }
    },
    {
      category: "Mist",
      product: {
        name: "Hydrating Face Mist",
        brand: "MistGlow",
        price: 22,
        rating: 4.2,
        image: productsHero,
        whyRecommended: "Refreshes and hydrates throughout the day"
      }
    }
  ]
};

const Results = () => {
  const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<SkinAnalysisResult | null>(null);
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadMoreProducts = () => {
    if (!analysisData) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 6, analysisResults.recommendations.length));
      setIsLoading(false);
    }, 800);
  };

  // Load analysis data from sessionStorage
  useEffect(() => {
    try {
      const storedAnalysis = sessionStorage.getItem('skinAnalysisResult');
      const storedImage = sessionStorage.getItem('analyzedImage');
      
      if (storedAnalysis) {
        const parsedAnalysis: SkinAnalysisResult = JSON.parse(storedAnalysis);
        setAnalysisData(parsedAnalysis);
      } else {
        setError('No analysis data found. Please take a new analysis.');
      }
      
      if (storedImage) {
        setAnalyzedImage(storedImage);
      }
    } catch (err) {
      console.error('Error loading analysis data:', err);
      setError('Failed to load analysis results. Please try again.');
    }
  }, []);



  // If there's an error or no data, show error state
  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Analysis Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || 'No analysis data available. Please take a new skin analysis.'}
          </p>
          <Button onClick={() => navigate('/analysis')} variant="hero">
            Start New Analysis
          </Button>
        </div>
      </div>
    );
  }

  const hasMoreProducts = visibleProducts < analysisResults.recommendations.length;
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
              <Link to="/products">
                <Button variant="outline">
                  Browse All Products
                </Button>
              </Link>
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
        <div className="space-y-8 mb-12">
          {/* Analyzed Image and Skin Type Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Analyzed Image */}
            {analyzedImage && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <img
                      src={analyzedImage}
                      alt="Analyzed skin"
                      className="w-full max-w-64 rounded-lg mx-auto mb-4 shadow-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Analysis completed on {new Date(analysisData.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Skin Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Your Skin Type
                  <Badge variant="secondary">Analysis Complete</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {analysisData.skin_profile.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 capitalize">
                    {analysisData.skin_profile.type.replace('_', ' ')}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Skin Tone:</strong> {analysisData.skin_profile.skin_tone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Age Range:</strong> {analysisData.skin_profile.age_range}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detected Concerns - Full Width Below */}
          <Card>
            <CardHeader>
              <CardTitle>Detected Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              {/* All Skin Concerns */}
              <div className="mb-6">
                {analysisData.skin_profile.concerns.includes("no visible issues found") ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Great News!</h3>
                    <p className="text-green-600">No visible skin issues found. Your skin looks healthy!</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {analysisData.skin_profile.concerns.map((concern, index) => (
                      <div key={index} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <span className="font-medium text-foreground capitalize">{concern.replace('_', ' ')}</span>
                        <Badge variant="outline" className="text-xs">
                          Detected
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Priority Concerns */}
              {analysisData.immediate_concerns.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-4">Priority Concerns:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysisData.immediate_concerns.map((concern, index) => (
                      <div key={index} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground capitalize">{concern.issue.replace('_', ' ')}</span>
                          <Badge 
                            variant={concern.urgency === "high" ? "destructive" : concern.urgency === "medium" ? "secondary" : "outline"}
                          >
                            {concern.urgency} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {concern.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              Curated specifically for your {analysisData.skin_profile.type.replace('_', ' ')} skin with your detected concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analysisResults.recommendations.slice(0, visibleProducts).map((rec, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl hover:shadow-accent-blue/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms',
                  animationFillMode: 'both'
                }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={rec.product.image}
                      alt={rec.product.name}
                      className="w-full h-56 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent-blue text-accent-blue-foreground shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                        {rec.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                        {rec.product.rating} <Star className="w-3 h-3 fill-current ml-1 text-yellow-500" />
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {rec.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">{rec.product.brand}</p>
                  <p className="text-sm text-accent-blue mb-3 font-semibold">
                    Why it's perfect for you:
                  </p>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {rec.product.whyRecommended}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-foreground group-hover:text-accent-blue transition-colors duration-300">
                      ${rec.product.price}
                    </span>
                  </div>
                  <Button 
                    variant="electric" 
                    className="w-full transform transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/30 group-hover:scale-105"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProducts && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMoreProducts}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/20"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mr-2" />
                    Loading More Products...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Load More Products ({analysisResults.recommendations.length - visibleProducts} remaining)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Personal Tips */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-mint" />
                Personal Tips for {analysisData.skin_profile.type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Skin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData.progress_tracking?.tips && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-accent-blue" />
                      Daily Care Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {analysisData.progress_tracking.tips.slice(0, 4).map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-accent-mint" />
                      Lifestyle Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {analysisData.progress_tracking.tips.slice(4, 8).map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="mt-6 p-4 bg-accent-blue/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Pro Tip:</strong> {analysisData.skin_profile.type.replace('_', ' ')} skin requires consistent care and attention. 
                  Monitor your skin regularly and adjust your routine as needed. Consider getting a re-analysis every 3-6 months to track progress.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Your {analysisData.skin_profile.type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Skin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Based on your analysis, here's what characterizes your skin type:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Skin Type:</strong> {analysisData.skin_profile.type.replace('_', ' ').charAt(0).toUpperCase() + analysisData.skin_profile.type.replace('_', ' ').slice(1)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Skin Tone:</strong> {analysisData.skin_profile.skin_tone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                  <span><strong>Primary Concerns:</strong> {analysisData.skin_profile.concerns.slice(0, 2).map(concern => concern.replace('_', ' ')).join(', ')}</span>
                </li>
                {analysisData.progress_tracking?.expected_timeline && (
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                    <span><strong>Expected Results:</strong> {analysisData.progress_tracking.expected_timeline}</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Routine Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisData?.skincare_routine?.morning && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Morning Routine</h4>
                  <ol className="space-y-1 text-sm text-muted-foreground">
                    {analysisData.skincare_routine.morning.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-medium text-accent-blue">{index + 1}.</span>
                        <div>
                          <span className="font-medium">{step.product_type}</span>
                          {step.key_ingredients && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({step.key_ingredients.join(', ')})
                            </span>
                          )}
                          {step.purpose && (
                            <p className="text-xs text-muted-foreground mt-1">{step.purpose}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {analysisData?.skincare_routine?.evening && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Evening Routine</h4>
                  <ol className="space-y-1 text-sm text-muted-foreground">
                    {analysisData.skincare_routine.evening.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-medium text-accent-blue">{index + 1}.</span>
                        <div>
                          <span className="font-medium">{step.product_type}</span>
                          {step.key_ingredients && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({step.key_ingredients.join(', ')})
                            </span>
                          )}
                          {step.purpose && (
                            <p className="text-xs text-muted-foreground mt-1">{step.purpose}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get all your recommended products and start seeing results in just a few weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Shop Complete Routine - $143
            </Button>
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