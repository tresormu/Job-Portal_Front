import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import { Briefcase, CheckCircle, ArrowRight, Star } from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardSection from "../components/DashboardSection";
import RecentActivityList from "../components/RecentActivityList";
import type { ActivityItem } from "../components/RecentActivityList";
import { useAuth } from "../../../contexts/AuthContext";
import { ApplicationService, type ApplicationModel } from "../../../services/application.Service";
import { getAllJobs, type JobData } from "../../Jobs/service/jobService";
import Loader from "../../../shared/components/ui/Loader";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<ApplicationModel[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobData[]>([]);
  const [dashboardStats, setDashboardStats] = useState({ appliedJobs: 0, shortlisted: 0 });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      
      setLoading(true);
      try {
        const [statsData, userApps, recommended] = await Promise.all([
          ApplicationService.getCandidateStats(),
          ApplicationService.getByUser(user._id),
          getAllJobs(3)
        ]);
        
        setApplications(userApps || []);
        setRecommendedJobs(recommended || []);
        
        if (statsData?.success) {
          const { appliedJobs, shortlisted } = statsData.data;
          setDashboardStats({ appliedJobs, shortlisted });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <Loader />;

  const shortlistedCount = applications.filter(app => app.status === "SHORTLISTED").length;

  const stats = [
    {
      label: "Applied Jobs",
      value: dashboardStats.appliedJobs || applications.length,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-brand-primary",
    },
    {
      label: "Shortlisted",
      value: dashboardStats.shortlisted || shortlistedCount,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
  ];

  const recentApps: ActivityItem[] = applications.slice(0, 3).map(app => ({
    id: (app._id || app.id) as string,
    title: (app as any).jobId?.title || "Job Application",
    subtitle: (app as any).jobId?.company || "Company",
    meta: app.submissionDate ? new Date(app.submissionDate).toLocaleDateString() : "Recently",
    icon: <div className="font-bold text-brand-primary">{(app as any).jobId?.company?.[0] || "J"}</div>,
    badge: { 
      text: app.status.charAt(0) + app.status.slice(1).toLowerCase(), 
      variant: app.status === "REJECTED" ? "red" : app.status === "SHORTLISTED" ? "green" : "blue" 
    },
  }));

  const recommended: ActivityItem[] = recommendedJobs.map(job => ({
    id: job.id as string,
    title: job.title,
    subtitle: job.company || "Company",
    meta: job.salary || "Negotiable",
    icon: <div className="font-bold text-brand-primary">{job.company?.[0] || job.title[0]}</div>,
    action: { label: "View", onClick: () => window.location.href = `/jobs/${job.id}` },
  }));

  return (
    <DashboardLayout>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-fade-in-up">
           <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Candidate Portal</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight font-heading mb-3">
             {user?.name ? `Hello, ${user.name.split(' ')[0]}!` : "Welcome back!"}
           </h1>
           <p className="text-slate-500 font-medium">
             Keep exploring. Let's find your dream job today.
           </p>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 group cursor-pointer hover:border-brand-primary/50 transition-all">
           <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 group-hover:rotate-12 transition-transform">
              <Star className="w-6 h-6 fill-amber-500" />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Premium Plan</p>
              <p className="text-sm font-black text-slate-900 leading-none">Upgrade to Pro</p>
           </div>
           <ArrowRight className="w-4 h-4 text-slate-300 ml-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <DashboardSection 
            title="Recent Applications" 
            headerAction={
                <button 
                  onClick={() => window.location.href = "/dashboard/applied-jobs"}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline"
                >
                    View All
                </button>
            }
        >
          {recentApps.length > 0 ? (
            <RecentActivityList items={recentApps} />
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold text-sm">No applications yet.</p>
            </div>
          )}
        </DashboardSection>

        <DashboardSection 
            title="Recommended for You"
            headerAction={
                <button 
                  onClick={() => window.location.href = "/jobs"}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline"
                >
                    Browse More
                </button>
            }
        >
          {recommended.length > 0 ? (
            <RecentActivityList items={recommended} />
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold text-sm">Finding jobs for you...</p>
            </div>
          )}
        </DashboardSection>
      </div>

      <div className="mt-12 p-10 bg-brand-dark rounded-[3rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
                <h3 className="text-2xl font-black text-white mb-2 font-heading tracking-tight">Boost your visibility</h3>
                <p className="text-slate-400 font-medium">Verified profiles are 3x more likely to get noticed by top employers. Complete your skill verification now.</p>
            </div>
            <button className="whitespace-nowrap bg-white text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all shadow-xl active:scale-95">
                Start Verification
            </button>
         </div>
      </div>
    </DashboardLayout>
  );
}
