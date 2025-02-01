import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    authPageLayout: 'panel-center',
    name: import.meta.env.VITE_APP_TITLE,
    enableRefreshToken: false,
    accessMode: import.meta.env.VITE_APP_ACCESS_MODE,
  },
  footer: {
    enable: true,
    fixed: true,
  },
  copyright: {
    companyName: 'ilaipi',
    companySiteLink: 'https://www.ilaipi.com',
    date: '2024',
    enable: true,
    icp: '豫ICP备2024041734号-1',
    icpLink: 'https://www.ilaipi.com',
  },
});
