"use client";
import {
    Download,
    Edit,
    MapPin,
    DollarSign,
    Briefcase,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Divider,
    Avatar,
    Button,
    Box,
    Chip,
    LinearProgress
} from '@mui/material';
import { useRouter } from 'next/navigation';
//a
const MyProfile = () => {
    const router = useRouter();

    const userProfile = {
        name: 'Nguyễn Văn An',
        title: 'Lập trình viên Frontend Senior tại TechCorp',
        location: 'Thành phố Hồ Chí Minh, Việt Nam',
        salary: '58.000.000 VNĐ / tháng',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
        profileCompletion: 85,
        summary: 'Lập trình viên Frontend chuyên nghiệp với hơn 5 năm kinh nghiệm xây dựng các ứng dụng web động và đáp ứng bằng React, Next.js, và TypeScript. Có khả năng lãnh đạo dự án và hướng dẫn các lập trình viên trẻ.',
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'MUI', 'Docker'],
        stats: {
            applications: 12,
            savedJobs: 8,
            profileViews: 156,
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            maxWidth: '1280px',
            mx: 'auto',
            p: 3
        }}>

            {/* Thẻ Thông Tin Cá Nhân */}
            <Card sx={{
                borderRadius: "12px",
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 2 }
            }}>
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Avatar
                            src={userProfile.avatarUrl}
                            sx={{ width: 96, height: 96, mt: 1, border: '3px solid white', boxShadow: 2 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="h4" component="h1" fontWeight="bold">
                                        {userProfile.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                        <Briefcase size={16} /> {userProfile.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <MapPin size={14} /> {userProfile.location}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <DollarSign size={14} /> {userProfile.salary}
                                        </Typography>
                                    </Box>
                                </div>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        onClick={() => router.push('a/edit-profile')}
                                        sx={{
                                            textTransform: 'none',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            color: "text.primary",
                                            "&:hover": { bgcolor: "action.hover" },
                                            height: 40,
                                        }}
                                        startIcon={<Edit size={16} />}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        sx={{
                                            textTransform: 'none',
                                            bgcolor: "#000000",
                                            color: "primary.contrastText",
                                            "&:hover": { bgcolor: "#333333" },
                                            height: 40,
                                        }}
                                        startIcon={<Download size={16} />}
                                    >
                                        Tải CV
                                    </Button>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                {userProfile.summary}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Thống Kê Nhanh */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2
            }}>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="primary.main">{userProfile.stats.applications}</Typography>
                        <Typography variant="body2" color="text.secondary">Việc đã ứng tuyển</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="info.main">{userProfile.stats.savedJobs}</Typography>
                        <Typography variant="body2" color="text.secondary">Việc đã lưu</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="success.main">{userProfile.stats.profileViews}</Typography>
                        <Typography variant="body2" color="text.secondary">Lượt xem hồ sơ</Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Mức độ hoàn thiện & Kỹ năng */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                gap: 3
            }}>
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader title="Mức độ hoàn thiện" sx={{pb: 0}} />
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <LinearProgress variant="determinate" value={userProfile.profileCompletion} sx={{ height: 8, borderRadius: 4, flexGrow: 1 }} />
                            <Typography fontWeight="bold" color="primary.main">{userProfile.profileCompletion}%</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Hoàn thiện hồ sơ để nhận được gợi ý việc làm tốt hơn.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardHeader title="Các kỹ năng" />
                    <CardContent sx={{pt: 0}}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {userProfile.skills.map(skill => (
                                <Chip key={skill} label={skill} variant="outlined" />
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default MyProfile;
