import { useState } from 'react';
import { 
  FaExclamationTriangle, 
  FaCog, 
  FaInfoCircle, 
  FaWrench, 
  FaBell, 
  FaPlus, 
  FaCheckCircle,
  FaExclamationCircle,
  FaImage
} from 'react-icons/fa';
import LiveMachine from './LiveMachine';
import MaintenanceHistory from './MaintanceHistory';
import MachinDes from "./MachineDes"

export default function MachineDashboard() {
  const [activeTab, setActiveTab] = useState('description');
  const [component, setComponent] = useState({
    name: "Conveyor Belt Motor #A2342",
    location: "Assembly Line 3, Section B",
    id: "MTR-2342-AL3B",
    status: "Operational",
    installDate: "2024-09-15",
    lastMaintenance: "2025-03-25",
    nextScheduledMaintenance: "2025-06-25",
    manufacturer: "IndustrialTech Systems",
    model: "HT-2000 Series"
  });

  // Animation for tab transitions
  const fadeIn = "transition-opacity duration-300 ease-in-out";

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-400 mb-6">Smart Factory</h1>
          
          <nav className="mt-8">
            <button 
              onClick={() => setActiveTab('description')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'description' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaInfoCircle className="mr-3" />
              <span>Machine Description</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('liveMonitoring')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'liveMonitoring' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaExclamationTriangle className="mr-3" />
              <span>Live Fault Detection</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('MaintanceHistory')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'MaintanceHistory' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaExclamationTriangle className="mr-3" />
              <span>Maintance History</span>
            </button>
            
            <button className="flex items-center w-full p-3 mb-2 rounded-lg hover:bg-gray-700">
              <FaWrench className="mr-3" />
              <span>Performance Metrics</span>
            </button>
            
            <button className="flex items-center w-full p-3 mb-2 rounded-lg hover:bg-gray-700">
              <FaBell className="mr-3" />
              <span>Alerts Configuration</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Predictive Maintenance System</h2>
          <div className="flex items-center gap-4">
            <span className="bg-blue-900 bg-opacity-50 px-3 py-1 rounded-full text-sm">Connected</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">User: Engineer_429</span>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <MachinDes/>
          )}

          {/* Live Fault Detection Tab */}
          {activeTab === 'liveMonitoring' && (
            <LiveMachine/>
          )}


          {activeTab === 'MaintanceHistory' && (
            <MaintenanceHistory/>
          )}
        </div>
      </div>
    </div>
  );
}