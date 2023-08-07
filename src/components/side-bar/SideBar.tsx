// src/components/Sidebar.tsx
import styled from '@emotion/styled';
import { faBangladeshiTakaSign, faCediSign, faChartBar, faColonSign, faHome, faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    // Add any props you need for the Sidebar
}




const Sidebar: React.FC<SidebarProps> = () => {

    // react router dom get current path
    const { pathname } = useLocation();

    return (
        <SidebarContainer>
            <DashboardTitle>Dashboard</DashboardTitle>
            <MenuContainer>
                <Link to={'/'}>
                    <MenuLink active={pathname === '/'}>
                        <FontAwesomeIcon
                            icon={faHome}
                        />
                        <span>Home</span>
                    </MenuLink>
                </Link>
                <Link to={'/products'}>
                    <MenuLink active={pathname === '/products'}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span>Products</span>
                    </MenuLink>
                </Link>
                <Link to={'/customers'}>
                    <MenuLink active={pathname === '/customers'}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Customers</span>
                    </MenuLink>
                </Link>
                <Link to={'/report'}>
                    <MenuLink active={pathname === '/report'}>
                        <FontAwesomeIcon icon={faChartBar} />
                        <span>Reports</span>
                    </MenuLink>
                </Link>

                <Link to={'/pallete'}>
                    <MenuLink active={pathname === '/pallete'}>
                        <FontAwesomeIcon icon={faBangladeshiTakaSign} />
                        <span>Color Pallete </span>
                    </MenuLink>
                </Link>
            </MenuContainer>
        </SidebarContainer>
    );
};


const DashboardTitle = styled.h1`
    font-size: ${props => props.theme.fontSize['2xl']};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: ${props => props.theme.spacing[8]};
`;
const MenuContainer = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    a {
        text-decoration: none;
        color: ${props => props.theme.colors.gray[400]};
    }
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
    transition: background-color 0.1s ease;

`;


const SidebarContainer = styled.div`
    height: 100%;
    width: 250px;
    background-color: ${props => props.theme.colors.white};
    border-right: 1.5px solid ${props => props.theme.colors.gray[100]};
    padding: ${props => props.theme.spacing[4]};
`;

export default Sidebar;
