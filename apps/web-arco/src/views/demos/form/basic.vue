<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import {
  Button as AButton,
  Card as ACard,
  Message,
} from '@arco-design/web-vue';

import { useVbenForm } from '#/adapter/form';
import { getAllMenusApi } from '#/api';

const message = {
  success: (content: string) => Message.success(content),
};

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleSubmit: (values) => {
    message.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: { name: string; path: string }[]) => {
          return data.map((item: any) => ({
            label: item.name,
            value: item.path,
          }));
        },
        api: getAllMenusApi,
      },
      fieldName: 'api',
      label: 'ApiSelect',
      rules: 'required',
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        api: getAllMenusApi,
        childrenField: 'children',
        labelField: 'name',
        valueField: 'path',
      },
      fieldName: 'apiTree',
      label: 'ApiTreeSelect',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'string',
      label: 'String',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'number',
      label: 'Number',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radio',
      label: 'Radio',
      componentProps: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radioButton',
      label: 'RadioButton',
      componentProps: {
        isButton: true,
        class: 'flex flex-wrap',
        options: [
          { value: 'A', label: '选项A' },
          { value: 'B', label: '选项B' },
          { value: 'C', label: '选项C' },
          { value: 'D', label: '选项D' },
          { value: 'E', label: '选项E' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbox',
      label: 'Checkbox',
      componentProps: {
        options: [
          { value: 'A', label: '选项A' },
          { value: 'B', label: '选项B' },
          { value: 'C', label: '选项C' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'DatePicker',
      fieldName: 'date',
      label: 'Date',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'textArea',
      label: 'TextArea',
      componentProps: {
        type: 'textarea',
        placeholder: '请输入内容',
        rows: 4,
        allowClear: true,
      },
      rules: 'required',
    },
  ],
});

function setFormValues() {
  formApi.setValues({
    string: 'string',
    number: 123,
    radio: 'B',
    radioButton: 'C',
    checkbox: ['A', 'C'],
    date: Date.now(),
  });
}
</script>

<template>
  <Page
    description="表单适配器重新包装了CheckboxGroup和RadioGroup，可以通过options属性传递选项数据（选项数据将作为子组件的属性）"
    title="表单演示"
  >
    <ACard title="基础表单">
      <template #extra>
        <AButton type="primary" @click="setFormValues">设置表单值</AButton>
      </template>
      <Form />
    </ACard>
  </Page>
</template>
