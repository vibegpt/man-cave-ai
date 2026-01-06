'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface PhotoUploadProps {
  onPhotoSelect: (imageData: string) => void;
}

// Sample template images from Unsplash (free to use)
const TEMPLATES = [
  { id: 'basement', src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', label: 'Basement' },
  { id: 'garage', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Garage' },
  { id: 'spare-room', src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', label: 'Spare Room' },
];

export default function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const loadTemplate = async (templateSrc: string) => {
    setIsProcessing(true);
    try {
      // For external URLs, we need to load through a canvas to get base64
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPreview(dataUrl);
          onPhotoSelect(dataUrl);
          resolve();
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = templateSrc;
      });
      
      setShowTemplates(false);
    } catch (error) {
      console.error('Error loading template:', error);
      alert('Error loading template. Please try uploading your own photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearPreview = () => {
    setPreview('');
    onPhotoSelect('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Preview state - compact view
  if (preview) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
        <div className="aspect-video relative">
          <Image 
            src={preview} 
            alt="Your room" 
            fill
            className="object-cover"
          />
        </div>
        <button
          onClick={clearPreview}
          className="absolute top-2 right-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white text-sm font-medium rounded-lg transition-all"
        >
          Change
        </button>
      </div>
    );
  }

  // Upload state
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-6">
      {isProcessing ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-3"></div>
          <p className="text-sm text-gray-400">Processing image...</p>
        </div>
      ) : showTemplates ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Choose a template</h4>
            <button 
              onClick={() => setShowTemplates(false)}
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => loadTemplate(template.src)}
                className="group relative aspect-video rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all"
              >
                <img 
                  src={template.src} 
                  alt={template.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{template.label}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Or <button onClick={() => fileInputRef.current?.click()} className="text-orange-500 hover:underline">upload your own photo</button>
          </p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Photo
            </button>
            <button
              onClick={() => setShowTemplates(true)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Use Template
            </button>
          </div>
          <p className="text-xs text-gray-500">JPG or PNG, up to 20MB</p>
        </div>
      )}
      
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/jpeg,image/png" 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </div>
  );
}
