import type { Recordable } from '@vben/types';

import type { ListItemsTotalType } from '#/typings/common';

import { requestClient } from '#/api/request';
import { AvailableStatusEnum } from '#/typings/common';

export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    id: string;
    name: string;
    remark?: string;
    status: AvailableStatusEnum;
  }
}

/**
 * 获取角色列表数据
 */
async function getRoleListApi(params: Recordable<any>) {
  return requestClient.get<ListItemsTotalType<SystemRoleApi.SystemRole>>(
    '/role/list',
    {
      params,
    },
  );
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function saveRoleApi(
  data: Omit<SystemRoleApi.SystemRole, 'id'>,
  id: string,
) {
  return id
    ? requestClient.put(`/role/${id}`, data)
    : requestClient.post('/role', data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRoleApi(id: string) {
  return requestClient.delete(`/role/${id}`);
}

async function saveRolePermApi(roleId: string, perms: string[] = []) {
  return requestClient.put(`/role/updatePerm/${roleId}`, { perms });
}

export { deleteRoleApi, getRoleListApi, saveRoleApi, saveRolePermApi };
