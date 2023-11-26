import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './Mainlayout/mainLayout';
import Home from './Home/Home';
import LogIn from './Authentication/LogIn';
import AuthProvider from './Provider/AuthProvider';
import SingUp from './Authentication/SingUp';
import Tagtest from './TAGTEST';
import Products from './Products/Products';
import ProductDetails from './ProductDetails/ProductDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/login',
        element: <LogIn/>
      },
      {
        path:'/singup',
        element: <SingUp/>
      },
      {
        path:'/tag',
        element: <Tagtest/>
      },
      {
        path:'/products',
        element: <Products/>
      },
      {
        path:'/product/:id',
        element: <ProductDetails/>,

      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);