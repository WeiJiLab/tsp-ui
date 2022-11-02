import styles from "./LoginForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { login } from "../../../redux/auth/slice"

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { EmailUtils } from "../../../common";
import { useAppDispatch, useAppSelector } from "../../../hooks";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export const LoginForm = () => {
  const loading = useAppSelector(state => state.auth.loading);
  const jwtToken = useAppSelector(state => state.auth.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwtToken !== null) {
      navigate("/");
    }
  }, [jwtToken, dispatch]);


  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(login({
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
