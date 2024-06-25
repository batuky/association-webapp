import React from 'react';
import { Form, Layout, Input, Button } from 'antd';
import '../../assets/css/usersHome.css';

const { Content } = Layout;

const UsersHome = () => {
  const handleFormSubmit = (values) => {
    console.log('Received values:', values);
  };

  const userId = 12345; // Example user ID

  return (
    <Content className="users-home-content">
      <Form onFinish={handleFormSubmit}>
        <Form.Item
          name={['user', 'userId']}
          className="form-item"
        >
          <Input
            disabled
            value={`Kullanıcı ID: ${userId}`}
            className="input"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          className="form-item"
        >
          <Input
            placeholder="Email"
            className="input"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'phoneNumber']}
          className="form-item"
        >
          <Input
            placeholder="Telefon numarası"
            className="input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="form-item"
        >
          <Input.Password
            placeholder="Şifre"
            className="input"
          />
        </Form.Item>
        <Form.Item className="button-wrapper">
          <Button
            type="primary"
            danger
            className="delete-button"
          >
            Kullanıcıyı Sil
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="update-button"
          >
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default UsersHome;