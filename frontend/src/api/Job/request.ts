import instance, { getSuccessResponse } from "../axios";
import { CreateJobInput, JobApiResponse } from "./type";

export const createJobRequest = async (data: CreateJobInput) => {
  const response = await instance.post('/jobs', data);
  return getSuccessResponse<JobApiResponse>(response);
};