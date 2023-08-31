import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Cart() {
    const navigate = useNavigate()
    const { cart, increaseItemQuantity, decreaseItemQuantity } = useContext(CartContext)
    let totalPrice = 0
    cart.map(item => totalPrice = totalPrice + (item.price * item.quantity))

    if (cart.length <= 0) {
        return (
            <main>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                        Página Inicial
                    </Link>
                    <Typography color="text.primary">Carrinho</Typography>
                </Breadcrumbs>
                <Container>
                    <h2>Carrinho Vazio!</h2>
                    <Button variant="contained" size="large" onClick={() => navigate('/')} >Voltar para a pagina inicial</Button>
                </Container>
            </main>
        )
    }


    return (
        <main>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                    Página Inicial
                </Link>
                <Typography color="text.primary">Carrinho</Typography>
            </Breadcrumbs>
            <Container centered>
                <Grid
                    container
                    direction="column"
                    xs={12}
                    md={12}
                >
                    {cart.map((item, index) => {
                        return (
                            <Grid container spacing={2} key={index}>
                                <Grid item md={4} sm={12}>
                                    <img src={item.image} alt={item.productName} style={{width: "100%", height: "200px", objectFit: "cover" }} />
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <div style={{ display: "inline-block" }}>
                                        <h2>{`${item.productType} - ${item.productName}`}</h2>
                                        <p>{`Quantidade: `}
                                            <IconButton aria-label="add" onClick={() => increaseItemQuantity(index)}>
                                                <AddCircleIcon />
                                            </IconButton>
                                            {item.quantity}
                                            <IconButton aria-label="remove" onClick={() => decreaseItemQuantity(index)}>
                                                <RemoveCircleIcon />
                                            </IconButton>
                                        </p>
                                        <p>{`Observações: ${item.additionalInfo}`}</p>
                                        <h4>Total Produto: R$ {item.price * item.quantity}</h4>
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    })}
                    <Grid item md={12} xs={12}>
                        <h3>Total Geral: R$ {totalPrice}</h3>
                        <Button variant="contained" size="large" onClick={() => navigate('/confirmar-pedido')} >Tudo certo! Confirmar o pedido</Button>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}

export default Cart