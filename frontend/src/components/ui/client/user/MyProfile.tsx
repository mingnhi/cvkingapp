// "use-client";
// import {
//     Download,
//     Edit,
//     MapPin,
//     DollarSign,
//     Share2
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
// import { Separator } from '../../common/separator/separator';
// import { Badge } from '@mui/material';
// import { Avatar, AvatarFallback, AvatarImage } from '../../common/avatar//avatar';
// import { Button } from '../../common/button/button';
// import { useApp } from '@/components/AppContext';
// import { useRouter } from 'next/navigation';
// import { Progress } from '../../common/progress/progress';
// import { useMyProfileQuery } from '@/api/user/query';
// const MyProfile = () => {
//     const { navigateTo } = useApp();
//     const router = useRouter();
//     const { data: user, isLoading, isError } = useMyProfileQuery();

//     if (isLoading) return <div>Đang tải thông tin...</div>;
//     if (isError || !user) return <div>Không lấy được thông tin người dùng</div>;
// //     const accessToken =
// //         typeof window !== "undefined"
// //             ? localStorage.getItem("accessToken")
// //             : null;
// //     if (!accessToken) {
// //     if (typeof window !== "undefined") router.push("/login");
// //     return <div className="p-6">Đang chuyển hướng đến trang đăng nhập...</div>;
// //   }

            

// //     const { data, isPending, isError } = useMyProfileQuery();
// //     if (isPending) return <div className="p-6">Đang tải dữ liệu hồ sơ...</div>;
// //     if (isError || !data) return <div className="p-6 text-red-500">Không thể tải thông tin hồ sơ</div>;
// //     const user = data

//     return (
//         <div className="space-y-6 max-w-[1520px]" >
//             <div className="flex items-center justify-between">
//             </div>

//             <Card className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                     <div className="flex items-start space-x-4">
//                         <Avatar className="w-20 h-20 mt-2">
//                             <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
//                         </Avatar>
//                         <div className="flex-1 mt-2">
//                             <h2>{ user.displayName}</h2>
//                             <p className="text-gray-600">Senior Frontend Developer</p>
//                             <div className="flex items-center text-sm text-gray-500 mt-2">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 {user.preferredLocale}
//                             </div>
//                             <div className="flex items-center text-sm text-gray-500 mt-1">
//                                 <DollarSign className="w-4 h-4 mr-1" />
//                                 Expected salary: $2000 - $3000
//                             </div>
//                         </div>
//                         <div className="flex space-x-2 ">
//                             <Button variant="outline" size="sm">
//                                 <Share2 className="w-4 h-4 mr-2" />
//                                 Chia sẻ
//                             </Button>
//                             <Button variant="outline" size="sm">
//                                 <Download className="w-4 h-4 mr-2" />
//                                 Export
//                             </Button>
//                             <Button onClick={() => router.push('/user/a/edit-profile')} className="bg-primary hover:bg-primary/90  ">
//                                 <Edit className="w-2 h-2 text-sm " />
//                                 Chỉnh sửa hồ sơ
//                             </Button>
//                         </div>
//                     </div>

//                     <Separator className="my-6 " />

//                     <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mt-8">
//                         <div>
//                             <h3 className="mb-3">Thông tin kết nối</h3>
//                             <div className="space-y-2 text-sm">
//                                 <p><span className="font-medium">Email:</span>
//                                     <button className="text-primary hover:underline ml-1">{ user.email}</button>
//                                 </p>
//                                 {user.linkedInId && (
//                                     <p>
//                                         <span className="font-medium">LinkedIn:</span>
//                                         <button className="text-primary hover:underline ml-1">
//                                         {user.linkedInId}
//                                         </button>
//                                     </p>
//                                 )}
//                                 {user.googleId && (
//                                     <p>
//                                         <span className="font-medium">google:</span>
//                                         <button className="text-primary hover:underline ml-1">
//                                         {user.googleId}
//                                         </button>
//                                     </p>
//                                 )}
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="mb-3">Kĩ năng</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'].map((skill) => (
//                                     <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
//                                         {skill}
//                                     </Badge>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-6">
//                         <h3 className="mb-3">Hoàn thiện hồ sơ</h3>
//                         <div className="space-y-2">
//                             <div className="flex justify-between text-sm">
//                                 <span>Mức độ hoàn thiện hồ sơ</span>
//                             </div>
//                             <Progress value={85} className="h-2" />
//                             <p className="text-sm text-gray-600">
//                               Thêm kinh nghiệm và trình độ học vấn để cải thiện khả năng hiển thị hồ sơ của bạn
//                                 <button className="text-primary hover:underline ml-1">Hoàn thành ngay</button>
//                             </p>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('applications')}>
//                     <CardContent className="p-4 text-center">
//                         <div className="text-2xl font-bold text-primary">12</div>
//                         <div className="text-sm text-gray-600">Applications Sent</div>
//                     </CardContent>
//                 </Card>
//                 <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('saved')}>
//                     <CardContent className="p-4 text-center">
//                         <div className="text-2xl font-bold text-blue-600">8</div>
//                         <div className="text-sm text-gray-600">Saved Jobs</div>
//                     </CardContent>
//                 </Card>
//                 <Card className="cursor-pointer hover:shadow-md transition-shadow">
//                     <CardContent className="p-4 text-center">
//                         <div className="text-2xl font-bold text-green-600">156</div>
//                         <div className="text-sm text-gray-600">Profile Views</div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );

// }
// export default MyProfile; 
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
import { useMyProfileQuery } from '@/api/user/query';
//a
const MyProfile = () => {
    const router = useRouter();
    const { data: user, isLoading, isError } = useMyProfileQuery();
    if (isLoading) return <div>Đang tải thông tin...</div>;
    if (isError || !user) return <div>Không lấy được thông tin người dùng</div>;

    
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
                            src={user.avatarUrl}
                            sx={{ width: 96, height: 96, mt: 1, border: '3px solid white', boxShadow: 2 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <Typography variant="h4" component="h1" fontWeight="bold">
                                        {user.displayName}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                        <Briefcase size={16} /> {user.email}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <MapPin size={14} /> {user.preferredLocale ?? "Chưa cập nhật địa điểm"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <DollarSign size={14} /> {user.linkedInId ?? "Chưa cập nhật địa điểm"}
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

