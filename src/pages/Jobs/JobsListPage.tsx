import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../../shared/layouts/PageWrapper";
import Loader from "../../shared/components/ui/Loader";
import usePageLoader from "../../shared/components/hooks/usePageLoader";
import JobCard from "../../shared/components/ui/JobCard";
import PageHeader from "../../shared/components/ui/PageHeader";
import { Search, MapPin, Briefcase, Filter, X, ChevronRight, ChevronLeft, LayoutGrid, List as ListIcon } from "lucide-react";

import { getAllJobs, type JobData } from "../Jobs/service/jobService";

export default function JobsListPage() {
  const isLoading = usePageLoader(1000);
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters from fetched jobs
  const uniqueLocations = useMemo(
    () =>
      [
        ...new Set(
          jobs.map(
            (job) => job.location?.split(",").pop()?.trim() || job.location,
          ),
        ),
      ]
        .filter(Boolean)
        .sort(),
    [jobs],
  );
  const uniqueJobTypes = useMemo(
    () =>
      [...new Set(jobs.map((job) => job.jobType || job.type))]
        .filter(Boolean)
        .sort(),
    [jobs],
  );
  const uniqueCategories = useMemo(
    () => [...new Set(jobs.map((job) => job.category))].filter(Boolean).sort(),
    [jobs],
  );

  const ITEMS_PER_PAGE = 5;

  // Filter States initialized from searchParams
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || "",
  );
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const initialCategory = searchParams.get("category");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );

  // Sync with URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        job.location?.toLowerCase().includes(selectedLocation.toLowerCase());

      const jobType = job.jobType || job.type || "";
      const matchesType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(jobType);

      const jobCategory = job.category || "";
      const jobTags = job.tags || [];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (cat) =>
            jobCategory.toLowerCase().includes(cat.toLowerCase()) ||
            (Array.isArray(jobTags) &&
              jobTags.some((tag: string) =>
                tag.toLowerCase().includes(cat.toLowerCase()),
              )),
        );

      return matchesSearch && matchesLocation && matchesType && matchesCategory;
    });
  }, [
    jobs,
    searchQuery,
    selectedLocation,
    selectedJobTypes,
    selectedCategories,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Discover Your Next Opportunity" breadcrumb="Jobs" />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setIsFilterSidebarOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-2xl font-bold text-slate-700 shadow-sm"
          >
            <Filter className="w-4 h-4 text-brand-primary" />
            Filter Jobs
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className={`
            fixed inset-0 z-50 lg:relative lg:z-0 lg:block lg:w-1/4
            ${isFilterSidebarOpen ? "block" : "hidden"}
          `}>
            {/* Mobile Overlay */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsFilterSidebarOpen(false)}
            ></div>

            <div className="relative bg-white h-full lg:h-auto overflow-y-auto lg:overflow-visible w-80 max-w-[90%] lg:w-full ml-auto lg:ml-0 p-8 lg:p-0 lg:bg-transparent shadow-2xl lg:shadow-none">
              <div className="flex items-center justify-between mb-8 lg:hidden">
                <h3 className="text-xl font-bold font-heading">Filters</h3>
                <button onClick={() => setIsFilterSidebarOpen(false)} className="p-2 bg-slate-100 rounded-xl">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-8 bg-white lg:p-8 lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-6 font-heading flex items-center gap-2">
                    <Search className="w-5 h-5 text-brand-primary" />
                    Keywords
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all text-sm font-medium"
                      placeholder="Job title or company"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-6 font-heading flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                    Location
                  </h3>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all text-sm font-medium cursor-pointer appearance-none"
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((loc, idx) => (
                      <option key={idx} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-6 font-heading flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-brand-primary" />
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {uniqueCategories.map((category: any) => (
                      <label key={category} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category || "")}
                            onChange={() => handleCategoryChange(category || "")}
                            className="w-5 h-5 rounded-lg border-slate-300 text-brand-primary focus:ring-brand-primary/20 transition-all cursor-pointer"
                          />
                        </div>
                        <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-brand-primary transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-6 font-heading flex items-center gap-2">
                    <Filter className="w-5 h-5 text-brand-primary" />
                    Job Type
                  </h3>
                  <div className="space-y-3">
                    {uniqueJobTypes.map((type) => (
                      <label key={type} className="flex items-center group cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedJobTypes.includes(type || "")}
                          onChange={() => handleJobTypeChange(type || "")}
                          className="w-5 h-5 rounded-lg border-slate-300 text-brand-primary focus:ring-brand-primary/20 transition-all cursor-pointer"
                        />
                        <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-brand-primary transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("");
                    setSelectedCategories([]);
                    setSelectedJobTypes([]);
                    setCurrentPage(1);
                  }}
                  className="w-full mt-4 bg-slate-50 text-slate-500 py-3.5 rounded-2xl hover:bg-slate-100 hover:text-slate-700 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 mb-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-brand-primary/10 rounded-xl">
                    <Briefcase className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium">
                    Showing <span className="text-slate-900 font-bold">{paginatedJobs.length}</span> of <span className="text-slate-900 font-bold">{filteredJobs.length}</span> results
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button className="p-2 rounded-lg bg-white shadow-sm text-brand-primary"><LayoutGrid className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600"><ListIcon className="w-4 h-4" /></button>
                  </div>
                  <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary/50 transition-all text-sm font-bold text-slate-700 cursor-pointer">
                    <option>Sort by: Latest</option>
                    <option>Sort by: Salary</option>
                    <option>Sort by: Relevant</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job: any) => (
                  <JobCard
                  key={job._id || job.id}
                  job={
                    {
                      ...job,
                      id: job._id || job.id || "",
                      company:
                        typeof job.employerId === "object"
                          ? (job.employerId as any).companyName
                          : job.company || "Unknown",
                      location:
                        job.location ||
                        (typeof job.employerId === "object"
                          ? (job.employerId as any).location
                          : "Remote"),
                      logo:
                        typeof job.employerId === "object"
                          ? (job.employerId as any).logo
                          : job.logo || "",
                      logoBg: job.logoBg || "bg-slate-50",
                      type: job.jobType || job.type || "Full Time",
                      typeBg: job.typeBg || "bg-brand-primary/10 text-brand-primary",
                      salary: job.salary || "Negotiable",
                      tags: job.tags || [],
                      employerId:
                        typeof job.employerId === "object"
                          ? (job.employerId as any)._id
                          : job.employerId || "",
                      title: job.title || "Untitled Job",
                    } as any
                  }
                />
                ))
              ) : (
                <div className="bg-white rounded-[2rem] border border-dashed border-slate-300 p-16 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading">No matching jobs found</h3>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLocation("");
                      setSelectedCategories([]);
                      setSelectedJobTypes([]);
                    }}
                    className="px-8 py-3 bg-brand-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-1 px-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                          currentPage === page
                            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-110"
                            : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
