import { useState } from "react";
import { Calendar, Image, CheckCircle, MapPin, Truck, Clock, AlertTriangle, Loader2 } from "lucide-react";

export default function CreateMachine() {
  const [formData, setFormData] = useState({
    name: "",
    machineId: "",
    status: "Operational",
    location: "",
    installDate: "",
    lastMaintenance: "",
    nextMaintenance: "",
    manufacturer: "",
    model: ""
  });
  
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      // Convert FileList to array and update state
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);
      
      // Create temporary URLs for preview
      const newUrls = filesArray.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newUrls]);
    }
  };
  
  const removeImage = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, you would first upload the images
      // and get their URLs to include in the request
      // This is simplified for demonstration purposes
      
      const machineData = {
        ...formData,
        image: imageUrls, // In a real app, these would be URLs from your server/storage
        installDate: new Date(formData.installDate),
        lastMaintenance: new Date(formData.lastMaintenance),
        nextMaintenance: new Date(formData.nextMaintenance),
      };
      
      const response = await fetch('/machinDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(machineData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: "",
            machineId: "",
            status: "Operational",
            location: "",
            installDate: "",
            lastMaintenance: "",
            nextMaintenance: "",
            manufacturer: "",
            model: ""
          });
          setImages([]);
          setImageUrls([]);
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to save');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Machine Details Form</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="flex items-center text-xl mb-3 text-blue-300">
              <Image className="mr-2" size={20} />
              Machine Images
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url} 
                    alt={`Upload ${index + 1}`} 
                    className="h-24 w-full object-cover rounded-lg border border-gray-600"
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <AlertTriangle size={16} />
                  </button>
                </div>
              ))}
              
              <label className="h-24 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                <div className="text-center">
                  <Image className="mx-auto text-gray-400" size={24} />
                  <span className="text-sm text-gray-400">Add Images</span>
                </div>
              </label>
            </div>
          </div>
          
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <MapPin className="mr-2" size={18} />
                Machine Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter machine name"
              />
            </div>
            
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <Truck className="mr-2" size={18} />
                Machine ID
              </label>
              <input
                type="text"
                name="machineId"
                value={formData.machineId}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter unique machine ID"
              />
            </div>
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <CheckCircle className="mr-2" size={18} />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Operational">Operational</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Out of Order">Out of Order</option>
                <option value="Standby">Standby</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <MapPin className="mr-2" size={18} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter machine location"
              />
            </div>
          </div>
          
          {/* Third Row - Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <Calendar className="mr-2" size={18} />
                Install Date
              </label>
              <input
                type="date"
                name="installDate"
                value={formData.installDate}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <Clock className="mr-2" size={18} />
                Last Maintenance
              </label>
              <input
                type="date"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <Calendar className="mr-2" size={18} />
                Next Maintenance
              </label>
              <input
                type="date"
                name="nextMaintenance"
                value={formData.nextMaintenance}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <Truck className="mr-2" size={18} />
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter manufacturer name"
              />
            </div>
            
            <div>
              <label className="flex items-center text-blue-300 mb-2">
                <MapPin className="mr-2" size={18} />
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-70 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter machine model"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                "Save Machine Details"
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 border border-green-500 rounded-lg p-8 shadow-lg max-w-md text-center animate-fade-in">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={50} />
            <h2 className="text-2xl font-bold text-green-400 mb-2">Success!</h2>
            <p className="text-gray-300 mb-6">Machine details have been saved successfully.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}