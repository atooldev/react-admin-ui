// src/components/DashboardLayout.tsx
import styled from '@emotion/styled';
import { faBell, faCalendar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


interface TopBarProps {
    // Add any props you need for the Sidebar
}

const TopBar: React.FC<TopBarProps> = () => {
    return (
        <Contianer>
            <TopBarContainer>
                <TodayDate>
                    <FontAwesomeIcon icon={faCalendar} />
                    October 19, 2021
                </TodayDate>

                <RightSideBar>


                    <SearchBar>
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="Seach order number or name ... " />

                    </SearchBar>

                    <UserMenu>
                        <FontAwesomeIcon icon={faBell} />
                        <FontAwesomeIcon icon={faUser} />
                    </UserMenu>
                </RightSideBar>
            </TopBarContainer>

            <PageTitle>
                Orders 😍
            </PageTitle>
        </Contianer>
    );
};


const TodayDate = styled.div`
  font-size: ${props => props.theme.fontSize['base']};
  color: ${props => props.theme.colors.gray[800]};
  font-weight: 600;
  svg {
    color: ${props => props.theme.colors.primary};
  }
  margin-bottom: ${props => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled.div`
  font-size: ${props => props.theme.fontSize['2xl']};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  gap: 16px;
  width: 300px;
  position: relative;
  input {
    width: 100%;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: ${props => props.theme.fontSize['base']};
    color: ${props => props.theme.colors.gray[800]};
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.gray[200]};
    border-radius: 24px;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }
  }
  svg {
    position: absolute;
    right: 4px;
    top: 50%;
    width: 16px;
    height: 16px;
    background-color: ${props => props.theme.colors.gray[100]};
    border-radius: 50%;
    padding: 8px;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const UserMenu = styled.div`
  font-size: ${props => props.theme.fontSize['2xl']};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[8]};
  display: flex;
  align-items: center;
  gap: 16px;
  svg {
    color: ${props => props.theme.colors.gray[700]};
  } 
  
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Contianer = styled.div`
    display: flex;  
    flex-direction: column;
`;

const RightSideBar = styled.div`

  display: flex;
  align-items: center;
  gap: 16px;
`;

const PageTitle = styled.div`
    font-size: ${props => props.theme.fontSize['4xl']};
    color: ${props => props.theme.colors.gray[800]};
    font-weight: 500;
    margin-bottom: ${props => props.theme.spacing[8]};
`;




export default TopBar;
