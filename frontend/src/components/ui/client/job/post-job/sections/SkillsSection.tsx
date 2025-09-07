"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

const SUGGESTED_SKILLS = [
  "React","TypeScript","JavaScript","Node.js","Python","Java","PHP",
  "HTML/CSS","Vue.js","Angular","Express.js","MongoDB","PostgreSQL",
  "AWS","Docker","Git","Figma","Product Management","UX/UI Design",
  "Marketing","Sales","Customer Service","Data Analysis",
];

interface Props {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export default function SkillsSection({ skills, onSkillsChange }: Props) {
  const [input, setInput] = useState("");

  const addSkill = (s: string) => {
    const val = s.trim();
    if (!val) return;
    if (!skills.includes(val)) onSkillsChange([...skills, val]);
    setInput("");
  };

  const removeSkill = (s: string) => {
    onSkillsChange(skills.filter((k) => k !== s));
  };

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
      <h2 className="text-xl font-semibold">Kỹ năng cần có</h2>

      <div className="flex gap-2">
        <TextField
          type="text"
          placeholder="Nhập kỹ năng và nhấn Enter"
          className="flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill(input)}
          variant="outlined"
          sx={textSx}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={() => addSkill(input)}
          type="button"
        >
          Thêm
        </button>
      </div>

      {!!skills.length && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 text-sm bg-orange-50 border border-orange-200 rounded-full"
            >
              {s}
              <button
                className="ml-2 text-orange-600"
                onClick={() => removeSkill(s)}
                type="button"
                aria-label={`Remove ${s}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng gợi ý</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full border"
              onClick={() => addSkill(skill)}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
