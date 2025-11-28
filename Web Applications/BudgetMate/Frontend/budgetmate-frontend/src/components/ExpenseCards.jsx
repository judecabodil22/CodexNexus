import React, { useState } from 'react';
import { DollarSign, TrendingUp, Activity, Target } from 'lucide-react';

export default function ExpenseCards({ expenses = [] }) {
    const [budget, setBudget] = useState(() => {
        const saved = localStorage.getItem('budget');
        return saved ? Number(saved) : 2000;
    });

    React.useEffect(() => {
        localStorage.setItem('budget', budget);
    }, [budget]);

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate top category
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, 'None');

    const budgetProgress = Math.min((totalExpenses / budget) * 100, 100);
    const isOverBudget = totalExpenses > budget;

    const Card = ({ title, value, subtext, icon: Icon, colorClass, delay, children }) => (
        <div className={`glass-card p-6 animate-fade-in ${delay} flex flex-col justify-between h-full`}>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
                    </div>
                    {title === 'Total Expenses' && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isOverBudget ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {isOverBudget ? 'Over Budget' : 'On Track'}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
                    <p className="text-2xl font-bold text-slate-800">{value}</p>
                    {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
                </div>
            </div>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
                title="Total Expenses"
                value={`$${totalExpenses.toFixed(2)}`}
                subtext={`of $${budget} monthly budget`}
                icon={DollarSign}
                colorClass="bg-blue-500"
                delay=""
            >
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${budgetProgress}%` }}
                    ></div>
                </div>
            </Card>

            <Card
                title="Top Category"
                value={topCategory}
                subtext="Most spending activity"
                icon={TrendingUp}
                colorClass="bg-purple-500"
                delay="delay-100"
            />

            <Card
                title="Transactions"
                value={expenses.length}
                subtext="Recorded entries"
                icon={Activity}
                colorClass="bg-orange-500"
                delay="delay-200"
            />

            <Card
                title="Budget Goal"
                value={`$${budget}`}
                subtext="Click to adjust limit"
                icon={Target}
                colorClass="bg-emerald-500"
                delay="delay-300"
            >
                <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
            </Card>
        </div>
    );
}