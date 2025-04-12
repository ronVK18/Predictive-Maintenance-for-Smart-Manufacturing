import { useState, useEffect } from "react";
import { Brain, Loader2, Zap } from "lucide-react";

export default function ModelAnalysisLoader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing analysis...");
  
  // Simulate progress for the demo
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update status text based on progress
        if (prev >= 85) {
          setStatusText("Finalizing results");
        } else if (prev >= 60) {
          setStatusText("Analyzing patterns");
        } else if (prev >= 30) {
          setStatusText("Processing model data");
        }
        
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);  
  }, []);
  
  return (
    <div className="w-full h-[5rem] flex justify-center items-center">

    <div className="inline-flex backdrop-blur-md bg-gray-800 bg-opacity-60 border border-gray-700 rounded-lg p-3 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin absolute" />
          <Brain className="w-4 h-4 text-blue-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <p className="text-xs font-medium text-blue-300">
              {progress < 100 ? "Model analyzing" : "Analysis complete"} 
            </p>
            {progress === 100 && <Zap className="ml-1 w-3 h-3 text-green-400" />}
          </div>
          
          <div className="w-32 h-1.5 bg-gray-700 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-xs text-gray-400 mt-1">{statusText}</p>
        </div>
      </div>
    </div></div>
  );
}