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
  gridEvents: {
    currentChange: ({ row }: { row: SystemRoleApi.SystemRole }) => {
      emit('select', row);
    },
  },
  gridOptions: {
    columns: useRoleListColumns(),
    height: 'auto',
    keepSource: true,
    rowClassName: 'cursor-pointer',
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
      isCurrent: true,
    },
    pagerConfig: {
      pageSize: 30,
      layouts: ['PrevPage', 'Number', 'NextPage'],
      autoHidden: true,
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
</script>
<template>
  <Grid :table-title="$t('system.role.list')">
    <template #name="{ row }">
      <Tag
        :color="
          row.id === gridApi?.grid?.getCurrentRecord()?.id ? 'arcoblue' : 'gray'
        "
        :checked="row.id === gridApi?.grid?.getCurrentRecord()?.id"
      >
        <div>{{ row.name }}({{ row.perm }})</div>
      </Tag>
    </template>
  </Grid>
</template>
