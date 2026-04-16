import { useState, useMemo, useEffect } from "react";
import { getAllJobs } from "../Jobs/service/jobService";
import type { JobData } from "../Jobs/service/jobService";
import JobCard from "../../shared/components/ui/JobCard";
import { Sparkles, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

// Define filter types
type FilterType = "RECENT JOBS" | "FEATURED" | "FULL TIME" | "PART TIME";

export default function HomeJobs() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("RECENT JOBS");
    const [jobs, setJobs] = useState<JobData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Filter jobs based on active tab
    const filteredJobs = useMemo(() => {
        let filtered = [...jobs];

        switch (activeFilter) {
            case "FEATURED":
                filtered = filtered.filter((job) => job.featured);
                break;
            case "FULL TIME":
                filtered = filtered.filter((job) => (job.jobType || job.type) === "Full-time");
                break;
            case "PART TIME":
                filtered = filtered.filter((job) => (job.jobType || job.type) === "Part-time");
                break;
            case "RECENT JOBS":
            default:
                filtered = filtered.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                break;
        }

        return filtered.slice(0, 6);
    }, [activeFilter, jobs]);

    const tabs: FilterType[] = [
        "RECENT JOBS",
        "FEATURED",
        "FULL TIME",
        "PART TIME",
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Latest Opportunities</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 tracking-tight">
                            Explore <span className="text-brand-primary">Exciting</span> Jobs
                        </h2>
                        <p className="text-slate-500 mt-4 text-lg">
                            Handpicked opportunities from top-tier companies across Rwanda. 
                            Find the one that fits your ambition.
                        </p>
                    </div>

                    {/* Filter Tabs - Pill Style */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm self-start">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === tab
                                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                    : "text-slate-500 hover:text-brand-primary hover:bg-slate-50"
                                    }`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Job Grid or Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-48 bg-white rounded-3xl animate-pulse border border-slate-100"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job: any) => (
                                    <JobCard
                                        key={job._id || job.id}
                                        job={{
                                            ...job,
                                            id: job._id || job.id || "",
                                            salary: job.salary || "Negotiable",
                                            type: job.jobType || job.type || "Full-time",
                                            company: typeof job.employerId === 'object' ? (job.employerId as any).companyName : (job.company || "Unknown"),
                                            location: job.location || (typeof job.employerId === 'object' ? (job.employerId as any).location : "Remote"),
                                            logo: typeof job.employerId === 'object' ? (job.employerId as any).logo : "",
                                            logoBg: job.logoBg || "bg-slate-100",
                                            typeBg: job.typeBg || "bg-brand-primary/10 text-brand-primary",
                                            tags: job.tags || [],
                                            employerId: typeof job.employerId === 'object' ? (job.employerId as any)._id : (job.employerId || "")
                                        } as any}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <Briefcase className="w-8 h-8 text-brand-primary opacity-50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No jobs found</h3>
                                    <p className="text-slate-500 mt-2">Try switching filters or check back later.</p>
                                </div>
                            )}
                        </div>

                        {/* View All Button */}
                        <div className="mt-16 text-center">
                            <Link 
                                to="/jobs" 
                                className="inline-flex items-center gap-2 group px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                            >
                                Browse All Jobs
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section >
    );
}
