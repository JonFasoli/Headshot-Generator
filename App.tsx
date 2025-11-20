
import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import StyleSelector from './components/StyleSelector';
import ClothingSelector from './components/ClothingSelector';
import HairSelector from './components/HairSelector';
import PoseSelector from './components/PoseSelector';
import ResultSection from './components/ResultSection';
import Button from './components/Button';
import PasswordModal from './components/PasswordModal';
import { HeadshotStyle, ClothingOption, HairStyleOption, PoseOption, GeneratedImage, ProcessingState } from './types';
import { generateProfessionalHeadshot } from './services/gemini';

const App: React.FC = () => {
  // Auth State - Session only (no local storage)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // App State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HeadshotStyle.CORPORATE);
  const [customStylePrompt, setCustomStylePrompt] = useState<string>("");

  const [selectedClothing, setSelectedClothing] = useState<ClothingOption>(ClothingOption.DEFAULT);
  const [customClothingPrompt, setCustomClothingPrompt] = useState<string>("");

  const [selectedHair, setSelectedHair] = useState<HairStyleOption>(HairStyleOption.DEFAULT);
  const [customHairPrompt, setCustomHairPrompt] = useState<string>("");

  const [selectedPose, setSelectedPose] = useState<PoseOption>(PoseOption.DEFAULT);
  const [customPosePrompt, setCustomPosePrompt] = useState<string>("");
  
  const [generatedResult, setGeneratedResult] = useState<GeneratedImage | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isUploading: false,
    isGenerating: false,
    error: null,
  });

  // Auth Handler
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  // Handlers
  const handleImageSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setImagePreview(preview);
    setGeneratedResult(null);
    setProcessingState(prev => ({ ...prev, error: null }));
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setGeneratedResult(null);
  };

  const handleGenerate = async () => {
    if (!imagePreview || !selectedFile) return;

    setProcessingState({ isUploading: false, isGenerating: true, error: null });

    try {
      // Call API
      const resultBase64 = await generateProfessionalHeadshot(
        imagePreview, 
        selectedStyle, 
        selectedClothing,
        selectedHair,
        customStylePrompt,
        customClothingPrompt,
        customHairPrompt,
        selectedPose,
        customPosePrompt
      );
      
      setGeneratedResult({
        id: Date.now().toString(),
        data: resultBase64,
        timestamp: Date.now(),
        style: selectedStyle
      });
    } catch (error) {
      console.error(error);
      setProcessingState(prev => ({ 
        ...prev, 
        error: "Failed to generate headshot. Please try again or use a different photo." 
      }));
    } finally {
      setProcessingState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      {!isAuthenticated && <PasswordModal onAuthenticated={handleAuthenticated} />}
      
      <Header />
      
      <main className={`flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-opacity duration-500 ${!isAuthenticated ? 'opacity-0 pointer-events-none overflow-hidden h-screen' : 'opacity-100'}`}>
        
        {/* Hero Text */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Turn Selfies into <br className="hidden sm:block" />
            <span className="text-blue-600">Professional Headshots</span>
          </h2>
          <p className="text-lg text-slate-600">
            Upload a casual photo, choose a style, and let our AI create a studio-quality professional profile picture for LinkedIn, CVs, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Card Container */}
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-8">
              
              {/* 1. Upload */}
              <UploadSection 
                imagePreview={imagePreview} 
                onImageSelected={handleImageSelected} 
                onClear={handleClearImage}
              />
              
              <div className="w-full h-px bg-slate-100"></div>

              {/* 2. Style */}
              <StyleSelector 
                selectedStyle={selectedStyle} 
                onSelect={setSelectedStyle} 
                customStyle={customStylePrompt}
                onCustomStyleChange={setCustomStylePrompt}
              />

              <div className="w-full h-px bg-slate-100"></div>

              {/* 3. Clothing */}
              <ClothingSelector
                selectedClothing={selectedClothing}
                onSelect={setSelectedClothing}
                customClothing={customClothingPrompt}
                onCustomClothingChange={setCustomClothingPrompt}
              />

              <div className="w-full h-px bg-slate-100"></div>

              {/* 4. Hair */}
              <HairSelector
                selectedHair={selectedHair}
                onSelect={setSelectedHair}
                customHair={customHairPrompt}
                onCustomHairChange={setCustomHairPrompt}
              />

              <div className="w-full h-px bg-slate-100"></div>

              {/* 5. Pose */}
              <PoseSelector
                selectedPose={selectedPose}
                onSelect={setSelectedPose}
                customPose={customPosePrompt}
                onCustomPoseChange={setCustomPosePrompt}
              />

              {/* Error Message */}
              {processingState.error && (
                <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
                  {processingState.error}
                </div>
              )}

              {/* Generate Action */}
              <div className="pt-2">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!selectedFile} 
                  isLoading={processingState.isGenerating}
                  className="w-full text-lg py-4 shadow-blue-300/50"
                >
                  Generate Headshot
                </Button>
                <p className="text-xs text-center text-slate-400 mt-3">
                  Powered by Google Gemini 2.5 Flash
                </p>
              </div>
            </div>

            {/* Instructions / Tips */}
            <div className="bg-slate-100 rounded-2xl p-6 text-sm text-slate-600 space-y-2">
              <h4 className="font-semibold text-slate-800 mb-2">Best Practices</h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Use a photo with good lighting (no deep shadows).</li>
                <li>Face the camera directly.</li>
                <li>Avoid wearing hats or sunglasses.</li>
                <li>Ensure your face is clearly visible.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
             <div className="sticky top-24">
                <ResultSection 
                  result={generatedResult} 
                  isGenerating={processingState.isGenerating} 
                />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
