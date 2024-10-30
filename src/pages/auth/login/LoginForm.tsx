import styles from './LoginForm.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../../../redux/auth/auth-thunks';

import { useNavigate } from 'react-router-dom';

import { EmailUtils } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginSuccess } from '../../../redux/auth/auth-slice';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export const LoginForm = () => {
  const loading = useAppSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const onFinish = async (values: any) => {
    await dispatch(
      login({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((it) => {
        const { accessToken, username } = it;

        if (accessToken) {
          dispatch(loginSuccess(accessToken));
          toast.success('👏 ' + t('auth_page.login.login_success') + ' !');
          toast.success(`👏 ${t('auth_page.login.welcome')}：${username}`);
          navigate('/');
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles['register-form']}
    >
      <Form.Item
        label={t('auth_page.login.email')}
        name='email'
        rules={[
          { required: true, message: '' + t('auth_page.login.please_email') },
          {
            validator: (_, value) => {
              if (EmailUtils.isEmail(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error('' + t('auth_page.login.please_legal_email')));
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('auth_page.login.password')}
        name='password'
        rules={[{ required: true, message: '' + t('auth_page.login.please_password') }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
        <Checkbox>{t('auth_page.login.remember_me')}</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
          {t('auth_page.login.login')}
        </Button>
      </Form.Item>

      <Form.Item {...tailLayout}>
        {t('auth_page.login.or')} <a href='/register'>{t('auth_page.login.register_now')}</a>
      </Form.Item>
    </Form>
  );
};
