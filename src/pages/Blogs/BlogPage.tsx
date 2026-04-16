import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../shared/layouts/PageWrapper";
import Loader from "../../shared/components/ui/Loader";
import usePageLoader from "../../shared/components/hooks/usePageLoader";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Calendar, User, Share2, ArrowRight, Search, Folder, ChevronRight } from "lucide-react";
import PageHeader from "../../shared/components/ui/PageHeader";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Build a High-Performance Engineering Team",
    excerpt:
      "Nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non ...",
    content: "Full blog content here",
    date: "14 April, 2026",
    category: "Career Advice",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "The Future of Remote Work in the Tech Industry",
    excerpt:
      "Explore the exciting world of graphic design and learn about career opportunities in the creative industry. This comprehensive guide covers...",
    content: "Full blog content here",
    date: "12 April, 2026",
    category: "Tech Trends",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Mastering the Art of Modern Web Design",
    excerpt:
      "The legal industry is booming with new opportunities. Learn about different legal careers and how to break into this field...",
    content: "Full blog content here",
    date: "10 April, 2026",
    category: "Design",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Navigating Your Career Path in Rwanda",
    excerpt:
      "Mainframe development is still in high demand. Discover how to start your career in mainframe programming...",
    content: "Full blog content here",
    date: "08 April, 2026",
    category: "Industry News",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  { name: "Career Advice", count: 12 },
  { name: "Tech Trends", count: 8 },
  { name: "Design", count: 5 },
  { name: "Industry News", count: 7 },
  { name: "Uncategorized", count: 2 },
];

export default function BlogPage() {
  const isLoading = usePageLoader(1000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (isLoading) {
    return <Loader />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Insights & Resources" breadcrumb="Blog" />

      {/* Main Content */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2 space-y-12">
              {paginatedPosts.length > 0 ? (
                <>
                  <div className="space-y-12">
                    {paginatedPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,180,216,0.1)] hover:border-brand-primary/20"
                      >
                        {/* Featured Image */}
                        <Link to={`/blog/${post.id}`}>
                          <div className="relative h-[22rem] overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute top-6 left-6">
                              <span className="px-4 py-1.5 bg-brand-primary/90 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                {post.category}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* Content */}
                        <div className="p-10">
                          <div className="flex items-center gap-6 text-[13px] text-slate-500 mb-6 font-medium">
                            <span className="flex items-center gap-2">
                              <Calendar size={16} className="text-brand-primary" />{" "}
                              {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                              <User size={16} className="text-brand-primary" />{" "}
                              By {post.author}
                            </span>
                          </div>

                          <Link to={`/blog/${post.id}`}>
                            <h2 className="text-3xl font-bold text-slate-900 mb-5 group-hover:text-brand-primary transition-colors cursor-pointer leading-tight font-heading">
                              {post.title}
                            </h2>
                          </Link>

                          <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                            {post.excerpt}
                          </p>

                          {/* Footer Actions */}
                          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                             <Link
                                to={`/blog/${post.id}`}
                                className="flex items-center gap-2 text-brand-primary font-bold text-sm group/link"
                              >
                                READ ARTICLE
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              </Link>

                            <div className="flex items-center gap-4">
                              <Share2 size={16} className="text-slate-400" />
                              <div className="flex items-center gap-3">
                                {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                                  <a key={i} href="#" className="text-slate-400 hover:text-brand-primary transition-colors">
                                    <Icon size={16} />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center items-center gap-3 pt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 border border-slate-200 text-slate-500 rounded-2xl hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all ${
                            currentPage === page
                              ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-110"
                              : "text-slate-500 hover:bg-white hover:text-brand-primary border border-slate-200"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 border border-slate-200 text-slate-500 rounded-2xl hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-[2rem] border border-dashed border-slate-300 p-20 text-center animate-fade-in">
                  <p className="text-slate-500 text-lg font-medium">No insights found matching your search.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-10">
              {/* Search Box */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                  <Search className="w-5 h-5 text-brand-primary" />
                  Search Articles
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-primary/50 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                  <Folder className="w-5 h-5 text-brand-primary" />
                  Categories
                </h3>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`flex items-center justify-between w-full group transition-all p-3 rounded-xl hover:bg-slate-50 ${
                        selectedCategory === cat.name ? "bg-slate-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight
                          size={16}
                          className={`transition-transform duration-300 ${
                            selectedCategory === cat.name ? "text-brand-primary rotate-90" : "text-slate-300 group-hover:translate-x-1"
                          }`}
                        />
                        <span className={`text-sm font-medium ${
                          selectedCategory === cat.name ? "text-brand-primary" : "text-slate-600 group-hover:text-slate-900"
                        }`}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-brand-dark rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/20 transition-all duration-700"></div>
                 <h3 className="text-2xl font-bold mb-4 font-heading z-10 relative">Stay Ahead of the Curve</h3>
                 <p className="text-slate-400 text-sm mb-8 z-10 relative leading-relaxed">
                   Get the latest career advice and industry news delivered directly to your inbox.
                 </p>
                 <div className="space-y-4 z-10 relative">
                   <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-brand-primary/50 transition-all text-sm font-medium"
                   />
                   <button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-primary/20 active:scale-95 uppercase tracking-widest text-xs">
                     Subscribe Now
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
