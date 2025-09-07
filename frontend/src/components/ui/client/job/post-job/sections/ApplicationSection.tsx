"use client";
import { TextField } from "@mui/material";
import { Job } from "@/types/job.type"; 

interface Props {
  form: Job;
  onChangeText: (name: keyof Job, value: string) => void;
  onToggle: (name: keyof Job, value: boolean) => void;
}

export default function ApplicationSection({ form, onChangeText, onToggle }: Props) {
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
    <section className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Thông tin ứng tuyển</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Hạn chót nộp hồ sơ</label>
          <TextField
            type="date"
            name="deadline"
            value={form.deadline || ""}
            onChange={(e) => onChangeText("deadline", e.target.value)}
            className="w-full"
            variant="outlined"
            sx={textSx}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email liên hệ *</label>
          <TextField
            type="email"
            name="email"
            value={form.email || ""}
            onChange={(e) => onChangeText("email", e.target.value)}
            placeholder="hr@congty.com"
            className="w-full"
            variant="outlined"
            sx={textSx}
          />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-orange-500"
            checked={!!form.urgent}
            onChange={(e) => onToggle("urgent", e.target.checked)}
          />
          <span>Đánh dấu là cần tuyển gấp (+5$)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-orange-500"
            checked={!!form.featured}
            onChange={(e) => onToggle("featured", e.target.checked)}
          />
          <span>Làm nổi bật tin tuyển dụng (+15$)</span>
        </label>
      </div>
    </section>
  );
}
