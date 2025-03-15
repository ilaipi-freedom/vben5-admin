<script lang="ts" setup>
import type { SystemRoleApi } from '#/api/system/role';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { getPermCodeByRoleApi } from '#/api/system/account';

import MenuTree from './MenuTree.vue';
import RoleList from './RoleList.vue';

defineOptions({ name: 'PermissionManagement' });

const selectedRole = ref<SystemRoleApi.SystemRole>();
const checkedCodes = ref<string[]>([]);

const handleSelect = async (role: SystemRoleApi.SystemRole) => {
  if (selectedRole.value?.id === role.id) {
    return;
  }
  const roleCodes = await getPermCodeByRoleApi(role.id);
  checkedCodes.value = roleCodes;
  selectedRole.value = role;
};
</script>
<template>
  <Page auto-content-height content-class="flex gap-2">
    <RoleList class="w-[300px]" @select="handleSelect" />
    <MenuTree
      class="flex-1"
      :selected-role="selectedRole"
      :checked-codes="checkedCodes"
    />
  </Page>
</template>
