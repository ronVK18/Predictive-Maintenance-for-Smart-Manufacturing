import { useState, useEffect } from 'react';
import { AlertTriangle, Bell, CheckCircle, RefreshCw, X } from 'lucide-react';

export default function MaintenanceHistory() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/data/machine-action2');
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async (alert) => {
    try {
      const response = await fetch('http://localhost:3000/api/data/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alert),
      });
      
      if (!response.ok) throw new Error('Failed to send notification');
      
      // Show success notification
      setNotification({
        type: 'success',
        message: `Email notification sent for ${alert.name}`,
        details: 'Maintenance team has been alerted.'
      });
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Failed to send notification',
        details: err.message
      });
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const closeNotification = () => {
    setNotification(null);
  };

  if (loading && alerts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading maintenance alerts...</p>
        </div>
      </div>
    );
  }

  if (error && alerts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-center p-6 bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-lg shadow-md">
          <AlertTriangle className="mx-auto text-red-400" size={48} />
          <h2 className="text-xl font-bold text-red-400 mt-4">Error Loading Alerts</h2>
          <p className="mt-2 text-gray-300">{error}</p>
          <button 
            onClick={fetchAlerts}
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
      {notification && (
        <div className={`fixed top-6 right-6 max-w-md w-full p-4 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg animate-fade-in z-50 border ${
          notification.type === 'success' 
            ? 'bg-green-900 bg-opacity-70 border-green-600 text-green-200' 
            : 'bg-red-900 bg-opacity-70 border-red-600 text-red-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              {notification.type === 'success' ? (
                <CheckCircle className="mr-3 mt-0.5" size={20} />
              ) : (
                <AlertTriangle className="mr-3 mt-0.5" size={20} />
              )}
              <div>
                <h3 className="font-semibold">{notification.message}</h3>
                <p className="text-sm opacity-90 mt-1">{notification.details}</p>
              </div>
            </div>
            <button 
              onClick={closeNotification}
              className="text-gray-300 hover:text-white ml-4"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-700">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Maintenance Alerts Dashboard</h1>
                <p className="text-gray-400">Equipment requiring attention</p>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={fetchAlerts}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition backdrop-filter backdrop-blur-sm bg-opacity-70"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh Alerts
                </button>
              </div>
            </div>
            
            {lastUpdate && (
              <div className="text-sm text-gray-400 mb-4">
                Last updated: {formatDate(lastUpdate)}
              </div>
            )}
            
            {alerts.length === 0 ? (
              <div className="bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-lg p-8 text-center border border-gray-600">
                <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-200 mb-2">No Maintenance Alerts</h3>
                <p className="text-gray-400">All equipment is currently operating normally.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800 bg-opacity-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Equipment ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 bg-opacity-40 divide-y divide-gray-700">
                    {alerts.map((alert) => (
                      <tr key={alert._id} className="hover:bg-gray-700 hover:bg-opacity-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{alert._id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.status === 'Warning' 
                              ? 'bg-yellow-900 bg-opacity-50 text-yellow-200' 
                              : alert.status === 'Critical' 
                                ? 'bg-red-900 bg-opacity-50 text-red-200'
                                : 'bg-green-900 bg-opacity-50 text-green-200'
                          }`}>
                            {alert.status === 'Warning' && <AlertTriangle size={12} className="mr-1" />}
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(alert.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => sendNotification(alert)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition backdrop-filter backdrop-blur-sm bg-opacity-70 flex items-center"
                          >
                            <Bell size={16} className="mr-1" />
                            Notify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}