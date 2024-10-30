import React from 'react';
import { BaseModel } from '../../../@types';
import { ProColumns } from '@ant-design/pro-components';
import { DatePicker } from 'antd';
import { UpdateProject } from '../updateProject';
import { DeleteProject } from '../deleteProject';
import i18n from '../../../config/I18nConfigs';

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
    title: i18n.t('project_page.detail.application_name'),
    dataIndex: 'name',
    ellipsis: true,
    tip: '' + i18n.t('project_page.detail.content_too_long'),
  },
  {
    title: i18n.t('project_page.detail.application_desc'),
    dataIndex: 'description',
    ellipsis: true,
    search: false,
    tip: '' + i18n.t('project_page.detail.content_too_long'),
  },
  {
    title: i18n.t('project_page.detail.person_in_charge'),
    dataIndex: 'ownerId',
  },
  {
    title: i18n.t('project_page.detail.create_time'),
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    search: false,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: i18n.t('project_page.detail.update_time'),
    dataIndex: 'updatedAt',
    valueType: 'date',
    search: false,
    hideInTable: false,
  },
  {
    width: 150,
    title: i18n.t('project_page.detail.operation'),
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
        {i18n.t('project_page.detail.View')}
      </a>,
      <DeleteProject key={record.id} id={record.id} />,
    ],
  },
];
