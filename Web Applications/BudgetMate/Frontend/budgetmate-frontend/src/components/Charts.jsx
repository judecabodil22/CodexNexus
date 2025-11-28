import React, { useMemo } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Charts({ expenses = [] }) {
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

    const lineData = useMemo(() => {
        const monthly = {};
        expenses.forEach(e => {
            const date = new Date(e.date);
            const monthYear = date.toLocaleString('default', { month: 'short' });
            monthly[monthYear] = (monthly[monthYear] || 0) + e.amount;
        });

        return {
            labels: Object.keys(monthly),
            datasets: [
                {
                    label: 'Expenses',
                    data: Object.values(monthly),
                    borderColor: '#6366f1', // Indigo 500
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        };
    }, [expenses]);

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

    const lineOptions = {
        ...commonOptions,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f1f5f9',
                    drawBorder: false
                },
                ticks: {
                    font: { size: 11 },
                    color: '#64748b'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: { size: 11 },
                    color: '#64748b'
                }
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
                <h3 className="text-lg font-bold text-slate-800 mb-6">Monthly Trend</h3>
                <div className="h-[300px]">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
}
