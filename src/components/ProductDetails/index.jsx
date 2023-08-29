import { useParams, useNavigate } from 'react-router-dom'
import {
  useQuery,
} from '@tanstack/react-query'
import Loading from '../Loading'
import { CartContext } from '../../contexts/CartContext'
import { useContext, useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';

function ProductDetails() {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(CartContext)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [quantity, setQuantity] = useState(0)
  const { productType, productName } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => fetch('http://localhost:3000/allProducts').then(
      (res) => res.json()
    )
  })

  if (isLoading) return <Loading />

  if (error) return 'An error has ocurred: ' + error.message

  let currentProductTypeValues = data.productTypes.filter(obj => obj.type === productType)
  console.log(currentProductTypeValues)

  let currentProductValues = currentProductTypeValues[0].products.filter(obj => {
    console.log(`${obj} - ${productName}`)
    return obj.name === productName
  })
  console.log(currentProductValues)

  function handleSubmit(e) {
    e.preventDefault()
    console.log({
      productName: productName,
      productType: productType,
      quantity: quantity,
      additionalInfo: additionalInfo
    })
    setCart((prevCart) => [...prevCart,
    {
      productName: productName,
      productType: productType,
      quantity: quantity,
      additionalInfo: additionalInfo,
      price: currentProductValues[0].price
    }])
    console.log(cart)
    navigate('/')
  }

  return (
    <main>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Página Inicial
        </Link>
        <Typography color="text.primary">{productName}</Typography>
      </Breadcrumbs>
      <Container>
        <div>
          <img src={currentProductValues[0].image} alt={productName} style={{ width: "40vw", height: "50vh", objectFit: "cover" }} />
          <h1>{productType}</h1>
          <h2>{productName}</h2>
          <p>{`Valor unitário: R$ ${currentProductValues[0].price}`}</p>
          <form method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <TextField
                  required
                  id="outlined-number"
                  label="Quantidade"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={0}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid xs={4}>
                <span>Total: R$ {currentProductValues[0].price * quantity}</span>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Observações"
                  multiline
                  maxRows={4}
                  defaultValue={''}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid xs={4}>
                <Button variant="contained" type="submit" endIcon={<AddIcon />}>
                  Adicionar ao Carrinho
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default ProductDetails