import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config';

import './index.css';
import NavigationBar from './components/NavigationBar';
import ExpenseCards from './components/ExpenseCards';
import Charts from './components/Charts';
import CRUD from './components/CRUD';
import Login from './components/Login';
import Register from './components/Register';
import Toast from './components/Toast';
import Footer from './components/Footer';
import Settings from './components/Settings';
import Reports from './components/Reports';
import CalendarView from './components/CalendarView';
import Subscriptions from './components/Subscriptions';
import SavingsGoals from './components/SavingsGoals';
import BudgetPlanning from './components/BudgetPlanning';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [toast, setToast] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authView, setAuthView] = useState('login'); // 'login' or 'register'
    const [isLoading, setIsLoading] = useState(false);
    const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'reports', 'settings'
    const [userProfile, setUserProfile] = useState(null);

    const [budget, setBudget] = useState(() => {
        const saved = localStorage.getItem('budget');
        return saved ? Number(saved) : 2000;
    });

    const getUsername = () => {
        if (!token) return 'User';
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || 'User';
        } catch {
            return 'User';
        }
    };

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
        setActiveView('dashboard');
        showToast('Logged out.');
    };

    const [income, setIncome] = useState([]);
    const [savings, setSavings] = useState([]);

    const fetchData = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const [expensesRes, incomeRes, savingsRes, profileRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/Expenses`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/Income`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/Savings`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/User/profile`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (expensesRes.ok) setExpenses(await expensesRes.json());
            if (incomeRes.ok) setIncome(await incomeRes.json());
            if (savingsRes.ok) setSavings(await savingsRes.json());
            if (profileRes.ok) setUserProfile(await profileRes.json());

            if (expensesRes.status === 401) {
                handleLogout();
                showToast('Session expired. Please login again.', 'error');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            showToast('Failed to fetch data', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    const calculateBudgetBreakdown = () => {
        const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
        const rule = userProfile?.savingsRule || '50/30/20';

        let needs = 0, wants = 0, savingsGoal = 0;

        if (rule === '50/30/20') {
            needs = totalIncome * 0.5;
            wants = totalIncome * 0.3;
            savingsGoal = totalIncome * 0.2;
        } else if (rule === '70/20/10') {
            needs = totalIncome * 0.7;
            savingsGoal = totalIncome * 0.2;
            wants = totalIncome * 0.1;
        } else if (rule === '60/20/20') {
            needs = totalIncome * 0.6;
            wants = totalIncome * 0.2;
            savingsGoal = totalIncome * 0.2;
        } else if (rule === '80/20') {
            needs = totalIncome * 0.8;
            savingsGoal = totalIncome * 0.2;
        } else if (rule === '50/50') {
            needs = totalIncome * 0.5;
            savingsGoal = totalIncome * 0.5;
        }

        return { needs, wants, savings: savingsGoal };
    };

    const budgetBreakdown = calculateBudgetBreakdown();

    if (!token) {
        // ... (Login/Register logic remains same)
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
            <NavigationBar
                onLogout={handleLogout}
                activeView={activeView}
                onViewChange={setActiveView}
                username={getUsername()}
            />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {activeView === 'dashboard' && (
                    <div className="animate-fade-in">
                        <ExpenseCards expenses={expenses} budget={budget} setBudget={setBudget} userProfile={userProfile} />
                        <Charts
                            expenses={expenses}
                            income={income}
                            savings={savings}
                            budgetBreakdown={budgetBreakdown}
                        />
                        <CRUD
                            expenses={expenses}
                            onRefresh={fetchData}
                            showToast={showToast}
                            token={token}
                        />
                    </div>
                )}
                {activeView === 'budget' && (
                    <BudgetPlanning token={token} showToast={showToast} />
                )}
                {activeView === 'reports' && (
                    <Reports expenses={expenses} income={income} savings={savings} />
                )}
                {activeView === 'calendar' && (
                    <CalendarView expenses={expenses} />
                )}
                {activeView === 'subscriptions' && (
                    <Subscriptions
                        onRefresh={fetchData}
                        token={token}
                        showToast={showToast}
                    />
                )}
                {activeView === 'savings' && (
                    <SavingsGoals showToast={showToast} />
                )}
                {activeView === 'settings' && (
                    <Settings
                        budget={budget}
                        setBudget={setBudget}
                        username={getUsername()}
                        onLogout={handleLogout}
                    />
                )}
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
