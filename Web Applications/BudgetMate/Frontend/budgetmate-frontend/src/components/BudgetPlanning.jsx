import React, { useState, useEffect } from 'react';
import { Save, PhilippinePeso, PieChart, TrendingUp, Wallet } from 'lucide-react';
import API_BASE_URL from '../config';

export default function BudgetPlanning({ token, showToast }) {
    const [salary, setSalary] = useState('');
    const [payCycle, setPayCycle] = useState('Monthly');
    const [savingsRule, setSavingsRule] = useState('50/30/20');
    const [loading, setLoading] = useState(true);

    const rules = [
        { id: '50/30/20', label: '50/30/20 (Needs/Wants/Savings)' },
        { id: '70/20/10', label: '70/20/10 (Needs/Savings/Wants)' },
        { id: '60/20/20', label: '60/20/20 (Needs/Wants/Savings)' },
        { id: '80/20', label: '80/20 (Needs/Savings)' },
        { id: '50/50', label: '50/50 (Needs/Savings)' }
    ];

    const cycles = ['Weekly', 'Bi-Weekly', 'Monthly'];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSalary(data.salary === 0 ? '' : data.salary);
                setPayCycle(data.payCycle);
                setSavingsRule(data.savingsRule);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            showToast('Failed to load budget settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ salary: Number(salary), payCycle, savingsRule })
            });

            if (response.ok) {
                showToast('Budget settings saved successfully!');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            showToast('Failed to save settings', 'error');
        }
    };

    const calculateBreakdown = () => {
        const numSalary = Number(salary);
        if (!numSalary) return [];

        let breakdown = [];
        if (savingsRule === '50/30/20') {
            breakdown = [
                { label: 'Needs', percent: 50, color: 'bg-blue-500' },
                { label: 'Wants', percent: 30, color: 'bg-purple-500' },
                { label: 'Savings', percent: 20, color: 'bg-green-500' }
            ];
        } else if (savingsRule === '70/20/10') {
            breakdown = [
                { label: 'Needs', percent: 70, color: 'bg-blue-500' },
                { label: 'Savings', percent: 20, color: 'bg-green-500' },
                { label: 'Wants', percent: 10, color: 'bg-purple-500' }
            ];
        } else if (savingsRule === '60/20/20') {
            breakdown = [
                { label: 'Needs', percent: 60, color: 'bg-blue-500' },
                { label: 'Wants', percent: 20, color: 'bg-purple-500' },
                { label: 'Savings', percent: 20, color: 'bg-green-500' }
            ];
        } else if (savingsRule === '80/20') {
            breakdown = [
                { label: 'Needs', percent: 80, color: 'bg-blue-500' },
                { label: 'Savings', percent: 20, color: 'bg-green-500' }
            ];
        } else if (savingsRule === '50/50') {
            breakdown = [
                { label: 'Needs', percent: 50, color: 'bg-blue-500' },
                { label: 'Savings', percent: 50, color: 'bg-green-500' }
            ];
        }

        return breakdown.map(item => ({
            ...item,
            amount: (numSalary * item.percent) / 100
        }));
    };

    const breakdown = calculateBreakdown();

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-6">
            <div className="glass-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <Wallet className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Budget Planning</h2>
                        <p className="text-slate-500">Configure your salary and savings goals</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Salary (₱)</label>
                            <div className="relative">
                                <PhilippinePeso className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Pay Cycle</label>
                            <div className="grid grid-cols-3 gap-2">
                                {cycles.map(cycle => (
                                    <button
                                        key={cycle}
                                        onClick={() => setPayCycle(cycle)}
                                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${payCycle === cycle
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {cycle}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Savings Rule</label>
                            <div className="space-y-2">
                                {rules.map(rule => (
                                    <button
                                        key={rule.id}
                                        onClick={() => setSavingsRule(rule.id)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${savingsRule === rule.id
                                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="font-medium text-slate-700">{rule.label}</span>
                                        {savingsRule === rule.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            Save Configuration
                        </button>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-indigo-500" />
                            Projected Breakdown
                        </h3>

                        {Number(salary) > 0 ? (
                            <div className="space-y-4">
                                {breakdown.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-slate-600">{item.label}</span>
                                            <span className="font-bold text-slate-800">₱{item.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full ${item.color}`}
                                                style={{ width: `${item.percent}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2 text-right">{item.percent}% of income</p>
                                    </div>
                                ))}

                                <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-indigo-600 font-medium">Monthly Potential</p>
                                            <p className="text-xs text-indigo-400">Based on {payCycle} pay cycle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <PhilippinePeso className="w-12 h-12 mb-2 opacity-20" />
                                <p>Enter your salary to see the breakdown</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
