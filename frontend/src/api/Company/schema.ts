import { z } from "zod";

/** ====== REQUEST (PascalCase) ====== */
export const CompanyCreateRequestSchema = z.object({
  Name: z.string().trim().min(1).max(300),
  Slug: z.string().trim().max(300).optional(),
  LogoUrl: z.string().url().optional(),
  BannerUrl: z.string().url().optional(),
  Industry: z.string().trim().optional(),
  CompanySize: z.string().trim().optional(),
  Website: z.string().url().optional(),
  Location: z.string().trim().optional(),
  Description: z.string().optional(),
  IsVerified: z.boolean().optional(),
});

export const CompanyUpdateRequestSchema = z.object({
  // PUT /companies/:id → body là các trường optional (PascalCase)
  Name: z.string().trim().max(300).optional(),
  Slug: z.string().trim().max(300).optional(),
  LogoUrl: z.string().url().optional(),
  BannerUrl: z.string().url().optional(),
  Industry: z.string().trim().optional(),
  CompanySize: z.string().trim().optional(),
  Website: z.string().url().optional(),
  Location: z.string().trim().optional(),
  Description: z.string().optional(),
  IsVerified: z.boolean().optional(),
});

/** ====== RESPONSE (camel đầu thường) ====== */
export const CompanySchema = z.object({
  id: z.string(),                        // không ràng buộc
  name: z.string(),
  slug: z.string().nullable().optional(),
  logoUrl: z.string().nullable().optional(),
  bannerUrl: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  companySize: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  isVerified: z.boolean().optional(),
  created_at: z.union([z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.string(), z.date()]).nullable().optional(),
});
