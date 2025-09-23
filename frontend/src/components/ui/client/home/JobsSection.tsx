"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import employee from "@/assets/images/employee.png";
import { Bookmark, Briefcase, Clock, DollarSign, Eye, MapPin, Search, Upload } from "lucide-react";
import {Button,Card} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Thêm để tối ưu SEO
import { Badge , CardContent } from "@mui/material";
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

  // Giả lập fetch dữ liệu từ API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Giả lập dữ liệu (thay bằng API call thực tế)
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
          <h2 className="text-3xl mb-4 text-gray-900">Featured Jobs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked job opportunities from top companies
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
                  <div className="flex items-center text-sm text-gray-500 ml-3.5">
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
                    <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {tag}
                    </Badge>
                  )) ?? null}
                </div>

                <div className="flex items-center max-w-full justify-between">
                  <Badge
                    variant={job.type === "Toàn thời gian" ? "default" : "outline"}
                    className={job.type === "Toàn thời gian" ? "bg-green-100 text-green-700" : ""}
                  >
                    {job.type ?? "Chưa xác định"}
                  </Badge>
                  <Button
                    size="sm"
                    className="text-white group-hover:bg-orange-600 transition-colors"
                    style={{ backgroundColor: "#f26b38" }}
                    onClick={(e) => handleApplyClick(e, job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/jobs" passHref>
            <Button
              variant="outline"
              size="lg"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
