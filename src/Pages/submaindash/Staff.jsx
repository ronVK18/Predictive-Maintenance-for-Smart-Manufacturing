import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, Calendar, MapPin, Eye } from 'lucide-react';

const Staff = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
        console.log("-");
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Glass Effect */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-gray-900/70 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Staff Management</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="p-6 rounded-lg mb-6 backdrop-blur-md bg-gray-800/50 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">User List</h2>

          {error && (
            <div className="p-4 mb-6 rounded-md bg-red-500/20 text-red-300 border border-red-700">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {users.length === 0 && !error && (
            <div className="p-4 rounded-md bg-gray-700/50">
              <p>No users found.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map(user => (
              <div 
                key={user.id} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
              >
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4">
                  <div className="flex items-center space-x-4">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={`${user.name || 'User'}'s profile`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-700 border-2 border-gray-600">
                        <User size={32} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold">{user.name || 'N/A'}</h3>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Briefcase size={14} className="opacity-70" />
                        {user.role || 'Staff'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="opacity-70 flex-shrink-0" />
                    <span className="text-sm truncate">{user.email || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="opacity-70 flex-shrink-0" />
                    <span className="text-sm">{user.phone || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="opacity-70 flex-shrink-0" />
                    <span className="text-sm">{user.location || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="opacity-70 flex-shrink-0" />
                    <span className="text-sm">
                      {/* {user && user?.lastLogin} */}
                    </span>
                  </div>
                  
                  <div className="pt-1">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-500/20 text-green-300'
                          : user.status === 'inactive'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {user.status || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <Link
                    to={`/user/${user.id}`}
                    className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
                  >
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Staff;