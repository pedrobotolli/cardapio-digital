import { useParams } from 'react-router-dom'
import {
  useQuery,
} from '@tanstack/react-query'

function ProductDetails() {
  const { productType, productName } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => fetch('http://localhost:3000/allProducts').then(
      (res) => res.json()
    )
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has ocurred: ' + error.message

  let currentProductTypeValues = data.productTypes.filter(obj => obj.type === productType)
  console.log(currentProductTypeValues)
  
  let currentProductValues = currentProductTypeValues[0].products.filter(obj => {
    console.log(`${obj} - ${productName}`)
    return obj.name === productName
  })
  console.log(currentProductValues)
  
  
  return (
    <div>
      <img src={currentProductValues[0].image} alt={productName} />
      <h1>{productType}</h1>
      <h2>{productName}</h2>
      <p>{currentProductValues[0].price}</p>
    </div>
  )
}

export default ProductDetails