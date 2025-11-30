import React, { useState, useEffect } from 'react';
import { Save, PhilippinePeso, PieChart, TrendingUp, Wallet, Plus, Trash2, DollarSign, PiggyBank } from 'lucide-react';
import API_BASE_URL from '../config';

export default function BudgetPlanning({ token, showToast }) {
    const [incomes, setIncomes] = useState([]);
    const [savings, setSavings] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newIncome, setNewIncome] = useState({ source: '', amount: '' });
    const [newSavings, setNewSavings] = useState({ description: '', amount: '' });

    const [currentRule, setCurrentRule] = useState('50/30/20');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        fetchData();
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
                if (data.savingsRule) setCurrentRule(data.savingsRule);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [incomesRes, savingsRes, expensesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/Income`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/Savings`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/Expenses`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (incomesRes.ok) setIncomes(await incomesRes.json());
            if (savingsRes.ok) setSavings(await savingsRes.json());
            if (expensesRes.ok) setExpenses(await expensesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
            showToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRule = async (rule) => {
        if (!userProfile) return;
        try {
            const updatedProfile = { ...userProfile, savingsRule: rule };
            const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(updatedProfile)
            });

            if (response.ok) {
                setCurrentRule(rule);
                setUserProfile(updatedProfile);
                showToast('Budget rule updated!');
            } else {
                showToast('Failed to update rule', 'error');
            }
        } catch (error) {
            showToast('Error updating rule', 'error');
        }
    };

    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/Income`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...newIncome, amount: parseFloat(newIncome.amount) })
            });
            if (response.ok) {
                const data = await response.json();
                setIncomes([...incomes, data]);
                setNewIncome({ source: '', amount: '' });
                showToast('Income added successfully!');
            }
        } catch (error) {
            showToast('Failed to add income', 'error');
        }
    };

    const handleAddSavings = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/Savings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...newSavings, amount: parseFloat(newSavings.amount) })
            });
            if (response.ok) {
                const data = await response.json();
                setSavings([...savings, data]);
                setNewSavings({ description: '', amount: '' });
                showToast('Savings added successfully!');
            }
        } catch (error) {
            showToast('Failed to add savings', 'error');
        }
    };

    const handleDeleteIncome = async (id) => {
        if (!window.confirm('Delete this income source?')) return;
        try {
            await fetch(`${API_BASE_URL}/api/Income/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            setIncomes(incomes.filter(i => i.id !== id));
            showToast('Income deleted');
        } catch (error) {
            showToast('Failed to delete income', 'error');
        }
    };

    const handleDeleteSavings = async (id) => {
        if (!window.confirm('Delete this savings entry?')) return;
        try {
            await fetch(`${API_BASE_URL}/api/Savings/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            setSavings(savings.filter(s => s.id !== id));
            showToast('Savings deleted');
        } catch (error) {
            showToast('Failed to delete savings', 'error');
        }
    };

    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);
    const availableBudget = totalIncome - totalExpenses - totalSavings;

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-6 pb-12">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Wallet className="w-5 h-5 text-blue-100" />
                        <h3 className="font-medium text-blue-100">Total Income</h3>
                    </div>
                    <p className="text-2xl font-bold">₱{totalIncome.toLocaleString()}</p>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-red-100" />
                        <h3 className="font-medium text-red-100">Total Expenses</h3>
                    </div>
                    <p className="text-2xl font-bold">₱{totalExpenses.toLocaleString()}</p>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <PiggyBank className="w-5 h-5 text-green-100" />
                        <h3 className="font-medium text-green-100">Total Savings</h3>
                    </div>
                    <p className="text-2xl font-bold">₱{totalSavings.toLocaleString()}</p>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-indigo-100" />
                        <h3 className="font-medium text-indigo-100">Available Budget</h3>
                    </div>
                    <p className="text-2xl font-bold">₱{availableBudget.toLocaleString()}</p>
                </div>
            </div>

            {/* Savings Rule Selector */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Budget Allocation Rule</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['50/30/20', '70/20/10', '60/20/20', '80/20', '50/50'].map(rule => (
                        <button
                            key={rule}
                            onClick={() => handleUpdateRule(rule)}
                            className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${currentRule === rule
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {rule}
                        </button>
                    ))}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                    {currentRule === '50/30/20' && '50% Needs, 30% Wants, 20% Savings'}
                    {currentRule === '70/20/10' && '70% Needs, 20% Savings, 10% Wants'}
                    {currentRule === '60/20/20' && '60% Needs, 20% Wants, 20% Savings'}
                    {currentRule === '80/20' && '80% Needs, 20% Savings'}
                    {currentRule === '50/50' && '50% Needs, 50% Savings'}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Income Section */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-500" />
                        Income Sources
                    </h3>

                    <form onSubmit={handleAddIncome} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Source (e.g. Salary)"
                            value={newIncome.source}
                            onChange={e => setNewIncome({ ...newIncome, source: e.target.value })}
                            className="input-field flex-grow"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newIncome.amount}
                            onChange={e => setNewIncome({ ...newIncome, amount: e.target.value })}
                            className="input-field w-32"
                            required
                        />
                        <button type="submit" className="btn-primary-custom px-4">
                            <Plus size={20} />
                        </button>
                    </form>

                    <div className="space-y-3">
                        {incomes.map(income => (
                            <div key={income.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <p className="font-medium text-slate-700">{income.source}</p>
                                    <p className="text-xs text-slate-400">{new Date(income.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-blue-600">+₱{income.amount.toLocaleString()}</span>
                                    <button onClick={() => handleDeleteIncome(income.id)} className="text-slate-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {incomes.length === 0 && <p className="text-center text-slate-400 py-4">No income sources added.</p>}
                    </div>
                </div>

                {/* Savings Section */}
                <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <PiggyBank className="w-5 h-5 text-green-500" />
                        Savings & Investments
                    </h3>

                    <form onSubmit={handleAddSavings} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Description"
                            value={newSavings.description}
                            onChange={e => setNewSavings({ ...newSavings, description: e.target.value })}
                            className="input-field flex-grow"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newSavings.amount}
                            onChange={e => setNewSavings({ ...newSavings, amount: e.target.value })}
                            className="input-field w-32"
                            required
                        />
                        <button type="submit" className="btn-primary-custom px-4 bg-green-600 hover:bg-green-700">
                            <Plus size={20} />
                        </button>
                    </form>

                    <div className="space-y-3">
                        {savings.map(item => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <p className="font-medium text-slate-700">{item.description || 'Savings'}</p>
                                    <p className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-green-600">+₱{item.amount.toLocaleString()}</span>
                                    <button onClick={() => handleDeleteSavings(item.id)} className="text-slate-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {savings.length === 0 && <p className="text-center text-slate-400 py-4">No savings added.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
