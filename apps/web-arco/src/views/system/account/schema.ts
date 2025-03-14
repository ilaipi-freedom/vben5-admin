import { z } from '#/adapter/form';
import { AvailableStatusEnum, AvailableStatusMap } from '#/typings/common';

export const accountFormSchema = () => [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入姓名',
      maxLength: 20,
    },
    fieldName: 'name',
    label: '姓名',
    rules: 'required',
    defaultValue: '',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名',
      maxLength: 190,
    },
    fieldName: 'username',
    label: '用户名',
    rules: 'required',
    defaultValue: '',
  },
  {
    component: 'InputPassword',
    componentProps: {
      placeholder: '请输入密码',
      maxLength: 32,
    },
    fieldName: 'password',
    label: '密码',
    rules: z.string().min(6, '密码长度不能小于6位'),
    defaultValue: '',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入手机号',
      maxLength: 11,
    },
    fieldName: 'phone',
    label: '手机号',
    defaultValue: '',
  },
  {
    component: 'Select',
    componentProps: {
      options: [], // 将在组件中动态设置
      fieldNames: {
        value: 'id',
        label: 'name',
      },
    },
    fieldName: 'roleId',
    label: '角色',
    rules: 'selectRequired',
  },
];

export const accountSearchFormSchema = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '搜索',
    help: '模糊匹配：用户名/手机号',
    typeName: 'string',
    defaultValue: '',
  },
  {
    component: 'Select',
    fieldName: 'roleId',
    label: '角色',
    componentProps: {
      options: [], // 将在组件中动态设置
      allowClear: true,
      fieldNames: {
        value: 'id',
        label: 'name',
      },
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        {
          label: AvailableStatusMap[AvailableStatusEnum.Normal],
          value: AvailableStatusEnum.Normal,
        },
        {
          label: AvailableStatusMap[AvailableStatusEnum.Forbidden],
          value: AvailableStatusEnum.Forbidden,
        },
      ],
      allowClear: true,
    },
  },
];
