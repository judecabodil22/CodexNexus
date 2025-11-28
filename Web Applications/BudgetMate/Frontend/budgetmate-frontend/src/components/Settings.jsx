import React from 'react';
import { Save, Trash2, User, Shield, Bell } from 'lucide-react';

export default function Settings({ budget, setBudget, username, onLogout }) {
    const handleBudgetChange = (e) => {
        const newBudget = Number(e.target.value);
        setBudget(newBudget);
        localStorage.setItem('budget', newBudget);
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings</h2>
            <p className="text-slate-500 mb-8">Manage your preferences and account</p>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Account Profile</h3>
                            <p className="text-sm text-slate-500">Your personal information</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={username || 'User'}
                                disabled
                                className="input-field bg-slate-100 text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                            <input
                                type="text"
                                value="Administrator"
                                disabled
                                className="input-field bg-slate-100 text-slate-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Preferences</h3>
                            <p className="text-sm text-slate-500">Customize your experience</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Monthly Budget Goal: <span className="font-bold text-blue-600">${budget}</span>
                            </label>
                            <input
                                type="range"
                                min="500"
                                max="10000"
                                step="100"
                                value={budget}
                                onChange={handleBudgetChange}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-2">
                                <span>$500</span>
                                <span>$10,000</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-slate-100">
                            <div>
                                <h4 className="font-medium text-slate-800">Email Notifications</h4>
                                <p className="text-sm text-slate-500">Receive weekly summary reports</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="glass-card p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Danger Zone</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-800">Sign Out</p>
                            <p className="text-sm text-slate-500">Securely log out of your account</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <LogOutIcon />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const LogOutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);
