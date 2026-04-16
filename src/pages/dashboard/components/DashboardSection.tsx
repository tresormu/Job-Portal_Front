import React from "react";

interface DashboardSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode;
}

export default function DashboardSection({ title, children, className = "", headerAction }: DashboardSectionProps) {
    return (
        <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden ${className}`}>
            {/* Subtle header glow */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-primary/10"></div>
            
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">{title}</h2>
                {headerAction}
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
