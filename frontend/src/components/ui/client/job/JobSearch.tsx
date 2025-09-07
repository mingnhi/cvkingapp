"use client";
import React from "react";
import { Search } from "lucide-react";

interface Filters {
  keyword: string;
  location: string;
  industry: string;
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="keyword"
              placeholder="Tên công việc, kỹ năng hoặc công ty"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none"
              value={filters.keyword}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="relative">
          <select
            name="location"
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white"
            value={filters.location}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả địa điểm</option>
            <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
            <option value="hanoi">Hà Nội</option>
            <option value="da-nang">Đà Nẵng</option>
            <option value="can-tho">Cần Thơ</option>
            <option value="làm từ xa">Làm từ xa</option>
          </select>
        </div>
        <div className="relative">
          <select
            name="industry"
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26b38] focus:border-[#f26b38] outline-none custom-select appearance-none bg-white"
            value={filters.industry}
            onChange={handleFilterChange}
          >
            <option value="">Chọn ngành nghề</option>
            <option value="it">Công nghệ thông tin</option>
            <option value="marketing">Marketing & Truyền thông</option>
            <option value="finance">Tài chính & Kế toán</option>
            <option value="hr">Nhân sự</option>
            <option value="sales">Kinh doanh & Bán hàng</option>
            <option value="design">Thiết kế</option>
            <option value="education">Giáo dục</option>
            <option value="healthcare">Y tế & Chăm sóc sức khỏe</option>
            <option value="manufacturing">Sản xuất & Chế tạo</option>
            <option value="logistics">Vận tải & Logistics</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="w-full bg-[#f26b38] hover:bg-[#e55a2b] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Tìm Kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
