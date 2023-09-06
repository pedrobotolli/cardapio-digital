import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react';

function OrderItems({ orderItems }) {
  let [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    if (orderItems) {
      let totalPriceTemp = 0
      orderItems.map(item => totalPriceTemp += (parseFloat(item.product.price) * parseFloat(item.quantity)))
      setTotalPrice(totalPriceTemp)
    }
  }, [orderItems])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <h2> Itens do pedido: </h2>
        </Grid>
      </Grid>
      {orderItems.map((item, index) => {
        return (
          <Grid container spacing={2} key={index}>
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
        <h4>Total do Pedido: R$ {totalPrice}</h4>
      </Grid>
    </>
  )
}

export default OrderItems