import instance, { getPaginatedResponse, getSuccessResponse } from '../axios';
import type {
  UserCreateInput,
  UserFilter,
  UserIdParam,
  UserLocationResponse,
  UserResponseData,
  UserUpdateInput,
} from './type';

export const getUsersRequest = async (filter?: UserFilter) => {
  const response = await instance.get('/users', { params: filter });
  return getPaginatedResponse<UserResponseData>(response);
};

export const getLocationRequest = async () => {
  const response = await instance.get('/users/location');
  return getSuccessResponse<UserLocationResponse>(response);
};

export const createUserRequest = async (data: UserCreateInput) => {
  const response = await instance.post('/users', data);
  return getSuccessResponse<UserResponseData>(response);
};

export const getCurrentUserRequest = async () => {
  const response = await instance.get('/users/me');
  return getSuccessResponse<UserResponseData>(response);
};

export const getUserByIdRequest = async ({ userId }: UserIdParam) => {
  const response = await instance.get(`/users/${userId}`);
  return getSuccessResponse<UserResponseData>(response);
};

export const updateUserRequest = async ({ userId, ...data }: UserIdParam & Partial<UserUpdateInput>) => {
  const response = await instance.put(`/users/${userId}`, data);
  return getSuccessResponse<UserResponseData>(response);
};

export const deleteUserRequest = async ({ userId }: UserIdParam) => {
  const response = await instance.delete(`/users/${userId}`);
  return getSuccessResponse<UserResponseData>(response);
};

export const uploadAvatarRequest = async ({ userId, file }: UserIdParam & { file: File }) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await instance.post(`/users/upload-avatar/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return getSuccessResponse<UserResponseData>(response);
};

export const hideUserRequest = async ({ userId }: UserIdParam) => {
  const response = await instance.post(`/hide/${userId}`);
  return getSuccessResponse<UserResponseData>(response);
};

export const findUserById = async ({ userId }: UserIdParam) => {
  const response = await instance.get(`/users/${userId}`);
  return getSuccessResponse<UserResponseData>(response);
};

export const updateUser = async ({ userId }: UserIdParam, { data }: { data: Partial<UserUpdateInput> }) => {
  const response = await instance.put(`/users/${userId}`, data);
  return getSuccessResponse<UserResponseData>(response);
};