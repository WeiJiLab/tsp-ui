import { Form, Input, Button } from 'antd';
import styles from './RegisterForm.module.css';
import { register } from '../../../redux/auth/auth-thunks';
import { EmailUtils } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values: any) => {
    await dispatch(
      register({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    ).unwrap();

    toast.success('👏 ' + t('auth_page.register.register_success') + ' !');
    navigate('/login');
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        label={t('auth_page.register.username')}
        name='username'
        rules={[{ required: true, message: '' + t('auth_page.register.please_input_username') }]}
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

      <Form.Item
        label={t('auth_page.register.confirm_password')}
        name='confirm'
        hasFeedback
        rules={[
          {
            required: true,
            message: '' + t('auth_page.register.please_confirm_password'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(t('auth_page.register.password_confirmation_inconsistent'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          {t('auth_page.register.register')}
        </Button>
      </Form.Item>

      <Form.Item {...tailLayout}>
        {t('auth_page.register.already_have_an_account')}{' '}
        <a href='/login'>{t('auth_page.register.sign_in_now')}</a>
      </Form.Item>
    </Form>
  );
};
