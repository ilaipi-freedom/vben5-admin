<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import DeptForm from './form.vue';

const emit = defineEmits(['success']);

const [Modal, modalApi] = useVbenModal({
  footer: false,
});

const handleSuccess = () => {
  modalApi.close();
  emit('success');
};
</script>

<template>
  <Modal>
    <DeptForm @success="handleSuccess" />
  </Modal>
</template>
