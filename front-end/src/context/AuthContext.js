import axios from 'axios';
import * as userService from '~/serivces/userService';
import { createContext, useContext, useEffect, useState } from 'react';

import API_URL from '../config';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token') || null);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);

        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (
                    error.response &&
                    error.response.status === 403 &&
                    error.response.data.message.includes('blocked')
                ) {
                    logout();
                }

                return Promise.reject(error);
            },
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, [token]);

    // Login
    const login = async (userData) => {
        try {
            const res = await userService.userLoginByEmail(userData);
            const { token, user } = res;
            setToken(token);
            setUser(user);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login Denied or failed',
            };
        }
    };

    // Register
    const register = async (userData) => {
        try {
            const res = await userService.userSignupByEmail(userData);
            return {
                success: true,
                message: res.message,
                user: res.user,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Register failed',
            };
        }
    };

    // Logout
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    // Get the user details
    const refreshUser = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                const updateUser = res.data.user;
                setUser(updateUser);
                const storage = localStorage.getItem('token') ? localStorage : sessionStorage;

                storage.setItem('user', JSON.stringify(updateUser));
            }
        } catch (error) {
            console.error('Failed to refresh the user', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                loading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
