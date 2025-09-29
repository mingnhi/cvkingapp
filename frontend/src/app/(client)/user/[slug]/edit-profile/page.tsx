"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    ArrowLeft,
    Upload,
    Plus,
    Camera
} from 'lucide-react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
    Box,
    Chip,
    Avatar,
    CircularProgress
} from '@mui/material';
import { useMyProfileQuery, useUpdateUserMutation } from '@/api/user/query';

const toast = (message: string) => alert(message);

const EditProfilePage = () => {
    const router = useRouter();
    const { data: user, isLoading: loadingProfile } = useMyProfileQuery();
    const { mutateAsync: updateUser, isLoading: updating } = useUpdateUserMutation({
        onSuccess: () => {
        toast("Hồ sơ đã được cập nhật!");
        setHasChanges(false);
        router.back();
        },
        onError: (err: Error) => toast(`Lỗi: ${err.message}`),
    });
    const [isEmployer, setIsEmployer] = useState(false);
    const [jobSeekerData, setJobSeekerData] = useState<any>(null);
    const [employerData, setEmployerData] = useState<any>(null);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    useEffect(() => {
        if (user) {
        // Nếu backend trả về role, có thể setIsEmployer(user.role === 'Employer')
        setJobSeekerData({
            name: user.displayName || "",
            email: user.email || "",
            avatar: user.avatarUrl || "",
        });
        setEmployerData({
            email: user.email || "",
            avatar: user.avatarUrl || "",
        });
        //   setSkills(user.skills || []);
        }
    }, [user]);

  const handleJobSeekerChange = (field: string, value: string) => {
    setJobSeekerData((p: any) => ({ ...p, [field]: value }));
    setHasChanges(true);
  };

  const handleEmployerChange = (field: string, value: string) => {
    setEmployerData((p: any) => ({ ...p, [field]: value }));
    setHasChanges(true);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
      setHasChanges(true);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    setHasChanges(true);
  };

  const handleAvatarUpload = () => toast("Cập nhật ảnh đại diện thành công!");

  const handleSave = async () => {
    const payload = isEmployer
      ? {
          email: employerData.email,
          phone: employerData.phone,
          avatarUrl: employerData.avatar,
        }
      : {
          displayName: jobSeekerData.name,
          email: jobSeekerData.email,
          avatarUrl: jobSeekerData.avatar,
          skills,
        };
    await updateUser(payload);
  };

  if (loadingProfile || !jobSeekerData || !employerData) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }
return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", py: { xs: 2, md: 5 } }}>
      <Box sx={{ width: "100%", maxWidth: "960px", mx: "auto", px: { xs: 2, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Button
              onClick={() => router.back()}
              sx={{ textTransform: "none", color: "text.primary", "&:hover": { bgcolor: "action.hover" }, mr: 2 }}
            >
              <ArrowLeft size={16} style={{ marginRight: 8 }} />
              Quay lại
            </Button>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="600">
                {isEmployer ? "Chỉnh sửa hồ sơ công ty" : "Chỉnh sửa hồ sơ"}
              </Typography>
              <Typography color="text.secondary">Cập nhật thông tin của bạn bên dưới</Typography>
            </Box>
          </Box>
          <Button
            onClick={handleSave}
            disabled={updating || !hasChanges}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#000000",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "#333333" },
              "&.Mui-disabled": { bgcolor: "grey.300", color: "grey.500" },
            }}
          >
            {updating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <Save size={16} style={{ marginRight: 8 }} /> Lưu thay đổi
              </>
            )}
          </Button>
        </Box>

        {/* Ảnh đại diện */}
        <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none", mb: 3 }}>
          <CardHeader title="Ảnh đại diện" subheader="Cập nhật ảnh đại diện của bạn." />
          <CardContent sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 4 } }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={isEmployer ? employerData.avatar : jobSeekerData.avatar}
                sx={{ width: 96, height: 96, border: "3px solid white", boxShadow: 2 }}
              />
              <Box
                component="label"
                htmlFor="avatar-upload"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  p: 0.5,
                  cursor: "pointer",
                  boxShadow: 1,
                  display: "flex",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <Camera size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarUpload}
                />
              </Box>
            </Box>
            <Box>
              <Button
                component="label"
                htmlFor="avatar-upload"
                startIcon={<Upload size={16} />}
                sx={{
                  textTransform: "none",
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                Tải ảnh lên
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                JPG, GIF hoặc PNG. Tối đa 1MB.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Thông tin */}
        {isEmployer ? (
          <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <CardHeader title="Thông tin công ty" />
            <CardContent sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                label="Tên công ty"
                fullWidth
                value={employerData.companyName}
                onChange={(e) => handleEmployerChange("companyName", e.target.value)}
              />
              <TextField
                label="Người liên hệ"
                fullWidth
                value={employerData.contactName}
                onChange={(e) => handleEmployerChange("contactName", e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                value={employerData.email}
                onChange={(e) => handleEmployerChange("email", e.target.value)}
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                value={employerData.phone}
                onChange={(e) => handleEmployerChange("phone", e.target.value)}
              />
              <TextField
                label="Mô tả công ty"
                multiline
                rows={4}
                fullWidth
                value={employerData.description}
                onChange={(e) => handleEmployerChange("description", e.target.value)}
                sx={{ gridColumn: "1 / -1" }}
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none", mb: 3 }}>
              <CardHeader title="Thông tin cá nhân" />
              <CardContent sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <TextField
                  label="Họ và tên"
                  fullWidth
                  value={jobSeekerData.name}
                  onChange={(e) => handleJobSeekerChange("name", e.target.value)}
                />
                <TextField
                  label="Chức danh"
                  fullWidth
                  value={jobSeekerData.title}
                  onChange={(e) => handleJobSeekerChange("title", e.target.value)}
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={jobSeekerData.email}
                  onChange={(e) => handleJobSeekerChange("email", e.target.value)}
                />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  value={jobSeekerData.phone}
                  onChange={(e) => handleJobSeekerChange("phone", e.target.value)}
                />
                <TextField
                  label="Giới thiệu bản thân"
                  multiline
                  rows={4}
                  fullWidth
                  value={jobSeekerData.summary}
                  onChange={(e) => handleJobSeekerChange("summary", e.target.value)}
                  sx={{ gridColumn: "1 / -1" }}
                />
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
              <CardHeader title="Kỹ năng" />
              <CardContent>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {skills.map((skill) => (
                    <Chip key={skill} label={skill} onDelete={() => removeSkill(skill)} />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Thêm kỹ năng"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button
                    onClick={addSkill}
                    sx={{
                      textTransform: "none",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.primary",
                      minWidth: "auto",
                      px: 2,
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EditProfilePage;