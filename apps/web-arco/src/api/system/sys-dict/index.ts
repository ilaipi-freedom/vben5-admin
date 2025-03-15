import type { AvailableStatusEnum, BasePageQuery } from '#/typings/common';

import { requestClient } from '#/api/request';

export namespace SystemDictApi {
  export interface SystemDict {
    id: string;
    type: string;
    category: string;
    name: string;
    remark: string;
    status: AvailableStatusEnum;
    selected?: boolean;
  }

  export interface DictQuery extends BasePageQuery {
    q?: string;
    status?: AvailableStatusEnum;
  }
}

const prefix = '/sys-dict';

/**
 * 创建或更新字典类型
 */
export async function saveSysDictApi(
  data: Partial<SystemDictApi.SystemDict>,
  id?: string,
) {
  if (id) {
    return requestClient.put<SystemDictApi.SystemDict>(`${prefix}/${id}`, data);
  }
  return requestClient.post<SystemDictApi.SystemDict>(prefix, data);
}

/**
 * 删除字典类型
 */
export async function deleteSysDictApi(id: string) {
  return requestClient.delete(`${prefix}/${id}`);
}

/**
 * 获取字典类型列表
 */
export async function getSysDictListApi(params: SystemDictApi.DictQuery) {
  return requestClient.get<{
    items: SystemDictApi.SystemDict[];
    total: number;
  }>(prefix, { params });
}

/**
 * 获取字典类型详情
 */
export async function getSysDictDetailApi(id: string) {
  return requestClient.get<SystemDictApi.SystemDict>(`${prefix}/${id}`);
}
