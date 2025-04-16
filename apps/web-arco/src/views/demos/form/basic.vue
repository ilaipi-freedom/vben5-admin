<script lang="ts" setup>
import { Page, useVbenDrawer } from '@vben/common-ui';

import { Message } from '@arco-design/web-vue';

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
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  // wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleSubmit: (values) => {
    message.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'IconPicker',
      fieldName: 'icon',
      label: 'IconPicker',
    },
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
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
      component: 'Textarea',
      fieldName: 'textArea',
      label: 'TextArea',
      componentProps: {
        type: 'textarea',
        placeholder: '请输入内容',
        'auto-size': {
          minRows: 4,
        },
        allowClear: true,
      },
      rules: 'required',
    },
  ],
});

const [Drawer, drawerApi] = useVbenDrawer();
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
    <Drawer class="w-[600px]" title="基础表单示例">
      <Form />
    </Drawer>
    <ElCard>
      <template #header>
        <div class="flex items-center">
          <span class="flex-auto">基础表单演示</span>
          <ElButton type="primary" @click="setFormValues">设置表单值</ElButton>
        </div>
      </template>
      <ElButton type="primary" @click="drawerApi.open"> 打开抽屉 </ElButton>
    </ElCard>
  </Page>
</template>
