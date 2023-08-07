// src/App.tsx
import styled from '@emotion/styled';
import { faChartArea, faMoneyBill, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ExBarChart from '../../components/chart/BarChart';
import ExLineChart from '../../components/chart/LineChart';
import theme from '../../helpers/theme/Theme';

const Home: React.FC = () => {


    return (
        <>
            <StatContainer>
                <StatCard>
                    <IconContainer
                        backgroundColor={theme.colors.orange[200]}
                    >
                        <FontAwesomeIcon
                            size='2x'
                            color={theme.colors.orange[500]}
                            icon={faShoppingCart} />
                    </IconContainer>
                    <Info>

                        <h3>2500 USD</h3>
                        <p>Total Sales</p>
                    </Info>

                </StatCard>
                <StatCard
                >
                    <IconContainer
                        backgroundColor={theme.colors.indigo[200]}
                    >
                        <FontAwesomeIcon
                            size='2x'
                            color={theme.colors.indigo[500]}
                            icon={faChartArea} />
                    </IconContainer>
                    <Info>

                        <h3>2500 USD</h3>
                        <p>Total Expenses</p>
                    </Info>
                </StatCard>

                <StatCard>
                    <IconContainer
                        backgroundColor={theme.colors.green[200]}
                    >
                        <FontAwesomeIcon
                            color={theme.colors.green[500]}
                            size='2x'
                            icon={faMoneyBill} />
                    </IconContainer>
                    <Info>
                        <h3>2500 USD</h3>
                        <p>Total Visitors</p>
                    </Info>
                </StatCard>




            </StatContainer>
            <ChartContainer>
                <RevenuContainer>
                    <p>Revenu</p>
                    <ExLineChart />
                </RevenuContainer>
                <VistorContainer>
                    <p>Visitors</p>
                    <ExBarChart />
                </VistorContainer>
            </ChartContainer>
        </>
    );
};



const RevenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 2rem;
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.boxShadow.md};
    border-radius: ${props => props.theme.borderRadius.xl};
    p {
        font-size: ${props => props.theme.fontSize['2xl']};
        font-weight: 400;
        margin-bottom: 2rem;
    }

`

const ChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 400px;
    width: 100%;
    gap: 1rem;
`

const VistorContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    width: 100%;
    padding: 2rem;
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.boxShadow.md};
    border-radius: ${props => props.theme.borderRadius.xl};
    p {
        font-size: ${props => props.theme.fontSize['2xl']};
        font-weight: 400;
        margin-bottom: 2rem;
        
    }
`



const StatCard = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    height: 100%;
    gap: 3rem;
    justify-content: flex-start;
    background-color: ${props => props.theme.colors.white};
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius.xl};
    box-shadow: ${props => props.theme.boxShadow.md};
`

const StatContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
`



const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    h3 {
        font-size: ${props => props.theme.fontSize['3xl']};
        font-weight: 400;
        margin: 0;

    }
    p {
        font-size: ${props => props.theme.fontSize.base};
        color: ${props => props.theme.colors.gray[400]};
        margin-top: 0.5rem;
    }



`
const IconContainer = styled.div<{
    backgroundColor?: string;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor || props.theme.colors.white};
    color: ${props => props.theme.colors.blue[500]};
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
`



export default Home;
