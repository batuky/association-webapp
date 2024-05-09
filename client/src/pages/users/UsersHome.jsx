import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import LayoutComponent from '../../components/Layout';

const { Content } = Layout;

const UsersHome = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <LayoutComponent>
      <Content>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Form onFinish={onFinish}>
            <Form.Item label="User ID" name={['user', 'userId']} className="form-item">
              <Input disabled className="input" />
            </Form.Item>
            <Form.Item label="Email" name={['user', 'email']} className="form-item">
              <Input className="input" />
            </Form.Item>
            <Form.Item label="Telefon numarası" name={['user', 'phoneNumber']} className="form-item">
              <Input className="input" />
            </Form.Item>
            <Form.Item label="Şifre" name="password" className="form-item">
              <Input.Password className="input" />
            </Form.Item>
            <Form.Item className="button-wrapper">
              <Button type="primary" danger style={{ marginBottom: 8, marginRight: 8 }}>
                Kullanıcıyı Sil
              </Button>

              <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                Güncelle
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </LayoutComponent>
  );
};

export default UsersHome;