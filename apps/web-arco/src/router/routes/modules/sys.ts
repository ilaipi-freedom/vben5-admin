import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      title: $t('sys.title'),
    },
    name: 'Sys',
    path: '/sys',
    children: [
      {
        name: 'Dept',
        path: 'dept',
        component: () => import('#/views/sys/dept/index.vue'),
        meta: {
          icon: 'lucide:network',
          title: $t('sys.dept.title'),
        },
      },
    ],
  },
];

export default routes;
