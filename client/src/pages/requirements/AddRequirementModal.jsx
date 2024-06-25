import React from 'react';
import Form from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import Modal from 'antd/es/modal/Modal';
import { Button } from 'antd/es/radio';
import { DatePicker, Select } from 'antd';

const { Option } = Select;

const AddRequirementModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
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
      title="İhtiyaç Ekle"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleFinish}>
          Ekle
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="createRequirementForm"
        initialValues={{
          importance: 'düşük',
        }}
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
          rules={[{ required: true, message: 'Lütfen son teslim tarihini giriniz!' }]}
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

export default AddRequirementModal;