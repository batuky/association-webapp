import '../../assets/css/layout.css';
import { Space, Table, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddFinancialAidModal from './AddFinancialAidModal.jsx';
import UpdateFinancialAidModal from './UpdateFinancialAidModal.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from 'antd/es/layout/layout.js';

const { Content } = Layout;

const FinancialAidsHome = () => {
  const [modalState, setModalState] = useState({
    isAddVisible: false,
    isUpdateVisible: false,
    currentRecord: null,
  });

  const { isAddVisible, isUpdateVisible, currentRecord } = modalState;

  // Column definitions for the table.
  const columns = [
    {
      title: 'Aile Soyadı',
      dataIndex: 'familySurname',
      key: 'familySurname',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.familySurname.localeCompare(b.familySurname),
    },
    {
      title: 'Adres',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: 'Aksiyon',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showUpdateModal(record)}
          >
            Güncelle
          </Button>
          <Link to={`/finansal-yardim-sil/${record.key}`}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">
              Sil
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Temporary data for the table.
  const data = [
    { key: '1', familySurname: 'John Brown', address: 'New York No. 1 Lake Park', phoneNumber: '1234567890' },
    { key: '2', familySurname: 'Jim Green', address: 'London No. 1 Lake Park', phoneNumber: '0987654321' },
    { key: '3', familySurname: 'Joe Black', address: 'Sydney No. 1 Lake Park', phoneNumber: '5678901234' },
  ];

  // Function to determine row class based on index.
  const getRowClassName = (record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark');

  // Function to show add modal.
  const showAddModal = () => {
    setModalState({ ...modalState, isAddVisible: true });
  };

  // Function to show update modal with the selected record.
  const showUpdateModal = (record) => {
    setModalState({ ...modalState, isUpdateVisible: true, currentRecord: record });
  };

  // Function to handle modal cancel action.
  const handleCancel = () => {
    setModalState({ isAddVisible: false, isUpdateVisible: false, currentRecord: null });
  };

  // Function to handle form submission.
  const handleFormSubmit = () => {
    console.log('Form submitted');
    handleCancel();
  };

  return (
    <Content>
      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          style={{ borderColor: '#28a745' }}
          onClick={showAddModal}
        >
          Finansal yardım ekle
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={getRowClassName}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <AddFinancialAidModal
        visible={isAddVisible}
        onCancel={handleCancel}
        onFormSubmit={handleFormSubmit}
      />
      <UpdateFinancialAidModal
        visible={isUpdateVisible}
        onCancel={handleCancel}
        onFormSubmit={handleFormSubmit}
        record={currentRecord}
      />
    </Content>
  );
};

export default FinancialAidsHome;