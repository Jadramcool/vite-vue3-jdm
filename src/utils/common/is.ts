// 判断是否是外部链接
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}
