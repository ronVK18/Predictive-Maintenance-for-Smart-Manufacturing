import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, X } from 'lucide-react';

// Machine types with custom icons
const machineTypes = {
  cnc: { name: 'CNC Machine', color: '#3b82f6' },
  robot: { name: 'Industrial Robot', color: '#10b981' },
  packaging: { name: 'Packaging Unit', color: '#f59e0b' },
  conveyor: { name: 'Conveyor System', color: '#8b5cf6' },
  welding: { name: 'Welding Station', color: '#ef4444' },
  lathe: { name: 'Lathe Machine', color: '#ec4899' },
  press: { name: 'Hydraulic Press', color: '#6366f1' },
  assembly: { name: 'Assembly Station', color: '#14b8a6' },
  inspection: { name: 'Quality Inspection', color: '#f97316' }
};

// Status definitions
const statusColors = {
  operational: '#22c55e',
  needsAttention: '#eab308',
  critical: '#ef4444',
  maintenance: '#3b82f6',
};

// Create custom machine icons
function createMachineIcon(type, status) {
  const machineType = machineTypes[type];
  const statusColor = statusColors[status];
  
  return L.divIcon({
    className: 'custom-machine-icon',
    html: `
      <div style="
        width: 30px; 
        height: 30px; 
        background-color: ${machineType.color}; 
        border: 3px solid ${statusColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
      ">
        ${type.charAt(0).toUpperCase()}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
}

// Map component that focuses on a location
function MapFocuser({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom || map.getZoom());
    }
  }, [position, map, zoom]);
  return null;
}

const Map = () => {
  // Base location (Ahmedabad factory center)
  const baseLocation = [23.0365, 72.5623];
  
  // Create 9 machines with proper spacing (~10-20m apart)
  const machines = useMemo(() => [
    {
      id: 'CNM1',
      name: 'CNC Machine Alpha',
      type: 'cnc',
      status: 'operational',
      location: [23.0365, 72.5623], // Base location
      details: 'X3000 Series Precision Mill',
      lastMaintenance: '2025-03-15',
      efficiency: '92%',
    },
    {
      id: 'ROB1',
      name: 'Robot Arm Theta',
      type: 'robot',
      status: 'operational',
      location: [23.0366, 72.5626], // ~20m east
      details: 'ARX-440 6-Axis Robot',
      lastMaintenance: '2025-04-01',
      efficiency: '95%',
    },
    {
      id: 'PKU1',
      name: 'Packaging Beta',
      type: 'packaging',
      status: 'critical',
      location: [23.0368, 72.5622], // ~20m north
      details: 'Beta 200 Automated Packaging',
      lastMaintenance: '2025-02-10',
      efficiency: '62%',
    },
    {
      id: 'CNV1',
      name: 'Conveyor Delta',
      type: 'conveyor',
      status: 'needsAttention',
      location: [23.0363, 72.5620], // ~20m west
      details: 'CS-5000 High-Speed Belt',
      lastMaintenance: '2025-03-22',
      efficiency: '78%',
    },
    {
      id: 'WLD1',
      name: 'Welding Station Gamma',
      type: 'welding',
      status: 'operational',
      location: [23.0362, 72.5624], // ~20m southwest
      details: 'Pro X-15 Precision Welder',
      lastMaintenance: '2025-04-05',
      efficiency: '91%',
    },
    {
      id: 'LTH1',
      name: 'Lathe Machine Epsilon',
      type: 'lathe',
      status: 'maintenance',
      location: [23.0367, 72.5619], // ~20m northwest
      details: 'LT-2000 Metal Lathe',
      lastMaintenance: '2025-03-30',
      efficiency: '85%',
    },
    {
      id: 'PRS1',
      name: 'Hydraulic Press Zeta',
      type: 'press',
      status: 'operational',
      location: [23.0369, 72.5625], // ~20m northeast
      details: 'HP-800 Heavy Press',
      lastMaintenance: '2025-04-02',
      efficiency: '89%',
    },
    {
      id: 'ASM1',
      name: 'Assembly Station Eta',
      type: 'assembly',
      status: 'needsAttention',
      location: [23.0364, 72.5627], // ~20m east-southeast
      details: 'Modular Assembly Platform',
      lastMaintenance: '2025-03-25',
      efficiency: '81%',
    },
    {
      id: 'QC1',
      name: 'Quality Control Theta',
      type: 'inspection',
      status: 'operational',
      location: [23.0361, 72.5621], // ~20m west-southwest
      details: 'Vision System QC-3000',
      lastMaintenance: '2025-04-07',
      efficiency: '97%',
    },
  ], []);

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState(machines);
  const [focusPosition, setFocusPosition] = useState(null);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMachines(machines);
      setFocusPosition(null);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = machines.filter(machine => 
      machine.id.toLowerCase().includes(term) || 
      machine.name.toLowerCase().includes(term) ||
      machineTypes[machine.type].name.toLowerCase().includes(term)
    );
    
    setFilteredMachines(filtered);
    
    // Auto-focus on first result if there's only one match
    if (filtered.length === 1) {
      setFocusPosition(filtered[0].location);
    }
  }, [searchTerm, machines]);

  const handleMachineClick = (machine) => {
    setSelectedMachine(machine);
  };

  const clearSelection = () => {
    setSelectedMachine(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="backdrop-blur-md bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Ahmedabad Factory Floor Map</h3>
        
        {/* Search functionality */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search machines by ID or name..."
            className="bg-gray-700 text-white w-full pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={18} className="text-gray-400 hover:text-white" />
            </button>
          )}
        </div>

        {/* Map or Machine Details */}
        <div className="bg-gray-900 border h-[70vh] border-gray-700 rounded-lg p-4 relative">
          {!selectedMachine ? (
            <>
              <MapContainer
                center={baseLocation}
                zoom={18}
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {filteredMachines.map((machine) => (
                  <Marker
                    key={machine.id}
                    position={machine.location}
                    icon={createMachineIcon(machine.type, machine.status)}
                    eventHandlers={{
                      click: () => handleMachineClick(machine),
                    }}
                  >
                    <Popup>
                      <div className="text-gray-900">
                        <strong>{machine.name}</strong>
                        <div>ID: {machine.id}</div>
                        <div>Status: <span style={{color: statusColors[machine.status]}}>{machine.status}</span></div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {focusPosition && <MapFocuser position={focusPosition} zoom={19} />}
              </MapContainer>
              
              {/* Search results indicator */}
              {searchTerm && (
                <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 p-2 rounded-md">
                  <span className="text-sm">
                    {filteredMachines.length} {filteredMachines.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Machine Details</h4>
                <button
                  onClick={clearSelection}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                >
                  Back to Map
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 flex-1">
                <div className="w-full md:w-1/2">
                  <div className="relative w-full h-[60%] mb-4">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundColor: machineTypes[selectedMachine.type].color,
                          borderRadius: '50%',
                          border: `4px solid ${statusColors[selectedMachine.status]}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}
                      >
                        {selectedMachine.type.slice(0, 3).toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="px-3 py-2 rounded-md text-center font-medium mb-2"
                    style={{
                      backgroundColor: `${statusColors[selectedMachine.status]}20`,
                      color: statusColors[selectedMachine.status],
                    }}
                  >
                    {selectedMachine.status.charAt(0).toUpperCase() + selectedMachine.status.slice(1)}
                  </div>
                  
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center px-2 py-1 bg-gray-700 rounded-md">
                      <span className="text-xs font-mono">
                        {selectedMachine.location[0].toFixed(4)}, {selectedMachine.location[1].toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="bg-gray-800 p-4 rounded-lg h-full">
                    <h5 className="text-xl font-medium text-blue-400 mb-1">
                      {selectedMachine.name}
                    </h5>
                    <div className="text-sm text-gray-400 mb-4">ID: {selectedMachine.id}</div>
                    
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-sm font-medium text-gray-300">Type</h6>
                        <p className="text-white">
                          {machineTypes[selectedMachine.type].name} - {selectedMachine.details}
                        </p>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-gray-300">Maintenance</h6>
                        <p className="text-white">Last serviced: {selectedMachine.lastMaintenance}</p>
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-medium text-gray-300">Performance</h6>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{
                              width: selectedMachine.efficiency,
                              backgroundColor: parseInt(selectedMachine.efficiency) > 80 
                                ? '#22c55e' 
                                : parseInt(selectedMachine.efficiency) > 70
                                  ? '#eab308'
                                  : '#ef4444'
                            }}
                          ></div>
                        </div>
                        <p className="text-right text-xs mt-1">{selectedMachine.efficiency} efficiency</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 bg-opacity-70 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Machine Types</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(machineTypes).slice(0, 6).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: value.color }}
                  ></div>
                  <span className="text-xs">{value.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Machine Types</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(machineTypes).slice(6).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: value.color }}
                  ></div>
                  <span className="text-xs">{value.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs capitalize">{status.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-70 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Map Info</h4>
            <div className="text-xs space-y-1">
              <p>• Click on machine to see details</p>
              <p>• Search by name, ID, or type</p>
              <p>• 9 machines total</p>
              <p>• Zoom and pan enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;