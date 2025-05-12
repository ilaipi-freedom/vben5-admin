import { baseRequestClient, requestClient } from '#/api/request';
// 屏幕分辨率  window.screen.width    screenWidth screenHeight
// 视窗大小：浏览器窗口的当前大小 window.innerWidth    viewportWidth viewportHeight
// 时区：通过日期对象获取用户的时区   Intl.DateTimeFormat().resolvedOptions().timeZone   timezone
// 语言设置：用户浏览器设置的语言  navigator.language || navigator.userLanguage  language
// 硬件并发：CPU核心数 navigator.hardwareConcurrency
export interface AdminLoginExtraDto {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  timezone: string;
  language: string;
  hardwareConcurrency: number;
}
export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
    extra?: AdminLoginExtraDto;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return requestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
