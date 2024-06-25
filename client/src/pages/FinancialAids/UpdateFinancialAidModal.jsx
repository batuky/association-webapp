import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UpdateFinancialAidModal = ({ visible, onCancel, onFormSubmit, record }) => {
  const [form] = Form.useForm();

  // Use useEffect to handle side effects
  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);

  // Handler for form submission
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onFormSubmit(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Finansal Yardım Güncelle"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="updateFinancialAidForm"
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
          rules={[{ required: true, message: 'Lütfen telefon numarasını giriniz!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateFinancialAidModal;