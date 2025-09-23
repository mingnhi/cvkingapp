
import {
  type UseMutationOptions,
//   type UseQueryOptions,
  useMutation,
//   useQuery,
//   useQueryClient,
} from '@tanstack/react-query';
import { CreateJobFormData, JobApiResponse } from './type';
import { createJobRequest } from './request';
import { onMutateError } from '@/lib/utils';

export const useCreateJobMutation = (options?: UseMutationOptions<JobApiResponse, Error, CreateJobFormData, unknown>) =>
  useMutation({
    mutationFn: createJobRequest,
    onError: onMutateError,
    ...options,
  });