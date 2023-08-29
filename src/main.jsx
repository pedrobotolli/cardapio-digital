import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout/'
import ErrorPage from './routes/error-page'
import ProductsList from './components/ProductsList'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'
import ProductDetails from './components/ProductDetails';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "/:productType/:productName",
        element: <ProductDetails />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    
  </React.StrictMode>,
)
