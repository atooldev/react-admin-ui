// src/components/Sidebar.tsx
import styled from '@emotion/styled';
import { faChartBar, faHome, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface SidebarProps {
    // Add any props you need for the Sidebar
}




const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <SidebarContainer>
            <DashboardTitle>Dashboard</DashboardTitle>
            <ul>
                <MenuLink active>
                    <FontAwesomeIcon 
                        icon={faHome}
                    />
                    <span>Home</span>
                </MenuLink>
                <MenuLink>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Products</span>
                </MenuLink>
                <MenuLink>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Customers</span>
                </MenuLink>
                <MenuLink>
                    <FontAwesomeIcon icon={faChartBar} />
                    <span>Reports</span>
                </MenuLink>
            </ul>

            {/* add the bottom  add logo and logout */}
             
            
             

        </SidebarContainer>
    );
};


const DashboardTitle = styled.h1`
    font-size: ${props => props.theme.fontSize['2xl']};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: ${props => props.theme.spacing[8]};
`;


const MenuLink = styled.li<{ active?: boolean }>`
    background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    list-style-type: none;
    color: ${props => props.active ? props.theme.colors.white : props.theme.colors.gray[400]};
    margin-bottom: ${props => props.theme.spacing[4]};
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
    border-radius: ${props => props.theme.borderRadius['xl']};
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.1s ease;
    justify-content: flex-start;
    gap: ${props => props.theme.spacing[4]};
    &:hover {
        background-color: ${props => props.theme.colors.indigo[400]};
        color: ${props => props.theme.colors.white};
    }
    &:active {
        background-color: ${props => props.theme.colors.indigo[300]};
        color: ${props => props.theme.colors.white};
    }

`;


const SidebarContainer = styled.div`
    width: 250px;
    background-color: ${props => props.theme.colors.white};
    border-right: 1px solid ${props => props.theme.colors.gray[300]};
    padding: 16px;
`;

export default Sidebar;
