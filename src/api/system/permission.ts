import request from '@/utils/http/axios';
import { exampleModel } from '../types/hello';

enum API {
  permission = '/system/permission/menu',
}

/**
 * @description: 获取菜单
 */
export const permissionList = () => {
  return request.get<exampleModel[]>({
    url: API.permission,
  });
};
