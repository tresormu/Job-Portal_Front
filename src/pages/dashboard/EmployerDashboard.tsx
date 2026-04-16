import DashboardLayout from "../../shared/layouts/DashboardLayout";
import {
  Briefcase,
  Users,
  FilePlus,
  Eye,
  MessageSquare,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "./components/StatCard";
import DashboardSection from "./components/DashboardSection";
import ApplicantTable from "./components/ApplicantTable";
import type { Applicant } from "./components/ApplicantTable";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getJobsByEmployer } from "../Jobs/service/jobService";
import { getEmployerById, getEmployerStats } from "../Employer/service/employerService";
import { ApplicationService } from "../../services/application.Service";
import type { ApplicationModel } from "../../services/application.Service";
import Loader from "../../shared/components/ui/Loader";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [employer, setEmployer] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState([
    {
      label: "Active Jobs",
      value: 0,
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-brand-primary",
    },
    {
      label: "Total Applicants",
      value: 0,
      icon: <Users className="w-6 h-6" />,
      color: "bg-brand-secondary",
    },
    {
      label: "Job Views",
      value: 0,
      icon: <Eye className="w-6 h-6" />,
      color: "bg-amber-500",
    },
    {
      label: "Shortlisted",
      value: 0,
      icon: <FilePlus className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
  ]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const userId = user?.id || user?._id;
        if (!userId) {
          setLoading(false);
          return;
        }

        const employerData = await getEmployerById(userId);
        if (employerData) {
          setEmployer(employerData);
          const employerId = employerData.id || employerData._id || "";

          try {
            // Fetch applications and jobs for lists
            const [jobsData, applicationsData, statsData] = await Promise.all([
              getJobsByEmployer(employerId),
              ApplicationService.getByEmployer(employerId),
              getEmployerStats()
            ]);

            setApplications(applicationsData);

            if (statsData?.success) {
              const { activeJobs, totalApplicants, totalViews, shortlistedCount } = statsData.data;
              setStats([
                {
                  label: "Active Jobs",
                  value: activeJobs,
                  icon: <Briefcase className="w-6 h-6" />,
                  color: "bg-brand-primary",
                },
                {
                  label: "Total Applicants",
                  value: totalApplicants,
                  icon: <Users className="w-6 h-6" />,
                  color: "bg-brand-secondary",
                },
                {
                  label: "Job Views",
                  value: totalViews,
                  icon: <Eye className="w-6 h-6" />,
                  color: "bg-amber-500",
                },
                {
                  label: "Shortlisted",
                  value: shortlistedCount,
                  icon: <FilePlus className="w-6 h-6" />,
                  color: "bg-emerald-500",
                },
              ]);
            } else {
              // Fallback calculation if stats API fails
              const activeJobs = jobsData.filter((job) => job.isActive !== false).length;
              const totalApplicants = applicationsData.length;
              const totalViews = jobsData.reduce((sum, job) => sum + (job.views || 0), 0);
              const shortlistedCount = applicationsData.filter((app: ApplicationModel) => app.status === "SHORTLISTED").length;

              setStats([
                { label: "Active Jobs", value: activeJobs, icon: <Briefcase className="w-6 h-6" />, color: "bg-brand-primary" },
                { label: "Total Applicants", value: totalApplicants, icon: <Users className="w-6 h-6" />, color: "bg-brand-secondary" },
                { label: "Job Views", value: totalViews, icon: <Eye className="w-6 h-6" />, color: "bg-amber-500" },
                { label: "Shortlisted", value: shortlistedCount, icon: <FilePlus className="w-6 h-6" />, color: "bg-emerald-500" },
              ]);
            }
          } catch (error) {
            console.error("Error fetching jobs and applications:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching employer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [user?.id]);

  if (loading) {
    return <Loader />;
  }

  const recentApplicants: Applicant[] = applications
    .slice(0, 10)
    .map((app, index) => ({
      id: app.id || app._id || index,
      name: app.userId?.fullName || app.userId?.name || "Unknown Candidate",
      role: app.userId?.jobTitle || "Candidate",
      professionalTitle: app.userId?.professionalTitle || app.userId?.jobTitle || "Candidate",
      jobTitle: app.jobId?.title || "Unknown Job",
      appliedDate: app.submissionDate
        ? new Date(app.submissionDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
      avatar: app.userId?.profilePicture,
    }));

  return (
    <DashboardLayout>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Employer Portal</span>
           </div>
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading mb-2">
             Dashboard Overview
           </h1>
           <p className="text-slate-500 font-medium">
             Welcome back! Here's a summary of your recent hiring activity.
           </p>
        </div>
        
        {employer && (
           <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 uppercase font-black text-brand-primary">
                 {employer.companyName.charAt(0)}
              </div>
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                 <p className="text-sm font-black text-slate-900 leading-none">{employer.companyName}</p>
              </div>
           </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Post Job Call to Action */}
      <div className="bg-brand-dark rounded-[3.5rem] p-10 md:p-14 mb-12 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full mb-6 border border-brand-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">Growth Opportunity</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight font-heading">
                Ready to find your next <span className="text-brand-primary italic">star talent?</span>
             </h2>
             <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Connect with thousands of skilled professionals. Our premium job listing service ensures your role gets seen by the right candidates.
             </p>
          </div>
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-brand-primary/30 active:scale-95 flex items-center justify-center gap-3 self-start lg:self-center">
             Post a New Vacancy <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <DashboardSection title="Recent Talent Applications" className="lg:col-span-2">
          <ApplicantTable applicants={recentApplicants} />
        </DashboardSection>

        <DashboardSection title="Quick Actions">
            <div className="space-y-4">
            {[
              { label: "Manage My Listings", path: "/dashboard/jobs", icon: <Briefcase className="w-5 h-5" />, color: "text-brand-primary" },
              { label: "Candidate Messages", path: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" />, color: "text-amber-500" },
              { label: "Organization Details", path: "/dashboard/profile", icon: <Settings className="w-5 h-5" />, color: "text-slate-400" },
            ].map((act) => (
              <button
                key={act.label}
                onClick={() => window.location.href = act.path}
                className="w-full flex items-center justify-between gap-3 px-6 py-5 bg-slate-50/50 hover:bg-white rounded-3xl text-xs font-black text-slate-800 transition-all border border-slate-100 hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`${act.color} bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform`}>
                    {act.icon}
                  </div>
                  <span className="uppercase tracking-widest">{act.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </DashboardSection>
      </div>
    </DashboardLayout>
  );
}
const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
