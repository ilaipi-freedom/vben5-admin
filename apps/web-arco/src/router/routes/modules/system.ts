import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      title: $t('system.title'),
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'Dept',
        path: 'dept',
        component: () => import('#/views/system/dept/list.vue'),
        meta: {
          icon: 'lucide:network',
          title: $t('system.dept.title'),
        },
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          icon: 'mdi:menu',
          title: $t('system.menu.title'),
        },
        component: () => import('#/views/system/menu/list.vue'),
      },
    ],
  },
];

export default routes;
