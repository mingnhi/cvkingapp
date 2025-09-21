export const Locations = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
    "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ",
    "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng",
    "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
    "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình",
    "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
    "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
    "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long",
    "Vĩnh Phúc", "Yên Bái"
];
export const industryOptions = [
    { value: 'Công nghệ', label: 'Công nghệ' },
    { value: 'Tài chính', label: 'Tài chính' },
    { value: 'Năng lượng', label: 'Năng lượng' },
    { value: 'Vận tải', label: 'Vận tải' },
    { value: 'Y tế', label: 'Y tế' },
    { value: 'Giáo dục', label: 'Giáo dục' },
    { value: 'Bất động sản', label: 'Bất động sản' },
    { value: 'Bán lẻ', label: 'Bán lẻ' },
];
export const companySizeOptions = [
    '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+', '2000+', '5000+', '10000+'
];

export const benefitOptions = [
    'Bảo hiểm sức khỏe', 'Làm việc từ xa', 'Ngày nghỉ linh hoạt', 'Trợ cấp ăn trưa', 'Lương tháng 13'
];

export const ratingOptions = [
    { value: '4', label: 'Từ 4 sao trở lên' },
    { value: '3', label: 'Từ 3 sao trở lên' },
    { value: '2', label: 'Từ 2 sao trở lên' },
    { value: '1', label: 'Từ 1 sao trở lên' },
    { value: 'all', label: 'Tất cả' }
];
export const allCompanies = [
        { id: 1, name: 'Tập đoàn Sáng tạo TechCorp', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=face', industry: 'Công nghệ', location: 'TP. Hồ Chí Minh', employees: '500-1000', jobs: 15, rating: 2.8, reviews: 125, isTopCompany: true, benefits: ['Bảo hiểm sức khỏe', 'Làm việc từ xa', 'Lương tháng 13'], description: 'Đi đầu trong lĩnh vực chuyển đổi số và các giải pháp phần mềm cho doanh nghiệp.' },
        { id: 2, name: 'Giải pháp FinaBank', logo: 'https://images.unsplash.com/photo-1549924231-f97d98355f1d?w=120&h=120&fit=crop&crop=face', industry: 'Tài chính', location: 'Hà Nội', employees: '1000+', jobs: 8, rating: 4.5, reviews: 98, isTopCompany: false, benefits: ['Bảo hiểm sức khỏe', 'Trợ cấp ăn trưa'], description: 'Cung cấp các dịch vụ tài chính, ngân hàng số và bảo hiểm uy tín hàng đầu.' },
        { id: 3, name: 'EcoPower Việt Nam', logo: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=120&h=120&fit=crop&crop=face', industry: 'Năng lượng', location: 'Đà Nẵng', employees: '200-500', jobs: 12, rating: 4.7, reviews: 76, isTopCompany: false, benefits: ['Ngày nghỉ linh hoạt', 'Làm việc từ xa'], description: 'Phát triển các dự án năng lượng tái tạo, vì một tương lai xanh và bền vững.' },
        { id: 4, name: 'LogiChain Express', logo: 'https://plus.unsplash.com/premium_photo-1661304547035-3c9b5ba69622?w=120&h=120&fit=crop&crop=face', industry: 'Vận tải', location: 'Hải Phòng', employees: '1000+', jobs: 20, rating: 4.4, reviews: 110, isTopCompany: true, benefits: ['Lương tháng 13', 'Trợ cấp ăn trưa'], description: 'Hệ thống logistics thông minh, kết nối toàn quốc và quốc tế.' },
        { id: 5, name: 'Sáng tạo MediaZ', logo: 'https://images.unsplash.com/photo-1579591903931-bf4cac3343a9?w=120&h=120&fit=crop&crop=face', industry: 'Truyền thông', location: 'TP. Hồ Chí Minh', employees: '50-100', jobs: 5, rating: 4.9, reviews: 85, isTopCompany: false, benefits: ['Làm việc từ xa', 'Ngày nghỉ linh hoạt'], description: 'Agency chuyên cung cấp các giải pháp marketing và thương hiệu toàn diện.' },
        { id: 6, name: 'VinHealth Care', logo: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a1c8?w=120&h=120&fit=crop&crop=face', industry: 'Y tế', location: 'Hà Nội', employees: '2000+', jobs: 30, rating: 4.6, reviews: 250, isTopCompany: true, benefits: ['Bảo hiểm sức khỏe', 'Lương tháng 13', 'Trợ cấp ăn trưa'], description: 'Hệ thống y tế chất lượng cao, ứng dụng công nghệ hiện đại vào chẩn đoán.' },
        { id: 7, name: 'Global Invest', logo: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=120&h=120&fit=crop&crop=face', industry: 'Tài chính', location: 'TP. Hồ Chí Minh', employees: '100-200', jobs: 9, rating: 4.7, reviews: 60, isTopCompany: false, benefits: ['Bảo hiểm sức khỏe', 'Ngày nghỉ linh hoạt'], description: 'Quỹ đầu tư mạo hiểm tập trung vào các startup công nghệ tiềm năng.' },
        { id: 8, name: 'NextGen Software', logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=120&fit=crop&crop=face', industry: 'Công nghệ', location: 'Đà Nẵng', employees: '100-200', jobs: 18, rating: 4.8, reviews: 95, isTopCompany: false, benefits: ['Làm việc từ xa', 'Lương tháng 13'], description: 'Gia công phần mềm và phát triển các sản phẩm SaaS cho thị trường quốc tế.' },
        { id: 9, name: 'BuildRight Construction', logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=120&fit=crop&crop=face', industry: 'Xây dựng', location: 'Bình Dương', employees: '500-1000', jobs: 22, rating: 4.3, reviews: 130, isTopCompany: false, benefits: ['Trợ cấp ăn trưa'], description: 'Tổng thầu xây dựng các dự án công nghiệp và dân dụng chất lượng cao.' },
        { id: 10, name: 'GreenFarm Organics', logo: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=120&h=120&fit=crop&crop=face', industry: 'Nông nghiệp', location: 'Cần Thơ', employees: '50-100', jobs: 7, rating: 4.9, reviews: 70, isTopCompany: false, benefits: ['Ngày nghỉ linh hoạt'], description: 'Nông trại hữu cơ cung cấp thực phẩm sạch đạt chuẩn quốc tế.' },
        { id: 11, name: 'Tân Cảng Sài Gòn', logo: 'https://plus.unsplash.com/premium_photo-1663050763910-2d897a883907?w=120&h=120&fit=crop&crop=face', industry: 'Vận tải', location: 'TP. Hồ Chí Minh', employees: '5000+', jobs: 45, rating: 4.7, reviews: 320, isTopCompany: true, benefits: ['Bảo hiểm sức khỏe', 'Lương tháng 13'], description: 'Nhà khai thác cảng container lớn nhất Việt Nam.' },
        { id: 12, name: 'Khách sạn Majestic', logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop&crop=face', industry: 'Du lịch', location: 'TP. Hồ Chí Minh', employees: '200-500', jobs: 14, rating: 4.6, reviews: 180, isTopCompany: false, benefits: ['Trợ cấp ăn trưa', 'Lương tháng 13'], description: 'Khách sạn 5 sao cổ điển với tầm nhìn ra sông Sài Gòn.' },
        { id: 13, name: 'Bất động sản Novaland', logo: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=120&h=120&fit=crop&crop=face', industry: 'Bất động sản', location: 'TP. Hồ Chí Minh', employees: '1000+', jobs: 25, rating: 4.2, reviews: 210, isTopCompany: true, benefits: ['Bảo hiểm sức khỏe', 'Ngày nghỉ linh hoạt'], description: 'Tập đoàn đầu tư và phát triển bất động sản uy tín tại Việt Nam.' },
        { id: 14, name: 'Đại học RMIT', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&h=120&fit=crop&crop=face', industry: 'Giáo dục', location: 'Hà Nội', employees: '500-1000', jobs: 11, rating: 4.8, reviews: 150, isTopCompany: false, benefits: ['Làm việc từ xa', 'Bảo hiểm sức khỏe'], description: 'Trường đại học quốc tế hàng đầu với các chương trình đào tạo đa dạng.' },
        { id: 15, name: 'Thế Giới Di Động', logo: 'https://plus.unsplash.com/premium_photo-1681487814165-72043a637a17?w=120&h=120&fit=crop&crop=face', industry: 'Bán lẻ', location: 'TP. Hồ Chí Minh', employees: '10000+', jobs: 100, rating: 4.5, reviews: 500, isTopCompany: true, benefits: ['Lương tháng 13', 'Bảo hiểm sức khỏe', 'Trợ cấp ăn trưa'], description: 'Chuỗi bán lẻ thiết bị di động và điện máy số 1 Việt Nam.' },
        { id: 16, name: 'Xưởng phim Phương Nam', logo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=120&h=120&fit=crop&crop=face', industry: 'Giải trí', location: 'TP. Hồ Chí Minh', employees: '100-200', jobs: 6, rating: 4.3, reviews: 45, isTopCompany: false, benefits: ['Ngày nghỉ linh hoạt'], description: 'Studio sản xuất phim và các chương trình truyền hình nổi tiếng.' },
        { id: 17, name: 'Nội thất Hoà Phát', logo: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=120&h=120&fit=crop&crop=face', industry: 'Sản xuất', location: 'Hưng Yên', employees: '2000+', jobs: 35, rating: 4.6, reviews: 280, isTopCompany: true, benefits: ['Trợ cấp ăn trưa', 'Lương tháng 13'], description: 'Thương hiệu nội thất văn phòng và gia đình hàng đầu Việt Nam.' },
        { id: 18, name: 'Vườn ươm Khởi nghiệp Đà Nẵng', logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120&h=120&fit=crop&crop=face', industry: 'Công nghệ', location: 'Đà Nẵng', employees: '20-50', jobs: 3, rating: 4.9, reviews: 30, isTopCompany: false, benefits: ['Làm việc từ xa', 'Ngày nghỉ linh hoạt'], description: 'Hỗ trợ và đầu tư cho các công ty khởi nghiệp công nghệ tại miền Trung.' },
    ];


