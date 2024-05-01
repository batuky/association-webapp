import React from 'react';
import { Button, Form, Input } from 'antd';
import '../../assests/css/forgotPassword.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App = () => (
  <div className="login-container">
    <div className="login-card">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          rules={[
            {
              required: true,
              message: 'Yeni şifrenizi tekrar girin!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Şifre değiştir
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default App;