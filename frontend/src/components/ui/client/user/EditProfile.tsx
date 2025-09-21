"use client";
import { useState, useEffect } from 'react';
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    Plus,
    Camera
} from 'lucide-react';
import { Button } from '../../common/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import { Textarea } from '../../common/texttarea/texttarea';
import { Input } from '@/components/input';
import { Label } from '../../common/label/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../common/select/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../common/avatar/avatar';
import { Badge } from '@mui/material';
import { Separator } from '../../common/separator';
import { useApp } from '@/components/AppContext';
import { useRouter } from 'next/navigation';
// Simple toast function
const toast = (message: string) => {
    // In a real app, you would use proper toast notifications
    alert(message);
};

// Validation functions
const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
};

const validateUrl = (url: string) => {
    if (!url) return true; // Optional field
    try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
    } catch {
        return false;
    }
};

const EditProfilePage = () => {
    const { state, navigateTo, setUser } = useApp();
    const isEmployer = state.user?.userType === 'employer';
    const router = useRouter();
    // Job Seeker Profile State
    const [jobSeekerData, setJobSeekerData] = useState({
        name: 'Nguyen Van A',
        email: 'nguyen.van.a@email.com',
        phone: '+84 123 456 789',
        location: 'Ho Chi Minh City',
        title: 'Senior Frontend Developer',
        summary: 'Experienced frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies.',
        expectedSalary: '$2000 - $3000',
        experience: '5+ years',
        education: 'Bachelor of Computer Science - University of Technology',
        linkedin: 'linkedin.com/in/nguyenvana',
        github: 'github.com/nguyenvana',
        portfolio: 'https://nguyenvana.dev',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    });

    // Employer Profile State
    const [employerData, setEmployerData] = useState({
        companyName: 'TechCorp Vietnam',
        contactName: 'HR Manager',
        email: 'hr@techcorp.vn',
        phone: '+84 123 456 789',
        website: 'www.techcorp.vn',
        industry: 'Information Technology',
        companySize: '100-500',
        foundedYear: '2015',
        address: 'District 1, Ho Chi Minh City',
        description: 'Leading software development company specializing in web and mobile applications. We work with clients across various industries to deliver innovative digital solutions that drive business growth.',
        avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face'
    });

    const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker']);
    const [benefits, setBenefits] = useState([
        'Competitive salary and bonuses',
        'Flexible working hours',
        'Health insurance',
        'Annual leave and sick leave',
        'Professional development opportunities',
        'Modern office environment',
        'Team building activities',
        'Work from home options'
    ]);

    const [newSkill, setNewSkill] = useState('');
    const [newBenefit, setNewBenefit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Initialize with current user data if available
        if (state.user) {
            if (isEmployer) {
                setEmployerData(prev => ({
                    ...prev,
                    contactName: state.user.name || prev.contactName,
                    email: state.user.email || prev.email,
                    companyName: state.user.company || prev.companyName,
                    avatar: state.user.avatar || prev.avatar
                }));
            } else {
                setJobSeekerData(prev => ({
                    ...prev,
                    name: state.user.name || prev.name,
                    email: state.user.email || prev.email,
                    avatar: state.user.avatar || prev.avatar
                }));
            }
        }
    }, [state.user, isEmployer]);

    const handleJobSeekerChange = (field: string, value: string) => {
        setJobSeekerData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleEmployerChange = (field: string, value: string) => {
        setEmployerData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
            setHasChanges(true);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
        setHasChanges(true);
    };

    const addBenefit = () => {
        if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
            setBenefits([...benefits, newBenefit.trim()]);
            setNewBenefit('');
            setHasChanges(true);
        }
    };

    const removeBenefit = (benefitToRemove: string) => {
        setBenefits(benefits.filter(benefit => benefit !== benefitToRemove));
        setHasChanges(true);
    };

    const handleAvatarUpload = () => {
        // Mock avatar upload - in real app, this would handle file upload
        const mockAvatars = [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1494790108755-2616b612b5e9?w=150&h=150&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        ];

        const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];

        if (isEmployer) {
            setEmployerData(prev => ({ ...prev, avatar: randomAvatar }));
        } else {
            setJobSeekerData(prev => ({ ...prev, avatar: randomAvatar }));
        }

        toast('Avatar updated successfully!');
        setHasChanges(true);
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            // Validation
            const currentData = isEmployer ? employerData : jobSeekerData;

            if (!currentData.email || !validateEmail(currentData.email)) {
                toast('Please enter a valid email address.');
                return;
            }

            if (isEmployer) {
                if (!employerData.companyName.trim()) {
                    toast('Company name is required.');
                    return;
                }
                if (!employerData.contactName.trim()) {
                    toast('Contact person name is required.');
                    return;
                }
                if (employerData.phone && !validatePhone(employerData.phone)) {
                    toast('Please enter a valid phone number.');
                    return;
                }
                if (employerData.website && !validateUrl(employerData.website)) {
                    toast('Please enter a valid website URL.');
                    return;
                }
            } else {
                if (!jobSeekerData.name.trim()) {
                    toast('Full name is required.');
                    return;
                }
                if (jobSeekerData.phone && !validatePhone(jobSeekerData.phone)) {
                    toast('Please enter a valid phone number.');
                    return;
                }
                if (jobSeekerData.portfolio && !validateUrl(jobSeekerData.portfolio)) {
                    toast('Please enter a valid portfolio URL.');
                    return;
                }
                if (skills.length === 0) {
                    toast('Please add at least one skill.');
                    return;
                }
            }

            // Mock save delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update user in context
            const updatedUser = {
                ...state.user!,
                name: isEmployer ? employerData.contactName : jobSeekerData.name,
                email: isEmployer ? employerData.email : jobSeekerData.email,
                avatar: isEmployer ? employerData.avatar : jobSeekerData.avatar,
                company: isEmployer ? employerData.companyName : undefined
            };

            setUser(updatedUser);
            toast('Profile updated successfully!');

            // Navigate back to appropriate dashboard
            navigateTo(isEmployer ? 'employer-dashboard' : '/user/a');
        } catch (error) {
            toast('Error updating profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (hasChanges) {
            const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
            if (!confirmLeave) return;
        }
        router.back(isEmployer ? '/user/a' : 'user/a');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                            className="hover:bg-gray-100"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {isEmployer ? 'Edit Company Profile' : 'Edit Profile'}
                            </h1>
                            <p className="text-gray-600">
                                {isEmployer ? 'Update your company information' : 'Update your personal information'}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Avatar Section */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={isEmployer ? employerData.avatar : jobSeekerData.avatar} />
                                        <AvatarFallback>
                                            {isEmployer
                                                ? employerData.companyName.charAt(0)
                                                : jobSeekerData.name.split(' ').map(n => n[0]).join('')
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                        onClick={handleAvatarUpload}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Profile Photo</h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {isEmployer ? 'Upload your company logo' : 'Upload your profile photo'}
                                    </p>
                                    <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Change Photo
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {isEmployer ? (
                        // Employer Profile Form
                        <>
                            {/* Company Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Company Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="companyName">Company Name</Label>
                                            <Input
                                                id="companyName"
                                                value={employerData.companyName}
                                                onChange={(e) => handleEmployerChange('companyName', e.target.value)}
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="industry">Industry</Label>
                                            <Select
                                                value={employerData.industry}
                                                onValueChange={(value) => handleEmployerChange('industry', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select industry" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                                                    <SelectItem value="Finance">Finance</SelectItem>
                                                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                                                    <SelectItem value="Education">Education</SelectItem>
                                                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                                    <SelectItem value="Retail">Retail</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                    <SelectItem value="Consulting">Consulting</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="companySize">Company Size</Label>
                                            <Select
                                                value={employerData.companySize}
                                                onValueChange={(value) => handleEmployerChange('companySize', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select company size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                                    <SelectItem value="51-100">51-100 employees</SelectItem>
                                                    <SelectItem value="100-500">100-500 employees</SelectItem>
                                                    <SelectItem value="500-1000">500-1000 employees</SelectItem>
                                                    <SelectItem value="1000+">1000+ employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="foundedYear">Founded Year</Label>
                                            <Input
                                                id="foundedYear"
                                                value={employerData.foundedYear}
                                                onChange={(e) => handleEmployerChange('foundedYear', e.target.value)}
                                                placeholder="e.g., 2015"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Company Description</Label>
                                        <Textarea
                                            id="description"
                                            value={employerData.description}
                                            onChange={(e) => handleEmployerChange('description', e.target.value)}
                                            placeholder="Describe your company..."
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="contactName">Contact Person Name</Label>
                                            <Input
                                                id="contactName"
                                                value={employerData.contactName}
                                                onChange={(e) => handleEmployerChange('contactName', e.target.value)}
                                                placeholder="Enter contact person name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={employerData.email}
                                                onChange={(e) => handleEmployerChange('email', e.target.value)}
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={employerData.phone}
                                                onChange={(e) => handleEmployerChange('phone', e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                value={employerData.website}
                                                onChange={(e) => handleEmployerChange('website', e.target.value)}
                                                placeholder="www.company.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Office Address</Label>
                                        <Input
                                            id="address"
                                            value={employerData.address}
                                            onChange={(e) => handleEmployerChange('address', e.target.value)}
                                            placeholder="Enter office address"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Company Benefits */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Company Benefits</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {benefits.map((benefit) => (
                                            <Badge key={benefit} variant="secondary" className="pr-1">
                                                {benefit}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-1 ml-1 hover:bg-transparent"
                                                    onClick={() => removeBenefit(benefit)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            value={newBenefit}
                                            onChange={(e) => setNewBenefit(e.target.value)}
                                            placeholder="Add a benefit..."
                                            onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                                        />
                                        <Button onClick={addBenefit} variant="outline">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        // Job Seeker Profile Form
                        <>
                            {/* Personal Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={jobSeekerData.name}
                                                onChange={(e) => handleJobSeekerChange('name', e.target.value)}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={jobSeekerData.email}
                                                onChange={(e) => handleJobSeekerChange('email', e.target.value)}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={jobSeekerData.phone}
                                                onChange={(e) => handleJobSeekerChange('phone', e.target.value)}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Select
                                                value={jobSeekerData.location}
                                                onValueChange={(value) => handleJobSeekerChange('location', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Ho Chi Minh City">Ho Chi Minh City</SelectItem>
                                                    <SelectItem value="Hanoi">Hanoi</SelectItem>
                                                    <SelectItem value="Da Nang">Da Nang</SelectItem>
                                                    <SelectItem value="Can Tho">Can Tho</SelectItem>
                                                    <SelectItem value="Hai Phong">Hai Phong</SelectItem>
                                                    <SelectItem value="Remote">Remote</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Professional Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title">Job Title</Label>
                                            <Input
                                                id="title"
                                                value={jobSeekerData.title}
                                                onChange={(e) => handleJobSeekerChange('title', e.target.value)}
                                                placeholder="e.g., Senior Frontend Developer"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="experience">Experience Level</Label>
                                            <Select
                                                value={jobSeekerData.experience}
                                                onValueChange={(value) => handleJobSeekerChange('experience', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select experience level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0-1 years">0-1 years</SelectItem>
                                                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                                                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                                                    <SelectItem value="5+ years">5+ years</SelectItem>
                                                    <SelectItem value="10+ years">10+ years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="expectedSalary">Expected Salary</Label>
                                            <Input
                                                id="expectedSalary"
                                                value={jobSeekerData.expectedSalary}
                                                onChange={(e) => handleJobSeekerChange('expectedSalary', e.target.value)}
                                                placeholder="e.g., $2000 - $3000"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="education">Education</Label>
                                            <Input
                                                id="education"
                                                value={jobSeekerData.education}
                                                onChange={(e) => handleJobSeekerChange('education', e.target.value)}
                                                placeholder="Your highest education"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="summary">Professional Summary</Label>
                                        <Textarea
                                            id="summary"
                                            value={jobSeekerData.summary}
                                            onChange={(e) => handleJobSeekerChange('summary', e.target.value)}
                                            placeholder="Write a brief summary about yourself..."
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Skills */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Skills</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="pr-1">
                                                {skill}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-1 ml-1 hover:bg-transparent"
                                                    onClick={() => removeSkill(skill)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            placeholder="Add a skill..."
                                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                        />
                                        <Button onClick={addSkill} variant="outline">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Links */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Professional Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="linkedin">LinkedIn</Label>
                                            <Input
                                                id="linkedin"
                                                value={jobSeekerData.linkedin}
                                                onChange={(e) => handleJobSeekerChange('linkedin', e.target.value)}
                                                placeholder="linkedin.com/in/username"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="github">GitHub</Label>
                                            <Input
                                                id="github"
                                                value={jobSeekerData.github}
                                                onChange={(e) => handleJobSeekerChange('github', e.target.value)}
                                                placeholder="github.com/username"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="portfolio">Portfolio</Label>
                                            <Input
                                                id="portfolio"
                                                value={jobSeekerData.portfolio}
                                                onChange={(e) => handleJobSeekerChange('portfolio', e.target.value)}
                                                placeholder="https://yourportfolio.com"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
