import React from 'react';
import { Wallet, PieChart, TrendingUp, Settings } from 'lucide-react';

export default function NavigationBar() {
  return (
    <nav className="sticky top-4 z-50 mx-4">
      <div className="glass-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              BudgetMate
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">SMART TRACKING</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
          <button className="px-4 py-2 bg-white text-blue-600 shadow-sm rounded-lg text-sm font-semibold transition-all">
            Dashboard
          </button>
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white/50 rounded-lg text-sm font-medium transition-all">
            Reports
          </button>
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white/50 rounded-lg text-sm font-medium transition-all">
            Settings
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <span className="font-bold text-slate-700">JD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}