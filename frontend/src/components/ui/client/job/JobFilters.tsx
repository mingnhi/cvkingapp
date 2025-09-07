"use client";
import React from "react";

// Define the shape of the advanced filters state
interface AdvancedFilters {
  experienceLevels: string[];
  salaryRanges: string[];
  jobTypes: string[];
  industries: string[];
}

// Props for the JobFilters component
interface JobFiltersProps {
  advancedFilters: AdvancedFilters;
  toggleAdvancedFilter: (
    category: keyof AdvancedFilters,
    value: string
  ) => void;
  clearAllFilters: () => void;
}

// Data for the filter sections
const filterData = {
  experience: ["Không yêu cầu", "1-2 năm", "3-5 năm", "5+ năm"],
  salary: ["5-10 triệu", "10-20 triệu", "20-30 triệu", "30+ triệu"],
  jobType: ["Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"],
  industry: [
    "Công nghệ thông tin",
    "Marketing & Truyền thông",
    "Tài chính & Kế toán",
    "Thiết kế",
    "Kinh doanh & Bán hàng",
  ],
};

// Reusable component for a single filter section
const FilterSection = ({
  title,
  items,
  selectedItems,
  onToggle,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}) => (
  <div>
    <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
    <div className="space-y-3">
      {items.map((item) => (
        <label
          key={item}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        >
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => onToggle(item)}
            className="rounded border-gray-300 text-[#f26b38] focus:ring-[#f26b38] focus:ring-offset-0"
          />
          <span className="text-sm text-gray-700">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

const JobFilters = ({
  advancedFilters,
  toggleAdvancedFilter,
  clearAllFilters,
}: JobFiltersProps) => {
  const activeFilterCount =
    advancedFilters.experienceLevels.length +
    advancedFilters.salaryRanges.length +
    advancedFilters.jobTypes.length +
    advancedFilters.industries.length;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Bộ Lọc</h3>
          {activeFilterCount > 0 && (
            <span className="bg-[#f26b38] text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="space-y-6">
          <FilterSection
            title="Kinh Nghiệm"
            items={filterData.experience}
            selectedItems={advancedFilters.experienceLevels}
            onToggle={(item) => toggleAdvancedFilter("experienceLevels", item)}
          />
          <FilterSection
            title="Mức Lương"
            items={filterData.salary}
            selectedItems={advancedFilters.salaryRanges}
            onToggle={(item) => toggleAdvancedFilter("salaryRanges", item)}
          />
          <FilterSection
            title="Loại Công Việc"
            items={filterData.jobType}
            selectedItems={advancedFilters.jobTypes}
            onToggle={(item) => toggleAdvancedFilter("jobTypes", item)}
          />
          <FilterSection
            title="Ngành Nghề"
            items={filterData.industry}
            selectedItems={advancedFilters.industries}
            onToggle={(item) => toggleAdvancedFilter("industries", item)}
          />
          <button
            onClick={clearAllFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Xóa Bộ Lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
