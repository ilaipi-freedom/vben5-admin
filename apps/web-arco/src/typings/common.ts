export enum AvailableStatusEnum {
  Forbidden = 'forbidden',
  Normal = 'normal',
}

export const AvailableStatusMap = {
  [AvailableStatusEnum.Forbidden]: '禁用',
  [AvailableStatusEnum.Normal]: '正常',
};
