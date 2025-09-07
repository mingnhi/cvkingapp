"use client";

import { useState } from "react";
import BasicDetailsSection from "@/components/ui/client/job/post-job/sections/BasicDetailsSection";
import JobContentSection from "@/components/ui/client/job/post-job/sections/JobDetailsSection";
import SkillsSection from "@/components/ui/client/job/post-job/sections/SkillsSection";
import ApplicationSection from "@/components/ui/client/job/post-job/sections/ApplicationSection";
import RightSidebarPanel from "@/components/ui/client/job/post-job/SidebarPanel";
import { Job } from "@/types/job.type";

export default function PostJobPage() {
const [form, setForm] = useState<Job>({
  slug: "",
  title: "",
  company: "",
  location: "",
  type: "",               
  mode: "",                 
  level: "",             
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "USD",  
  description: "",
  requirements: "",
  benefits: "",
  deadline: "",         
  email: "",
  urgent: false,
  featured: false,
  expires: "",              
  status: "draft",       
  skills: [],
});

  const [skills, setSkills] = useState<string[]>([]);

  const onChangeText = (name: keyof Job, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const onChangeSelect = (name: keyof Job, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value as Job[typeof name] }));

  const onToggle = (name: keyof Job, value: boolean) =>
    setForm((prev) => ({ ...prev, [name]: value as Job[typeof name] }));

  const handleSubmit = (draft: boolean) => {
    const payload = { ...form, skills, status: draft ? "draft" : "active" };
    console.log(draft ? "Lưu bản nháp" : "Đăng tuyển", payload);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <BasicDetailsSection
          form={form}
          onChangeText={onChangeText}
          onChangeSelect={onChangeSelect}
        />

        <JobContentSection form={form} onChangeText={onChangeText} />

        <SkillsSection skills={skills} onSkillsChange={setSkills} />

        <ApplicationSection
          form={form}
          onChangeText={onChangeText}
          onToggle={onToggle}
        />
      </div>

      <RightSidebarPanel
        form={form}
        onSaveDraft={() => handleSubmit(true)}
        onPublish={() => handleSubmit(false)}
      />
    </div>
  );
}
