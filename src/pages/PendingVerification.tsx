import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Clock, Info, LogOut, Mail, ArrowLeft } from "lucide-react";

export default function PendingVerification() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full -z-10"></div>

            <div className="max-w-2xl w-full animate-fade-in-up">
                {/* Main Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 overflow-hidden relative">
                    {/* Top Decorative Ripple */}
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-primary/20"></div>

                    {/* Icon */}
                    <div className="flex justify-center mb-10">
                        <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 shadow-lg shadow-amber-200/20 border border-amber-100 rotate-3 transition-transform hover:rotate-0 duration-500">
                             <Clock className="w-12 h-12" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-heading tracking-tight">
                            Account Pending Verification
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">
                            Thank you for joining us, <span className="font-bold text-brand-primary">{user?.name || user?.companyName}</span>!
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 mb-10">
                        <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-3 font-heading uppercase tracking-widest text-xs">
                            <Info className="w-5 h-5 text-brand-primary" />
                            What to expect?
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Your account is currently under review by our specialist team.",
                                "You will receive an email notification as soon as your profile is verified.",
                                "Verification typically takes between 24 and 48 business hours."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary group-hover:scale-150 transition-transform"></div>
                                    <span className="text-slate-600 font-medium text-sm leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Status Note */}
                    <div className="flex items-center justify-center gap-2 mb-10 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Profile Status: Under Review</span>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 py-5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                        <a 
                            href="mailto:tresormugisha07@gmail.com"
                            className="flex items-center justify-center gap-2 py-5 px-6 bg-brand-primary text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Support
                        </a>
                    </div>
                    
                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                        <button 
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-primary font-bold text-xs transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
