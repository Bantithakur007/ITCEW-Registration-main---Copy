
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import StudentData from './pages/StudentData';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import InstituteSelector from './components/InstituteSelector';

import ProtectedRoute from './ProtectiveRoute/ProtectRoute';

import PromoteAdmin from './components/PromoteAdmin';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import StudentRecord from './pages/StudentRecord';
import UserRecord from './pages/UserRecord';
import InstituteManagement from './pages/InstituteManagement';


function App() {

  return (

    <>

      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/register' element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="userrecord" element={<UserRecord />} />
            <Route path="studentrecord" element={<StudentRecord />} />
            <Route path="institutes" element={<InstituteManagement />} />
          </Route>
        </Route>
        <Route path="/initial-admin" element={<PromoteAdmin />} />


        <Route path='/' element={<StudentData />} />
        <Route path='/about' element={<About />} />
        <Route path='/select-institute' element={<InstituteSelector />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
