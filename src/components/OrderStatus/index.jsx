import { useQuery, useMutation } from "@tanstack/react-query";
import { useTheme } from '@mui/material/styles';
import Loading from "../Loading";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import {getAllOrderStatuses} from "../../queries"
import {baseUrl} from "../../constants"
import { useState, useEffect } from "react";

function OrderStatus({ currentStatus, currentOrderId, editable, refetch }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [status, setStatus] = useState(currentStatus - 1)

    useEffect( () => {
        setStatus(currentStatus - 1);
    }, [currentStatus]); 

    const { isLoading, error, data } = useQuery({
        queryKey: ["getAllOrderStatuses"],
        queryFn: getAllOrderStatuses
    })

    const changeOrderStatus = useMutation({
        mutationFn: async (orderStatusId) => {
            const response = await fetch(`${baseUrl}/api/orders/${currentOrderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({orderStatusId: orderStatusId})
            })
            const data = await response.json()
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            setStatus(data.orderStatusId - 1)
            refetch()
        }
    }) 

    if (isLoading) return (<Loading />)
    if (error) return 'Aconteceu um erro: ' + error.message

    function handleStep(index){
        if(editable) {
            let orderStatusId = index + 1 //because orderStatusId starts from 1 and index starts from 0
            changeOrderStatus.mutate(orderStatusId)
        }
    }

    return (
        <>
            <Stepper activeStep={status} orientation={isSmallScreen ? 'vertical' : 'horizontal'}>
                {data.map((item, index) => (
                    <Step key={item.id}>
                        <StepButton color="inherit" onClick={() => handleStep(index)}>
                            {item.status}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default OrderStatus