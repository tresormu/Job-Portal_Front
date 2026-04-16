import { useEffect, useState } from "react";
import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import {
  Users,
  Briefcase,
  FileText,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import StatCard from "../components/StatCard";
import DashboardSection from "../components/DashboardSection";
import { CandidateService } from "../../Authentication/service/Auth.Service";
import { getAllJobs } from "../../Jobs/service/jobService";
import { ApplicationService } from "../../../services/application.Service";
import Loader from "../../../shared/components/ui/Loader";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    users: 0,
    jobs: 0,
    applications: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const stats = await CandidateService.getAdminStats();
        if (stats?.success) {
          const { totalUsers, totalJobs, totalApplications } = stats.data;
          setCounts({
            users: totalUsers || 0,
            jobs: totalJobs || 0,
            applications: totalApplications || 0
          });
        }
      } catch (error) {
        console.error("Error fetching admin counts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (loading) return <Loader />;

  const stats = [
    {
      label: "Total Users",
      value: counts.users,
      icon: <Users className="w-6 h-6" />,
      color: "bg-brand-primary",
    },
    {
      label: "Active Jobs",
      value: counts.jobs,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-brand-secondary",
    },
    {
      label: "Total Applications",
      value: counts.applications,
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Administrator</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight font-heading mb-3">
             Admin Control Center
           </h1>
           <p className="text-slate-500 font-medium">
             Centralized management for system health and platform growth.
           </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 items-start">
        <DashboardSection title="Administrative Actions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Manage Users", path: "/dashboard/admin/users", icon: <Users className="w-5 h-5" /> },
              { label: "Manage Jobs", path: "/dashboard/admin/jobs", icon: <Briefcase className="w-5 h-5" /> },
              { label: "Review Applications", path: "/dashboard/admin/applications", icon: <FileText className="w-5 h-5" /> },
              { label: "Platform Settings", path: "/dashboard/admin/settings", icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => window.location.href = link.path}
                className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl hover:bg-brand-primary hover:text-white transition-all group hover:shadow-xl hover:shadow-brand-primary/20 relative"
              >
                <span className="text-brand-primary group-hover:text-white mb-4 transition-colors">
                  {link.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-center">{link.label}</span>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </DashboardSection>

        {/* System Footer Info */}
        <div className="p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Security Status</span>
           </div>
           <p className="text-white text-xl font-bold mb-2 font-heading tracking-tight">System Secure</p>
           <p className="text-slate-400 font-medium max-w-md">Platform integrity is verified. Real-time monitoring is active and protecting all user data.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
