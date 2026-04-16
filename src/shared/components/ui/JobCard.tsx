import { useState } from "react";
import { MapPin, Heart, Tag, DollarSign, Briefcase, Users, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface JobData {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  category: string;
  jobType: string;
  location: string;
  salary?: string;
  deadline: string;
  employerId: string;
  views?: number;
  applicationCount?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  logo?: string;
  logoBg?: string;
  type?: string;
  typeBg?: string;
  experience?: string;
  education?: string;
  company?: string;
  tags?: string[];
  featured?: boolean;
}

export default function JobCard({ job }: { job: JobData }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,180,216,0.12)] overflow-hidden flex flex-col relative">
      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-brand-secondary/20">
            Featured
          </span>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Company Logo */}
          <div
            className={`w-16 h-16 rounded-2xl ${job.logoBg || "bg-slate-50"} flex items-center justify-center text-2xl font-bold shrink-0 border border-slate-100 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden`}
          >
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-brand-primary font-heading">{job.company?.charAt(0) || "?"}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-4">
                <Link to={`/jobs/${job.id}`} className="block">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors cursor-pointer mb-1 truncate leading-tight">
                    {job.title}
                  </h3>
                </Link>
                <p className="text-brand-primary font-bold text-sm tracking-wide">
                  {job.company}
                </p>
              </div>

              {/* Heart Icon */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-all p-2.5 rounded-2xl active:scale-90 shadow-sm ${
                  isSaved
                    ? "bg-brand-secondary text-white"
                    : "bg-slate-50 text-slate-300 hover:text-brand-secondary hover:bg-brand-secondary/10"
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${isSaved ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-y-3 gap-x-5 text-[13px] text-slate-500 mb-6 font-medium">
              {job.salary && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> {job.salary}
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span className="line-clamp-1">{job.location || "Remote"}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg">
                <Briefcase className="w-4 h-4 text-orange-400" />{" "}
                {job.type || "Full-time"}
              </span>
            </div>

            <hr className="border-slate-100 mb-6" />

            {/* Bottom Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                 <span className="flex items-center gap-1.5">
                   <Users className="w-3.5 h-3.5" />
                   {job.applicationCount || 0} Apps
                 </span>
                 <span className="flex items-center gap-1.5">
                   <Eye className="w-3.5 h-3.5" />
                   {job.views || 0}
                 </span>
              </div>
              
              <Link
                to={`/jobs/${job.id}`}
                className="bg-brand-primary hover:bg-[#009bc2] text-white text-xs px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-all shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/40 active:scale-95 flex items-center gap-2 group/btn"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Reveal on Hover */}
      {job.tags && job.tags.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/95 backdrop-blur-md px-8 py-4 flex items-center gap-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          <Tag className="w-4 h-4 text-brand-primary" />
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-300">
            {job.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {job.tags.length > 4 && (
              <span className="text-gray-500 font-bold">+{job.tags.length - 4}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
