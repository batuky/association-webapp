import React from 'react';
import { Layout, Space, Table, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LayoutComponent from '../../components/Layout';

const { Content } = Layout;

const RequirementsHome = () => {
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
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Link to={`/update-family/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small">Güncelle</Button>
          </Link>
          <Link to={`/delete-family/${record.id}`}>
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
    {
      key: '4',
      familySurname: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phoneNumber: '0987654321',
    },
    {
      key: '5',
      familySurname: 'Joe Black',
      address: 'Sydney No. 1 Lake Park',
      phoneNumber: '5678901234',
    },
    {
      key: '6',
      familySurname: 'Jim Green',
      address: 'London No. 1 Lake Park',
      phoneNumber: '0987654321',
    },
    {
      key: '7',
      familySurname: 'Joe Black',
      address: 'Sydney No. 1 Lake Park',
      phoneNumber: '5678901234',
    },
  ];

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
  };

  return (
    <LayoutComponent>
      <Content>
        <div style={{ marginBottom: 16 }}>
          <Button icon={<PlusOutlined />} style={{ borderColor: '#28a745' }}>
            Aile Ekle
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
      </Content>
    </LayoutComponent>
  );
};

export default RequirementsHome;