import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import reducer from '../Reducer/authreducer';
import { toast } from "react-toastify";

const AuthContext = createContext();

const initialState = {
    isLoading: true,  // Set loading to true initially
    data: {
        username: "",
        email: "",
        password: "",
        instituteId: ""
    },
    isAuth: false,
    user: {},
    isSuccess: false,
    selectedInstitute: null
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    let URL = process.env.REACT_APP_API_URL;

    const Signup = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' });

        // Get selected institute from sessionStorage
        const selectedInstitute = sessionStorage.getItem('selectedInstitute') 
            ? JSON.parse(sessionStorage.getItem('selectedInstitute')) 
            : null;

        if (!selectedInstitute) {
            toast.error("Please select an institute first");
            navigate('/select-institute', { state: { redirectTo: '/signup' } });
            return;
        }

        const signupData = {
            ...state.data,
            instituteId: selectedInstitute._id || selectedInstitute.id
        };

        try {
            const response = await fetch(`${URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                const result = await response.json();
                dispatch({ type: 'USER_SIGNUP' });
                dispatch({ type: 'SET_INSTITUTE', payload: selectedInstitute });
                toast.success(result.message || "Signup successful");
                navigate('/login');
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message || "Signup failed");
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error("Internal Server Error");
        }
    };

    const Login = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' });

        // Get selected institute from sessionStorage
        const selectedInstitute = sessionStorage.getItem('selectedInstitute') 
            ? JSON.parse(sessionStorage.getItem('selectedInstitute')) 
            : null;

        if (!selectedInstitute) {
            toast.error("Please select an institute first");
            navigate('/select-institute');
            return;
        }

        const loginData = {
            ...state.data,
            instituteId: selectedInstitute._id || selectedInstitute.id
        };

        try {
            const response = await fetch(`${URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                dispatch({ type: 'USER_LOGIN' });
                dispatch({ type: 'SET_INSTITUTE', payload: selectedInstitute });
                await getUser();
                toast.success(result.message || "Login successful");
                navigate('/');
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error("Internal Server Error");
        }
    };

    const Logout = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(`${URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                dispatch({ type: 'USER_LOGOUT' });
                // Clear institute selection on logout
                sessionStorage.removeItem('selectedInstitute');
                toast.success("Logout successful");
                navigate('/select-institute');
            } else {
                toast.error("Failed to log out");
            }
        } catch (error) {
            console.error('Logout error:', error.message);
            toast.error("Internal Server Error");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'HANDLE_INPUT', payload: { name, value } });
    };

    const getUser = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(`${URL}/api/me`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    dispatch({ type: "LOAD_USER", payload: result });
                }
            } else {
                dispatch({ type: "LOAD_USER_ERROR" });
            }
        } catch (error) {
            dispatch({ type: "LOAD_USER_ERROR" });
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        // Load selected institute from sessionStorage on mount
        const savedInstitute = sessionStorage.getItem('selectedInstitute');
        if (savedInstitute) {
            try {
                const institute = JSON.parse(savedInstitute);
                dispatch({ type: 'SET_INSTITUTE', payload: institute });
            } catch (error) {
                console.error('Error parsing saved institute:', error);
            }
        }
        
        getUser();
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, Signup, Login, Logout, handleInput }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
