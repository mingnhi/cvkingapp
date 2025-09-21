"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import SidebarFilters from './SidebarFilters';
import NoResult from './NoResult';
import CompanyList from './CompanyList';
import { Box } from '@mui/material';
import { allCompanies } from '@/faker/company-data';

export default function ListCompanyPage() {
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
        <Box
            sx={{ 
                bgcolor: 'grey.50',
                p: 3, width: "1520px",
                mx: "auto" }}>
            <SearchBar 
                mainFilterInputs={mainFilterInputs}
                onMainFilterChange={handleMainFilterChange}
                onSearchClick={handleSearchClick} />
            <Box 
                sx={{ display: 'flex', 
                    gap: 3,
                    flexDirection: { xs: 'column', md: 'row' } }}>
                <SidebarFilters
                    sidebarFilters={sidebarFilters}
                    onCheckboxChange={handleSidebarCheckboxChange}
                    onRadioChange={handleSidebarRadioChange} />
                <CompanyList
                    companies={currentCompanies}
                    viewMode={viewMode} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(e, value) => setCurrentPage(value)}
                    onViewModeChange={(e, newMode) => newMode && setViewMode(newMode)} />
            </Box>
        </Box>
    );
}
