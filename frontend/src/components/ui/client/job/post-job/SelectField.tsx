"use client";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type Option = { label: string; value: string };

interface SelectFieldProps {
  name: string;
  label?: string; // không dùng nữa, chỉ để tương thích
  value: string;
  onValueChange: (name: string, value: string) => void;
  options: Option[];
  minWidth?: number;
  placeholder?: string;
}

export default function SelectField({
  name,
  value,
  onValueChange,
  options,
  minWidth = 224,
  placeholder = "Chọn",
}: SelectFieldProps) {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onValueChange(name, e.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{ minWidth, backgroundColor: "#f5f5f5", borderRadius: 2 }}
      fullWidth
    >
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) =>
          selected === "" ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            selected as string
          )
        }
        MenuProps={{
          disableScrollLock: true,
          keepMounted: true,
          PaperProps: { sx: { minWidth } },
        }}
        sx={{
          height: 48,
          "& .MuiSelect-select": { padding: "10px 12px" },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
