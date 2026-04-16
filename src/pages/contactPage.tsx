import React, { useState } from "react";
import PageWrapper from "../shared/layouts/PageWrapper";
import Loader from "../shared/components/ui/Loader";
import usePageLoader from "../shared/components/hooks/usePageLoader";
import {
  User,
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import PageHeader from "../shared/components/ui/PageHeader";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  href?: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon,
  label,
  value,
  href,
}) => {
  const content = (
    <div className="flex gap-6 py-6 border-b border-white/10 last:border-b-0 transition-all duration-500 hover:bg-white/5 rounded-2xl px-4 -mx-4 group cursor-pointer">
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
          {label}
        </h4>
        <p className="text-base font-medium text-white group-hover:text-brand-primary transition-colors">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    );
  }

  return content;
};

const ContactPage: React.FC = () => {
  const isLoading = usePageLoader(1000);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data: FormData) => {
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = "Full name is required";
    if (!data.email.trim()) errors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Enter a valid email address";
    if (!data.subject.trim()) errors.subject = "Please specify a subject";
    if (!data.message.trim() || data.message.trim().length < 10)
      errors.message = "Message must be at least 10 characters";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ status: "submitting" });
    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setSubmitStatus({ status: "error", message: "Please check the form for errors." });
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitStatus({
        status: "success",
        message: "Your message has been received! Our team will contact you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setFormErrors({});
    } catch (err) {
      setSubmitStatus({
        status: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Get in Touch" breadcrumb="Contact" />

      <main className="max-w-7xl mx-auto px-6 py-24 relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 items-start">
          {/* Info Column */}
          <aside className="space-y-8 lg:sticky lg:top-32">
            <div className="bg-brand-dark rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-dark/20 relative overflow-hidden group">
               {/* Decorative Gradient */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full group-hover:bg-brand-primary/20 transition-all duration-700"></div>
              
              <h3 className="text-3xl font-bold mb-8 font-heading tracking-tight relative z-10">Contact Details</h3>

              <div className="space-y-2 relative z-10">
                <ContactInfoItem
                  icon={<MapPin size={20} />}
                  label="Our Headquarters"
                  value="Kigali Heights, 4th Floor, Kigali, Rwanda"
                />

                <ContactInfoItem
                  icon={<Mail size={20} />}
                  label="Email Support"
                  value="hello@jobpro.com"
                  href="mailto:hello@jobpro.com"
                />

                <ContactInfoItem
                  icon={<Phone size={20} />}
                  label="Direct Line"
                  value="+250 790 900 569"
                  href="tel:+250790900569"
                />

                <ContactInfoItem
                  icon={<Clock size={20} />}
                  label="Operating Hours"
                  value="Mon – Fri: 8:00 AM – 6:00 PM"
                />
              </div>

              {/* Socials */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center text-white/70 transition-all duration-300 hover:bg-brand-primary hover:text-white hover:-translate-y-1"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                <CheckCircle2 size={24} />
               </div>
               <h4 className="text-xl font-bold text-slate-900 mb-3 font-heading">24/7 Support</h4>
               <p className="text-slate-500 text-sm leading-relaxed mb-6">
                 Our dedicated support team is available around the clock for any urgent inquiries regarding your job postings or applications.
               </p>
               <a href="#" className="flex items-center gap-2 text-brand-primary font-bold text-sm group">
                 Visit Help Center
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
            </div>
          </aside>

          {/* Form Column */}
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/40 relative">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-heading tracking-tight">Send a Message</h2>
              <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                Have questions about our recruitment process? Feel free to reach out and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {submitStatus.status === "success" && (
                <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-emerald-800 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}
              
              {submitStatus.status === "error" && (
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl text-rose-800 animate-fade-in">
                  {submitStatus.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full py-4 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>
                  {formErrors.name && <p className="text-rose-500 text-xs font-bold ml-1">{formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full py-4 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium text-slate-800"
                    />
                  </div>
                  {formErrors.email && <p className="text-rose-500 text-xs font-bold ml-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject *</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full py-4 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium text-slate-800"
                  />
                </div>
                {formErrors.subject && <p className="text-rose-500 text-xs font-bold ml-1">{formErrors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message *</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-5 top-6 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full py-5 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all font-medium text-slate-800 resize-none"
                  />
                </div>
                {formErrors.message && <p className="text-rose-500 text-xs font-bold ml-1">{formErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitStatus.status === "submitting"}
                className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {submitStatus.status === "submitting" ? (
                  "Sending Message..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default ContactPage;
