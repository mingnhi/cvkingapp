import z from "zod";
import { CreateJobSchema, JobApiResponseSchema } from "./schema";

export type JobApiResponse = z.infer<typeof JobApiResponseSchema>;
export type CreateJobFormData = z.input<typeof CreateJobSchema>; 
