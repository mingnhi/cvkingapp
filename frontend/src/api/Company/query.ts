import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getCompaniesRequest,
  getCompanyByIdRequest,
  createCompanyRequest,
  updateCompanyRequest,
  deleteCompanyRequest,
} from "./request";
import { onMutateError } from "@/lib/utils";
import type { Company, CompanyCreateRequest, CompanyUpdateRequest } from "./type";

export const CompanyQueryKey = {
  all: ["companies"] as const,
  detail: (id: string) => ["companies", "detail", id] as const,
};

/** QUERIES */
export const useCompaniesQuery = () =>
  useQuery<Company[]>({
    queryKey: CompanyQueryKey.all,
    queryFn: getCompaniesRequest,
  });

export const useCompanyByIdQuery = (id?: string) =>
  useQuery<Company>({
    queryKey: CompanyQueryKey.detail(id || "unknown"),
    queryFn: () => getCompanyByIdRequest(id as string),
    enabled: !!id,
  });

/** MUTATIONS (Order style; có cập nhật cache ngay, KHÔNG chain options) */
export const useCreateCompanyMutation = (
  options?: UseMutationOptions<Company, Error, CompanyCreateRequest, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<Company, Error, CompanyCreateRequest>({
    mutationFn: createCompanyRequest,
    onSuccess: (created) => {
      // cập nhật list + seed detail
      qc.setQueryData<Company[]>(CompanyQueryKey.all, (old) =>
        old ? [...old, created] : [created]
      );
      qc.setQueryData(CompanyQueryKey.detail(created.id), created);
    },
    onError: onMutateError,
    // ⚠️ nếu truyền options.onSuccess, nó sẽ override onSuccess mặc định (không chain)
    ...options,
  });
};

export const useUpdateCompanyMutation = (
  options?: UseMutationOptions<Company, Error, { id: string; data: CompanyUpdateRequest }, unknown>
) => {
  const qc = useQueryClient();

  return useMutation<Company, Error, { id: string; data: CompanyUpdateRequest }>({
    mutationFn: updateCompanyRequest,
    onSuccess: (updated) => {
      // cập nhật list + đồng bộ detail
      qc.setQueryData<Company[]>(CompanyQueryKey.all, (old) =>
        (old || []).map((c) => (c.id === updated.id ? updated : c))
      );
      qc.setQueryData(CompanyQueryKey.detail(updated.id), updated);
    },
    onError: onMutateError,
    ...options,
  });
};

export const useDeleteCompanyMutation = (
  options?: UseMutationOptions<void, Error, string, unknown>
) =>
  useMutation({
    mutationFn: deleteCompanyRequest,
    onError: onMutateError,
    ...options,
  });
