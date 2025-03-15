<script lang="ts" setup>
import type { SystemDictDataApi } from '#/api/system/sys-dict/data';

import { computed, h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Spin } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenForm } from '#/adapter/form';
import { saveSysDictDataApi } from '#/api/system/sys-dict/data';
import { $t } from '#/locales';
import { AvailableStatusEnum } from '#/typings/common';

const emit = defineEmits(['success']);

const loading = ref(false);
const formData = ref<SystemDictDataApi.SystemDictData>();

const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.sysDict.data.title')])
    : $t('ui.actionTitle.create', [$t('system.sysDict.data.title')]);
});

const formSchema = [
  {
    label: $t('system.sysDict.data.label'),
    component: 'Input',
    required: true,
    fieldName: 'label',
    rules: 'required',
  },
  {
    label: $t('system.sysDict.data.key'),
    component: 'Input',
    required: true,
    fieldName: 'key',
    rules: 'required',
  },
  {
    label: $t('system.sysDict.data.value'),
    component: 'Textarea',
    required: true,
    fieldName: 'value',
    rules: 'required',
    componentProps: {
      autoSize: { minRows: 1, maxRows: 5 },
    },
  },
  {
    label: $t('system.sysDict.data.sort'),
    component: 'InputNumber',
    fieldName: 'sort',
    help: () => {
      return h('div', { class: 'text-sm text-gray-500' }, [
        h('p', '数值越小越靠前'),
        h('p', '建议使用10/20/30，方便向中间插入'),
      ]);
    },
  },
  {
    label: $t('system.dept.status'),
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
    label: $t('system.sysDict.data.remark'),
    component: 'Textarea',
    fieldName: 'remark',
    componentProps: {
      autoSize: { minRows: 2, maxRows: 5 },
    },
  },
  {
    label: $t('system.sysDict.data.extra'),
    component: 'Textarea',
    fieldName: 'extra',
    help: () => {
      return h('div', { class: 'text-sm text-gray-500' }, [
        h('p', 'JSON格式'),
        h('p', '用于存储其他信息，非必要不填写'),
      ]);
    },
    componentProps: {
      autoSize: { minRows: 2, maxRows: 5 },
    },
  },
];

const [DictDataForm, formApi] = useVbenForm({
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
      const values: SystemDictDataApi.SystemDictData =
        await formApi.getValues();
      values.type = modalApi.getData()?.sysDict?.type || formData.value?.type;
      await saveSysDictDataApi(values, formData.value?.id);
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
      const data = modalApi.getData<{
        row: SystemDictDataApi.SystemDictData;
        type: string;
      }>();
      if (data) {
        formData.value = data.row;
        formApi.setValues({
          ...formData.value,
          type: data.type,
        });
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
      <DictDataForm class="mx-4" />
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
