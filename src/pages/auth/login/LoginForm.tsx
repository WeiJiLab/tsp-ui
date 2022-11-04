import styles from "./LoginForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { login } from "../../../redux/auth/auth-thunks"

import { useNavigate } from "react-router-dom";

import { EmailUtils } from "../../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import toast from "react-hot-toast";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export const LoginForm = () => {
  const loading = useAppSelector(state => state.auth.loading);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {

   await dispatch(login(
        {
          email: values.email,
          password: values.password,
        }
    )).unwrap()
        .then(it => {
          console.log("it", it);
          const {accessToken, username} = it;

          if (accessToken) {
            toast.success(`👏登录成功 !`);
            toast.success(`👏欢迎回来：${username}`);
            navigate("/");
          }
        });


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
            rules={[
              {required: true, message: "请输入你的用户名!"},
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
            label="密码"
            name="password"
            rules={[{required: true, message: "请输入你的密码!"}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
  );
};
