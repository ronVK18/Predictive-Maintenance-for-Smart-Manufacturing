import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SmallMap = ({ latitude, longitude, name, locationName, photoUrl }) => {
  const [mapReady, setMapReady] = useState(false);
  
  // Create a custom icon with the person's photo
  const customIcon = new L.Icon({
    iconUrl: photoUrl || '/api/placeholder/40/40',
    iconSize: [90, 90],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'rounded-full border-2 border-white shadow-lg'
  });

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        {/* Glass Effect Card with Dark Theme */}
        <div className="w-full bg-black bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">{locationName || 'Location Map'}</h2>
            {name && <p className="text-gray-300 mt-1">{name}</p>}
          </div>
          
          {/* Map Container */}
          <div className="w-full h-96 relative">
            {latitude && longitude ? (
              <MapContainer 
                center={[latitude, longitude]} 
                zoom={16} // Increased zoom for better satellite view detail
                zoomControl={false} // We'll add custom position for zoom controls
                style={{ height: '100%', width: '100%' }}
                whenReady={() => setMapReady(true)}
                className="z-0"
              >
                {/* Satellite view tile layer */}
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                
                {/* Optional: Add a labels layer on top of satellite imagery */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                  zIndex={10}
                />
                
                {/* Location marker with custom icon */}
                <Marker position={[latitude, longitude]} icon={customIcon}>
                  <Popup className="text-gray-800">
                    <div className="font-semibold">{name || 'Location'}</div>
                    <div>{locationName || 'Marked Location'}</div>
                    <div className="text-xs mt-1">
                      {latitude.toFixed(5)}, {longitude.toFixed(5)}
                    </div>
                  </Popup>
                </Marker>
                
                {/* Custom position for zoom control */}
                <ZoomControl position="bottomleft" />
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300">
                Please provide latitude and longitude
              </div>
            )}
            
            {/* Glass overlay for coordinates */}
            {mapReady && latitude && longitude && (
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm p-3 rounded-lg text-white text-sm z-10 border border-gray-700">
                <div className="font-medium mb-1">Coordinates</div>
                <div>Lat: {latitude.toFixed(5)}</div>
                <div>Lng: {longitude.toFixed(5)}</div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 flex justify-between items-center border-t border-gray-700">
            <span className="text-xs text-gray-400">Satellite imagery © Esri</span>
            <span className="text-xs text-gray-400">Powered by Leaflet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallMap;