
import Container from '@mui/material/Container';
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


function Cart() {
    const { cart } = useContext(CartContext)
    let totalPrice = 0
    cart.map(item => totalPrice = totalPrice + (item.price * item.quantity))

    return (
        <main>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Página Inicial
                </Link>
                <Typography color="text.primary">Carrinho</Typography>
            </Breadcrumbs>
            <Container>
                {cart.map((item, index) => {
                    return (
                        <div key={index}>
                            <h2>{`${item.productType} - ${item.productName}`}</h2>
                            <p>{`Quantidade: ${item.quantity}`}</p>
                            <p>{`Observações: ${item.additionalInfo}`}</p>
                            <h4>Total Produto: R$ {item.price * item.quantity}</h4>
                        </div>
                    )
                })}
                <h3>Total Geral: R$ {totalPrice}</h3>
            </Container>
        </main>
    )
}

export default Cart