import type { BaseUserInfo } from '#/typings/common';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<BaseUserInfo>('/account/info');
}
