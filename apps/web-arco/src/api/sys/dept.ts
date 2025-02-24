import type { AvailableStatusEnum } from '#/constants';

import { requestClient } from '#/api/request';

export namespace DeptApi {
  /** 部门列表项 */
  export interface DeptItem {
    id: string;
    name: string;
    sort: number;
    createTime: string;
    status: number;
    remark: string;
    parentDeptId: string;
  }
}

/**
 * 获取部门列表
 */
export async function getDeptList(params: any) {
  return requestClient.get<DeptApi.DeptItem[]>('/dept', { params });
}

export async function getDeptTree() {
  return requestClient.get<DeptApi.DeptItem[]>('/dept/tree');
}

/** 创建部门参数 */
export interface CreateDeptParams {
  name: string;
  parentDeptId?: string;
  remark?: string;
  sort: number;
}

/** 更新部门参数 */
export interface UpdateDeptParams {
  status: AvailableStatusEnum;
  name?: string;
  remark?: string;
  sort?: number;
}

/**
 * 创建部门
 */
export async function createDeptApi(params: CreateDeptParams) {
  return requestClient.post('/dept', params);
}

/**
 * 更新部门
 */
export async function updateDeptApi(id: string, params: UpdateDeptParams) {
  return requestClient.put(`/dept/${id}`, params);
}

export async function saveDeptApi(
  params: CreateDeptParams | UpdateDeptParams,
  id?: string,
) {
  return id
    ? updateDeptApi(id, params as UpdateDeptParams)
    : createDeptApi(params as CreateDeptParams);
}

/**
 * 删除部门
 */
export async function deleteDeptApi(id: string) {
  return requestClient.delete(`/dept/${id}`);
}
