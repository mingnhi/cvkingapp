import { z } from "zod";
import httpInstance, { getSuccessResponse } from "@/api/axios";
import {
  CompanyResponseSchema,
  CompanyCreateRequestSchema,
  CompanyUpdateRequestSchema,
} from "./schema";
import type { CompanyResponse, CompanyCreateRequest, CompanyUpdateRequest } from "./type";

/** GET /companies → Company[] */
export async function getCompaniesRequest(): Promise<CompanyResponse[]> {
  const res = await httpInstance.get("/companies");
  const data = getSuccessResponse<CompanyResponse[]>(res);
  return z.array(CompanyResponseSchema).parse(data);
}

/** GET /companies/:id → Company */
export async function getCompanyByIdRequest(id: string): Promise<CompanyResponse> {
  const res = await httpInstance.get(`/companies/${id}`);
  const data = getSuccessResponse<CompanyResponse>(res);
  return CompanyResponseSchema.parse(data);
}

/** POST /companies  body: PascalCase → Company */
export async function createCompanyRequest(input: CompanyCreateRequest): Promise<CompanyResponse> {
  const body = CompanyCreateRequestSchema.parse(input);
  const res = await httpInstance.post("/companies", body);
  const data = getSuccessResponse<CompanyResponse>(res);
  return CompanyResponseSchema.parse(data);
}

/** PUT /companies/:id  body: PascalCase (partial) → Company */
export async function updateCompanyRequest(params: {
  id: string;
  data: CompanyUpdateRequest;
}): Promise<CompanyResponse> {
  const { id, data } = params;
  const body = CompanyUpdateRequestSchema.parse(data);
  const res = await httpInstance.put(`/companies/${id}`, body);
  const resp = getSuccessResponse<CompanyResponse>(res);
  return CompanyResponseSchema.parse(resp);
}

/** DELETE /companies/:id → ApiResponse<null> */
export async function deleteCompanyRequest(id: string): Promise<void> {
  await httpInstance.delete(`/companies/${id}`);
}
