import styled from "@emotion/styled";
import Card, { CardContainer } from "../../components/card/Card";

const Products = () => {
    return (
        <Container>
            <Grid
                columns={3}
            >
                <Card
                    title="Laptop"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
                />
                <Card
                    title="Mobile"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
                />
                <Card
                    title="Tablet"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
                />
                <Card
                    title="Watch"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
                />
                <Card
                    title="Headphone"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
                />
                <Card
                    title="Camera"
                    description="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                    image="https://source.unsplash.com/random"
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