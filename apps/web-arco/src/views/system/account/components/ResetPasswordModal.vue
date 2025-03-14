<script lang="ts" setup>
import type { SystemAccountApi } from '#/api/system/account';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Spin } from '@arco-design/web-vue';

import { useVbenForm, z } from '#/adapter/form';
import { resetPasswordApi } from '#/api/system/account';

const emit = defineEmits(['success']);

const loading = ref(false);

// 定义表单schema
const formSchema = [
  {
    label: '新密码',
    component: 'InputPassword',
    required: true,
    fieldName: 'password',
    rules: z.string().min(6, '密码长度不能小于6位'),
  },
];

// 使用表单
const [ResetPasswordForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  actionWrapperClass: 'text-center',
  schema: formSchema,
});

// 使用弹窗
const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    loading.value = true;
    try {
      const validated = await formApi.validate();
      if (!validated.valid) {
        return;
      }
      const values = await formApi.getValues();
      await resetPasswordApi(
        modalApi.getData()?.id,
        values as SystemAccountApi.ChangePasswordParams,
      );
      modalApi.close();
      emit('success');
      await formApi.resetForm();
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      loading.value = false;
    }
  },
  onOpened: () => {
    formApi.resetForm();
  },
});
</script>

<template>
  <Modal>
    <Spin :loading="loading" class="w-full" tip="提交中...">
      <ResetPasswordForm />
    </Spin>
  </Modal>
</template>
