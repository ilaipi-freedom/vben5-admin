import { getDeptTree } from '#/api';
import { AvailableStatusEnum } from '#/constants';

export const deptFormSchema = () => [
  {
    component: 'ApiTreeSelect',
    // 对应组件的参数
    componentProps: {
      // 菜单接口
      api: getDeptTree,
      // 菜单接口转options格式
      allowClear: true,
      allowSearch: true,
      fallbackOption: false,
      filterTreeNode(searchKey: string, nodeData: any) {
        if (nodeData.title) {
          return nodeData.title.toLowerCase().includes(searchKey.toLowerCase());
        }
        return false;
      },
      fieldNames: {
        key: 'id',
        title: 'name',
        children: 'children',
      },
    },
    // 字段名
    fieldName: 'parentDeptId',
    // 界面显示的label
    label: '上级部门',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
    },
    fieldName: 'name',
    label: '部门名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    componentProps: {
      placeholder: '请输入排序号',
      mode: 'button',
    },
    label: '排序号',
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    componentProps: {
      placeholder: '请输入备注',
      autoSize: { minRows: 2, maxRows: 6 },
    },
    label: '备注',
  },
  {
    component: 'Switch',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      class: 'w-auto',
      checkedValue: AvailableStatusEnum.Normal,
      uncheckedValue: AvailableStatusEnum.Forbidden,
      defaultChecked: true,
    },
  },
];
