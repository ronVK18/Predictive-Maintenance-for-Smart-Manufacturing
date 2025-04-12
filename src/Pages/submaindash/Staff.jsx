import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

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
        console.log(userList)
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message); // Store only the error message, not the whole error object
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="staff-container">
      <h2 className="staff-title">User List</h2>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {users.length === 0 && !error && (
        <div className="no-users">No users found.</div>
      )}

      {/* <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            {user.photoUrl && (
              <img
                src={user.photoUrl}
                alt={`${user.name}'s profile`}
                className="user-avatar"
              />
            )}
        ))}
      </div> */}
         
          
    </div>
  );
};

export default Staff;