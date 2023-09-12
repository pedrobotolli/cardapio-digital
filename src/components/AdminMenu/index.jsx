import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';


function AdminMenu() {
    const navigate = useNavigate()

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                    Página Inicial
                </Link>
                <Typography color="text.primary">Admin</Typography>
            </Breadcrumbs>
            <Container centered>
                <Grid container spacing={2} >
                    <Grid item md={4} sm={6}>
                        <Card sx={{ width: "100%", height: "200px" }}>
                            <CardContent>
                                <CardActionArea onClick={() => navigate('/admin/pedidos')}>
                                    <Typography variant="h2" gutterBottom>
                                        Pedidos
                                    </Typography>
                                    <Typography variant="body1">
                                        Nessa página você pode administrar a lista completa de pedidos.
                                    </Typography>
                                </CardActionArea>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} sm={6}>
                        <Card sx={{ width: "100%", height: "200px" }}>
                            <CardContent>
                                <CardActionArea onClick={() => navigate('/admin/categorias')}>
                                    <Typography variant="h2" gutterBottom>
                                        Categorias
                                    </Typography>
                                    <Typography variant="body1">
                                        Nessa página você pode administrar as categorias de produtos disponíveis para seu estabelecimento.
                                    </Typography>
                                </CardActionArea>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default AdminMenu