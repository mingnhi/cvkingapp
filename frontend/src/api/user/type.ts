import type { z } from 'zod';
import type {
  UserAttributesSchema,
  UserCreateInputSchema,
  UserFilterSchema,
  UserIdParamSchema,
  UserLocationResponseSchema,
  UserResponseDataSchema,
  UserUpdateInputSchema,
} from './schema';

export type UserAttributes = z.infer<typeof UserAttributesSchema>;
export type UserFilter = z.infer<typeof UserFilterSchema>;
export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;
export type UserResponseData = z.infer<typeof UserResponseDataSchema>;
export type UserIdParam = z.infer<typeof UserIdParamSchema>;
export type UserLocationResponse = z.infer<typeof UserLocationResponseSchema>;
