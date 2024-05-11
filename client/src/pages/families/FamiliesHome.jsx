import React, { useState } from 'react';
import { Layout, Space, Table, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LayoutComponent from '../../components/Layout';
import AddFamilyModal from './AddFamilyModal';
import UpdateFamilyModal from './UpdateFamilyModal';

const { Content } = Layout;

const RequirementsHome = () => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [currentFamily, setCurrentFamily] = useState(null);
  const [data, setData] = useState([
    { key: '1', familySurname: 'John Brown', address: 'New York No. 1 Lake Park', phoneNumber: '1234567890' },
    { key: '2', familySurname: 'Jim Green', address: 'London No. 2 Lake Park', phoneNumber: '0987654321' },
    { key: '3', familySurname: 'Jim yellow', address: 'London No. 3 Lake Park', phoneNumber: '111111111111' },
    { key: '4', familySurname: 'Jim red', address: 'London No. 4 Lake Park', phoneNumber: '22222222222' },
    { key: '5', familySurname: 'Jim grey', address: 'London No. 5 Lake Park', phoneNumber: '33333333' },
  ]);

  const columns = [
    {
      title: 'Aile Soyadı',
      dataIndex: 'familySurname',
      key: 'familySurname',
      render: text => <a>{text}</a>,
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
          <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>Güncelle</Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small">Sil</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = record => {
    setCurrentFamily(record);
    setUpdateVisible(true);
  };

  const handleAddFamily = family => {
    const newData = { key: String(data.length + 1), ...family };
    setData([...data, newData]);
    setVisible(false);
  };

  const handleUpdateFamily = updatedFamily => {
    const newData = data.map(item => item.key === updatedFamily.key ? updatedFamily : item);
    setData(newData);
    setUpdateVisible(false);
  };

  return (
    <LayoutComponent>
      <Content>
        <div style={{ marginBottom: 16 }}>
          <Button 
            icon={<PlusOutlined />} 
            style={{ borderColor: '#28a745' }} 
            onClick={() => setVisible(true)}>
            Aile Ekle
          </Button>
        </div>
        <AddFamilyModal visible={visible} onCreate={handleAddFamily} onCancel={() => setVisible(false)} />
        <UpdateFamilyModal visible={updateVisible} onUpdate={handleUpdateFamily} onCancel={() => setUpdateVisible(false)} initialData={currentFamily} />
        <Table columns={columns} dataSource={data} rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} scroll={{ x: 'max-content' }} />
      </Content>
    </LayoutComponent>
  );
};

export default RequirementsHome;