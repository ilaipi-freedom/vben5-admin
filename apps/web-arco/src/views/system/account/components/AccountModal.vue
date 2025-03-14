<script lang="ts" setup>
import type { SystemAccountApi } from '#/api/system/account';

import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Spin } from '@arco-design/web-vue';

import { useVbenForm } from '#/adapter/form';
import { saveAccountApi } from '#/api/system/account';

import { accountFormSchema } from '../schema';

// 监听 props 变化来更新选项
const props = defineProps<{
  roleList?: { id: string; name: string; perm: string }[];
}>();

const emit = defineEmits(['success']);

const empty = {
  username: '',
  name: '',
  phone: '',
  roleId: undefined,
  fee: undefined,
  password: '',
};

const loading = ref(false);
const [AccountForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  actionWrapperClass: 'text-center',
  schema: accountFormSchema(),
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    loading.value = true;
    try {
      await formApi.validate();
      const data = modalApi.getData();
      const values = await formApi.getValues();
      await saveAccountApi(values as SystemAccountApi.SystemAccount, data?.id);

      modalApi.close();
      emit('success');
      await formApi.resetForm();
    } finally {
      loading.value = false;
    }
  },
  onOpened: () => {
    const data = modalApi.getData() || {};
    if (data.id) {
      formApi.updateSchema([
        {
          fieldName: 'password',
          dependencies: {
            if: false,
            triggerFields: [''],
          },
        },
      ]);
      // 编辑模式
      formApi.resetForm();
      formApi.setValues({
        username: data.username || '',
        name: data.name || '',
        phone: data.phone || '',
        roleId: data.roleId,
        fee: data.fee,
      });
    } else {
      formApi.updateSchema([
        {
          fieldName: 'password',
          dependencies: {
            if: true,
            triggerFields: [''],
          },
        },
      ]);
      formApi.setValues({ ...empty });
    }
  },
});

// 监听 props 变化来更新表单选项
watch(
  () => [props.roleList],
  ([newRoleList]) => {
    // 更新角色选项
    if (newRoleList) {
      formApi.updateSchema([
        {
          fieldName: 'roleId',
          componentProps: {
            options: newRoleList.map((role) => ({
              ...role,
              disabled: role.perm === 'admin',
            })),
          },
        },
      ]);
    }
  },
  { immediate: true },
);
</script>

<template>
  <Modal>
    <Spin :loading="loading" class="w-full" tip="提交中...">
      <AccountForm />
    </Spin>
  </Modal>
</template>
