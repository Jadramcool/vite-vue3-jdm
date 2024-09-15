const { toString } = Object.prototype;

/**
 * @description: 判断值是否为某个类型
 */
export function is(val: any, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description: 是否为函数
 */
export function isFunction(val: any): boolean {
  return is(val, 'Function') || is(val, 'AsyncFunction');
}

/**
 * @description: 是否已定义
 */
export const isDef = (val: any): boolean => {
  return typeof val !== 'undefined';
};

export const isUnDef = (val: any): boolean => {
  return !isDef(val);
};

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): boolean => {
  return val !== null && is(val, 'Object');
};

/**
 * @description: 是否为时间
 */
export function isDate(val: any): boolean {
  return is(val, 'Date');
}

/**
 * @description: 是否为数值
 */
export function isNumber(val: any): boolean {
  return is(val, 'Number');
}

/**
 * @description: 是否为AsyncFunction
 */
export function isAsyncFunction(val: any): boolean {
  return is(val, 'AsyncFunction');
}

/**
 * @description: 是否为promise
 */
export function isPromise(val: any): boolean {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description: 是否为字符串
 */
export function isString(val: any): boolean {
  return is(val, 'String');
}

/**
 * @description: 是否为boolean类型
 */
export function isBoolean(val: any): boolean {
  return is(val, 'Boolean');
}

/**
 * @description: 是否为数组
 */
export function isArray(val: any): boolean {
  return val && Array.isArray(val);
}

/**
 * @description: 是否客户端
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): boolean => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: any): boolean => {
  return isObject(val) && !!val && typeof val === 'object' && 'tagName' in val;
};

export const isServer = typeof window === 'undefined';

// 是否为图片节点
export function isImageDom(o: any): boolean {
  if (isObject(o) && 'tagName' in o) {
    const tagName = (o as Element).tagName.toUpperCase();
    return tagName === 'IMAGE' || tagName === 'IMG';
  }
  return false;
}

export function isNull(val: any): boolean {
  return val === null;
}

export function isNullAndUnDef(val: any): boolean {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: any): boolean {
  return isUnDef(val) || isNull(val);
}
/**
 * 判断是否 url
 * */
export function isUrl(url: string): boolean {
  return /^(http|https):\/\//g.test(url);
}

// 判断是否是外部链接
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function isProdMode() {
  return process.env.NODE_ENV === 'production';
}
