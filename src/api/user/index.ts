import request from '@/utils/http/axios';
import { exampleModel } from '../types/hello';
import { loginModel } from '../types/user';

enum API {
  login = '/user/login',
  register = '/user/register',
  userInfo = '/user/info',
  permission = '/system/permission/list',
}

/**
 * @description: 登录
 * @param {loginModel} data
 */
export const login = (data: loginModel) => {
  return request.post<exampleModel[]>({
    url: API.login,
    data,
  });
};

/**
 * @description: 注册
 * @param {loginModel} data
 */
export const register = (data: loginModel) => {
  return request.post<exampleModel[]>({
    url: API.register,
    data,
  });
};

/**
 * @description: 获取用户信息
 */
export const getUserInfo = () => {
  return request.get<exampleModel[]>({
    url: API.userInfo,
  });
};

/**
 * @description: 获取菜单
 */
export const permissionAPI = () => {
  return request.get<exampleModel[]>({
    url: API.permission,
  });
};
