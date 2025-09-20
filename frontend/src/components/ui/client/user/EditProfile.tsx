"use client";
import { useState } from 'react';
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
    FormLabel,
   Typography,
    Box,
    Chip,
    Avatar
} from '@mui/material';
import { useApp } from '@/components/AppContext';
import { useRouter } from 'next/navigation';

// Hàm toast đơn giản để minh họai
const toast = (message: string) => alert(message);

const EditProfilePage = () => {
    const { state } = useApp();
    const isEmployer = state?.user?.userType === 'employer';
    const router = useRouter();

    const [jobSeekerData, setJobSeekerData] = useState({ name: 'Nguyễn Văn An', email: 'nguyen.van.a@email.com', phone: '0987 654 321', title: 'Lập trình viên Frontend Senior', summary: 'Lập trình viên Frontend chuyên nghiệp...', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' });
    const [employerData, setEmployerData] = useState({ companyName: 'TechCorp Vietnam', contactName: 'Phòng Nhân sự', email: 'hr@techcorp.vn', phone: '028 3812 3456', description: 'Công ty phát triển phần mềm hàng đầu...', avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face' });
    const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'MongoDB']);
    const [newSkill, setNewSkill] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Ban đầu chưa có thay đổi, nút sẽ bị disabled và mờ
    const [hasChanges, setHasChanges] = useState(false); 

    // Các hàm xử lý logic (giữ nguyên)
    const handleJobSeekerChange = (field: string, value: string) => { setJobSeekerData(p => ({ ...p, [field]: value })); setHasChanges(true); };
    const handleEmployerChange = (field: string, value: string) => { setEmployerData(p => ({ ...p, [field]: value })); setHasChanges(true); };
    const addSkill = () => { if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(''); setHasChanges(true); } };
    const removeSkill = (skill: string) => { setSkills(skills.filter(s => s !== skill)); setHasChanges(true); };
    const handleAvatarUpload = () => toast('Cập nhật ảnh đại diện thành công!');
    const handleSave = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setIsLoading(false); toast('Hồ sơ đã được cập nhật!'); setHasChanges(false); };
    const handleCancel = () => router.back();

    return (
        <Box sx={{ 
            bgcolor: 'grey.50', 
            minHeight: '100vh', 
            py: 8,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{ width: '100%', maxWidth: '960px', px: { xs: 2, sm: 4 } }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={handleCancel}
                            sx={{ textTransform: 'none', color: "text.primary", "&:hover": { bgcolor: "action.hover" } }}
                        >
                            <ArrowLeft size={16} style={{ marginRight: '8px' }}/>
                            Quay lại
                        </Button>
                        <Box sx={{ ml: 20 }}>
                            <Typography variant="h4" component="h1" fontWeight="600">
                                {isEmployer ? 'Chỉnh sửa hồ sơ công ty' : 'Chỉnh sửa hồ sơ'}
                            </Typography>
                            <Typography color="text.secondary">
                                Cập nhật thông tin của bạn bên dưới
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading || !hasChanges} 
                        sx={{
                            textTransform: 'none',
                            bgcolor: "#000000",
                            color: "primary.contrastText",
                            "&:hover": { bgcolor: "#333333" },
                            // Thêm style cho trạng thái disabled
                            "&.Mui-disabled": {
                                bgcolor: "grey.300", 
                                color: "grey.500",
                            }
                        }}
                    >
                        {isLoading ? 'Đang lưu...' : <><Save size={16} style={{ marginRight: '8px' }}/> Lưu thay đổi</>}
                    </Button>
                </Box>

                {/* Main Content (Giữ nguyên) */}
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none', mb: 3 }}>
                    <CardHeader title="Ảnh đại diện" subheader="Cập nhật ảnh đại diện của bạn." />
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                src={isEmployer ? employerData.avatar : jobSeekerData.avatar}
                                sx={{ width: 96, height: 96, border: '3px solid white', boxShadow: 2 }}
                            />
                            <Box component="label" htmlFor="avatar-upload" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'background.paper', borderRadius: '50%', p: 0.5, cursor: 'pointer', boxShadow: 1, display: 'flex', '&:hover': { bgcolor: 'grey.100' } }}>
                                <Camera size={20} />
                                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                            </Box>
                        </Box>
                        <Box>
                             <Button
                                component="label" htmlFor="avatar-upload" startIcon={<Upload size={16}/>}
                                sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary", "&:hover": { bgcolor: "action.hover" } }}
                             >
                                Tải ảnh lên
                            </Button>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                JPG, GIF hoặc PNG. Tối đa 1MB.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {isEmployer ? (
                    // Form cho Nhà Tuyển Dụng
                    <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none', mb: 3 }}>
                        <CardHeader title="Thông tin công ty" />
                        <CardContent sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'}, gap: 2 }}>
                            <div>
                                <FormLabel sx={{ display: 'block', mb: 1 }}>Tên công ty</FormLabel>
                                <TextField fullWidth value={employerData.companyName} onChange={(e) => handleEmployerChange('companyName', e.target.value)} />
                            </div>
                            <div>
                                <FormLabel sx={{ display: 'block', mb: 1 }}>Người liên hệ</FormLabel>
                                <TextField fullWidth value={employerData.contactName} onChange={(e) => handleEmployerChange('contactName', e.target.value)} />
                            </div>
                            <div>
                                <FormLabel sx={{ display: 'block', mb: 1 }}>Email</FormLabel>
                                <TextField fullWidth type="email" value={employerData.email} onChange={(e) => handleEmployerChange('email', e.target.value)} />
                            </div>
                            <div>
                                <FormLabel sx={{ display: 'block', mb: 1 }}>Số điện thoại</FormLabel>
                                <TextField fullWidth value={employerData.phone} onChange={(e) => handleEmployerChange('phone', e.target.value)} />
                            </div>
                            <Box sx={{ gridColumn: '1 / -1' }}>
                                <FormLabel sx={{ display: 'block', mb: 1 }}>Mô tả công ty</FormLabel>
                                <TextField multiline rows={4} fullWidth value={employerData.description} onChange={(e) => handleEmployerChange('description', e.target.value)} />
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    // Form cho Người Tìm Việc
                    <>
                        <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none', mb: 3 }}>
                            <CardHeader title="Thông tin cá nhân" />
                            <CardContent sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'}, gap: 2 }}>
                                <div>
                                    <FormLabel sx={{ display: 'block', mb: 1 }}>Họ và Tên</FormLabel>
                                    <TextField fullWidth value={jobSeekerData.name} onChange={(e) => handleJobSeekerChange('name', e.target.value)} />
                                </div>
                                <div>
                                    <FormLabel sx={{ display: 'block', mb: 1 }}>Chức danh</FormLabel>
                                    <TextField fullWidth value={jobSeekerData.title} onChange={(e) => handleJobSeekerChange('title', e.target.value)} />
                                </div>
                                <div>
                                    <FormLabel sx={{ display: 'block', mb: 1 }}>Email</FormLabel>
                                    <TextField fullWidth type="email" value={jobSeekerData.email} onChange={(e) => handleJobSeekerChange('email', e.target.value)} />
                                </div>
                                <div>
                                    <FormLabel sx={{ display: 'block', mb: 1 }}>Số điện thoại</FormLabel>
                                    <TextField fullWidth value={jobSeekerData.phone} onChange={(e) => handleJobSeekerChange('phone', e.target.value)} />
                                </div>
                                <Box sx={{ gridColumn: '1 / -1' }}>
                                    <FormLabel sx={{ display: 'block', mb: 1 }}>Giới thiệu bản thân</FormLabel>
                                    <TextField multiline rows={4} fullWidth value={jobSeekerData.summary} onChange={(e) => handleJobSeekerChange('summary', e.target.value)} />
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none', mb: 3 }}>
                           <CardHeader title="Kỹ năng" />
                           <CardContent>
                               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                   {skills.map(skill => <Chip key={skill} label={skill} onDelete={() => removeSkill(skill)} />)}
                               </Box>
                               <Box sx={{ display: 'flex', gap: 2 }}>
                                   <TextField fullWidth placeholder="Thêm một kỹ năng" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
                                   <Button
                                       onClick={addSkill}
                                       sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary", minWidth: 40, p: 0 }}
                                   >
                                       <Plus size={16}/>
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
