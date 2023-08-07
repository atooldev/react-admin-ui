// src/components/design-system/Button.tsx
import styled from '@emotion/styled';
import React from 'react';

interface CardProps {
    title: string;
    description: string;
    image: string;
}


const Card: React.FC<CardProps> = ({
    title,
    description,
    image
}) => {
    return (
        <CardContainer>
            <CardHeader>
                <CardImage src={image} />
            </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardContent>
        </CardContainer>
    );
}

export const CardContainer = styled.div`
    width: 100%;
    min-height: 300px;
    border-radius: ${props => props.theme.borderRadius['lg']};
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.boxShadow['xl']};
    border: 1px solid ${props => props.theme.colors.gray[200]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
`;
const CardImage = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover  ;
    border-radius: ${props => props.theme.borderRadius['lg']}
`;

const CardHeader = styled.div`
    margin: ${props => props.theme.spacing[2]};
    position: relative;
    height: 200px;
    border-radius: ${props => props.theme.borderRadius['lg']}
`;

export const CardContent = styled.div`
    width: 100%;
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};

`;

const CardTitle = styled.p`
    font-size: ${props => props.theme.fontSize['xl']};
    color: ${props => props.theme.colors.gray[800]};
    font-weight: 600;
`;

const CardDescription = styled.p`
    font-size: ${props => props.theme.fontSize['base']};
    color: ${props => props.theme.colors.gray[400]};
`;



export default Card;