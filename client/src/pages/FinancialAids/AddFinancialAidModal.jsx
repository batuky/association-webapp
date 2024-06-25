import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddFinancialAidModal = ({ visible, onCancel, onFormSubmit }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFormSubmit(values);
        handleCancel();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      title="Finansal Yardım Ekle"
      visible={visible}
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
      <Form
        form={form}
        layout="vertical"
        name="add_financial_aid_form"
      >
        <Form.Item
          name="familySurname"
          label="Aile Soyadı"
          rules={[{ required: true, message: 'Lütfen aile soyadını giriniz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Adres"
          rules={[{ required: true, message: 'Lütfen adresi giriniz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Telefon Numarası"
          rules={[{ required: true, message: 'Lütfen telefon numarasını giriniz!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFinancialAidModal;