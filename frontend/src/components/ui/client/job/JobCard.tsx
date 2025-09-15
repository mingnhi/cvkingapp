"use client";

import React from "react";
import { Bookmark, Clock, DollarSign, MapPin, Star } from "lucide-react";
import { Job, Currency } from "@/types/job.type";
import { Button, Chip, Box } from "@mui/material";

interface JobCardProps {
  job: Job;
  mode: "grid" | "list";
  onJobClick: (job: Job) => void;
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = `data:image/svg+xml;base64,${btoa(`
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#f26b38"/>
      <path d="M32 16C36.4183 16 40 19.5817 40 24V40C40 44.4183 36.4183 48 32 48C27.5817 48 24 44.4183 24 40V24C24 19.5817 27.5817 16 32 16ZM32 20C29.7909 20 28 21.7909 28 24V40C28 42.2091 29.7909 44 32 44C34.2091 44 36 42.2091 36 40V24C36 21.7909 34.2091 20 32 20Z" fill="white"/>
    </svg>
  `)}`;
};

const formatSalary = (min: string, max: string, currency: Currency): string => {
  const symbol = currency === "USD" ? "$" : "₫";
  const formatNum = (num: string) =>
    new Intl.NumberFormat("en-US").format(Number(num));
  if (min && max) {
    return `${symbol}${formatNum(min)} - ${symbol}${formatNum(max)}`;
  } else if (min) {
    return `${symbol}${formatNum(min)}`;
  } else if (max) {
    return `${symbol}${formatNum(max)}`;
  }
  return "Thỏa thuận";
};

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const JobCard = ({ job, mode, onJobClick }: JobCardProps) => {
  const GridView = () => (
    <div className="p-6 flex flex-col h-full" onClick={() => onJobClick(job)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            onError={handleImageError}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-[#f26b38] transition-colors text-base line-clamp-2">
                {job.title}
              </h3>
             
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">{job.company}</p>
          </div>
        </div>
        <Button className="text-gray-400 hover:text-[#f26b38] transition-colors flex-shrink-0 ">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>
          {job.posted && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="line-clamp-1">
                Đăng: {formatDate(job.posted)}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 min-h-[32px] items-start">
            {job.skills.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: "#fff7ed",
                  color: "#c2410c",
                  fontWeight: 500,
                  fontSize: "12px",
                  height: 26,
                  borderRadius: "9999px",
                }}
              />
            ))}
          </div>
        </div>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="auto"
          pt={2}
        >
          <Chip
            label={job.type}
            size="small"
            sx={{
              bgcolor: "#dcfce7",
              color: "#166534",
              fontWeight: 600,
              fontSize: "12px",
              height: 26,
              borderRadius: "9999px",
              px: 1.5,
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f26b38",
              "&:hover": { bgcolor: "#e55a2b" },
              textTransform: "none",
              px: 2,
              py: 0.5,
              fontWeight: 600,
              borderRadius: 2,
              fontSize: "13px",
              height: 36,
            }}
          >
            Ứng Tuyển
          </Button>
        </Box>
      </div>
    </div>
  );

  return (
    <div
      className={`group bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative ${
        mode === "grid"
          ? "flex flex-col h-full min-h-[320px]"
          : "flex items-center"
      }`}
      onClick={() => onJobClick(job)}
    >
      {job.featured && (
        <div className="absolute -top-2 -right-2 bg-[#f26b38] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star className="h-3 w-3" />
          NỔI BẬT
        </div>
      )}
      <GridView />
    </div>
  );
};

export default JobCard;
