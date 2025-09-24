"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

// Custom Button Component
const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-white shadow-md hover:shadow-lg",
    link: "text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Custom Link Component
const Link = ({ children, href, className = "", ...props }) => (
  <a href={href} className={`${className} transition-opacity hover:opacity-80`} {...props}>
    {children}
  </a>
);

const SearchSection = () => {
  const [statsData] = useState([
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
      description: "Việc làm mỗi ngày",
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
      number: "10K+",
      description: "Doanh nghiệp tin tưởng",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      )
    },
    {
      id: 5,
      number: "24/7",
      description: "Hỗ trợ không ngừng",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      )
    }
  ]);

  const StatsCard = ({ card }) => {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 transform hover:-translate-y-1 hover:scale-102 group">
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
            <svg className="w-5 h-5 text-orange-600 group-hover:text-orange-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {card.icon}
            </svg>
          </div>
          {/* Number */}
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {card.number}
          </div>
          {/* Description */}
          <div className="text-xs text-gray-600 leading-tight font-medium">
            {card.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 h-screen w-full overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-200/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300/20 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-orange-200/80 to-yellow-200/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-white/20">
            <p className="text-sm md:text-base font-semibold text-orange-800">
              Tìm việc làm nhanh, việc làm mới trên toàn quốc
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6 max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Tiếp cận{' '}
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              60,000+
            </span>{' '}
            cơ hội việc làm từ hàng nghìn doanh nghiệp tại Việt Nam
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
            Tìm việc làm nhanh, việc làm mới nhất từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <Button className="px-6 py-3 rounded-full text-base font-bold min-w-[220px] h-12">
            <Link href="/login" className="inline-flex items-center gap-2 text-white no-underline">
              Khám phá ngay tại CVKING 
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="px-6 py-3 rounded-full text-base font-bold min-w-[200px] h-12"
          >
            <Link href="#" className="text-inherit no-underline">
              Tạo CV miễn phí
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-5 gap-10 px-4">
              {statsData.map((card) => (
                <StatsCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
     </div>
    </div>
  );
};

export default SearchSection;
