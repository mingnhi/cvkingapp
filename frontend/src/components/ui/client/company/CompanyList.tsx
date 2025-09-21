import { useMemo } from 'react';
import { Grid as GridIcon, List as ListIcon } from 'lucide-react';
import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Pagination,
} from '@mui/material';
import CompanyCard from './CompanyCard';
import NoResult from '../../common/NoResult';
interface CompanyListProps {
    companies: any[];
    viewMode: 'grid' | 'list';
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onViewModeChange: (mode: 'grid' | 'list') => void;
    router: any;
}

export default function CompanyList({ companies, viewMode, currentPage, totalPages, onPageChange, onViewModeChange }: CompanyListProps) {
    return (
        <Box sx={{ width: { xs: '100%', md: '75%' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography>
                    Hiển thị
                    <strong>
                        {companies.length}
                    </strong>
                    công ty
                </Typography>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive onChange={onViewModeChange}>
                    <ToggleButton 
                        value="grid" 
                        aria-label="grid view">
                        <GridIcon />
                    </ToggleButton>
                    <ToggleButton 
                        value="list"
                        aria-label="list view">
                        <ListIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {companies.length > 0 ? (
                viewMode === 'grid' ? (
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { 
                            xs: '1fr', 
                            sm: '1fr 1fr', 
                            lg: '1fr 1fr 1fr' },
                        gap: 2 }}>
                        {companies.map(company => (
                            <CompanyCard
                                key={company.id} 
                                company={company}
                                viewMode={viewMode} />
                        ))}
                    </Box>
                ) : (
                    <Box
                            sx={{
                                display: 'flex', 
                                flexDirection: 'column',
                                gap: 2 }}>
                        {companies.map(company => (
                            <CompanyCard
                                    key={company.id}
                                    company={company}
                                    viewMode={viewMode} />
                        ))}
                    </Box>
                )
            ) : (
                <NoResult />
            )}

            {companies.length > 9 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                        count={totalPages}
                        page={currentPage}
                        onChange={onPageChange}
                        color="primary" />
                </Box>
            )}
        </Box>
    );
}
