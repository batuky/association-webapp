import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UpdateFamilyModal = ({ visible, onUpdate, onCancel, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdate({ ...initialData, ...values });
        onCancel();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Aile Bilgilerini Güncelle"
      visible={visible}
      onOk={handleUpdate}
      onCancel={onCancel}
      okText="Güncelle"
      cancelText="İptal"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
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
          rules={[{ required: true, message: 'Lütfen adres giriniz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Telefon Numarası"
          rules={[{ required: true, message: 'Lütfen telefon numarası giriniz!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFamilyModal;