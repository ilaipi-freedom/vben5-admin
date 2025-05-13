import type { Recordable } from '@vben/types';

import type { BaseUserInfo } from '#/typings/common';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { defineStore } from 'pinia';

import { notification } from '#/adapter/arco';
import { getUserInfoApi, loginApi, logoutApi } from '#/api';
import { getPermBtnCodesApi } from '#/api/system/account';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    const userInfo: BaseUserInfo | null = null;
    try {
      loginLoading.value = true;
      const extra = {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone,
        language: navigator.language,
        hardwareConcurrency: navigator.hardwareConcurrency,
      };
      const { token: accessToken } = await loginApi({ ...params, extra });

      // 如果成功获取到 accessToken
      if (accessToken) {
        // 将 accessToken 存储到 accessStore 中
        accessStore.setAccessToken(accessToken);

        // 获取用户信息并存储到 accessStore 中

        const userInfo = await fetchUserInfo();
        userInfo.homePath = userInfo?.role?.route;
        const userRoles = userInfo?.role?.perm ? [userInfo?.role?.perm] : [];
        userStore.setUserRoles(userRoles);
        userStore.setUserInfo(userInfo);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        }
        onSuccess
          ? await onSuccess()
          : await router.push(
              userInfo.homePath || preferences.app.defaultHomePath,
            );

        if (userInfo?.realName) {
          notification.success({
            title: $t('authentication.loginSuccess'),
            content: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error('login api response error', error);
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    const [fetchUserInfoResult, accessCodes] = await Promise.all([
      getUserInfoApi(),
      getPermBtnCodesApi(),
    ]);
    const userInfo: BaseUserInfo | null = fetchUserInfoResult;
    userInfo.realName = userInfo?.realName || userInfo?.name || '';
    userStore.setUserInfo(userInfo);
    accessStore.setAccessCodes(accessCodes);
    accessStore.setIsAccessChecked(false);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
