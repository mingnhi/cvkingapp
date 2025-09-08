"use-client";
import {
    Download,
    Edit,
    MapPin,
    DollarSign,
    Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import { Separator } from '../../common/separator/separator';
import { Badge } from '@mui/material';
import { Avatar, AvatarFallback, AvatarImage } from '../../common/avatar//avatar';
import { Button } from '../../common/button/button';
import { useApp } from '@/components/AppContext';
import { useRouter } from 'next/navigation';
import {Progress } from '../../common/progress/progress';
const MyProfile = () => {
    const { navigateTo } = useApp();
    const router = useRouter();
    return (
        <div className="space-y-6 max-w-[1520px]" >
            <div className="flex items-center justify-between">
            </div>

            <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                        <Avatar className="w-20 h-20 mt-2">
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
                        </Avatar>
                        <div className="flex-1 mt-2">
                            <h2>Nguyen Van A</h2>
                            <p className="text-gray-600">Senior Frontend Developer</p>
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                Ho Chi Minh City, Vietnam
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <DollarSign className="w-4 h-4 mr-1" />
                                Expected salary: $2000 - $3000
                            </div>
                        </div>
                        <div className="flex space-x-2 ">
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Chia sẻ
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Button onClick={() => router.push('/user/a/edit-profile')} className="bg-primary hover:bg-primary/90  ">
                                <Edit className="w-2 h-2 text-sm " />
                                Chỉnh sửa hồ sơ
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-6 " />

                    <div className="grid md:grid-cols-2 gap-6 max-w-[1000px] mt-8">
                        <div>
                            <h3 className="mb-3">Thông tin kết nối</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Email:</span>
                                    <button className="text-primary hover:underline ml-1">nguyen.van.a@email.com</button>
                                </p>
                                <p><span className="font-medium">Phone:</span>
                                    <button className="text-primary hover:underline ml-1">+84 123 456 789</button>
                                </p>
                                <p><span className="font-medium">LinkedIn:</span>
                                    <button className="text-primary hover:underline ml-1">linkedin.com/in/nguyenvana</button>
                                </p>
                                <p><span className="font-medium">GitHub:</span>
                                    <button className="text-primary hover:underline ml-1">github.com/nguyenvana</button>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3">Kĩ năng</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'].map((skill) => (
                                    <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="mb-3">Hoàn thiện hồ sơ</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Mức độ hoàn thiện hồ sơ</span>
                            </div>
                            <Progress value={85} className="h-2" />
                            <p className="text-sm text-gray-600">
                              Thêm kinh nghiệm và trình độ học vấn để cải thiện khả năng hiển thị hồ sơ của bạn                                
                                <button className="text-primary hover:underline ml-1">Hoàn thành ngay</button>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('applications')}>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">12</div>
                        <div className="text-sm text-gray-600">Applications Sent</div>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('saved')}>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-gray-600">Saved Jobs</div>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <div className="text-sm text-gray-600">Profile Views</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}
export default MyProfile; 
