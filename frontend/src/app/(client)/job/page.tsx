"use client";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Grid,
  List,
  Bookmark,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import BreadcrumbTabActive from "@/components/ui/common/breadcrumb/BreadcrumbTabActive";

const JobsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    industry: "",
    salary: "",
    experience: "",
    company: "",
  });
  const jobsPerPage = 12;

  // Fixed mock data without random values
  const jobs = [
    {
      id: 1,
      title: "Lập Trình Viên Frontend Senior",
      company: "TechCorp Vietnam",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: "TP. Hồ Chí Minh",
      salary: "20 - 30 triệu",
      type: "Toàn thời gian",
      experience: "3-5 năm",
      posted: "2 ngày trước",
      tags: ["React", "TypeScript", "Remote"],
      description:
        "Chúng tôi đang tìm kiếm một Lập trình viên Frontend Senior để gia nhập đội ngũ năng động...",
      urgent: false,
      featured: true,
    },
    {
      id: 2,
      title: "Quản Lý Sản Phẩm",
      company: "StartupVN",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
      location: "Hà Nội",
      salary: "18 - 25 triệu",
      type: "Toàn thời gian",
      experience: "2-4 năm",
      posted: "1 ngày trước",
      tags: ["Chiến lược", "Phân tích", "Agile"],
      description:
        "Tham gia đội ngũ sản phẩm để thúc đẩy sự đổi mới và tăng trưởng...",
      urgent: true,
      featured: false,
    },
    {
      id: 3,
      title: "Thiết Kế UX/UI",
      company: "Design Studio",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      location: "Đà Nẵng",
      salary: "12 - 20 triệu",
      type: "Bán thời gian",
      experience: "1-3 năm",
      posted: "3 ngày trước",
      tags: ["Figma", "Design System", "Prototype"],
      description:
        "Tạo ra những trải nghiệm người dùng tuyệt vời cho các sản phẩm số...",
      urgent: false,
      featured: true,
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      title: `${
        [
          "Fullstack Developer",
          "Data Scientist",
          "DevOps Engineer",
          "Backend Developer",
          "Mobile Developer",
        ][i % 5]
      }`,
      company: `${
        [
          "TechViet Corp",
          "Innovation Hub",
          "Digital Solutions",
          "Smart Systems",
          "Future Tech",
        ][i % 5]
      }`,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
      location: [
        "TP. Hồ Chí Minh",
        "Hà Nội",
        "Đà Nẵng",
        "Cần Thơ",
        "Làm từ xa",
      ][i % 5],
      salary: `${10 + (i % 5) * 3} - ${20 + (i % 5) * 4} triệu`,
      type: ["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"][i % 4],
      experience: ["1-2 năm", "2-4 năm", "3-5 năm", "5+ năm"][i % 4],
      posted: `${(i % 7) + 1} ngày trước`,
      tags: [
        ["React", "TypeScript", "Remote"],
        ["Node.js", "API", "GraphQL"],
        ["Python", "AI", "Machine Learning"],
        ["Java", "Spring", "Microservices"],
        ["Swift", "iOS", "Mobile"],
      ][i % 5],
      description: "Mô tả công việc chi tiết cho vị trí này...",
      urgent: i % 6 === 0,
      featured: i % 8 === 0,
    })),
  ];

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      (filters.location === "" ||
        job.location
          .toLowerCase()
          .includes(filters.location.toLowerCase().replace(/-/g, " ")))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxPagesToShow);
      start = 1;
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleJobClick = (job: any) => {
    console.log("Chuyển đến chi tiết công việc:", job);
  };

  // Helper function to handle image error
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="#f26b38"/>
        <path d="M32 16C36.4183 16 40 19.5817 40 24V40C40 44.4183 36.4183 48 32 48C27.5817 48 24 44.4183 24 40V24C24 19.5817 27.5817 16 32 16ZM32 20C29.7909 20 28 21.7909 28 24V40C28 42.2091 29.7909 44 32 44C34.2091 44 36 42.2091 36 40V24C36 21.7909 34.2091 20 32 20Z" fill="white"/>
      </svg>
    `)}`;
  };

  const JobCard = ({ job, mode }: { job: any; mode: "grid" | "list" }) => (
    <div
      className={`group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
        mode === "grid" ? "flex flex-col h-full" : "flex items-center"
      } ${job.featured ? "ring-2 ring-orange-200" : ""}`}
      onClick={() => handleJobClick(job)}
    >
      {job.featured && (
        <div className="absolute -top-2 -right-2 bg-[#f26b38] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star className="h-3 w-3" />
          NỔI BẬT
        </div>
      )}

      {mode === "list" ? (
        <div className="p-6 w-full flex items-center min-h-[120px]">
          {/* Left section - Logo, Title, Company */}
          <div className="flex items-center gap-4 flex-shrink-0 w-80">
            <div className="flex-shrink-0">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-1">
                  {job.title}
                </h3>
                {job.urgent && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                    URGENT
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-1">
                {job.company}
              </p>
            </div>
          </div>

          {/* Center section - Job Details */}
          <div className="flex-1 px-6 hidden lg:block">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.posted}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="bg-orange-50 text-[#f26b38] text-xs px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-gray-400 hover:text-[#f26b38] transition-colors p-2">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="bg-[#f26b38] hover:bg-[#e55a2b] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              Ứng Tuyển
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-1">
                    {job.title}
                  </h3>
                  {job.urgent && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {job.company}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0 p-1">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>

          {/* Content Section - Fixed height for alignment */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="line-clamp-1">{job.posted}</span>
              </div>
            </div>

            {/* Tags Section - Fixed height */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 min-h-[32px] items-start">
                {job.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-orange-50 text-[#f26b38] text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between mt-auto pt-4">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  job.type === "Toàn thời gian"
                    ? "bg-green-50 text-green-700"
                    : job.type === "Bán thời gian"
                    ? "bg-blue-50 text-blue-700"
                    : job.type === "Hợp đồng"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.type}
              </span>
              <button className="bg-[#f26b38] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ứng Tuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BreadcrumbTabActive items={[{ name: "Việc làm" }]} />
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#f26b38] via-orange-600 to-red-600 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          </div>

          <div className="absolute top-10 left-10 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex-1 max-w-3xl">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                  🚀 Cơ hội việc làm hấp dẫn
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Tìm việc làm
                  <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                    mơ ước của bạn
                  </span>
                </h1>
                <p className="text-xl text-orange-100 mb-8 leading-relaxed max-w-2xl">
                  Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu.
                  Tìm kiếm theo vị trí, mức lương, và kỹ năng phù hợp với bạn.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="group bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <div className="text-white">
                    <span className="text-2xl font-bold block">
                      {filteredJobs.length}+
                    </span>
                    <span className="text-orange-100 text-sm">Việc làm</span>
                  </div>
                </div>
                <div className="group bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <div className="text-white">
                    <span className="text-2xl font-bold block">500+</span>
                    <span className="text-orange-100 text-sm">Công ty</span>
                  </div>
                </div>
                <div className="group bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 cursor-pointer">
                  <div className="text-white">
                    <span className="text-2xl font-bold block">98%</span>
                    <span className="text-orange-100 text-sm">Thành công</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden xl:block relative">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>

                <div className="absolute top-8 left-8 right-8 bottom-8 bg-white/5 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <Search className="h-12 w-12 text-orange-700" />
                    </div>
                    <p className="text-white font-semibold text-lg">
                      Tìm kiếm thông minh
                    </p>
                    <p className="text-orange-200 text-sm mt-2">
                      AI-powered matching
                    </p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#f26b38] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IT</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        Frontend Dev
                      </p>
                      <p className="text-xs text-gray-500">25-30M VND</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg animate-float delay-1000">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">UX</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        UX Designer
                      </p>
                      <p className="text-xs text-gray-500">18-25M VND</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-16 -left-8 bg-white rounded-lg p-3 shadow-lg animate-float delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PM</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        Product Mgr
                      </p>
                      <p className="text-xs text-gray-500">30-40M VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">1,234 ứng viên đang online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">156 việc mới hôm nay</span>
                </div>
              </div>
              <button className="bg-white text-[#f26b38] px-8 py-3 rounded-full font-semibold hover:bg-orange-50 hover:scale-105 transform transition-all duration-200 shadow-lg">
                Khám phá ngay →
              </button>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(1deg);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .delay-500 {
            animation-delay: 0.5s;
          }
          .delay-1000 {
            animation-delay: 1s;
          }
        `}</style>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tên công việc, kỹ năng hoặc công ty"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none"
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters({ ...filters, keyword: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <select
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none"
                value={filters.location}
                onChange={(e) => {
                  setFilters({ ...filters, location: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả địa điểm</option>
                <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                <option value="hanoi">Hà Nội</option>
                <option value="da-nang">Đà Nẵng</option>
                <option value="can-tho">Cần Thơ</option>
                <option value="làm từ xa">Làm từ xa</option>
              </select>
            </div>
            <div>
              <select
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none"
                value={filters.industry}
                onChange={(e) =>
                  setFilters({ ...filters, industry: e.target.value })
                }
              >
                <option value="">Chọn ngành nghề</option>
                <option value="it">Công nghệ thông tin</option>
                <option value="marketing">Marketing & Truyền thông</option>
                <option value="finance">Tài chính & Kế toán</option>
                <option value="hr">Nhân sự</option>
                <option value="sales">Kinh doanh & Bán hàng</option>
                <option value="design">Thiết kế</option>
                <option value="education">Giáo dục</option>
                <option value="healthcare">Y tế & Chăm sóc sức khỏe</option>
                <option value="manufacturing">Sản xuất & Chế tạo</option>
                <option value="logistics">Vận tải & Logistics</option>
              </select>
            </div>
            <div>
              <button className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-6">Bộ Lọc</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Kinh Nghiệm
                  </h4>
                  <div className="space-y-3">
                    {["Không yêu cầu", "1-2 năm", "3-5 năm", "5+ năm"].map(
                      (level) => (
                        <label
                          key={level}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38]"
                          />
                          <span className="text-sm text-gray-700">{level}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Mức Lương</h4>
                  <div className="space-y-3">
                    {[
                      "5-10 triệu",
                      "10-20 triệu",
                      "20-30 triệu",
                      "30+ triệu",
                    ].map((range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38]"
                        />
                        <span className="text-sm text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Loại Công Việc
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Toàn thời gian",
                      "Bán thời gian",
                      "Hợp đồng",
                      "Freelance",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38]"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Ngành Nghề</h4>
                  <div className="space-y-3">
                    {[
                      "Công nghệ thông tin",
                      "Marketing & Truyền thông",
                      "Tài chính & Kế toán",
                      "Thiết kế",
                      "Kinh doanh & Bán hàng",
                    ].map((industry) => (
                      <label
                        key={industry}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38]"
                        />
                        <span className="text-sm text-gray-700">
                          {industry}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Xóa Bộ Lọc
                </button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Việc Làm
                  <span className="bg-orange-100 text-[#f26b38] text-sm font-medium px-2 py-1 rounded-full ml-3">
                    Mới nhất
                  </span>
                </h2>
                <p className="text-gray-600">
                  Tìm thấy {filteredJobs.length} công việc phù hợp
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none">
                  <option value="newest">Mới nhất</option>
                  <option value="salary-high">Lương: Cao đến thấp</option>
                  <option value="salary-low">Lương: Thấp đến cao</option>
                  <option value="relevance">Liên quan nhất</option>
                </select>
                <div className="flex border rounded-lg">
                  <button
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-[#f26b38] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-l-lg transition-colors`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-[#f26b38] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-r-lg transition-colors`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} mode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1}-
                {Math.min(startIndex + jobsPerPage, filteredJobs.length)} của{" "}
                {filteredJobs.length} công việc
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-[#f26b38] text-white"
                        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
