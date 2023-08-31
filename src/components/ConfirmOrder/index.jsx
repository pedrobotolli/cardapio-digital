import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { useContext, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function ConfirmOrder() {
    const navigate = useNavigate()
    const { cart } = useContext(CartContext)
    let completeName = ''
    let telephoneNumber = ''
    let address = ''

    return (
        <main>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                    Página Inicial
                </Link>
                <Link underline="hover" color="inherit" onClick={() => navigate("/carrinho")}>
                    Carrinho
                </Link>
                <Typography color="text.primary">Confirmar Pedido</Typography>
            </Breadcrumbs>
            <Container>
                <Stack direction="column" spacing={2} >
                    <h2>Confirmar Pedido</h2>
                    <TextField
                        id="nome"
                        label="Nome Completo"
                        defaultValue={''}
                        onChange={() => { '' }}
                        style={{ width: "100%" }}
                    />
                    <TextField
                        id="telefone"
                        label="Telefone"
                        defaultValue={''}
                        onChange={() => { '' }}
                        style={{ width: "100%" }}
                    />
                    <TextField
                        id="endereco"
                        label="Endereço"
                        defaultValue={''}
                        onChange={() => { '' }}
                        style={{ width: "100%" }}
                    />
                    <Stack direction="row" spacing={2} >
                        <Button variant="contained" size="large" onClick={() => navigate('/')} >Confirmar Pedido</Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/')} >Voltar para a pagina inicial</Button>
                    </Stack>
                </Stack>
            </Container>
        </main>
    )
}

export default ConfirmOrder