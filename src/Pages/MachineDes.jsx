import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,

  Calendar,
  MapPin,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import SmallMap from "./smallMap";
import Machinelife from "./machinelife";
import Model1 from "./Model1"

export default function MachineDes() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [machineId , setMachineId] = useState(id);
  
  useEffect(() => {
    const fetchMachineDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/data/machinDetail/${id}`);
        setMachine(response.data);
        setMachineId(response.data.id)
        console.log(response.data)
        setError(null);
      } catch (err) {
        console.error("Error fetching machine details:", err);
        setError("Failed to load machine details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMachineDetail();
  }, [id]);
  
  const nextImage = () => {
    if (machine?.image?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % machine.image.length);
    }
  };
  
  const prevImage = () => {
    if (machine?.image?.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + machine.image.length) % machine.image.length);
    }
  };
  
  const getStatusCard = (status) => {
    switch (status) {
      case "Operational":
        return (
          <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4 flex items-center">
            <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <h3 className="text-green-400 font-medium">Operational</h3>
              <p className="text-green-200 text-sm">Machine running normally</p>
            </div>
          </div>
        );
      case "Under Maintenance":
        return (
          <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4 flex items-center">
            <Clock className="h-8 w-8 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-yellow-400 font-medium">Under Maintenance</h3>
              <p className="text-yellow-200 text-sm">Scheduled maintenance in progress</p>
            </div>
          </div>
        );
      case "Out of Order":
        return (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4 flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-400 mr-3" />
            <div>
              <h3 className="text-red-400 font-medium">Out of Order</h3>
              <p className="text-red-200 text-sm">Machine not functioning</p>
            </div>
          </div>
        );
      case "Maintenance Required":
        return (
          <div className="bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg p-4 flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-400 mr-3" />
            <div>
              <h3 className="text-orange-400 font-medium">Maintenance Required</h3>
              <p className="text-orange-200 text-sm">Service needed soon</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
              <Truck className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <h3 className="text-gray-300 font-medium">{status}</h3>
              <p className="text-gray-400 text-sm">Current machine status</p>
            </div>
          </div>
        );
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-blue-400" />
          <p className="mt-4 text-xl">Loading machine details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-400" />
          <p className="mt-4 text-xl text-red-400">{error}</p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Dashboard
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>

       
      </div>
    );
  }
  
  if (!machine) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-400" />
          <p className="mt-4 text-xl">Machine not found</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Dashboard
          </Link>
        </div>
        
        <div className="backdrop-blur-lg bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{machine.name}</h1>
                <div className="flex items-center text-blue-200">
                  <Truck className="mr-2 h-5 w-5" />
                  <span>{machine.machineId}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {getStatusCard(machine.status)}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Images */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 bg-opacity-70 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="relative aspect-square bg-gray-900">
                    {machine.image && machine.image.length > 0 ? (
                      <>
                        <img 
                          src={machine.image[currentImageIndex]} 
                          alt={`${machine.name}`} 
                          className="w-full h-full object-cover"
                        />
                        {machine.image.length > 1 && (
                          <>
                            <button 
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <ImageIcon className="h-16 w-16 text-gray-600" />
                        <p className="text-gray-500 mt-2">No image available</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  {machine.image && machine.image.length > 1 && (
                    <div className="p-2 flex justify-center gap-2 overflow-x-auto">
                      {machine.image.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-12 h-12 rounded overflow-hidden ${
                            currentImageIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column - Details */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Machine Info Card */}
                  <div className="bg-gray-800 bg-opacity-70 rounded-lg border border-gray-700 p-4">
                    <h2 className="text-xl font-semibold text-blue-400 mb-4">Machine Information</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Truck className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Manufacturer</p>
                          <p className="text-gray-200">{machine.manufacturer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Truck className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Model</p>
                          <p className="text-gray-200">{machine.model}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-gray-200">{machine.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Maintenance Info Card */}
                  <div className="bg-gray-800 bg-opacity-70 rounded-lg border border-gray-700 p-4">
                    <h2 className="text-xl font-semibold text-blue-400 mb-4">Maintenance Schedule</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Installation Date</p>
                          <p className="text-gray-200">{formatDate(machine.installDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Last Maintenance</p>
                          <p className="text-gray-200">{formatDate(machine.lastMaintenance)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="mt-1 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Next Maintenance</p>
                          <p className={`font-medium ${
                            new Date(machine.nextMaintenance) < new Date() 
                              ? 'text-red-400' 
                              : 'text-green-400'
                          }`}>
                            {formatDate(machine.nextMaintenance)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center">
                    <Truck className="mr-2 h-5 w-5" /> Schedule Maintenance
                  </button>
                  
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center">
                    <Truck className="mr-2 h-5 w-5" /> Request Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Model1/>
      </div>


      <SmallMap latitude={Number(machine?.lati)} longitude={Number(machine?.lang)} name={machine?.name} locationName={machine?.location} photoUrl={machine?.image[0]}/>
{machineId && <Machinelife machineId={Number(machineId)}/> }
      
    </div>
  );
}