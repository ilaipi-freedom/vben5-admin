<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api/system/role';

import { Tag } from '@arco-design/web-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getRoleListApi } from '#/api/system/role';

import { useRoleListColumns, useRoleListGridFormSchema } from './data';

defineOptions({ name: 'RoleTree' });

const emit = defineEmits(['select']);

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    collapsed: false,
    showCollapseButton: false,
    submitOnEnter: true,
    schema: useRoleListGridFormSchema(),
    submitOnChange: true,
    showDefaultActions: false,
    wrapperClass: 'grid grid-cols-1',
  },
  gridOptions: {
    columns: useRoleListColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getRoleListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    showHeader: false,
    rowConfig: {
      keyField: 'id',
    },
    pagerConfig: {
      pageSize: 30,
      layouts: ['PrevPage', 'Number', 'NextPage'],
    },
    toolbarConfig: {
      custom: false,
      export: false,
      refresh: { code: 'query' },
      search: false,
      zoom: false,
    },
  } as VxeTableGridOptions<SystemRoleApi.SystemRole>,
});

function handleSelect(role: SystemRoleApi.SystemRole) {
  const roles = gridApi.grid.getFullData();
  roles.forEach((r) => {
    r.selected = false;
  });
  role.selected = true;
  emit('select', role);
}
</script>
<template>
  <Grid :table-title="$t('system.role.list')">
    <template #name="{ row }">
      <Tag
        checkable
        color="arcoblue"
        :checked="row.selected"
        :default-checked="false"
        @check="() => handleSelect(row)"
      >
        <div>{{ row.name }}({{ row.perm }})</div>
      </Tag>
    </template>
  </Grid>
</template>
