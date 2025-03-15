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
  page?: number;
  pageSize?: number;
};
