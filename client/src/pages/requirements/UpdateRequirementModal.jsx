import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const UpdateRequirementModal = ({ visible, onCancel, onUpdate, requirement }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (requirement) {
      form.setFieldsValue({
        id: requirement.id,
        family: requirement.family,
        deadline: moment(requirement.deadline),
        importance: requirement.importance[0],
      });
    }
  }, [requirement, form]);

  return (
    <Modal
      title="İhtiyacı Güncelle"
      visible={visible}
      onOk={() => {
        form.validateFields()
          .then(values => {
            values.importance = [values.importance];
            values.deadline = values.deadline.format('YYYY-MM-DD');
            onUpdate(values);
            form.resetFields();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="update_requirement_form">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
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
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="importance"
          label="Önem"
          rules={[{ required: true, message: 'Lütfen önem derecesini seçiniz!' }]}
        >
          <Select>
            <Option value="yüksek">Yüksek</Option>
            <Option value="orta">Orta</Option>
            <Option value="düşük">Düşük</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRequirementModal;