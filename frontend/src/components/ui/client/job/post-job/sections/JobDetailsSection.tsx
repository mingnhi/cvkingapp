"use client";
import { TextField } from "@mui/material";
import { Job } from "@/types/job.type";

interface Props {
  form: Job;
  onChangeText: (name: keyof Job, value: string) => void;
}

export default function JobContentSection({ form, onChangeText }: Props) {
  const areaSx = {
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      fontSize: "0.875rem",
      padding: "12px",
      marginBottom: "10px",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Chi tiết công việc</h2>

      <TextField
        name="description"
        value={form.description}
        onChange={(e) => onChangeText("description", e.target.value)}
        className="w-full"
        placeholder="Mô tả công việc *"
        multiline
        rows={4}
        variant="outlined"
        sx={areaSx}
      />

      <TextField
        name="requirements"
        value={form.requirements}
        onChange={(e) => onChangeText("requirements", e.target.value)}
        className="w-full"
        placeholder="Yêu cầu"
        multiline
        rows={3}
        variant="outlined"
        sx={areaSx}
      />

      <TextField
        name="benefits"
        value={form.benefits}
        onChange={(e) => onChangeText("benefits", e.target.value)}
        className="w-full"
        placeholder="Phúc lợi"
        multiline
        rows={3}
        variant="outlined"
        sx={areaSx}
      />
    </section>
  );
}
