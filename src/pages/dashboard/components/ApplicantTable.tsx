import { Eye, ChevronRight } from "lucide-react";

export interface Applicant {
    id: string | number;
    name: string;
    professionalTitle: string;
    jobTitle: string;
    appliedDate: string;
    avatar?: string;
}

interface ApplicantTableProps {
    applicants: Applicant[];
}

export default function ApplicantTable({ applicants }: ApplicantTableProps) {
    if (applicants.length === 0) {
        return (
            <div className="text-center py-20 px-6">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Eye className="w-8 h-8" />
                 </div>
                 <p className="text-slate-500 font-medium italic">No active applicants to show at the moment.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black border-b border-slate-50">
                        <th className="pb-6 pl-2">Candidate Profile</th>
                        <th className="pb-6">Targeted Job</th>
                        <th className="pb-6">Submission Date</th>
                        <th className="pb-6 text-right pr-2">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {applicants.map((applicant) => (
                        <tr key={applicant.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                            <td className="py-6 pl-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-brand-primary font-black text-sm overflow-hidden shadow-md group-hover:scale-105 transition-transform border border-slate-100 uppercase">
                                        {applicant.avatar ? (
                                            <img src={applicant.avatar} alt={applicant.name} className="w-full h-full object-cover" />
                                        ) : (
                                            applicant.name.split(" ").map(n => n[0]).join("")
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-extrabold text-slate-900 group-hover:text-brand-primary transition-colors cursor-pointer">{applicant.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{applicant.professionalTitle}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 border border-slate-200 group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all">
                                    {applicant.jobTitle}
                                </div>
                            </td>
                            <td className="py-6">
                                <span className="text-xs font-semibold text-slate-500">{applicant.appliedDate}</span>
                            </td>
                            <td className="py-6 text-right pr-2">
                                <button className="inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white hover:bg-brand-primary transition-all rounded-xl hover:shadow-lg hover:shadow-brand-primary/20 group/btn border border-slate-200/50 hover:border-brand-primary">
                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
