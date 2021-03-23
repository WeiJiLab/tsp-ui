import { Form, Input, Button } from "antd";
import styles from "./RegisterForm.module.css";
import { register } from "../../../redux/auth/slice";
import { EmailUtils } from "../../../common/utils";
import { useAppDispatch, useAppSelector } from "../../../hooks";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export const RegisterForm = () => {
  const loading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    dispatch(register({
      username: values.username,
      email: values.email,
      password: values.password,
    }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <Form
          {...layout}
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={styles["register-form"]}
      >
        <Form.Item
            label="邮箱"
            name="email"
            rules={[{required: true, message: "请输入你的邮箱"},
              {
                validator: (_, value) => {
                  if (EmailUtils.isEmail(value)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error("请输入正确的邮箱"))
                  }
                }
              }
            ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
            label="用户名"
            name="username"
            rules={[{required: true, message: "请输入用户名!"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
            label="密码"
            name="password"
            rules={[{required: true, message: "请输入密码!"}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
            label="确认密码"
            name="confirm"
            hasFeedback
            rules={[
              {required: true, message: "请再次输入密码确认!"},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("密码确认不一致！");
                },
              }),
            ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            注册
          </Button>
        </Form.Item>
      </Form>
  );
};
