import React from 'react';
import { BaseModel } from '../../../@types';
import { ProColumns } from '@ant-design/pro-components';
import { DatePicker } from 'antd';
import { UpdateProject } from '../updateProject';
import { DeleteProject } from '../deleteProject';

const { RangePicker } = DatePicker;

export interface TableListItem extends BaseModel {
  name: string;
  description: string;
}

export const columns: ProColumns<TableListItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    search: false,
  },
  {
    title: 'Application',
    dataIndex: 'name',
    ellipsis: true,
    tip: '应用名称过长会自动收缩',
  },
  {
    title: 'Application Description',
    dataIndex: 'description',
    ellipsis: true,
    search: false,
    tip: '应用描述过长会自动收缩',
  },
  {
    title: 'Owner',
    dataIndex: 'ownerId',
  },
  {
    title: 'Create At',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    search: false,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: 'Update At',
    dataIndex: 'updatedAt',
    valueType: 'date',
    search: false,
    hideInTable: false,
  },
  {
    width: 150,
    title: 'Options',
    valueType: 'option',
    key: 'option',
    fixed: 'right',
    render: (text, record, index, action) => [
      <UpdateProject
        key={record.id}
        id={record.id}
        name={record.name}
        description={record.description}
      />,
      <a
        key={record.id}
        onClick={() => {
          console.log('text', text);
          console.log('record', record);
          console.log('index', index);
          console.log('action', action);
        }}
      >
        查看
      </a>,
      <DeleteProject key={record.id} id={record.id} />,
    ],
  },
];
