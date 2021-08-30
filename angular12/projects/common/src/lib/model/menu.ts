
/**
 * 菜单
 */
export interface Menu {
  name: string;
  url: string;
  icon: string;
  roles: { id?: number, key: string, name?: string }[];
}
