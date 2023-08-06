import styled from "@emotion/styled";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme, { ThemeType } from "../../helpers/theme/Theme";

const variants = {
    primary: {
        color: theme.colors.white,
        backgroundColor: theme.colors.indigo[300],
        valueColor: theme.colors.blue[700],
    },
    secondary: {
        color: theme.colors.white,
        backgroundColor: theme.colors.blue[300],
        valueColor: theme.colors.indigo[700],
    },
    success: {
        color: theme.colors.white,
        backgroundColor: theme.colors.green[300],
        valueColor: theme.colors.yellow[400],

    },
    danger: {
        color: theme.colors.white,
        backgroundColor: theme.colors.danger,
        valueColor: theme.colors.blue[600],

    },
    warning: {
        color: theme.colors.white,
        backgroundColor: theme.colors.warning,
        valueColor: theme.colors.blue[600],

    },
}
type StatusCardProps = {
    title: string;
    value: string;
    description: string;
    icon: IconProp;
    variant?: keyof typeof variants;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon, variant, description }) => {



    return (
        <StatusCardContainer variant={variant}>
            <StatusCardTitle>{title}</StatusCardTitle>
            <DescriptionContainer>
                <StatusCardValue variant={variant}>{value}</StatusCardValue>
                <VerticalDivider />
                <StatusCardDescription>{description}</StatusCardDescription>
                <FontAwesomeIcon icon={icon} />
            </DescriptionContainer>
        </StatusCardContainer>
    );
}

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: ${props => props.theme.colors.gray[200]};
`;

const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[4]};
`;

const StatusCardContainer = styled.div<{ variant?: keyof typeof variants }>`
    width: 100%;
    padding: ${props => props.theme.spacing[6]};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing[6]};
    gap: ${props => props.theme.spacing[4]};
    color: ${props => variants[props.variant || 'primary'].color};
    background-color: ${props => variants[props.variant || 'primary'].backgroundColor};

`;
const StatusCardTitle = styled.div`
    font-size: ${props => props.theme.fontSize['xl']};
    color: ${props => props.theme.colors.gray[800]};
    font-weight: 600;
`;

const StatusCardValue = styled.div<{ variant?: keyof typeof variants }>`
    font-size: ${props => props.theme.fontSize['2xl']};
    color: ${props => variants[props.variant || 'primary'].valueColor};
    font-weight: 600;
`;

const StatusCardDescription = styled.div`
    font-size: ${props => props.theme.fontSize['base']};
    color: ${props => props.theme.colors.gray[800]};
`;


export default StatusCard;