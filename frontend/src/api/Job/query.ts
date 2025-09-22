
import {
  type UseMutationOptions,
//   type UseQueryOptions,
  useMutation,
//   useQuery,
//   useQueryClient,
} from '@tanstack/react-query';
import { CreateJobInput, JobApiResponse } from './type';
import { createJobRequest } from './request';
import { onMutateError } from '@/lib/utils';

export const useCreateJobMutation = (options?: UseMutationOptions<JobApiResponse, Error, CreateJobInput, unknown>) =>
  useMutation({
    mutationFn: createJobRequest,
    onError: onMutateError,
    ...options,
  });