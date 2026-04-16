import { ChevronRight, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    breadcrumb: string;
    backgroundImage?: string;
}

export default function PageHeader({
    title,
    breadcrumb,
    backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
}: PageHeaderProps) {
    return (
        <section className="relative bg-brand-dark pb-32 pt-48 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/80 to-brand-primary/20 z-10"></div>
            <div
                className="absolute inset-0 bg-cover bg-center z-0 scale-110 blur-[2px]"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            ></div>
            
            {/* Decorative blurs */}
            <div className="absolute top-1/2 -left-20 w-80 h-80 bg-brand-primary/20 blur-[100px] rounded-full z-10 animate-pulse-slow"></div>
            <div className="absolute top-1/2 -right-20 w-64 h-64 bg-brand-secondary/10 blur-[80px] rounded-full z-10 animate-pulse-slow delay-500"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 text-brand-accent/60 text-xs font-bold uppercase tracking-[0.3em] mb-6 animate-fade-in-up">
                        <HomeIcon className="w-4 h-4" />
                        <Link to="/" className="hover:text-brand-primary cursor-pointer transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 opacity-30" />
                        <span className="text-brand-primary">{breadcrumb}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2 animate-fade-in-up delay-100 font-heading tracking-tight">
                        {title}
                    </h1>
                    <div className="w-24 h-1.5 bg-brand-primary rounded-full animate-fade-in-up delay-200 shadow-[0_0_15px_rgba(0,180,216,0.5)]"></div>
                </div>
            </div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
        </section>
    );
}
