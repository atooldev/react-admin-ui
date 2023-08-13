// src/components/Sidebar.tsx
import styled from '@emotion/styled';
import { faBangladeshiTakaSign, faChartBar, faChevronDown, faChevronUp, faDatabase, faHome, faShoppingCart, faSignOut, faTable, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useEntitiesList from '../../hooks/entities/useEntities';

interface SidebarProps {
    // Add any props you need for the Sidebar
}






const Sidebar: React.FC<SidebarProps> = () => {

    // react router dom get current path
    const { pathname } = useLocation();
    const navigate = useNavigate();


    const { data, error, isLoading } = useEntitiesList();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    }


    const menuData = [
        {
            label: "Home",
            icon: <FontAwesomeIcon icon={faHome} />,
            link: "/",
        },
        {
            label: "Records",
            icon: <FontAwesomeIcon icon={faDatabase} />,
            subItems: data?.map((item, index) => ({
                label: item.label,
                icon: <FontAwesomeIcon icon={faTable} />,
                link: `/records/${item.name}`,
            }))
        },

        {
            label: "Products",
            icon: <FontAwesomeIcon icon={faShoppingCart} />,
            link: "/products",
        },
        {
            label: "Customers",
            icon: <FontAwesomeIcon icon={faUsers} />,
            link: "/customers",
        },

        {
            label: "Reports",
            icon: <FontAwesomeIcon icon={faChartBar} />,
            link: "/reports",
        },
        {
            label: "Color Pallete",
            icon: <FontAwesomeIcon icon={faBangladeshiTakaSign} />,
            link: "/color-pallete",
        },
        {
            label: "Sign out",
            icon: <FontAwesomeIcon icon={faSignOut} />,
            onClick: handleLogout,

        },
    ]





    return (
        <SidebarContainer>
            <DashboardTitle>Dashboard</DashboardTitle>
            <MenuContainer>

                {menuData.map((item, index) => (
                    <MenuItem
                        key={`sideBarMenu-${index}`}
                        label={item.label}
                        link={item.link}
                        onClick={item.onClick}
                        subItems={item?.subItems}
                        icon={item.icon} />
                ))}
            </MenuContainer>

            <SupContainer>
                <SupImage src="/sup.png" alt="" />
                <p>
                    Do you need help?
                </p>
            </SupContainer>
        </SidebarContainer>
    );
};

const SupImage = styled.img`
    display: block;
    object-fit: contain;
    width: 170px;
    height:170px;
`;


const DashboardTitle = styled.h1`
    font-size: ${props => props.theme.fontSize['2xl']};
    color: ${props => props.theme.colors.gray[800]};
    margin-bottom: ${props => props.theme.spacing[8]};
`;
const MenuContainer = styled.ul`
    flex: 1;
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
    display: flex;
    flex-direction: column;
`;

export default Sidebar;

const SupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        font-size: ${props => props.theme.fontSize['base']};
        font-weight:600;
        color: ${props => props.theme.colors.gray[900]};
        margin-top: ${props => props.theme.spacing[4]};
    }
`;


// sample 
// const menuData = [
//     {
//       label: 'Item 1',
//       subItems: [
//         { label: 'Sub Item 1.1' },
//         { label: 'Sub Item 1.2' }
//       ]
//     },
// ]

type MenuItemModel = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    link?: string;
    subItems?: MenuItemModel[];
}


const MenuItem = ({ label, icon, subItems, onClick, link }: MenuItemModel) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (link && !subItems) {
            navigate(link);
        }
        if (subItems) {
            toggleSubMenu();
        }


    };

    return (
        <div className="menu-item">
            <MenuLink onClick={handleClick}>
                {icon && icon}
                <span style={{
                    flex: 1,
                }}>{label}</span>

                {
                    subItems && <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                }
            </MenuLink>
            {isOpen && <SubMenu subItems={subItems} />}
        </div>
    );
};

const SubMenu = ({ subItems }: {
    subItems?: MenuItemModel[];
}) => {
    const navigate = useNavigate();

    const handleClick = (link: string) => {
        navigate(link);
    };
    return (
        <ul className="sub-menu">
            {subItems?.map((subItem, index) => (
                <MenuLink
                    onClick={() => handleClick(subItem.link || '')}
                    key={index}>
                    {subItem.icon && subItem.icon}
                    <span>{subItem.label}</span>
                </MenuLink>
            ))}
        </ul>
    );
};