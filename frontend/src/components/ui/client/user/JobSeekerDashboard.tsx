"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    FileText,
    Bookmark,
    Send,
    Settings,
    Menu,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '../../common/button/button';
import MyProfile from './MyProfile';
import MyCv from './MyCv';
import SavedJobs from './SavedJobs';
import MyApplycation from './MyApplycation';
import MySettings from './Settings';
const JobSeekerDashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'profile', label: 'Thông tin cá nhân', icon: User },
        { id: 'cv', label: 'Hồ sơ của tôi', icon: FileText },
        { id: 'saved', label: 'Công việc đã lưu', icon: Bookmark },
        { id: 'application', label: 'Ứng dụng', icon: Send },
        { id: 'settings', label: 'Cài đặt', icon: Settings },
    ];
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (<MyProfile />);
            case 'cv':
                return (<MyCv />);
            case 'saved':
                return (<SavedJobs />);
            case 'application':
                return (<MyApplycation />);
            case 'settings':
                return (<MySettings />);
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className='flex'>
                {/* Sidebar */}
                <div className={`fixed inset-y-0 mt-8 ml-4 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }
sx={{ maxHeight: 'none', overflow: 'visible' }}

`}
                >
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.back('')}
                                className="mr-2">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <h2>Dashboard</h2>
                        </div>
                                          </div>
                    <nav sx={{ position: "fixed", top: 20, left: 20, width: 256, p: 2 }}>
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
                <div className="lg:ml-20 w-full ">
                    {/* Mobile header */}
                    <div className=" lg:hidden flex items-center justify-between p-4 bg-white border-b">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1>Dashboard</h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back('home')}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="p-6 w-full">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default JobSeekerDashboard;
