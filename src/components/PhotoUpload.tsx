'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface PhotoUploadProps {
  onPhotoSelect: (imageData: string) => void;
}

export default function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB');
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (preview) {
      onPhotoSelect(preview);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      {!preview ? (
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
              Upload Your Space
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Transform any room into your dream man cave
            </p>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative transition-all duration-500 ease-out ${
              dragActive ? 'scale-[1.02]' : 'scale-100'
            }`}
          >
            <div className={`relative backdrop-blur-xl rounded-3xl border transition-all duration-300 ${
              dragActive 
                ? 'border-[#f2700d]/50 shadow-2xl shadow-[#f2700d]/20 bg-[#392f28]/20' 
                : 'border-[#392f28]/50 hover:border-[#392f28]/70 bg-[#0a0806]/60'
            }`}>
              <div className="p-20 text-center">
                <div className="mb-8 flex justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f2700d] to-[#d96309] flex items-center justify-center transition-transform duration-300 ${
                    dragActive ? 'scale-110' : 'scale-100'
                  }`}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>

                {isProcessing ? (
                  <div className="space-y-6">
                    <p className="text-lg font-medium text-white">Processing</p>
                    <div className="w-32 h-1 bg-[#392f28] rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-[#f2700d] rounded-full animate-pulse w-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-medium text-white">
                        {dragActive ? 'Drop to upload' : 'Drag and drop'}
                      </h3>
                      <p className="text-base text-gray-400">JPG or PNG, up to 10MB</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="group px-8 py-3.5 bg-[#f2700d] hover:bg-[#d96309] text-white text-base font-medium rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-[#f2700d]/20"
                      >
                        Choose File
                      </button>

                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="group px-8 py-3.5 bg-[#392f28]/50 hover:bg-[#392f28]/70 backdrop-blur-xl text-white text-base font-medium rounded-xl transition-all duration-200 active:scale-95"
                      >
                        Take Photo
                      </button>
                    </div>

                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="hidden" />
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl rounded-2xl border border-[#392f28]/50 p-8 bg-[#0a0806]/60">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Clear lighting</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Natural light works best</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Full room</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Include walls and ceiling</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Straight angle</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Corner view is ideal</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-white">Minimal clutter</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Clear space works best</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-semibold text-white">Ready</h2>
            <p className="text-lg text-gray-400">Choose a style to transform your space</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#f2700d]/50 shadow-2xl shadow-[#f2700d]/10">
            <Image src={preview} alt="Preview" width={1200} height={800} className="w-full h-auto" />
            <button
              onClick={() => {
                setPreview('');
                if (fileInputRef.current) fileInputRef.current.value = '';
                if (cameraInputRef.current) cameraInputRef.current.value = '';
              }}
              className="absolute top-4 right-4 px-4 py-2 bg-black/40 backdrop-blur-xl hover:bg-black/60 text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-95"
            >
              Change
            </button>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleContinue}
              className="group px-10 py-4 bg-[#f2700d] hover:bg-[#d96309] text-white text-lg font-medium rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-3 shadow-lg shadow-[#f2700d]/20"
            >
              Continue
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
