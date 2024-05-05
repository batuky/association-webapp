import React from 'react';
import { Layout } from 'antd';
import LayoutComponent from '../../components/Layout';

const { Content } = Layout;

const RequirementsHome = () => {
  return (
    <LayoutComponent>
      <Content>
        <div style={{ padding: 24, minHeight: 360 }}>
          İhtiyaçlar sayfası
        </div>
      </Content>
    </LayoutComponent>
  );
};

export default RequirementsHome;