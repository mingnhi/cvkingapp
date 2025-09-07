import React from "react";
import SearchSection from "@/components/ui/client/home/SearchSection";
import JobsSection from "@/components/ui/client/home/JobsSection";
import CompaniesSection from "@/components/ui/client/home/CompaniesSection";
import { HeroSection, TodayJobsStatSection } from "@/components/ui/client/home";


const HomePage = () => {
  return (
    <>
      <div className="w-[1520px] mx-auto">
        <HeroSection />
        <SearchSection />
        <JobsSection />
        <CompaniesSection />
        <TodayJobsStatSection />

</div>
    </>
  );
};

export default HomePage;
