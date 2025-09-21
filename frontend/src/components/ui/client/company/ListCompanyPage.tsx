"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Grid as GridIcon, List as ListIcon, Users, Star } from 'lucide-react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Pagination,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    CardMedia,
    Divider,
    RadioGroup,
    Radio
} from '@mui/material';
import { industryOptions } from '@/faker/company-data';
import { Locations , allCompanies,companySizeOptions , benefitOptions , ratingOptions  } from '@/faker/company-data';
const ListCompanyPage = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const companiesPerPage = 9;
    const [mainFilterInputs, setMainFilterInputs] = useState({ keyword: '', location: '', industry: '' });
    const [sidebarFilters, setSidebarFilters] = useState({ companySizes: [], benefits: [], rating: 'all' });
    const [searchedCompanies, setSearchedCompanies] = useState(allCompanies);
    const [displayedCompanies, setDisplayedCompanies] = useState(allCompanies);
    const handleMainFilterChange = (e) => {
        const { name, value } = e.target;
        setMainFilterInputs(prev => ({ ...prev, [name]: value }));
    };
    const handleSidebarCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setSidebarFilters(prev => {
            const list = prev[name];
            if (checked) return { ...prev, [name]: [...list, value] };
            return { ...prev, [name]: list.filter(item => item !== value) };
        });
    };
    const handleSidebarRadioChange = (e) => {
        setSidebarFilters(prev => ({ ...prev, rating: e.target.value }));
    };
    const handleSearchClick = () => {
        let result = allCompanies;
        if (mainFilterInputs.keyword) {
            const keywordLower = mainFilterInputs.keyword.toLowerCase();
            result = result.filter(company =>
                company.name.toLowerCase().includes(keywordLower) ||
                company.industry.toLowerCase().includes(keywordLower)
            );
        }
        if (mainFilterInputs.location) {
            result = result.filter(company => company.location === mainFilterInputs.location);
        }
        if (mainFilterInputs.industry) {
            result = result.filter(company => company.industry === mainFilterInputs.industry);
        }
        setSearchedCompanies(result);
        setCurrentPage(1);
    };

    useEffect(() => {
        let result = searchedCompanies;
        if (sidebarFilters.companySizes.length > 0) {
            result = result.filter(company => sidebarFilters.companySizes.includes(company.employees));
        }
        if (sidebarFilters.benefits.length > 0) {
            result = result.filter(company =>
                sidebarFilters.benefits.every(benefit => company.benefits.includes(benefit))
            );
        }
        if (sidebarFilters.rating && sidebarFilters.rating !== 'all') {
            result = result.filter(company => company.rating >= parseFloat(sidebarFilters.rating));
        }
        setDisplayedCompanies(result);
        setCurrentPage(1);
    }, [searchedCompanies, sidebarFilters]);

    const totalPages = Math.ceil(displayedCompanies.length / companiesPerPage);
    const currentCompanies = displayedCompanies.slice((currentPage - 1) * companiesPerPage, currentPage * companiesPerPage);

    return (
        <Box sx={{ bgcolor: 'grey.50', p: 3, width: "1520px", mx: "auto" }}>
            <Card sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
                    <TextField name="keyword" value={mainFilterInputs.keyword} onChange={handleMainFilterChange} placeholder="Tìm theo tên công ty, ngành nghề..." InputProps={{ startAdornment: <InputAdornment position="start"><Search size={20} /></InputAdornment> }} />
                    <FormControl fullWidth>
                        <InputLabel>Địa điểm</InputLabel>
                        <Select name="location" value={mainFilterInputs.location} onChange={handleMainFilterChange} label="Địa điểm">
                            <MenuItem value=""><em>Tất cả địa điểm</em></MenuItem>
                            {Locations.map((location) => <MenuItem key={location} value={location}>{location}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Ngành nghề</InputLabel>
                        <Select name="industry" value={mainFilterInputs.industry} onChange={handleMainFilterChange} label="Ngành nghề">
                            <MenuItem value=""><em>Tất cả ngành nghề</em></MenuItem>
                            {industryOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button onClick={handleSearchClick} variant="contained" sx={{ height: '56px', textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>Tìm kiếm</Button>
                </Box>
            </Card>

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                <Card sx={{ p: 2, borderRadius: 2, width: { xs: '100%', md: '20%' }, alignSelf: 'flex-start' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Bộ lọc</Typography>
                    <Typography fontWeight="medium" sx={{ mb: 1 }}>Quy mô công ty</Typography>
                    {companySizeOptions.map(size => <FormControlLabel key={size} control={<Checkbox name="companySizes" value={size} onChange={handleSidebarCheckboxChange} size="small" />} label={`${size} nhân viên`} sx={{ display: 'block' }} />)}
                    <Divider sx={{ my: 2 }} />
                    <Typography fontWeight="medium" sx={{ mb: 1 }}>Lợi ích công ty</Typography>
                    {benefitOptions.map(benefit => <FormControlLabel key={benefit} control={<Checkbox name="benefits" value={benefit} onChange={handleSidebarCheckboxChange} size="small" />} label={benefit} sx={{ display: 'block' }} />)}
                    <Divider sx={{ my: 2 }} />
                    <Typography fontWeight="medium" sx={{ mb: 1 }}>Đánh giá</Typography>
                    <FormControl>
                        <RadioGroup name="rating" value={sidebarFilters.rating} onChange={handleSidebarRadioChange}>
                            {ratingOptions.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio size="small" />} label={option.label} />)}
                        </RadioGroup>
                    </FormControl>
                </Card>

                <Box sx={{ width: { xs: '100%', md: '75%' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography>Hiển thị <strong>{displayedCompanies.length}</strong> công ty</Typography>
                        <ToggleButtonGroup value={viewMode} exclusive onChange={(e, newMode) => newMode && setViewMode(newMode)}>
                            <ToggleButton value="grid" aria-label="grid view"><GridIcon /></ToggleButton>
                            <ToggleButton value="list" aria-label="list view"><ListIcon /></ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {currentCompanies.length > 0 ? (
                        viewMode === 'grid' ? (
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 2 }}>
                                {currentCompanies.map(company => (
                                    <Card key={company.id} onClick={() => router.push(`/companies/${company.id}`)} sx={{ display: 'flex', flexDirection: 'column', transition: '0.2s', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }, borderRadius: 2, cursor: 'pointer' }}>
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, alignItems: 'center' }}>
                                            <CardMedia component="img" image={company.logo} sx={{ width: 56, height: 56, borderRadius: 1.5, mb: 1.5 }} />
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2, minHeight: 48 }}>
                                                <Typography fontWeight="bold" component="h3" sx={{ lineHeight: 1.2, textAlign: 'center' }}>{company.name}</Typography>
                                                {company.isTopCompany && <Chip label="Hàng đầu" color="info" size="small" />}
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, my: 1, flexGrow: 1, color: 'text.secondary' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Star size={16} /><Typography variant="body2">{company.rating} sao ({company.reviews} đánh giá)</Typography></Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><MapPin size={16} /><Typography variant="body2">{company.location}</Typography></Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Users size={16} /><Typography variant="body2">{company.employees} nhân viên</Typography></Box>
                                            </Box>
                                            <Divider sx={{ my: 1.5, width: '100%' }} />
                                            <Typography sx={{ color: 'primary.main', fontWeight: 'medium', mt: 'auto' }}>{company.jobs} việc làm đang tuyển</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {currentCompanies.map(company => (
                                    <Card key={company.id} sx={{ borderRadius: 2, transition: '0.2s', '&:hover': { boxShadow: 4 } }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', p: 2, gap: 2 }}>
                                            <CardMedia component="img" image={company.logo} onClick={() => router.push(`/company/${company.id}`)} sx={{ width: 80, height: 80, borderRadius: 1.5, cursor: 'pointer', flexShrink: 0 }} />
                                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                    <Typography variant="h6" fontWeight="bold" onClick={() => router.push(`/company/${company.id}`)} sx={{ cursor: 'pointer' }}>{company.name}</Typography>
                                                    {company.isTopCompany && <Chip label="Công ty hàng đầu" color="info" size="small" />}
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{company.industry}</Typography>
                                                <Box sx={{ color: 'text.secondary', display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MapPin size={16} /><Typography variant="body2">{company.location}</Typography></Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Users size={16} /><Typography variant="body2">{company.employees} nhân viên</Typography></Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Star size={16} /><Typography variant="body2">{company.rating} sao</Typography></Box>
                                                </Box>
                                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>"{company.description}"</Typography>
                                            </Box>
                                            <Button variant="contained" onClick={() => router.push(`/company/${company.id}/jobs`)} sx={{ mt: { xs: 2, sm: 0 }, textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' }, flexShrink: 0 }}>Xem {company.jobs} việc làm</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )
                    ) : (
                        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <Typography variant="h6">Không tìm thấy công ty phù hợp</Typography>
                            <Typography color="text.secondary">Vui lòng thử lại với các từ khóa hoặc bộ lọc khác.</Typography>
                        </Card>
                    )}

                    {displayedCompanies.length > companiesPerPage && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ListCompanyPage;
