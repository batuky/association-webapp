import React from 'react';
import { Button, Form, Input } from 'antd';
import '../../assets/css/forgotPassword.css';

// Handlers for form events
const handleFinish = (values) => {
  console.log('Success:', values);
};

const handleFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ForgotPasswordForm = () => (
  <div className="login-container">
    <div className="login-card">
      <Form
        name="forgot_password"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="E-posta"
          name="email"
          rules={[
            {
              required: true,
              message: 'E-posta adresinizi girin!',
            },
            {
              type: 'email',
              message: 'Geçerli bir e-posta adresi girin!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Yeni şifre"
          name="password"
          rules={[
            {
              required: true,
              message: 'Yeni şifrenizi girin!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Yeni şifre tekrar"
          name="repassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Yeni şifrenizi tekrar girin!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Şifre değiştir
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default ForgotPasswordForm;