"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Divider,
    Avatar
} from '@mui/material';
import { Save, Send, Plus, Briefcase, DollarSign, FileText, Award, MapPin, Clock } from 'lucide-react';

// --- Dữ liệu cho các dropdown ---
const jobTypes = ['Toàn thời gian', 'Bán thời gian', 'Hợp đồng', 'Tự do', 'Thực tập'];
const experienceLevels = ['Mới bắt đầu', '1-2 năm', '3-5 năm', 'Trên 5 năm'];
const locations = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Từ xa', 'Toàn quốc'];
const suggestedSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Figma', 'Quản lý sản phẩm'];

const PostJobPage = () => {
    const router = useRouter();
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        logo: '',
        location: '',
        jobType: '',
        experience: '',
        salaryMin: '',
        salaryMax: '',
        description: '',
        skills: [] as string[],
    });
    const [currentSkill, setCurrentSkill] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name!]: value as string }));
    };

    const handleAddSkill = (skill: string) => {
        if (skill && !jobData.skills.includes(skill)) {
            setJobData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setJobData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    return (
        <Box sx={{ bgcolor: '#f8f9fa', py: 4 }}>
            <Box sx={{ maxWidth: '1520px', mx: 'auto', px: 2 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">Đăng tin tuyển dụng</Typography>
                    <Typography color="text.secondary">Điền thông tin chi tiết về vị trí bạn cần tuyển</Typography>
                </Box>

                <Grid container spacing={3} alignItems="flex-start">
                    {/* === CỘT FORM CHÍNH (BÊN TRÁI) === */}
                    <Grid item xs={12} lg={8}>
                        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: 'background.paper' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {/* --- Phần Thông tin chung --- */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                                        <Briefcase />
                                        <Typography variant="h6" fontWeight={600}>Thông tin chung</Typography>
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}><TextField name="title" label="Chức danh công việc *" value={jobData.title} onChange={handleInputChange} variant="outlined" fullWidth /></Grid>
                                        <Grid item xs={12} md={6}><TextField name="company" label="Tên công ty *" value={jobData.company} onChange={handleInputChange} variant="outlined" fullWidth /></Grid>
                                        <Grid item xs={12} md={6}><FormControl fullWidth variant="outlined"><InputLabel>Địa điểm *</InputLabel><Select name="location" value={jobData.location} onChange={handleInputChange} label="Địa điểm *">{locations.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}</Select></FormControl></Grid>
                                        <Grid item xs={12} md={6}><FormControl fullWidth variant="outlined"><InputLabel>Loại hình *</InputLabel><Select name="jobType" value={jobData.jobType} onChange={handleInputChange} label="Loại hình *">{jobTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}</Select></FormControl></Grid>
                                        <Grid item xs={12} md={6}><FormControl fullWidth variant="outlined"><InputLabel>Kinh nghiệm</InputLabel><Select name="experience" value={jobData.experience} onChange={handleInputChange} label="Kinh nghiệm">{experienceLevels.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}</Select></FormControl></Grid>
                                    </Grid>
                                </Box>

                                {/* --- Phần Mức lương --- */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}><DollarSign /><Typography variant="h6" fontWeight={600}>Mức lương</Typography></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}><TextField name="salaryMin" label="Tối thiểu (VND)" value={jobData.salaryMin} onChange={handleInputChange} variant="outlined" fullWidth /></Grid>
                                        <Grid item xs={12} sm={6}><TextField name="salaryMax" label="Tối đa (VND)" value={jobData.salaryMax} onChange={handleInputChange} variant="outlined" fullWidth /></Grid>
                                    </Grid>
                                </Box>

                                {/* --- Phần Mô tả chi tiết --- */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}><FileText /><Typography variant="h6" fontWeight={600}>Mô tả chi tiết</Typography></Box>
                                    <TextField name="description" label="Mô tả công việc *" value={jobData.description} onChange={handleInputChange} multiline rows={8} variant="outlined" fullWidth />
                                </Box>
                                
                                 {/* --- Phần Kỹ năng --- */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}><Award /><Typography variant="h6" fontWeight={600}>Kỹ năng yêu cầu</Typography></Box>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <TextField label="Nhập kỹ năng..." value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(currentSkill))} variant="outlined" fullWidth />
                                        <Button variant="outlined" onClick={() => handleAddSkill(currentSkill)} sx={{ height: '56px' }}>Thêm</Button>
                                    </Box>
                                    {jobData.skills.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                            {jobData.skills.map(skill => <Chip key={skill} label={skill} onDelete={() => handleRemoveSkill(skill)} />)}
                                        </Box>
                                    )}
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Gợi ý:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{suggestedSkills.filter(s => !jobData.skills.includes(s)).map(skill => <Chip key={skill} label={skill} onClick={() => handleAddSkill(skill)} variant="outlined" />)}</Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* === CỘT SIDEBAR (BÊN PHẢI) === */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Xem trước</Typography>
                                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                        <Avatar src={jobData.logo || undefined} variant="rounded" />
                                        <Typography fontWeight="medium">{jobData.company || "Tên công ty"}</Typography>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold">{jobData.title || "Chức danh công việc"}</Typography>
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 1.5 }}>
                                        {/* Dòng 1: Địa điểm, Loại hình */}
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {jobData.location && <Chip icon={<MapPin size={14} />} label={jobData.location} size="small" />}
                                            {jobData.jobType && <Chip icon={<Clock size={14} />} label={jobData.jobType} size="small" />}
                                        </Box>
                                        {/* Dòng 2: Kinh nghiệm, Mức lương */}
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {jobData.experience && <Chip icon={<Award size={14} />} label={jobData.experience} size="small" />}
                                            {(jobData.salaryMin || jobData.salaryMax) && <Chip icon={<DollarSign size={14} />} label={`${jobData.salaryMin || '...'} - ${jobData.salaryMax || '...'} VND`} size="small" />}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 1 }} />
                                    <Typography fontWeight="medium" sx={{ mb: 1 }}>Mô tả công việc</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', mb: 2 }}>
                                        {jobData.description || "Nội dung mô tả công việc sẽ được hiển thị ở đây..."}
                                    </Typography>

                                    {jobData.skills.length > 0 && (
                                        <>
                                            <Divider sx={{ my: 1 }} />
                                            <Typography fontWeight="medium" sx={{ mb: 1 }}>Kỹ năng yêu cầu</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {jobData.skills.map((skill) => (
                                                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Paper>
                            
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}>
                                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Hành động</Typography>
                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <Button fullWidth variant="outlined" startIcon={<Save />}>Lưu bản nháp</Button>
                                    <Button fullWidth variant="contained" startIcon={<Send />} sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>Đăng tuyển</Button>
                                 </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PostJobPage;
