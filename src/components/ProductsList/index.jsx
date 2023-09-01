import { useNavigate } from 'react-router-dom'
import {
    useQuery,
} from '@tanstack/react-query'
import Loading from '../Loading'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

function ProductsList() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetch('http://localhost:3000/api/products').then(
            (res) => {
                if (!res.ok) throw new Error(res);
                else return res.json();
            }
        )
    })
    const navigate = useNavigate()

    if (isLoading) return <Loading />

    if (error) return 'Aconteceu um erro: ' + error.message


    return (
        <main>
            <Container>

                {data.productTypes.map((productType, productTypeIndex) => {
                    return (
                        <div key={productTypeIndex}>
                            <h3>{productType.type}</h3>
                            <Grid container spacing={1} >

                                {productType.products.map((product, productIndex) => {
                                    return (
                                        <Grid item md={4} sm={6} key={''.concat(productTypeIndex, '-', productIndex)}>
                                            <Card sx={{ width: "100%" }}>
                                                <CardActionArea onClick={() => navigate(`/${productType.type}/${product.name}`)}>

                                                    <CardMedia
                                                        component="img"
                                                        image={product.image}
                                                        alt={product.name}
                                                        sx={{ width: "360px", height: "260px", objectFit: "cover" }}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" component="div">
                                                            {product.name}
                                                        </Typography>
                                                    </CardContent>

                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                    )
                })}
            </Container>

        </main>
    )
}

export default ProductsList