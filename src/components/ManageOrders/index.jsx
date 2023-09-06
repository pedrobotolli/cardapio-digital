import { useQuery } from "@tanstack/react-query"
import Loading from "../Loading"
import OrderStatus from "../OrderStatus"
import OrderItems from '../OrderItems';
import { getAllOrders } from "../../queries"
import AccordionContainer from "../AccordionContainer"

function ManageOrders() {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["getAllOrders"],
        queryFn: getAllOrders
    })

    if (isLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
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
        </>
    )
}

export default ManageOrders

