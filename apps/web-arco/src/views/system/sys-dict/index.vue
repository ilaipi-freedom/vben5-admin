<script lang="ts" setup>
import type { SystemDictApi } from '#/api/system/sys-dict';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import SysDict from './SysDict.vue';
import SysDictData from './SysDictData.vue';

defineOptions({ name: 'SysDictManagement' });

const selectedDict = ref<SystemDictApi.SystemDict>();

const handleSelect = (dict: SystemDictApi.SystemDict) => {
  if (selectedDict.value?.id === dict.id) {
    return;
  }
  selectedDict.value = dict;
};
</script>

<template>
  <Page auto-content-height content-class="flex gap-2">
    <SysDict class="w-[400px]" @select="handleSelect" />
    <SysDictData class="flex-1" :selected-dict="selectedDict" />
  </Page>
</template>
