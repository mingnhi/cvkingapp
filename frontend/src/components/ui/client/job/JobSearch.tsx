"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { TextField, MenuItem } from "@mui/material";

interface Filters {
  keyword: string;
  location: string;
  industry: string;
  type?: string;
  mode?: string;
  level?: string;
  status?: string;
}

interface JobSearchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleSearch: () => void;
  setCurrentPage: (page: number) => void;
}

const JobSearch = ({
  filters,
  setFilters,
  handleSearch,
  setCurrentPage,
}: JobSearchProps) => {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const selectSx = {
    backgroundColor: "#f3f4f6", // Tailwind's bg-gray-100
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Keyword Input */}
        <div className="md:col-span-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="keyword"
              placeholder="Tên công việc, kỹ năng hoặc công ty"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none border border-transparent"
              value={filters.keyword}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Location */}
        <TextField
          select
          label="Địa điểm"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          fullWidth
          size="small"
          sx={selectSx}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="ho-chi-minh">TP. Hồ Chí Minh</MenuItem>
          <MenuItem value="hanoi">Hà Nội</MenuItem>
          <MenuItem value="da-nang">Đà Nẵng</MenuItem>
          <MenuItem value="can-tho">Cần Thơ</MenuItem>
          <MenuItem value="remote">Làm từ xa</MenuItem>
        </TextField>

        {/* Type */}
        <TextField
          select
          label="Loại việc làm"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          fullWidth
          size="small"
          sx={selectSx}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Toàn thời gian">Toàn thời gian</MenuItem>
          <MenuItem value="Bán thời gian">Bán thời gian</MenuItem>
          <MenuItem value="Hợp đồng">Hợp đồng</MenuItem>
        </TextField>

        {/* Level */}
        <TextField
          select
          label="Cấp bậc"
          name="level"
          value={filters.level}
          onChange={handleFilterChange}
          fullWidth
          size="small"
          sx={selectSx}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Junior">Cấp thấp</MenuItem>
          <MenuItem value="Mid">Cấp giữa</MenuItem>
          <MenuItem value="Senior">Cấp cao</MenuItem>
        </TextField>

        {/* Search Button */}
        <div>
          <button
            onClick={handleSearch}
            className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-[11px] px-6 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
