"use client";
import React from "react";

// Define the shape of the filter states
interface Filters {
  keyword: string;
  location: string;
  industry: string;
}

interface AdvancedFilters {
  experienceLevels: string[];
  salaryRanges: string[];
  jobTypes: string[];
  industries: string[];
}

// Props for the ActiveFilters component
interface ActiveFiltersProps {
  filters: Filters;
  advancedFilters: AdvancedFilters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleAdvancedFilter: (
    category: keyof AdvancedFilters,
    value: string
  ) => void;
  clearAllFilters: () => void;
}

const ActiveFilters = ({
  filters,
  advancedFilters,
  setFilters,
  toggleAdvancedFilter,
  clearAllFilters,
}: ActiveFiltersProps) => {
  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.industry ||
    advancedFilters.experienceLevels.length > 0 ||
    advancedFilters.salaryRanges.length > 0 ||
    advancedFilters.jobTypes.length > 0 ||
    advancedFilters.industries.length > 0;

  if (!hasActiveFilters) {
    return null; // Don't render anything if no filters are active
  }

  // Helper to render a single filter tag
  const FilterTag = ({
    label,
    value,
    onRemove,
    color,
  }: {
    label?: string;
    value: string;
    onRemove: () => void;
    color: string;
  }) => (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {label && <span className="mr-1">{label}:</span>}
      {value}
      <button
        onClick={onRemove}
        className={`ml-1.5 text-${color}-500 hover:text-${color}-700`}
      >
        &times;
      </button>
    </span>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Bộ lọc đang áp dụng:
          </span>
          {filters.keyword && (
            <FilterTag
              value={`"${filters.keyword}"`}
              onRemove={() => setFilters({ ...filters, keyword: "" })}
              color="blue"
            />
          )}
          {filters.location && (
            <FilterTag
              label="Địa điểm"
              value={
                filters.location.charAt(0).toUpperCase() +
                filters.location.slice(1).replace(/-/g, " ")
              }
              onRemove={() => setFilters({ ...filters, location: "" })}
              color="green"
            />
          )}
          {filters.industry && (
            <FilterTag
              label="Ngành"
              value={
                filters.industry === "it"
                  ? "Công nghệ thông tin"
                  : filters.industry
              }
              onRemove={() => setFilters({ ...filters, industry: "" })}
              color="purple"
            />
          )}
          {advancedFilters.experienceLevels.map((level) => (
            <FilterTag
              key={level}
              value={level}
              onRemove={() => toggleAdvancedFilter("experienceLevels", level)}
              color="orange"
            />
          ))}
          {advancedFilters.salaryRanges.map((range) => (
            <FilterTag
              key={range}
              value={range}
              onRemove={() => toggleAdvancedFilter("salaryRanges", range)}
              color="yellow"
            />
          ))}
          {advancedFilters.jobTypes.map((type) => (
            <FilterTag
              key={type}
              value={type}
              onRemove={() => toggleAdvancedFilter("jobTypes", type)}
              color="indigo"
            />
          ))}
          {advancedFilters.industries.map((industry) => (
            <FilterTag
              key={industry}
              value={industry}
              onRemove={() => toggleAdvancedFilter("industries", industry)}
              color="pink"
            />
          ))}
        </div>
        <button
          onClick={clearAllFilters}
          className="text-sm text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;
