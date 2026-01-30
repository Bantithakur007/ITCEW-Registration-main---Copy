import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRecord = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/api/getalladmins`, { withCredentials: true });
        setUsers(response.data.admins); // Set the list of users (admins) in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      // Send DELETE request to delete the admin
      const response = await axios.delete(`${URL}/api/deleteadmin/${id}`, { withCredentials: true });
      // On success, remove the deleted user from the state
      setUsers(users.filter(user => user._id !== id));
      alert(response.data.message); // Show success message
    } catch (err) {
      alert('Error deleting user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Records</h1>
      {users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover shadow-lg">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user._id)} // Call deleteUser on button click
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
};

export default UserRecord;
