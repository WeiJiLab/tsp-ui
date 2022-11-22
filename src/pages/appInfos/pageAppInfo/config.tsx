import React from 'react'
import { ProColumns } from '@ant-design/pro-components'
import { DatePicker } from 'antd'
import { UpdateAppInfo } from '../updateAppInfo'
import { AppInfoModel } from '../../../models'
import { DeleteAppInfo } from '../deleteAppInfo'

const { RangePicker } = DatePicker

export const columns: ProColumns<AppInfoModel>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    search: false,
  },
  {
    title: '应用名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '应用描述',
    dataIndex: 'description',
    ellipsis: true,
    search: false,
    tip: '项目描述过长会自动收缩',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '仓库类型',
    dataIndex: 'repoType',
    valueEnum: {
      GIT: { text: 'GIT' },
      LOCAL: { text: 'LOCAL' },
    },
  },
  {
    title: '代码目录',
    dataIndex: 'codePath',
    search: false,
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    search: false,
    renderFormItem: () => {
      return <RangePicker />
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    valueType: 'date',
    search: false,
    hideInTable: false,
  },
  {
    width: 150,
    title: '操作',
    valueType: 'option',
    key: 'option',
    fixed: 'right',
    render: (text, record, index, action) => [
      <UpdateAppInfo {...record} />,
      <a
        onClick={() => {
          console.log('text', text)
          console.log('record', record)
          console.log('index', index)
          console.log('action', action)
        }}
      >
        查看
      </a>,
      <DeleteAppInfo id={record.id} />,
    ],
  },
]
