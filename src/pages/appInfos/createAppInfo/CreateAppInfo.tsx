import React from 'react';
import { Button, Form } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../hooks';

import toast from 'react-hot-toast';
import { createAppInfo } from '../../../redux/appInfo/app-info-thunks';
import { AppInfoForm } from '../../../models';
import { refreshPage } from '../../../redux/appInfo/app-info-actions';

export const CreateAppInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<AppInfoForm>();

  const postData = async (values: AppInfoForm) => {
    try {
      console.log('values', values);
      await dispatch(
        createAppInfo({
          ...values,
          projectId: 1,
        }),
      ).unwrap();
      toast.success('创建项目成功');
      dispatch(refreshPage());
      return true;
    } catch (err) {
      return true;
    }
  };

  return (
    <ModalForm<AppInfoForm>
      title={'新增应用'}
      trigger={
        <Button type='primary'>
          <PlusOutlined />
          新增应用
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
      <ProFormText width='md' name='name' label='项目名称' placeholder='请输入项目名称' />

      <ProFormTextArea
        width='xl'
        name='description'
        label='项目描述'
        placeholder='请输入项目描述'
      />

      <ProFormTextArea
        width='xl'
        name='repo'
        label='项目仓库'
        placeholder='请输入项目git仓库地址或者代码地址'
      />
      <ProFormText
        width='xl'
        name='branch'
        label='项目分支'
        placeholder='请输入项目git分支，默认为master'
      />
      <ProFormText
        width='xl'
        name='username'
        label='连接仓库用户名'
        placeholder='请输入连接仓库用户名'
      />
      <ProFormText.Password
        width='xl'
        name='password'
        label='连接仓库密码'
        placeholder='请输入连接仓库密码'
      />

      <ProFormSelect
        width='md'
        valueEnum={{
          GIT: '远程仓库',
          LOCAL: '本地地址',
        }}
        fieldProps={{
          optionItemRender(item) {
            return item.label + ' - ' + item.value;
          },
        }}
        name='repoType'
        label='合同约定生效方式'
      />
      <ProFormText
        width='xl'
        name='codePath'
        label='代码路径'
        placeholder='请输入代码路径，默认为根目录'
      />
    </ModalForm>
  );
};
