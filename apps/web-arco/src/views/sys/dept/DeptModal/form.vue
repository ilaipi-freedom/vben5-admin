<script lang="ts" setup>
import type { CreateDeptParams } from '#/api';

import { ref } from 'vue';

import { Spin } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { createDept, getDeptTree } from '#/api';

const emit = defineEmits(['success']);

const loading = ref(false);
const [DeptForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: true,
  layout: 'vertical',
  actionWrapperClass: 'text-center',
  schema: [
    {
      component: 'ApiTreeSelect',
      // 对应组件的参数
      componentProps: {
        // 菜单接口
        api: getDeptTree,
        // 菜单接口转options格式
        allowClear: true,
        allowSearch: true,
        fallbackOption: false,
        filterTreeNode(searchKey: string, nodeData: any) {
          if (nodeData.title) {
            return nodeData.title
              .toLowerCase()
              .includes(searchKey.toLowerCase());
          }
          return false;
        },
        fieldNames: {
          key: 'id',
          title: 'name',
          children: 'children',
        },
      },
      // 字段名
      fieldName: 'parentDeptId',
      // 界面显示的label
      label: '上级部门',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入部门名称',
      },
      fieldName: 'name',
      label: '部门名称',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      componentProps: {
        placeholder: '请输入排序号',
      },
      label: '排序号',
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      componentProps: {
        placeholder: '请输入备注',
        autoSize: { minRows: 2, maxRows: 6 },
      },
      label: '备注',
    },
  ],
  handleSubmit: async () => {
    loading.value = true;
    try {
      const values = await formApi.getValues();
      await formApi.validate();
      await createDept(values as CreateDeptParams);

      emit('success');
    } catch {
      message.error(`创建部门失败`);
    } finally {
      loading.value = false;
    }
  },
});
</script>

<template>
  <Spin :loading="loading" class="w-full" tip="提交中...">
    <DeptForm />
  </Spin>
</template>
<style>
.arco-trigger-popup {
  z-index: 2001 !important;
}
</style>
