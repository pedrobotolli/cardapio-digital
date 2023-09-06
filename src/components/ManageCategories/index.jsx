import { getAllCategories } from '../../queries'
import { useQuery } from "@tanstack/react-query"
import { useState } from 'react';
import Loading from '../Loading'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ManageCategories() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: getAllCategories
    })

    if (isLoading) return <Loading />

    if (error) return 'Aconteceu um erro: ' + error.message


    return (
        <>
            <h1>Gerenciar Produtos</h1>
            {data.map((productCategory) => {
                return (
                    <div key={productCategory.id}>
                        <h2>
                            {productCategory.name}
                        </h2>
                        <ul>
                            {productCategory.products.map((product) => {
                                return (
                                    <li key={product.id}>
                                        {product.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}

export default ManageCategories