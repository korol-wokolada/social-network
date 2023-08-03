import React from "react";
import style from "./loginPage.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginThunk } from "../../store/authSlice/authThunk";
import { Values } from "./types";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const { errors, captcha } = useAppSelector((state) => state.auth);

  const onFinish = (values: Values) => {
    dispatch(loginThunk(values));
  };

  return (
    <div className={style.wrapper}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>
        {captcha !== undefined ? (
          <div>
            <img src={captcha} alt="" />
            <Form.Item name="captcha">
              <Input type="captcha" placeholder="inter Captcha" />
            </Form.Item>
          </div>
        ) : null}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>

      {errors !== undefined ? <div>{errors}</div> : null}
    </div>
  );
}
