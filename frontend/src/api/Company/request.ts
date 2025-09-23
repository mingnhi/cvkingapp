import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
  CompanySchema,
  CompanyCreateRequestSchema,
  CompanyUpdateRequestSchema,
} from "./schema";
import type { Company, CompanyCreateRequest, CompanyUpdateRequest } from "./type";

/** GET /companies → Company[] */
export async function getCompaniesRequest(): Promise<Company[]> {
  const res = await httpInstance.get("/companies");
  const data = getSuccessResponse<Company[]>(res);
  return z.array(CompanySchema).parse(data);
}

/** GET /companies/:id → Company */
export async function getCompanyByIdRequest(id: string): Promise<Company> {
  const res = await httpInstance.get(`/companies/${id}`);
  const data = getSuccessResponse<Company>(res);
  return CompanySchema.parse(data);
}

/** POST /companies  body: PascalCase → Company */
export async function createCompanyRequest(input: CompanyCreateRequest): Promise<Company> {
  const body = CompanyCreateRequestSchema.parse(input);
  const res = await httpInstance.post("/companies", body);
  const data = getSuccessResponse<Company>(res);
  return CompanySchema.parse(data);
}

/** PUT /companies/:id  body: PascalCase (partial) → Company */
export async function updateCompanyRequest(params: {
  id: string;
  data: CompanyUpdateRequest;
}): Promise<Company> {
  const { id, data } = params;
  const body = CompanyUpdateRequestSchema.parse(data);
  const res = await httpInstance.put(`/companies/${id}`, body);
  const resp = getSuccessResponse<Company>(res);
  return CompanySchema.parse(resp);
}

/** DELETE /companies/:id → ApiResponse<null> */
export async function deleteCompanyRequest(id: string): Promise<void> {
  await httpInstance.delete(`/companies/${id}`);
}
