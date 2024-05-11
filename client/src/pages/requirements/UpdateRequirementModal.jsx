import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const UpdateRequirementModal = ({ visible, onCancel, onUpdate, requirement }) => {
  const [form] = Form.useForm();

useEffect(() => {
  form.setFieldsValue({
    id: requirement?.id,
    family: requirement?.family,
    deadline: requirement ? (requirement.deadline) : null,
    importance: requirement?.importance[0],
  });
  console.log(requirement)
}, [requirement, form]);



  return (
    <Modal
      title="İhtiyacı Güncelle"
      visible={visible}
      onOk={() => {
        form.validateFields()
          .then(values => {
            values.importance = [values.importance];
            onUpdate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="update_requirement_form"
      >
        <Form.Item
          name="family"
          label="İhtiyaç Sahibi Aile"
          rules={[{ required: true, message: 'Lütfen aile adını giriniz!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Son Tarih"
          rules={[{ required: true, message: 'Lütfen son tarihi seçiniz!' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item>
          <DatePicker format="YYYY-MM-DD"/>
        </Form.Item>
        <Form.Item
          name="importance"
          label="Önem"
          rules={[{ required: true, message: 'Lütfen önem derecesini seçiniz!' }]}
        >
          <Select>
            <Option value="düşük">Düşük</Option>
            <Option value="orta">Orta</Option>
            <Option value="yüksek">Yüksek</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRequirementModal;