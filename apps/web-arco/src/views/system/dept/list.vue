<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemDeptApi } from '#/api/system/dept';

import { AccessControl } from '@vben/access';
import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, Space } from '@arco-design/web-vue';

import { message } from '#/adapter/arco';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDeptApi, getDeptTreeApi } from '#/api';
import { $t } from '#/locales';

import { useColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const toggleExpandAll = (expand = true) => {
  gridApi.grid?.setAllTreeExpand(expand);
};

/**
 * 编辑部门
 * @param row
 */
function onEdit(row: SystemDeptApi.DeptItem) {
  formModalApi.setData(row).open();
}

/**
 * 添加下级部门
 * @param row
 */
function onAppend(row: SystemDeptApi.DeptItem) {
  formModalApi.setData({ parentDeptId: row.id }).open();
}

/**
 * 创建新部门
 */
function onCreate() {
  formModalApi.setData(null).open();
}

/**
 * 删除部门
 * @param row
 */
function onDelete(row: SystemDeptApi.DeptItem) {
  const { close } = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    id: 'action_process_msg',
  });
  deleteDeptApi(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        id: 'action_process_msg',
      });
      refreshGrid();
    })
    .catch(() => {
      close();
    })
    .finally(() => {
      close();
    });
}

/**
 * 表格操作按钮的回调函数
 */
function onActionClick({
  code,
  row,
}: OnActionClickParams<SystemDeptApi.DeptItem>) {
  switch (code) {
    case 'append': {
      onAppend(row);
      break;
    }
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {},
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      isHover: true,
      height: 50,
    },
    proxyConfig: {
      ajax: {
        query: async (_params) => {
          return await getDeptTreeApi();
        },
      },
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      zoom: true,
    },
    treeConfig: {
      parentField: 'parentDeptId',
      rowField: 'id',
      transform: false,
    },
  } as VxeTableGridOptions,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid table-title="部门列表">
      <template #toolbar-tools>
        <Space>
          <AccessControl :codes="['system:dept:list:add']" type="code">
            <Button type="primary" @click="onCreate">
              <Plus class="size-5" />
              {{ $t('ui.actionTitle.create', [$t('system.dept.name')]) }}
            </Button>
          </AccessControl>
          <Button @click="toggleExpandAll(true)"> 全展 </Button>
          <Button @click="toggleExpandAll(false)"> 全收 </Button>
        </Space>
      </template>
    </Grid>
  </Page>
</template>
