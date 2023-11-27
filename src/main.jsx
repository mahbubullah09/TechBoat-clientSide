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
import PrivateRoute from './PrivateRoute/PrivateRoute';
import DashLayout from './Mainlayout/DashLayout';
// import UserDash from './Dashboard/UserDash';
import UserSlidebar from './Dashboard/UserDash';
import AddProduct from './Dashboard/AddProduts';
import MyProducts from './Dashboard/MyProducts/MyProducts';
import UpdateProduct from './Dashboard/MyProducts/UpdateProduct';
import MyProfile from './Dashboard/MyProfile';
import ModDash from './Mainlayout/ModDash';
import Reported from './Dashboard/ModaratorDash/Reported';
import ModReview from './Dashboard/ModaratorDash/ModReview';

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
        element: <PrivateRoute>
          <ProductDetails/>
        </PrivateRoute>,

      },
    ],
  },
  {
    path: "userdashboard",
    element: <DashLayout/>,
    children: [
      {
        path: "addproduct",
        element: <AddProduct/>,
      },
      {
        path: "myproduct",
        element: <MyProducts/>,
      },
      {
        path: "myprofile",
        element: <MyProfile/>,
      },
      {
        path: 'myproduct/updateproduct/:id',
        element:
          <UpdateProduct/>,
        
         loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
      },
     
    ],
  },
  {
    path: "moddashboard",
    element: <ModDash/>,
    children: [
      {
        path: "productreview",
        element: <ModReview/>,
      },
   
      {
        path: "reports",
        element: <Reported/>,
      },
      {
        path:'productreview/product/:id',
        element: <PrivateRoute>
          <ProductDetails/>
        </PrivateRoute>,

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