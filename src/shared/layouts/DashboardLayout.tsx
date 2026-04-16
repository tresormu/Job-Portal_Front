import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "../../contexts/AuthContext";
import { Bell, Search, User, Menu } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user, role } = useAuth();

    return (
        <div className="flex min-h-screen bg-[#f8fafc] overflow-hidden relative">
            {/* Ambient Background Elements */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen relative scroll-smooth">
                {/* Dashboard Header */}
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-6 flex-1">
                        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <div className="flex items-center gap-4 bg-slate-100/80 px-5 py-3 rounded-2xl border border-slate-200/50 w-full max-w-md group focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all duration-300">
                            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search candidates, jobs, or metrics..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Notifications */}
                        <button className="relative p-3 text-slate-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all bg-slate-100/50 rounded-2xl border border-slate-200/50">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                        </button>

                        {/* User Profile Summary */}
                        <div className="flex items-center gap-4 pl-8 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-extrabold text-slate-900 leading-tight mb-0.5">{user?.name || "Guest User"}</p>
                                <div className="flex justify-end">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                                        {role}
                                    </span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-primary/20 rotate-1 group hover:rotate-0 transition-transform cursor-pointer">
                                {user?.avatar ? (
                                    <img src={user.avatar} className="w-full h-full object-cover rounded-2xl" alt="Pro" />
                                ) : (
                                    <User className="w-6 h-6" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-10 relative z-10">
                    <div className="animate-fade-in">
                        {children}
                    </div>
                </main>

                {/* Global Dashboard Footer */}
                <footer className="px-10 py-6 border-t border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex justify-between items-center">
                    <span>© 2026 JobPortal Premium Dashboard</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Support</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
