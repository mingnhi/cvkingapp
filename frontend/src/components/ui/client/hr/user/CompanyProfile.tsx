// import { useApp } from "@/components/AppContext";
// import { Card } from "@mui/material";
// import CardContent from "@mui/material/CardContent";
// import { CheckCircle, Edit } from "lucide-react";
// import { CardHeader, CardTitle } from "@/components/ui/common/card";
// import { Button } from "@/components/ui/common/button";

// const CompanyProfile = () => {
//     const { navigateTo } = useApp();
//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between mt-[5px]">
//                 <h1>Thông tin công ty</h1>
//                 <Button onClick={() => navigateTo('edit-profile')} className="bg-primary hover:bg-primary/90">
//                     <Edit className="w-4 h-4 mr-2" />
//                     Edit
//                 </Button>
//             </div>

//             <Card>
//                 <CardContent className="p-6">
//                     <div className="flex items-start space-x-6">
//                         <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
//                             TC
//                         </div>
//                         <div className="flex-1">
//                             <h2>TechCorp Vietnam</h2>
//                             <p className="text-gray-600 mb-4">Công ty phát triển phần mềm hàng đầu tại Việt Nam</p>

//                             <div className="grid md:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                     <h3 className="mb-3">Thông tin công ty</h3>
//                                     <div className="space-y-2 text-sm">
//                                         <p><span className="font-medium">Ngành:</span> Công Nghệ Thông Tin</p>
//                                         <p><span className="font-medium">Quy mô:</span> 100-500 Nhân viên</p>
//                                         <p><span className="font-medium">Thành lập:</span> 2015</p>
//                                         <p><span className="font-medium">Website:</span>
//                                             <button className="text-primary hover:underline ml-1">www.techcorp.vn</button>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <h3 className="mb-3">Thông tin liên hệ</h3>
//                                     <div className="space-y-2 text-sm">
//                                         <p><span className="font-medium">Địa chỉ:</span> Quận 1, Thành phố Hồ Chí Minh</p>
//                                         <p><span className="font-medium">Số điện thoại:</span>
//                                             <button className="text-primary hover:underline ml-1">0123 456 789</button>
//                                         </p>
//                                         <p><span className="font-medium">Email:</span>
//                                             <button className="text-primary hover:underline ml-1">hr@techcorp.vn</button>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div>
//                                 <h3 className="mb-3">Về chúng tôi</h3>
//                                 <p className="text-gray-600 leading-relaxed">
//                                     TechCorp Vietnam là công ty phát triển phần mềm hàng đầu chuyên về ứng dụng web và di động.
//                                     Chúng tôi hợp tác với khách hàng trong nhiều ngành nghề khác nhau để cung cấp các giải pháp kỹ thuật số sáng tạo, thúc đẩy tăng trưởng kinh doanh.
//                                     Đội ngũ các nhà phát triển, nhà thiết kế và quản lý dự án giàu kinh nghiệm của chúng tôi luôn tâm huyết với việc tạo ra những phần mềm chất lượng cao, tạo nên sự khác biệt thực sự.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>Lợi ích của công ty</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         {[
//                             'Lương và thưởng cạnh tranh',
//                             'Giờ làm việc linh hoạt',
//                             'Bảo hiểm y tế',
//                             'Nghỉ phép và nghỉ ốm',
//                             'Cơ hội phát triển chuyên môn',
//                             'Môi trường văn phòng hiện đại',
//                             'Hoạt động xây dựng đội nhóm',
//                             'Lựa chọn làm việc tại nhà'
//                         ].map((benefit) => (
//                             <div key={benefit} className="flex items-center space-x-2">
//                                 <CheckCircle className="w-4 h-4 text-green-600" />
//                                 <span className="text-sm">{benefit}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
// export default CompanyProfile;
import { useApp } from "@/components/AppContext";
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Typography,
} from "@mui/material";
import { CheckCircle, Edit } from "lucide-react";

const CompanyProfile = () => {
    const { navigateTo } = useApp();
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mt-[5px]">
                <Typography variant="h5">Thông tin công ty</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigateTo("edit-profile")}
                    startIcon={<Edit className="w-4 h-4" />}
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    }}
                >
                    Edit
                </Button>

            </div>

            {/* Company Info Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                        <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                            TC
                        </div>
                        <div className="flex-1">
                            <Typography variant="h6">TechCorp Vietnam</Typography>
                            <Typography color="text.secondary" className="mb-4">
                                Công ty phát triển phần mềm hàng đầu tại Việt Nam
                            </Typography>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <Typography variant="subtitle1" className="mb-3">
                                        Thông tin công ty
                                    </Typography>
                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <span className="font-medium">Ngành:</span> Công Nghệ Thông
                                            Tin
                                        </p>
                                        <p>
                                            <span className="font-medium">Quy mô:</span> 100-500 Nhân
                                            viên
                                        </p>
                                        <p>
                                            <span className="font-medium">Thành lập:</span> 2015
                                        </p>
                                        <p>
                                            <span className="font-medium">Website:</span>
                                            <Button variant="text" color="primary" size="small">
                                                www.techcorp.vn
                                            </Button>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Typography variant="subtitle1" className="mb-3">
                                        Thông tin liên hệ
                                    </Typography>
                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <span className="font-medium">Địa chỉ:</span> Quận 1, Thành
                                            phố Hồ Chí Minh
                                        </p>
                                        <p>
                                            <span className="font-medium">Số điện thoại:</span>
                                            <Button variant="text" color="primary" size="small">
                                                0123 456 789
                                            </Button>
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span>
                                            <Button variant="text" color="primary" size="small">
                                                hr@techcorp.vn
                                            </Button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Typography variant="subtitle1" className="mb-3">
                                    Về chúng tôi
                                </Typography>
                                <Typography color="text.secondary">
                                    TechCorp Vietnam là công ty phát triển phần mềm hàng đầu chuyên
                                    về ứng dụng web và di động. Chúng tôi hợp tác với khách hàng
                                    trong nhiều ngành nghề khác nhau để cung cấp các giải pháp kỹ
                                    thuật số sáng tạo, thúc đẩy tăng trưởng kinh doanh. Đội ngũ các
                                    nhà phát triển, nhà thiết kế và quản lý dự án giàu kinh nghiệm
                                    của chúng tôi luôn tâm huyết với việc tạo ra những phần mềm chất
                                    lượng cao, tạo nên sự khác biệt thực sự.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card>
                <CardHeader
                    title={<Typography variant="h6">Lợi ích của công ty</Typography>}
                />
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Lương và thưởng cạnh tranh",
                            "Giờ làm việc linh hoạt",
                            "Bảo hiểm y tế",
                            "Nghỉ phép và nghỉ ốm",
                            "Cơ hội phát triển chuyên môn",
                            "Môi trường văn phòng hiện đại",
                            "Hoạt động xây dựng đội nhóm",
                            "Lựa chọn làm việc tại nhà",
                        ].map((benefit) => (
                            <div key={benefit} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <Typography variant="body2">{benefit}</Typography>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyProfile;

