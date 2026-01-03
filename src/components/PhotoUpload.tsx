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

  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('Image must be less than 20MB');
      return;
    }

    setIsProcessing(true);

    try {
      // Compress image to fit within Vercel's 4.5MB limit (1200px, 70% quality)
      const compressedImage = await compressImage(file, 1200, 0.7);
      setPreview(compressedImage);
      onPhotoSelect(compressedImage);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Error processing image. Please try another.');
    } finally {
      setIsProcessing(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!preview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative transition-all duration-300 ${dragActive ? 'scale-[1.02]' : 'scale-100'}`}
        >
          <div className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragActive 
              ? 'border-orange-500 bg-orange-500/5' 
              : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
          }`}>
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className={`w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center transition-transform ${
                  dragActive ? 'scale-110' : 'scale-100'
                }`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
              </div>

              {isProcessing ? (
                <div className="space-y-3">
                  <p className="text-base font-medium text-white">Processing...</p>
                  <div className="w-24 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full animate-pulse w-full"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {dragActive ? 'Drop to upload' : 'Drag and drop'}
                    </h3>
                    <p className="text-sm text-gray-400">JPG or PNG, up to 20MB (auto-compressed)</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all"
                    >
                      Choose File
                    </button>

                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-all"
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
      ) : (
        <div className="relative rounded-xl overflow-hidden border-2 border-orange-500/50 shadow-xl">
          <Image src={preview} alt="Preview" width={800} height={600} className="w-full h-auto" />
          <button
            onClick={() => {
              setPreview('');
              if (fileInputRef.current) fileInputRef.current.value = '';
              if (cameraInputRef.current) cameraInputRef.current.value = '';
            }}
            className="absolute top-3 right-3 px-4 py-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white text-sm font-medium rounded-lg transition-all"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
