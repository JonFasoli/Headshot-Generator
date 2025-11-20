
import React from 'react';
import { GeneratedImage } from '../types';
import Button from './Button';

interface ResultSectionProps {
  result: GeneratedImage | null;
  isGenerating: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result, isGenerating }) => {
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.data;
    link.download = `pro-headshot-${result.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isGenerating) {
    return (
      <div className="h-full w-full min-h-[400px] bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center animate-pulse">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 relative">
          <svg className="w-10 h-10 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Generating your headshot...</h3>
        <p className="text-slate-500 max-w-md">
          The AI is analyzing your facial features, adjusting lighting, and applying the selected professional style. This usually takes about 10-15 seconds.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full w-full min-h-[400px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">No Result Yet</h3>
        <p className="text-slate-400 text-sm">Upload a photo and select a style to generate your headshot.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
       <div className="bg-white p-2 rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100">
          <img 
            src={result.data} 
            alt="Generated Headshot" 
            className="w-full h-auto rounded-2xl object-cover"
          />
       </div>
       
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
         <Button onClick={handleDownload} className="flex-1">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
           </svg>
           Download HD
         </Button>
         <Button variant="secondary" onClick={() => {}} className="flex-1">
           Share Result
         </Button>
       </div>
       
       <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
         <div className="text-blue-600 mt-0.5">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
         </div>
         <p className="text-sm text-blue-900">
           <strong>Tip:</strong> Not satisfied? Try a different style or upload a photo with better lighting. The AI improves with clear, front-facing photos.
         </p>
       </div>
    </div>
  );
};

export default ResultSection;
