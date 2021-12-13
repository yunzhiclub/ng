/**
 * 菜单格式
 */
export class Menu {
  /**
   * 子菜单
   */
  children?: Menu[] = [];
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
