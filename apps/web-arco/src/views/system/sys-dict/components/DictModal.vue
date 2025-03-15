<script lang="ts" setup>
import type { SystemDictApi } from '#/api/system/sys-dict';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Spin } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { saveSysDictApi } from '#/api/system/sys-dict';
import { $t } from '#/locales';
import { AvailableStatusEnum } from '#/typings/common';

const emit = defineEmits(['success']);

const loading = ref(false);
const formData = ref<SystemDictApi.SystemDict>();

const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.sysDict.type.title')])
    : $t('ui.actionTitle.create', [$t('system.sysDict.type.title')]);
});

const formSchema = [
  {
    label: '字典名称',
    component: 'Input',
    required: true,
    fieldName: 'name',
    componentProps: {
      placeholder: '请输入字典名称',
    },
    rules: 'required',
  },
  {
    label: '字典类型',
    component: 'Input',
    required: true,
    fieldName: 'type',
    componentProps: {
      placeholder: '请输入字典类型',
    },
    rules: 'required',
  },
  {
    label: '状态',
    component: 'RadioGroup',
    fieldName: 'status',
    defaultValue: AvailableStatusEnum.Normal,
    componentProps: {
      options: [
        { label: '启用', value: AvailableStatusEnum.Normal },
        { label: '禁用', value: AvailableStatusEnum.Forbidden },
      ],
    },
  },
  {
    label: '备注',
    component: 'Textarea',
    fieldName: 'remark',
    componentProps: {
      placeholder: '请输入备注',
      autoSize: { minRows: 2, maxRows: 5 },
    },
  },
];

const [DictForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: formSchema,
  showDefaultActions: false,
});

function resetForm() {
  formApi.resetForm();
  formApi.setValues(formData.value || {});
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    loading.value = true;
    try {
      const { valid } = await formApi.validate();
      if (!valid) return;
      modalApi.lock();
      const values = await formApi.getValues();
      await saveSysDictApi(
        values as SystemDictApi.SystemDict,
        formData.value?.id,
      );
      modalApi.close();
      emit('success');
      formApi.resetForm();
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      loading.value = false;
      modalApi.lock(false);
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<{ row: SystemDictApi.SystemDict }>();
      if (data) {
        formData.value = data.row;
        formApi.setValues(formData.value);
      } else {
        formData.value = undefined;
        formApi.resetForm();
      }
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Spin :loading="loading" class="w-full" tip="提交中...">
      <DictForm class="mx-4" />
    </Spin>
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm">
          {{ $t('common.reset') }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.arco-form {
  padding: 16px 8px 0;
}
</style>
