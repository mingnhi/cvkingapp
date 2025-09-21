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
import { industryOptions , Locations } from '@/faker/company-data';
interface SearchBarProps {
    mainFilterInputs: { keyword: string; location: string; industry: string };
    onMainFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSearchClick: () => void;
}

export default function SearchBar({ mainFilterInputs, onMainFilterChange, onSearchClick }: SearchBarProps) {
    return (
        <Card 
            sx={{ p: 2, 
                mb: 3,
                borderRadius: 2 }}>
            <Box 
                sx={{
                    display: 'grid', 
                    gridTemplateColumns:
                    { xs: '1fr',
                        md: '2fr 1fr 1fr auto' },
                    gap: 2,
                    alignItems: 'center' }}>
                <TextField 
                    name="keyword"
                    value={mainFilterInputs.keyword}
                    onChange={onMainFilterChange}
                    placeholder="Tìm theo tên công ty, ngành nghề..." 
                    InputProps={
                        { startAdornment:
                            <InputAdornment 
                                position="start">
                                <Search size={20} />
                            </InputAdornment> }} />
                <FormControl
                    fullWidth>
                    <InputLabel>
                        Địa điểm
                    </InputLabel>
                    <Select
                        name="location" 
                        value={mainFilterInputs.location}
                        onChange={onMainFilterChange}
                        label="Địa điểm">
                        <MenuItem 
                            value="">
                            <em>
                                Tất cả địa điểm
                            </em>
                        </MenuItem>
                        {Locations.map((location) => <MenuItem
                            key={location} 
                            value={location}>
                            {location}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth>
                    <InputLabel>
                        Ngành nghề
                    </InputLabel>
                    <Select
                        name="industry" 
                        value={mainFilterInputs.industry}
                        onChange={onMainFilterChange}
                        label="Ngành nghề">
                        <MenuItem
                            value="">
                            <em>
                                Tất cả ngành nghề
                            </em>
                        </MenuItem>
                        {industryOptions.map((option) => <MenuItem 
                            key={option.value}
                            value={option.value}>
                            {option.label}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <Button
                    onClick={onSearchClick}
                    variant="contained"
                    sx={{ height: '56px',
                        textTransform: 'none', 
                        bgcolor: '#000',
                        '&:hover': { bgcolor: '#333' } }}>
                    Tìm kiếm
                </Button>
            </Box>
        </Card>
    );
}
