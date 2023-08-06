import styled from '@emotion/styled';
import React from 'react';

interface ContentProps {
  // Add any props you need for the Content
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};

const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

export default Content;
