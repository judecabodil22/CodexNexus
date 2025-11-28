import React, { useState } from 'react';
import { Wallet, LogOut, LayoutDashboard, PieChart, Calendar, CreditCard, Target, Settings, Menu, X } from 'lucide-react';

export default function NavigationBar({ onLogout, activeView, onViewChange, username = 'User' }) {
  const initials = username.substring(0, 2).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: PieChart },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'subscriptions', label: 'Subs', icon: CreditCard },
    { id: 'savings', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-4 mb-8">
      <div className="glass-card px-4 py-3 md:px-6 md:py-4 flex items-center justify-between relative">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              BudgetMate
            </h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Smart Tracker</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-white/50 backdrop-blur-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 group
                  ${isActive
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                  }
                `}
              >
                <Icon size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* User & Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200/60">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-700">Hello, {username}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-md cursor-pointer hover:shadow-lg transition-shadow">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <span className="font-bold text-slate-700 text-sm">{initials}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="hidden md:flex p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all duration-300 hover:shadow-sm border border-transparent hover:border-red-100"
            title="Logout"
          >
            <LogOut size={20} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 mx-4 p-4 glass-card flex flex-col gap-2 lg:hidden animate-fade-in z-50 border border-white/40 shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
            <div className="h-px bg-slate-100 my-2"></div>
            <button
              onClick={onLogout}
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}