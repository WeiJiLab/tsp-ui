import React from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useAppDispatch } from '../../../hooks';

import { BaseModel } from '../../../@types';
import toast from 'react-hot-toast';
import { Project } from '../../../models';
import { updateProject } from '../../../redux/project/project-thunks';
import { projectSlice } from '../../../redux/project/project-slice';
import { useTranslation } from 'react-i18next';

interface FormTypes extends BaseModel {
  name: string;
  description?: string;
}

export const UpdateProject: React.FC<Project> = ({ id, name, description }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const patchData = async (values: FormTypes) => {
    try {
      await dispatch(
        updateProject({
          id: id,
          name: values.name,
          description: values.description,
        }),
      ).unwrap();
      toast.success(t('project_page.update.update_project_success'));

      dispatch(projectSlice.actions.refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  const [form] = Form.useForm<FormTypes>();

  return (
    <ModalForm<FormTypes>
      title={t('project_page.update.update_project_info')}
      trigger={<a>编辑</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('Cancel Edit'),
      }}
      onFinish={async (values) => {
        console.log(values.name, values.description);
        return patchData(values);
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label={t('project_page.create.project_name')}
        tooltip={t('project_page.create.max_24_length')}
        placeholder={'' + t('project_page.create.please_project_name')}
        initialValue={name}
      />

      <ProFormTextArea
        width='xl'
        name='description'
        label={t('project_page.create.project_description')}
        placeholder={'' + t('project_page.create.please_project_description')}
        initialValue={description}
      />
    </ModalForm>
  );
};
