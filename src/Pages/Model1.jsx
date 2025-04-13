import { useState, useEffect } from "react";
import { X, Compass, Rotate3d, Download, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function ModelWithDefects() {
  const [showModal, setShowModal] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [scriptReady, setScriptReady] = useState(false);
  const [showDefects, setShowDefects] = useState(true);
  const [selectedDefect, setSelectedDefect] = useState(null);
  
  const defects = [
    // { id: 1, name: "Surface Corrosion", position: "1.5m 0.8m -0.5m", color: "#ff3333", description: "Visible surface corrosion on the impeller housing" },
    { id: 2, name: "Bearing Wear", position: "0.5m 0.3m 0.8m", color: "#ffaa00", description: "Signs of bearing wear requiring maintenance" },
    { id: 3, name: "Seal Damage", position: "-0.2m 0.5m 0.6m", color: "#ff00ff", description: "Evidence of seal deterioration with potential for leakage" }
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setModelLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setModelLoaded(false);
    }
  }, [showModal]);

  useEffect(() => {
    // When model is loaded, set up the hotspots for defects
    if (modelLoaded && showDefects) {
      const modelViewer = document.querySelector("model-viewer");
      if (modelViewer) {
        // Reset any existing hotspots
        const existingHotspots = modelViewer.querySelectorAll(".hotspot");
        existingHotspots.forEach(hotspot => hotspot.remove());
        
        // Add new hotspots for defects
        defects.forEach(defect => {
          const hotspot = document.createElement("div");
          hotspot.classList.add("hotspot");
          hotspot.slot = `hotspot-${defect.id}`;
          hotspot.dataset.position = defect.position;
          hotspot.dataset.normal = "0 1 0";
          hotspot.style.backgroundColor = defect.color;
          
          hotspot.addEventListener("click", () => {
            setSelectedDefect(defect);
          });
          
          modelViewer.appendChild(hotspot);
        });
      }
    }
  }, [modelLoaded, showDefects]);

  const handleARMode = () => {
    const modelViewer = document.querySelector("model-viewer");
    if (modelViewer) {
      modelViewer.activateAR();
    }
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const toggleDefects = () => {
    setShowDefects(!showDefects);
    if (showDefects) {
      setSelectedDefect(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-white">
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-blue-500 hover:to-purple-500 backdrop-blur-sm"
      >
        <span>Open AR Pump Model with Defects</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
          <div
            className={`relative w-full max-w-4xl rounded-2xl overflow-hidden transition-all duration-500 transform ${
              modelLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
            } bg-gradient-to-br from-gray-800/70 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl`}
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-700/50">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Pump AR Viewer - Defect Inspection
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-700/70 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative h-[70vh]">
              {!modelLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-10">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}

              <div className="h-full w-full">
                {/* Conditionally render model-viewer only if script is loaded */}
                {scriptReady && (
                  <model-viewer
                    id="pump-model"
                    src="/public/pumpFinal.glb"
                    ar
                    ar-modes="scene-viewer webxr quick-look"
                    auto-rotate={autoRotate}
                    camera-controls
                    shadow-intensity="1"
                    exposure="0.75"
                    environment-image="neutral"
                    style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
                    onLoad={() => setModelLoaded(true)}
                  >
                    {/* Define hotspots for defects */}
                    {defects.map(defect => (
                      <button
                        key={defect.id}
                        slot={`hotspot-${defect.id}`}
                        data-position={defect.position}
                        data-normal="0 1 0"
                        className={`hotspot ${selectedDefect?.id === defect.id ? 'selected' : ''}`}
                        style={{ display: showDefects ? 'block' : 'none' }}
                        onClick={() => setSelectedDefect(defect)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-lg animate-pulse">
                          <AlertTriangle size={18} />
                        </div>
                      </button>
                    ))}
                    
                    <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg text-sm text-white/80">
                      {showDefects ? "Click on markers to view defect details" : "Enable defect view to see problem areas"}
                    </div>
                  </model-viewer>
                )}
              </div>

              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                {/* <button
                  onClick={toggleDefects}
                  // className={`p-3 rounded-full backdrop-blur-md ${
                  //   showDefects ? "bg-red-600/70" : "bg-gray-800/70"
                  // } transition-colors hover:bg-red-500/70`}
                  // title={showDefects ? "" : ""}
                >
                  {showDefects ? <EyeOff size={20} /> : <Eye size={20} />}
                </button> */}
                <button
                  onClick={toggleAutoRotate}
                  className={`p-3 rounded-full backdrop-blur-md ${
                    autoRotate ? "bg-purple-600/70" : "bg-gray-800/70"
                  } transition-colors hover:bg-purple-500/70`}
                  title={autoRotate ? "Disable Auto-Rotate" : "Enable Auto-Rotate"}
                >
                  <Rotate3d size={20} />
                </button>
                <button
                  onClick={handleARMode}
                  className="p-3 rounded-full bg-blue-600/70 backdrop-blur-md transition-colors hover:bg-blue-500/70"
                  title="View in AR"
                >
                  <Compass size={20} />
                </button>
              </div>

              {/* Defect information panel */}
              {selectedDefect && (
                <div className="absolute bottom-16 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-black/60 backdrop-blur-md p-4 rounded-lg border border-gray-700/50 shadow-lg transition-opacity duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedDefect.color }}></div>
                    <h3 className="font-bold text-lg">{selectedDefect.name}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{selectedDefect.description}</p>
                  <div className="mt-3 pt-3 border-t border-gray-700/50 flex justify-between">
                    <span className="text-xs text-gray-400">Severity: High</span>
                    <span className="text-xs text-gray-400">ID: DEF-{selectedDefect.id}0{Math.floor(Math.random() * 900) + 100}</span>
                  </div>
                </div>
              )}

              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-blue-600 transition-transform duration-1000 ${
                  modelLoaded ? "transform-none" : "translate-x-full"
                }`}
              ></div>
            </div>

            <div className="p-4 flex flex-wrap justify-between items-center border-t border-gray-700/50">
              <div className="text-gray-300 text-sm max-w-xl">
                {showDefects ? (
                  <span className="font-medium text-red-400">Defect Mode Active: </span>
                ) : (
                  <span className="font-medium">About this model: </span>
                )}
                Industrial pump component with {defects.length} identified maintenance issues. 
                {showDefects && !selectedDefect && " Click on markers to view details."}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={toggleDefects}
                  className={`flex items-center space-x-1 px-4 py-2 ${
                    showDefects ? "bg-red-700/70 hover:bg-red-600/70" : "bg-green-700/70 hover:bg-green-600/70"
                  } backdrop-blur-sm rounded-lg transition-colors`}
                >
                  {showDefects ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span>{showDefects ? "Hide Defects" : "Show Defects"}</span>
                </button>
                <button className="flex items-center space-x-1 px-4 py-2 bg-gray-700/70 hover:bg-gray-600/70 backdrop-blur-sm rounded-lg transition-colors">
                  <Download size={18} />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add some CSS for hotspots */}
      <style jsx>{`
        .hotspot {
          display: block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .hotspot:hover {
          transform: scale(1.2);
        }
        .hotspot.selected {
          transform: scale(1.2);
          box-shadow: 0 0 0 2px white, 0 0 10px rgba(255, 255, 255, 0.5);
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}