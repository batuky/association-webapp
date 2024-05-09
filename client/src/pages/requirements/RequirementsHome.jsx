import React from 'react';
import { Layout, Table, Button, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LayoutComponent from '../../components/Layout';

const { Content } = Layout;

const RequirementsHome = () => {
  const columns = [
    {
      title: 'İhtiyaç ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => (
        <Link to={`/requirement-details/${record.id}`}>{text}</Link>
      ),
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
          <Link to={`/update-requirement/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="small">Güncelle</Button>
          </Link>
          <Link to={`/delete-requirement/${record.id}`}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">Sil</Button>
          </Link>
        </Space>
      ),
    }
  ];

  const data = [
    { id: 1, family: 'Yılmaz Ailesi', deadline: '2024-12-31', importance: ['yüksek'] },
    { id: 2, family: 'Kara Ailesi', deadline: '2024-10-20', importance: ['düşük'] },
    { id: 3, family: 'Demir Ailesi', deadline: '2024-11-15', importance: ['orta'] },
  ];

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'table-row-light' : 'table-row-dark';
  };

  return (
    <LayoutComponent>
      <Content>
        <div>
          <div style={{ marginBottom: 16 }}>
            <Link to="/create-requirement">
              <Button icon={<PlusOutlined />} style={{ borderColor: '#28a745' }}>İhtiyaç Ekle</Button>
            </Link>
          </div>
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