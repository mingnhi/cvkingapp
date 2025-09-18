"use-client";
import {
    Download,
    Edit,
    Trash2,
    Eye,
    Plus,
    Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import { Button } from '../../common/button/button';
import { Badge } from '@mui/material';
import { useApp } from '@/components/AppContext';
const MyCv = () => {

    const { navigateTo } = useApp();
    const handleCreateCV = () => {
        navigateTo('cv');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1>Hồ sơ của tôi</h1>
                <Button onClick={handleCreateCV} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo hồ sơ mới 
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Frontend Developer CV</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Đang hoạt động </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4">Cập nhật lần cuối : 10/10/2025</p>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Xem trước
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Tải xuống
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleCreateCV}>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Chia sẻ
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Full Stack Developer CV</span>
                            <Badge variant="secondary">Draft</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4">Last updated: January 15, 2024</p>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={handleCreateCV}>
                                <Edit className="w-4 h-4 mr-2" />
                                Continue Editing
                            </Button>
                            <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>CV Templates</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">Choose from our professional CV templates to create a standout resume.</p>
                    <Button variant="outline" onClick={handleCreateCV}>
                        Browse Templates
                    </Button>
                </CardContent>
            </Card>

            {/* CV Tips */}
            <Card>
                <CardHeader>
                    <CardTitle>CV Tips & Tricks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Essential Sections</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Professional summary</li>
                                <li>• Work experience</li>
                                <li>• Skills and competencies</li>
                                <li>• Education background</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Best Practices</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Keep it concise (1-2 pages)</li>
                                <li>• Use action verbs</li>
                                <li>• Quantify achievements</li>
                                <li>• Proofread carefully</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="outline" onClick={() => navigateTo('blog')}>
                            Read More CV Tips
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
    ;

};
export default MyCv;
