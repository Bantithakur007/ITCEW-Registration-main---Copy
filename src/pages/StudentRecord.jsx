import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentRecord = () => {
    const [students, setStudents] = useState([]); // State to hold the students data
    const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered student data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query
    const URL = process.env.REACT_APP_API_URL;
    // Fetch all students data when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${URL}/api/getallstudent`, { withCredentials: true });
                setStudents(response.data.students); // Set students data
                setFilteredStudents(response.data.students); // Set filtered students data
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError('Error fetching students');
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Filter students based on the search query
    useEffect(() => {
        if (searchQuery === '') {
            setFilteredStudents(students); // Show all students when search query is empty
        } else {
            const filtered = students.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.card.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStudents(filtered);
        }
    }, [searchQuery, students]);

    // Handle delete student
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/api/deletestudent/${id}`, { withCredentials: true });
            // After successful deletion, remove the student from the state
            setStudents(students.filter(student => student._id !== id));
            setFilteredStudents(filteredStudents.filter(student => student._id !== id)); // Also update filtered students list
        } catch (err) {
            setError('Error deleting student');
        }
    };

    // Conditional rendering based on loading or error state
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm">
                <h2 className="mb-0 text-primary fw-bold">Student Records</h2>
                <p className="px-3 py-2 bg-primary text-white rounded-pill text-center fw-semibold shadow-sm">
                    Total: {students.length}
                </p>
            </div>


            {/* Search Bar */}
            <div className="mb-4 row mt-2">
                <div className="col-12 col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or card ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>


            {filteredStudents.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover shadow-lg">
                        <thead className="table-dark ">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Card ID</th>
                                <th>Course</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>
                                        {/* Display the student's image as a thumbnail */}
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="img-thumbnail"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.card}</td>
                                    <td>{student.course}</td>
                                    <td>{student.city}</td>
                                    <td>{student.state}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No students found</p>
            )}
        </div>
    );
};

export default StudentRecord;
