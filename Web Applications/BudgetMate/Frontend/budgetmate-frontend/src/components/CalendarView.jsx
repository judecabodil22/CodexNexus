import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, PhilippinePeso, X } from 'lucide-react';

export default function CalendarView({ expenses }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const onDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    // Aggregate expenses by date
    const expensesByDate = useMemo(() => {
        const map = {};
        expenses.forEach(expense => {
            const dateStr = new Date(expense.date).toDateString();
            if (!map[dateStr]) {
                map[dateStr] = { total: 0, items: [] };
            }
            map[dateStr].total += expense.amount;
            map[dateStr].items.push(expense);
        });
        return map;
    }, [expenses]);

    const renderCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-slate-50/30 border border-slate-100/50 rounded-xl"></div>);
        }

        // Days of the current month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateStr = date.toDateString();
            const dayData = expensesByDate[dateStr];
            const isSelected = selectedDate.toDateString() === dateStr;
            const isToday = new Date().toDateString() === dateStr;

            days.push(
                <div
                    key={day}
                    onClick={() => onDateClick(day)}
                    className={`h-24 md:h-32 p-2 border rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden group
                        ${isSelected
                            ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50/50'
                            : 'border-slate-100 bg-white/40 hover:bg-white/80 hover:shadow-md hover:-translate-y-1'
                        }
                        ${isToday ? 'bg-indigo-50/50' : ''}
                    `}
                >
                    <div className="flex justify-between items-start">
                        <span className={`
                            w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold
                            ${isSelected ? 'bg-blue-500 text-white' : isToday ? 'bg-indigo-500 text-white' : 'text-slate-600 group-hover:bg-slate-200'}
                        `}>
                            {day}
                        </span>
                        {dayData && (
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md">
                                -₱{Math.round(dayData.total)}
                            </span>
                        )}
                    </div>

                    {/* Visual Indicators for expenses */}
                    <div className="mt-2 space-y-1">
                        {dayData?.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                {item.category}
                            </div>
                        ))}
                        {dayData?.items.length > 3 && (
                            <div className="text-[10px] text-slate-400 pl-2.5">
                                +{dayData.items.length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return days;
    };

    const selectedDayData = expensesByDate[selectedDate.toDateString()];

    return (
        <div className="animate-fade-in space-y-6 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Calendar View</h2>
                    <p className="text-slate-300 font-medium">Visualize your spending over time</p>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center gap-4 bg-white/50 p-1.5 rounded-xl border border-white/20 shadow-sm backdrop-blur-sm">
                    <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-bold text-slate-700 min-w-[140px] text-center">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {renderCalendarDays()}
                    </div>
                </div>

                {/* Selected Date Details */}
                <div className="glass-card p-6 h-fit">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">
                                {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>
                            <p className="text-sm text-slate-500">Daily Summary</p>
                        </div>
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <CalendarIcon size={24} />
                        </div>
                    </div>

                    {selectedDayData ? (
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-xl text-white shadow-lg shadow-red-500/20">
                                <p className="text-red-100 text-sm font-medium mb-1">Total Spent</p>
                                <p className="text-3xl font-bold">₱{selectedDayData.total.toFixed(2)}</p>
                            </div>

                            <div className="space-y-3 mt-4">
                                <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Transactions</h4>
                                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {selectedDayData.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-white transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                <div>
                                                    <p className="font-medium text-slate-700 text-sm">{item.description}</p>
                                                    <p className="text-xs text-slate-400">{item.category}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-700">-₱{item.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-400">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PhilippinePeso size={24} className="text-slate-300" />
                            </div>
                            <p>No transactions recorded for this date.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
