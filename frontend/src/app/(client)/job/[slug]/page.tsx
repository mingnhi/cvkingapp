"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BreadcrumbTabActive from "@/components/ui/common/breadcrumb/BreadcrumbTabActive";
import JobHeader from "@/components/ui/client/job/job-details/JobHeader";
import JobContent from "@/components/ui/client/job/job-details/JobContent";
import CompanySidebar from "@/components/ui/client/job/job-details/CompanySidebar";
import RelatedJobsSidebar from "@/components/ui/client/job/job-details/RelatedJobsSidebar";
import ApplyModal from "@/components/ui/client/job/job-details/ApplyModal";

interface JobDetailPageProps {
  jobId: string | null;
  navigate?: (page: string, id?: string) => void;
}

export default function JobDetailPage({ jobId, navigate }: JobDetailPageProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Mock job data
  const job = {
    id: jobId || "1",
    title: "Lập Trình Viên Frontend Senior",
    company: "TechCorp Vietnam",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=96&h=96&fit=crop&crop=face",
    location: "TP. Hồ Chí Minh",
    salary: "25 - 35 triệu",
    type: "Toàn thời gian",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    deadline: "30/12/2024",
    featured: true,
    urgent: false,
    views: 234,
    applicants: 45,
    tags: ["React", "TypeScript", "Node.js", "Remote", "Senior Level"],
    description: `
Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm để gia nhập đội ngũ phát triển sản phẩm của chúng tôi. 
Bạn sẽ chịu trách nhiệm xây dựng và duy trì các ứng dụng web hiện đại, làm việc chặt chẽ với đội thiết kế UX/UI và backend.

🔹 Trách nhiệm chính:
• Phát triển và duy trì ứng dụng web với React, TypeScript  
• Hợp tác với đội thiết kế để hiện thực hóa UI/UX  
• Tối ưu hiệu suất và trải nghiệm người dùng  
• Code review & mentoring junior developer  
• Tham gia vào quy trình phát triển sản phẩm

🔹 Môi trường làm việc:
• Văn phòng hiện đại tại trung tâm TP.HCM  
• Flexible working time  
• Remote 2-3 ngày/tuần  
• Team building & hoạt động nội bộ thường xuyên
    `,
    requirements: [
      "3+ năm kinh nghiệm với React và TypeScript",
      "Hiểu biết sâu về HTML, CSS, JavaScript ES6+",
      "Kinh nghiệm với state management (Redux, Zustand)",
      "Có kinh nghiệm làm việc với API RESTful và GraphQL",
      "Kiến thức về testing (Jest, React Testing Library)",
      "Kinh nghiệm với Git và CI/CD",
      "Khả năng giao tiếp tốt và làm việc nhóm",
    ],
    benefits: [
      "Lương từ 25-35 triệu VND (có thể thương lượng theo năng lực)",
      "Thưởng dự án và KPI hấp dẫn",
      "Bảo hiểm xã hội, y tế đầy đủ theo quy định",
      "Bảo hiểm sức khỏe cao cấp cho cá nhân và gia đình",
      "Làm việc từ xa 2-3 ngày/tuần",
      "13th month salary + performance bonus",
      "Cơ hội học tập và phát triển với budget training",
      "Môi trường làm việc trẻ, năng động và sáng tạo",
      "Các hoạt động team building, du lịch công ty",
    ],
    companyInfo: {
      name: "TechCorp Vietnam",
      size: "100-500 nhân viên",
      industry: "Công nghệ thông tin",
      website: "https://techcorp.vn",
      email: "hr@techcorp.vn",
      phone: "+84 28 1234 5678",
      address: "Tầng 15, Tòa nhà ABC, 123 Nguyễn Huệ, Quận 1, TP.HCM",
      established: "2016",
      specialties: [
        "Web Development",
        "Mobile Apps",
        "Cloud Solutions",
        "AI/ML",
      ],
    },
  };

  const relatedJobs = [
    {
      id: "2",
      title: "Frontend Developer",
      company: "StartupVN",
      salary: "18 - 25 triệu",
      location: "Hà Nội",
      posted: "1 ngày trước",
      urgent: false,
    },
    {
      id: "3",
      title: "React Developer",
      company: "Digital Agency",
      salary: "20 - 28 triệu",
      location: "Đà Nẵng",
      posted: "3 ngày trước",
      urgent: true,
    },
    {
      id: "4",
      title: "Full Stack Developer",
      company: "Tech Solutions",
      salary: "22 - 32 triệu",
      location: "TP. Hồ Chí Minh",
      posted: "2 ngày trước",
      urgent: false,
    },
  ];

  const handleApply = () => {
    setShowApplyModal(false);
    if (navigate) {
      navigate("cv-builder");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <BreadcrumbTabActive
            items={[
              { name: "Trang chủ", link: "/" },
              { name: "Việc làm", link: "/job" },
              { name: job.title },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Job info */}
          <div className="lg:col-span-2 space-y-6">
            <JobHeader
              job={job}
              onApply={() => setShowApplyModal(true)}
              onViewCompany={() => navigate?.("company-detail", "1")}
            />
            <JobContent job={job} />
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start space-y-6">
              <CompanySidebar
                companyInfo={job.companyInfo}
                onViewCompanyDetail={() => navigate?.("company-detail", "1")}
              />
              <RelatedJobsSidebar
                relatedJobs={relatedJobs}
                onJobClick={(id) => navigate?.("job-detail", id)}
                onViewMore={() => navigate?.("jobs")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyModal
          jobTitle={job.title}
          onClose={() => setShowApplyModal(false)}
          onConfirm={handleApply}
        />
      )}
    </div>
  );
}
