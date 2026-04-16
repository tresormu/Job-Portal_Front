import { useState } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HomeCategories from "./HomeCategories";

export default function HomeHero() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [category, setCategory] = useState("Choose a category");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append("search", keyword);
    if (region !== "All Regions") params.append("location", region);
    if (category !== "Choose a category") params.append("category", category);

    navigate(`/jobs?${params.toString()}`);
  };

  const trendingKeywords = ["Developer", "Design", "IT Company", "Media", "Medical"];

  return (
    <section className="relative min-h-[95vh] flex items-center bg-brand-dark text-white overflow-hidden pb-20">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      {/* Premium Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/80 to-brand-primary/20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-secondary/10 blur-[100px] rounded-full animate-pulse-slow delay-700"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Trusted by 10,000+ Professionals</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-12 animate-fade-in-up delay-200">
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-[1.1] mb-6 tracking-tight">
            Find Your <span className="text-brand-primary">Dream Career</span> <br /> 
            in Rwanda's Top <span className="font-decorative text-brand-secondary italic px-2">Companies</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Browse through <span className="text-white font-bold">3,000+</span> open positions and take the next leap in your professional adventure.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-6xl animate-fade-in-up delay-300">
          <div className="glass-dark p-2 md:p-3 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
              {/* Keyword Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary w-5 h-5 transition-transform group-focus-within:scale-110" />
                <input
                  placeholder="What are you looking for?"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:bg-white/10 focus:outline-none transition-all border border-transparent focus:border-brand-primary/30"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              {/* Location Select */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary w-5 h-5 transition-transform group-focus-within:scale-110" />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white appearance-none focus:bg-white/10 focus:outline-none transition-all border border-transparent focus:border-brand-primary/30 cursor-pointer"
                >
                  <option className="bg-brand-dark">All Regions</option>
                  <option className="bg-brand-dark">Kigali</option>
                  <option className="bg-brand-dark">Musanze</option>
                  <option className="bg-brand-dark">Rubavu</option>
                </select>
              </div>

              {/* Category Select */}
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary w-5 h-5 transition-transform group-focus-within:scale-110" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white appearance-none focus:bg-white/10 focus:outline-none transition-all border border-transparent focus:border-brand-primary/30 cursor-pointer"
                >
                  <option className="bg-brand-dark">Choose a category</option>
                  <option className="bg-brand-dark">Technology</option>
                  <option className="bg-brand-dark">Accounting</option>
                  <option className="bg-brand-dark">Medical</option>
                  <option className="bg-brand-dark">Marketing</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-brand-primary hover:bg-[#009dc4] py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-sm shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Search className="w-5 h-5 rotate-0 group-hover:rotate-12 transition-transform" />
                Find Jobs
              </button>
            </div>
          </div>

          {/* Trending keywords */}
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up delay-400">
            <div className="flex items-center gap-2 text-brand-primary font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Trending:</span>
            </div>
            {trendingKeywords.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setKeyword(tag);
                  handleSearch();
                }}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-primary hover:bg-brand-primary/10 transition-all text-xs text-gray-400 hover:text-brand-primary font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Section Overlay */}
        <div className="w-full animate-fade-in-up delay-500">
          <HomeCategories />
        </div>
      </div>
    </section>
  );
}
