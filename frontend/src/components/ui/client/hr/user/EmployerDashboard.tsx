"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import { ArrowLeft, X, Menu, Briefcase, Building2, Settings, Star, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/components/AppContext';
import Setting from './Setting';
import CompanyProfile from './CompanyProfile';
import JobPostings from './JobPostings';
import CandidateManagement from './CandidateManagement';
import SavedCandidates from './SavedCandidates';
import Overview from './Overview';

const EmployerDashboard = () => {
    const { navigateTo } = useApp();
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'company', label: 'Company Profile', icon: Building2 },
        { id: 'jobs', label: 'Job Postings', icon: Briefcase },
        { id: 'candidates', label: 'Candidate Management', icon: Users },
        { id: 'saved', label: 'Saved Candidates', icon: Star },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview />;
            case 'company':
                return <CompanyProfile />;
            case 'jobs':
                return <JobPostings />;
            case 'candidates':
                return <CandidateManagement />;
            case 'saved':
                return <SavedCandidates />;
            case 'settings':
                return <Setting />;
            default:
                return <div>page not found</div>
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 lg:flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-64 lg:shrink-0 px-[5px] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => navigateTo('home')}
                            className="mr-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <h2>Employer Dashboard</h2>
                    </div>
                    <Button
                        variant="text"
                        size="small"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <nav className="mt-6">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${activeTab === item.id ? 'bg-orange-50 text-primary border-r-2 border-primary' : 'text-gray-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 px-[45px]">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <h1>Dashboard</h1>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => navigateTo('home')}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </div>
                {/* Content */}
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
export default EmployerDashboard;