import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorPage from './routes/error-page'
import ProductsList from './components/ProductsList'; 
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import { CartProvider } from './contexts/CartContext';
import CssBaseline from '@mui/material/CssBaseline';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "/:productType/:productName",
        element: <ProductDetails />
      },
      {
        path: "/carrinho",
        element: <Cart />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <CartProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </CartProvider>
  </React.StrictMode>,
)
