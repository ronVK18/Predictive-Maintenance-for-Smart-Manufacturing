import { useState } from 'react';
import { 
  FaMap, 
  FaList, 
  FaChartBar, 
  FaUserCog, 
  FaBell, 
  FaCalendarAlt,
  FaBuilding,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';
import Staff from './submaindash/Staff.jsx';  
import Map from './submaindash/map';
import MachineList from './submaindash/machineList';
import CreateMachine from './submaindash/CreateMachine';
import FactCalendar from './submaindash/FactCalender.jsx';

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('machineryMap');
  
  // Animation for tab transitions
  const fadeIn = "transition-opacity duration-300 ease-in-out";

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-400 mb-6">Manager Portal</h1>
          
          <nav className="mt-8">
            <button 
              onClick={() => setActiveTab('machineryMap')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'machineryMap' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaMap className="mr-3" />
              <span>Machinery Map</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('machinesList')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'machinesList' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaList className="mr-3" />
              <span>Machines List</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('createmachine')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'createmachine' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaChartBar className="mr-3" />
              <span>Add machine-Detail</span>
            </button>
            
           
            <button 
              onClick={() => setActiveTab('cal')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'cal' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaBell className="mr-3" />
              <span>Factory Task Calendar </span>
            </button>
            
            <button 
              onClick={() => setActiveTab('staff')}
              className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === 'staff' ? 'bg-blue-900 bg-opacity-50' : 'hover:bg-gray-700'}`}
            >
              <FaUserCog className="mr-3" />
              <span>Staff Management</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Factory Management System</h2>
          <div className="flex items-center gap-4">
            <span className="bg-green-900 bg-opacity-50 px-3 py-1 rounded-full text-sm flex items-center">
              <FaCheckCircle className="mr-1 text-green-500" /> 
              All Systems Operational
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">User: Manager_Smith</span>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="p-6">
          {/* Machinery Map Tab */}
          {activeTab === 'machineryMap' && (
           <Map/>
          )}

          {/* Machines List Tab */}
          {activeTab === 'machinesList' && (
           <MachineList/>
          )}
          {activeTab === 'createmachine' && (
           <CreateMachine/>
          )}

          {activeTab === 'staff' && (
           <Staff/>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className={fadeIn}>
              <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 shadow-lg text-center py-12">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Factory Analytics</h3>
                <div className="w-24 h-24 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center p-2 mx-auto">
                  <div className="w-20 h-20 rounded-full bg-purple-500 bg-opacity-30 flex items-center justify-center p-2">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                      <FaChartBar className="text-4xl text-purple-200" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl mt-8 mb-2">Welcome to Analytics</h4>
                <p className="text-gray-400 max-w-lg mx-auto">
                  Comprehensive performance metrics and trend analysis for all factory operations
                </p>
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === 'maintenance' && (
            <div className={fadeIn}>
              <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 shadow-lg text-center py-12">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Maintenance Schedule</h3>
                <div className="w-24 h-24 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center p-2 mx-auto">
                  <div className="w-20 h-20 rounded-full bg-green-500 bg-opacity-30 flex items-center justify-center p-2">
                    <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                      <FaCalendarAlt className="text-4xl text-green-200" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xl mt-8 mb-2">Welcome to Maintenance Schedule</h4>
                <p className="text-gray-400 max-w-lg mx-auto">
                  Planned and predictive maintenance schedules for all equipment
                </p>
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'cal' && (
            <FactCalendar/>
          )}

          {/* Staff Management Tab */}
         
        </div>
      </div>
    </div>
  );
}