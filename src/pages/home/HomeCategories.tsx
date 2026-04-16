import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobCategories } from "../Jobs/service/jobService";
import { 
  Code, 
  Database, 
  Stethoscope, 
  Palette, 
  BarChart, 
  Globe, 
  ArrowUpRight,
  Monitor,
  Tv
} from "lucide-react";

const categoryIcons: { [key: string]: any } = {
  "Technology": Code,
  "Developer": Code,
  "Accounting": BarChart,
  "Medical": Stethoscope,
  "Design": Palette,
  "Marketing": Globe,
  "IT Company": Monitor,
  "Media": Tv,
};

export default function HomeCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    getJobCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {categories.map((cat) => {
        const Icon = categoryIcons[cat.name] || Database;
        return (
          <div
            key={cat.name}
            onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
            className="group flex flex-col p-6 rounded-3xl cursor-pointer transition-all duration-300 glass-dark border border-white/5 hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
              <Icon className="w-6 h-6 text-brand-primary group-hover:text-white" />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors">{cat.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{cat.count} Open Positions</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-brand-primary transition-colors" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
