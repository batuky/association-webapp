import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddFamilyModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Aile Ekle"
      okText="Ekle"
      cancelText="İptal"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="add_family_form"
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

export default AddFamilyModal;