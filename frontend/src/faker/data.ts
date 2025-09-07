// Data mẫu cho trang blog + ảnh cục bộ
import type { StaticImageData } from "next/image";

import jobImage from "@/assets/images/job1.png";
import MainImage from "@/assets/images/main.png";
import job2Image from "@/assets/images/job2.png";
import job3Image from "@/assets/images/job3.png";
import job4Image from "@/assets/images/job4.png";

export type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;  // ISO "YYYY-MM-DD"
  views?: number;
  comments?: number;
  featured?: boolean;
  image: StaticImageData | string;
};

export const blogArticles: BlogArticle[] = [
  {
    id: "a1",
    title: "Nhân viên bán hàng là gì? Từ A-Z về nghề Sales",
    excerpt:
      "Tổng quan vai trò, kỹ năng cốt lõi và lộ trình phát triển để theo đuổi nghề Sales một cách bền vững.",
    category: "KIẾN THỨC CHUYÊN NGÀNH",
    tags: ["sales", "kỹ năng", "lộ trình"],
    publishDate: "2025-07-04",
    views: 1234,
    comments: 18,
    featured: true,
    image: MainImage,
  },
  {
    id: "a2",
    title: "Checklist 10 bước chuẩn bị phỏng vấn",
    excerpt:
      "Từ nghiên cứu công ty, luyện câu trả lời đến đặt câu hỏi ngược thật tinh tế.",
    category: "BÍ KÍP TÌM VIỆC",
    tags: ["phỏng vấn", "tips"],
    publishDate: "2025-07-03",
    views: 860,
    comments: 7,
    featured: true,
    image: job2Image,
  },
  {
    id: "a3",
    title: "Cách viết CV nổi bật cho vị trí Sales",
    excerpt:
      "Tập trung vào thành tích đo lường được, cấu trúc rõ ràng và nhấn mạnh kỹ năng phù hợp JD.",
    category: "BÍ KÍP TÌM VIỆC",
    tags: ["cv", "sales"],
    publishDate: "2025-06-28",
    views: 640,
    comments: 2,
    featured: true,            // ✅ thêm cờ featured để đủ 3 card
    image: job3Image,
  },
  {
    id: "a4",
    title: "Chế độ lương thưởng trong ngành bán lẻ",
    excerpt:
      "Mức lương cơ bản, KPI doanh số, thưởng nóng và phúc lợi theo từng cấp bậc.",
    category: "CHẾ ĐỘ LƯƠNG THƯỞNG",
    tags: ["lương", "thưởng", "bán lẻ"],
    publishDate: "2025-07-10",
    views: 980,
    comments: 11,
    image: job4Image,
  },
  {
    id: "a5",
    title: "Xu hướng thị trường việc làm 2025",
    excerpt:
      "Kỹ năng dữ liệu, tự động hoá và thương mại số tiếp tục dẫn dắt nhu cầu tuyển dụng.",
    category: "THỊ TRƯỜNG & XU HƯỚNG",
    tags: ["xu hướng", "2025"],
    publishDate: "2025-07-15",
    views: 1500,
    comments: 23,
    image: jobImage,
  },
];
