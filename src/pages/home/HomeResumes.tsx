import { useState, useEffect } from "react";
import { Briefcase, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CandidateService, type UserModel } from "../Authentication/service/Auth.Service";

export default function HomeResumes() {
  const [candidates, setCandidates] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const users = await CandidateService.getAllUsers();
        // Filter for candidates only
        const filtered = users.filter(u => u.role === "CANDIDATE").slice(0, 10);
        setCandidates(filtered);
      } catch (error) {
        console.error("Error fetching home resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, candidates.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (loading || candidates.length === 0) return null; // Hide the section if no real users are found

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              RECENT RESUMES
            </h2>
            <div className="w-12 h-0.5 bg-[#00b4d8] mt-4 mx-auto md:mx-0"></div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#00b4d8] hover:border-[#00b4d8] transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#00b4d8] hover:border-[#00b4d8] transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-12 max-w-5xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {candidates.map((candidate: any) => (
              <div
                key={candidate._id || candidate.id}
                className="flex-shrink-0 bg-white p-6 sm:p-8 border border-gray-100 flex flex-col sm:flex-row items-center justify-between hover:shadow-xl transition-all relative group"
                style={{
                  width: `calc(${100 / visibleCount}% - ${(6 * (visibleCount - 1)) / visibleCount}px)`,
                }}
              >
                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 group-hover:bg-[#00b4d8] transition-colors"></div>

                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  {/* Initials Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm flex items-center justify-center border border-gray-200 shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300">
                    <span className="text-xl font-bold text-gray-500">
                      {candidate.initials || candidate.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-[#00b4d8] transition-colors">
                      <Link to={`/candidates/${candidate._id || candidate.id}`}>
                        {candidate.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Briefcase className="w-3.5 h-3.5 text-[#ff6b6b]" />
                      <span className="text-gray-500 font-medium">
                        {candidate.professionalTitle || "Candidate"}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/candidates/${candidate._id || candidate.id}`}
                  className="bg-[#0a0e27] hover:bg-[#00b4d8] text-white text-[10px] px-5 py-2.5 rounded uppercase tracking-wider font-bold transition-all shadow-sm active:scale-95"
                >
                  VIEW PROFILE
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/candidates"
            className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-10 py-3 rounded text-sm font-bold uppercase tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  );
}
