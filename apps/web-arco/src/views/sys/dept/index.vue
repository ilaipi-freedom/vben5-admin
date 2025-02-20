<script lang="ts" setup name="DeptManagement">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Popconfirm, Space, Switch } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDeptApi, getDeptList, updateDeptApi } from '#/api';
import { AvailableStatusEnum } from '#/constants';

import DeptModalComp from './DeptModal/index.vue';
import { deptSearchFormSchema } from './schema';

interface DeptRow {
  id: string;
  name: string;
  sort: number;
  createdAt: string;
  status: number;
  remark: string;
  parentDeptId: string;
}

const updatingDeptStatus = ref(false);

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: deptSearchFormSchema(),
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: true,
};

// 表格配置
const gridOptions: VxeGridProps<DeptRow> = {
  columns: [
    { type: 'seq', width: 100, title: '序号' },
    {
      field: 'name',
      title: '部门名称',
      minWidth: 300,
      treeNode: true, // 树节点列
      align: 'left',
    },
    { field: 'sort', title: '排序', width: 100 },
    {
      field: 'status',
      title: '状态',
      width: 100,
      slots: { default: 'status' },
    },
    { field: 'createdAt', title: '创建时间', width: 180 },
    { field: 'remark', title: '备注', minWidth: 150 },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'action' },
    },
  ],
  rowConfig: {
    isHover: true,
  },
  treeConfig: {
    transform: true,
    parentField: 'parentDeptId',
    rowField: 'id',
    expandAll: true,
  },
  proxyConfig: {
    ajax: {
      query: async (_, formValues: any) => {
        const items = await getDeptList(formValues);
        return {
          items,
        };
      },
    },
  },
  pagerConfig: {
    enabled: false,
  },
  toolbarConfig: {
    custom: true,
    export: false,
    refresh: true,
    resizable: true,
    zoom: true,
  },
};

// 创建表格
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  formOptions,
});

// 创建新增部门弹窗
const [DeptModal, modalApi] = useVbenModal({
  connectedComponent: DeptModalComp,
  onConfirm: async () => {
    gridApi.reload();
  },
});

// 展开/收起
const toggleExpandAll = (expand = true) => {
  gridApi.grid?.setAllTreeExpand(expand);
};

// 新增部门
const handleAdd = (row?: DeptRow) => {
  modalApi
    .setState({
      title: '新增部门',
    })
    .setData({ parentDeptId: row?.id })
    .open();
};

// 编辑部门
const handleEdit = (row: DeptRow) => {
  modalApi
    .setState({
      title: '编辑部门',
    })
    .setData(row)
    .open();
};

// 删除部门
const handleDelete = async (row: DeptRow) => {
  await deleteDeptApi(row.id);
  gridApi.reload();
};
</script>

<template>
  <Page auto-content-height>
    <!-- 新增部门弹窗 -->
    <DeptModal @success="gridApi.reload" />

    <Grid class="xxx h-full">
      <template #status="{ row }">
        <Switch
          :loading="updatingDeptStatus"
          :checked-value="AvailableStatusEnum.Normal"
          :unchecked-value="AvailableStatusEnum.Forbidden"
          v-model="row.status"
          @change="
            (value) =>
              updateDeptApi(row.id, { status: value as AvailableStatusEnum })
          "
        />
      </template>
      <!-- 操作列 -->
      <template #action="{ row }">
        <Button type="text" size="small" @click="handleEdit(row)">
          编辑
        </Button>
        <Popconfirm content="确定删除该部门吗？" @ok="handleDelete(row)">
          <Button type="text" size="small" status="danger"> 删除 </Button>
        </Popconfirm>
        <Button type="text" size="small" @click="() => handleAdd(row)">
          新增
        </Button>
      </template>

      <template #toolbar-tools>
        <Space>
          <Button type="primary" @click="() => handleAdd()">
            <template #icon>
              <IconPlus />
            </template>
            新增
          </Button>
          <Button type="primary" @click="toggleExpandAll(true)"> 全展 </Button>
          <Button type="primary" @click="toggleExpandAll(false)"> 全收 </Button>
        </Space>
      </template>
    </Grid>
  </Page>
</template>
