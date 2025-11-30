import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Target, TrendingUp, Award, Gift, Plane, Smartphone, Home, Car, Monitor, Coffee } from 'lucide-react';

const GOAL_ICONS = {
    'General': Target,
    'Vacation': Plane,
    'Gadgets': Smartphone,
    'Housing': Home,
    'Vehicle': Car,
    'Emergency': TrendingUp,
    'Gifts': Gift,
    'Electronics': Monitor,
    'Lifestyle': Coffee
};

export default function SavingsGoals({ showToast }) {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('savingsGoals');
        return saved ? JSON.parse(saved) : [];
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        currentAmount: '',
        category: 'General',
        deadline: ''
    });

    useEffect(() => {
        localStorage.setItem('savingsGoals', JSON.stringify(goals));
    }, [goals]);

    const handleAdd = (e) => {
        e.preventDefault();
        const newGoal = {
            id: Date.now(),
            ...formData,
            targetAmount: parseFloat(formData.targetAmount),
            currentAmount: parseFloat(formData.currentAmount || 0)
        };
        setGoals([...goals, newGoal]);
        setFormData({ name: '', targetAmount: '', currentAmount: '', category: 'General', deadline: '' });
        setIsFormOpen(false);
        showToast('New savings goal created!');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this savings goal?')) {
            setGoals(goals.filter(g => g.id !== id));
            showToast('Goal deleted.');
        }
    };

    const handleUpdateProgress = (id, amount) => {
        const updatedGoals = goals.map(g => {
            if (g.id === id) {
                const newAmount = Math.min(g.currentAmount + amount, g.targetAmount);
                if (newAmount >= g.targetAmount && g.currentAmount < g.targetAmount) {
                    showToast(`🎉 Goal "${g.name}" Reached!`, 'success');
                }
                return { ...g, currentAmount: newAmount };
            }
            return g;
        });
        setGoals(updatedGoals);
    };

    return (
        <div className="animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Savings Goals</h2>
                    <p className="text-slate-300 font-medium">Visualize and reach your targets</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="btn-primary-custom flex items-center gap-2"
                >
                    <Plus size={20} />
                    New Goal
                </button>
            </div>

            {/* Add Form */}
            <div className={`transition-all duration-300 overflow-hidden ${isFormOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                <div className="glass-card p-6 border-l-4 border-pink-500">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Create New Goal</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div className="lg:col-span-1">
                            <label className="block text-xs font-bold text-slate-500 mb-1">Goal Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="input-field"
                                placeholder="e.g. New Laptop"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="input-field"
                            >
                                {Object.keys(GOAL_ICONS).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Target Amount</label>
                            <input
                                type="number"
                                value={formData.targetAmount}
                                onChange={e => setFormData({ ...formData, targetAmount: e.target.value })}
                                className="input-field"
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Initial Savings (Optional)</label>
                            <input
                                type="number"
                                value={formData.currentAmount}
                                onChange={e => setFormData({ ...formData, currentAmount: e.target.value })}
                                className="input-field"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div className="lg:col-span-4 flex justify-end mt-2">
                            <button type="submit" className="btn-primary-custom flex items-center gap-2">
                                <Target size={18} />
                                Create Goal
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => {
                    const Icon = GOAL_ICONS[goal.category] || Target;
                    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                    const isCompleted = progress >= 100;

                    return (
                        <div key={goal.id} className="glass-card p-6 relative group overflow-hidden">
                            {/* Background Progress Bar */}
                            <div
                                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>

                            <button
                                onClick={() => handleDelete(goal.id)}
                                className="absolute top-4 right-4 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${isCompleted ? 'bg-yellow-100 text-yellow-600' : 'bg-pink-100 text-pink-600'}`}>
                                        {isCompleted ? <Award size={24} /> : <Icon size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{goal.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{goal.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Target</p>
                                    <p className="font-bold text-slate-700">₱{goal.targetAmount.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Circular Progress or Main Visual */}
                            <div className="flex items-center justify-center py-4 mb-4">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            className="text-slate-100"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={351.86}
                                            strokeDashoffset={351.86 - (351.86 * progress) / 100}
                                            className={`${isCompleted ? 'text-yellow-400' : 'text-pink-500'} transition-all duration-1000 ease-out`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-2xl font-bold text-slate-700">{Math.round(progress)}%</span>
                                        <span className="text-xs text-slate-400">Saved</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4 text-sm">
                                <span className="text-slate-500 font-medium">Current: <span className="text-slate-800 font-bold">₱{goal.currentAmount.toLocaleString()}</span></span>
                                <span className="text-slate-400 text-xs">
                                    ₱{(goal.targetAmount - goal.currentAmount).toLocaleString()} to go
                                </span>
                            </div>

                            {/* Quick Add Buttons */}
                            {!isCompleted && (
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleUpdateProgress(goal.id, 10)}
                                        className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        +₱10
                                    </button>
                                    <button
                                        onClick={() => handleUpdateProgress(goal.id, 50)}
                                        className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        +₱50
                                    </button>
                                    <button
                                        onClick={() => {
                                            const amount = prompt('Enter amount to add:');
                                            if (amount && !isNaN(amount)) handleUpdateProgress(goal.id, parseFloat(amount));
                                        }}
                                        className="py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        Custom
                                    </button>
                                </div>
                            )}

                            {isCompleted && (
                                <div className="w-full py-2 bg-yellow-50 text-yellow-600 rounded-lg text-center font-bold text-sm border border-yellow-100">
                                    Goal Completed! 🏆
                                </div>
                            )}
                        </div>
                    );
                })}

                {goals.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400 glass-card border-dashed border-2 border-slate-200">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target size={24} className="text-slate-300" />
                        </div>
                        <p className="font-medium">No savings goals yet</p>
                        <p className="text-sm mt-1">Create a goal to start saving for your dreams</p>
                    </div>
                )}
            </div>
        </div>
    );
}
