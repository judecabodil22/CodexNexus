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
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Charts() {
    const doughnutData = useMemo(() => ({
        labels: ['Food', 'Housing', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'],
        datasets: [{
            data: [350, 1200, 150, 80, 100, 200, 50, 70],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(199, 199, 199, 0.8)',
                'rgba(83, 102, 255, 0.8)'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    }), []);

    const lineData = useMemo(() => ({
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Total Expenses',
                data: [1500, 1800, 1600, 2000, 1750, 1900],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Total Income',
                data: [3000, 3200, 3100, 3500, 3000, 3200],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    }), []);

    const doughnutOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'right' },
            title: { display: false }
        }
    }), []);

    const lineOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: false }
        },
        scales: { y: { beginAtZero: true } }
    }), []);

    return (
        <div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header">Spending by Category (This Month)</div>
                        <div className="card-body">
                            <div className="chart-container" style={{ height: 300 }}>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header">Spending Trend (Last 6 Months)</div>
                        <div className="card-body">
                            <div className="chart-container" style={{ height: 300 }}>
                                <Line data={lineData} options={lineOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
