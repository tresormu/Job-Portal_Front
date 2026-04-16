import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, Lock, LogIn, Loader2, ArrowRight, Briefcase } from "lucide-react";
import PageWrapper from "../../shared/layouts/PageWrapper";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"CANDIDATE" | "EMPLOYER">("CANDIDATE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-md w-full animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-brand-primary mb-6 shadow-xl shadow-brand-primary/10 border border-slate-100">
              <LogIn className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight font-heading">
              Welcome Back
            </h2>
            <p className="mt-3 text-slate-500 font-medium">
              Log in to your account to continue
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold border border-rose-100 animate-shake">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("CANDIDATE")}
                    className={`py-4 px-4 rounded-2xl font-bold transition-all border-2 text-sm ${
                      role === "CANDIDATE"
                        ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20"
                        : "bg-slate-50 text-slate-500 border-transparent hover:border-slate-200"
                    }`}
                  >
                    Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("EMPLOYER")}
                    className={`py-4 px-4 rounded-2xl font-bold transition-all border-2 text-sm flex items-center justify-center gap-2 ${
                      role === "EMPLOYER"
                        ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20"
                        : "bg-slate-50 text-slate-500 border-transparent hover:border-slate-200"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> Employer
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white rounded-2xl transition-all outline-none font-medium text-slate-800"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-brand-primary hover:underline text-xs font-bold"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                  </div>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-brand-primary/50 focus:bg-white rounded-2xl transition-all outline-none font-medium text-slate-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-2xl bg-brand-primary text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-primary/90 transition-all transform active:scale-[0.98] shadow-xl shadow-brand-primary/20 disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-500 font-medium text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-brand-primary font-bold hover:underline underline-offset-4 ml-1"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
