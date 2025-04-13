import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, AlertTriangle, Check, Activity, RotateCw } from 'lucide-react';

const Machinelife = ({ machineId }) => {
  console.log(machineId);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localMachineId, setLocalMachineId] = useState(machineId || '');
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalMachineId(machineId || '');
  }, [machineId]);
  
  // Automatically fetch prediction when component mounts if machineId is provided
//   useEffect(() => {
//     if (machineId && machineId.trim()) {
//       fetchPrediction();
//     }
//   }, []);  // Empty dependency array means this runs once on mount
    
  const fetchPrediction = async () => {
    // Use the prop value directly to ensure we're using the latest value
    const idToUse = machineId || localMachineId;
    
    // if (!idToUse || !idToUse.trim()) {
    //   setError('Please enter a machine ID');
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://predective-maintanance-model2.onrender.com/predict', {
        id: idToUse
      });

      console.log("API Response:", response.data);

      if (response.data && response.data.status === "OK") {
        setPrediction(response.data);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  // Prepare pie chart data
  const prepareChartData = () => {
    if (!prediction) return [];
    
    const lifecycle = parseFloat(prediction.answer);
    const remaining = Math.max(100 - lifecycle, 0);
    
    return [
      { name: 'Used Lifecycle', value: lifecycle },
      { name: 'Remaining Lifecycle', value: remaining }
    ];
  };

  const chartData = prepareChartData();
  
  // Color scheme for the pie chart
  const COLORS = ['#F87171', '#60A5FA'];

  return (
    <div className="w-full min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-black bg-opacity-40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center">
          <Activity className="text-blue-400 mr-3" size={24} />
          <h1 className="text-2xl font-bold text-white">Machine Lifecycle Prediction</h1>
        </div>
        
        {/* Input Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="machineId" className="block text-sm font-medium text-gray-300 mb-1">
                Machine ID
              </label>
              <input
                id="machineId"
                type="text"
                value={localMachineId}
                onChange={(e) => setLocalMachineId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter machine ID"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchPrediction}
                disabled={loading}
                className="flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-200 disabled:opacity-50"
              >
                {loading ? <RotateCw className="animate-spin mr-2" size={18} /> : <Check className="mr-2" size={18} />}
                {loading ? 'Processing...' : 'Predict'}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg flex items-center">
              <AlertTriangle className="text-red-400 mr-2" size={18} />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <RotateCw className="text-blue-400 mb-4 animate-spin" size={48} />
              <p className="text-gray-400 text-center">Fetching prediction data...</p>
            </div>
          ) : prediction ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 h-64 border border-gray-700">
                <h3 className="text-lg font-medium text-gray-200 mb-2">Lifecycle Status</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        borderColor: '#555', 
                        borderRadius: '8px',
                        color: 'white' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Details */}
              <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  <Clock className="text-blue-400 mr-3" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-gray-200">Predicted Lifecycle</h3>
                    <p className="text-3xl font-bold text-white mt-1">{parseFloat(prediction.answer).toFixed(2)}%</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white font-medium">{prediction.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Message</span>
                    <span className="text-white font-medium">{prediction.message}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Machine ID</span>
                    <span className="text-white font-medium">{localMachineId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining Lifecycle</span>
                    <span className="text-white font-medium">{(100 - parseFloat(prediction.answer)).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <Activity className="text-gray-500 mb-4" size={48} />
              <p className="text-gray-400 text-center">Enter a machine ID and click "Predict" to see the lifecycle analysis</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-black bg-opacity-30 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">Machine Lifecycle Prediction System | Powered by Predictive Maintenance API</p>
        </div>
      </div>
    </div>
  );
};

export default Machinelife;