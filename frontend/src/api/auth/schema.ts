import { MESSAGES } from '@/lib/messages';
import { z } from 'zod';

export const LoginRequestSchema = z
  .object({
    username: z.string().min(3, { message: MESSAGES.USERNAME_TOO_SHORT }).optional(),
    email: z.string().email({ message: MESSAGES.INVALID_EMAIL }).optional(),
    password: z.string().min(6, { message: MESSAGES.PASSWORD_TOO_SHORT }).optional(),
    twoFactorCode: z.string().optional(),
    provider: z.enum(['email', 'google', 'facebook']).default('email'),
    providerId: z.string().optional(),
    fullName: z.string().optional(),
    avatar: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.provider === 'email') {
        return (data.username || data.email) && data.password;
      }
      return data.email && data.providerId;
    },
    {
      message: 'Invalid login credentials',
    }
  );

export const RegisterRequestSchema = z
  .object({
    username: z.string().min(3, { message: MESSAGES.USERNAME_TOO_SHORT }).optional(),
    email: z.string().email({ message: MESSAGES.INVALID_EMAIL }),
    password: z.string().min(6, { message: MESSAGES.PASSWORD_TOO_SHORT }).optional(),
    fullName: z.string().optional(),
    avatar: z.string().optional(),
    provider: z.enum(['email', 'google', 'facebook']).default('email'),
    providerId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.provider === 'email') {
        return data.username && data.password;
      }
      return data.providerId;
    },
    {
      message: 'Invalid registration data',
    }
  );

export const SocialLoginRequestSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  avatar: z.string().optional(),
  provider: z.enum(['google', 'facebook']),
  providerId: z.string(),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email({ message: MESSAGES.INVALID_EMAIL }),
});

export const ResetPasswordRequestSchema = z.object({
  password: z.string().min(6, { message: MESSAGES.PASSWORD_TOO_SHORT }),
});


export const LoginResponseSchema = z.object({
  token: z.string().optional(),
  refreshToken: z.string().optional(),
  twoFactorRequired: z.boolean().optional(),
});

export const RegisterResponseSchema = z.object({
  token: z.string().optional(),
  refreshToken: z.string().optional(),
});

export const ResetPasswordTokenParamSchema = z.object({
  token: z.string(),
  userId: z.string().uuid({ message: MESSAGES.INVALID_UUID }),
});
