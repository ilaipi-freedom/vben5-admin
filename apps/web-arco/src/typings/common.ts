import type { UserInfo } from '@vben/types';

export enum AvailableStatusEnum {
  Forbidden = 'forbidden',
  Normal = 'normal',
}

export const AvailableStatusMap = {
  [AvailableStatusEnum.Forbidden]: '禁用',
  [AvailableStatusEnum.Normal]: '正常',
};

export type ListItemsTotalType<T> = {
  items: T[];
  total: number;
};

export type BasePageQuery = {
  isAll?: boolean;
  page?: number;
  pageSize?: number;
};

interface BaseUserInfo extends UserInfo {
  name: string;
  role: {
    id: string;
    name: string;
    perm: string;
    route: string;
  };
}

export type { BaseUserInfo };
