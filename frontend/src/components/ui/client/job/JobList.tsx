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
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface JobListProps {
  jobs: Job[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  currentPage: number;
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
    <Box className="lg:col-span-3">
      <Box className="flex items-center justify-between mb-6">
        <Box>
          <Typography variant="h5" component="h2" className="font-bold text-gray-900 mb-1">
            Việc Làm
            <Box
              component="span"
              sx={{
                backgroundColor: "#FFE8D9",
                color: "#f26b38",
                fontSize: 14,
                fontWeight: 500,
                px: 1.5,
                py: 0.5,
                ml: 2,
                borderRadius: 2,
              }}
            >
              {currentSortLabel}
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tìm thấy {jobs.length} công việc phù hợp
          </Typography>
        </Box>
        <Box className="flex items-center space-x-4">
          <Box className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Typography variant="body2" color="textSecondary">
              Sắp xếp:
            </Typography>
            <Select
              size="small"
              value={sortBy}
              onChange={(e: SelectChangeEvent) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              sx={{ minWidth: 160 }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box className="flex border rounded-lg overflow-hidden">
            <Button
              className={`p-2 min-w-0 ${
                viewMode === "grid"
                  ? "bg-[#f26b38] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-colors`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              className={`p-2 min-w-0 ${
                viewMode === "list"
                  ? "bg-[#f26b38] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-colors`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
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
      </Box>

      <Box className="flex items-center justify-between mt-8">
        <Typography variant="body2" color="textSecondary">
          Hiển thị {startIndex + 1}-
          {Math.min(startIndex + jobsPerPage, jobs.length)} của {jobs.length} công việc
        </Typography>
        <Box className="flex items-center space-x-2">
          <Button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Trước
          </Button>
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                page === currentPage
                  ? "bg-[#f26b38] text-white"
                  : "text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sau
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobList;
