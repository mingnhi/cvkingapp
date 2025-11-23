"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Grid as GridIcon,
  List as ListIcon,
  Users,
  Star,
} from "lucide-react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Pagination,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  CardMedia,
  Divider,
  RadioGroup,
  Radio,
} from "@mui/material";

// --- DỮ LIỆU CHO CÁC BỘ LỌC ---
const industryOptions = [
  { value: "Công nghệ", label: "Công nghệ" },
  { value: "Tài chính", label: "Tài chính" },
  { value: "Năng lượng", label: "Năng lượng" },
  { value: "Vận tải", label: "Vận tải" },
  { value: "Y tế", label: "Y tế" },
  { value: "Giáo dục", label: "Giáo dục" },
  { value: "Bất động sản", label: "Bất động sản" },
  { value: "Bán lẻ", label: "Bán lẻ" },
];

const Locations = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "TP. Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const companySizeOptions = [
  "20-50",
  "50-100",
  "100-200",
  "200-500",
  "500-1000",
  "1000+",
  "2000+",
  "5000+",
  "10000+",
];

const benefitOptions = [
  "Bảo hiểm sức khỏe",
  "Làm việc từ xa",
  "Ngày nghỉ linh hoạt",
  "Trợ cấp ăn trưa",
  "Lương tháng 13",
];

const ratingOptions = [
  { value: "4", label: "Từ 4 sao trở lên" },
  { value: "3", label: "Từ 3 sao trở lên" },
  { value: "2", label: "Từ 2 sao trở lên" },
  { value: "1", label: "Từ 1 sao trở lên" },
  { value: "all", label: "Tất cả" },
];

const ListCompanyPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const companiesPerPage = 9;

  const allCompanies = [
    {
      id: 1,
      name: "Tập đoàn Sáng tạo TechCorp",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=face",
      industry: "Công nghệ",
      location: "TP. Hồ Chí Minh",
      employees: "500-1000",
      jobs: 15,
      rating: 2.8,
      reviews: 125,
      isTopCompany: true,
      benefits: ["Bảo hiểm sức khỏe", "Làm việc từ xa", "Lương tháng 13"],
      description:
        "Đi đầu trong lĩnh vực chuyển đổi số và các giải pháp phần mềm cho doanh nghiệp.",
    },
    {
      id: 2,
      name: "Giải pháp FinaBank",
      logo: "https://images.unsplash.com/photo-1549924231-f97d98355f1d?w=120&h=120&fit=crop&crop=face",
      industry: "Tài chính",
      location: "Hà Nội",
      employees: "1000+",
      jobs: 8,
      rating: 4.5,
      reviews: 98,
      isTopCompany: false,
      benefits: ["Bảo hiểm sức khỏe", "Trợ cấp ăn trưa"],
      description:
        "Cung cấp các dịch vụ tài chính, ngân hàng số và bảo hiểm uy tín hàng đầu.",
    },
    {
      id: 3,
      name: "EcoPower Việt Nam",
      logo: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=120&h=120&fit=crop&crop=face",
      industry: "Năng lượng",
      location: "Đà Nẵng",
      employees: "200-500",
      jobs: 12,
      rating: 4.7,
      reviews: 76,
      isTopCompany: false,
      benefits: ["Ngày nghỉ linh hoạt", "Làm việc từ xa"],
      description:
        "Phát triển các dự án năng lượng tái tạo, vì một tương lai xanh và bền vững.",
    },
    {
      id: 4,
      name: "LogiChain Express",
      logo: "https://plus.unsplash.com/premium_photo-1661304547035-3c9b5ba69622?w=120&h=120&fit=crop&crop=face",
      industry: "Vận tải",
      location: "Hải Phòng",
      employees: "1000+",
      jobs: 20,
      rating: 4.4,
      reviews: 110,
      isTopCompany: true,
      benefits: ["Lương tháng 13", "Trợ cấp ăn trưa"],
      description:
        "Hệ thống logistics thông minh, kết nối toàn quốc và quốc tế.",
    },
    {
      id: 5,
      name: "Sáng tạo MediaZ",
      logo: "https://images.unsplash.com/photo-1579591903931-bf4cac3343a9?w=120&h=120&fit=crop&crop=face",
      industry: "Truyền thông",
      location: "TP. Hồ Chí Minh",
      employees: "50-100",
      jobs: 5,
      rating: 4.9,
      reviews: 85,
      isTopCompany: false,
      benefits: ["Làm việc từ xa", "Ngày nghỉ linh hoạt"],
      description:
        "Agency chuyên cung cấp các giải pháp marketing và thương hiệu toàn diện.",
    },
    {
      id: 6,
      name: "VinHealth Care",
      logo: "https://images.unsplash.com/photo-1581093450021-4a7360e9a1c8?w=120&h=120&fit=crop&crop=face",
      industry: "Y tế",
      location: "Hà Nội",
      employees: "2000+",
      jobs: 30,
      rating: 4.6,
      reviews: 250,
      isTopCompany: true,
      benefits: ["Bảo hiểm sức khỏe", "Lương tháng 13", "Trợ cấp ăn trưa"],
      description:
        "Hệ thống y tế chất lượng cao, ứng dụng công nghệ hiện đại vào chẩn đoán.",
    },
    {
      id: 7,
      name: "Global Invest",
      logo: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=120&h=120&fit=crop&crop=face",
      industry: "Tài chính",
      location: "TP. Hồ Chí Minh",
      employees: "100-200",
      jobs: 9,
      rating: 4.7,
      reviews: 60,
      isTopCompany: false,
      benefits: ["Bảo hiểm sức khỏe", "Ngày nghỉ linh hoạt"],
      description:
        "Quỹ đầu tư mạo hiểm tập trung vào các startup công nghệ tiềm năng.",
    },
    {
      id: 8,
      name: "NextGen Software",
      logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&crop=face",
      industry: "Công nghệ",
      location: "Đà Nẵng",
      employees: "100-200",
      jobs: 18,
      rating: 4.8,
      reviews: 95,
      isTopCompany: false,
      benefits: ["Làm việc từ xa", "Lương tháng 13"],
      description:
        "Gia công phần mềm và phát triển các sản phẩm SaaS cho thị trường quốc tế.",
    },
    {
      id: 9,
      name: "BuildRight Construction",
      logo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=120&fit=crop&crop=face",
      industry: "Xây dựng",
      location: "Bình Dương",
      employees: "500-1000",
      jobs: 22,
      rating: 4.3,
      reviews: 130,
      isTopCompany: false,
      benefits: ["Trợ cấp ăn trưa"],
      description:
        "Tổng thầu xây dựng các dự án công nghiệp và dân dụng chất lượng cao.",
    },
    {
      id: 10,
      name: "GreenFarm Organics",
      logo: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=120&h=120&fit=crop&crop=face",
      industry: "Nông nghiệp",
      location: "Cần Thơ",
      employees: "50-100",
      jobs: 7,
      rating: 4.9,
      reviews: 70,
      isTopCompany: false,
      benefits: ["Ngày nghỉ linh hoạt"],
      description:
        "Nông trại hữu cơ cung cấp thực phẩm sạch đạt chuẩn quốc tế.",
    },
    {
      id: 11,
      name: "Tân Cảng Sài Gòn",
      logo: "https://plus.unsplash.com/premium_photo-1663050763910-2d897a883907?w=120&h=120&fit=crop&crop=face",
      industry: "Vận tải",
      location: "TP. Hồ Chí Minh",
      employees: "5000+",
      jobs: 45,
      rating: 4.7,
      reviews: 320,
      isTopCompany: true,
      benefits: ["Bảo hiểm sức khỏe", "Lương tháng 13"],
      description: "Nhà khai thác cảng container lớn nhất Việt Nam.",
    },
    {
      id: 12,
      name: "Khách sạn Majestic",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop&crop=face",
      industry: "Du lịch",
      location: "TP. Hồ Chí Minh",
      employees: "200-500",
      jobs: 14,
      rating: 4.6,
      reviews: 180,
      isTopCompany: false,
      benefits: ["Trợ cấp ăn trưa", "Lương tháng 13"],
      description:
        "Khách sạn 5 sao cổ điển với tầm nhìn ra sông Sài Gòn.",
    },
    {
      id: 13,
      name: "Bất động sản Novaland",
      logo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&h=120&fit=crop&crop=face",
      industry: "Bất động sản",
      location: "TP. Hồ Chí Minh",
      employees: "1000+",
      jobs: 25,
      rating: 4.2,
      reviews: 210,
      isTopCompany: true,
      benefits: ["Bảo hiểm sức khỏe", "Ngày nghỉ linh hoạt"],
      description:
        "Tập đoàn đầu tư và phát triển bất động sản uy tín tại Việt Nam.",
    },
    {
      id: 14,
      name: "Đại học RMIT",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&h=120&fit=crop&crop=face",
      industry: "Giáo dục",
      location: "Hà Nội",
      employees: "500-1000",
      jobs: 11,
      rating: 4.8,
      reviews: 150,
      isTopCompany: false,
      benefits: ["Làm việc từ xa", "Bảo hiểm sức khỏe"],
      description:
        "Trường đại học quốc tế hàng đầu với các chương trình đào tạo đa dạng.",
    },
    {
      id: 15,
      name: "Thế Giới Di Động",
      logo: "https://plus.unsplash.com/premium_photo-1681487814165-72043a637a17?w=120&h=120&fit=crop&crop=face",
      industry: "Bán lẻ",
      location: "TP. Hồ Chí Minh",
      employees: "10000+",
      jobs: 100,
      rating: 4.5,
      reviews: 500,
      isTopCompany: true,
      benefits: ["Lương tháng 13", "Bảo hiểm sức khỏe", "Trợ cấp ăn trưa"],
      description:
        "Chuỗi bán lẻ thiết bị di động và điện máy số 1 Việt Nam.",
    },
    {
      id: 16,
      name: "Xưởng phim Phương Nam",
      logo: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=120&h=120&fit=crop&crop=face",
      industry: "Giải trí",
      location: "TP. Hồ Chí Minh",
      employees: "100-200",
      jobs: 6,
      rating: 4.3,
      reviews: 45,
      isTopCompany: false,
      benefits: ["Ngày nghỉ linh hoạt"],
      description:
        "Studio sản xuất phim và các chương trình truyền hình nổi tiếng.",
    },
    {
      id: 17,
      name: "Nội thất Hoà Phát",
      logo: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=120&h=120&fit=crop&crop=face",
      industry: "Sản xuất",
      location: "Hưng Yên",
      employees: "2000+",
      jobs: 35,
      rating: 4.6,
      reviews: 280,
      isTopCompany: true,
      benefits: ["Trợ cấp ăn trưa", "Lương tháng 13"],
      description:
        "Thương hiệu nội thất văn phòng và gia đình hàng đầu Việt Nam.",
    },
    {
      id: 18,
      name: "Vườn ươm Khởi nghiệp Đà Nẵng",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120&h=120&fit=crop&crop=face",
      industry: "Công nghệ",
      location: "Đà Nẵng",
      employees: "20-50",
      jobs: 3,
      rating: 4.9,
      reviews: 30,
      isTopCompany: false,
      benefits: ["Làm việc từ xa", "Ngày nghỉ linh hoạt"],
      description:
        "Hỗ trợ và đầu tư cho các công ty khởi nghiệp công nghệ tại miền Trung.",
    },
  ];

  // 1. State cho các input của thanh tìm kiếm chính
  const [mainFilterInputs, setMainFilterInputs] = useState({
    keyword: "",
    location: "",
    industry: "",
  });
  // 2. State cho các input của bộ lọc chi tiết (sidebar)
  const [sidebarFilters, setSidebarFilters] = useState({
    companySizes: [] as string[],
    benefits: [] as string[],
    rating: "all",
  });
  // 3. Kết quả sau khi bấm "Tìm kiếm"
  const [searchedCompanies, setSearchedCompanies] =
    useState(allCompanies);
  // 4. Kết quả cuối cùng hiển thị
  const [displayedCompanies, setDisplayedCompanies] =
    useState(allCompanies);

  const handleMainFilterChange = (e: any) => {
    const { name, value } = e.target;
    setMainFilterInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSidebarCheckboxChange = (e: any) => {
    const { name, value, checked } = e.target;
    setSidebarFilters((prev) => {
      const list = prev[name] as string[];
      if (checked) return { ...prev, [name]: [...list, value] };
      return {
        ...prev,
        [name]: list.filter((item) => item !== value),
      };
    });
  };

  const handleSidebarRadioChange = (e: any) => {
    setSidebarFilters((prev) => ({ ...prev, rating: e.target.value }));
  };

  // 5. Khi bấm nút Tìm kiếm
  const handleSearchClick = () => {
    let result = allCompanies;
    if (mainFilterInputs.keyword) {
      const keywordLower = mainFilterInputs.keyword.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(keywordLower) ||
          company.industry.toLowerCase().includes(keywordLower)
      );
    }
    if (mainFilterInputs.location) {
      result = result.filter(
        (company) => company.location === mainFilterInputs.location
      );
    }
    if (mainFilterInputs.industry) {
      result = result.filter(
        (company) => company.industry === mainFilterInputs.industry
      );
    }
    setSearchedCompanies(result);
    setCurrentPage(1);
  };

  // 6. Lọc theo sidebar
  useEffect(() => {
    let result = searchedCompanies;
    if (sidebarFilters.companySizes.length > 0) {
      result = result.filter((company) =>
        sidebarFilters.companySizes.includes(company.employees)
      );
    }
    if (sidebarFilters.benefits.length > 0) {
      result = result.filter((company) =>
        sidebarFilters.benefits.every((benefit) =>
          company.benefits.includes(benefit)
        )
      );
    }
    if (sidebarFilters.rating && sidebarFilters.rating !== "all") {
      result = result.filter(
        (company) =>
          company.rating >= parseFloat(sidebarFilters.rating)
      );
    }
    setDisplayedCompanies(result);
    setCurrentPage(1);
  }, [searchedCompanies, sidebarFilters]);

  const totalPages = Math.ceil(
    displayedCompanies.length / companiesPerPage
  );
  const currentCompanies = displayedCompanies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  return (
    <Box sx={{ bgcolor: "#f3f4f6", py: 4 }}>
      {/* SEARCH BAR */}
      <Box sx={{ width: "1520px", mx: "auto", px: 3 }}>
        <Card
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr auto" },
            boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
            border: "1px solid #e5e7eb",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1fr 1fr auto",
              },
              gap: 2.5,
              alignItems: "center",
            }}
          >
            {/* keyword */}
            <TextField
            name="keyword"
            value={mainFilterInputs.keyword}
            onChange={handleMainFilterChange}
            placeholder="Company name or industry"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <Search size={18} />
                </InputAdornment>
                ),
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                bgcolor: "#f5f5f7",
                borderRadius: 2,
                "& fieldset": { border: "none" },
                },
            }}
            />

            {/* location */}
            <FormControl
        fullWidth
        sx={{
            "& .MuiOutlinedInput-root": {
            bgcolor: "#f5f5f7",
            borderRadius: 2,
            "& fieldset": { border: "none" },
            },
        }}
        >
        <Select
            name="location"
            value={mainFilterInputs.location}
            onChange={handleMainFilterChange}
            displayEmpty
            renderValue={(selected) =>
            selected === "" ? (
                <Typography sx={{ color: "text.secondary" }}>
                All locations
                </Typography>
            ) : (
                selected as string
            )
            }
        >
            <MenuItem value="">
            <Typography color="text.secondary">All locations</Typography>
            </MenuItem>
            {Locations.map((location) => (
            <MenuItem key={location} value={location}>
                {location}
            </MenuItem>
            ))}
        </Select>
        </FormControl>

            {/* industry */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  "&.MuiInputLabel-root": {
                    color: "#9ca3af",
                  },
                }}
              >
                Industry
              </InputLabel>
              <Select
                name="industry"
                value={mainFilterInputs.industry}
                onChange={handleMainFilterChange}
                label="Industry"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f5f5f7",
                  },
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": {
                    border: "2px solid #ff7a2b",
                    bgcolor: "#ffffff",
                  },
                }}
              >
                <MenuItem value="">
                  <em>All industries</em>
                </MenuItem>
                {industryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* search button */}
            <Button
              onClick={handleSearchClick}
              variant="contained"
              sx={{
                height: 56,
                textTransform: "none",
                borderRadius: 3,
                px: 5,
                fontWeight: 600,
                fontSize: 16,
                bgcolor: "#ff7a2b",
                // boxShadow: "0 10px 30px rgba(255,122,43,0.4)",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  bgcolor: "#f16311",
                //   boxShadow: "0 12px 36px rgba(241,99,17,0.5)",
                },
              }}
            >
              <Search size={18} />
              Search
            </Button>
          </Box>
        </Card>
      </Box>

      {/* BODY */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          width: "1520px",
          mx: "auto",
          px: 3,
        }}
      >
        {/* FILTERS SIDEBAR */}
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            width: { xs: "100%", md: "22%" },
            alignSelf: "flex-start",
            boxShadow: "0 16px 40px rgba(15,23,42,0.06)",
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Filters
          </Typography>

          {/* Company size */}
          <Typography
            fontWeight="medium"
            sx={{ mb: 1.5, fontSize: 14, color: "#4b5563" }}
          >
            Company Size
          </Typography>
          {companySizeOptions.map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  name="companySizes"
                  value={size}
                  onChange={handleSidebarCheckboxChange}
                  size="small"
                />
              }
              label={`${size} nhân viên`}
              sx={{
                display: "block",
                "& .MuiTypography-root": { fontSize: 14 },
              }}
            />
          ))}

          <Divider sx={{ my: 3 }} />

          {/* Rating */}
          <Typography
            fontWeight="medium"
            sx={{ mb: 1.5, fontSize: 14, color: "#4b5563" }}
          >
            Rating
          </Typography>
          <FormControl>
            <RadioGroup
              name="rating"
              value={sidebarFilters.rating}
              onChange={handleSidebarRadioChange}
            >
              {ratingOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={option.label}
                  sx={{
                    "& .MuiTypography-root": { fontSize: 14 },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Benefits */}
          <Typography
            fontWeight="medium"
            sx={{ mb: 1.5, fontSize: 14, color: "#4b5563" }}
          >
            Benefits
          </Typography>
          {benefitOptions.map((benefit) => (
            <FormControlLabel
              key={benefit}
              control={
                <Checkbox
                  name="benefits"
                  value={benefit}
                  onChange={handleSidebarCheckboxChange}
                  size="small"
                />
              }
              label={benefit}
              sx={{
                display: "block",
                "& .MuiTypography-root": { fontSize: 14 },
              }}
            />
          ))}
        </Card>

        {/* LIST */}
        <Box sx={{ width: { xs: "100%", md: "75%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography>
              Hiển thị <strong>{displayedCompanies.length}</strong> công ty
            </Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_e, newMode) =>
                newMode && setViewMode(newMode)
              }
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {currentCompanies.length > 0 ? (
            viewMode === "grid" ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                {currentCompanies.map((company) => {
                  const baseCardSx = {
                    display: "flex",
                    flexDirection: "column" as const,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "#e5e7eb",
                    bgcolor: "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  };

                  const hoverCardSx = {
                    borderColor: "#ff8a2b",
                    bgcolor: "#ffffff",
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                  };

                  return (
                    <Card
                      key={company.id}
                      onClick={() =>
                        router.push(`/companies/${company.id}`)
                      }
                      sx={{
                        ...baseCardSx,
                        "&:hover": hoverCardSx,
                      }}
                    >
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: 3,
                          alignItems: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={company.logo}
                          sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            mb: 2,
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 1.5,
                            minHeight: 40,
                          }}
                        >
                          <Typography
                            fontWeight="bold"
                            component="h3"
                            sx={{ textAlign: "center" }}
                          >
                            {company.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.75,
                            my: 1,
                            color: "text.secondary",
                            fontSize: 14,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <MapPin size={16} />
                            <Typography variant="body2">
                              {company.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Users size={16} />
                            <Typography variant="body2">
                              {company.employees} nhân viên
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Star size={16} />
                            <Typography variant="body2">
                              {company.rating} sao ({company.reviews} đánh
                              giá)
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            mb: 2,
                            minHeight: 40,
                          }}
                        >
                          {company.description}
                        </Typography>

                        <Divider sx={{ my: 1.5, width: "100%" }} />

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/companies/${company.id}`);
                          }}
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            borderRadius: 999,
                            border: "1px solid #ff8a2b",
                            color: "#ff8a2b",
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            bgcolor: "transparent",
                            "&:hover": {
                              bgcolor: "#ff8a2b",
                              color: "#ffffff",
                            },
                          }}
                        >
                          Xem {company.jobs} việc làm
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {currentCompanies.map((company) => (
                  <Card
                    key={company.id}
                    sx={{
                      borderRadius: 2,
                      transition: "0.2s",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        p: 2,
                        gap: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={company.logo}
                        onClick={() =>
                          router.push(`/company/${company.id}`)
                        }
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1.5,
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flexGrow: 1, width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            onClick={() =>
                              router.push(`/company/${company.id}`)
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            {company.name}
                          </Typography>
                          {company.isTopCompany && (
                            <Chip
                              label="Công ty hàng đầu"
                              color="info"
                              size="small"
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {company.industry}
                        </Typography>
                        <Box
                          sx={{
                            color: "text.secondary",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <MapPin size={16} />
                            <Typography variant="body2">
                              {company.location}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Users size={16} />
                            <Typography variant="body2">
                              {company.employees} nhân viên
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Star size={16} />
                            <Typography variant="body2">
                              {company.rating} sao
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: "italic" }}
                        >
                          {company.description}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() =>
                          router.push(`/company/${company.id}/jobs`)
                        }
                        sx={{
                          mt: { xs: 2, sm: 0 },
                          textTransform: "none",
                          bgcolor: "#000",
                          "&:hover": { bgcolor: "#333" },
                          flexShrink: 0,
                        }}
                      >
                        Xem {company.jobs} việc làm
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )
          ) : (
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6">
                Không tìm thấy công ty phù hợp
              </Typography>
              <Typography color="text.secondary">
                Vui lòng thử lại với các từ khóa hoặc bộ lọc khác.
              </Typography>
            </Card>
          )}

          {displayedCompanies.length > companiesPerPage && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ListCompanyPage;
