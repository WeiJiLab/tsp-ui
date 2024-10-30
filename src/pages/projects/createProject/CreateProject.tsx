import React from 'react';
import { Button, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../hooks';

import toast from 'react-hot-toast';
import { createProject } from '../../../redux/project/project-thunks';
import { projectSlice } from '../../../redux/project/project-slice';
import { useTranslation } from 'react-i18next';

interface FormTypes {
  name: string;
  description: string;
}

export const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FormTypes>();
  const { t } = useTranslation();

  const postData = async (values: FormTypes) => {
    try {
      await dispatch(createProject({ ...values })).unwrap();
      toast.success(t('project_page.create.create_project_success'));
      dispatch(projectSlice.actions.refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  return (
    <ModalForm<FormTypes>
      title={t('project_page.create.create_project')}
      trigger={
        <Button type='primary'>
          <PlusOutlined />
          {t('project_page.create.create_project')}
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('Cancel Edit'),
      }}
      onFinish={async (values) => {
        return postData(values);
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label={t('project_page.create.project_name')}
        tooltip={t('project_page.create.max_24_length')}
        placeholder={'' + t('project_page.create.please_project_name')}
      />

      <ProFormTextArea
        width='xl'
        name='description'
        label={t('project_page.create.project_description')}
        placeholder={'' + t('project_page.create.please_project_description')}
      />
    </ModalForm>
  );
};
