import React, { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DollarOutlined, OrderedListOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
import '../assets/css/layout.css';
import UsersHome from '../pages/users/UsersHome';
import FinancialAidsHome from '../pages/FinancialAids/FinancialAidsHome';
import RequirementsHome from '../pages/requirements/RequirementsHome';
import FamiliesHome from '../pages/families/FamiliesHome';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: '1', label: 'Kullanıcı', icon: <UserOutlined />, path: '/kullanicilar' },
  { key: '2', label: 'Finansal Yardımlar', icon: <DollarOutlined />, path: '/finansal-yardimlar' },
  { key: '3', label: 'İhtiyaçlar', icon: <OrderedListOutlined />, path: '/ihtiyaclar' },
  { key: '4', label: 'Aileler', icon: <TeamOutlined />, path: '/aileler' },
];

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation();

  const getSelectedKeyFromPath = () => items.find(item => item.path === pathname)?.key || '1';

  const selectedKey = getSelectedKeyFromPath();
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        onBreakpoint={broken => setCollapsed(broken)}
        trigger={null}
      >
        <div className="demo-logo-vertical" style={{ marginTop: 8 }} />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {items.map(({ key, icon, label, path }) => (
            <Menu.Item key={key} icon={icon}>
              <Link to={path}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginLeft: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="container" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes>
              <Route path="/kullanicilar" element={<UsersHome />} />
              <Route path="/finansal-yardimlar" element={<FinancialAidsHome />} />
              <Route path="/ihtiyaclar" element={<RequirementsHome />} />
              <Route path="/aileler" element={<FamiliesHome />} />
            </Routes>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Batuhan Kaya tarafından oluşturuldu ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;