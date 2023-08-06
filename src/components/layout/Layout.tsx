// src/components/DashboardLayout.tsx
import React from 'react';
import Sidebar from '../side-bar/SideBar';
import Content from '../content/Content';
import styled from '@emotion/styled';


interface DashboardLayoutProps {
  // Add any props you need for the DashboardLayout
  children: React.ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;


export default Layout;
