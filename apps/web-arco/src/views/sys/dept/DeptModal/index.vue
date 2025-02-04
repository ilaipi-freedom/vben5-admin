<script lang="ts" setup>
import type { CreateDeptParams, UpdateDeptParams } from '#/api';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Spin } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { saveDeptApi } from '#/api';

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
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    loading.value = true;
    try {
      await formApi.validate();
      const data = modalApi.getData();
      const values = await formApi.getValues();
      await saveDeptApi(
        values as CreateDeptParams | UpdateDeptParams,
        data?.id,
      );
      await formApi.resetForm();
      modalApi.close();
      emit('success');
    } catch {
      message.error(`提交失败`);
    } finally {
      loading.value = false;
    }
  },
  onOpened: () => {
    const data = modalApi.getData() || {};
    formApi.updateSchema([
      {
        fieldName: 'parentDeptId',
        componentProps: {
          disabled: !!data?.id,
        },
      },
    ]);
    const { name, remark, sort, status, parentDeptId } = data;
    formApi.setValues({
      name,
      remark,
      sort,
      status,
      parentDeptId,
    });
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
