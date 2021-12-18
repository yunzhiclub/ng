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
  url: string;
}
