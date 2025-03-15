import type { AvailableStatusEnum, BasePageQuery } from '#/typings/common';

import { requestClient } from '#/api/request';

export namespace SystemDictDataApi {
  export interface SystemDictData {
    id: string;
    label: string;
    key: string;
    type: string;
    value: string;
    remark?: string;
    status: AvailableStatusEnum;
    selected?: boolean;
    sort?: number;
    extra?: Record<string, any>;
  }

  export interface DictDataQuery extends BasePageQuery {
    q?: string;
    status?: AvailableStatusEnum;
  }
}

const prefix = '/sys-dict-data';

/**
 * 创建或更新字典数据
 */
export async function saveSysDictDataApi(
  data: Partial<SystemDictDataApi.SystemDictData>,
  id?: string,
) {
  if (id) {
    return requestClient.put<SystemDictDataApi.SystemDictData>(
      `${prefix}/${id}`,
      data,
    );
  }
  return requestClient.post<SystemDictDataApi.SystemDictData>(prefix, data);
}

/**
 * 删除字典数据
 */
export async function deleteSysDictDataApi(id: string) {
  return requestClient.delete(`${prefix}/${id}`);
}

/**
 * 获取字典数据列表
 */
export async function getSysDictDataListApi(
  params: SystemDictDataApi.DictDataQuery,
) {
  return requestClient.get<{
    items: SystemDictDataApi.SystemDictData[];
    total: number;
  }>(prefix, { params });
}

/**
 * 获取字典数据详情
 */
export async function getSysDictDataDetailApi(id: string) {
  return requestClient.get<SystemDictDataApi.SystemDictData>(`${prefix}/${id}`);
}
