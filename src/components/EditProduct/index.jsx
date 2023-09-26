import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Loading from "../Loading";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProduct } from '../../queries';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../constants';

function EditCategory() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const { productId, categoryId } = useParams()
    const navigate = useNavigate()

    const { isInitialLoading, error, data, refetch} = useQuery({
        queryKey: ['product'],
        queryFn: () => getProduct(productId),
        enabled: productId ? true : false,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })

    useEffect(()=> {
        if(!productId){
            setName('')
            setDescription('')
        } 
        else if(data) {
            data.name && setName(data.name)
            data.description && setDescription(data.description)
            data.image && setImage(data.image)
            data.price && setPrice(data.price)
        }
    }, [data, productId])

    const saveMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${baseUrl}/api/products/${productId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, price, image})
            });
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            refetch();
            navigate(`/admin/categorias/${categoryId}/produtos`);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const createMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${baseUrl}/api/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, description, price, image})
            });
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            refetch();
            navigate(`/admin/categorias/${categoryId}/produtos`);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    if (isInitialLoading) return <Loading />
    if (error) return <p>Error: {error.message}</p>

    function handleSave() {
        
        console.log('save')
        saveMutation.mutate()
    }

    function handleCreate() {

        console.log('create')
        console.log(JSON.stringify({name: name, description: description}))
        createMutation.mutate()
    }


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
                <Link underline="hover" color="inherit" onClick={() => navigate(`/admin/categorias/${categoryId}/produtos`)}>
                    Produtos
                </Link>               
                <Typography color="inherit">{data.name}</Typography>
                {productId ? <Typography color="text.primary">Editar</Typography> : <Typography color="text.primary">Criar</Typography>}
            </Breadcrumbs>
            <br />
            <Container>
                <Grid container spacing={2}>
                    <Grid sm={12}>
                        <TextField
                            required
                            label="Nome"
                            value={name}
                            style={{ width: "100%" }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={12}>
                        <TextField
                            label="Descrição"
                            value={description}
                            style={{ width: "100%" }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={12}>
                        <TextField
                            label="Imagem"
                            value={image}
                            style={{ width: "100%" }}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={12}>
                        <TextField
                            label="Preço"
                            value={price}
                            style={{ width: "100%" }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*[.,]{0,1}[0-9]{0,2}' }}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid sm={3}>
                        {productId ? <Button variant="contained" onClick={handleSave} style={{ width: "100%" }}>Confirmar Alterações</Button> : <Button variant="contained" onClick={handleCreate} style={{ width: "100%" }}>Criar Categoria</Button>}
                    </Grid>
                    <Grid sm={3}>
                        <Button variant="outlined" style={{ width: "100%" }} onClick={() => navigate(`/admin/categorias/${categoryId}/produtos`)}>Cancelar</Button>
                    </Grid>
                </Grid>



            </Container>
        </>
    )
}

export default EditCategory