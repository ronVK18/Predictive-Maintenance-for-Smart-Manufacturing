import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line 
} from 'recharts';
import { 
  CheckCircle, AlertTriangle, Clock, Calendar, MapPin, 
  Activity, BarChart2, PieChart as PieChartIcon, ArrowRight, RefreshCw 
} from 'lucide-react';

const MaintenanceTaskReport = ({ tasks }) => {
  const [statusCounts, setStatusCounts] = useState({});
  const [tasksByMonth, setTasksByMonth] = useState([]);
  const [assetTypeCounts, setAssetTypeCounts] = useState([]);
  const [timeToComplete, setTimeToComplete] = useState([]);
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([]);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    
    // Process tasks data for various charts
    processTaskData(tasks);
  }, [tasks]);

  const processTaskData = (tasksData) => {
    // 1. Count by status
    const statusCount = tasksData.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    setStatusCounts(statusCount);

    // 2. Count by month
    const monthData = {};
    tasksData.forEach(task => {
      const month = new Date(task.assignedAt).toLocaleString('default', { month: 'short' });
      monthData[month] = monthData[month] || { assigned: 0, completed: 0 };
      monthData[month].assigned += 1;
      if (task.status === "Completed") {
        monthData[month].completed += 1;
      }
    });
    setTasksByMonth(Object.keys(monthData).map(month => ({
      month,
      assigned: monthData[month].assigned,
      completed: monthData[month].completed
    })));

    // 3. Count by asset type
    const assetTypes = {};
    tasksData.forEach(task => {
      assetTypes[task.assetType] = (assetTypes[task.assetType] || 0) + 1;
    });
    setAssetTypeCounts(Object.keys(assetTypes).map(type => ({
      type,
      count: assetTypes[type]
    })));

    // 4. Calculate time to complete
    const completionTimes = tasksData
      .filter(task => task.assignedAt && task.completedAt)
      .map(task => {
        const assignedDate = new Date(task.assignedAt);
        const completedDate = new Date(task.completedAt);
        const hoursDiff = (completedDate - assignedDate) / (1000 * 60 * 60);
        return {
          asset: task.assetName,
          hours: hoursDiff.toFixed(1)
        };
      });
    setTimeToComplete(completionTimes);

    // 5. Find upcoming maintenance
    const upcoming = tasksData
      .filter(task => task.nextMaintenance)
      .map(task => ({
        asset: task.assetName,
        date: task.nextMaintenance,
        type: task.assetType
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
    setUpcomingMaintenance(upcoming);
  };

  // Sample data for initial display when no tasks are provided
  const sampleTasks = [
    {
      assetName: "Pump Station A",
      assetType: "pump",
      assignedAt: "12 April 2025 at 09:04:59 UTC+5:30",
      completedAt: "12 April 2025 at 23:38:57 UTC+5:30",
      coordinates: {
        latitude: 23.1866139,
        longitude: 72.6283417
      },
      lastMaintenance: "2023-04-20",
      nextMaintenance: "2023-10-20",
      status: "Completed"
    }
  ];

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      processTaskData(sampleTasks);
    }
  }, []);

  // Prepare data for pie chart
  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  // Colors for charts
  const COLORS = ['#4ade80', '#fb7185', '#60a5fa', '#f59e0b'];
  
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="text-blue-400 mr-3" size={28} />
              <h1 className="text-2xl font-bold text-white">Maintenance Task Report</h1>
            </div>
            <div className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Status overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Status Pie Chart */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <PieChartIcon className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Task Status Overview</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
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
          </div>
          
          {/* Tasks by Month */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <BarChart2 className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Tasks by Month</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      borderColor: '#555', 
                      borderRadius: '8px',
                      color: 'white' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="assigned" name="Assigned" fill="#60a5fa" />
                  <Bar dataKey="completed" name="Completed" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Asset Type and Completion Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Asset Types */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Clock className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Assets by Type</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={assetTypeCounts}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" stroke="#aaa" />
                  <YAxis dataKey="type" type="category" stroke="#aaa" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      borderColor: '#555', 
                      borderRadius: '8px',
                      color: 'white' 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#f59e0b" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Time to Complete */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Clock className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Time to Complete (Hours)</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeToComplete}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="asset" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      borderColor: '#555', 
                      borderRadius: '8px',
                      color: 'white' 
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#fb7185" activeDot={{ r: 8 }} name="Hours" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Upcoming Maintenance and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Maintenance */}
          <div className="md:col-span-2 bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Calendar className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Upcoming Maintenance</h2>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Asset</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMaintenance.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="px-4 py-3 text-sm text-gray-200">{item.asset}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{item.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-200">{item.date}</td>
                    </tr>
                  ))}
                  {upcomingMaintenance.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-3 text-sm text-gray-400 text-center">No upcoming maintenance scheduled</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Activity className="text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-bold text-white">Summary</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-400 mr-2" size={20} />
                  <span className="text-gray-300">Completed Tasks</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {statusCounts.Completed || 0}
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                  <span className="text-gray-300">Pending Tasks</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {(statusCounts.Pending || 0) + (statusCounts.Assigned || 0)}
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center">
                  <RefreshCw className="text-blue-400 mr-2" size={20} />
                  <span className="text-gray-300">Maintenance Cycle</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {upcomingMaintenance.length} upcoming
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="text-red-400 mr-2" size={20} />
                  <span className="text-gray-300">Locations</span>
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {tasks ? tasks.length : 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTaskReport;