import React, { useMemo } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Charts({ expenses = [], income = [], savings = [], budgetBreakdown }) {
    const doughnutData = useMemo(() => {
        const categories = {};
        expenses.forEach(e => {
            categories[e.category] = (categories[e.category] || 0) + e.amount;
        });

        return {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',   // Blue
                    'rgba(168, 85, 247, 0.8)',   // Purple
                    'rgba(236, 72, 153, 0.8)',   // Pink
                    'rgba(249, 115, 22, 0.8)',   // Orange
                    'rgba(34, 197, 94, 0.8)',    // Green
                    'rgba(234, 179, 8, 0.8)',    // Yellow
                    'rgba(99, 102, 241, 0.8)',   // Indigo
                    'rgba(100, 116, 139, 0.8)'   // Slate
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 4
            }]
        };
    }, [expenses]);

    const budgetVsActualData = useMemo(() => {
        if (!budgetBreakdown) return null;

        const needsSpent = expenses
            .filter(e => ['Housing', 'Utilities', 'Food', 'Transport', 'Health'].includes(e.category))
            .reduce((acc, curr) => acc + curr.amount, 0);

        const wantsSpent = expenses
            .filter(e => !['Housing', 'Utilities', 'Food', 'Transport', 'Health'].includes(e.category))
            .reduce((acc, curr) => acc + curr.amount, 0);

        return {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [
                {
                    label: 'Budgeted',
                    data: [budgetBreakdown.needs, budgetBreakdown.wants, budgetBreakdown.savings],
                    backgroundColor: 'rgba(99, 102, 241, 0.5)', // Indigo
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Actual Spent/Saved',
                    data: [
                        needsSpent,
                        wantsSpent,
                        savings.reduce((acc, curr) => acc + curr.amount, 0)
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.5)', // Green
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 1
                }
            ]
        };
    }, [expenses, budgetBreakdown, savings]);

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                titleFont: { size: 13, weight: 600 },
                bodyFont: { size: 12 },
                cornerRadius: 8,
                displayColors: false
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 animate-fade-in delay-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Spending by Category</h3>
                <div className="h-[300px] flex items-center justify-center">
                    <Doughnut data={doughnutData} options={commonOptions} />
                </div>
            </div>

            <div className="glass-card p-6 animate-fade-in delay-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Budget vs Actual</h3>
                <div className="h-[300px]">
                    {budgetVsActualData ? (
                        <Bar
                            data={budgetVsActualData}
                            options={{
                                ...commonOptions,
                                scales: {
                                    y: { beginAtZero: true }
                                }
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            No budget data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
