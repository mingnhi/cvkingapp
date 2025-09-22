import { z } from "zod";

export const CreateJobSchema = z
  .object({
    CompanyId: z.string().uuid("ID phải là UUID hợp lệ"),
    PostedByUserId: z.string().uuid("ID không hợp lệ").optional(),

    Title: z
      .string()
      .trim()
      .min(3, "Tiêu đề quá ngắn")
      .max(120, "Tiêu đề quá dài"),
    Slug: z
      .string()
      .min(3, "Slug quá ngắn")
      .max(140, "Slug quá dài")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug chỉ gồm a-z, 0-9, dấu gạch ngang"
      ),

    ShortDescription: z
      .string()
      .trim()
      .max(280, "Tóm tắt tối đa 280 ký tự")
      .optional(),
    Description: z.string().trim().max(20000, "Mô tả quá dài").optional(),
    Requirements: z.string().trim().max(20000, "Yêu cầu quá dài").optional(),
    Benefits: z.string().trim().max(20000, "Quyền lợi quá dài").optional(),

    SalaryMin: z.coerce
      .number()
      .nonnegative("Lương tối thiểu không hợp lệ")
      .optional(),
    SalaryMax: z.coerce
      .number()
      .nonnegative("Lương tối đa không hợp lệ")
      .optional(),
    Currency: z
      .string()
      .regex(/^[A-Z]{3}$/, "Mã tiền tệ phải là 3 chữ cái in hoa (VD: USD, VND)")
      .optional(),

    JobType: z
      .enum([
        "Full-time",
        "Part-time",
        "Contract",
        "Freelance",
        "Internship",
        "Temporary",
        "Remote",
      ])
      .optional(),

    Location: z.string().trim().max(140, "Địa điểm quá dài").optional(),
    CategoryId: z.string().uuid("CategoryId phải là UUID").optional(),
    ExpiresAt: z.coerce
      .date()
      .min(new Date(), "Ngày hết hạn phải ở tương lai")
      .optional(),

    skillIds: z
      .array(z.string().uuid("SkillId phải là UUID"))
      .min(1, "Cần ít nhất 1 kỹ năng"),
    tagIds: z
      .array(z.string().uuid("TagId phải là UUID"))
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    const hasSalary = data.SalaryMin != null || data.SalaryMax != null;

    if (hasSalary && !data.Currency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["Currency"],
        message: "Phải có Currency khi khai báo lương",
      });
    }

    if (
      data.SalaryMin != null &&
      data.SalaryMax != null &&
      data.SalaryMin > data.SalaryMax
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["SalaryMin"],
        message: "SalaryMin không được lớn hơn SalaryMax",
      });
    }
  });

export const ApiResponseSchema = <T extends z.ZodTypeAny = z.ZodUnknown>(
  dataSchema?: T
) =>
  z.object({
    status: z.enum(["success", "error"]),
    message: z.string(),
    data: z.union([
      dataSchema ?? z.unknown(),
      (dataSchema ?? z.unknown()).array(),
      z.null(),
    ]),
  });

export const JobApiResponseSchema = ApiResponseSchema(z.unknown());
