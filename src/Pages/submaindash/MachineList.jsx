import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {  AlertTriangle, CheckCircle, Clock, Search, Loader2 } from "lucide-react";

export default function MachineList() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/data/machinDetails");
        setMachines(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching machine data:", err);
        setError("Failed to load machine data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMachines();
  }, []);
  
  const filteredMachines = machines.filter(machine => 
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    machine.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "Operational":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle className="mr-1" size={12} /> {status}</span>;
      case "Under Maintenance":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"><Clock className="mr-1" size={12} /> {status}</span>;
      case "Out of Order":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"><AlertTriangle className="mr-1" size={12} /> {status}</span>;
      case "Maintenance Required":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"><AlertTriangle className="mr-1" size={12} /> {status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{status}</span>;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-blue-400" />
          <p className="mt-4 text-xl">Loading machine data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-400" />
          <p className="mt-4 text-xl text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="backdrop-blur-lg bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl border border-gray-700 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400 mb-4 md:mb-0">Machine Dashboard</h1>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {filteredMachines.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Machine</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Machine ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Next Maintenance</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 bg-opacity-50 divide-y divide-gray-700">
                  {filteredMachines.map((machine) => (
                    <tr 
                      key={machine.machineId}
                      className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/machine/${machine._id}`} className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {machine.image && machine.image.length > 0 ? (
                              <img className="h-10 w-10 rounded-full object-cover border border-gray-600" src={machine.image[0]} alt={machine.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{machine.name}</div>
                            <div className="text-sm text-gray-400">{machine.model}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/machine/${machine.machineId}`} className="text-sm text-blue-400 hover:text-blue-300">
                          {machine.machineId}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/machine/${machine.machineId}`}>
                          {getStatusBadge(machine.status)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/machine/${machine.machineId}`} className="text-sm text-gray-300">
                          {machine.location}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/machine/${machine.machineId}`} className="text-sm text-gray-300">
                          {new Date(machine.nextMaintenance).toLocaleDateString()}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-400">No machines found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-400 text-center">
            Showing {filteredMachines.length} of {machines.length} machines
          </div>
        </div>
      </div>
    </div>
  );
}