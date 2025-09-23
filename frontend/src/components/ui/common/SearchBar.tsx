"use client";
import { useState } from 'react';
import { Search } from 'lucide-react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Card,
} from '@mui/material';
import {allCompanies, industryOptions, Locations } from '@/faker/company-data';

interface SearchBarProps {
    allCompanies: any[]; // Danh sách công ty gốc
    onSearchResult: (result: any[]) => void; // Callback truyền kết quả lọc
}

export default function SearchBar({ allCompanies, onSearchResult }: SearchBarProps) {
    const [filters, setFilters] = useState<allCompanies|"name">("TechCom");
const [query,setQuery] = useState();    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`[SearchBar] Changing filter: ${name} to ${value}`);
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchClick = () => {
        console.log(`[SearchBar] Search clicked with filters:`, filters);
        let result = [...allCompanies]; // Sao chép để tránh mutate trực tiếp
        if (filters.keyword) {
            const keywordLower = filters.keyword.toLowerCase();
            result = result.filter(company =>
                company.name.toLowerCase().includes(keywordLower) ||
                company.industry.toLowerCase().includes(keywordLower)
            );
            console.log(`[SearchBar] Filtered by keyword "${filters.keyword}", result length: ${result.length}`);
        }
        if (filters.location) {
            result = result.filter(company => company.location === filters.location);
            console.log(`[SearchBar] Filtered by location "${filters.location}", result length: ${result.length}`);
        }
        if (filters.industry) {
            result = result.filter(company => company.industry === filters.industry);
            console.log(`[SearchBar] Filtered by industry "${filters.industry}", result length: ${result.length}`);
        }
        console.log(`[SearchBar] Final search result length: ${result.length}`);
        onSearchResult(result); // Truyền kết quả lọc ra ngoài
    };

    return (
        <Card sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box 
                sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 
                    { xs: '1fr', md: '2fr 1fr 1fr auto' }, 
                    gap: 2, alignItems: 'center' }}>
                <TextField
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                    placeholder="Tìm theo tên công ty, ngành nghề..."
                />
              
                <FormControl fullWidth>
                    <InputLabel>
                        Địa điểm
                    </InputLabel>
                    <Select 
                        name="location" 
                        value={filters.location}
                        onChange={handleFilterChange}
                        label="Địa điểm">
                        <MenuItem 
                            value="">
                            <em>Tất cả địa điểm
                            </em>
                        </MenuItem>
                        {Locations.map((location) => 
                            <MenuItem 
                                key={location}
                                value={location}>{location}
                            </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Ngành nghề</InputLabel>
                    <Select
                        name="industry" 
                        value={filters.industry} 
                        onChange={handleFilterChange} 
                        label="Ngành nghề">
                        <MenuItem
                            value=""><em>Tất cả ngành nghề</em>
                        </MenuItem>
                        {industryOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button
                    onClick={handleSearchClick}
                    variant="contained"
                    sx={{ height: '56px', textTransform: 'none', bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                >
                    Tìm kiếm
                </Button>
            </Box>
        </Card>
    );
}
