import { requestClient } from '#/api/request';

export namespace SystemAccountApi {}

const prefix = '/account';

export function getPermCodeByRoleApi(roleId: string) {
  return requestClient.get<string[]>(`${prefix}/permCode/${roleId}`);
}
