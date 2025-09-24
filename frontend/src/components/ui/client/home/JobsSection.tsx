"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import employee from "@/assets/images/employee.png";
import { Bookmark, Briefcase, Clock, DollarSign, Eye, MapPin, Search, Upload } from "lucide-react";
import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Thêm để tối ưu SEO
import { Badge, CardContent } from "@mui/material";
import { mockJobs } from "@/faker/home-data";
// Định nghĩa giao diện Job
interface Job {
    id: number;
    title: string;
    company: string;
    logo: any; // Thay bằng kiểu cụ thể nếu có (ví dụ: StaticImageData nếu dùng next/image)
    location: string;
    salary: string;
    type: string | null | undefined;
    posted: string;
    tags: string[] | null | undefined;
    featured: boolean;
    description: string;
    requirements: string[];
    benefits: string[];
}

const JobsSection = () => {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setJobs(mockJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleJobClick = (job: Job) => {
        router.push(`/jobs-detail?job=${encodeURIComponent(JSON.stringify(job))}`);
    };

    const handleApplyClick = (e: React.MouseEvent, job: Job) => {
        e.stopPropagation();
        router.push(`/jobs-detail?job=${encodeURIComponent(JSON.stringify(job))}`);
    };

    const handleSaveJob = (e: React.MouseEvent, job: Job) => {
        e.stopPropagation();
        alert(`Job "${job.title}" saved to your list!`);
    };

    if (loading) {
        return <div className="text-center py-16">Đang tải công việc...</div>;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                 <h2 className="text-3xl mb-4 text-gray-900 font-bold">VIỆC LÀM NỔI BẬT</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá cơ hội việc làm từ các công ty hàng đầu
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {jobs.map((job) => (
                        <Card
                            key={job.id}
                            className="group hover:shadow-background transition-all duration-300 border-gray-100 shadow-md cursor-pointer"
                            onClick={() => handleJobClick(job)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Image
                                            width={50}
                                            height={40}
                                            src={job.logo}
                                            alt={job.company}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className="text-gray-400 hover:text-orange-600"
                                        onClick={(e) => handleSaveJob(e, job)}
                                    >
                                        <Bookmark className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {job.posted}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {job.tags?.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="standard"
                                            sx={{
                                                backgroundColor: '#fed7aa', // orange-100
                                                color: '#c2410c', // orange-700
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem', // text-xs
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Bóng nhẹ bình thường
                                                transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
                                                '&:hover': {
                                                    backgroundColor: '#fdba74', // orange-200
                                                    color: '#7c2d12', // orange-900
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Bóng đậm hơn khi hover
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            {tag}
                                        </Badge>
                                    )) ?? null}
                                </div>
                                <div className="flex items-center max-w-full justify-between">
                                    <Badge
                                        variant="standard" 
                                        sx={{
                                            backgroundColor: job.type === "Toàn thời gian" ? '#dcfce7' : '#ffffff',
                                            color: job.type === "Toàn thời gian" ? '#15803d' : '#000000', // green-700 hoặc đen
                                            border: job.type === "Toàn thời gian" ? 'none' : '1px solid #000000', // Viền xanh cho outline
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem', // text-xs
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Bóng nhẹ bình thường
                                            transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
                                            '&:hover': {
                                                backgroundColor: job.type === "Toàn thời gian" ? '#bbf7d0' : '#f1f5f9', // green-200 hoặc gray-100
                                                color: job.type === "Toàn thời gian" ? '#14532d' : '#1e293b', // green-900 hoặc gray-800
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Bóng đậm hơn khi hover
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        {job.type ?? "Chưa xác định"}
                                    </Badge>         
                                    <Button
                                        size="small"
                                        sx={{
                                            backgroundColor: '#ffffff', // Nền trắng bình thường
                                            color: '#000000', // Chữ đen bình thường
                                            border: '1px solid #f26b38', // Viền cam để giữ giao diện đẹp
                                            transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#ffffff', // Nền trắng khi hover
                                                color: '#000000', // Chữ đen khi hover
                                            },
                                            '&:active': {
                                                backgroundColor: '#f26b38', // Nền cam khi nhấn
                                                color: '#ffffff', // Chữ trắng khi nhấn
                                            },
                                        }}
                                        onClick={(e) => handleApplyClick(e, job)}
                                    >
                                        ỨNG TUYỂN NGAY
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        variant="outlined" // Sử dụng "outlined" thay vì "outline"
                        size="large" // Sử dụng "large" thay vì "lg"
                        sx={{
                            borderColor: '#f97316', // Màu cam (orange-600)
                            color: '#f97316', // Màu chữ cam
                            '&:hover': {
                                backgroundColor: '#fff7ed', // Màu nền hover (orange-50)
                                borderColor: '#ea580c', // Tùy chọn: làm đậm viền khi hover
                                color: '#ea580c', // Tùy chọn: thay đổi màu chữ khi hover
                            },
                        }}
                        onClick={() => router.push('/list-company')}
                    >
                        Danh sách công việc
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default JobsSection;
