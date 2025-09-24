import { z } from "zod";

export const CreateJobSchema = z
  .object({
    CompanyId: z.string().optional(),
    PostedByUserId: z.string().optional(),
    Title: z
      .string()
      .trim()
      .min(3, "Tiêu đề quá ngắn")
      .max(120, "Tiêu đề quá dài"),
    Slug: z.string().optional(),
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
        "Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"
      ])
      .optional(),

    Location: z.string().trim().max(140, "Địa điểm quá dài").optional(),
    CategoryId: z.string().uuid("CategoryId phải là UUID").optional(),
    ExpiresAt: z.coerce
      .date()
      .min(new Date(), "Ngày hết hạn phải ở tương lai")
      .optional(),
    skillIds: z.array(z.string()).default([]),
    tagIds: z.array(z.string()).default([]),
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

export const JobSchema = z.object({
  id: z.string(),

  created_at: z.string(),              // 'yyyy-MM-dd' từ DB
  company_id: z.string(),
  posted_by_user_id: z.string().nullable().optional(),

  title: z.string(),
  slug: z.string(),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),

  salary_min: z.number().nullable().optional(),
  salary_max: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  job_type: z.string().nullable().optional(),
  location: z.string().nullable().optional(),

  category_id: z.string().nullable().optional(),
  status: z.string(),
  views_count: z.number().nullable().optional(),

  posted_at: z.string().nullable().optional(),   // ISO datetime
  expires_at: z.string().nullable().optional(),  // ISO datetime

  // Có trong list (SP_GetFilteredJobs)
  total: z.number().optional(),

  // === NESTED FIELDS ===
  // category object
  category: z
    .object({
      id: z.string(),
      Name: z.string(),
    })
    .nullable()
    .optional(),

  // skills array
  skills: z
    .array(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .default([]),

  // tags array
  tags: z
    .array(
      z.object({
        id: z.string(),
        Name: z.string(),
      })
    )
    .default([]),

  // company object (thêm mới)
  company: z
    .object({
      id: z.string(),
      Name: z.string(),                 // giữ "Name" (N hoa) để đồng nhất với backend
      slug: z.string().nullable().optional(),
      logo_url: z.string().nullable().optional(),
      banner_url: z.string().nullable().optional(),
      industry: z.string().nullable().optional(),
      company_size: z.string().nullable().optional(),
      website: z.string().nullable().optional(),
      location: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      isVerified: z.boolean().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const JobsSchema = z.array(JobSchema);

/** ====== Filter schema cho FE build query ======
 * - Coerce number
 * - Default page=1, limit=10
 * - Enum cho sortBy/sortOrder/jobType
 */
export const JobFilterSchema = z
  .object({
    keyword: z.string().trim().optional(),
    location: z.string().trim().optional(),
    categoryId: z.string().uuid().optional(),
    salaryMin: z.coerce.number().int().nonnegative().optional(),
    salaryMax: z.coerce.number().int().nonnegative().optional(),
    jobType: z
      .enum([
       "Toàn thời gian", "Bán thời gian", "Hợp đồng", "Freelance"
      ])
      .optional(),
    companyId: z.string().uuid().optional(),

    // backend đang nhận comma-separated -> để string
    skillIds: z.string().optional(),
    tagIds: z.string().optional(),

    sortBy: z
      .enum(["title", "salary_min", "created_at", "views_count"])
      .default("title"),
    sortOrder: z.enum(["ASC", "DESC"]).default("DESC"),

    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .refine(
    (v) =>
      v.salaryMin == null || v.salaryMax == null || v.salaryMin <= v.salaryMax,
    { message: "salaryMin must be <= salaryMax", path: ["salaryMin"] }
  );

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
    meta: z
      .object({
        count: z.number().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
        totalPages: z.number().optional(),
      })
      .optional(),
  });

export const JobApiResponseSchema = ApiResponseSchema(z.unknown());
