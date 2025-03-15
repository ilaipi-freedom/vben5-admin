<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemDictApi } from '#/api/system/sys-dict';

import { useVbenModal } from '@vben/common-ui';

import { Alert, Button, Popconfirm, Tooltip } from '@arco-design/web-vue';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';

import { message } from '#/adapter/arco';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteSysDictApi, getSysDictListApi } from '#/api/system/sys-dict';
import { $t } from '#/locales';

import DictModalComp from './components/DictModal.vue';
import { useSysDictListColumns, useSysDictListGridFormSchema } from './data';

defineOptions({ name: 'SysDictList' });

const emit = defineEmits(['select']);

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    collapsed: false,
    showCollapseButton: false,
    submitOnEnter: true,
    schema: useSysDictListGridFormSchema(),
    submitOnChange: true,
    showDefaultActions: false,
    wrapperClass: 'grid grid-cols-1',
  },
  gridEvents: {
    currentChange: ({ row }: { row: SystemDictApi.SystemDict }) => {
      emit('select', row);
    },
  },
  gridOptions: {
    columns: useSysDictListColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getSysDictListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    showHeader: false,
    rowClassName: 'h-[60px] cursor-pointer',
    rowConfig: {
      keyField: 'id',
      isCurrent: true,
      isHover: true,
    },
    pagerConfig: {
      pageSize: 20,
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
  } as VxeTableGridOptions<SystemDictApi.SystemDict>,
});

const [DictModal, modalApi] = useVbenModal({
  connectedComponent: DictModalComp,
});

function handleAdd() {
  modalApi.open();
}

function handleEdit(row: SystemDictApi.SystemDict) {
  modalApi.setData({ row }).open();
}

async function handleDelete(row: SystemDictApi.SystemDict) {
  await deleteSysDictApi(row.id);
  gridApi.reload();
  message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
}

function refreshGrid() {
  gridApi.reload();
}
</script>

<template>
  <div>
    <Grid :table-title="$t('system.sysDict.type.title')">
      <template #name="{ row }">
        <Alert
          :type="
            row.id === gridApi?.grid?.getCurrentRecord()?.id ? 'info' : 'normal'
          "
          :show-icon="false"
          :title="row.name"
          class="custom-alert"
        >
          {{ row.type }}
        </Alert>
      </template>
      <template #action="{ row }">
        <Tooltip
          :content="
            $t('ui.actionTitle.edit', [$t('system.sysDict.type.title')])
          "
        >
          <Button type="text" @click="handleEdit(row)" size="mini">
            <IconEdit />
          </Button>
        </Tooltip>
        <Tooltip
          :content="
            $t('ui.actionTitle.delete', [$t('system.sysDict.type.title')])
          "
          position="bottom"
        >
          <Popconfirm
            :content="`${$t('ui.actionTitle.delete', [$t('system.sysDict.type.title')])}?`"
            @ok="handleDelete(row)"
          >
            <Button type="text" status="danger" size="mini">
              <IconDelete />
            </Button>
          </Popconfirm>
        </Tooltip>
      </template>
      <template #toolbar-tools>
        <Tooltip
          :content="
            $t('ui.actionTitle.create', [$t('system.sysDict.type.title')])
          "
        >
          <Button type="primary" @click="handleAdd">
            <template #icon>
              <IconPlus />
            </template>
          </Button>
        </Tooltip>
      </template>
    </Grid>

    <DictModal @success="refreshGrid" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.custom-alert) {
  @apply p-0 px-[5px];

  .arco-alert-title {
    @apply mb-[-6px];
  }
}
</style>
