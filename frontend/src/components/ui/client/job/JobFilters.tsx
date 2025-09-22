"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { JobFilters as JobFiltersType, JobCategory } from "@/types/job.type";
import { Search, Filter, X } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface JobFiltersProps {
  filters: JobFiltersType;
  categories: JobCategory[];
  onFiltersChange: (filters: JobFiltersType) => void;
  onSearch: (query: string) => void;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const experienceLevels = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Executive",
];
const salaryRanges = [
  "Under $50K",
  "$50K - $75K",
  "$75K - $100K",
  "$100K - $150K",
  "Above $150K",
];

export function JobFilters({
  filters,
  categories,
  onFiltersChange,
  onSearch,
}: JobFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery("(min-width:768px)", { noSsr: true });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const show = isExpanded || isDesktop;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const addFilter = (
    type: keyof JobFiltersType,
    value: string | JobCategory
  ) => {
    const newFilters = { ...filters };
    if (type === "category") {
      const categoryValue = value as JobCategory;
      if (!newFilters.category.find((c) => c.id === categoryValue.id)) {
        newFilters.category = [...newFilters.category, categoryValue];
      }
    } else {
      const stringValue = value as string;
      if (!newFilters[type].includes(stringValue)) {
        newFilters[type] = [...newFilters[type], stringValue];
      }
    }
    onFiltersChange(newFilters);
  };

  const removeFilter = (type: keyof JobFiltersType, value: string) => {
    const newFilters = { ...filters };
    if (type === "category") {
      newFilters.category = newFilters.category.filter((c) => c.id !== value);
    } else {
      newFilters[type] = newFilters[type].filter((item) => item !== value);
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      type: [],
      location: [],
      experience: [],
      salaryRange: [],
      category: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="sticky top-4">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h3>Bộ lọc tìm kiếm</h3>
            </div>
          }
          action={
            <Button
              variant="outlined"
              size="small"
              color="warning"
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
              }}
            >
              {isExpanded ? (
                <X className="w-4 h-4" />
              ) : (
                <Filter className="w-4 h-4" />
              )}
            </Button>
          }
        />

        <CardContent>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm công việc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 1,
                  height: 40,
                }}
              />
            </div>
            <Button type="submit" size="small" variant="contained" color="warning">
              Tìm
            </Button>
          </form>
        </CardContent>

        <motion.div
          initial={false}
          animate={{
            height: mounted ? (show ? "auto" : 0) : 0,
            opacity: mounted ? (show ? 1 : 0) : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:h-auto md:opacity-100"
        >
          <CardContent className="space-y-6">
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Bộ lọc đang áp dụng:</span>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearAllFilters}
                    className="text-xs h-6 px-2"
                  >
                    Xóa tất cả
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {filters.type.map((type) => (
                    <Badge key={type} variant="standard" className="text-xs">
                      {type}
                      <Button
                        onClick={() => removeFilter("type", type)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.category.map((cat) => (
                    <Badge key={cat.id} variant="standard" className="text-xs">
                      {cat.name}
                      <Button
                        onClick={() => removeFilter("category", cat.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.experience.map((exp) => (
                    <Badge key={exp} variant="standard" className="text-xs">
                      {exp}
                      <Button
                        onClick={() => removeFilter("experience", exp)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.salaryRange.map((range) => (
                    <Badge key={range} variant="standard" className="text-xs">
                      {range}
                      <Button
                        onClick={() => removeFilter("salaryRange", range)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
            <div>
              <label className="text-sm mb-2 block">Loại công việc</label>
              <Select
                value=""
                className="w-full"
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    (selected as string)
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>Chọn loại</span>
                  )
                }
                onChange={(e: SelectChangeEvent<string>) => {
                  const v = e.target.value as string;
                  if (v) addFilter("type", v);
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="" disabled sx={{ display: "none" }}>
                  Chọn loại
                </MenuItem>
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm mb-2 block">Danh mục</label>
              <Select
                value=""
                className="w-full"
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    categories.find((c) => c.id === selected)?.name ?? ""
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>Chọn danh mục</span>
                  )
                }
                onChange={(e: SelectChangeEvent<string>) => {
                  const id = e.target.value as string;
                  const cat = categories.find((c) => c.id === id);
                  if (cat) addFilter("category", cat);
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="" disabled sx={{ display: "none" }}>
                  Chọn danh mục
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm mb-2 block">Kinh nghiệm</label>
              <Select
                value=""
                className="w-full"
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    (selected as string)
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>Chọn kinh nghiệm</span>
                  )
                }
                onChange={(e: SelectChangeEvent<string>) => {
                  const v = e.target.value as string;
                  if (v) addFilter("experience", v);
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="" disabled sx={{ display: "none" }}>
                  Chọn kinh nghiệm
                </MenuItem>
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm mb-2 block">Mức lương</label>
              <Select
                value=""
                className="w-full"
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    (selected as string)
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>Chọn mức lương</span>
                  )
                }
                onChange={(e: SelectChangeEvent<string>) => {
                  const v = e.target.value as string;
                  if (v) addFilter("salaryRange", v);
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="" disabled sx={{ display: "none" }}>
                  Chọn mức lương
                </MenuItem>
                {salaryRanges.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm mb-2 block">Địa điểm</label>
              <Input
                placeholder="Nhập địa điểm..."
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    addFilter("location", value);
                  }
                }}
              />
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
