import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorPage from './routes/error-page'
import ProductsList from './components/ProductsList';
import ProductDetails from './components/ProductDetails';
import ConfirmOrder from './components/ConfirmOrder';
import OrderConfirmed from './components/OrderConfirmed';
import ManageOrders from './components/ManageOrders';
import ManageCategories from './components/ManageCategories';
import EditProduct from './components/EditProduct'
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
import { ThemeProvider } from '@mui/material/styles';
import { mcTheme } from './contexts/ThemeContext';
import EditCategory from './components/EditCategory';
import AdminMenu from './components/AdminMenu';
import ManageProducts from './components/ManageProducts';

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
        path: "/produtos/:productId",
        element: <ProductDetails />
      },
      {
        path: "/carrinho",
        element: <Cart />
      },
      {
        path: "/confirmar-pedido",
        element: <ConfirmOrder />
      },
      {
        path: "/pedido-confirmado/:orderId",
        element: <OrderConfirmed />
      },
      {
        path: "/admin",
        element: <AdminMenu />
      },
      {
        path: "/admin/pedidos",
        element: <ManageOrders />
      },
      {
        path: "/admin/categorias",
        element: <ManageCategories />
      },
      {
        path: "/admin/categorias/nova",
        element: <EditCategory />
      },
      {
        path: "/admin/categorias/editar/:categoryId",
        element: <EditCategory />
      },
      {
        path: "/admin/categorias/:categoryId/produtos",
        element: <ManageProducts />
      },
      {
        path: "/admin/categorias/:categoryId/produtos/novo",
        element: <EditProduct />
      },
      {
        path: "/admin/categorias/:categoryId/produtos/editar/:productId",
        element: <EditProduct />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <CartProvider>
      <ThemeProvider theme={mcTheme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </CartProvider>
  </React.StrictMode>,
)
