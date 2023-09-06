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
import OrderStatus from '../OrderStatus';
import OrderItems from '../OrderItems';
import {getOrderById} from '../../queries'

function OrderConfirmed() {
  const { orderId } = useParams()
  const navigate = useNavigate()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getOrderById"],
    queryFn: () => getOrderById(orderId),
    refetchInterval: 3000
  })

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

          <Grid item sm={12}>
            <h1> Pedido {data.id}</h1>
          </Grid>
          <Grid item md={6}>
            <p>Nome: {data.ordererName}</p>
            <p>Endereço: {data.address}</p>
            <p>Horário previsto para entrega: <strong>{format(Date.parse(data.deliveryTime), 'p', { locale: ptBR })}</strong></p>
          </Grid>
          <Grid item md={6} sm={12}>
            <p>Status do pedido:</p>
            <OrderStatus currentStatus={data.orderStatus.id} currentOrderId={data.id} editable={false} refetch={refetch}/>
            <p>{data.orderStatus.description}</p>
          </Grid>

          <OrderItems orderItems={data.orderItems} />
          
        </Grid>
      </Container>
    </div>
  )
}

export default OrderConfirmed