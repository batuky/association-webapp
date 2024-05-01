import React from 'react';
import { Layout } from 'antd';
import LayoutComponent from '../components/Layout';

const { Content } = Layout;

const Home = () => {
  return (
    <LayoutComponent>
      <Content>
        <div style={{ padding: 24, minHeight: 360 }}>
          Home
        </div>
      </Content>
    </LayoutComponent>
  );
};

export default Home;