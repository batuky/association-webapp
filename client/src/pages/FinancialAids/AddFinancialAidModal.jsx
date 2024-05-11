import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddFinancialAidModal = ({ visible, onCancel, onFormSubmit }) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleFormSubmit = () => {
    onFormSubmit();
  };

  return (
    <Modal
      title="Finansal Yardım Ekle"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Gönder
        </Button>,
      ]}
    >
      <Form>
        <Form.Item 
          name="familySurname" 
          label="Aile Soyadı"
          rules={[{ required: true, message: 'Lütfen adresi giriniz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Adres">
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Telefon Numarası">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFinancialAidModal;