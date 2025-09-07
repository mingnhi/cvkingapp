"use client";
import React from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import { Job } from "@/types/job.type";
import JobCard from "./JobCard";

// Props for the JobList component
interface JobListProps {
  jobs: Job[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  currentPage: number;
  // Allow both a number and a state update function
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  jobsPerPage: number;
  onJobClick: (job: Job) => void;
}

const JobList = ({
  jobs,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  currentPage,
  setCurrentPage,
  jobsPerPage,
  onJobClick,
}: JobListProps) => {
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  // Function to generate pagination numbers
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

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "salary-high", label: "Lương: Cao đến thấp" },
    { value: "salary-low", label: "Lương: Thấp đến cao" },
    { value: "relevant", label: "Liên quan nhất" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Mới nhất";

  return (
    <div className="lg:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Việc Làm
            <span className="bg-orange-100 text-[#f26b38] text-sm font-medium px-2 py-1 rounded-full ml-3">
              {currentSortLabel}
            </span>
          </h2>
          <p className="text-gray-600">
            Tìm thấy {jobs.length} công việc phù hợp
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Sắp xếp:</span>
            <select
              className="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white min-w-[180px]"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            : "space-y-4"
        }
      >
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            mode={viewMode}
            onJobClick={onJobClick}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-gray-600">
          Hiển thị {startIndex + 1}-
          {Math.min(startIndex + jobsPerPage, jobs.length)} của {jobs.length}{" "}
          công việc
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
  );
};

export default JobList;
