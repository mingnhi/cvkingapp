import z from "zod";
import { CreateJobSchema, JobApiResponseSchema } from "./schema";

export type JobApiResponse = z.infer<typeof JobApiResponseSchema>;
export type CreateJobInput = z.infer<typeof CreateJobSchema>;
