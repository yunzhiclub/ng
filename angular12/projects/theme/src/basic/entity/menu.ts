/**
 * 菜单格式
 */
export class Menu {
  name: string;
  url: string;
  icon: string;

  /**
   * 子菜单
   */
  children?: Menu[] = [];
}
