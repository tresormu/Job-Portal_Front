import React from "react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export default function StatCard({ label, value, icon, color }: StatCardProps) {
    // Extract bg color if it's a tailwind class like bg-blue-600
    const bgColorClass = color || "bg-brand-primary";

    return (
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-6 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 group relative overflow-hidden">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${bgColorClass} opacity-[0.03] blur-3xl rounded-full -mr-10 -mt-10 group-hover:opacity-[0.08] transition-opacity`}></div>
            
            <div className={`${bgColorClass} text-white p-4 rounded-2xl shadow-lg shadow-current/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 scale-100`}>
                {icon}
            </div>
            
            <div className="relative z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight font-heading group-hover:text-brand-primary transition-colors">{value}</h3>
            </div>
        </div>
    );
}
