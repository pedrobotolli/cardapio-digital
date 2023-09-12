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
import { getCategory } from '../../queries';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../constants';

function EditCategory() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { categoryId } = useParams()
    const navigate = useNavigate()

    const { isInitialLoading, error, data, refetch} = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(categoryId),
        enabled: categoryId ? true : false,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })

    useEffect(()=> {
        if(!categoryId){
            setName('')
            setDescription('')
        } 
        else if(data) {
            data.name && setName(data.name)
            data.description && setDescription(data.description)
        }
    }, [data, categoryId])

    const saveMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${baseUrl}/api/categories/${categoryId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, description: description})
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

    const createMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${baseUrl}/api/categories`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, description: description})
            });
            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            navigate(`/admin/categorias/editar/${data.id}`);
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
                {categoryId ? <Typography color="text.primary">Editar</Typography> : <Typography color="text.primary">Criar</Typography>}
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
                    <Grid sm={3}>
                        {categoryId ? <Button variant="contained" onClick={handleSave} style={{ width: "100%" }}>Confirmar Alterações</Button> : <Button variant="contained" onClick={handleCreate} style={{ width: "100%" }}>Criar Categoria</Button>}
                    </Grid>
                    <Grid sm={3}>
                        <Button variant="outlined" style={{ width: "100%" }} onClick={() => navigate("/admin/categorias")}>Cancelar</Button>
                    </Grid>
                </Grid>



            </Container>
        </>
    )
}

export default EditCategory