/**
 * 菜单格式
 */
export interface Menu {
  /**
   * 是否是抽象的
   * <p>
   *   抽象的菜单的在点击后只展开子菜单，不跳转路由
   *   <br>
   *   非抽象的菜单点击后在展开子菜单的同时，进行路由的跳转
   */
  beAbstract?: boolean;
  /**
   * 子菜单
   */
  children?: Menu[];

  /**
   * 角色
   */
  roles: string[];

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
