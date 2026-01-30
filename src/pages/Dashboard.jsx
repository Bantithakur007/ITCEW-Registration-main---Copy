import React, { useState } from 'react';
import StudentRecord from './StudentRecord';
import UserRecord from './UserRecord';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('student');  // Default active tab is 'student'

  const handleTabChange = (tab) => {
    setActiveTab(tab);  // Update active tab state when button is clicked
  };

  return (
    <div className="p-2 p-md-5 mb-5">
      <h1>Admin Dashboard</h1>
      <nav className="d-flex gap-2">
         {/* Button for Student */}
         <button
          className={`btn btn-sm px-3 py-1 rounded-pill ${activeTab === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleTabChange('student')}
        >
          Student
        </button>
        {/* Button for Users */}
        <button
          className={`btn btn-sm px-3 py-1 rounded-pill ${activeTab === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleTabChange('user')}
        >
          Users
        </button>
        
       
      </nav>
      <hr />

      {/* Conditionally render the components based on activeTab */}
      <div className="mt-4">
        {activeTab === 'student' ? <StudentRecord /> : <UserRecord />}
      </div>
    </div>
  );
};

export default Dashboard;
