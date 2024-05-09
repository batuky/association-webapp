import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import '../../assets/css/smsVerificationPage.css';

const SmsVerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [form] = Form.useForm();

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      // Handle verification code submission logic here
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Form form={form} onSubmit={handleSubmit}>
          <Form.Item
            label="Doğrulama kodu"
            name="verificationCode"
            rules={[
              {
                required: true,
                message: 'Lütfen sms ile gelen doğrulama kodunuzu girin!',
              },
            ]}
          >
            <Input value={verificationCode} onChange={handleVerificationCodeChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Doğrula</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SmsVerificationPage;