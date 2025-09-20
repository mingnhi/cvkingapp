"use client";
import {
    Eye,
    Calendar,
    MapPin,
    DollarSign,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    Button,
    Box,
    Chip
} from '@mui/material';
import { mockApplications } from '@/faker/user-data';
const MyApplication = () => {
    const getStatusChip = (status: string) => {
        switch (status) {
            case 'phỏng vấn':
                return <Chip icon={<AlertCircle size={16} />} label="Đã hẹn phỏng vấn" color="info" size="small" />;
            case 'chờ xử lý':
                return <Chip icon={<AlertCircle size={16} />} label="Đang chờ xử lý" color="warning" size="small" />;
            case 'đã từ chối':
                return <Chip icon={<XCircle size={16} />} label="Không phù hợp" color="error" size="small" />;
            default:
                return <Chip label={status} size="small" />;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">Việc làm đã ứng tuyển</Typography>
            {mockApplications.map((app) => (
                <Card key={app.id} sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={app.logo} sx={{ width: 64, height: 64, border: '2px solid white', boxShadow: 1 }} />
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <Typography variant="h6" component="h2" fontWeight="600">{app.jobTitle}</Typography>
                                        <Typography variant="body2" color="text.secondary">{app.company}</Typography>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5, color: 'text.secondary' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MapPin size={14} />{app.location}</Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><DollarSign size={14} />{app.salary}</Box>
                                        </Box>
                                    </div>
                                    {getStatusChip(app.status)}
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="caption" color="text.secondary">Ngày ứng tuyển: {app.appliedDate}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            startIcon={<Eye size={16} />}
                                            sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary", "&:hover": { bgcolor: "action.hover" } }}
                                        >
                                            Xem chi tiết
                                        </Button>
                                        {app.status === 'phỏng vấn' && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<Calendar size={16} />}
                                                sx={{ textTransform: 'none', bgcolor: 'info.main', '&:hover': { bgcolor: 'info.dark' } }}
                                            >
                                                Xem lịch phỏng vấn
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default MyApplication;
