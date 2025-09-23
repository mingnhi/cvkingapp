import type { z } from "zod";
import {
  CompanySchema,
  CompanyCreateRequestSchema,
  CompanyUpdateRequestSchema,
} from "./schema";

/** Response item (server trả về) */
export type Company = z.infer<typeof CompanySchema>;

/** Request bodies (client gửi lên: PascalCase) */
export type CompanyCreateRequest = z.infer<typeof CompanyCreateRequestSchema>;
export type CompanyUpdateRequest = z.infer<typeof CompanyUpdateRequestSchema>;
