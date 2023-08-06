// src/components/design-system/Button.tsx
import styled from '@emotion/styled';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'large';
}

const StyledButton = styled.button<ButtonProps>`
    background-color: ${props => props.theme.colors.primary};
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: ${props => (props.size === 'small' ? '12px' : '16px')};
    font-weight: 600;
    line-height: 1;
    padding: ${props =>
        props.size === 'small' ? '8px 12px' : '12px 16px'};
    text-transform: uppercase;
    transition: background-color 0.1s ease;
    &:hover {
        background-color: #0069d9;
    }
    &:focus {
        outline: 0;

        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }
    &:active {
        background-color: #0062cc;
    }
`;



const Button: React.FC<ButtonProps> = ({ children, size = 'large' }) => {
  return <StyledButton size={size}>{children}</StyledButton>;
};

export default Button;
