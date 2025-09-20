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
    LogOut
} from 'lucide-react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    AppBar,
    IconButton,
    Typography,
    CssBaseline,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import MyProfile from './MyProfile';
import MyCv from './MyCv';
import SavedJobs from './SavedJobs';
import MyApplication from './MyApplycation';
import MySettings from './Settings';

const drawerWidth = 240; // Chiều rộng của thanh sidebar

const JobSeekerDashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigationItems = [
        { id: 'profile', label: 'Thông tin cá nhân', icon: User },
        { id: 'cv', label: 'Quản lý CV', icon: FileText },
        { id: 'saved', label: 'Việc làm đã lưu', icon: Bookmark },
        { id: 'application', label: 'Việc đã ứng tuyển', icon: Send },
        { id: 'settings', label: 'Cài đặt', icon: Settings },
    ];

    // Nội dung của thanh sidebar
    const drawerContent = (
        <div className="mt-15">

            <Toolbar sx={{ justifyContent: 'center', py: 2  }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    Dashboard
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton
                                selected={activeTab === item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    if (!isLgUp) setMobileOpen(false); // Đóng sidebar trên mobile sau khi chọn
                                }}
                                sx={{ my: 0.5, mx: 1, borderRadius: 1 }}
                            >
                                <ListItemIcon>
                                    <Icon size={20} />
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ my: 0.5, mx: 1, borderRadius: 1 }}>
                            <ListItemIcon>
                                <LogOut size={20} />
                            </ListItemIcon>
                            <ListItemText primary="Đăng xuất" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <MyProfile />;
            case 'cv': return <MyCv />;
            case 'saved': return <SavedJobs />;
            case 'application': return <MyApplication />;
            case 'settings': return <MySettings />;
            default: return <div>Trang không tồn tại</div>;
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50', marginTop: '5vh' }}>
            <CssBaseline />

            {/* Header trên mobile */}
            <AppBar
                position="fixed"
                sx={{
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },
                    display: { lg: 'none' }, // Chỉ hiển thị trên mobile
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {navigationItems.find(item => item.id === activeTab)?.label}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Thanh Sidebar */}
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
            >
                {/* Sidebar cho mobile (hiện ra khi bấm nút) */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                {/* Sidebar cho desktop (luôn hiển thị) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Nội dung chính (có thể cuộn) */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: '64px', lg: 0 }, 
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
};

export default JobSeekerDashboard;
