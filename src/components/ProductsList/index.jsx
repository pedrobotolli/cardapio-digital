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
        queryFn: () => fetch('http://localhost:8000/api/categories').then(
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
                {data.map((productCategory) => {
                    return (
                        <div key={productCategory.id}>
                            <h3>{productCategory.name}</h3>
                            <Grid container spacing={1} >

                                {productCategory.products.map((product) => {
                                    return (
                                        <Grid item md={4} sm={6} key={`${productCategory.id}-${product.id}`}>
                                            <Card sx={{ width: "100%" }}>
                                                <CardActionArea onClick={() => navigate(`/produtos/${product.id}`)}>

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