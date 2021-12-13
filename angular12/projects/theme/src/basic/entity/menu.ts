/**
 * 菜单格式
 */
export interface Menu {
  /**
   * 是否是抽象的（抽象的菜单的点击后只展开子页，不跳转路由）
   */
  beAbstract?: boolean;
  /**
   * 子菜单
   */
  children?: Menu[];
  /**
   * 描述信息
   */
  description?: string;
  /**
   * 图标的样式
   */
  icon: string;
  /**
   * 显示的名称
   */
  name: string;
  /**
   * 跳转的URL地址
   */
  url: string;
}
