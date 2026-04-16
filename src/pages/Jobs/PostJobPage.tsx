import PageWrapper from "../../shared/layouts/PageWrapper";
import Loader from "../../shared/components/ui/Loader";
import usePageLoader from "../../shared/components/hooks/usePageLoader";
import PageHeader from "../../shared/components/ui/PageHeader";
import { Briefcase, Building2, CreditCard, Send, Save, CheckCircle2 } from "lucide-react";

export default function PostJobPage() {
  const isLoading = usePageLoader(1000);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Post a New Job" breadcrumb="Post Job" />
      
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-2">Create Listing</h2>
              <p className="text-slate-500 font-medium">Find the perfect candidate for your position by providing detailed information.</p>
            </div>

            <form className="space-y-12">
              {/* Job Details Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Job Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Job Title *</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Job Type *</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium cursor-pointer appearance-none">
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Freelance</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Category *</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium cursor-pointer appearance-none">
                      <option>Technology</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Medical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Location *</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium"
                      placeholder="e.g. Kigali, Rwanda"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Job Description *</label>
                  <textarea
                    rows={6}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium"
                    placeholder="Describe the role, responsibilities, and requirements..."
                  />
                </div>
              </div>

              {/* Company Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Company Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Company Name *</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Website URL</label>
                    <input
                      type="url"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Checkout */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Pricing & Promotion</h3>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                        <span className="font-bold text-slate-700">Standard Job Posting</span>
                      </div>
                      <span className="font-extrabold text-slate-900">$99</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Post Job & Pay
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
