import React from "react";
import { ChevronRight } from "lucide-react";

export interface ActivityItem {
    id: string | number;
    title: string;
    subtitle: string;
    meta?: string;
    icon?: React.ReactNode;
    badge?: {
        text: string;
        variant: "blue" | "green" | "yellow" | "red" | "gray";
    };
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface RecentActivityListProps {
    items: ActivityItem[];
    emptyMessage?: string;
}

export default function RecentActivityList({ items, emptyMessage = "No recent activity" }: RecentActivityListProps) {
    const badgeColors = {
        blue: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
        green: "text-emerald-600 bg-emerald-50 border-emerald-100",
        yellow: "text-amber-600 bg-amber-50 border-amber-100",
        red: "text-rose-600 bg-rose-50 border-rose-100",
        gray: "text-slate-500 bg-slate-50 border-slate-100",
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400 font-medium italic text-sm">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl group hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50">
                    <div className="flex items-center gap-5">
                        {item.icon && (
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md text-slate-400 group-hover:text-brand-primary group-hover:scale-110 transition-all border border-slate-100">
                                {item.icon}
                            </div>
                        )}
                        <div>
                            <p className="font-extrabold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">{item.title}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                {item.subtitle}
                                {item.meta && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="normal-case tracking-normal text-slate-500 font-medium">{item.meta}</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        {item.badge && (
                            <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border leading-none ${badgeColors[item.badge.variant]}`}>
                                {item.badge.text}
                            </span>
                        )}
                        {item.action ? (
                            <button
                                onClick={item.action.onClick}
                                className="inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all rounded-xl group/btn"
                            >
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-all" />
                            </button>
                        ) : (
                             <div className="hidden sm:block group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100">
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                             </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
