import { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import ptBR from 'date-fns/locale/pt-BR'
import format from 'date-fns/format'
import Loading from "../Loading"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function OrderConfirmed() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  let [totalPrice, setTotalPrice] = useState()

  const { isLoading, error, data } = useQuery({
    queryKey: "order",
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}`)
      const data = await response.json()
      return data
    }
  })

  useEffect(() => {
    if (data){
      let totalPriceTemp = 0
      data.orderItems.map(item => totalPriceTemp += (parseInt(item.product.price) * parseInt(item.quantity)))
      setTotalPrice(totalPriceTemp)
    }
  }, [data])

  if (isLoading) return (<Loading />)
  if (error) return 'Aconteceu um erro: ' + error.message



  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          Página Inicial
        </Link>
        <Typography color="text.primary">Pedido Confirmado</Typography>
      </Breadcrumbs>
      <Container centered>
        <Grid
          container
          direction="column"
          xs={12}
          md={12}
        >
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <h1> Pedido {data.id}</h1>
              <p>Nome: {data.ordererName}</p>
              <p>Endereço: {data.address}</p>
              <p>Horário previsto para entrega: {format(Date.parse(data.deliveryTime),'p', {locale: ptBR })}</p>
            </Grid>
          </Grid>
          {data.orderItems.map((item, index) => {
            return (
              <Grid container spacing={2} key={index}>
                <Grid item sm={12}>
                <h2> Itens do pedido: </h2>
              </Grid>
                <Grid item md={4} sm={12}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <div style={{ display: "inline-block" }}>
                    <h3>{`${item.product.name}`}</h3>
                    <p>{`Valor: R$ ${item.product.price}`}</p>
                    <p>{`Quantidade: `}
                      {item.quantity}
                    </p>
                    <p>{`Observações: ${item.additionalInfo}`}</p>
                    <h5>Total Produto: R$ {item.product.price * item.quantity}</h5>
                  </div>
                </Grid>
              </Grid>
            )
          })}
          <Grid item md={12} xs={12}>
            <h4>Total Geral: R$ {totalPrice}</h4>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default OrderConfirmed