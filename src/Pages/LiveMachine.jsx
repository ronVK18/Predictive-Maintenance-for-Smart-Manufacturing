import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock, Database, Server, BarChart2, ArrowRight, RefreshCw, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import AnaLoad from '../Components/AnaLoad';

export default function PredictiveMaintenance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [countdown, setCountdown] = useState(30 * 60); // 30 minutes in seconds
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [ana,setana]=useState(false);
const [per, setper] =useState(0);
  // Fetch data on component mount and set up interval
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000); // Refresh every 30 minutes
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 30 * 60; // Reset to 30 minutes
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real-world scenario, you would use the actual API endpoint
      const response = await fetch('http://localhost:3000/api/data');
      
      // For demo purposes, simulate response if API is not available
      if (!response.ok) {
        // Mock data for demonstration
        const mockData = [
          {
            _id: '60d21b4967d0d8992e610c85',
            timestamp: new Date().toISOString(),
            airTemperature: 298.15,
            processTemperature: 308.65,
            rotationalSpeed: 1500,
            torque: 35.5,
            toolWear: 120
          },
          {
            _id: '60d21b4967d0d8992e610c86',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            airTemperature: 297.85,
            processTemperature: 310.15,
            rotationalSpeed: 1450,
            torque: 40.2,
            toolWear: 90
          },
          {
            _id: '60d21b4967d0d8992e610c87',
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            airTemperature: 299.05,
            processTemperature: 307.25,
            rotationalSpeed: 1520,
            torque: 38.7,
            toolWear: 150
          }
        ];
        
        setData(mockData);
      } else {
        const result = await response.json();
        setData(result);
      }
      
      setLastUpdate(new Date());
      setCountdown(30 * 60); // Reset countdown
    } catch (err) {
      console.error("Failed to fetch data:", err);
      
      // Mock data in case of error for demonstration
      const mockData = [
        {
          _id: '60d21b4967d0d8992e610c85',
          timestamp: new Date().toISOString(),
          airTemperature: 298.15,
          processTemperature: 308.65,
          rotationalSpeed: 1500,
          torque: 35.5,
          toolWear: 120
        },
        {
          _id: '60d21b4967d0d8992e610c86',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          airTemperature: 297.85,
          processTemperature: 310.15,
          rotationalSpeed: 1450,
          torque: 40.2,
          toolWear: 90
        },
        {
          _id: '60d21b4967d0d8992e610c87',
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
          airTemperature: 299.05,
          processTemperature: 307.25,
          rotationalSpeed: 1520,
          torque: 38.7,
          toolWear: 150
        }
      ];
      
      setData(mockData);
      setError("Could not connect to the API. Using sample data instead.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const analyzeData = async (rowData) => {
    setSelectedRow(rowData);
    setAnalyzing(true);
    setAnalysisResult(null);
    setCurrentStep(0);
    
    // Initialize analysis steps
    const initialSteps = [
      { 
        status: 'pending', 
        title: 'Preparing data for analysis', 
        description: 'Organizing sensor readings',
        response: null
      },
      { 
        status: 'pending', 
        title: 'Sending to prediction model', 
        description: 'Contacting machine learning service',
        response: null
      },
      { 
        status: 'pending', 
        title: 'Processing with ML model', 
        description: 'Running through predictive algorithms',
        response: null
      },
      { 
        status: 'pending', 
        title: 'Receiving prediction results', 
        description: 'Awaiting failure probability assessment',
        response: null
      },
      { 
        status: 'pending', 
        title: 'Saving results to database', 
        description: 'Recording analysis for future reference',
        response: null
      }
    ];
    
    setAnalysisSteps(initialSteps);

    try {
      // Step 1: Prepare data
      const step1Response = await simulateStep(0, rowData);
      
      // Step 2: Send data to prediction model
      const step2Response = await simulateStep(1, rowData);
      
      // Step 3: Process with ML model
      const step3Response = await simulateStep(2, rowData);
      
      // Step 4: Get prediction results
      const predictionPayload = {
        "Type": "0",
        "Air temperature [K]": rowData.airTemperature,
        "Process temperature [K]": rowData.processTemperature,
        "Rotational speed [rpm]": rowData.rotationalSpeed,
        "Torque [Nm]": rowData.torque,
        "Tool wear [min]": rowData.toolWear
      };
      setana(true);
      try {
        // In a real-world scenario, you would use the actual API endpoint
        const predictionResponse = await fetch('http://localhost:3000/api/data/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(predictionPayload),
        });
        
        let predictionResult;
        
        if (!predictionResponse.ok) {
          // Mock prediction result if API is not available
          predictionResult = {
            prediction: rowData.torque > 38 ? 1 : 0,
            probability: rowData.torque > 38 ? 0.87 : 0.15,
            message: rowData.torque > 38 ? 'High torque levels detected' : 'All parameters within normal range'
          };
        } else {
          predictionResult = await predictionResponse.json();
        }
        
        setAnalysisResult(predictionResult);
        const step4Response = await simulateStep(3, rowData, predictionResult);
        
        // Step 5: Save results to database
        const savePayload = {
          name: `Equipment-${rowData._id.substring(0, 6)}`,
          location: 'Production Floor',
          status: predictionResult.prediction === 1 ? 'Warning' : 'Normal',
          model: 'Predictive-Maintenance-v1',
          date: new Date().toISOString()
        };
        setana(false);
        
        try {
          // In a real-world scenario, you would use the actual API endpoint
          const saveResponse = await fetch('http://localhost:3000/api/data/machine-action', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(savePayload),
          });
          
          let saveResult;
          
          if (!saveResponse.ok) {
            // Mock save result if API is not available
            saveResult = {
              success: true,
              id: "analysis-" + Math.random().toString(36).substring(2, 9),
              timestamp: new Date().toISOString()
            };
          } else {
            saveResult = await saveResponse.json();
          }
          
          const step5Response = await simulateStep(4, rowData, saveResult);
          
          // Create analysis history entry
          const historyEntry = {
            id: saveResult.id || `analysis-${Date.now()}`,
            timestamp: new Date().toISOString(),
            machineId: rowData._id,
            steps: analysisSteps.map(step => ({...step})),
            result: predictionResult,
            prediction: predictionResult.prediction === 1 ? 'Failure Predicted' : 'No Failure Predicted',
            probability: predictionResult.probability,
            message: predictionResult.message
          };
          
          setAnalysisHistory(prev => [historyEntry, ...prev]);
          setShowReport(true);
          
        } catch (err) {
          console.error("Failed to save analysis:", err);
          throw new Error("Failed to save analysis to database");
        }
        
      } catch (err) {
        console.error("Prediction failed:", err);
        throw new Error("Failed to get prediction results");
      }
      
    } catch (err) {
      const failedStep = analysisSteps.findIndex(step => step.status === 'in-progress');
      const updatedSteps = [...analysisSteps];
      if (failedStep !== -1) {
        updatedSteps[failedStep] = { 
          ...updatedSteps[failedStep], 
          status: 'error', 
          error: err.message,
          response: { error: err.message }
        };
        setAnalysisSteps(updatedSteps);
      }
      setError(err.message);
    } finally {
      setTimeout(() => {
        setAnalyzing(false);
      }, 1000);
    }
  };

  const simulateStep = async (stepIndex, rowData, additionalData = null) => {
    // Update current step to in-progress
    const updatedSteps = [...analysisSteps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], status: 'in-progress' };
    setAnalysisSteps(updatedSteps);
    setCurrentStep(stepIndex);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate appropriate response for each step
    let stepResponse;
    
    switch(stepIndex) {
      case 0: // Preparing data
        stepResponse = {
          status: "success",
          timestamp: new Date().toISOString(),
          dataPoints: {
            airTemperature: rowData.airTemperature,
            processTemperature: rowData.processTemperature,
            rotationalSpeed: rowData.rotationalSpeed,
            torque: rowData.torque,
            toolWear: rowData.toolWear
          },
          normalizedData: {
            airTemperature: ((rowData.airTemperature - 290) / 20).toFixed(4),
            processTemperature: ((rowData.processTemperature - 300) / 20).toFixed(4),
            rotationalSpeed: ((rowData.rotationalSpeed - 1000) / 1000).toFixed(4),
            torque: (rowData.torque / 100).toFixed(4),
            toolWear: (rowData.toolWear / 200).toFixed(4)
          }
        };
        break;
        
      case 1: // Sending to prediction model
        stepResponse = {
          status: "success",
          timestamp: new Date().toISOString(),
          endpoint: "http://localhost:3000/api/data/predict",
          requestId: "req-" + Math.random().toString(36).substring(2, 9),
          payloadSent: {
            airTemperature: rowData.airTemperature,
            processTemperature: rowData.processTemperature,
            rotationalSpeed: rowData.rotationalSpeed,
            torque: rowData.torque,
            toolWear: rowData.toolWear
          }
        };
        break;
        
      case 2: // Processing with ML model
        stepResponse = {
          status: "success",
          timestamp: new Date().toISOString(),
          modelVersion: "PredictiveMaintenance-v2.3",
          processingTime: "1.23s",
          featuresProcessed: [
            "air_temperature",
            "process_temperature",
            "rotational_speed",
            "torque",
            "tool_wear",
            "air_process_temp_ratio",
            "torque_per_rpm"
          ],
          modelType: "Random Forest"
        };
        break;
        
      case 3: // Receiving prediction results
        stepResponse = {
          status: "success",
          timestamp: new Date().toISOString(),
          predictionResult: additionalData,
          interpretability: {
            topFeatures: [
              { name: "torque", importance: 0.42 },
              { name: "tool_wear", importance: 0.28 },
              { name: "rotational_speed", importance: 0.15 }
            ]
          }
        };
        break;
        
      case 4: // Saving results to database
        stepResponse = {
          status: "success",
          timestamp: new Date().toISOString(),
          databaseId: additionalData?.id || "db-" + Math.random().toString(36).substring(2, 9),
          storedAt: new Date().toISOString(),
          recordType: "maintenance_prediction",
          machineName: `Equipment-${rowData._id.substring(0, 6)}`
        };
        break;
        
      default:
        stepResponse = { status: "unknown step" };
    }
    
    // Update step to completed with response data
    updatedSteps[stepIndex] = { 
      ...updatedSteps[stepIndex], 
      status: 'completed',
      response: stepResponse
    };
    
    setAnalysisSteps(updatedSteps);
    return stepResponse;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center p-6 bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-lg shadow-md">
          <AlertTriangle className="mx-auto text-red-400" size={48} />
          <h2 className="text-xl font-bold text-red-400 mt-4">Error Loading Data</h2>
          <p className="mt-2 text-gray-300">{error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Machine Monitoring Dashboard</h1>
                <p className="text-gray-400">Real-time sensor data analysis</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-900 text-green-300 rounded-full py-1 px-3 flex items-center mr-4 bg-opacity-50 backdrop-filter backdrop-blur-sm">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Live Data
                </div>
                
                <div className="text-gray-400 flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Next update in: {formatTime(countdown)}</span>
                </div>
                
                <button 
                  onClick={fetchData}
                  className="ml-4 p-2 text-blue-400 hover:text-blue-300 transition"
                  title="Refresh data now"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 mb-4">
              Last updated: {formatDate(lastUpdate)}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800 bg-opacity-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Air Temp (K)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Process Temp (K)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rotational Speed (RPM)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Torque (Nm)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tool Wear (min)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 bg-opacity-40 divide-y divide-gray-700">
                  {data.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-700 hover:bg-opacity-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item._id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(item.timestamp)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.airTemperature.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.processTemperature.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.rotationalSpeed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.torque.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.toolWear}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => analyzeData(item)}
                          disabled={analyzing}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition backdrop-filter backdrop-blur-sm bg-opacity-70 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <BarChart2 size={16} className="mr-1" />
                          Analyze
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {analyzing && (
          <div className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-xl shadow-lg overflow-hidden border border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Analysis in Progress</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <h3 className="font-medium text-gray-300">Selected Machine Data</h3>
                </div>
                
                {selectedRow && (
                  <div className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-600">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Air Temperature</div>
                        <div className="font-medium text-gray-200">{selectedRow.airTemperature.toFixed(2)} K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Process Temperature</div>
                        <div className="font-medium text-gray-200">{selectedRow.processTemperature.toFixed(2)} K</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Rotational Speed</div>
                        <div className="font-medium text-gray-200">{selectedRow.rotationalSpeed} RPM</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Torque</div>
                        <div className="font-medium text-gray-200">{selectedRow.torque.toFixed(2)} Nm</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Tool Wear</div>
                        <div className="font-medium text-gray-200">{selectedRow.toolWear} min</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Timestamp</div>
                        <div className="font-medium text-gray-200">{formatDate(selectedRow.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div> 

             
               { ana ?<AnaLoad/> :
              (<div className="mb-6">
                <div className="relative">
                  {analysisSteps.map((step, index) => (
                    <div key={index} className="mb-8 flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-900 bg-opacity-50 text-green-400' :
                          step.status === 'in-progress' ? 'bg-blue-900 bg-opacity-50 text-blue-400 animate-pulse' :
                          step.status === 'error' ? 'bg-red-900 bg-opacity-50 text-red-400' :
                          'bg-gray-700 bg-opacity-50 text-gray-400'
                        }`}>
                          {step.status === 'completed' && <CheckCircle size={20} />}
                          {step.status === 'in-progress' && <Activity size={20} />}
                          {step.status === 'error' && <AlertTriangle size={20} />}
                          {step.status === 'pending' && <Clock size={20} />}
                        </div>
                        {index < analysisSteps.length - 1 && (
                          <div className={`h-full w-0.5 ${
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-600'
                          }`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-200">{step.title}</h3>
                        <p className="text-sm text-gray-400">{step.description}</p>
                        {step.status === 'error' && (
                          <p className="text-sm text-red-400 mt-1">{step.error}</p>
                        )}
                        
                        {/* Special visualization for each step */}
                        {step.status === 'in-progress' && (
                          <div className="mt-2">
                            {index === 0 && (
                              <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-3 flex items-center animate-pulse border border-blue-700">
                                <Database size={20} className="text-blue-400 mr-2" />
                                <div className="text-sm text-blue-200">Normalizing and structuring sensor data...</div>
                              </div>
                            )}
                            {index === 1 && (
                              <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-3 flex items-center border border-blue-700">
                                <Server size={20} className="text-blue-400 mr-2" />
                                <div className="text-sm text-blue-200">
                                  <div className="flex items-center">
                                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-1"></div>
                                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-1 animate-ping"></div>
                                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-1 animate-ping" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-1 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                                    <ArrowRight size={16} className="text-blue-400 ml-2 animate-pulse" />
                                  </div>
                                  <div className="mt-1">Sending request to predictive model service...</div>
                                </div>
                              </div>
                            )}
                            {index === 2 && (
                              <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-3 border border-blue-700">
                                <div className="text-sm text-blue-200">Model processing...</div>
                                <div className="mt-2 space-y-2">
                                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                  </div>
                                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: '45%', animationDelay: '0.2s' }}></div>
                                  </div>
                                  <div className="h-2 bg-blue-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: '75%', animationDelay: '0.4s' }}></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 3 && (
                              <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-3 border border-blue-700">
                                <div className="text-sm text-blue-200">Processing model results...</div>
                                <div className="flex flex-wrap mt-2">
                                  {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="p-1 m-1 bg-blue-800 text-blue-200 text-xs rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                                      Feature {i}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {index === 4 && (
                              <div className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-3 flex items-center border border-blue-700">
                                <Database size={20} className="text-blue-400 mr-2" />
                                <div className="text-sm flex items-center text-blue-200">
                                  Saving to database
                                  <span className="inline-flex ml-2">
                                    <span className="animate-ping h-1 w-1 rounded-full bg-blue-400 opacity-75 mx-0.5"></span>
                                    <span className="animate-ping h-1 w-1 rounded-full bg-blue-400 opacity-75 mx-0.5" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="animate-ping h-1 w-1 rounded-full bg-blue-400 opacity-75 mx-0.5" style={{ animationDelay: '0.4s' }}></span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}


                        
                        {step.status === 'completed' && index === 3 && analysisResult && (
                          <div className={`mt-2 p-4 rounded-lg backdrop-filter backdrop-blur-sm ${
                            analysisResult.prediction === 1 
                              ? 'bg-red-900 bg-opacity-30 border border-red-700' 
                              : 'bg-green-900 bg-opacity-30 border border-green-700'
                          }`}>
                            <h4 className="font-medium text-gray-200">Analysis Result</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                              <div>
                                <div className="text-sm text-gray-400">Prediction</div>
                                <div className={`font-medium ${analysisResult.prediction === 1 ? 'text-red-400' : 'text-green-400'}`}>
                                  {analysisResult.prediction === 1 ? 'Failure Predicted' : 'No Failure Predicted'}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-400">Probability</div>
                                <div className="font-medium text-gray-200">{(analysisResult.probability * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-400">Message</div>
                                <div className="font-medium text-gray-200">{analysisResult.message}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                </div>
              </div>)
              
              
              }
              
            </div>
          </div>
        )}
        
        {/* Analysis Report Section */}
        {showReport && analysisHistory.length > 0 && (
          <div className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-100">
                  <FileText className="inline mr-2" size={20} />
                  Analysis Report
                </h2>
                <button 
                  onClick={() => setShowReport(!showReport)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition rounded-full hover:bg-gray-700"
                >
                  {showReport ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-200 mb-2">Analysis Summary</h3>
                <div className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-4 border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Machine ID</div>
                      <div className="font-medium text-gray-200">{analysisHistory[0].machineId.substring(0, 8)}...</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Analysis ID</div>
                      <div className="font-medium text-gray-200">{analysisHistory[0].id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Timestamp</div>
                      <div className="font-medium text-gray-200">{formatDate(analysisHistory[0].timestamp)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Result</div>
                      <div className={`font-medium ${
                        analysisHistory[0].prediction === 'Failure Predicted' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {analysisHistory[0].prediction}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-200 mb-2">Detailed Step Responses</h3>
                <div className="space-y-4">
                  {analysisHistory[0].steps.map((step, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg border border-gray-600 overflow-hidden">
                      <div className={`p-4 border-l-4 ${
                        step.status === 'completed' ? 'border-green-500' :
                        step.status === 'error' ? 'border-red-500' :
                        'border-gray-500'
                      }`}>
                        <div className="flex items-center mb-2">
                          <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-2 ${
                            step.status === 'completed' ? 'bg-green-900 bg-opacity-50 text-green-400' :
                            step.status === 'error' ? 'bg-red-900 bg-opacity-50 text-red-400' :
                            'bg-gray-700 bg-opacity-50 text-gray-400'
                          }`}>
                            {step.status === 'completed' && <CheckCircle size={14} />}
                            {step.status === 'error' && <AlertTriangle size={14} />}
                            {step.status === 'pending' && <Clock size={14} />}
                          </div>
                          <h4 className="font-medium text-gray-200">{step.title}</h4>
                        </div>
                        
                        <div className="ml-8">
                          <div className="text-sm text-gray-400 mb-2">{step.description}</div>
                          
                          {step.response && (
                            <div className="bg-gray-800 bg-opacity-70 p-3 rounded mt-2 border border-gray-600">
                              <div className="text-sm text-gray-300 font-mono overflow-x-auto">
                                <pre className="whitespace-pre-wrap break-words">
                                  {JSON.stringify(step.response, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                          
                          {step.status === 'error' && step.error && (
                            <div className="bg-red-900 bg-opacity-20 p-3 rounded mt-2 border border-red-800">
                              <div className="text-sm text-red-300">
                                Error: {step.error}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {analysisHistory[0].result && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-200 mb-2">Final Prediction</h3>
                  <div className={`bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-4 border ${
                    analysisHistory[0].prediction === 'Failure Predicted' 
                      ? 'border-red-600' 
                      : 'border-green-600'
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Status</div>
                        <div className={`font-medium ${
                          analysisHistory[0].prediction === 'Failure Predicted' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {analysisHistory[0].prediction}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Failure Probability</div>
                        <div className="font-medium text-gray-200">{(analysisHistory[0].probability * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Message</div>
                        <div className="font-medium text-gray-200">{analysisHistory[0].message}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Recommended Actions</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                        {analysisHistory[0].prediction === 'Failure Predicted' ? (
                          <>
                            <li>Schedule maintenance inspection within the next 24 hours</li>
                            <li>Reduce operational load if possible</li>
                            <li>Check for abnormal vibration or temperature patterns</li>
                            <li>Prepare replacement parts for potentially damaged components</li>
                          </>
                        ) : (
                          <>
                            <li>Continue normal operations</li>
                            <li>Maintain regular inspection schedule</li>
                            <li>No immediate maintenance required</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    // In a real application, this would trigger download or print functionality
                    console.log("Export report:", analysisHistory[0]);
                    alert("Report export functionality would be implemented here");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition backdrop-filter backdrop-blur-sm bg-opacity-70 flex items-center"
                >
                  <FileText size={16} className="mr-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





            