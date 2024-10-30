import React from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useAppDispatch } from '../../../hooks';

import toast from 'react-hot-toast';
import { AppInfoForm, AppInfoModel } from '../../../models';
import { updateAppInfo } from '../../../redux/appInfo/app-info-thunks';
import { refreshPage } from '../../../redux/appInfo/app-info-actions';
import { useTranslation } from 'react-i18next';

export const UpdateAppInfo: React.FC<AppInfoModel> = (props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const patchData = async (values: AppInfoForm) => {
    try {
      await dispatch(updateAppInfo({ id: props.id, body: { ...values } })).unwrap();
      toast.success(t('app_page.edit.update_project_success'));
      dispatch(refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  const [form] = Form.useForm<AppInfoForm>();

  return (
    <ModalForm<AppInfoForm>
      title={t('app_page.edit.edit_project')}
      trigger={<a>{t('app_page.edit.edit_text')}</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('Cancel Edit'),
      }}
      onFinish={async (values) => {
        return patchData(values);
      }}
      initialValues={{
        ...props,
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
