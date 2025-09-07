import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { loginRequest, logoutRequest, registerRequest, socialLoginRequest } from './request';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, SocialLoginRequest } from './type';

export const useLoginMutation = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest, unknown>) =>
  useMutation({
    mutationFn: (params: LoginRequest) => loginRequest(params),
    ...options,
  });

export const useSocialLoginMutation = (
  options?: UseMutationOptions<LoginResponse, Error, SocialLoginRequest, unknown>
) =>
  useMutation({
    mutationFn: (params: SocialLoginRequest) => socialLoginRequest(params),
    ...options,
  });

export const useRegisterMutation = (options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest, unknown>) =>
  useMutation({
    mutationFn: (params: RegisterRequest) => registerRequest(params),
    ...options,
  });

export const useLogoutMutation = (options?: UseMutationOptions<null, Error, { refreshToken: string }, unknown>) =>
  useMutation({
    mutationFn: (params: { refreshToken: string }) => logoutRequest(params),
    ...options,
  });
