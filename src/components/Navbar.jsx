import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import { FaBuilding } from 'react-icons/fa';

const Navbar = () => {
    const { isAuth, Logout, selectedInstitute } = useAuth();
    
    // Get institute from state or sessionStorage
    const institute = selectedInstitute || 
        (sessionStorage.getItem('selectedInstitute') ? JSON.parse(sessionStorage.getItem('selectedInstitute')) : null);

    return (
        <nav className="navbar navbar-expand-lg bg-blue" style={{ opacity: "0.9" }}>
            <div className="container">
                {/* Brand Logo & Name Wrapper */}
                <div className="d-flex align-items-center">
                    <img
                        src={institute?.logo || '/image/logo.jpeg'}
                        alt='logo'
                        className="rounded-circle shadow-sm img-fluid me-2"
                        style={{ width: "45px", height: "45px", objectFit: "cover" }}
                        onError={(e) => {
                            e.target.src = '/image/logo.jpeg';
                        }}
                    />
                    <div className="d-flex flex-column">
                        <h2 className="navbar-brand text-light fw-bolder my-auto fs-6 fs-md-4 text-nowrap mb-0">
                            {institute ? institute.name : 'IT Computer Education World'}
                        </h2>
                        {institute && (
                            <small className="text-light opacity-75" style={{ fontSize: '0.7rem' }}>
                                {institute.code}
                            </small>
                        )}
                    </div>
                </div>

                {/* Navbar Toggler Button for Mobile */}
                <button
                    className="navbar-toggler btn-sm p-1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ width: '20px', height: '20px' }}></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse justify-content-lg-end mt-2 mt-lg-0" id="navbarNav">
                    <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
                        <NavLink to='/' className="text-decoration-none">
                            <button className="btn btn-outline-light w-100 w-lg-auto">Home</button>
                        </NavLink>

                        <NavLink to='/about' className="text-decoration-none">
                            <button className="btn btn-outline-light w-100 w-lg-auto">About ITC</button>
                        </NavLink>

                        {isAuth && (<>

                            <NavLink to='/register' className="text-decoration-none">
                                <button className="btn btn-outline-light w-100 w-lg-auto">Register Student</button>
                            </NavLink>
                          
                        </>
                            
                        )}

                        {isAuth && (
                            <NavLink to='/logout' className="text-decoration-none">
                                <button className="btn btn-outline-light w-100 w-lg-auto" onClick={Logout}>
                                    Log out
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
