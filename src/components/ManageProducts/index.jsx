import { getCategory } from '../../queries'
import { useQuery, useMutation } from "@tanstack/react-query"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Loading from '../Loading';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { baseUrl } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';

function ManageProducts() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [targetProductId, setTargetProductId] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const {categoryId} = useParams()

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["getCategory"],
        queryFn: () => getCategory(categoryId),
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })

    const deleteMutation = useMutation({
        mutationFn: async (categoryId) => {
            const response = await fetch(`${baseUrl}/api/categories/${categoryId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleClick = (categoryId, event) => {
        setTargetProductId(categoryId);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = async () => {
        console.log(targetProductId);
        deleteMutation.mutate(targetProductId);
        handleClose();
    }
    const handleEdit = async () => {
        navigate('/admin/categorias/editar/' + targetProductId)
        handleClose();
    }

    if (isLoading) return <Loading />

    if (error) return 'Aconteceu um erro: ' + error.message


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                    Página Inicial
                </Link>
                <Link underline="hover" color="inherit" onClick={() => navigate("/admin")}>
                    Admin
                </Link>                
                <Link underline="hover" color="inherit" onClick={() => navigate("/admin/categorias")}>
                    Categorias
                </Link>  
                <Link underline="hover" color="inherit" onClick={() => navigate("/admin/categorias")}>
                {data.name}
                </Link>                   
                <Typography color="text.primary">Produtos</Typography>
            </Breadcrumbs>
            <Container centered>
                <h1>
                    Gerenciar Produtos da Categoria {data.name}
                    <IconButton edge="end" aria-label="add" onClick={() => navigate(`/admin/categorias/categoria/${categoryId}/produtos/novo`)}>
                        <AddIcon />
                    </IconButton>
                </h1>
                <List>
                    {data.products.map((product) => {
                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="options" onClick={(e) => handleClick(product.id, e)}>
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                }
                                key={product.id}
                            >
                                <ListItemText
                                    primary={product.name}
                                    secondary={product.description}
                                />
                            </ListItem>
                        )
                    })}
                </List>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleEdit}>Modificar</MenuItem>
                    <MenuItem onClick={handleDelete}>Apagar</MenuItem>
                </Menu>
            </Container>
        </>
    )
}

export default ManageProducts