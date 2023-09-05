import { useQuery } from "@tanstack/react-query";
import { useTheme } from '@mui/material/styles';
import Loading from "../Loading";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';

function OrderStatus({ currentStatus }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { isLoading, error, data } = useQuery({
        queryKey: "orderStatus",
        queryFn: async () => {
            const response = await fetch("http://localhost:8000/api/order-status", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            const data = await response.json()
            return data
        }
    })

    if (isLoading) return (<Loading />)
    if (error) return 'Aconteceu um erro: ' + error.message
    return (
        <>
            <Stepper activeStep={currentStatus-1} orientation={isSmallScreen?'vertical':'horizontal'}>
                {data.map(item => (
                    <Step key={item.id}>
                        <StepLabel>{item.status}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default OrderStatus