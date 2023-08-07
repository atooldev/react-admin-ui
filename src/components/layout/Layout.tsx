// src/components/DashboardLayout.tsx
import React from 'react';
import Sidebar from '../side-bar/SideBar';
import Content from '../content/Content';
import styled from '@emotion/styled';
import TopBar from '../top-bar/TopBar';
import { Navigate, Outlet } from 'react-router-dom';


interface DashboardLayoutProps {
  // Add any props you need for the DashboardLayout
}

const Layout: React.FC<DashboardLayoutProps> = () => {

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <TopBar />
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;


export default Layout;
