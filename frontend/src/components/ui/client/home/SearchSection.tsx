"use client";

import { ArrowRight } from "lucide-react";

import React, { useState, useRef } from "react";
import { Box, ClickAwayListener, Portal, Paper } from "@mui/material";
import { Button } from "@/components/ui/button"
import {
    BriefcaseBusiness,
    ChartNoAxesCombined,
    ChevronsRight,
    List,
    Search,
} from "lucide-react";
import HeroSlider from "@/components/ui/common/HeroSlider";

import ImageBanner1 from "@/assets/images/banner5.png";
import ImageBanner2 from "@/assets/images/banner6.png";
import ImageBanner3 from "@/assets/images/banner7.png";
import image from "@/assets/images/banner11.png";
import Link from "next/link";

const SearchSection: React.FC = () => {
    const [statsData, setStatsData] = useState([
        {
            id: 1,
            number: "60K+",
            description: "Ứng viên đã tìm việc",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            )
        },
        {
            id: 2,
            number: "1,200",
            description: "Việc làm mỗi nhật",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            )
        },
        {
            id: 3,
            number: "95%",
            description: "Tỷ lệ thành công",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            )
        },
        {
            id: 4,
            number: "60K+",
            description: "Ứng viên đã tìm việc",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            )
        },
        {
            id: 5,
            number: "1,200",
            description: "Việc làm mỗi nhật",
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            )
        },

    ]);
    const StatsCard = ({ card }: { card: any }) => {
        return (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 w-[200px] h-[200px] ml-[15px] mr-[15px]">
                <div className="flex flex-col items-center text-center h-full justify-center">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {card.icon}
                        </svg>
                    </div>
                    {/* Number */}
                    <div className="text-3xl font-bold text-gray-800 mb-2">{card.number}</div>
                    {/* Description */}
                    <div className="text-sm text-gray-600 leading-relaxed">{card.description}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full mx-auto py-16 bg-[#FBE4B2] min-h-[700px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Banner */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#FFD09B] rounded-full px-8 py-3">
                        <p className="text-lg font-bold text-gray-800">
                            Tìm việc làm nhanh, việc làm mới trên toàn quốc
                        </p>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                        Tiếp cận{' '}
                        <span className="text-5xl font-bold bg-gradient-to-r from-[#CD6D00] via-[#CD6D00] to-[#FF0000] bg-clip-text text-transparent">
                            60,000+
                        </span>{' '}
                        cơ hội việc làm từ hàng nghìn doanh nghiệp tại Việt Nam
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="text-center mb-8">
                    <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                        Tìm việc làm nhanh, việc làm mới nhất từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-center gap-8 mb-12">
                    <Button
                        size="lg"
                        className="bg-[#DA5D1A] hover:bg-[#C54A0F] text-white px-12 py-5 text-2xl font-black h-16 min-w-[400px]"
                        style={{
                            backgroundColor: '#DA5D1A',
                            borderRadius: '999px',
                            fontWeight: 900,
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Link href="/login" className="flex items-center gap-3">
                            KHAM PHA NGAY TAI CV KING
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 hover:text-black px-8 py-5 text-2xl font-black h-16 min-w-[250px] border-2 border-gray-200"
                        style={{
                            borderRadius: '999px',
                            backgroundColor: 'white',
                            color: 'black',
                            fontWeight: 900,
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Link href="#">
                            TAO CV MIEN PHI
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-wrap justify-center gap-4">
                    {statsData.map((card) => (
                        <StatsCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
