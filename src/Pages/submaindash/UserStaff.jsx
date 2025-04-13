import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // your firebase config
import { User, Calendar, Briefcase, Clock, MapPin, Check, AlertTriangle, Activity } from "lucide-react";
import MaintenanceTaskReport from "./MaintenanceTaskReport"


const getUserWithAssignedTasks = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.log("No such user!");
      return null;
    }
    
    const userData = userSnap.data();
    const tasksRef = collection(db, "users", userId, "assignedTasks");
    const tasksSnap = await getDocs(tasksRef);
    
    const assignedTasks = tasksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      userId,
      ...userData,
      assignedTasks
    };
  } catch (error) {
    console.error("Error fetching user and tasks:", error);
    return null;
  }
};

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch(status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor()}`}>
      {status}
    </span>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700 p-4 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800/60">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white">{task.assetName}</h3>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-gray-400">
          <Briefcase size={16} />
          <span className="text-sm">{task.assetType}</span>
        </div>
           {
            task.assignedAt && (
                <div className="flex items-center gap-2 text-gray-400">
          <Clock size={16} />
          <span className="text-sm">{task?.assignedAt.seconds}</span>
        </div>
            )
           }
       
        
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">Last: {task.lastMaintenance}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">Next: {task.nextMaintenance}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-3 mt-2">
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={16} />
          <span className="text-sm">
            {task.coordinates?.latitude}, {task.coordinates?.longitude}
          </span>
        </div>
      </div>
    </div>
  );
};

const UserStaff = () => {
  const { userId } = useParams();
  console.log(userId)
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tm,setm]=useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await getUserWithAssignedTasks(userId);
      console.log(data)
      setUserData(data);
      setm(data.assignedTasks);
      console.log(data.assignedTasks);
      setIsLoading(false);
    };
    
    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin mr-2">
          <Activity size={24} />
        </div>
        <span>Loading user data...</span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg flex items-center">
          <AlertTriangle size={24} className="mr-2" />
          <span>User not found or error loading data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
         
      <div className="max-w-4xl mx-auto">
        {/* User Profile Card */}
<div className="w-full py-[2rem] text-center">
<h1 className=" font-bold">Worker's DashBoard</h1>
</div>

      
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700 p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                {userData.photoURL ? (
                  <img 
                    src={userData.photoURL} 
                    alt={userData.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-800"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-400">{userData.email}</p>
              
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-gray-700/50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Briefcase size={14} className="text-blue-400" />
                  <span>{userData.role || "Employee"}</span>
                </div>
                <div className="bg-gray-700/50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Check size={14} className="text-green-400" />
                  <span>{userData.assignedTasks?.length || 0} Tasks</span>
                </div>
                <div className="bg-gray-700/50 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Clock size={14} className="text-purple-400" />
                  <span>Last Login: {new Date(userData.lastLogin).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Assigned Tasks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase className="text-blue-400" />
              Assigned Tasks
            </h2>
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {userData.assignedTasks?.length || 0} Tasks
            </span>
          </div>
          
          {tm && tm.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tm.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <Briefcase size={32} className="text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-400">No tasks assigned</h3>
              <p className="text-gray-500 mt-2">This user doesn't have any assigned tasks at the moment.</p>
            </div>
          )}
        </div>
      </div>
    <MaintenanceTaskReport tasks={tm}/>
    </div>
  );
};

export default UserStaff;