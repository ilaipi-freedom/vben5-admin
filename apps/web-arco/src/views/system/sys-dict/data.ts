import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/sys-dict';
import type { SystemDictDataApi } from '#/api/system/sys-dict/data';

import { saveSysDictApi } from '#/api/system/sys-dict';
import { saveSysDictDataApi } from '#/api/system/sys-dict/data';
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

export function useSysDictDataListColumns(
  onActionClick: OnActionClickFn<SystemDictDataApi.SystemDictData>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'label',
      title: $t('system.sysDict.data.label'),
      align: 'left',
      slots: { default: 'label' },
    },
    {
      field: 'value',
      title: $t('system.sysDict.data.value'),
      align: 'left',
    },
    {
      cellRender: {
        name: 'CellSwitch',
        attrs: {
          beforeChange: async (
            newVal: any,
            row: SystemDictDataApi.SystemDictData,
          ) => {
            await saveSysDictDataApi({ status: newVal }, row.id);
            return true;
          },
        },
      },
      field: 'status',
      title: $t('system.sysDict.data.status'),
      width: 80,
    },
    {
      field: 'remark',
      title: $t('system.sysDict.data.remark'),
      align: 'left',
    },
    {
      field: 'sort',
      title: $t('system.sysDict.data.sort'),
      width: 80,
      titleSuffix: {
        content: '数值越小越靠前<br/> 建议使用10/20/30，方便向中间插入',
        useHTML: true,
      },
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
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
