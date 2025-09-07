"use client";
import { useState } from "react";
import * as React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import avatar from "@/assets/images/lem.jpg";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    Box,
    InputLabel,
    Button,
    Avatar,
    Typography,
    Input,
} from "@mui/material";
import Image from "next/image";

// Định nghĩa schema với Zod
export const formSchemaPersonal = z.object({
    username: z
        .string()
        .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Họ và tên chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        })
        .max(50, { message: "Họ và tên quá dài" }),
    phonenumber: z
        .string()
        .regex(/^\d+$/, { message: "Số điện thoại chỉ được chứa chữ số" })
        .min(10, { message: "Số điện thoại phải có ít nhất 10 chữ số" })
        .max(11, { message: "Số điện thoại không được vượt quá 11 chữ số" }),
    birthday: z
        .date()
        .max(new Date(), { message: "Ngày sinh không được là ngày tương lai" })
        .refine(
            (date) => {
                const today = new Date();
                const birthDate = new Date(date);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--;
                }
                return age >= 18;
            },
            { message: "Bạn phải từ 18 tuổi trở lên" },
        ),
    sex: z.enum(["Nam", "Nu"], { message: "Vui lòng chọn giới tính" }),
    hometown: z
        .string()
        .min(4, { message: "Quê quán phải có ít nhất 4 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Quê quán chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    nationality: z
        .string()
        .min(1, { message: "Vui lòng nhập quốc tịch" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Quốc tịch chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    carrergoals: z
        .string()
        .min(2, { message: "Mục tiêu nghề nghiệp phải có ít nhất 2 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message:
                "Mục tiêu nghề nghiệp chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    salary: z
        .string()
        .min(2, { message: "Mức lương phải có ít nhất 2 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Mức lương chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        })
        .max(50, { message: "Mức lương quá dài" }),
    workplace: z
        .string()
        .regex(/^\d+$/, { message: "Nơi làm việc chỉ được chứa chữ số" })
        .min(10, { message: "Nơi làm việc phải có ít nhất 10 chữ số" })
        .max(11, { message: "Nơi làm việc không được vượt quá 11 chữ số" }),
    occupation: z
        .string()
        .min(1, { message: "Vui lòng nhập nghề nghiệp" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Nghề nghiệp chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    format: z.enum(["Online", "Offline"], { message: "Vui lòng chọn hình thức" }),
    experience: z
        .string()
        .min(4, { message: "Kinh nghiệm phải có ít nhất 4 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Kinh nghiệm chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    level: z
        .string()
        .min(1, { message: "Vui lòng nhập cấp độ" })
        .regex(/^[A-Za-z\s]+$/, {
            message: "Cấp độ chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    educationlevel: z
        .string()
        .min(2, { message: "Trình độ học vấn phải có ít nhất 2 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message:
                "Trình độ học vấn chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        })
        .max(50, { message: "Trình độ học vấn quá dài" }),
    degree: z
        .string()
        .regex(/^\d+$/, { message: "Bằng cấp chỉ được chứa chữ số" })
        .min(10, { message: "Bằng cấp phải có ít nhất 10 chữ số" })
        .max(11, { message: "Bằng cấp không được vượt quá 11 chữ số" }),
    additionalCertificates: z
        .string()
        .min(2, { message: "Chứng chỉ bổ sung phải có ít nhất 2 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message:
                "Chứng chỉ bổ sung chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        })
        .max(50, { message: "Chứng chỉ bổ sung quá dài" }),
    professionalskill: z.enum(["Nam", "Nu"], {
        message: "Vui lòng chọn kỹ năng chuyên môn",
    }),
    keyAccompl: z
        .string()
        .min(4, { message: "Thành tựu chính phải có ít nhất 4 ký tự" })
        .regex(/^[A-Za-z\s]+$/, {
            message:
                "Thành tựu chính chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
    otherActions: z
        .string()
        .min(1, { message: "Vui lòng nhập hoạt động khác" })
        .regex(/^[A-Za-z\s]+$/, {
            message:
                "Hoạt động khác chỉ được chứa chữ cái, không có số hoặc ký tự đặc biệt",
        }),
});

// Định nghĩa kiểu cho props
interface PersonalInforProps {
    isEditing: boolean;
    data: {
        username?: string;
        phonenumber?: string;
        birthday?: Date;
        sex?: "Nam" | "Nu";
        hometown?: string;
        nationality?: string;
        carrergoals?: string;
        salary?: string;
        workplace?: string;
        occupation?: string;
        format?: "Online" | "Offline";
        experience?: string;
        level?: string;
        educationlevel?: string;
        degree?: string;
        professionalskill?: "Nam" | "Nu";
        keyAccompl?: string;
        otherActions?: string;
    };
    onSave: (data: z.infer<typeof formSchemaPersonal>) => void;
}

const InforUser = (PersonalInforProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({

    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (updatedData: z.infer<typeof formSchemaPersonal>) => {
        setFormData((prevData) => ({ ...prevData, ...updatedData }));
        setIsEditing(false);
    };

    const form = useForm<z.infer<typeof formSchemaPersonal>>({
        resolver: zodResolver(formSchemaPersonal),
        mode: "onBlur",
        defaultValues: {
            username: formData.username,
            phonenumber: formData.phonenumber,
            birthday: formData.birthday,
            sex: formData.sex,
            hometown: formData.hometown,
            nationality: formData.nationality,
            carrergoals: formData.carrergoals || "",
            salary: formData.salary || "",
            workplace: formData.workplace || "",
            occupation: formData.occupation || "",
            format: formData.format || "Online",
            experience: formData.experience || "",
            level: formData.level || "",
            educationlevel: formData.educationlevel || "",
            degree: formData.degree || "",
            additionalCertificates: formData.additionalCertificates || "",
            professionalskill: formData.professionalskill || "Nam",
            keyAccompl: formData.keyAccompl || "",
            otherActions: formData.otherActions || "",
        },
    });

    return (
        <Box
            sx={{
                display: "grid",
                justifyContent: "flex",
                alignItems: "start",
                minHeight: "100vh",
                maxWidth: 1520,
                margin: "auto",
                padding: 4,
                backgroundColor: "white"
            }}
        >
            <Box sx={{ maxWidth: 950, width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 4,
                        ml: 10,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} >
                        <Image src={avatar} alt="Hình ảnh" width={80} height={80} className="rounded-full" />
                        <Typography variant="h6" fontWeight="medium">
                            Luong Hai Lam
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleEditToggle}
                        variant="outlined"
                        sx={{
                            borderRadius: "9999px",
                            textTransform: "none",
                            fontSize: "0.875rem",
                            fontWeight: "medium",
                        }}
                    >
                        {isEditing ? "Lưu" : "Chỉnh sửa"}
                    </Button>
                </Box>

                {/* Form */}
                <Box component="form" onSubmit={form.handleSubmit(handleSave)} sx={{ ml: 8, }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
                        Thông tin cá nhân
                    </Typography>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        {/* Column 1 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            {/* Username */}
                            <FormControl >
                                <TextField
                                    {...form.register("username")}
                                    label="Họ và tên"
                                    disabled={!isEditing}
                                    inputProps={{ maxLength: 50 }}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.username}
                                    helperText={form.formState.errors.username?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            {/* Phonenumber */}
                            <FormControl error={!!form.formState.errors.phonenumber}>
                                <TextField
                                    {...form.register("phonenumber")}
                                    label="Số điện thoại"
                                    disabled={!isEditing}
                                    inputProps={{ maxLength: 11 }}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.phonenumber}
                                    helperText={form.formState.errors.phonenumber?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Box>

                        {/* Column 2 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            {/* Birthday */}
                            <FormControl error={!!form.formState.errors.birthday}>
                                <TextField
                                    type="date"
                                    label="Ngày tháng năm sinh"
                                    disabled={!isEditing}
                                    {...form.register("birthday", {
                                        setValueAs: (value) => (value ? new Date(value) : undefined),
                                    })}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.birthday}
                                    helperText={form.formState.errors.birthday?.message}
                                />
                            </FormControl>

                            {/* Sex */}
                            <FormControl >
                                <InputLabel>Giới Tính</InputLabel>
                                <Select
                                    {...form.register("sex")}
                                    label="Giới tính"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    defaultValue="Nam"
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nu">Nữ</MenuItem>
                                </Select>
                                {form.formState.errors.sex && (
                                    <FormHelperText>{form.formState.errors.sex.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Box>

                        {/* Column 3 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            {/* Hometown */}
                            <FormControl error={!!form.formState.errors.hometown}>
                                <TextField
                                    {...form.register("hometown")}
                                    label="Quê quán"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.hometown}
                                    helperText={form.formState.errors.hometown?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            {/* Nationality */}
                            <FormControl error={!!form.formState.errors.nationality}>
                                <TextField
                                    {...form.register("nationality")}
                                    label="Quốc tịch"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.nationality}
                                    helperText={form.formState.errors.nationality?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Career Goals - Dòng riêng */}
                    <Box sx={{ mb: 4, mt: 4 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
                            Mục Tiêu Nghề Nghiệp
                        </Typography>

                        <FormControl error={!!form.formState.errors.carrergoals} sx={{ width: "100%", maxWidth: 750 }}>
                            <TextField
                                {...form.register("carrergoals")}
                                label="Mục tiêu nghề nghiệp"
                                disabled={!isEditing}
                                sx={{ width: "100%" }}
                                error={!!form.formState.errors.carrergoals}
                                helperText={form.formState.errors.carrergoals?.message}
                                InputLabelProps={{ shrink: true }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mb: 4, mt: 4 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
                            Thông Tin Nghề Nghiệp
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 4 }}>


                        {/* Column 1 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            <FormControl error={!!form.formState.errors.salary}>
                                <TextField
                                    {...form.register("salary")}
                                    label="Mức lương"
                                    disabled={!isEditing}
                                    inputProps={{ maxLength: 50 }}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.salary}
                                    helperText={form.formState.errors.salary?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <FormControl error={!!form.formState.errors.workplace}>
                                <TextField
                                    {...form.register("workplace")}
                                    label="Nơi làm việc"
                                    disabled={!isEditing}
                                    inputProps={{ maxLength: 11 }}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.workplace}
                                    helperText={form.formState.errors.workplace?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Box>

                        {/* Column 2 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            <FormControl>
                                <InputLabel>Hình thức</InputLabel>
                                <Select
                                    {...form.register("format")}
                                    label="Hình thức"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    defaultValue="Online"
                                >
                                    <MenuItem value="Online">Online</MenuItem>
                                    <MenuItem value="Offline">Offline</MenuItem>
                                </Select>
                                {form.formState.errors.format && (
                                    <FormHelperText>{form.formState.errors.format.message}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl error={!!form.formState.errors.experience}>
                                <TextField
                                    {...form.register("experience")}
                                    label="Số năm kinh nghiệm"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.experience}
                                    helperText={form.formState.errors.experience?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Box>

                        {/* Column 3 */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                            <FormControl error={!!form.formState.errors.occupation}>
                                <TextField
                                    {...form.register("occupation")}
                                    label="Nghề nghiệp"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.occupation}
                                    helperText={form.formState.errors.occupation?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <FormControl error={!!form.formState.errors.level}>
                                <TextField
                                    {...form.register("level")}
                                    label="Cấp bậc"
                                    disabled={!isEditing}
                                    sx={{ maxWidth: 250 }}
                                    error={!!form.formState.errors.level}
                                    helperText={form.formState.errors.level?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ mb: 4, mt: 4 }}>

                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
                            Trình Độ Học Vấn
                        </Typography>

                        <Box sx={{ display: "flex", gap: 4 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>

                                <FormControl error={!!form.formState.errors.educationlevel}>
                                    <TextField
                                        {...form.register("educationlevel")}
                                        label="Trình độ"
                                        disabled={!isEditing}
                                        inputProps={{ maxLength: 50 }}
                                        sx={{ maxWidth: 250 }}
                                        error={!!form.formState.errors.educationlevel}
                                        helperText={form.formState.errors.educationlevel?.message}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <InputLabel>Kỹ năng chuyên môn</InputLabel>
                                    <Select
                                        {...form.register("professionalskill")}
                                        label="Kỹ năng chuyên môn"
                                        disabled={!isEditing}
                                        sx={{ maxWidth: 250 }}
                                        defaultValue="Nam"
                                    >
                                        <MenuItem value="Nam">Nam</MenuItem>
                                        <MenuItem value="Nu">Nữ</MenuItem>
                                    </Select>
                                    {form.formState.errors.professionalskill && (
                                        <FormHelperText>
                                            {form.formState.errors.professionalskill.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>

                                <FormControl error={!!form.formState.errors.degree}>
                                    <TextField
                                        {...form.register("degree")}
                                        label="Bằng cấp"
                                        disabled={!isEditing}
                                        inputProps={{ maxLength: 11 }}
                                        sx={{ maxWidth: 250 }}
                                        error={!!form.formState.errors.degree}
                                        helperText={form.formState.errors.degree?.message}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>
                                <FormControl error={!!form.formState.errors.keyAccompl}>
                                    <TextField
                                        {...form.register("keyAccompl")}
                                        label="Thành tích nổi bật"
                                        disabled={!isEditing}
                                        sx={{ maxWidth: 250 }}
                                        error={!!form.formState.errors.keyAccompl}
                                        helperText={form.formState.errors.keyAccompl?.message}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>


                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>

                                <FormControl error={!!form.formState.errors.additionalCertificates}>
                                    <TextField
                                        {...form.register("additionalCertificates")}
                                        label="Chứng chỉ khác"
                                        disabled={!isEditing}
                                        inputProps={{ maxLength: 50 }}
                                        sx={{ maxWidth: 250 }}
                                        error={!!form.formState.errors.additionalCertificates}
                                        helperText={form.formState.errors.additionalCertificates?.message}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>
                                <FormControl error={!!form.formState.errors.otherActions}>
                                    <TextField
                                        {...form.register("otherActions")}
                                        label="Hoạt động khác"
                                        disabled={!isEditing}
                                        sx={{ maxWidth: 250 }}
                                        error={!!form.formState.errors.otherActions}
                                        helperText={form.formState.errors.otherActions?.message}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InforUser;
