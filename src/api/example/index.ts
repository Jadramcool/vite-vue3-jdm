import request from '@/utils/http/axios';
import { exampleModel } from '../types/hello';

enum API {
  example = '/dailyEnglish',
  hupu = 'hotlist/huPu',
  mockUserInfo = '/mock/user/info',
  mockLogin = '/mock/user/login',
  mockPermission = '/mock/permission/menu',
  mockPermission1 = '/mock/permission/menu1',
}

export const exampleAPI = () => {
  return request.get<exampleModel[]>({
    url: API.example,
    params: {
      type: 'sj',
    },
  });
};

export const exampleHupuAPI = () => {
  return request.get<exampleModel[]>({
    url: API.hupu,
  });
};

export const mockGetUserInfoAPI = () => {
  return request.get<exampleModel[]>({
    url: API.mockUserInfo,
  });
};

export const mockPostAPI = (data: any) => {
  return request.post<exampleModel[]>({
    url: API.mockLogin,
    data,
  });
};

export const mockPermissionAPI = () => {
  return request.get<exampleModel[]>({
    url: API.mockPermission,
  });
};

export const mockPermission1API = () => {
  return request.get<exampleModel[]>({
    url: API.mockPermission1,
  });
};
