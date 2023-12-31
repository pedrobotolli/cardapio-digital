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
import {getProduct} from "../../queries"

function ProductDetails() {
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [quantity, setQuantity] = useState(0)
  const { productId } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["getProduct"],
    queryFn: () => getProduct(productId)
  })

  if (isLoading) return <Loading />

  if (error) return 'An error has ocurred: ' + error.message
  
  function handleSubmit(e) {
    e.preventDefault()
    addToCart({
      productId: data.id,
      name: data.name,
      quantity: parseInt(quantity),
      additionalInfo: additionalInfo,
      price: data.price,
      image: data.image
    })
    navigate('/')
  }

  return (
    <main>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
          Página Inicial
        </Link>
        <Typography color="text.primary">{data.name}</Typography>
      </Breadcrumbs>
      <Container>

        <div>
          <Grid container spacing={2} sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <Grid item md={4} sm={12}>
              <img src={data.image} alt={data.name} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
            </Grid>
            <Grid item md={8} sm={12}>

              <h1>{data.name}</h1>
              <p>{`Valor unitário: R$ ${data.price}`}</p>

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
                  focused
                  autoFocus
                />
              </Grid>
              <Grid sm={4}>
                <span>Total: R$ {data.price * quantity}</span>
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