import type { AvailableStatusEnum } from '#/constants';

import { requestClient } from '#/api/request';

export namespace SystemDeptApi {
  /** 部门列表项 */
  export interface DeptItem {
    id: string;
    name: string;
    sort: number;
    createTime: string;
    status: number;
    remark: string;
    parentDeptId: string;
    children?: DeptItem[];
  }

  /** 创建部门参数 */
  export interface SaveDeptParams {
    status?: AvailableStatusEnum;
    name: string;
    parentDeptId?: string;
    remark?: string;
    sort: number;
  }
}

/**
 * 获取部门列表
 */
export async function getDeptListApi(params: any) {
  return requestClient.get<SystemDeptApi.DeptItem[]>('/dept', { params });
}

export async function getDeptTreeApi() {
  return requestClient.get<SystemDeptApi.DeptItem[]>('/dept/tree');
}

export async function saveDeptApi(
  params: SystemDeptApi.SaveDeptParams,
  id?: string,
) {
  return id
    ? requestClient.put(`/dept/${id}`, params)
    : requestClient.post('/dept', params);
}

/**
 * 删除部门
 */
export async function deleteDeptApi(id: string) {
  return requestClient.delete(`/dept/${id}`);
}
