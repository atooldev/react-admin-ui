import styled from "@emotion/styled";

export const Tab = styled.div<{ active?: boolean }>`
  padding: 16px;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[400]};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  margin-bottom: ${props => props.theme.spacing[4]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  font-size: ${props => props.theme.fontSize['lg']};
  cursor: pointer;
`;


export const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[8]};
  gap: 16px;
`;