import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBuilding, FaSearch, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './InstituteSelector.css';

const InstituteSelector = () => {
    const [institutes, setInstitutes] = useState([]);
    const [filteredInstitutes, setFilteredInstitutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchInstitutes();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredInstitutes(institutes);
        } else {
            const filtered = institutes.filter(institute =>
                institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                institute.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredInstitutes(filtered);
        }
    }, [searchTerm, institutes]);

    const fetchInstitutes = async () => {
        try {
            const response = await fetch(`${URL}/api/institutes`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setInstitutes(result.institutes || []);
                    setFilteredInstitutes(result.institutes || []);
                }
            } else {
                // If API fails, use mock data for demonstration
                const mockInstitutes = [
                    { _id: '1', name: 'ITCEW Institute', code: 'ITCEW', logo: '/image/logo.jpeg' },
                    { _id: '2', name: 'Tech University', code: 'TECHU', logo: '/image/techcanva.png' },
                    { _id: '3', name: 'Engineering College', code: 'ENGC', logo: '/image/logo.jpeg' },
                    { _id: '4', name: 'Business School', code: 'BUSCH', logo: '/image/logo.jpeg' },
                ];
                setInstitutes(mockInstitutes);
                setFilteredInstitutes(mockInstitutes);
            }
        } catch (error) {
            console.error('Error fetching institutes:', error);
            // Use mock data on error
            const mockInstitutes = [
                { _id: '1', name: 'ITCEW Institute', code: 'ITCEW', logo: '/image/logo.jpeg' },
                { _id: '2', name: 'Tech University', code: 'TECHU', logo: '/image/techcanva.png' },
                { _id: '3', name: 'Engineering College', code: 'ENGC', logo: '/image/logo.jpeg' },
                { _id: '4', name: 'Business School', code: 'BUSCH', logo: '/image/logo.jpeg' },
            ];
            setInstitutes(mockInstitutes);
            setFilteredInstitutes(mockInstitutes);
        } finally {
            setLoading(false);
        }
    };

    const handleInstituteSelect = (institute) => {
        // Store selected institute in sessionStorage
        sessionStorage.setItem('selectedInstitute', JSON.stringify(institute));
        
        // Check if there's a redirect path in location state
        const redirectTo = location.state?.redirectTo || '/login';
        navigate(redirectTo, { state: { institute } });
    };

    if (loading) {
        return (
            <div className="institute-selector-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading institutes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="institute-selector-container">
            <div className="institute-selector-card">
                <div className="selector-header">
                    <div className="logo-container">
                        <img
                            src="/image/logo.jpeg"
                            alt="LMS Logo"
                            className="main-logo"
                        />
                    </div>
                    <h1 className="selector-title">Select Your Institute</h1>
                    <p className="selector-subtitle">Choose your institute to continue</p>
                </div>

                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search institutes..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="institutes-grid">
                    {filteredInstitutes.length > 0 ? (
                        filteredInstitutes.map((institute) => (
                            <div
                                key={institute._id}
                                className="institute-card"
                                onClick={() => handleInstituteSelect(institute)}
                            >
                                <div className="institute-logo">
                                    {institute.logo ? (
                                        <img
                                            src={institute.logo}
                                            alt={institute.name}
                                            onError={(e) => {
                                                e.target.src = '/image/logo.jpeg';
                                            }}
                                        />
                                    ) : (
                                        <FaBuilding className="default-logo" />
                                    )}
                                </div>
                                <div className="institute-info">
                                    <h3 className="institute-name">{institute.name}</h3>
                                    <p className="institute-code">{institute.code}</p>
                                </div>
                                <FaChevronRight className="arrow-icon" />
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaBuilding className="no-results-icon" />
                            <p>No institutes found</p>
                        </div>
                    )}
                </div>

                <div className="selector-footer">
                    <p>Don't see your institute? <a href="/contact">Contact Support</a></p>
                </div>
            </div>
        </div>
    );
};

export default InstituteSelector;
