import React from 'react';
import { Button, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../hooks';

import toast from 'react-hot-toast';
import { createAppInfo } from '../../../redux/appInfo/app-info-thunks';
import { AppInfoForm } from '../../../models';
import { refreshPage } from '../../../redux/appInfo/app-info-actions';
import { useTranslation } from 'react-i18next';

export const CreateAppInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<AppInfoForm>();

  const { t } = useTranslation();

  const postData = async (values: AppInfoForm) => {
    try {
      console.log('values', values);
      await dispatch(
        createAppInfo({
          ...values,
          projectId: 1,
        }),
      ).unwrap();
      toast.success(t('app_page.create.create_project_success'));
      dispatch(refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  return (
    <ModalForm<AppInfoForm>
      title={t('app_page.create.creat_project')}
      trigger={
        <Button type='primary'>
          <PlusOutlined />
          {t('app_page.create.creat_project')}
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
      initialValues={{
        branch: 'master',
        repoType: 'GIT',
        codePath: '/',
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label={t('app_page.create.project_name')}
        placeholder={'' + t('app_page.create.please_project_name')}
      />

      <ProFormTextArea
        width='xl'
        name='description'
        label={t('app_page.create.project_description')}
        placeholder={'' + t('app_page.create.please_project_description')}
      />

      <ProFormTextArea
        width='xl'
        name='repo'
        label={t('app_page.create.project_repo')}
        placeholder={'' + t('app_page.create.please_project_repo')}
      />
      <ProFormText
        width='xl'
        name='branch'
        label={t('app_page.create.project_branch')}
        placeholder={'' + t('app_page.create.please_project_branch')}
      />
      <ProFormText
        width='xl'
        name='username'
        label={t('app_page.create.connect_repo_by_username')}
        placeholder={'' + t('app_page.create.please_connect_repo_by_username')}
      />
      <ProFormText.Password
        width='xl'
        name='password'
        label={t('app_page.create.connect_repo_by_password')}
        placeholder={'' + t('app_page.create.please_connect_repo_by_password')}
      />

      <ProFormSelect
        width='md'
        valueEnum={{
          GIT: t('app_page.create.remote_repo'),
          LOCAL: t('app_page.create.local_url'),
        }}
        fieldProps={{
          optionItemRender(item) {
            return item.label + ' - ' + item.value;
          },
        }}
        name='repoType'
        label={t('app_page.create.How_the_contract_takes_effect')}
      />
      <ProFormText
        width='xl'
        name='codePath'
        label={t('app_page.create.code_path')}
        placeholder={'' + t('app_page.create.please_code_path')}
      />
    </ModalForm>
  );
};
