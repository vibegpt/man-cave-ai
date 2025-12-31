'use client';

import { useState, useEffect } from 'react';

const STYLES = [
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'sports_bar', emoji: '🏈', label: 'Sports Bar' },
  { id: 'home_theater', emoji: '🎬', label: 'Theater' },
  { id: 'golf_simulator', emoji: '⛳', label: 'Golf Simulator' },
  { id: 'custom', emoji: '✨', label: 'Custom' },
];

const LOADING_MESSAGES: { [key: string]: string[] } = {
  gaming: [
    'Analyzing room layout...',
    'Adding gaming setup...',
    'Installing RGB lighting...',
    'Placing gaming chairs...',
    'Final touches...'
  ],
  sports_bar: [
    'Analyzing room layout...',
    'Adding bar counter...',
    'Installing big screens...',
    'Hanging memorabilia...',
    'Setting up lighting...'
  ],
  home_theater: [
    'Analyzing room layout...',
    'Adding theater seating...',
    'Installing projection...',
    'Setting up sound system...',
    'Adjusting lighting...'
  ],
  golf_simulator: [
    'Analyzing room layout...',
    'Installing simulator bay...',
    'Adding putting green...',
    'Setting up seating...',
    'Final adjustments...'
  ],
  custom: [
    'Analyzing your vision...',
    'Planning the layout...',
    'Adding custom elements...',
    'Adjusting details...',
    'Bringing it to life...'
  ]
};

