"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SidebarFilters from './SidebarFilters';
import SearchBar from '../../common/SearchBar';
import CompanyList from './CompanyList';
import { Box } from '@mui/material';
import { allCompanies } from '@/faker/company-data';

export default function ListCompanyPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const companiesPerPage = 9;

    const [sidebarFilters, setSidebarFilters] = useState({ companySizes: [], benefits: [], rating: 'all' });
    const [searchedCompanies, setSearchedCompanies] = useState(allCompanies);
    const [displayedCompanies, setDisplayedCompanies] = useState(allCompanies);

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

    const handleSearchResult = (searchResult) => {
        setSearchedCompanies(searchResult);
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
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
    }, [searchedCompanies, sidebarFilters]);

    const totalPages = Math.ceil(displayedCompanies.length / companiesPerPage);
    const currentCompanies = useMemo(() =>
        displayedCompanies.slice((currentPage - 1) * companiesPerPage, currentPage * companiesPerPage),
        [displayedCompanies, currentPage]
    );

    return (
        <Box sx={{ bgcolor: 'grey.50', p: 3, width: "1520px", mx: "auto" }}>
            <SearchBar allCompanies={allCompanies} onSearchResult={handleSearchResult} />
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                <SidebarFilters
                    sidebarFilters={sidebarFilters}
                    onCheckboxChange={handleSidebarCheckboxChange}
                    onRadioChange={handleSidebarRadioChange}
                />
                <CompanyList
                    companies={currentCompanies}
                    viewMode={viewMode}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(e, value) => setCurrentPage(value)}
                    onViewModeChange={(e, newMode) => newMode && setViewMode(newMode)}
                />
            </Box>
        </Box>
    );
}
