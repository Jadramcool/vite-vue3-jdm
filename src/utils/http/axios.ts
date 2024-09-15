import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { CodeConfig as HttpCodeConfig } from './codeConfig.ts';
import { ResponseModel, UploadFileItemModel, UploadRequestConfig } from './types/index.ts';
import { getToken } from '../token/index';

class HttpRequest {
  service: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_MOCK === 'true' ? '' : import.meta.env.VITE_APP_BASE_URL;
    this.service = axios.create({
      baseURL,
      timeout: 10 * 1000,
    });

    // 请求拦截器
    this.service.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (import.meta.env.VITE_APP_TOKEN_KEY && getToken()) {
          config.headers.authorization = `Bearer ${getToken()}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error('requestError: ', error);
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse<ResponseModel>): AxiosResponse['data'] => {
        const { data } = response;
        const { code } = data;
        if (code && code !== HttpCodeConfig.success) {
          switch (code) {
            case HttpCodeConfig.notFound:
              // 处理未找到的情况
              break;
            case HttpCodeConfig.noPermission:
              // 处理无权限的情况
              break;
            default:
              break;
          }
          // console.log(code, data);
          return Promise.reject(data.errMsg);
        }
        // console.log(data);
        return data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  // 执行请求
  private async executeRequest<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    try {
      const response = await this.service.request<ResponseModel<T>>(config);
      return response.data || response;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // 发起请求
  public async request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.executeRequest(config);
  }

  // 发起 get 请求
  public async get<T = any>({ ...config }: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.executeRequest({ method: 'GET', ...config });
  }

  // 发起 post 请求
  public async post<T = any>({ ...config }: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.executeRequest({ method: 'POST', ...config });
  }

  // 发起 put 请求
  public async put<T = any>({ ...config }: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.executeRequest({ method: 'PUT', ...config });
  }

  // 发起 delete 请求
  public async delete<T = any>({ ...config }: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.executeRequest({ method: 'DELETE', ...config });
  }

  // 上传文件
  public async upload<T = string>(
    fileItem: UploadFileItemModel,
    config?: UploadRequestConfig,
  ): Promise<ResponseModel<T> | null> {
    if (!import.meta.env.VITE_UPLOAD_URL) return null;

    const fd = new FormData();
    fd.append(fileItem.name, fileItem.value);

    const configCopy: UploadRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    };

    return this.executeRequest({
      url: import.meta.env.VITE_UPLOAD_URL,
      data: fd,
      ...configCopy,
    });
  }
}

const httpRequest = new HttpRequest();
export default httpRequest;
