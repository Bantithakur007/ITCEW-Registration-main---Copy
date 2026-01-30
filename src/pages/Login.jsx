import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaBuilding, FaArrowLeft } from "react-icons/fa";
import './Login.css';

const Login = () => {
    const { Login, handleInput, data, isAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState(null);

    useEffect(() => {
        // Get institute from location state or sessionStorage
        const institute = location.state?.institute || 
            (sessionStorage.getItem('selectedInstitute') ? JSON.parse(sessionStorage.getItem('selectedInstitute')) : null);
        
        if (!institute) {
            // Redirect to institute selection if no institute selected
            navigate('/select-institute');
            return;
        }
        
        setSelectedInstitute(institute);
    }, [location, navigate]);

    // UseEffect to handle redirection after login
    useEffect(() => {
        if (isAuth) {
            navigate('/'); // Redirect to homepage if the user is authenticated
        }
    }, [isAuth, navigate]);

    const handleBackToSelection = () => {
        sessionStorage.removeItem('selectedInstitute');
        navigate('/select-institute');
    };

    if (!selectedInstitute) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
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
                    <h2 className="login-title">Login to {selectedInstitute.name}</h2>
                    <p className="login-subtitle">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={Login} className="login-form">
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
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password-link">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="login-divider">
                    <span>Or</span>
                </div>

                <div className="login-footer">
                    <p className="signup-prompt">
                        Don't have an account? 
                        <Link to="/signup" className="signup-link">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
