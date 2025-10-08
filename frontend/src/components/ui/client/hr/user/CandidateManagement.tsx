"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  UserCheck,
} from "lucide-react";

import { useMyProfileQuery } from "@/api/user/query";
import { useJobApplicationsByCompanyQuery } from "@/api/JobApplication/query";
import { useEmployerProfileByUserIdQuery } from "@/api/employer-profile/query";

const statusMap = {
  Pending: { label: "Mới", icon: <AlertCircle size={14} />, color: "primary" },
  Reviewed: { label: "Đạt yêu cầu", icon: <Star size={14} />, color: "info" },
  Interview: {
    label: "Đã phỏng vấn",
    icon: <UserCheck size={14} />,
    color: "secondary",
  },
  Rejected: { label: "Từ chối", icon: <XCircle size={14} />, color: "error" },
  Hired: { label: "Đã tuyển", icon: <CheckCircle size={14} />, color: "success" },
} as const;

interface Candidate {
  id: string;
  jobId: string;
  jobSeekerId: string;
  fullName: string;
  email: string;
  status: string;
  jobTitle: string;
  companyName: string;
  location: string;
  experienceYears: number;
  appliedAt: string;
}

const getStatusChip = (status: keyof typeof statusMap) => {
  const statusInfo =
    statusMap[status] || {
      label: status,
      icon: null,
      color: "default" as const,
    };
  return (
    <Chip
      label={statusInfo.label}
      icon={statusInfo.icon}
      color={statusInfo.color}
      size="small"
    />
  );
};

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: user, isLoading: loadingUser } = useMyProfileQuery();
  const userId = user?.id;
  const { data: employerProfile, isLoading: loadingEmployer } =
    useEmployerProfileByUserIdQuery(userId);
  const companyId = employerProfile?.company;

  const {
    data: applications = [],
    isLoading: loadingCandidates,
    error,
  } = useJobApplicationsByCompanyQuery(companyId);

  if (error) console.error("❌ Query error:", error);

  console.log("🧩 Normalized API:", applications);

  const candidates = useMemo((): Candidate[] => {
    return applications.map((a: any, index: number) => ({
      id: a.id ?? `app-${index}`,
      jobId: a.jobId ?? "",
      jobSeekerId: a.jobSeekerId ?? "",
      fullName: a.fullName ?? "Ứng viên chưa có tên",
      email: a.email ?? "Chưa cập nhật",
      status: a.status ?? "Pending",
      jobTitle: a.jobTitle ?? "Chưa cập nhật",
      companyName: a.companyName ?? "Chưa có tên công ty",
      location: a.location ?? "Chưa cập nhật",
      experienceYears: a.experienceYears ?? 0,
      appliedAt: a.appliedAt ?? new Date().toISOString(),
    }));
  }, [applications]);

  const filteredCandidates = useMemo(() => {
    if (!searchTerm) return candidates;
    const lower = searchTerm.toLowerCase();
    return candidates.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(lower) ||
        c.jobTitle?.toLowerCase().includes(lower)
    );
  }, [candidates, searchTerm]);

  const stats = useMemo(() => {
    return {
      moi: candidates.filter((c) => c.status === "Pending").length,
      dat_yeu_cau: candidates.filter((c) => c.status === "Reviewed").length,
      da_phong_van: candidates.filter((c) => c.status === "Interview").length,
      da_tuyen: candidates.filter((c) => c.status === "Hired").length,
    };
  }, [candidates]);

  if (loadingUser || loadingEmployer || loadingCandidates)
    return <Typography>Đang tải dữ liệu...</Typography>;

  if (!companyId)
    return (
      <Typography color="error" sx={{ mt: 3 }}>
        Không tìm thấy công ty của bạn. Hãy tạo hoặc liên kết công ty trước khi
        xem danh sách ứng viên.
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="h4" fontWeight="bold">
          Quản lý ứng viên ({candidates.length})
        </Typography>
        <TextField
          placeholder="Tìm kiếm ứng viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="primary.main">
                {stats.moi}
              </Typography>
              <Typography color="text.secondary">Hồ sơ mới</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="info.main">
                {stats.dat_yeu_cau}
              </Typography>
              <Typography color="text.secondary">Đạt yêu cầu</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="secondary.main">
                {stats.da_phong_van}
              </Typography>
              <Typography color="text.secondary">Đã phỏng vấn</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="success.main">
                {stats.da_tuyen}
              </Typography>
              <Typography color="text.secondary">Đã tuyển</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Danh sách ứng viên */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredCandidates.map((candidate, index) => (
          <Card
            key={candidate.id ?? `candidate-${index}`}
            sx={{ transition: "0.2s", "&:hover": { boxShadow: 4 } }}
          >
            <CardContent>
              {/* Avatar + FullName + Status */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  {candidate.fullName?.charAt(0) ?? "?"}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {candidate.fullName}
                  </Typography>
                  <Typography color="text.secondary">
                    {candidate.jobTitle}
                  </Typography>
                </Box>
                {getStatusChip(candidate.status as keyof typeof statusMap)}
              </Box>

              {/* Info */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <MapPin size={14} /> {candidate.location}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Briefcase size={14} /> {candidate.experienceYears} năm kinh
                  nghiệm
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Calendar size={14} /> Nộp ngày:{" "}
                  {new Date(candidate.appliedAt).toLocaleDateString("vi-VN")}
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Eye size={16} />}
                >
                  Xem hồ sơ
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Download size={16} />}
                >
                  Tải CV
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<MessageSquare size={16} />}
                >
                  Liên hệ
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Calendar size={16} />}
                >
                  Hẹn phỏng vấn
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CandidateManagement;
