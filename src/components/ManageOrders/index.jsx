import { useQuery } from "@tanstack/react-query"
import Loading from "../Loading"
import OrderStatus from "../OrderStatus"
import OrderItems from '../OrderItems';
import { getAllOrders } from "../../queries"
import AccordionContainer from "../AccordionContainer"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom"

function ManageOrders() {
    const navigate = useNavigate()
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["getAllOrders"],
        queryFn: getAllOrders
    })

    if (isLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                    Página Inicial
                </Link>
                <Link underline="hover" color="inherit" onClick={() => navigate("/admin")}>
                    Admin
                </Link>
                <Typography color="text.primary">Categorias</Typography>
            </Breadcrumbs>
            <Container centered>
                <h1>Gerenciar Pedidos</h1>
                <ul>
                    {data.sort((a, b) => a.deliveryTime > b.deliveryTime ? 1 : -1).map((order) => (
                        <div key={order.id} style={{ marginBottom: "40px" }}>
                            <li>{order.id} - {order.ordererName}</li>
                            <p>{order.address}</p>
                            <p>{order.telephoneNumber}</p>
                            <p>{order.deliveryTime}</p>
                            <OrderStatus currentStatus={order.orderStatus.id} currentOrderId={order.id} editable={true} refetch={refetch} />
                            <br />
                            <AccordionContainer accordionTitle={"Mais informações do pedido"}>
                                <OrderItems orderItems={order.orderItems} />
                            </AccordionContainer>
                        </div>
                    ))}
                </ul>
            </Container>
        </>
    )
}

export default ManageOrders

