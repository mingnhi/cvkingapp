// components/post-job/sections/BasicDetailsSection.tsx
"use client";
import { TextField } from "@mui/material";
import SelectField from "../SelectField";
import { Job } from "@/types/job.type";

interface Props {
  form: Job;
  onChangeText: (name: keyof Job, value: string) => void;
  onChangeSelect: (name: keyof Job, value: string) => void;
}

export default function BasicDetailsSection({ form, onChangeText, onChangeSelect }: Props) {
  const textSx = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "0.875rem",
      height: "38px",
      padding: "0 12px",
      "& .MuiInputBase-input": { padding: "8px 0" },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
  };

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">Thông tin công việc</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
        {/* Chức danh */}
        <div>
          <label className="block text-sm font-medium mb-1">Chức danh *</label>
          <TextField
            name="title"
            value={form.title}
            onChange={(e) => onChangeText("title", e.target.value)}
            className="w-full"
            placeholder="VD: Lập trình viên Frontend"
            variant="outlined"
            sx={textSx}
          />
        </div>

        {/* Công ty */}
        <div>
          <label className="block text-sm font-medium mb-1">Tên công ty *</label>
          <TextField
            name="company"
            value={form.company}
            onChange={(e) => onChangeText("company", e.target.value)}
            className="w-full"
            placeholder="Tên công ty của bạn"
            variant="outlined"
            sx={textSx}
          />
        </div>

        {/* Địa điểm */}
        <div>
          <label className="block text-sm font-medium mb-1">Địa điểm *</label>
          <TextField
            name="location"
            value={form.location}
            onChange={(e) => onChangeText("location", e.target.value)}
            className="w-full"
            placeholder="Nhập địa điểm"
            variant="outlined"
            sx={textSx}
          />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-3 gap-3 col-span-full">
          <div>
            <label className="block text-sm font-medium mb-1">Loại công việc *</label>
            <SelectField
              name="type"
              value={form.type}
              onValueChange={(n, v) => onChangeSelect(n as keyof Job, v)}
              options={[
                { label: "Toàn thời gian", value: "Toàn thời gian" },
                { label: "Bán thời gian", value: "Bán thời gian" },
                { label: "Hợp đồng", value: "Hợp đồng" },
              ]}
              placeholder="Chọn loại"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hình thức làm việc</label>
            <SelectField
              name="mode"
              value={form.mode}
              onValueChange={(n, v) => onChangeSelect(n as keyof Job, v)}
              options={[
                { label: "Remote", value: "Remote" },
                { label: "Hybrid", value: "Hybrid" },
                { label: "Văn phòng", value: "Văn phòng" },
              ]}
              placeholder="Chọn hình thức"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kinh nghiệm</label>
            <SelectField
              name="level"
              value={form.level}
              onValueChange={(n, v) => onChangeSelect(n as keyof Job, v)}
              options={[
                { label: "Junior", value: "Junior" },
                { label: "Mid", value: "Mid" },
                { label: "Senior", value: "Senior" },
              ]}
              placeholder="Chọn mức"
            />
          </div>
        </div>

        {/* Mức lương */}
        <div className="col-span-full">
          <label className="block text-sm font-medium mb-1">Mức lương</label>
          <div className="grid grid-cols-5 gap-3 items-center">
            <TextField
              name="salaryMin"
              value={form.salaryMin}
              onChange={(e) => onChangeText("salaryMin", e.target.value)}
              className="col-span-2"
              placeholder="Tối thiểu"
              variant="outlined"
              sx={textSx}
            />
            <span className="flex justify-center">đến</span>
            <TextField
              name="salaryMax"
              value={form.salaryMax}
              onChange={(e) => onChangeText("salaryMax", e.target.value)}
              className="col-span-2"
              placeholder="Tối đa"
              variant="outlined"
              sx={textSx}
            />
            <SelectField
              name="salaryCurrency"
              label="Mức lương"
              value={form.salaryCurrency}
              onValueChange={(n, v) => onChangeSelect(n as keyof Job, v)}
              options={[
                { label: "USD", value: "USD" },
                { label: "VND", value: "VND" },
              ]}
            />
          </div>
          <span className="text-sm text-gray-500 mt-1 inline-block">/ mỗi tháng</span>
        </div>
      </div>
    </section>
  );
}
