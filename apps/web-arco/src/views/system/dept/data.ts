import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';
import type { SystemDeptApi } from '#/api/system/dept';

import { z } from '#/adapter/form';
import { getDeptTreeApi } from '#/api/system/dept';
import { $t } from '#/locales';
import { AvailableStatusEnum } from '#/typings/common';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dept.deptName'),
      rules: z
        .string()
        .min(2, $t('ui.formRules.minLength', [$t('system.dept.deptName'), 2]))
        .max(
          20,
          $t('ui.formRules.maxLength', [$t('system.dept.deptName'), 20]),
        ),
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: $t('system.dept.sort'),
      rules: z
        .number()
        .min(0, $t('ui.formRules.minLength', [$t('system.dept.sort'), 0]))
        .max(
          10_000,
          $t('ui.formRules.maxLength', [$t('system.dept.sort'), 10_000]),
        ),
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: getDeptTreeApi,
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
      },
      fieldName: 'parentDeptId',
      label: $t('system.dept.parentDept'),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: AvailableStatusEnum.Normal },
          {
            label: $t('common.disabled'),
            value: AvailableStatusEnum.Forbidden,
          },
        ],
        optionType: 'button',
      },
      defaultValue: AvailableStatusEnum.Normal,
      fieldName: 'status',
      label: $t('system.dept.status'),
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
      fieldName: 'remark',
      label: $t('system.dept.remark'),
      rules: z
        .string()
        .max(50, $t('ui.formRules.maxLength', [$t('system.dept.remark'), 50]))
        .optional(),
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
export function useColumns(
  onActionClick?: OnActionClickFn<SystemDeptApi.DeptItem>,
): VxeTableGridOptions<SystemDeptApi.DeptItem>['columns'] {
  return [
    {
      align: 'left',
      field: 'name',
      fixed: 'left',
      title: $t('system.dept.deptName'),
      treeNode: true,
      width: 150,
    },
    {
      field: 'sort',
      title: $t('system.dept.sort'),
      width: 100,
      titleSuffix: {
        content: '数值越小越靠前<br/> 建议使用10/20/30，方便向中间插入',
        useHTML: true,
      },
    },
    {
      cellRender: {
        name: 'CellSwitch',
      },
      field: 'status',
      title: $t('system.dept.status'),
      width: 100,
    },
    {
      field: 'createdAt',
      title: $t('system.dept.createTime'),
      width: 180,
    },
    {
      field: 'remark',
      title: $t('system.dept.remark'),
    },
    {
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.dept.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          {
            code: 'append',
            text: $t('system.dept.append'),
          },
          'edit', // 默认的编辑按钮
          {
            code: 'delete', // 默认的删除按钮
            disabled: (row: SystemDeptApi.DeptItem) => {
              return !!(row.children && row.children.length > 0);
            },
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.dept.operation'),
      width: 220,
    },
  ];
}
