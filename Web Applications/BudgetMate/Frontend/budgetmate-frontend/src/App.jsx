import React, { useState, useEffect } from 'react';

import './index.css';
import NavigationBar from './components/NavigationBar';
import ExpenseCards from './components/ExpenseCards';
import Charts from './components/Charts';
import CRUD from './components/CRUD';
import Login from './components/Login';
import Register from './components/Register';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [toast, setToast] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authView, setAuthView] = useState('login'); // 'login' or 'register'
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        showToast('Logged in successfully!');
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setExpenses([]);
        showToast('Logged out.');
    };

    const fetchExpenses = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/Expenses', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setExpenses(data);
            } else if (response.status === 401) {
                handleLogout();
                showToast('Session expired. Please login again.', 'error');
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
            showToast('Failed to fetch expenses', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchExpenses();
        }
    }, [token]);

    if (!token) {
        return (
            <>
                {authView === 'login' ? (
                    <Login
                        onLogin={handleLogin}
                        onSwitchToRegister={() => setAuthView('register')}
                    />
                ) : (
                    <Register
                        onRegisterSuccess={() => {
                            setAuthView('login');
                            showToast('Registration successful! Please login.');
                        }}
                        onSwitchToLogin={() => setAuthView('login')}
                    />
                )}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </>
        );
    }

    if (isLoading && expenses.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <NavigationBar onLogout={handleLogout} />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <ExpenseCards expenses={expenses} />
                <Charts expenses={expenses} />
                <CRUD
                    expenses={expenses}
                    onRefresh={fetchExpenses}
                    showToast={showToast}
                    token={token}
                />
                <Footer />
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default App;
