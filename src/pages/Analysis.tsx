import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Check, Shield, Sparkles, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import analysisMockup from "@/assets/analysis-mockup.jpg";
import { analyzeSkinWithOpenAI, validateOpenAIConfig, type SkinAnalysisResult } from "@/services/openai";

const Analysis = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<"camera" | "upload" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start camera and show modal
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      setCameraStream(stream);
      setShowCameraModal(true);
      
      // Wait for modal to render, then set video source
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please try uploading a photo instead.");
    }
  };

  // Stop camera and close modal
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCameraModal(false);
  };

  // Capture photo from video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip the image horizontally to match the mirrored video
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  // Handle camera method selection
  const handleCameraMethod = () => {
    setSelectedMethod("camera");
    startCamera();
  };

  // Handle upload method selection
  const handleUploadMethod = () => {
    setSelectedMethod("upload");
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size too large. Please select an image smaller than 5MB.');
        return;
      }
      
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setUploadedFile(null);
    setAnalysisError(null);
    startCamera();
  };

  // Start analysis with OpenAI
  const handleAnalysis = async () => {
    if (!capturedImage) {
      alert("Please capture or upload a photo first.");
      return;
    }

    // Validate OpenAI configuration
    if (!validateOpenAIConfig()) {
      setAnalysisError("Analysis service not configured. Please check your configuration.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisProgress("Preparing image for analysis...");

    try {
      let imageSource: File | HTMLCanvasElement;
      
      if (selectedMethod === "upload" && uploadedFile) {
        imageSource = uploadedFile;
        setAnalysisProgress("Analyzing uploaded image with AI...");
      } else if (selectedMethod === "camera" && canvasRef.current) {
        imageSource = canvasRef.current;
        setAnalysisProgress("Analyzing captured photo with AI...");
      } else {
        throw new Error("No valid image source found");
      }

      setAnalysisProgress("Analyzing your skin...");
      
      // Perform AI analysis
      const analysisResult: SkinAnalysisResult = await analyzeSkinWithOpenAI(imageSource);
      
      setAnalysisProgress("Analysis complete! Preparing results...");
      
      // Store results in sessionStorage for the Results page
      sessionStorage.setItem('skinAnalysisResult', JSON.stringify(analysisResult));
      sessionStorage.setItem('analyzedImage', capturedImage);
      
      // Navigate to results page
      setTimeout(() => {
        navigate('/results');
      }, 1000);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
      setAnalysisProgress("");
      
      if (error instanceof Error) {
        setAnalysisError(error.message);
      } else {
        setAnalysisError('An unexpected error occurred during analysis. Please try again.');
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showCameraModal) {
        if (event.key === 'Escape') {
          stopCamera();
        } else if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          capturePhoto();
        }
      }
    };

    if (showCameraModal) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [showCameraModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

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
            {!capturedImage && (
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
                      className="w-full max-w-md rounded-lg mx-auto mb-4"
                    />
                    <div className="space-x-4">
                      {selectedMethod === "camera" ? (
                        <Button onClick={retakePhoto} variant="outline">
                          Retake Photo
                        </Button>
                      ) : (
                        <Button onClick={() => {
                          setCapturedImage(null);
                          setUploadedFile(null);
                          setAnalysisError(null);
                          handleUploadMethod();
                        }} variant="outline">
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

            {/* Error Display */}
            {analysisError && (
              <div className="mb-6">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Analysis Failed</p>
                        <p className="text-sm text-red-600 mt-1">{analysisError}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Start Analysis Button */}
            <div className="text-center">
              <Button
                variant="hero"
                size="lg"
                disabled={!capturedImage || isAnalyzing}
                onClick={handleAnalysis}
                className="px-12"
              >
                {isAnalyzing ? "Analyzing..." : "Start Analysis"}
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
              {analysisProgress || "Our AI is examining your photo to identify your skin type and concerns"}
            </p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-neutral-medium rounded-full overflow-hidden">
                <div className="h-full bg-gradient-accent rounded-full animate-pulse transition-all duration-1000" style={{ width: analysisProgress.includes("complete") ? "100%" : analysisProgress.includes("Processing") ? "75%" : analysisProgress.includes("Analyzing") ? "50%" : "25%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analysisProgress.includes("complete") ? "Redirecting to results..." : "Processing... Please wait a moment"}
              </p>
            </div>
            
            {/* Show captured image during analysis */}
            {capturedImage && (
              <div className="mt-8">
                <img
                  src={capturedImage}
                  alt="Analyzing"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-xl font-semibold">Take a Selfie</h2>
                <Button
                  onClick={stopCamera}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <p className="text-white/80 text-sm mt-1">Position your face in the center and ensure good lighting</p>
            </div>

            {/* Video Container */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-full max-w-lg aspect-[3/4]">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ transform: 'scaleX(-1)' }}
                />
                {/* Face guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-80 border-2 border-white/30 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center space-x-8">
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="bg-white text-black hover:bg-white/90 w-16 h-16 rounded-full p-0 relative"
                >
                  <div className="w-12 h-12 bg-black rounded-full"></div>
                </Button>
                <div className="w-20"></div> {/* Spacer for symmetry */}
              </div>
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm">Press SPACE or ENTER to capture • ESC to cancel</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;