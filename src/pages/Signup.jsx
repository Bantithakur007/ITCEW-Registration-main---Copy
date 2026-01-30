import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaBuilding, FaArrowLeft } from "react-icons/fa";
import './Signup.css';

const Signup = () => {
    const { Signup, handleInput, data, isAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedInstitute, setSelectedInstitute] = useState(null);

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }

        // Get institute from location state or sessionStorage
        const institute = location.state?.institute || 
            (sessionStorage.getItem('selectedInstitute') ? JSON.parse(sessionStorage.getItem('selectedInstitute')) : null);
        
        if (!institute) {
            // Redirect to institute selection if no institute selected
            navigate('/select-institute', { state: { redirectTo: '/signup' } });
            return;
        }
        
        setSelectedInstitute(institute);
    }, [isAuth, navigate, location]);

    const handleBackToSelection = () => {
        sessionStorage.removeItem('selectedInstitute');
        navigate('/select-institute', { state: { redirectTo: '/signup' } });
    };

    if (!selectedInstitute) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="institute-badge" onClick={handleBackToSelection}>
                        <FaBuilding className="badge-icon" />
                        <div className="badge-info">
                            <span className="badge-name">{selectedInstitute.name}</span>
                            <span className="badge-code">{selectedInstitute.code}</span>
                        </div>
                        <FaArrowLeft className="back-icon" />
                    </div>
                    
                    <div className="logo-section">
                        {selectedInstitute.logo ? (
                            <img
                                src={selectedInstitute.logo}
                                alt={selectedInstitute.name}
                                className="institute-logo-img"
                                onError={(e) => {
                                    e.target.src = '/image/logo.jpeg';
                                }}
                            />
                        ) : (
                            <img
                                src='/image/logo.jpeg'
                                alt='logo'
                                className="institute-logo-img"
                            />
                        )}
                    </div>
                    <h2 className="signup-title">Sign up to {selectedInstitute.name}</h2>
                    <p className="signup-subtitle">Create your account to get started</p>
                </div>

                <form onSubmit={Signup} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control-modern"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleInput}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control-modern"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleInput}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control-modern"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleInput}
                                placeholder="Create a password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>

                <div className="signup-divider">
                    <span>Or</span>
                </div>

                <div className="signup-footer">
                    <p className="login-prompt">
                        Already have an account?
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
