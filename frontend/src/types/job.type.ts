// types/job.type.ts
export type JobStatus = "active" | "draft" | "expired";
export type Currency = "USD" | "VND";

export interface Job {
  id?: number;
  slug: string;
  title: string;
  company: string;
  location: string;
  type: string;   // Toàn thời gian | Bán thời gian | Hợp đồng
  mode: string;   // Remote | Hybrid | Văn phòng
  level: string;  // Junior | Mid | Senior
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: Currency;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string; // yyyy-mm-dd
  email: string;
  urgent: boolean;
  featured: boolean;
  posted?: string;   // yyyy-mm-dd
  expires: string;  // yyyy-mm-dd
  status: JobStatus;
  applications?: number;
  views?: number;
  skills: string[];
}
