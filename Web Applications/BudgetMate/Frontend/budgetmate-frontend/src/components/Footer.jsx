import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-12 pb-8 text-center text-slate-500 text-sm animate-fade-in delay-300">
            <div className="flex items-center justify-center gap-2 mb-2">
                <span>Black-Mesa Development</span>
                <span className="text-slate-300">|</span>
                <span>v1.2</span>
            </div>
            <p>&copy; {new Date().getFullYear()} BudgetMate. All rights reserved.</p>
        </footer>
    );
}
