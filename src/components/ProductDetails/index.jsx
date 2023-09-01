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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/material'

function ProductDetails() {
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [quantity, setQuantity] = useState(0)
  const { productType, productName } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`http://localhost:3000/api/products/${productType}/${productName}`).then(
      (res) => res.json()
    )
  })

  if (isLoading) return <Loading />

  if (error) return 'An error has ocurred: ' + error.message
  
  /*
  let currentProductTypeValues = data.productTypes.filter(obj => obj.type === productType)

  let currentProductValues = currentProductTypeValues[0].products.filter(obj => {
    return obj.name === productName
  })
  console.log(currentProductValues)
  */

  function handleSubmit(e) {
    e.preventDefault()
    console.log({
      productName: productName,
      productType: productType,
      quantity: quantity,
      additionalInfo: additionalInfo
    })
    addToCart({
      productName: productName,
      productType: productType,
      quantity: parseInt(quantity),
      additionalInfo: additionalInfo,
      price: currentProductValues[0].price,
      image: currentProductValues[0].image
    })
    navigate('/')
  }

  return (
    <main>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          Página Inicial
        </Link>
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          {productType}
        </Link>
        <Typography color="text.primary">{productName}</Typography>
      </Breadcrumbs>
      <Container>

        <div>
          <Grid container spacing={2} sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Grid item md={4} sm={12}>
              <img src={currentProductValues[0].image} alt={productName} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
            </Grid>
            <Grid item md={8} sm={12}>

              <h1>{productName}</h1>
              <p>{`Valor unitário: R$ ${currentProductValues[0].price}`}</p>

            </Grid>
          </Grid>
          <form method="post" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid sm={8}>
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
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>
              <Grid sm={4}>
                <span>Total: R$ {currentProductValues[0].price * quantity}</span>
              </Grid>
              <Grid sm={12}>
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
              <Grid sm={12}>
                <Button size='large' variant="contained" type="submit" endIcon={<AddShoppingCartIcon />}>
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