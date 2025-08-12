/**
 * 菜单格式
 */
export interface YzMenu {
  /**
   * 是否为绝对地址
   * <p>
   *   绝对地址在跳转时，不添加父级的url
   *   比如父菜单的url为a
   *   当前子菜单的url为b
   *   如果当前子菜单的该属性为true,则点击后跳转到 /b
   *   否则跳转到/a/b
   */
  beAbsolute?: boolean;

  /**
   * 子菜单
   */
  children?: YzMenu[];

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
  url?: string;
}
