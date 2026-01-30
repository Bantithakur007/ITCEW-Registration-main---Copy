import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { FaBuilding, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './InstituteManagement.css';

const InstituteManagement = () => {
    const { user } = useAuth();
    const [institutes, setInstitutes] = useState([]);
    const [filteredInstitutes, setFilteredInstitutes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingInstitute, setEditingInstitute] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        logo: '',
        description: ''
    });
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
        setLoading(true);
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
                // Use mock data if API fails
                const mockInstitutes = [
                    { _id: '1', name: 'ITCEW Institute', code: 'ITCEW', logo: '/image/logo.jpeg', description: 'IT Computer Education World' },
                    { _id: '2', name: 'Tech University', code: 'TECHU', logo: '/image/techcanva.png', description: 'Technology University' },
                ];
                setInstitutes(mockInstitutes);
                setFilteredInstitutes(mockInstitutes);
            }
        } catch (error) {
            console.error('Error fetching institutes:', error);
            toast.error('Failed to load institutes');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = editingInstitute 
                ? `${URL}/api/institutes/${editingInstitute._id}`
                : `${URL}/api/institutes`;
            
            const method = editingInstitute ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || (editingInstitute ? 'Institute updated successfully' : 'Institute created successfully'));
                setShowModal(false);
                resetForm();
                fetchInstitutes();
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Error saving institute:', error);
            toast.error('Failed to save institute');
        }
    };

    const handleEdit = (institute) => {
        setEditingInstitute(institute);
        setFormData({
            name: institute.name,
            code: institute.code,
            logo: institute.logo || '',
            description: institute.description || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (instituteId) => {
        if (!window.confirm('Are you sure you want to delete this institute?')) {
            return;
        }

        try {
            const response = await fetch(`${URL}/api/institutes/${instituteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Institute deleted successfully');
                fetchInstitutes();
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message || 'Failed to delete institute');
            }
        } catch (error) {
            console.error('Error deleting institute:', error);
            toast.error('Failed to delete institute');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            logo: '',
            description: ''
        });
        setEditingInstitute(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    if (loading) {
        return (
            <div className="institute-management-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading institutes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="institute-management-container">
            <div className="management-header">
                <div>
                    <h1 className="page-title">Institute Management</h1>
                    <p className="page-subtitle">Manage all institutes in the system</p>
                </div>
                <button className="add-btn" onClick={openAddModal}>
                    <FaPlus /> Add New Institute
                </button>
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

            <div className="institutes-table-container">
                {filteredInstitutes.length > 0 ? (
                    <table className="institutes-table">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstitutes.map((institute) => (
                                <tr key={institute._id}>
                                    <td>
                                        <div className="table-logo">
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
                                    </td>
                                    <td>{institute.name}</td>
                                    <td><span className="code-badge">{institute.code}</span></td>
                                    <td>{institute.description || '-'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(institute)}
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(institute._id)}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-results">
                        <FaBuilding className="no-results-icon" />
                        <p>No institutes found</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingInstitute ? 'Edit Institute' : 'Add New Institute'}</h2>
                            <button className="close-btn" onClick={closeModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="name">Institute Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter institute name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="code">Institute Code *</label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter institute code"
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="logo">Logo URL</label>
                                <input
                                    type="url"
                                    id="logo"
                                    name="logo"
                                    value={formData.logo}
                                    onChange={handleInputChange}
                                    placeholder="Enter logo URL"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter institute description"
                                    rows="3"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn">
                                    {editingInstitute ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstituteManagement;
