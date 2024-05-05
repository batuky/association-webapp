import React from 'react';
import { Layout, Space, Table } from 'antd';
import LayoutComponent from '../../components/Layout';

const { Content } = Layout;

const AssosiationsHome = () => {
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
      render: (_) => (
        <Space size="middle">
          <a>Kaydı Güncelle</a>
          <a>Kaydı Sil</a>
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

  return (
    <LayoutComponent>
      <Content>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Table columns={columns} dataSource={data} />
          <p>Yardımlar sayfası</p>
        </div>
      </Content>
    </LayoutComponent>
  );
};

export default AssosiationsHome;