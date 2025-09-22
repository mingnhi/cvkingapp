"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Box, Container, Typography } from "@mui/material";
import { HeroSection } from "@/components/ui/client/job/HeroSection";
import { JobFilters } from "@/components/ui/client/job/JobFilters";
import { JobList } from "@/components/ui/client/job/JobList";
import { FeaturedCompanies } from "@/components/ui/client/job/FeaturedCompanies";
import { JobFilters as JobFiltersType } from "@/types/job.type";
import { mockCategories, mockCompanies, mockJobs } from "@/faker/data";

const JobsPage = () => {
  const [filters, setFilters] = useState<JobFiltersType>({
    type: [],
    location: [],
    experience: [],
    salaryRange: [],
    category: [],
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleApply = (jobId: string) => {
    const job = mockJobs.find((j) => j.id === jobId);
    if (job) {
      // Notification will be handled by Material UI Snackbar
      console.log(
        `Applied to: ${job.title} at ${job.company?.name || "Company"}`
      );
    }
  };

  const handleSave = (jobId: string) => {
    const job = mockJobs.find((j) => j.id === jobId);
    if (job) {
      // Notification will be handled by Material UI Snackbar
      console.log(`Saved job: ${job.title}`);
    }
  };

  const handleSearch = (
    query: string,
    location?: string,
    category?: string
  ) => {
    setSearchQuery(query);

    // Update filters based on search
    const newFilters = { ...filters };

    if (location && location.trim()) {
      if (!newFilters.location.includes(location)) {
        newFilters.location = [...newFilters.location, location];
      }
    }

    if (category && category.trim()) {
      const categoryObj = mockCategories.find(
        (c) => c.name.toLowerCase() === category.toLowerCase()
      );
      if (
        categoryObj &&
        !newFilters.category.find((c) => c.id === categoryObj.id)
      ) {
        newFilters.category = [...newFilters.category, categoryObj];
      }
    }

    setFilters(newFilters);
    const el = document.getElementById("job-results");
    if (el) {
      // dùng rAF để đảm bảo DOM đã render sau khi setState (an toàn hơn)
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const featuredCompanies = mockCompanies.map((company) => ({
    name: company.name,
    logo: company.logo,
    rating: company.rating,
  }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <HeroSection
        onSearch={handleSearch}
        totalJobs={mockJobs.length}
        featuredCompanies={featuredCompanies}
      />

      {/* Featured Companies Section */}
      <FeaturedCompanies companies={mockCompanies.slice(0, 6)} />

      {/* Main Job Listing Section */}
      <Box component="main" id="job-results">
        <Container maxWidth="xl" className="py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h3"
                component="h3"
                className="mb-2 text-xl font-bold"
              >
                Danh sách việc làm
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: "600px", mx: "auto" }}
              >
                Tìm kiếm và ứng tuyển vào các vị trí phù hợp với kỹ năng và kinh
                nghiệm của bạn
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 4,
            }}
          >
            {/* Filters Sidebar */}
            <Box sx={{ width: { lg: "320px" }, flexShrink: 0 }}>
              <JobFilters
                filters={filters}
                categories={mockCategories}
                onFiltersChange={setFilters}
                onSearch={setSearchQuery}
              />
            </Box>

            {/* Job List */}
            <Box sx={{ flex: 1 }}>
              <JobList
                jobs={mockJobs}
                filters={filters}
                searchQuery={searchQuery}
                onApply={handleApply}
                onSave={handleSave}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default JobsPage;
