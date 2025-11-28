import React, { useMemo } from 'react';
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar, PieChart } from 'lucide-react';

export default function Reports({ expenses = [] }) {
    // Calculate metrics
    const metrics = useMemo(() => {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const count = expenses.length;
        const average = count > 0 ? total / count : 0;

        // Find max transaction
        const maxTransaction = expenses.reduce((max, curr) =>
            curr.amount > (max?.amount || 0) ? curr : max
            , null);

        // Category breakdown
        const byCategory = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

        const categoryData = Object.entries(byCategory)
            .map(([name, amount]) => ({
                name,
                amount,
                percentage: total > 0 ? (amount / total) * 100 : 0
            }))
            .sort((a, b) => b.amount - a.amount);

        return { total, count, average, maxTransaction, categoryData };
    }, [expenses]);

    const downloadCSV = () => {
        const headers = ['Date', 'Description', 'Category', 'Amount'];
        const csvContent = [
            headers.join(','),
            ...expenses.map(e => [
                new Date(e.date).toLocaleDateString(),
                `"${e.description}"`, // Quote description to handle commas
                e.category,
                e.amount
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `budgetmate_report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Financial Reports</h2>
                    <p className="text-slate-500">Detailed analysis of your spending habits</p>
                </div>
                <button
                    onClick={downloadCSV}
                    className="btn-primary-custom flex items-center gap-2"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Total Spending</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">
                                ${metrics.total.toFixed(2)}
                            </h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 border-l-4 border-purple-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Avg. Transaction</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">
                                ${metrics.average.toFixed(2)}
                            </h3>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 border-l-4 border-orange-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Largest Expense</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">
                                ${metrics.maxTransaction?.amount.toFixed(2) || '0.00'}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 truncate max-w-[150px]">
                                {metrics.maxTransaction?.description || '-'}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Table */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <PieChart size={20} className="text-blue-500" />
                        Category Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                    <th className="pb-3 pl-2">Category</th>
                                    <th className="pb-3 text-right">Amount</th>
                                    <th className="pb-3 text-right pr-2">% of Total</th>
                                    <th className="pb-3 text-center">Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {metrics.categoryData.map((cat, index) => (
                                    <tr key={cat.name} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 pl-2 font-medium text-slate-700">{cat.name}</td>
                                        <td className="py-4 text-right text-slate-600">${cat.amount.toFixed(2)}</td>
                                        <td className="py-4 text-right text-slate-500 pr-2">{cat.percentage.toFixed(1)}%</td>
                                        <td className="py-4 px-4">
                                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                <div
                                                    className={`h-1.5 rounded-full ${index === 0 ? 'bg-red-400' :
                                                            index === 1 ? 'bg-orange-400' : 'bg-blue-400'
                                                        }`}
                                                    style={{ width: `${cat.percentage}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {metrics.categoryData.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-slate-400">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Insights Panel */}
                <div className="glass-card p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calendar size={20} />
                        Monthly Insights
                    </h3>
                    <div className="space-y-6">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-blue-100 text-sm mb-1">Top Spending Category</p>
                            <p className="text-xl font-bold">
                                {metrics.categoryData[0]?.name || 'None'}
                            </p>
                            <p className="text-xs text-blue-200 mt-1">
                                Accounts for {metrics.categoryData[0]?.percentage.toFixed(0) || 0}% of your total expenses
                            </p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-blue-100 text-sm mb-1">Transaction Volume</p>
                            <p className="text-xl font-bold">{metrics.count}</p>
                            <p className="text-xs text-blue-200 mt-1">
                                Total transactions recorded in this period
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/20">
                            <p className="text-sm text-blue-100 italic">
                                "Tracking your spending is the first step to financial freedom."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
