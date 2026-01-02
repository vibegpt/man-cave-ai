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
      onPhotoSelect(result); // ✅ AUTO-SELECT IMAGE
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
                    <p className="text-sm text-gray-400">JPG or PNG, up to 10MB</p>
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
