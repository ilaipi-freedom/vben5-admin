import { requestClient } from '#/api/request';
import { AvailableStatusEnum } from '#/typings/common';

export namespace SystemAccountApi {
  export interface SystemAccount {
    id: string;
    name: string;
    username: string;
    password: string;
    role: string[];
    status: AvailableStatusEnum;
    statusLoading?: boolean;
  }

  export interface ChangePasswordParams {
    currentPassword: string;
    newPassword: string;
  }
}

const prefix = '/account';

export function getPermCodeByRoleApi(roleId: string) {
  return requestClient.get<string[]>(`${prefix}/permCode/${roleId}`);
}

export function getPermBtnCodesApi() {
  return requestClient.get<string[]>(`${prefix}/permBtnCodes`);
}

/**
 * 保存账户
 */
export async function saveAccountApi(
  data: Partial<SystemAccountApi.SystemAccount>,
  id?: string,
) {
  if (id) {
    return requestClient.put<SystemAccountApi.SystemAccount>(
      `${prefix}/${id}`,
      data,
    );
  }
  return requestClient.post<SystemAccountApi.SystemAccount>(prefix, data);
}

/**
 * 删除账户
 */
export async function deleteAccountApi(id: string) {
  return requestClient.delete(`${prefix}/${id}`);
}

/**
 * 获取账户列表
 */
export async function getAccountListApi(
  params: SystemAccountApi.SystemAccount,
) {
  return requestClient.get<SystemAccountApi.SystemAccount>(prefix, { params });
}

/**
 * 获取账户详情
 */
export async function getAccountDetailApi(id: string) {
  return requestClient.get<SystemAccountApi.SystemAccount>(`${prefix}/${id}`);
}

export interface ChangePasswordResult {
  success: boolean;
}

export function changePasswordApi(
  params: SystemAccountApi.ChangePasswordParams,
) {
  return requestClient.post('/auth/change-password', params);
}

export function resetPasswordApi(
  id: string,
  params: SystemAccountApi.ChangePasswordParams,
) {
  return requestClient.put(`${prefix}/resetPassword/${id}`, params);
}
