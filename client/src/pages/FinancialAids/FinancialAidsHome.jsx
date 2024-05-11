import { useState } from 'react';
import '../../assets/css/layout.css';
import { Layout, Space, Table, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LayoutComponent from '../../components/Layout';
import AddFinancialAidModal from '../FinancialAids/AddFinancialAidModal.jsx';
import UpdateFinancialAidModal from '../FinancialAids/UpdateFinancialAidModal.jsx';

const { Content } = Layout;

const FinancalAidsHome = () => {
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
          <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => showUpdateModal(record)}>
            Güncelle
          </Button>
          <Link to={`/finansal-yardim-sil/${record.id}`}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">Sil</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      familySurname: 'John Brown',
      address: 'New York No. 1 Lake Park',
      phoneNumber: '1234567890',
    },
    {
      key: '2',
      familySurname: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phoneNumber: '0987654321',
    },
    {
      key: '3',
      familySurname: 'Joe Black',
      address: 'Sydney No. 1 Lake Park',
      phoneNumber: '5678901234',
    },
  ];

    const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showModal = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = () => {
    console.log('Form submitted');
    setIsModalVisible(false);
  };

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const showUpdateModal = (record) => {
    setCurrentRecord(record);
    setIsUpdateModalVisible(true);
  };

  return (
    <LayoutComponent>
      <Content>
        <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<PlusOutlined />} 
          style={{ borderColor: '#28a745' }} 
          onClick={() => showModal(true)}
        >
          Finansal yardım ekle
        </Button>
        </div>
        <div>
          <Table 
            columns={columns} 
            dataSource={data} 
            rowClassName={getRowClassName}
            scroll={{ x: 'max-content' }}/>
        </div>
      </Content>
      <AddFinancialAidModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onFormSubmit={handleFormSubmit}
      />
      <UpdateFinancialAidModal
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        onFormSubmit={handleFormSubmit}
        record={currentRecord}
      />
    </LayoutComponent>
  );
};

export default FinancalAidsHome;