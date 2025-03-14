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
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          icon: 'mdi:account-group',
          title: $t('system.role.title'),
        },
        component: () => import('#/views/system/role/list.vue'),
      },
      {
        path: '/system/permission',
        name: 'SystemRolePermission',
        meta: {
          icon: 'mdi:user-access-control',
          title: $t('system.permission.title'),
        },
        component: () => import('#/views/system/permission/index.vue'),
      },
      {
        path: '/system/account',
        name: 'SystemAccount',
        meta: {
          icon: 'mdi:account-outline',
          title: $t('system.account.title'),
        },
        component: () => import('#/views/system/account/index.vue'),
      },
    ],
  },
];

export default routes;
