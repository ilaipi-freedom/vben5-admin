import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.arco'),
        },
        name: 'ArcoDemos',
        path: '/demos/arco',
        component: () => import('#/views/demos/arco/index.vue'),
      },
      {
        meta: {
          title: $t('demos.table'),
        },
        name: 'Table',
        path: '/demos/table',
        component: () => import('#/views/demos/table/index.vue'),
      },
      {
        meta: {
          title: $t('demos.form'),
        },
        name: 'Form',
        path: '/demos/form',
        component: () => import('#/views/demos/form/basic.vue'),
      },
    ],
  },
];

export default routes;
