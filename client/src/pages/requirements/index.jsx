import React, { useState } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddRequirementModal from './AddRequirementModal';
import UpdateRequirementModal from './UpdateRequirementModal';
import '../../assets/css/layout.css';
import Layout from 'antd/es/layout/layout';

const { Content } = Layout;
const RequirementsHome = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentRequirement, setCurrentRequirement] = useState(null);

  const [data, setData] = useState([
    { id: 1, family: 'Yılmaz Ailesi', deadline: '2024-12-31', importance: ['yüksek'] },
    { id: 2, family: 'Kara Ailesi', deadline: '2024-10-20', importance: ['düşük'] },
    { id: 3, family: 'Demir Ailesi', deadline: '2024-11-15', importance: ['orta'] },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = (values) => {
    // Adding new requirement to the data
    const newData = [...data, { id: data.length + 1, ...values }];
    setData(newData);
    setIsModalVisible(false);
  };

  const showUpdateModal = (requirement) => {
    setCurrentRequirement(requirement);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    setCurrentRequirement(null);
  };

  const handleUpdate = (values) => {
    const newData = data.map(item => {
      if (item.id === values.id) {
        return { ...item, ...values };
      }
      return item;
    });
    setData(newData);
    setIsUpdateModalVisible(false);
  };

  const columns = [
    {
      title: 'İhtiyaç ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <Link to={`/requirement-details/${record.id}`}>{text}</Link>,
    },
    {
      title: 'İhtiyaç Sahibi Aile',
      dataIndex: 'family',
      key: 'family',
      sorter: (a, b) => a.family.localeCompare(b.family),
    },
    {
      title: 'İhtiyaç Gidermek İçin Son Tarih',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
    },
    {
      title: 'Önem',
      dataIndex: 'importance',
      key: 'importance',
      sorter: (a, b) => a.importance[0].localeCompare(b.importance[0]),
      render: tags => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => showUpdateModal(record)}>Güncelle</Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small">Sil</Button>
        </Space>
      ),
    },
  ];

  const getRowClassName = (_, index) => {
    return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
  };

  return (
    <Content>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            icon={<PlusOutlined />}
            style={{ borderColor: '#28a745' }}
            onClick={showModal}
          >
            İhtiyaç Ekle
          </Button>
        </div>
        <AddRequirementModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onCreate={handleCreate}
        />
        <UpdateRequirementModal
          visible={isUpdateModalVisible}
          onCancel={handleUpdateCancel}
          onUpdate={handleUpdate}
          requirement={currentRequirement}
        />
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={getRowClassName}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </Content>
  );
};

export default RequirementsHome;