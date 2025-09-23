"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Job, JobFilters } from "@/types/job.type";
import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import { Button, MenuItem, Select } from "@mui/material";
import { JobCard } from "./JobCard";

interface JobListProps {
  jobs: Job[];
  filters: JobFilters;
  searchQuery: string;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

type ViewMode = "grid" | "list";

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "salary-high", label: "Lương cao nhất" },
  { value: "salary-low", label: "Lương thấp nhất" },
  { value: "views", label: "Nhiều lượt xem" },
];

export function JobList({
  jobs,
  filters,
  searchQuery,
  onApply,
  onSave,
}: JobListProps) {
  // ✅ mặc định sắp xếp "Mới nhất"
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.shortDescription.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.name.toLowerCase().includes(query))
      );
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((job) => filters.type.includes(job.jobType));
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter((job) =>
        filters.category.some((cat) => cat.id === job.categoryId)
      );
    }

    if (filters.location.length > 0) {
      filtered = filtered.filter((job) =>
        filters.location.some((loc) =>
          job.location.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // ✅ sắp xếp theo sortBy
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
          );
        case "salary-high":
          return (b.salaryMax ?? 0) - (a.salaryMax ?? 0);
        case "salary-low":
          return (a.salaryMax ?? 0) - (b.salaryMax ?? 0);
        case "views":
          return (b.viewsCount ?? 0) - (a.viewsCount ?? 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, filters, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/50 backdrop-blur-sm rounded-lg p-4 border"
      >
        <div className="flex items-center gap-4">
          <h2>{filteredAndSortedJobs.length} việc làm được tìm thấy</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "contained" : "outlined"}
              color="warning"
              size="small"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "contained" : "outlined"}
              color="warning"
              size="small"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select
            value={sortBy}
            size="small"
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                sortOptions.find((o) => o.value === selected)?.label
              ) : (
                <span style={{ color: "#9e9e9e" }}>Mới nhất</span>
              )
            }
            onChange={(e) => setSortBy(e.target.value)}
            MenuProps={{ disableScrollLock: true }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </motion.div>

      {/* Job Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAndSortedJobs.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredAndSortedJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onApply={onApply}
                onSave={onSave}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <List className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2">Không tìm thấy việc làm phù hợp</h3>
              <p className="text-muted-foreground">
                Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để tìm thấy
                nhiều cơ hội việc làm hơn.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
