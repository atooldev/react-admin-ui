import styled from "@emotion/styled";
import Card, { CardContainer } from "../../components/card/Card";

const Products = () => {
    return (
        <Container>
            <Grid
                columns={2}
            >
                <Card
                    title="Laptop"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="/pr-1.png"
                />
                <Card
                    title="Mobile"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="/pr-2.png"
                />
                <Card
                    title="Tablet"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="/pr-2.png"
                />
                <Card
                    title="Watch"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="/pr-4.png"
                />
               
            </Grid>

        </Container>
    )
}


const Grid = styled.div<{
    columns?: number;

}>`
    display: grid;
    grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
    grid-gap: ${props => props.theme.spacing[8]};
    margin-top: ${props => props.theme.spacing[8]};
`;


const Container = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing[8]};
`;

export default Products;