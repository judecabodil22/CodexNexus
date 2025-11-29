import React, { useState } from 'react';
import API_BASE_URL from '../config';
import { Lock, User, ArrowRight } from 'lucide-react';

export default function Login({ onLogin, onSwitchToRegister }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const token = await response.text();
                onLogin(token);
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Welcome Back</h1>
                    <p className="text-slate-500">Sign in to manage your budget</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            className="input-field pl-10"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field pl-10"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary-custom w-full flex items-center justify-center gap-2 group">
                        Sign In
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-blue-600 font-semibold hover:underline">
                        Create one
                    </button>
                </div>
            </div>
        </div>
    );
}
