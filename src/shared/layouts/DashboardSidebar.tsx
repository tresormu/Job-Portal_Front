import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Heart,
  User,
  Briefcase,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  BarChart3,
  FolderTree,
  Building2,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { UserRole } from "../../contexts/AuthContext";

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  // Shared
  {
    label: "Overview",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["CANDIDATE", "EMPLOYER", "ADMIN"],
  },

  // Candidate
  {
    label: "Applied Jobs",
    path: "/dashboard/applied-jobs",
    icon: <FileText className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },
  {
    label: "Saved Jobs",
    path: "/dashboard/saved-jobs",
    icon: <Heart className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },
  {
    label: "My Profile",
    path: "/dashboard/profile",
    icon: <User className="w-5 h-5" />,
    roles: ["CANDIDATE"],
  },

  // Employer
  {
    label: "Post a Job",
    path: "/dashboard/post-job",
    icon: <PlusCircle className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },
  {
    label: "My Listings",
    path: "/dashboard/manage-jobs",
    icon: <Briefcase className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },
  {
    label: "Applicants",
    path: "/dashboard/applicants",
    icon: <Users className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },
  {
    label: "Company",
    path: "/dashboard/company-profile",
    icon: <Building2 className="w-5 h-5" />,
    roles: ["EMPLOYER"],
  },

  // Admin
  {
    label: "Statistics",
    path: "/dashboard/admin/stats",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Jobs",
    path: "/dashboard/admin/jobs",
    icon: <Briefcase className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Manage Users",
    path: "/dashboard/admin/users",
    icon: <Users className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Applications",
    path: "/dashboard/admin/applications",
    icon: <FileText className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Categories",
    path: "/dashboard/admin/categories",
    icon: <FolderTree className="w-5 h-5" />,
    roles: ["ADMIN"],
  },
  {
    label: "Employers",
    path: "/dashboard/admin/employers",
    icon: <Building2 className="w-5 h-5" />,
    roles: ["ADMIN"],
  },

  // Shared
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
    roles: ["CANDIDATE", "EMPLOYER", "ADMIN"],
  },
];

export default function DashboardSidebar() {
  const { role, logout } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <aside className="w-72 bg-brand-dark text-white min-h-screen flex flex-col relative z-30 transition-all duration-300">
      {/* Decorative Blur Background inside Sidebar */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(0,180,216,0.05),transparent_50%)] pointer-events-none"></div>

      <div className="px-8 py-10 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform duration-300 antialiased">
            <span className="font-logo text-xl">J</span>
          </div>
          <span className="text-xl font-bold tracking-tight font-heading">
            Job<span className="text-brand-primary">Portal</span>
          </span>
        </Link>
      </div>

      <div className="px-6 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] relative z-10">
        Main Menu
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-10">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center group relative px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 ${isActive
                ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              {item.icon}
              <span className="ml-3 font-semibold text-sm">{item.label}</span>
              {isActive && (
                <ChevronRight className="ml-auto w-4 h-4 text-white/50 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Space / Support Area */}
      <div className="p-6 mt-auto relative z-10">
        <div className="bg-white/5 rounded-3xl p-5 border border-white/5 mb-6 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <User className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-bold text-white">Need Support?</p>
                  <p className="text-[10px] text-slate-500">Contact our experts</p>
               </div>
            </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-4 w-full text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 rounded-2xl transition-all group font-bold text-sm"
        >
          <LogOut className="w-5 h-5 transition-colors group-hover:text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
