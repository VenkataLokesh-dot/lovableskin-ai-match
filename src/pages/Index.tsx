
import { ArrowRight, Camera, Sparkles, Users, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-skincare.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-card sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">SkinAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/analysis" className="text-foreground hover:text-primary transition-colors">
                Analysis
              </Link>
              <Link to="/analysis">
                <Button variant="hero">
                  Try Now
                </Button>
              </Link>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/products">
                <Button variant="outline" size="icon">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/analysis">
                <Button variant="hero" size="icon">
                  <Camera className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="no-scrollbar">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Beautiful skincare" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-overlay"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                Skincare Match
              </span>
              in 30 Seconds
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              AI-powered skin analysis that provides personalized product recommendations 
              tailored to your unique skin type and concerns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analysis">
                <Button variant="hero" size="lg" className="px-8">
                  <Camera className="mr-2 h-5 w-5" />
                  Analyze My Skin Now
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="glass" size="lg" className="px-8">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">Dermatologist Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">50,000+ Users</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI technology analyzes your skin to provide personalized recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Camera className="h-8 w-8 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    1. Take a Selfie
                  </h3>
                  <p className="text-muted-foreground">
                    Upload a clear photo of your face using our secure camera interface
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-mint/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-accent-mint" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    2. AI Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Our advanced AI identifies your skin type, concerns, and specific needs
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-accent-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    3. Get Recommendations
                  </h3>
                  <p className="text-muted-foreground">
                    Receive personalized product recommendations and skincare routine
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-muted-foreground">
                Join the community of people who found their perfect skincare routine
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-blue mb-2">50,000+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-mint mb-2">95%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-blue mb-2">30 sec</div>
                <div className="text-muted-foreground">Analysis Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-mint mb-2">500+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your personalized skincare journey today with our AI-powered analysis
            </p>
            <Link to="/analysis">
              <Button variant="hero" size="lg" className="px-12">
                Get Started - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">SkinAI</h3>
                <p className="text-white/80">
                  Your trusted partner for personalized skincare recommendations powered by AI.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link to="/analysis" className="block text-white/80 hover:text-white transition-colors">
                    Skin Analysis
                  </Link>
                  <Link to="/products" className="block text-white/80 hover:text-white transition-colors">
                    Products
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Privacy & Security</h4>
                <p className="text-white/80 text-sm">
                  Your photos are processed securely and never stored on our servers.
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
              <p>&copy; 2024 SkinAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
