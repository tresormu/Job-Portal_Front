import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import {
  Users,
  User,
  Briefcase,
  Building2,
  FileText,
  Calendar
} from "lucide-react";
import StatCard from "../components/StatCard";
import { CandidateService } from "../../Authentication/service/Auth.Service";
import { getAllJobs } from "../../Jobs/service/jobService";
import { ApplicationService } from "../../../services/application.Service";
import Loader from "../../../shared/components/ui/Loader";

export default function AdminStats() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: 0,
    employers: 0,
    candidates: 0,
    jobs: 0,
    applications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, jobs, apps] = await Promise.all([
          CandidateService.getAllUsers(),
          getAllJobs(),
          ApplicationService.getAll()
        ]);
        
        setData({
          users: users.length,
          employers: users.filter(u => u.role === "EMPLOYER").length,
          candidates: users.filter(u => u.role === "CANDIDATE").length,
          jobs: jobs.length,
          applications: apps.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const stats = [
    {
      label: "Total Users",
      value: data.users,
      icon: <Users className="w-6 h-6" />,
      color: "bg-brand-primary",
    },
    {
      label: "Employers",
      value: data.employers,
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-brand-secondary",
    },
    {
      label: "Candidates",
      value: data.candidates,
      icon: <User className="w-6 h-6" />,
      color: "bg-amber-500",
    },
    {
      label: "Total Jobs",
      value: data.jobs,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-indigo-500",
    },
    {
      label: "Applications",
      value: data.applications,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Analytics Suite</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight font-heading mb-3">
             Platform Intelligence
           </h1>
           <p className="text-slate-500 font-medium text-lg">
             Real-time growth indicators and platform activity.
           </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20">
             <Calendar className="w-5 h-5 text-slate-400" />
             <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
               {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
             </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 text-center">
          <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PieChartIcon className="w-10 h-10 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 font-heading tracking-tight">Advanced Analytics Coming Soon</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                  We are currently integrating deeper market insights and trend analysis into our dashboard.
              </p>
          </div>
      </div>
    </DashboardLayout>
  );
}

const PieChartIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);
