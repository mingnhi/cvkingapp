"use client";
import { useState, useMemo } from 'react';
import { mockCandidates } from '@/faker/overview-hr-data';
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
    Paper
} from '@mui/material';
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
    UserCheck
} from 'lucide-react';

const statusMap = {
    moi: { label: 'Mới', icon: <AlertCircle size={14} />, color: 'primary' as 'primary' },
    dat_yeu_cau: { label: 'Đạt yêu cầu', icon: <Star size={14} />, color: 'info' as 'info' },
    da_phong_van: { label: 'Đã phỏng vấn', icon: <UserCheck size={14} />, color: 'secondary' as 'secondary' },
    tu_choi: { label: 'Từ chối', icon: <XCircle size={14} />, color: 'error' as 'error' },
    da_tuyen: { label: 'Đã tuyển', icon: <CheckCircle size={14} />, color: 'success' as 'success' }
};

const getStatusChip = (status: string) => {
    const statusInfo = statusMap[status] || { label: status, icon: null, color: 'default' as 'default' };
    return <Chip label={statusInfo.label} icon={statusInfo.icon} color={statusInfo.color} size="small" />;
};

const CandidateManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCandidates = useMemo(() => {
        if (!searchTerm) return mockCandidates;
        const lowercasedFilter = searchTerm.toLowerCase();
        return mockCandidates.filter(candidate =>
            candidate.name.toLowerCase().includes(lowercasedFilter) ||
            candidate.position.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    const stats = useMemo(() => ({
        moi: mockCandidates.filter(c => c.status === 'moi').length,
        dat_yeu_cau: mockCandidates.filter(c => c.status === 'dat_yeu_cau').length,
        da_phong_van: mockCandidates.filter(c => c.status === 'da_phong_van').length,
        da_tuyen: mockCandidates.filter(c => c.status === 'da_tuyen').length,
    }), [mockCandidates]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 4. Tiêu đề và Thanh tìm kiếm */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Quản lý ứng viên ({mockCandidates.length})
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

            {/* 5. Các thẻ thống kê */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card><CardContent sx={{ textAlign: 'center' }}><Typography variant="h5" color="primary.main">{stats.moi}</Typography><Typography color="text.secondary">Hồ sơ mới</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card><CardContent sx={{ textAlign: 'center' }}><Typography variant="h5" color="info.main">{stats.dat_yeu_cau}</Typography><Typography color="text.secondary">Đạt yêu cầu</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card><CardContent sx={{ textAlign: 'center' }}><Typography variant="h5" color="secondary.main">{stats.da_phong_van}</Typography><Typography color="text.secondary">Đã phỏng vấn</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card><CardContent sx={{ textAlign: 'center' }}><Typography variant="h5" color="success.main">{stats.da_tuyen}</Typography><Typography color="text.secondary">Đã tuyển</Typography></CardContent></Card>
                </Grid>
            </Grid>

            {/* 6. Danh sách ứng viên */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredCandidates.map((candidate) => (
                    <Card key={candidate.id} sx={{ transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                <Avatar src={candidate.avatar} sx={{ width: 56, height: 56 }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Box>
                                            <Typography variant="h6" fontWeight="medium">{candidate.name}</Typography>
                                            <Typography color="text.secondary">{candidate.position}</Typography>
                                        </Box>
                                        {getStatusChip(candidate.status)}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, color: 'text.secondary', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MapPin size={14} />{candidate.location}</Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Briefcase size={14} />{candidate.experience}</Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Calendar size={14} />Nộp ngày: {candidate.appliedDate}</Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {candidate.skills.map((skill) => <Chip key={skill} label={skill} size="small" variant="outlined" />)}
                                    </Box>
                                    <Divider sx={{ mb: 2 }}/>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        <Button size="small" variant="outlined" startIcon={<Eye size={16} />}>Xem hồ sơ</Button>
                                        <Button size="small" variant="outlined" startIcon={<Download size={16} />}>Tải CV</Button>
                                        <Button size="small" variant="outlined" startIcon={<MessageSquare size={16} />}>Liên hệ</Button>
                                        <Button size="small" variant="contained" startIcon={<Calendar size={16} />}>Hẹn phỏng vấn</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default CandidateManagement;
