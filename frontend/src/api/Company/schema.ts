import { z } from "zod";

/** ====== REQUEST (PascalCase) ====== */
export const CompanyCreateRequestSchema = z.object({
  name: z.string().trim().max(300).optional(),
  slug: z.string().trim().max(300).optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  industry: z.string().trim().optional(),
  companySize: z.string().trim().optional(),
  website: z.string().url().optional(),
  location: z.string().trim().optional(),
  description: z.string().optional(),
  isVerified: z.boolean().optional(),
});

export const CompanyUpdateRequestSchema = z.object({
  // PUT /companies/:id → body là các trường optional (PascalCase)
  name: z.string().trim().max(300).optional(),
  slug: z.string().trim().max(300).optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  industry: z.string().trim().optional(),
  companySize: z.string().trim().optional(),
  website: z.string().url().optional(),
  location: z.string().trim().optional(),
  description: z.string().optional(),
  isVerified: z.boolean().optional(),
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
