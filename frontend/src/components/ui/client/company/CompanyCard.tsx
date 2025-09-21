import { useRouter } from 'next/navigation';
import { MapPin, Star, Users } from 'lucide-react';
import {
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    Chip,
    Divider,
    Button,
} from '@mui/material';

interface CompanyCardProps {
    company: any;
    viewMode: 'grid' | 'list';
}
export default function CompanyCard({ company, viewMode }: CompanyCardProps) {
    const router = useRouter();

    const handleClick = () => router.push(`/companies/${company.id}`);
    return viewMode === 'grid' ? (
        <Card 
            onClick={handleClick}
            sx={{ display: 'flex',
                flexDirection: 'column', transition: '0.2s',
                '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                borderRadius: 2, cursor: 'pointer' }}>
            <CardContent 
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, alignItems: 'center' }}>
                <CardMedia 
                    component="img" image={company.logo} 
                    sx={{ width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        mb: 1.5 }} />
                <Box 
                    sx={{ display: 'flex', 
                        justifyContent: 
                        'center', 
                        alignItems: 'center',
                        gap: 1, 
                        flexWrap: 'wrap',
                        mb: 2, 
                        minHeight: 48 }}>
                    <Typography 
                        fontWeight="bold"
                        component="h3" 
                        sx={{ lineHeight: 1.2, textAlign: 'center' }}>
                        {company.name}
                    </Typography>
                    {company.isTopCompany && <Chip label="Hàng đầu" color="info" size="small" />}
                </Box>
                <Box 
                    sx={{ width: '100%',
                        display: 'flex',
                        flexDirection: 'column', 
                        gap: 1,
                        my: 1, 
                        flexGrow: 1,
                        color: 'text.secondary' }}>
                    <Box
                        sx={{ display: 'flex', 
                            alignItems: 'center',
                            gap: 1 }}>
                        <Star size={16} />
                        <Typography variant="body2">
                            {company.rating} sao ({company.reviews} đánh giá)
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MapPin size={16} />
                        <Typography
                            variant="body2">
                            {company.location}
                        </Typography>
                    </Box>
                    <Box 
                        sx={{ display: 'flex',
                            alignItems: 'center',
                            gap: 1 }}>
                        <Users size={16} />
                        <Typography variant="body2">
                            {company.employees}
                            nhân viên
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{
                    my: 1.5, 
                    width: '100%'
                }} />
                <Typography
                    sx={{ color: 'primary.main', 
                        fontWeight: 'medium',
                        mt: 'auto' }}>
                    {company.jobs}
                    việc làm đang tuyển
                </Typography>
            </CardContent>
        </Card>
    ) : (
        <Card
                sx={{ borderRadius: 2,
                    transition: '0.2s', 
                    '&:hover': { boxShadow: 4 }
                }}>
            <CardContent 
                    sx={{ display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        p: 2, 
                        gap: 2 }}>
                <CardMedia
                        component="img" image={company.logo} 
                        onClick={handleClick}
                        sx={{ width: 80,
                            height: 80, borderRadius: 1.5, cursor: 'pointer', flexShrink: 0 }} />
                <Box 
                        sx={{ flexGrow: 1,
                            width: '100%' }}>
                    <Box 
                            sx={{ display: 'flex',
                                alignItems: 'center', 
                                gap: 1, flexWrap: 'wrap' }}>
                        <Typography 
                                variant="h6" fontWeight="bold"
                                onClick={handleClick}
                                sx={{ cursor: 'pointer' }}>
                                {company.name}
                            </Typography>
                        {company.isTopCompany && <Chip label="Công ty hàng đầu" color="info" size="small" />}
                    </Box>
                    <Typography
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 1 }}>
                            {company.industry}
                        </Typography>
                    <Box
                            sx={{ color: 'text.secondary',
                                display: 'flex', 
                                flexWrap: 'wrap',
                                gap: 2,
                                mb: 1 }}>
                        <Box 
                                sx={{ display: 'flex', 
                                    alignItems: 'center',
                                    gap: 0.5 }}>
                                <MapPin size={16} />
                                <Typography 
                                    variant="body2">
                                    {company.location}
                                </Typography>
                            </Box>
                        <Box
                                sx={{ display: 'flex', 
                                    alignItems: 'center',
                                    gap: 0.5 }}>
                                <Users size={16} />
                                <Typography variant="body2">
                                    {company.employees}
                                    nhân viên
                                </Typography>
                            </Box>
                        <Box
                                sx={{ display: 'flex',
                                    alignItems: 'center', 
                                    gap: 0.5 }}>
                                <Star size={16} />
                                <Typography variant="body2">
                                    {company.rating}
                                    sao
                                </Typography>
                            </Box>
                    </Box>
                    <Typography
                            variant="body2" 
                        sx={{ fontStyle: 'italic' }}>
                            "{company.description}"
                        </Typography>
                </Box>
                <Button 
                        variant="contained" 
                        onClick={() => router.push(`/company/${company.id}/jobs`)} 
                        sx={{
                            mt: { xs: 2, sm: 0 },
                            textTransform: 'none', 
                            bgcolor: '#000', '&:hover': { bgcolor: '#333' },
                            flexShrink: 0 }}>
                        Xem {company.jobs} việc làm
                    </Button>
            </CardContent>
        </Card>
    );
}
