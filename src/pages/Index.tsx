import { ArrowRight, Sparkles, Shield, CheckCircle, Star, Package, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroSkincare from "@/assets/hero-skincare.jpg";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Instant AI Analysis",
      description: "Upload a selfie and get immediate skin analysis using our advanced technology",
      color: "text-accent-blue"
    },
    {
      icon: CheckCircle,
      title: "Personalized Recommendations",
      description: "Receive curated product suggestions tailored to your unique skin type and concerns",
      color: "text-accent-mint"
    },
    {
      icon: Shield,
      title: "Expert-Backed Science",
      description: "Our analysis is based on dermatologist-approved algorithms and skincare science",
      color: "text-success"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Finally found products that actually work for my combination skin. The AI analysis was spot-on!",
      skinType: "Combination"
    },
    {
      name: "David L.",
      rating: 5,
      text: "The recommendations cleared up my acne in just 3 weeks. Amazing technology!",
      skinType: "Acne-Prone"
    },
    {
      name: "Emily R.",
      rating: 5,
      text: "Love how personalized everything is. No more guessing what products to buy.",
      skinType: "Sensitive"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-white/95 backdrop-blur-sm shadow-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-primary">
              SkinAI
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-foreground hover:text-accent-blue transition-colors">
                Products
              </Link>
              <Link to="/analysis" className="text-foreground hover:text-accent-blue transition-colors">
                Analysis
              </Link>
            </nav>
            
            {/* Mobile Navigation */}
            <nav className="md:hidden flex items-center space-x-4">
              <Link to="/products" className="text-foreground hover:text-accent-blue transition-colors">
                <Package className="w-5 h-5" />
              </Link>
              <Link to="/analysis" className="text-foreground hover:text-accent-blue transition-colors">
                <Scan className="w-5 h-5" />
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/products">
                <Button variant="outline">
                  Browse Products
                </Button>
              </Link>
              <Link to="/analysis">
                <Button variant="hero">
                  Analyze My Skin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSkincare}
            alt="Beautiful diverse people with healthy skin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Your Perfect{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Skincare Match
              </span>{" "}
              in 30 Seconds
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Get AI-powered skin analysis and personalized product recommendations 
              that actually work for your unique skin type and concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/analysis">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Analyze My Skin Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                  Browse Products
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Expert Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced technology analyzes your skin to provide personalized 
              recommendations that deliver real results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-hover transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Join 50,000+ Users Who Found Their Perfect Routine
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community is saying about their skincare transformations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-warning" />
                      ))}
                    </div>
                    <Badge variant="outline">{testimonial.skinType}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-medium text-foreground">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your personalized skincare journey today with our AI-powered analysis.
            No more guessing, no more wasted money on products that don't work.
          </p>
          <Link to="/analysis">
            <Button variant="hero" size="lg" className="text-lg px-12 py-6 bg-white text-primary hover:bg-white/90">
              Get Your Free Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-white/70 mt-4 text-sm">
            Takes less than 2 minutes • 100% Free • No signup required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">SkinAI</div>
            <p className="text-white/70 mb-6">
              AI-powered skincare analysis and recommendations
            </p>
            <div className="flex justify-center gap-8 text-white/70">
              <Link to="/analysis" className="hover:text-white transition-colors">
                Skin Analysis
              </Link>
              <Link to="/products" className="hover:text-white transition-colors">
                Products
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
