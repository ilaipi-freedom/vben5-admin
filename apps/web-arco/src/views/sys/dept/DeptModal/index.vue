<script lang="ts" setup>
import type { CreateDeptParams } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Spin } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { createDept } from '#/api';

import { deptFormSchema } from '../schema';

const emit = defineEmits(['success']);

const loading = ref(false);
const [DeptForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  actionWrapperClass: 'text-center',
  schema: deptFormSchema(),
  handleSubmit: async () => {
    loading.value = true;
    try {
      const values = await formApi.getValues();
      await createDept(values as CreateDeptParams);
    } catch {
      message.error(`创建部门失败`);
    } finally {
      loading.value = false;
    }
  },
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    await formApi.validate();
    await formApi.submitForm();
    modalApi.close();
    emit('success');
  },
});
</script>

<template>
  <Modal>
    <Spin :loading="loading" class="w-full" tip="提交中...">
      <DeptForm />
    </Spin>
  </Modal>
</template>
<style>
.arco-trigger-popup {
  z-index: 2001 !important;
}
</style>
