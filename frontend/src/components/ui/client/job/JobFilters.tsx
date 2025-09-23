"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
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
import { JobFilters as JobFiltersType, JobCategory } from "@/types/job.type";

interface JobFiltersProps {
  filters: JobFiltersType;
  categories: JobCategory[];
  onFiltersChange: (filters: JobFiltersType) => void;
  onSearch: (query: string) => void;
}

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance"];
const EXP_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Executive"];
const SALARY_RANGES = [
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
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((a) => a.length > 0),
    [filters]
  );

  // helpers
  const addFilter = (
    type: keyof JobFiltersType,
    value: string | JobCategory
  ) => {
    const next = { ...filters };
    if (type === "category") {
      const v = value as JobCategory;
      if (!next.category.some((c) => c.id === v.id))
        next.category = [...next.category, v];
    } else {
      const v = String(value);
      if (!next[type].includes(v)) next[type] = [...next[type], v];
    }
    onFiltersChange(next);
  };

  const removeFilter = (type: keyof JobFiltersType, value: string) => {
    const next = { ...filters };
    if (type === "category")
      next.category = next.category.filter((c) => c.id !== value);
    else next[type] = next[type].filter((v) => v !== value);
    onFiltersChange(next);
  };

  const clearAll = () =>
    onFiltersChange({
      type: [],
      location: [],
      experience: [],
      salaryRange: [],
      category: [],
    });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // small, reusable Select
  const SelectFilter = ({
    label,
    placeholder,
    items,
    onPick,
  }: {
    label: string;
    placeholder: string;
    items: { value: string; label: string }[];
    onPick: (val: string) => void;
  }) => (
    <div>
      <label className="text-sm mb-2 block">{label}</label>
      <Select
        value=""
        className="w-full"
        displayEmpty
        renderValue={(selected) =>
          selected ? (
            items.find((i) => i.value === selected)?.label ?? ""
          ) : (
            <span style={{ color: "#9e9e9e" }}>{placeholder}</span>
          )
        }
        onChange={(e: SelectChangeEvent<string>) => {
          const v = e.target.value as string;
          if (v) onPick(v);
        }}
        MenuProps={{ disableScrollLock: true }}
      >
        <MenuItem value="" disabled sx={{ display: "none" }}>
          {placeholder}
        </MenuItem>
        {items.map((it) => (
          <MenuItem key={it.value} value={it.value}>
            {it.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );

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
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              {isExpanded ? (
                <X className="w-4 h-4" />
              ) : (
                <Filter className="w-4 h-4" />
              )}
            </Button>
          }
        />

        {/* Search */}
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
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="warning"
            >
              Tìm
            </Button>
          </form>
        </CardContent>

        {/* Filters */}
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
                    onClick={clearAll}
                    className="text-xs h-6 px-2"
                  >
                    Xóa tất cả
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {filters.type.map((v) => (
                    <Badge key={v} variant="standard" className="text-xs">
                      {v}
                      <Button
                        onClick={() => removeFilter("type", v)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.category.map((c) => (
                    <Badge key={c.id} variant="standard" className="text-xs">
                      {c.name}
                      <Button
                        onClick={() => removeFilter("category", c.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.experience.map((v) => (
                    <Badge key={v} variant="standard" className="text-xs">
                      {v}
                      <Button
                        onClick={() => removeFilter("experience", v)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.salaryRange.map((v) => (
                    <Badge key={v} variant="standard" className="text-xs">
                      {v}
                      <Button
                        onClick={() => removeFilter("salaryRange", v)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Selects */}
            <SelectFilter
              label="Loại công việc"
              placeholder="Chọn loại"
              items={JOB_TYPES.map((v) => ({ value: v, label: v }))}
              onPick={(v) => addFilter("type", v)}
            />

            <SelectFilter
              label="Danh mục"
              placeholder="Chọn danh mục"
              items={categories.map((c) => ({ value: c.id, label: c.name }))}
              onPick={(id) => {
                const cat = categories.find((c) => c.id === id);
                if (cat) addFilter("category", cat);
              }}
            />

            <SelectFilter
              label="Kinh nghiệm"
              placeholder="Chọn kinh nghiệm"
              items={EXP_LEVELS.map((v) => ({ value: v, label: v }))}
              onPick={(v) => addFilter("experience", v)}
            />

            <SelectFilter
              label="Mức lương"
              placeholder="Chọn mức lương"
              items={SALARY_RANGES.map((v) => ({ value: v, label: v }))}
              onPick={(v) => addFilter("salaryRange", v)}
            />

            {/* Location */}
            <div>
              <label className="text-sm mb-2 block">Địa điểm</label>
              <Input
                placeholder="Nhập địa điểm..."
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const v = (e.target as HTMLInputElement).value.trim();
                    if (v) {
                      addFilter("location", v);
                      (e.target as HTMLInputElement).value = "";
                    }
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
