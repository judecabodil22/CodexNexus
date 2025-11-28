import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, AlertCircle, Calendar, DollarSign, Zap, Music, Tv, Wifi, Home, Smartphone, CreditCard, RefreshCw } from 'lucide-react';

const PRESET_SUBS = [
    { name: 'Netflix', icon: Tv, category: 'Entertainment', defaultAmount: 15.99 },
    { name: 'Spotify', icon: Music, category: 'Entertainment', defaultAmount: 9.99 },
    { name: 'Internet', icon: Wifi, category: 'Utilities', defaultAmount: 60.00 },
    { name: 'Rent', icon: Home, category: 'Housing', defaultAmount: 1200.00 },
    { name: 'Phone', icon: Smartphone, category: 'Utilities', defaultAmount: 45.00 },
    { name: 'Electricity', icon: Zap, category: 'Utilities', defaultAmount: 100.00 },
];

export default function Subscriptions({ onRefresh, token, showToast }) {
    const [subscriptions, setSubscriptions] = useState(() => {
        const saved = localStorage.getItem('subscriptions');
        return saved ? JSON.parse(saved) : [];
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Entertainment',
        dueDay: 1
    });

    useEffect(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);

    const handleAdd = (e) => {
        e.preventDefault();
        const newSub = {
            id: Date.now(),
            ...formData,
            amount: parseFloat(formData.amount),
            lastPaid: null
        };
        setSubscriptions([...subscriptions, newSub]);
        setFormData({ name: '', amount: '', category: 'Entertainment', dueDay: 1 });
        setIsFormOpen(false);
        showToast('Subscription added successfully!');
    };

    const handleDelete = (id) => {
        if (window.confirm('Remove this subscription?')) {
            setSubscriptions(subscriptions.filter(s => s.id !== id));
            showToast('Subscription removed.');
        }
    };

    const handlePay = async (sub) => {
        const expense = {
            description: `${sub.name} (Subscription)`,
            amount: sub.amount,
            category: sub.category,
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('/api/Expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(expense)
            });

            if (response.ok) {
                const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
                const updatedSubs = subscriptions.map(s =>
                    s.id === sub.id ? { ...s, lastPaid: currentMonth } : s
                );
                setSubscriptions(updatedSubs);
                onRefresh();
                showToast(`Paid ${sub.name} for this month!`);
            } else {
                showToast('Failed to process payment.', 'error');
            }
        } catch (error) {
            console.error('Error paying subscription:', error);
            showToast('An error occurred.', 'error');
        }
    };

    const getStatus = (sub) => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        if (sub.lastPaid === currentMonth) return 'paid';

        const today = new Date().getDate();
        if (today > sub.dueDay) return 'overdue';
        if (today === sub.dueDay) return 'due-today';
        return 'upcoming';
    };

    const getIcon = (name) => {
        const preset = PRESET_SUBS.find(p => name.toLowerCase().includes(p.name.toLowerCase()));
        return preset ? preset.icon : CreditCard;
    };

    const totalMonthly = subscriptions.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Subscriptions</h2>
                    <p className="text-slate-300 font-medium">Manage recurring expenses</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                        <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Monthly Total</span>
                        <p className="text-xl font-bold text-white">${totalMonthly.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="btn-primary-custom flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Subscription
                    </button>
                </div>
            </div>

            {/* Add Form */}
            <div className={`transition-all duration-300 overflow-hidden ${isFormOpen ? 'max-h-[400px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                <div className="glass-card p-6 border-l-4 border-purple-500">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">New Subscription</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="lg:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="input-field"
                                placeholder="e.g. Netflix"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Amount</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                className="input-field"
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Due Day</label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                value={formData.dueDay}
                                onChange={e => setFormData({ ...formData, dueDay: parseInt(e.target.value) })}
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary-custom h-[46px] flex items-center justify-center">
                            Save
                        </button>
                    </form>

                    {/* Quick Presets */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {PRESET_SUBS.map(preset => (
                            <button
                                key={preset.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, name: preset.name, amount: preset.defaultAmount, category: preset.category })}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-600 transition-colors whitespace-nowrap flex items-center gap-1"
                            >
                                <preset.icon size={12} />
                                {preset.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subscriptions.map(sub => {
                    const status = getStatus(sub);
                    const Icon = getIcon(sub.name);

                    return (
                        <div key={sub.id} className="glass-card p-6 relative group">
                            <button
                                onClick={() => handleDelete(sub.id)}
                                className="absolute top-4 right-4 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 rounded-2xl ${status === 'paid' ? 'bg-emerald-100 text-emerald-600' :
                                        status === 'overdue' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                    }`}>
                                    <Icon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{sub.name}</h3>
                                    <p className="text-slate-500 text-sm">{sub.category}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Amount</p>
                                    <p className="text-2xl font-bold text-slate-800">${sub.amount.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Due Date</p>
                                    <p className="text-sm font-medium text-slate-600 flex items-center gap-1 justify-end">
                                        <Calendar size={14} />
                                        Day {sub.dueDay}
                                    </p>
                                </div>
                            </div>

                            {status === 'paid' ? (
                                <div className="w-full py-3 bg-emerald-50 text-emerald-600 rounded-xl font-semibold flex items-center justify-center gap-2 border border-emerald-100">
                                    <Check size={20} />
                                    Paid this month
                                </div>
                            ) : (
                                <button
                                    onClick={() => handlePay(sub)}
                                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg ${status === 'overdue'
                                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
                                            : 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-500/30'
                                        }`}
                                >
                                    <RefreshCw size={18} />
                                    Pay Now
                                </button>
                            )}

                            {status === 'overdue' && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                            )}
                        </div>
                    );
                })}

                {subscriptions.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400 glass-card border-dashed border-2 border-slate-200">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <RefreshCw size={24} className="text-slate-300" />
                        </div>
                        <p className="font-medium">No subscriptions yet</p>
                        <p className="text-sm mt-1">Add your recurring expenses to track them here</p>
                    </div>
                )}
            </div>
        </div>
    );
}
