import { useState, useRef } from "react";
import { Camera, Upload, Check, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import analysisMockup from "@/assets/analysis-mockup.jpg";

const Analysis = () => {
  const [selectedMethod, setSelectedMethod] = useState<"camera" | "upload" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please try uploading a photo instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setShowCamera(false);
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleCameraMethod = () => {
    setSelectedMethod("camera");
    startCamera();
  };

  const handleUploadMethod = () => {
    setSelectedMethod("upload");
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = () => {
    if (!capturedImage) {
      alert("Please capture or upload a photo first.");
      return;
    }
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      window.location.href = "/results";
    }, 3000);
  };

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
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAnalyzing ? (
          <>
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                AI Skin Analysis
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Get personalized skincare recommendations in 30 seconds
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent-blue" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-mint" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  <span>Dermatologist Approved</span>
                </div>
              </div>
            </div>

            {/* Method Selection */}
            {!showCamera && !capturedImage && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-hover ${
                    selectedMethod === "camera" ? "ring-2 ring-accent-blue shadow-glow" : ""
                  }`}
                  onClick={handleCameraMethod}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-accent-blue" />
                    </div>
                    <CardTitle>Take a Selfie</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Use your camera to capture a clear photo of your face
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ensure good lighting</li>
                      <li>• Face the camera directly</li>
                      <li>• Remove makeup if possible</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-hover ${
                    selectedMethod === "upload" ? "ring-2 ring-accent-blue shadow-glow" : ""
                  }`}
                  onClick={handleUploadMethod}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-accent-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-accent-mint" />
                    </div>
                    <CardTitle>Upload Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Choose an existing photo from your device
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• JPEG or PNG format</li>
                      <li>• High resolution preferred</li>
                      <li>• Clear, well-lit face photo</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Camera Interface */}
            {showCamera && (
              <div className="mb-8">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Position Your Face in the Camera</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="relative inline-block">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                    <div className="mt-4 space-x-4">
                      <Button onClick={capturePhoto} variant="hero">
                        Capture Photo
                      </Button>
                      <Button onClick={() => setShowCamera(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Captured/Uploaded Image Preview */}
            {capturedImage && (
              <div className="mb-8">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Your Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <img
                      src={capturedImage}
                      alt="Captured face"
                      className="w-full max-w-md rounded-lg mx-auto"
                    />
                    <div className="mt-4 space-x-4">
                      {selectedMethod === "camera" ? (
                        <Button onClick={retakePhoto} variant="outline">
                          Retake Photo
                        </Button>
                      ) : (
                        <Button onClick={handleUploadMethod} variant="outline">
                          Choose Different Photo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Analysis Preview */}
            <div className="bg-gradient-card rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    What You'll Get
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Skin Type Analysis</p>
                        <p className="text-sm text-muted-foreground">Oily, dry, combination, or sensitive</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-mint rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Concern Detection</p>
                        <p className="text-sm text-muted-foreground">Acne, fine lines, pigmentation, and more</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Product Recommendations</p>
                        <p className="text-sm text-muted-foreground">Personalized routine for your skin</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src={analysisMockup}
                    alt="AI Analysis Preview"
                    className="rounded-lg shadow-card"
                  />
                </div>
              </div>
            </div>

            {/* Start Analysis Button */}
            <div className="text-center">
              <Button
                variant="hero"
                size="lg"
                disabled={!capturedImage}
                onClick={handleAnalysis}
                className="px-12"
              >
                Start Analysis
              </Button>
              {!capturedImage && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please capture or upload a photo to continue
                </p>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                <Shield className="w-4 h-4 inline mr-1" />
                Your photos are processed securely and are not stored on our servers
              </p>
            </div>
          </>
        ) : (
          /* Analysis Progress */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Analyzing Your Skin...
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI is examining your photo to identify your skin type and concerns
            </p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-neutral-medium rounded-full overflow-hidden">
                <div className="h-full bg-gradient-accent rounded-full animate-pulse" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Processing... Please wait a moment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;