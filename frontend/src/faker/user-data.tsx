import ImageAvatar from "@/assets/images/avatar.jpg";
import { User } from "@/types/user.type";

export const sampleUserData: User[] = [
  {
    id: "1",
    avatar: ImageAvatar,
    username: "jon_snow",
    firstName: "Jon",
    lastName: "Snow",
    email: "jon.snow@winterfell.com",
    age: "35",
  },
  {
    id: "2",
    avatar: ImageAvatar,
    username: "cersei_lannister",
    firstName: "Cersei",
    lastName: "Lannister",
    email: "cersei.lannister@kingslanding.com",
    age: "42",
  },
  {
    id: "3",
    avatar: ImageAvatar,
    username: "jaime_lannister",
    firstName: "Jaime",
    lastName: "Lannister",
    email: "jaime.lannister@kingslanding.com",
    age: "45",
  },
  {
    id: "4",
    avatar: ImageAvatar,
    username: "arya_stark",
    firstName: "Arya",
    lastName: "Stark",
    email: "arya.stark@winterfell.com",
    age: "16",
  },
  {
    id: "5",
    avatar: ImageAvatar,
    username: "daenerys_targaryen",
    firstName: "Daenerys",
    lastName: "Targaryen",
    email: "daenerys.targaryen@dragonstone.com",
    age: "",
  },
];
export const mockApplications = [
        {
            id: 1,
            jobTitle: 'Lập trình viên Frontend Senior',
            company: 'TechCorp Vietnam',
            location: 'Thành phố Hồ Chí Minh',
            salary: '50 - 70 triệu VNĐ',
            appliedDate: '15-01-2024',
            status: 'phỏng vấn', // interview
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=face',
            interviewDate: '25-01-2024 14:00',
        },
        {
            id: 2,
            jobTitle: 'Lập trình viên React',
            company: 'Startup Solutions',
            location: 'Đà Nẵng',
            salary: 'Thỏa thuận',
            appliedDate: '18-01-2024',
            status: 'chờ xử lý', // pending
            logo: 'https://images.unsplash.com/photo-1549924231-f97d98355f1d?w=64&h=64&fit=crop&crop=face',
        },
        {
            id: 3,
            jobTitle: 'UI/UX Designer',
            company: 'Creative Minds',
            location: 'Hà Nội',
            salary: '35 - 50 triệu VNĐ',
            appliedDate: '20-01-2024',
            status: 'đã từ chối', // rejected
            logo: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=64&h=64&fit=crop&crop=face',
        },
    ];
export const mockSavedJobs = [
        {
            id: 1,
            title: 'UI/UX Designer',
            company: 'DesignHub',
            location: 'Thành phố Hồ Chí Minh',
            salary: '28 - 45 triệu VNĐ',
            tags: ['UI/UX', 'Figma', 'Adobe XD'],
            urgent: false
        },
        {
            id: 2,
            title: 'Lập trình viên Backend',
            company: 'DataTech',
            location: 'Hà Nội',
            salary: '45 - 80 triệu VNĐ',
            tags: ['Node.js', 'MongoDB', 'AWS'],
            urgent: true
        }
    ];

