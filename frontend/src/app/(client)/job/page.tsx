"use client";
import React, { useState } from "react";
import { Job } from "@/types/job.type";
import BreadcrumbTabActive from "@/components/ui/common/breadcrumb/BreadcrumbTabActive";
import JobSearch from "@/components/ui/client/job/JobSearch";
import ActiveFilters from "@/components/ui/client/job/ActiveFilters";
import JobFilters from "@/components/ui/client/job/JobFilters";
import JobList from "@/components/ui/client/job/JobList";
import { useRouter } from "next/navigation";
// Mock data chuẩn với type Job
const jobs: Job[] = [
  {
    id: 1,
    slug: "lap-trinh-vien-frontend-senior",
    title: "Lập Trình Viên Frontend Senior",
    company: "TechCorp Vietnam",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face",
    location: "TP. Hồ Chí Minh",
    salaryMin: "20000000",
    salaryMax: "30000000",
    salaryCurrency: "VND",
    type: "Toàn thời gian",
    mode: "Hybrid",
    level: "Senior",
    expires: "2025-10-06",
    posted: "2025-09-06",
    skills: ["React", "TypeScript", "Remote"],
    description:
      "Chúng tôi đang tìm kiếm một Lập trình viên Frontend Senior để gia nhập đội ngũ năng động...",
    urgent: false,
    featured: true,
    status: "active",
  },
  {
    id: 2,
    slug: "quan-ly-san-pham",
    title: "Quản Lý Sản Phẩm",
    company: "StartupVN",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=face",
    location: "Hà Nội",
    salaryMin: "25000000",
    salaryMax: "40000000",
    salaryCurrency: "VND",
    type: "Toàn thời gian",
    mode: "Văn phòng",
    level: "Mid",
    expires: "2025-10-15",
    posted: "2025-09-07",
    skills: ["Chiến lược", "Phân tích", "Agile"],
    description:
      "Tham gia đội ngũ sản phẩm để thúc đẩy sự đổi mới và tăng trưởng...",
    urgent: true,
    featured: false,
    status: "active",
  },
  {
    id: 3,
    slug: "thiet-ke-ux-ui",
    title: "Thiết Kế UX/UI",
    company: "Design Studio",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    location: "Đà Nẵng",
    salaryMin: "12000000",
    salaryMax: "20000000",
    salaryCurrency: "VND",
    type: "Bán thời gian",
    mode: "Remote",
    level: "Junior",
    expires: "2025-09-30",
    posted: "2025-09-05",
    skills: ["Figma", "Design System", "Prototype"],
    description:
      "Tạo ra những trải nghiệm người dùng tuyệt vời cho các sản phẩm số...",
    urgent: false,
    featured: true,
    status: "active",
  },
];

const JobsPage = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    industry: "",
  });

  const [advancedFilters, setAdvancedFilters] = useState({
    experienceLevels: [] as string[],
    salaryRanges: [] as string[],
    jobTypes: [] as string[],
    industries: [] as string[],
  });
  const jobsPerPage = 9;

  // Filtering and Sorting Logic
  const filteredJobs = jobs.filter((job) => {
    const keywordMatch =
      filters.keyword === "" ||
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      job.skills.some((tag) =>
        tag.toLowerCase().includes(filters.keyword.toLowerCase())
      );

    const locationMatch =
      filters.location === "" ||
      (filters.location === "ho-chi-minh" &&
        job.location.toLowerCase().includes("hồ chí minh")) ||
      (filters.location === "hanoi" &&
        job.location.toLowerCase().includes("hà nội")) ||
      (filters.location === "da-nang" &&
        job.location.toLowerCase().includes("đà nẵng")) ||
      (filters.location === "can-tho" &&
        job.location.toLowerCase().includes("cần thơ")) ||
      (filters.location === "làm từ xa" &&
        job.location.toLowerCase().includes("làm từ xa"));

    const industryMatch =
      filters.industry === "" ||
      (filters.industry === "it" &&
        (job.title.toLowerCase().includes("developer") ||
          job.title.toLowerCase().includes("lập trình") ||
          job.skills.some((tag) =>
            ["react", "node.js", "python"].includes(tag.toLowerCase())
          ))) ||
      (filters.industry === "design" &&
        job.title.toLowerCase().includes("thiết kế")) ||
      (filters.industry === "marketing" &&
        job.title.toLowerCase().includes("marketing"));

    const experienceMatch =
      advancedFilters.experienceLevels.length === 0 ||
      advancedFilters.experienceLevels.includes(job.level || "");

    const salaryMatch =
      advancedFilters.salaryRanges.length === 0 ||
      advancedFilters.salaryRanges.some((range) => {
        const min = parseInt(job.salaryMin) / 1000000;
        const max = parseInt(job.salaryMax) / 1000000;
        if (range === "5-10 triệu") return max >= 5 && min <= 10;
        if (range === "10-20 triệu") return max >= 10 && min <= 20;
        if (range === "20-30 triệu") return max >= 20 && min <= 30;
        if (range === "30+ triệu") return min >= 30;
        return false;
      });

    const jobTypeMatch =
      advancedFilters.jobTypes.length === 0 ||
      advancedFilters.jobTypes.includes(job.type);

    return (
      keywordMatch &&
      locationMatch &&
      industryMatch &&
      experienceMatch &&
      salaryMatch &&
      jobTypeMatch
    );
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.posted || "").getTime() -
          new Date(a.posted || "").getTime()
        );
      case "salary-high":
        return parseInt(b.salaryMax) - parseInt(a.salaryMax);
      case "salary-low":
        return parseInt(a.salaryMin) - parseInt(b.salaryMin);
      default:
        return 0;
    }
  });

  // Handlers
  const handleJobClick = (job: Job) => {
    console.log("Navigating to job details:", job);
    router.push(`/job/${job.slug}`);
  };

  const toggleAdvancedFilter = (
    category: keyof typeof advancedFilters,
    value: string
  ) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ keyword: "", location: "", industry: "" });
    setAdvancedFilters({
      experienceLevels: [],
      salaryRanges: [],
      jobTypes: [],
      industries: [],
    });
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BreadcrumbTabActive items={[{ name: "Việc làm" }]} />
        </div>

        <JobSearch
          filters={filters}
          setFilters={setFilters}
          handleSearch={handleSearch}
          setCurrentPage={setCurrentPage}
        />

        <ActiveFilters
          filters={filters}
          advancedFilters={advancedFilters}
          setFilters={setFilters}
          toggleAdvancedFilter={toggleAdvancedFilter}
          clearAllFilters={clearAllFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <JobFilters
            advancedFilters={advancedFilters}
            toggleAdvancedFilter={toggleAdvancedFilter}
            clearAllFilters={clearAllFilters}
          />

          <JobList
            jobs={sortedJobs}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            jobsPerPage={jobsPerPage}
            onJobClick={handleJobClick}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
