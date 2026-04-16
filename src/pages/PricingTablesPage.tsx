import PageWrapper from "../shared/layouts/PageWrapper";
import Loader from "../shared/components/ui/Loader";
import usePageLoader from "../shared/components/hooks/usePageLoader";
import PageHeader from "../shared/components/ui/PageHeader";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

export default function PricingTablesPage() {
  const isLoading = usePageLoader(1000);

  if (isLoading) {
    return <Loader />;
  }

  const plans = [
    {
      name: "Basic",
      price: "99",
      description: "Perfect for start-ups and small businesses looking to hire.",
      icon: <Zap className="w-6 h-6 text-brand-primary" />,
      features: ["5 Job Postings", "2 Featured Jobs", "10 Days Duration", "Email Alerts", "Standard Support"],
      buttonText: "Start Basic",
      highlight: false
    },
    {
      name: "Premium",
      price: "199",
      description: "Our most popular plan for growing companies with consistent hiring needs.",
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      features: ["15 Job Postings", "8 Featured Jobs", "30 Days Duration", "Priority Support", "Email Alerts", "Company Profile"],
      buttonText: "Go Premium",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "399",
      description: "For large organizations requiring maximum visibility and advanced tools.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      features: ["Unlimited Jobs", "25 Featured Jobs", "60 Days Duration", "24/7 Priority Support", "Dedicated Manager", "Advanced Analytics", "API Access"],
      buttonText: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Pricing Plans" breadcrumb="Pricing" />
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 font-heading tracking-tight">Invest in Your Next Top Talent</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a plan that scales with your ambition. No hidden fees, just pure recruitment power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                plan.highlight 
                  ? "bg-brand-dark text-white shadow-2xl shadow-brand-dark/30 scale-105 z-10" 
                  : "bg-white border border-slate-100 shadow-xl shadow-slate-200/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.highlight ? "bg-white/10" : "bg-slate-50"}`}>
                  {plan.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 font-heading ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>{plan.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-extrabold font-heading ${plan.highlight ? "text-white" : "text-slate-900"}`}>${plan.price}</span>
                  <span className={`text-sm font-medium ${plan.highlight ? "text-slate-400" : "text-slate-500"}`}>/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-brand-primary" : "bg-emerald-50 text-emerald-500"}`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-white" : ""}`} />
                    </div>
                    <span className={`text-sm font-medium ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                plan.highlight 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90" 
                  : "bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-900/10"
              }`}>
                {plan.buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4 font-heading tracking-tight flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-brand-primary" />
              Frequently Asked Questions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "Can I switch plans mid-cycle?", a: "Absolutely. When you upgrade or downgrade, the prorated amount will be applied to your next billing cycle automatically." },
              { q: "Are there any hidden listing fees?", a: "None at all. The price you see includes everything listed in the plan features. No per-click or per-hire charges." },
              { q: "What's the featured job boost?", a: "Featured jobs appear at the top of search results and are promoted in our home page highlight section for maximum visibility." },
              { q: "Do you offer annual discounts?", a: "Yes, we offer 2 months free if you choose to be billed annually. Contact our sales team for annual invoicing." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-lg font-extrabold text-slate-900 mb-3 font-heading leading-tight">{faq.q}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom CTA */}
        <div className="mt-24 bg-brand-primary rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl shadow-brand-primary/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">Need a Custom Solution?</h2>
             <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium">
               We offer tailored enterprise packages for high-volume recruitment needs, including API integration and dedicated management.
             </p>
             <button className="px-12 py-5 bg-white text-brand-dark rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
               Talk to an Expert
             </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
