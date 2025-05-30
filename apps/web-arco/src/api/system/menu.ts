import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemMenuApi {
  /** 徽标颜色集合 */
  export const BadgeVariants = [
    'default',
    'destructive',
    'primary',
    'success',
    'warning',
  ] as const;
  /** 徽标类型集合 */
  export const BadgeTypes = ['dot', 'normal'] as const;
  /** 菜单类型集合 */
  export const MenuTypes = [
    'catalog',
    'menu',
    'embedded',
    'link',
    'button',
  ] as const;
  /** 系统菜单 */
  export interface SystemMenu {
    [key: string]: any;
    /** 后端权限标识 */
    authCode: string;
    /** 子级 */
    children?: SystemMenu[];
    /** 组件 */
    component?: string;
    /** 菜单ID */
    id: string;
    /** 菜单元数据 */
    meta?: {
      /** 激活时显示的图标 */
      activeIcon?: string;
      /** 作为路由时，需要激活的菜单的Path */
      activePath?: string;
      /** 固定在标签栏 */
      affixTab?: boolean;
      /** 在标签栏固定的顺序 */
      affixTabOrder?: number;
      /** 徽标内容(当徽标类型为normal时有效) */
      badge?: string;
      /** 徽标类型 */
      badgeType?: (typeof BadgeTypes)[number];
      /** 徽标颜色 */
      badgeVariants?: (typeof BadgeVariants)[number];
      /** 在菜单中隐藏下级 */
      hideChildrenInMenu?: boolean;
      /** 在面包屑中隐藏 */
      hideInBreadcrumb?: boolean;
      /** 在菜单中隐藏 */
      hideInMenu?: boolean;
      /** 在标签栏中隐藏 */
      hideInTab?: boolean;
      /** 菜单图标 */
      icon?: string;
      /** 内嵌Iframe的URL */
      iframeSrc?: string;
      /** 是否缓存页面 */
      keepAlive?: boolean;
      /** 外链页面的URL */
      link?: string;
      /** 同一个路由最大打开的标签数 */
      maxNumOfOpenTab?: number;
      /** 无需基础布局 */
      noBasicLayout?: boolean;
      /** 是否在新窗口打开 */
      openInNewWindow?: boolean;
      /** 额外的路由参数 */
      query?: Recordable<any>;
      /** 菜单标题 */
      title?: string;
    };
    /** 菜单名称 */
    name: string;
    /** 路由路径 */
    path: string;
    /** 父级ID */
    pid: string;
    /** 重定向 */
    redirect?: string;
    /** 菜单类型 */
    type: (typeof MenuTypes)[number];
    /** 菜单排序 */
    parentMenuId?: number;
  }
}

/**
 * 获取菜单数据列表
 */
async function getMenuTreeApi() {
  return requestClient.get<Array<SystemMenuApi.SystemMenu>>('/sys-menu/tree');
}

/**
 * 获取菜单数据列表
 */
async function getUserMenuTreeApi() {
  return requestClient.get<Array<SystemMenuApi.SystemMenu>>(
    '/sys-menu/user-tree',
  );
}

async function isMenuNameExistsApi(
  name: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/sys-menu/name-exists', {
    params: { id, name },
  });
}

async function isMenuPathExistsApi(
  path: string,
  id?: SystemMenuApi.SystemMenu['id'],
) {
  return requestClient.get<boolean>('/sys-menu/path-exists', {
    params: { id, path },
  });
}

/**
 * 保存菜单
 * @param data 菜单数据
 * @param id 菜单ID，存在则为更新，不存在则为创建
 */
async function saveMenuApi(
  data: Omit<SystemMenuApi.SystemMenu, 'children' | 'id'>,
  id?: string,
) {
  return id
    ? requestClient.put(`/sys-menu/${id}`, data)
    : requestClient.post('/sys-menu', data);
}

/**
 * 删除菜单
 * @param id 菜单 ID
 */
async function deleteMenuApi(id: string) {
  return requestClient.delete(`/sys-menu/${id}`);
}

export {
  deleteMenuApi,
  getMenuTreeApi,
  getUserMenuTreeApi,
  isMenuNameExistsApi,
  isMenuPathExistsApi,
  saveMenuApi,
};
