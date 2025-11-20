
import React, { useCallback, useState } from 'react';

interface UploadSectionProps {
  imagePreview: string | null;
  onImageSelected: (file: File, preview: string) => void;
  onClear: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ imagePreview, onImageSelected, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        onImageSelected(file, reader.result as string);
      }
    };
    reader.onerror = () => {
      console.error("FileReader error");
      alert("Failed to read the file. Please try another image.");
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  if (imagePreview) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">1. Your Photo</h3>
        <div className="relative group rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900">
          <img 
            src={imagePreview} 
            alt="Upload preview" 
            className="w-full h-64 object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
               onClick={onClear}
               className="bg-white/90 text-slate-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-white transition-colors shadow-lg cursor-pointer"
             >
               Change Photo
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">1. Upload Photo</h3>
      <label 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-300'}
          group
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
          <div className={`
            w-12 h-12 mb-4 rounded-full flex items-center justify-center transition-colors
            ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500'}
          `}>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
          </div>
          <p className="mb-2 text-sm text-slate-600 font-medium">
            <span className="text-blue-600 font-bold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">JPG, PNG, or WebP</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          onClick={(e) => { (e.target as HTMLInputElement).value = '' }} 
        />
      </label>
    </div>
  );
};

export default UploadSection;
