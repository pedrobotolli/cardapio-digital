import { Link } from 'react-router-dom'
import {
    useQuery,
} from '@tanstack/react-query'

function ProductsList() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["allProducts"],
        queryFn: () => fetch('http://localhost:3000/allProducts').then(
            (res) => res.json()
        )
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has ocurred: ' + error.message


    return (
        <main>
            <div className="container">
                {data.productTypes.map((productType, productTypeIndex) => {
                    return (
                        <div key={productTypeIndex}>
                            <h3>{productType.type}</h3>
                            <div className="row">
                                {productType.products.map((product, productIndex) => {
                                    return (
                                        <div className="col s12 m4" key={''.concat(productTypeIndex, '-', productIndex)}>
                                            <div className="card small">
                                                <div className="card-image" style={{ maxHeight: "85%", objectFit: "cover", height: "100%" }}>
                                                    <img src={product.image} style={{ objectFit: "cover", height: "100%" }} />
                                                    <span className="card-title grey darken-2">{product.name}</span>
                                                </div>
                                                <div className="card-action">
                                                    <Link to={`/${productType.type}/${product.name}`}>Adicionar ao Carrinho</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

        </main>
    )
}

export default ProductsList