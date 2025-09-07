"use client";

import { useApp } from "@/components/AppContext";
import { useState } from "react";
const EditCompanyPage = () => {
    const { state, navigateTo, setUser } = useApp();

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
    return (
        <div>
            <h1>Edit Company</h1>
        </div>
    );
}