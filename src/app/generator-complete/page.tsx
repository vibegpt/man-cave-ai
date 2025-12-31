'use client';

import { useState, useEffect } from 'react';
import PhotoUpload from '../../../components/PhotoUpload';
import StyleSelector from '../../../components/StyleSelector';

type Step = 'upload' | 'style' | 'generate' | 'results';

const LOADING_MESSAGES: { [key: string]: string[] } = {
  gaming: [
    '🎮 Analyzing room layout...',
    '💺 Adding gaming chairs...',
    '🖥️ Installing dual monitors...',
    '💡 Setting up RGB lighting...',
    '🎨 Adding gaming posters...',
    '⚡ Finalizing the setup...'
  ],
  sports_bar: [
    '📐 Calculating dimensions...',
    '🪑 Adding bar stools...',
    '📺 Installing big screen TVs...',
    '🍺 Adding beer taps...',
    '🏈 Hanging sports memorabilia...',
    '💡 Setting up neon signs...',
    '✨ Final touches...'
  ],
  home_theater: [
    '🎬 Analyzing room layout...',
    '🛋️ Adding theater recliners...',
    '📺 Installing projection screen...',
    '🔊 Setting up surround sound...',
    '🎞️ Hanging movie posters...',
    '💡 Adjusting ambient lighting...',
    '✨ Finalizing your theater...'
  ],
  workshop: [
    '🔨 Planning workspace layout...',
    '🔧 Installing workbench...',
    '🛠️ Adding tool storage...',
    '💡 Setting up shop lights...',
    '📋 Organizing pegboard...',
    '✨ Final adjustments...'
  ],
  custom: [
    '🎨 Analyzing your vision...',
    '📐 Planning layout...',
    '🛠️ Adding custom elements...',
    '💡 Adjusting lighting...',
    '✨ Bringing it to life...'
  ]
};

export default function GeneratorCompletePage() {
  const [step, setStep] = useState<Step>('upload');
  const [imageData, setImageData] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentMessageIndex(0);
      return;
    }

    const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isGenerating, selectedStyle]);

  const handlePhotoSelect = (data: string) => {
    setImageData(data);
    if (data) setStep('style');
  };

  const handleStyleSelect = (styleId: string, customDesc?: string) => {
    setSelectedStyle(styleId);
    if (customDesc) setCustomDescription(customDesc);
    setStep('generate');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageData,
          styleId: selectedStyle,
          customDescription: customDescription || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImageUrl(data.generatedImageUrl);
        setStep('results');
      } else {
        setError(data.error || 'Generation failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setIsGenerating(false);
    }
  };

  const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Man Cave AI Generator</h1>
          <p className="text-gray-400">Transform Your Room with Nano Banana Pro</p>
        </div>

        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          <div className={`px-3 md:px-6 py-2 rounded-lg font-medium ${step === 'upload' ? 'bg-orange-500' : 'bg-gray-800'}`}>1. Upload</div>
          <div className={`px-3 md:px-6 py-2 rounded-lg font-medium ${step === 'style' ? 'bg-orange-500' : 'bg-gray-800'}`}>2. Style</div>
          <div className={`px-3 md:px-6 py-2 rounded-lg font-medium ${step === 'generate' ? 'bg-orange-500' : 'bg-gray-800'}`}>3. Generate</div>
          <div className={`px-3 md:px-6 py-2 rounded-lg font-medium ${step === 'results' ? 'bg-orange-500' : 'bg-gray-800'}`}>4. Results</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 md:p-8">
          {step === 'upload' && <PhotoUpload onPhotoSelect={handlePhotoSelect} />}

          {step === 'style' && (
            <div>
              <button onClick={() => setStep('upload')} className="text-gray-400 hover:text-white mb-6">← Back</button>
              <StyleSelector onStyleSelect={handleStyleSelect} />
            </div>
          )}

          {step === 'generate' && (
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Ready to Generate!</h2>
              {imageData && <div className="mb-6"><img src={imageData} alt="Your room" className="rounded-lg max-h-96 mx-auto" /></div>}
              
              {error && <div className="bg-red-900/50 border border-red-500 p-4 rounded mb-6">Error: {error}</div>}
              
              {isGenerating && (
                <div className="mb-6 p-8 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/30 rounded-xl">
                  <div className="mb-4">
                    <div className="inline-block animate-spin text-6xl mb-4">⚡</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-500 mb-2 animate-pulse">
                    {messages[currentMessageIndex]}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress" style={{width: '100%'}}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">This usually takes 20-30 seconds...</p>
                </div>
              )}

              {!isGenerating && (
                <>
                  <button 
                    onClick={handleGenerate} 
                    className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-xl font-bold w-full md:w-auto mb-4"
                  >
                    ⚡ Generate My Man Cave!
                  </button>
                  <div><button onClick={() => setStep('style')} className="text-gray-400 hover:text-white">← Change Style</button></div>
                </>
              )}
            </div>
          )}

          {step === 'results' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-center">🎉 Your Man Cave Design!</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase">BEFORE</h3>
                  <div className="rounded-xl overflow-hidden border-2 border-gray-700">
                    <img src={imageData} alt="Before" className="w-full" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-3 text-orange-500 uppercase">AFTER</h3>
                  <div className="rounded-xl overflow-hidden border-2 border-orange-500">
                    <img src={generatedImageUrl} alt="After" className="w-full" />
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6 p-8 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/30 rounded-xl">
                <p className="text-lg text-white mb-4">🛒 Shopping list feature coming soon!</p>
                <p className="text-gray-400">We'll recommend products to bring this design to life</p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => { setStep('upload'); setImageData(''); setGeneratedImageUrl(''); }} 
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
                >
                  🎨 Create Another
                </button>
                <a 
                  href={generatedImageUrl} 
                  download="my-man-cave.jpg" 
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-bold inline-block"
                >
                  ⬇️ Download
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Nano Banana Pro 🍌</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
