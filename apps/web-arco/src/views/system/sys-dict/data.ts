import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/sys-dict';

import { saveSysDictApi } from '#/api/system/sys-dict';
import { $t } from '#/locales';

export function useSysDictListGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'q',
      label: '搜索',
      help: '模糊匹配名称、类型',
      labelClass: 'justify-start',
      labelWidth: 50,
    },
  ];
}

export function useSysDictListColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      align: 'left',
      slots: { default: 'name' },
    },
    {
      cellRender: {
        name: 'CellSwitch',
        attrs: {
          beforeChange: async (newVal: any, row: SystemDictApi.SystemDict) => {
            await saveSysDictApi({ status: newVal }, row.id);
            return true;
          },
        },
      },
      field: 'status',
      title: $t('system.dept.status'),
      width: 80,
    },
    {
      field: 'action',
      align: 'center',
      width: 95,
      slots: { default: 'action' },
    },
  ];
}

export function usePermissionFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'permissions',
      modelPropName: 'modelValue',
    },
  ];
}
