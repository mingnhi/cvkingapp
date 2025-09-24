"use client";
import { MapPin, Users, Star } from "lucide-react";
import { Card, CardContent, Badge, Button } from "@mui/material";
import Image from "next/image";
import { companies } from "@/faker/company-data";
import { useRouter } from "next/navigation";

const CompaniesSection = () => {
    const router = useRouter();
    const handleCompanyClick = (company: any) => {
        router.push(`/company-detail?company=${encodeURIComponent(JSON.stringify(company))}`);
    };

    const handleViewJobs = (e: React.MouseEvent, company: any) => {
        e.stopPropagation();
        router.push(`/jobs?search=${encodeURIComponent(company.name)}&company=${encodeURIComponent(company.name)}`);
    }; return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                                 <h2 className="text-3xl mb-4 text-gray-900 font-bold">CÔNG TY HÀNG ĐẦU</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Đồng hành cùng những nhà tiên phong kiến tạo tương lai công việc.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ml-4 mr-4  ">
                    {companies.map((company) => (
                        <Card
                            key={company.id}
                            className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md cursor-pointer"
                            onClick={() => handleCompanyClick(company)}
                        >
                            <CardContent className="p-6">
                                <div className="text-center mb-4">
                                    <Image
                                        width={30}
                                        height={30}
                                        src={company.logo}
                                        alt={company.name}
                                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                                        {company.name}
                                    </h3>
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                                        {company.industry}
                                    </Badge>
                                </div>

                                <div className="space-y-2 mb-4 text-sm text-gray-500">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            {company.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                            {company.rating}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2" />
                                        {company.employees} Nhân viên
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {company.description}
                                </p>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-orange-600">
                                            {company.openJobs} vị trí đang tuyển
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-orange-600 text-orange-600 hover:bg-orange-50"
                                            onClick={(e) => handleViewJobs(e, company)}
                                        >
                                            Xem chi tiết công việc
                                        </Button>
                                    </div>
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
                        Danh sách công ty
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;
