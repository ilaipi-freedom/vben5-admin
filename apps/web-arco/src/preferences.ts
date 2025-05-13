import { defineOverridesPreferences } from '@vben/preferences';

import dayjs from 'dayjs';

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
    defaultHomePath: '/workplace',
  },
  footer: {
    enable: false,
    fixed: true,
  },
  copyright: {
    companyName: import.meta.env.VITE_APP_COPYRIGHT_COMPANY_NAME || 'vben',
    companySiteLink:
      import.meta.env.VITE_APP_COPYRIGHT_COMPANY_SITE_LINK ||
      'https://www.ilaipi.com',
    date: dayjs().format('YYYY'),
    enable: true,
    icp: import.meta.env.VITE_APP_COPYRIGHT_ICP,
    icpLink: import.meta.env.VITE_APP_COPYRIGHT_ICP_LINK,
  },
});
