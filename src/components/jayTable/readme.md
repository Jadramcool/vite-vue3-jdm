# JayTable 表格组件

## 介绍

JayTable 是基于 Vue3 和 Naive UI 的表格组件，提供了丰富的功能和配置项，可以满足一般的表格需求。

## 配置参数

| 参数名     | 类型             | 默认值 | 必填 | 说明     | 示例值                                            |
| ---------- | ---------------- | ------ | ---- | -------- | ------------------------------------------------- |
| request    | Promise Function | null   | 是   | 表格数据 | -                                                 |
| columns    | Array            | []     | 是   | 表格列   | -                                                 |
| pagination | Object / Boolean | {}     | 否   | 分页配置 | { pageSize: 10, pageSizes: [10, 20, 30, 40, 50] } |
