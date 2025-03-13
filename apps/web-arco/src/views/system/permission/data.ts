import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useRoleListGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'q',
      label: '搜索',
      help: '模糊匹配名称、权限标识、默认路由、备注',
      labelClass: 'justify-start',
      labelWidth: 50,
    },
  ];
}

export function useRoleListColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      align: 'left',
      slots: { default: 'name' },
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