type AppState = 'upload' | 'generating' | 'results';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('gaming');
  const [customStyle, setCustomStyle] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Loading message rotation
  useEffect(() => {
    if (appState !== 'generating') {
      setCurrentMessageIndex(0);
      return;
    }

    const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [appState, selectedStyle]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setUploadedImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert('Please upload a room photo first');
      return;
    }

    if (selectedStyle === 'custom' && !customStyle.trim()) {
      alert('Please describe your ideal man cave style');
      return;
    }

    setAppState('generating');
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImage,
          styleId: selectedStyle,
          customDescription: selectedStyle === 'custom' ? customStyle : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImageUrl(data.generatedImageUrl);
        setAppState('results');
      } else {
        setError(data.error || 'Generation failed. Please try again.');
        setAppState('upload');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setUploadedImage(null);
    setGeneratedImageUrl('');
    setSelectedStyle('gaming');
    setCustomStyle('');
    setError('');
  };

  const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;
  const currentStyle = STYLES.find(s => s.id === selectedStyle);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Subtle gradient accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-xl">🏠</span>
            <span className="font-semibold text-white">ManCaveAI</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">5 free designs</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-14 pb-8">
        
        {/* ============ UPLOAD STATE ============ */}
        {appState === 'upload' && (
          <>
            {/* Hero Text */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                Design your perfect
                <span className="block text-orange-500">man cave</span>
              </h1>
              <p className="text-lg text-gray-400">
                Upload a photo. Get AI-powered design ideas in seconds.
              </p>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-xl">
              <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-xl shadow-black/20 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300">
                <div className="p-8">
                  
                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Upload Area */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                    className={`border-2 border-dashed rounded-xl p-10 mb-6 transition-all cursor-pointer group bg-white/[0.02] ${
                      dragActive 
                        ? 'border-orange-500/60 bg-orange-500/5' 
                        : uploadedImage 
                          ? 'border-green-500/40 bg-green-500/5' 
                          : 'border-white/10 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="text-center">
                      {uploadedImage ? (
                        <>
                          <img 
                            src={uploadedImage} 
                            alt="Your room" 
                            className="max-h-40 mx-auto mb-4 rounded-lg"
                          />
                          <p className="text-sm font-medium text-green-400 mb-1">Photo ready!</p>
                          <p className="text-xs text-gray-500">Click to change</p>
                        </>
                      ) : (
                        <>
                          <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center transition-all ${
                            dragActive ? 'bg-orange-500/20 scale-110' : 'group-hover:bg-orange-500/20 group-hover:scale-110'
                          }`}>
                            <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-base font-medium text-white mb-1">
                            {dragActive ? 'Drop your photo' : 'Drop your room photo here'}
                          </p>
                          <p className="text-sm text-gray-500">or click to browse</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                  </div>

                  {/* Style Selection - 3 + 2 centered grid */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">Choose style</p>
                    <div className="flex flex-col items-center gap-2">
                      {/* First row - 3 buttons */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {STYLES.slice(0, 3).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              selectedStyle === style.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                          >
                            <span className="mr-1.5">{style.emoji}</span>
                            {style.label}
                          </button>
                        ))}
                      </div>
                      {/* Second row - 2 buttons centered */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {STYLES.slice(3).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              selectedStyle === style.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                          >
                            <span className="mr-1.5">{style.emoji}</span>
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom Input - shows when Custom is selected */}
                  {selectedStyle === 'custom' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        value={customStyle}
                        onChange={(e) => setCustomStyle(e.target.value)}
                        placeholder="Describe your ideal man cave style..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        e.g., "Rustic cabin with whiskey bar" or "Minimalist Japanese zen space"
                      </p>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={!uploadedImage}
                    className={`w-full py-4 font-semibold rounded-xl transition-all active:scale-[0.98] ${
                      uploadedImage 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25' 
                        : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Generate Design
                  </button>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Free to try
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      30 second results
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      No signup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ============ GENERATING STATE ============ */}
        {appState === 'generating' && (
          <div className="w-full max-w-xl">
            <div className="bg-[#141414] rounded-2xl border border-orange-500/30 shadow-xl shadow-orange-500/5 p-8 text-center">
              
              {/* Animated Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-orange-500/20 flex items-center justify-center">
                  <span className="text-4xl animate-pulse">{currentStyle?.emoji || '✨'}</span>
                </div>
              </div>

              {/* Loading Message */}
              <h2 className="text-xl font-bold text-white mb-2">
                Creating your {currentStyle?.label || 'Custom'} man cave
              </h2>
              <p className="text-orange-400 font-medium mb-6 h-6">
                {messages[currentMessageIndex]}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-progress"
                />
              </div>

              <p className="text-sm text-gray-500">
                This usually takes 20-30 seconds...
              </p>

              {/* Preview of uploaded image */}
              {uploadedImage && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Your room</p>
                  <img 
                    src={uploadedImage} 
                    alt="Your room" 
                    className="max-h-32 mx-auto rounded-lg opacity-50"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ RESULTS STATE ============ */}
        {appState === 'results' && (
          <div className="w-full max-w-4xl">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-400">Design complete!</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your {currentStyle?.label || 'Custom'} Man Cave
              </h2>
              <p className="text-gray-400">Here's your AI-generated transformation</p>
            </div>

            {/* Before/After Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Before */}
              <div className="bg-[#141414] rounded-2xl border border-white/10 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Before</span>
                </div>
                <div className="p-4">
                  <img 
                    src={uploadedImage || ''} 
                    alt="Before" 
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              {/* After */}
              <div className="bg-[#141414] rounded-2xl border border-orange-500/30 overflow-hidden">
                <div className="px-4 py-3 border-b border-orange-500/30 bg-orange-500/5">
                  <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">After — {currentStyle?.label}</span>
                </div>
                <div className="p-4">
                  <img 
                    src={generatedImageUrl} 
                    alt="After" 
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
              >
                Create Another Design
              </button>
              <a
                href={generatedImageUrl}
                download="my-man-cave.jpg"
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all text-center"
              >
                Download Image
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Progress bar animation */}
      <style jsx global>{`
        @keyframes progress {
          0% { width: 5%; }
          50% { width: 70%; }
          100% { width: 95%; }
        }
        .animate-progress {
          animation: progress 25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
