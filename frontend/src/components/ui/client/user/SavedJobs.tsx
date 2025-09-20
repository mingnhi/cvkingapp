"use client";
import {
    MapPin,
    DollarSign,
    Trash2,
    Bookmark
} from 'lucide-react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip
} from '@mui/material';
import { mockSavedJobs } from '@/faker/user-data';
import { useRouter } from 'next/navigation';
const SavedJobs = () => {
const route = useRouter();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">Việc làm đã lưu</Typography>
            {mockSavedJobs.length > 0 ? (
                mockSavedJobs.map((job) => (
                    <Card key={job.id} sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    {job.urgent && <Chip label="Gấp" color="error" size="small" sx={{ mb: 1 }} />}
                                    <Typography variant="h6" component="h2" fontWeight="600">{job.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5, color: 'text.secondary' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MapPin size={14} />{job.location}</Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><DollarSign size={14} />{job.salary}</Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                        {job.tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                                    </Box>
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, alignItems: 'flex-end' }}>
                                    <Button size="small" variant="contained" sx={{ textTransform: 'none', bgcolor: "#000000", "&:hover": { bgcolor: "#333333" } }}>Ứng tuyển</Button>
                                    <Button size="small" startIcon={<Trash2 size={16} />} sx={{ textTransform: 'none', border: '1px solid', borderColor: 'divider', color: "text.primary" }}>Bỏ lưu</Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card sx={{ borderRadius: "12px", border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <CardContent sx={{ p: 6, textAlign: 'center' }}>
                        <Bookmark size={48} style={{ margin: '0 auto 16px', color: '#9e9e9e' }} />
                        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Chưa có việc làm nào được lưu</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            Bắt đầu lưu các công việc bạn quan tâm để theo dõi cơ hội.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigateTo('jobs')}
                            sx={{ textTransform: 'none', color: "text.primary", borderColor: 'divider' }}
                        >
                            Xem danh sách việc làm
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default SavedJobs;
