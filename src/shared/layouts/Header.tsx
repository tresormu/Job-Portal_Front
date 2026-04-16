import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  User,
  X,
  Menu,
  LogIn,
  LayoutDashboard,
  LogOut,
  Home,
  Users,
  Building2,
  BookOpen,
  Mail
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center gap-1.5 hover:text-brand-primary transition-all duration-300 font-medium";
    const activeClass = "text-brand-primary relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-brand-primary after:shadow-[0_0_8px_rgba(0,180,216,0.6)]";
    return pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Candidates", path: "/candidates", icon: Users },
    { label: "Employers", path: "/employers", icon: Building2 },
    { label: "Blog", path: "/blog", icon: BookOpen },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <header className="glass-dark text-white fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-brand-primary rounded-xl flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors shadow-[0_0_15px_rgba(0,180,216,0.2)]">
            <Briefcase className="w-6 h-6 text-brand-primary" />
          </div>
          <span className="font-decorative text-3xl tracking-wider group-hover:text-brand-primary transition-colors">
            Job<span className="text-brand-primary">Portal</span>.rw
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm items-center">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2"
              >
                <User className="w-4 h-4 text-brand-primary" /> Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-xl bg-brand-secondary hover:bg-[#ff5252] transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand-secondary/20 hover:scale-105 active:scale-95"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-[#009bc2] transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand-primary/20"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 border border-white/10 hover:border-brand-secondary hover:text-brand-secondary rounded-xl transition-all group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7 text-brand-secondary" />
          ) : (
            <Menu className="w-7 h-7 text-brand-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Grid of Icons */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"
          } glass-dark`}
      >
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 ${isActive
                    ? "bg-brand-primary/20 text-brand-primary scale-105 shadow-lg shadow-brand-primary/10 border border-brand-primary/30"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 border border-transparent"
                    }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "animate-pulse" : ""}`} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter line-clamp-1">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <User className="w-4 h-4 text-brand-primary" /> SIGN UP
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 rounded-2xl bg-brand-secondary text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-secondary/20 active:scale-95 transition-transform"
                >
                  <LogIn className="w-4 h-4" /> LOGIN
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 rounded-2xl bg-brand-primary text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 rounded-2xl border border-brand-secondary/30 text-brand-secondary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
