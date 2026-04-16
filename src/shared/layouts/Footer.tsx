import {
  Bell,
  Briefcase,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
  Mail,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-white mt-auto font-sans relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Newsletter Section - Hidden on mobile */}
      <div className="hidden lg:block bg-white/5 border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5 text-center lg:text-left">
            <div className="bg-brand-primary/20 p-4 rounded-2xl shadow-lg shadow-brand-primary/10">
              <Bell className="w-8 h-8 text-brand-primary animate-bounce-slow" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading tracking-tight">Get Job Notifications</h3>
              <p className="text-gray-400 text-sm mt-1">
                Stay ahead! Subscribe to our newsletter for the latest opportunities.
              </p>
            </div>
          </div>

          <div className="flex w-full lg:w-auto gap-3 items-center bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-brand-primary/50 transition-all group">
            <div className="pl-3 text-gray-400 group-focus-within:text-brand-primary transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent text-white px-2 py-3 w-full lg:w-72 focus:outline-none text-sm font-medium"
            />
            <button className="bg-brand-primary hover:bg-[#009bc2] text-white p-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs uppercase tracking-widest">Subscribe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Condensed on small screens, hidden below md */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 border-2 border-brand-primary rounded-xl flex items-center justify-center group-hover:bg-brand-primary/10 transition-all shadow-[0_0_15px_rgba(0,180,216,0.1)]">
                <Briefcase className="w-7 h-7 text-brand-primary" />
              </div>
              <span className="font-decorative text-4xl tracking-wider">
                Job<span className="text-brand-primary">Portal</span>.rw
              </span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              Connecting talented professionals with Rwanda's most innovative companies. Your career adventure starts right here.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: "hover:text-blue-500" },
                { icon: Twitter, color: "hover:text-sky-400" },
                { icon: Linkedin, color: "hover:text-blue-600" },
                { icon: Instagram, color: "hover:text-pink-500" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all ${social.color} hover:bg-white/10 hover:-translate-y-1 shadow-sm`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "For Candidates",
              links: ["Add a Resume", "Candidate Dashboard", "Job Alerts", "Bookmarks", "My Account"],
            },
            {
              title: "For Employers",
              links: ["Browse Candidates", "Employer Dashboard", "Post a Job", "Job Packages", "Work Process"],
            },
            {
              title: "Information",
              links: ["About Us", "Terms & Conditions", "Privacy Policy", "Contact Us", "FAQs"],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-bold text-lg mb-8 font-heading relative inline-block">
                {col.title}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-primary rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-brand-primary text-sm flex items-center gap-2 transition-all hover:translate-x-1 group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-brand-primary/50 group-hover:text-brand-primary transition-colors" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer - Simplified for Mobile */}
      <div className="bg-black/20 py-4 lg:py-8 border-t border-white/5 relative z-10 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <p className="text-gray-500 text-[10px] md:text-sm uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} <span className="text-brand-primary">JOB PORTAL.rw</span>
          </p>

          <div className="flex gap-4 md:gap-8 text-[9px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">
            <Link to="#" className="hover:text-brand-primary transition-colors">Support</Link>
            <Link to="#" className="hidden md:block hover:text-brand-primary transition-colors">Sitemap</Link>
            <button
              onClick={scrollToTop}
              className="text-brand-primary hover:text-white transition-colors flex items-center gap-1"
            >
              <ChevronUp className="w-3 h-3" />
              TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
