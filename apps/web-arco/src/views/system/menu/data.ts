import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemMenuApi } from '#/api/system/menu';

import { saveMenuApi } from '#/api/system/menu';
import { $t } from '#/locales';

export function getMenuTypeOptions() {
  return [
    {
      color: 'arcoblue',
      label: $t('system.menu.typeCatalog'),
      value: 'catalog',
      bordered: true,
    },
    { color: 'default', label: $t('system.menu.typeMenu'), value: 'menu' },
    { color: 'error', label: $t('system.menu.typeButton'), value: 'button' },
    {
      color: 'lime',
      label: $t('system.menu.typeMenu'),
      value: 'menu',
      bordered: true,
    },
    {
      color: 'magenta',
      label: $t('system.menu.typeButton'),
      value: 'button',
      bordered: true,
    },
    {
      color: 'green',
      label: $t('system.menu.typeEmbedded'),
      value: 'embedded',
      bordered: true,
    },
    {
      color: 'gold',
      label: $t('system.menu.typeLink'),
      value: 'link',
      bordered: true,
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn<SystemMenuApi.SystemMenu>,
): VxeTableGridOptions<SystemMenuApi.SystemMenu>['columns'] {
  return [
    {
      align: 'left',
      field: 'meta.title',
      fixed: 'left',
      slots: { default: 'title' },
      title: $t('system.menu.menuTitle'),
      treeNode: true,
      width: 250,
    },
    {
      align: 'center',
      cellRender: { name: 'CellTag', options: getMenuTypeOptions() },
      field: 'type',
      title: $t('system.menu.type'),
      width: 100,
    },
    {
      align: 'center',
      field: 'meta.order',
      title: $t('system.menu.orderNo'),
      width: 80,
    },
    {
      field: 'permission',
      title: $t('system.menu.permission'),
      width: 200,
    },
    {
      align: 'left',
      field: 'path',
      title: $t('system.menu.path'),
      width: 200,
    },

    {
      align: 'left',
      field: 'component',
      formatter: ({ row }) => {
        switch (row.type) {
          case 'catalog':
          case 'menu': {
            return row.component ?? '';
          }
          case 'embedded': {
            return row.meta?.iframeSrc ?? '';
          }
          case 'link': {
            return row.meta?.link ?? '';
          }
        }
        return '';
      },
      minWidth: 200,
      title: $t('system.menu.component'),
    },
    {
      cellRender: {
        name: 'CellSwitch',
        attrs: {
          beforeChange: async (newVal: any, row: SystemMenuApi.SystemMenu) => {
            await saveMenuApi({ status: newVal }, row.id);
            return true;
          },
        },
      },
      field: 'status',
      title: $t('system.menu.status'),
      width: 100,
    },

    {
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'name',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'append',
            text: '新增下级',
          },
          'edit', // 默认的编辑按钮
          'delete', // 默认的删除按钮
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.menu.operation'),
      width: 220,
    },
  ];
}
