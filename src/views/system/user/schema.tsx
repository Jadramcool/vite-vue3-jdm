import { RoleApi } from '@/api';
import { JayIcon } from '@/components';
import { roleTypeOptions, sexOptions, statusOptions } from '@/constants';
import { $t } from '@/locales/i18n';
import { columnsUtil, editFormSchemaUtil, formSchemaUtil, isPhone } from '@/utils';
import dayjs from 'dayjs';
import { FormItemRule, NButton, NFlex, NPopconfirm, NSpace, NTag } from 'naive-ui';
import { RowData } from 'naive-ui/es/data-table/src/interface';
import { computed, unref } from 'vue';

// 表格和表单配置函数
export const useUserSchema = (methods: any = {}) => {
  const schema = computed(() => ({
    properties: [
      {
        table: {
          type: 'selection',
          options: ['all', 'none'],
          disabled: (row: any) => row.username === 'admin',
        },
      },
      {
        table: {
          type: 'expand',
          renderExpand: (rowData: any) => `${rowData.username} is a good guy.`,
        },
      },
      {
        key: 'id',
        label: $t('common.id'),
        defaultValue: undefined,
        form: {
          component: 'NInputNumber',
          labelMessage: 'ID是用户的唯一标识',
          componentProps: {
            showButton: false,
            min: 1,
            step: 1,
            precision: 0,
          },
        },
        editForm: {
          componentProps: {
            showButton: false,
            disabled: true,
          },
        },
      },
      {
        key: 'username',
        label: $t('common.username'),
        defaultValue: undefined,
        form: {
          component: 'NInput',
          labelMessage: $t('modules.system.user.schema.usernameTip'),
          query: 'in',
          componentProps: {
            placeholder: $t('modules.system.user.schema.pleaseInputUsername'),
          },
        },
        editForm: {
          rules: [
            {
              type: 'string',
              required: true,
              trigger: ['blur', 'input'],
              validator: (_rule: FormItemRule, value: string) => {
                if (!value) {
                  return new Error($t('modules.system.user.schema.pleaseInputUsername'));
                }
                if (value.length < 2) {
                  return new Error($t('modules.system.user.schema.usernameLengthMinError'));
                }
                if (value.length > 16) {
                  return new Error($t('modules.system.user.schema.usernameLengthMaxError'));
                }
                return true;
              },
            },
          ],
          componentProps: {
            disabled: true,
            maxlength: 16,
            showCount: true,
          },
        },
      },
      {
        key: 'name',
        label: $t('user.name'),
        defaultValue: undefined,
        table: {
          render: (row: any) => row.name || '-',
        },
      },
      {
        key: 'phone',
        label: $t('user.phone'),
        defaultValue: undefined,
        form: {
          component: 'NInput',
          componentProps: {
            placeholder: $t('modules.system.user.schema.pleaseInputPhone'),
            showButton: false,
          },
        },
        editForm: {
          rules: [
            {
              type: 'string',
              required: true,
              trigger: ['blur', 'input'],
              validator: (_rule: FormItemRule, value: string) => {
                if (!value) {
                  return new Error($t('modules.system.user.schema.pleaseInputPhone'));
                }
                if (isPhone(value)) {
                  return true;
                }
                return new Error($t('modules.system.user.schema.pleaseInputCorrectPhone'));
              },
            },
          ],
        },
        table: {
          render: (row: any) => row.phone || '-',
        },
      },
      {
        key: 'role',
        label: $t('user.role'),
        defaultValue: undefined,
        form: {
          component: 'ApiSelect',
          componentProps: {
            api: RoleApi.getAllRoleList,
            multiple: false,
            placeholder: `${$t('common.pleaseSelect')} ${$t('user.role')}`,
            labelField: 'name',
            valueField: 'id',
          },
        },
        editForm: {
          componentProps: {
            api: RoleApi.getAllRoleList,
            multiple: true,
            placeholder: `${$t('common.pleaseSelect')} ${$t('user.role')}`,
            labelField: 'name',
            valueField: 'id',
            onUpdateValue: (value: any) => {
              console.log(value);
            },
          },
        },
        table: {
          render: (row: RowData) => {
            const roles = row.roles.map((role: System.Role) => role.name);
            return (
              <NFlex>
                {roles.map((role: string, index: number) => (
                  <NTag
                    key={index}
                    bordered={false}
                    type="warning"
                    size="small"
                    v-slots={{
                      icon: () => {
                        return <JayIcon icon={'carbon:user-role'} />;
                      },
                    }}
                  >
                    {role}
                  </NTag>
                ))}
              </NFlex>
            );
          },
        },
      },
      {
        key: 'roleType',
        label: $t('user.roleTypeName'),
        defaultValue: undefined,
        form: {
          component: 'NSelect',
          componentProps: {
            placeholder: `${$t('common.pleaseSelect')} ${$t('user.roleTypeName')}`,
            options: unref(roleTypeOptions),
          },
        },
        editForm: {
          component: 'NSelect',
          componentProps: {
            options: unref(roleTypeOptions),
            disabled: true,
          },
        },
        table: {
          render: (row: RowData) => {
            const roleType = unref(roleTypeOptions).find(
              (item) => item.value === row.roleType,
            )?.label;
            const color = row.roleType === 'admin' ? 'primary' : 'info';
            return (
              <NTag bordered={false} type={color} size="small">
                {roleType}
              </NTag>
            );
          },
        },
      },
      {
        key: 'sex',
        label: $t('user.sex'),
        defaultValue: undefined,
        form: {
          component: 'NSelect',
          componentProps: {
            placeholder: `${$t('common.pleaseSelect')} ${$t('user.sex')}`,
            options: unref(sexOptions),
          },
        },
        table: {
          render: (row: any) => unref(sexOptions).find((item) => item.value === row.sex)?.label,
        },
      },
      {
        key: 'status',
        label: $t('common.status'),
        defaultValue: [0, 1],
        form: {
          component: 'NCheckboxGroup',
          query: 'in',
          componentProps: { placeholder: $t('common.pleaseSelect'), options: unref(statusOptions) },
        },
        editForm: {
          component: 'NRadioGroup',
          defaultValue: 0,
          componentProps: { placeholder: $t('common.pleaseSelect'), options: unref(statusOptions) },
        },
        table: {
          render: (row: RowData) => {
            const status = unref(statusOptions).find((item) => item.value === row.status)?.label;
            const color = row.status === 1 ? 'success' : 'warning';
            return (
              <NTag bordered={false} type={color} size="small">
                {status}
              </NTag>
            );
          },
        },
      },
      {
        key: 'createdTime',
        label: $t('common.createdTime'),
        defaultValue: undefined,
        form: {
          component: 'NDatePicker',
          componentProps: {
            type: 'daterange',
            placeholder: `${$t('common.pleaseSelect')} ${$t('common.createdTime')}`,
          },
        },
        table: {
          render: (row: any) => dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      {
        key: 'updatedTime',
        label: $t('common.updatedTime'),
        form: {
          component: 'NDatePicker',
          componentProps: {
            type: 'daterange',
            defaultTime: ['00:00:00', '23:59:59'],
            placeholder: `${$t('common.pleaseSelect')} ${$t('common.updatedTime')}`,
          },
        },
        table: {
          render: (row: any) => dayjs(row.updatedTime).format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      {
        key: 'operate',
        label: $t('common.operate'),
        table: {
          fixed: 'right',
          width: 220,
          render: (row: RowData) => (
            <NSpace justify="center">
              <NButton
                type={row.status === 1 ? 'error' : 'primary'}
                ghost
                size="small"
                onClick={() => methods.handleEnable(row)}
              >
                {row.status === 0
                  ? $t('modules.system.user.schema.enable')
                  : $t('modules.system.user.schema.disable')}
              </NButton>
              <NButton type="primary" ghost size="small" onClick={() => methods.handleEdit(row)}>
                {$t('common.edit')}
              </NButton>
              <NPopconfirm
                onPositiveClick={() => methods.handleDelete(row)}
                v-slots={{
                  trigger: () => (
                    <NButton type="error" ghost size="small">
                      {$t('common.delete')}
                    </NButton>
                  ),
                }}
              >
                是否确认删除用户 {row.username}？
              </NPopconfirm>
            </NSpace>
          ),
        },
      },
    ],
    // 表格/表单统一配置
    setting: {
      table: { resizable: true },
    },
  }));

  // 表格和表单字段
  const tableFields = [
    'id',
    'username',
    'name',
    'phone',
    'roleType',
    'role',
    'sex',
    'status',
    'createdTime',
    'updatedTime',
    'operate',
  ];
  const formFields = [
    'id',
    'username',
    'phone',
    'roleType',
    'role',
    'sex',
    'status',
    'createdTime',
    'updatedTime',
  ];
  const editFormFields = ['id', 'username', 'phone', 'roleType', 'role', 'sex', 'status'];

  // 表格列配置
  const columns = computed(() => columnsUtil(schema.value, tableFields));

  // 表单字段配置
  const formSchemas = computed(() => formSchemaUtil(schema.value, formFields));

  const editFormSchemas = computed(() => editFormSchemaUtil(schema.value, editFormFields));
  return { columns, formSchemas, editFormSchemas };
};
